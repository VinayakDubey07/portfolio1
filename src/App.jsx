import React, { useState, useEffect, useRef } from 'react'

// --- THEME (Strict Black & White) ---
const theme = {
  bg: '#000000',
  text: '#FFFFFF',
  dim: '#888888',
  darkGray: '#333333',
  font: '"JetBrains Mono", "Courier New", monospace',
}

// --- STYLES ---
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: theme.bg,
    color: theme.text,
    fontFamily: theme.font,
    padding: '40px 20px',
    lineHeight: '1.6',
    letterSpacing: '0.5px',
  },
  inner: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    gap: '40px',
    alignItems: 'center',
    marginBottom: '60px',
    flexWrap: 'wrap',
    borderBottom: `1px solid ${theme.darkGray}`,
    paddingBottom: '40px',
  },
  photoFrame: {
    width: '120px',
    height: '120px',
  },
  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    border: `1px solid ${theme.darkGray}`,
    filter: 'grayscale(100%) contrast(1.2)',
  },
  nav: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
    marginBottom: '40px',
  },
  navButton: active => ({
    background: active ? theme.text : 'transparent',
    color: active ? theme.bg : theme.dim,
    border: `1px solid ${active ? theme.text : 'transparent'}`,
    cursor: 'pointer',
    padding: '8px 16px',
    fontSize: '13px',
    fontFamily: 'inherit',
    fontWeight: 'bold',
    transition: 'all 0.2s ease',
    textTransform: 'uppercase',
  }),
  contentBox: {
    minHeight: '400px',
    padding: '10px 0',
  },
  link: {
    color: theme.text,
    textDecoration: 'underline',
    textUnderlineOffset: '4px',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  cliBar: {
    marginTop: '80px',
    paddingTop: '20px',
    borderTop: `1px solid ${theme.darkGray}`,
    fontFamily: theme.font,
    fontSize: '12px',
    color: theme.dim,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // Game Styles
  gameBoard: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2px',
    maxWidth: '300px',
    margin: '40px auto',
    backgroundColor: theme.darkGray,
    border: `2px solid ${theme.darkGray}`,
  },
  gameCell: {
    aspectRatio: '1/1',
    backgroundColor: theme.bg,
    border: 'none',
    color: theme.text,
    fontSize: '32px',
    fontFamily: theme.font,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameStatus: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '14px',
    color: theme.dim,
  },
  resetBtn: {
    display: 'block',
    margin: '20px auto',
    background: 'transparent',
    color: theme.text,
    border: `1px solid ${theme.text}`,
    padding: '8px 16px',
    fontFamily: theme.font,
    cursor: 'pointer',
  },
  // Chat Styles
  chatContainer: {
    border: `1px solid ${theme.darkGray}`,
    padding: '20px',
    height: '450px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    background: '#0a0a0a',
  },
  chatHistory: {
    flex: 1,
    overflowY: 'auto',
    marginBottom: '20px',
    fontFamily: theme.font,
    fontSize: '14px',
  },
  chatInput: {
    background: 'transparent',
    border: 'none',
    borderTop: `1px solid ${theme.darkGray}`,
    color: theme.text,
    fontFamily: theme.font,
    fontSize: '16px',
    padding: '15px 0',
    width: '100%',
    outline: 'none',
  },
}

// --- DATA ---
const contentMap = {
  intro: {
    title: 'vinayak_dubey.exe',
    text: `  Software Developer @ Oracle\nBengaluru, India\n\nBuilding robust, scalable systems at the intersection of Artificial Intelligence and Distributed Computing.`,
  },
  about: {
    title: 'cat profile.txt',
    text: `PROFESSIONAL SUMMARY\n====================\nSoftware Developer at Oracle with expertise in AI Agents and Database development.\n\n• Track record of designing scalable enterprise solutions.\n• Strong foundation in Algorithms & Data Structures.\n• Expert in Distributed Systems Architecture.`,
  },
  experience: {
    title: "history | grep 'work'",
    text: ` ORACLE CORPORATION\n2024 - Present | Bengaluru, India\n---------------------------------\n[+] Developing enterprise-scale applications.\n[+] Implementing APIs and distributed systems.\n[+] Contributing to ODI/Database development.\n[+] Optimizing database queries for high-throughput.\n\nTIMELY AI (Intern)\nJuly 2023 | Remote\n------------------\n[+] Automated business processes for independent professionals.\n[+] Abstracted operational workflows from creative work.\n[+] Integrated AI solutions to streamline user efficiency.\n\nEXQUISITE (Founding Member)\nSep 2022 - May 2023\n-------------------\n[+] Created MLPs (Minimum Lovable Products) for early-stage startups.\n[+] Led rapid prototyping and full-stack development cycles.\n[+] Collaborated with founders to translate vision into code.\n\nSTEPAPP (Developer)\nSep 2022 - Jan 2023\n-------------------\n[+] Contributed to core application development.\n[+] Maintained codebase and implemented new feature sets.\n[+] Worked on bug fixes and performance optimization.`,
  },
  skills: {
    title: 'ls -la ./skills',
    text: `LANGUAGES\n[ C++, Python, JavaScript, SQL ]\n\nADVANCED AI/ML\n[ LLMs/Transformers, RAG Systems, PyTorch ]\n[ Computer Vision, MLOps, LangChain ]\n\nDEVOPS & CLOUD\n[ Docker, Kubernetes, Jenkins/CI-CD ]\n[ Terraform, AWS, Prometheus ]\n\nFRAMEWORKS\n[ React, Next.js, Node.js, Express ]`,
  },
  blogs: { title: 'curl -X GET api/ai-research', text: '' },
  game: { title: './play_tic_tac_toe.sh', text: '' },
  chat: { title: './start_ai_agent.sh --mode=advanced', text: '' },
  contact: {
    title: 'whoami --contact',
    text: `EMAIL\nvinayak.d.dubey@oracle.com\n\nPROFESSIONAL NETWORKS\nLinkedIn: https://linkedin.com/in/vinayaksde\nGitHub:   https://github.com/VinayakDubey07\nMedium:   https://medium.com/@vinayakdubey.is20\n\nSTATUS\nOpen for interesting technical challenges and consulting.`,
  },
}

// --- ADVANCED AI KNOWLEDGE BASE ---
const KNOWLEDGE_BASE = [
  {
    keywords: ['hi', 'hello', 'hey', 'greetings', 'hola'],
    response:
      "Greetings. I am Vinayak's digital clone, v2.0. I can answer technical questions about my background, skills, or projects. Try asking: 'What is your tech stack?' or 'Tell me about your Oracle experience'.",
  },
  {
    keywords: [
      'skill',
      'stack',
      'technology',
      'language',
      'framework',
      'code',
      'coding',
    ],
    response:
      'I am a Software Engineer with a heavy focus on AI and Distributed Systems.\n\nPrimary Stack:\n• Languages: C++, Python, JavaScript, SQL\n• AI/ML: PyTorch, TensorFlow, LangChain, RAG Systems\n• Web: React, Next.js, Node.js\n• Cloud/DevOps: AWS, Docker, Kubernetes',
  },
  {
    keywords: ['oracle', 'current', 'job', 'work', 'role'],
    response:
      'I am currently a Software Developer at Oracle Corporation (Bengaluru). My daily work involves:\n1. Developing enterprise-scale applications.\n2. Building distributed systems.\n3. Optimizing high-throughput database queries for ODI.\n4. Collaborating on system architecture.',
  },
  {
    keywords: ['timely', 'intern', 'internship'],
    response:
      'I interned at TimelyAI (July 2023), where I focused on automating business processes using AI. I helped abstract operational workflows for independent professionals, integrating AI to boost efficiency.',
  },
  {
    keywords: ['exquisite', 'startup', 'founding'],
    response:
      "I was a Founding Member at Exquisite (2022-2023). I wore many hats, leading rapid prototyping and creating 'Minimum Lovable Products' (MLPs) for early-stage startups.",
  },
  {
    keywords: ['project', 'build', 'portfolio', 'app'],
    response:
      'My key projects include:\n1. Decentralized Image Storage (Blockchain/IPFS)\n2. AI Article Summarizer (NLP/OpenAI)\n3. Blockchain Multi-chat App (Gun.js/WebRTC)\n\nWhich one would you like technical details on?',
  },
  {
    keywords: ['contact', 'email', 'reach', 'hire'],
    response:
      'I am open to interesting opportunities. You can reach me at vinayak.d.dubey@oracle.com or find me on LinkedIn.',
  },
  {
    keywords: ['blockchain', 'web3', 'decentralized'],
    response:
      "I have strong experience in Web3. I've built smart contracts for secure storage and peer-to-peer messaging apps using Gun.js to eliminate central server dependencies.",
  },
  {
    keywords: ['ai', 'ml', 'artificial', 'intelligence', 'llm', 'rag'],
    response:
      'AI is my primary focus. I work with Large Language Models (LLMs), implement Retrieval-Augmented Generation (RAG) for better context, and use frameworks like LangChain and PyTorch to build intelligent agents.',
  },
]

// --- TIC TAC TOE ---
const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [winner, setWinner] = useState(null)
  const [status, setStatus] = useState('YOUR TURN [X]')

  const checkWinner = squares => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        return squares[a]
    }
    return squares.includes(null) ? null : 'Draw'
  }

  const handleClick = index => {
    if (board[index] || winner || !isPlayerTurn) return
    const newBoard = [...board]
    newBoard[index] = 'X'
    setBoard(newBoard)
    setIsPlayerTurn(false)
    const result = checkWinner(newBoard)
    if (result) {
      setWinner(result)
      setStatus(result === 'Draw' ? 'GAME OVER: DRAW' : 'GAME OVER: YOU WIN')
    } else {
      setStatus('SYSTEM THINKING...')
    }
  }

  useEffect(() => {
    if (!isPlayerTurn && !winner) {
      const timer = setTimeout(() => {
        const available = board
          .map((v, i) => (v === null ? i : null))
          .filter(v => v !== null)
        if (available.length > 0) {
          const randomMove =
            available[Math.floor(Math.random() * available.length)]
          const newBoard = [...board]
          newBoard[randomMove] = 'O'
          setBoard(newBoard)
          setIsPlayerTurn(true)
          const result = checkWinner(newBoard)
          if (result) setWinner(result)
          else setStatus('YOUR TURN [X]')
        }
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [isPlayerTurn, board, winner])

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setWinner(null)
    setIsPlayerTurn(true)
    setStatus('YOUR TURN [X]')
  }

  return (
    <div style={{ animation: 'fadeIn 0.5s' }}>
      <div style={styles.gameStatus}>STATUS: {status}</div>
      <div style={styles.gameBoard}>
        {board.map((cell, i) => (
          <button
            key={i}
            style={{
              ...styles.gameCell,
              background: cell ? (cell === 'X' ? '#111' : '#222') : 'black',
            }}
            onClick={() => handleClick(i)}
            disabled={!!cell || !!winner}
          >
            {cell}
          </button>
        ))}
      </div>
      {winner && (
        <button onClick={resetGame} style={styles.resetBtn}>
          RESTART_GAME.EXE
        </button>
      )}
    </div>
  )
}

// --- BLOGS ---
const Blogs = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          'https://hn.algolia.com/api/v1/search_by_date?query=LLM+OR+Generative+AI&tags=story&hitsPerPage=6'
        )
        if (!response.ok) throw new Error('Err')
        const data = await response.json()
        setArticles(data.hits)
        setLoading(false)
      } catch (err) {
        setArticles([
          {
            title: 'Attention Is All You Need',
            url: 'https://arxiv.org/abs/1706.03762',
            created_at: 'Classic',
          },
          {
            title: 'GPT-4 Technical Report',
            url: 'https://arxiv.org/abs/2303.08774',
            created_at: 'Classic',
          },
        ])
        setError('OFFLINE MODE')
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  if (loading)
    return (
      <div style={{ padding: '20px 0' }}>
        {['Scanning ArXiv...', 'Querying Neural Networks...'].map((txt, i) => (
          <div key={i}>{`> ${txt}`}</div>
        ))}
        <span className="cursor"></span>
      </div>
    )

  return (
    <div>
      {error && (
        <div style={{ color: theme.dim, marginBottom: '20px' }}>! {error}</div>
      )}
      {articles.map((article, index) => (
        <div
          key={index}
          style={{ marginBottom: '25px', animation: 'fadeIn 0.5s' }}
        >
          <div style={{ fontSize: '11px', color: theme.dim }}>
            [{index + 1}]{' '}
            {article.created_at === 'Classic'
              ? 'ARCHIVE'
              : new Date(article.created_at).toLocaleDateString()}
          </div>
          <div>
            <a
              href={article.url}
              target="_blank"
              rel="noreferrer"
              style={{ ...styles.link, fontSize: '15px', fontWeight: 'bold' }}
            >
              {article.title || 'Untitled'}
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}

// --- ADVANCED AI CHAT COMPONENT ---
const AIChat = () => {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [bootSequence, setBootSequence] = useState(true)
  const chatEndRef = useRef(null)

  // Boot Sequence Effect
  useEffect(() => {
    const bootSteps = [
      'Initializing Neural Network...',
      'Loading Knowledge Base (Vector Embeddings)...',
      "Connecting to Vinayak's Database...",
      "Vinayak's AI is Online.",
    ]

    let delay = 0
    bootSteps.forEach((step, index) => {
      delay += 800
      setTimeout(() => {
        setHistory(prev => [...prev, { sender: 'SYS', text: step }])
        if (index === bootSteps.length - 1) {
          setBootSequence(false)
          // Add initial greeting after boot
          setTimeout(() => {
            setHistory(prev => [
              ...prev,
              {
                sender: 'AI',
                text: "Systems operational. I can answer queries about Vinayak's Experience, Skills, or Projects.",
              },
            ])
          }, 500)
        }
      }, delay)
    })
  }, [])

  // Advanced Scoring Logic
  const generateResponse = query => {
    const q = query.toLowerCase()

    // Find best match based on keyword overlap
    let bestMatch = null
    let maxScore = 0

    KNOWLEDGE_BASE.forEach(entry => {
      let score = 0
      entry.keywords.forEach(keyword => {
        if (q.includes(keyword)) score++
      })
      if (score > maxScore) {
        maxScore = score
        bestMatch = entry
      }
    })

    if (bestMatch && maxScore > 0) {
      return bestMatch.response
    }

    // Default fallbacks based on specific unknown queries
    if (q.length < 3)
      return 'Please elaborate. My context window requires more input.'
    return "Query outside training data parameters. Try asking about 'Skills', 'Oracle Work', or 'Projects'."
  }

  const typeWriterResponse = text => {
    setIsTyping(true)
    let index = 0
    // Create an empty message to fill
    setHistory(prev => [...prev, { sender: 'AI', text: '' }])

    const interval = setInterval(() => {
      setHistory(prev => {
        const newHistory = [...prev]
        const lastMsg = newHistory[newHistory.length - 1]
        lastMsg.text = text.substring(0, index + 1)
        return newHistory
      })
      index++
      if (index === text.length) {
        clearInterval(interval)
        setIsTyping(false)
      }
    }, 15) // Speed of typing
  }

  const handleSend = e => {
    e.preventDefault()
    if (!input.trim() || bootSequence || isTyping) return

    const userText = input
    setHistory(prev => [...prev, { sender: 'USR', text: userText }])
    setInput('')
    setIsTyping(true)

    // Artificial thinking delay
    setTimeout(() => {
      const responseText = generateResponse(userText)
      setIsTyping(false) // Stop "thinking" indicator
      typeWriterResponse(responseText) // Start "typing" effect
    }, 1000)
  }

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  return (
    <div style={styles.chatContainer}>
      <div style={styles.chatHistory}>
        {history.map((msg, i) => (
          <div
            key={i}
            style={{
              marginBottom: '15px',
              color:
                msg.sender === 'USR'
                  ? theme.text
                  : msg.sender === 'SYS'
                  ? theme.dim
                  : theme.text,
            }}
          >
            <span
              style={{
                color:
                  msg.sender === 'USR'
                    ? theme.dim
                    : msg.sender === 'SYS'
                    ? '#444'
                    : '#fff',
                fontWeight: 'bold',
                marginRight: '10px',
              }}
            >
              [{msg.sender === 'AI' ? 'BOT' : msg.sender}]:
            </span>
            <span style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</span>
          </div>
        ))}
        {isTyping && !history[history.length - 1]?.text && (
          <div style={{ color: theme.dim }}>
            [BOT]: Processing...<span className="cursor"></span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={handleSend} style={{ opacity: bootSequence ? 0.5 : 1 }}>
        <input
          style={styles.chatInput}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={
            bootSequence ? 'System Booting...' : 'Query the neural network...'
          }
          disabled={bootSequence}
          autoFocus
        />
      </form>
    </div>
  )
}

// --- MAIN COMPONENT ---
export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('intro')
  const [displayedText, setDisplayedText] = useState('')
  const typingRef = useRef(null)

  useEffect(() => {
    if (['game', 'blogs', 'chat'].includes(activeTab)) return
    const fullText = contentMap[activeTab].text
    setDisplayedText('')
    let index = 0
    if (typingRef.current) clearInterval(typingRef.current)
    typingRef.current = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(prev => prev + fullText.charAt(index))
        index++
      } else {
        clearInterval(typingRef.current)
      }
    }, 10)
    return () => clearInterval(typingRef.current)
  }, [activeTab])

  const renderTextWithLinks = text => {
    const urlRegex = /((https?:\/\/[^\s]+)|(www\.[^\s]+))/g
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g
    return text.split('\n').map((line, i) => {
      const parts = line.split(' ')
      return (
        <div key={i} style={{ minHeight: '1.6em' }}>
          {parts.map((part, j) => {
            if (part.match(urlRegex) || part.match(emailRegex)) {
              return (
                <a
                  key={j}
                  href={part.includes('@') ? `mailto:${part}` : part}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.link}
                >
                  {part}
                </a>
              )
            }
            return <span key={j}>{part} </span>
          })}
        </div>
      )
    })
  }

  return (
    <>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');`}
        {`
          /* GLOBAL RESET */
          body, html { margin: 0; padding: 0; background-color: #000000; width: 100%; height: 100%; }
          ::selection { background: ${theme.text}; color: ${theme.bg}; }
          @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
          .cursor { animation: blink 1s step-end infinite; display: inline-block; width: 10px; height: 18px; background: white; vertical-align: text-bottom; margin-left: 4px; }
          button:hover { opacity: 0.8; }
        `}
      </style>
      <div style={styles.container}>
        <div style={styles.inner}>
          <header style={styles.header}>
            <div style={styles.photoFrame}>
              <img src="/1000108932.jpg" alt="Vinayak" style={styles.photo} />
            </div>
            <div>
              <h1
                style={{
                  fontSize: '32px',
                  margin: '0 0 10px 0',
                  letterSpacing: '-1px',
                }}
              >
                Vinayak Dubey
              </h1>
              <div
                style={{
                  fontSize: '14px',
                  color: theme.dim,
                  marginBottom: '10px',
                }}
              >
                Software at Oracle
              </div>
              <div
                style={{
                  fontSize: '12px',
                  border: `1px solid ${theme.darkGray}`,
                  padding: '4px 8px',
                  display: 'inline-block',
                }}
              >
                STATUS: ONLINE
              </div>
            </div>
          </header>
          <nav style={styles.nav}>
            {Object.keys(contentMap).map(key => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                style={styles.navButton(activeTab === key)}
              >
                {key === 'game'
                  ? 'PLAY GAME'
                  : key === 'chat'
                  ? 'AI CHAT'
                  : key}
              </button>
            ))}
          </nav>
          <main style={styles.contentBox}>
            <div
              style={{
                marginBottom: '20px',
                color: theme.dim,
                fontSize: '12px',
              }}
            >
              $ {contentMap[activeTab].title}
            </div>
            {activeTab === 'game' ? (
              <TicTacToe />
            ) : activeTab === 'blogs' ? (
              <Blogs />
            ) : activeTab === 'chat' ? (
              <AIChat />
            ) : (
              <div style={{ whiteSpace: 'pre-wrap' }}>
                {renderTextWithLinks(displayedText)}
                <span className="cursor"></span>
              </div>
            )}
          </main>
          <div style={styles.cliBar}>
            <span>user@oracle:~/portfolio/{activeTab}$ _</span>
            <span>© 2025</span>
          </div>
        </div>
      </div>
    </>
  )
}
