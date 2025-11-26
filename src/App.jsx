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
}

// --- CONTENT DATA ---
const contentMap = {
  intro: {
    title: 'vinayak_dubey.exe',
    text: `Software Developer @ Oracle
Bengaluru, India

Building robust, scalable systems at the intersection of Artificial Intelligence and Distributed Computing.`,
  },
  about: {
    title: 'cat profile.txt',
    text: ` PROFESSIONAL SUMMARY
====================
Software Developer at Oracle with expertise in AI Agents and Database development.

• Track record of designing scalable enterprise solutions.
• Strong foundation in Algorithms & Data Structures.
• Expert in Distributed Systems Architecture.`,
  },
  experience: {
    title: "history | grep 'work'",
    text: ` ORACLE CORPORATION
2024 - Present | Bengaluru, India
---------------------------------
[+] Developing enterprise-scale applications.
[+] Implementing APIs and distributed systems.
[+] Contributing to ODI/Database development.
[+] Optimizing database queries for high-throughput.

TIMELY AI (Intern)
July 2023 | Remote
------------------
[+] Automated business processes for independent professionals.
[+] Abstracted operational workflows from creative work.
[+] Integrated AI solutions to streamline user efficiency.

EXQUISITE (Founding Member)
Sep 2022 - May 2023
-------------------
[+] Created MLPs (Minimum Lovable Products) for early-stage startups.
[+] Led rapid prototyping and full-stack development cycles.
[+] Collaborated with founders to translate vision into code.

STEPAPP (Developer)
Sep 2022 - Jan 2023
-------------------
[+] Contributed to core application development.
[+] Maintained codebase and implemented new feature sets.
[+] Worked on bug fixes and performance optimization.`,
  },
  skills: {
    title: 'ls -la ./skills',
    text: `LANGUAGES
[ C++, Python, JavaScript, SQL ]

ADVANCED AI/ML
[ LLMs/Transformers, RAG Systems, PyTorch ]
[ Computer Vision, MLOps, LangChain ]

DEVOPS & CLOUD
[ Docker, Kubernetes, Jenkins/CI-CD ]
[ Terraform, AWS, Prometheus ]

FRAMEWORKS
[ React, Next.js, Node.js, Express ]`,
  },
  blogs: {
    title: 'curl -X GET api/ai-research',
    text: '', // Handled by component
  },
  game: {
    title: './play_tic_tac_toe.sh',
    text: '', // Handled by component
  },
  contact: {
    title: 'whoami --contact',
    text: `EMAIL
vinayak.d.dubey@oracle.com

PROFESSIONAL NETWORKS
LinkedIn: https://linkedin.com/in/vinayaksde
GitHub:   https://github.com/VinayakDubey07
Medium:   https://medium.com/@vinayakdubey.is20

STATUS
Open for interesting technical challenges and consulting.`,
  },
}

// --- TIC TAC TOE COMPONENT ---
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
          if (result) {
            setWinner(result)
            setStatus(
              result === 'Draw' ? 'GAME OVER: DRAW' : 'GAME OVER: SYSTEM WINS'
            )
          } else {
            setStatus('YOUR TURN [X]')
          }
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

// --- BLOGS COMPONENT (FETCHING LOGIC) ---
const Blogs = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        // Using Hacker News Algolia API to search for "Generative AI" or "LLM" news sorted by date
        const response = await fetch(
          'https://hn.algolia.com/api/v1/search_by_date?query=LLM+OR+Generative+AI&tags=story&hitsPerPage=6'
        )
        if (!response.ok) throw new Error('Network response was not ok')
        const data = await response.json()
        setArticles(data.hits)
        setLoading(false)
      } catch (err) {
        // Fallback data if API fails
        setArticles([
          {
            title: 'Attention Is All You Need (Paper)',
            url: 'https://arxiv.org/abs/1706.03762',
            created_at: 'Classic',
          },
          {
            title: 'GPT-4 Technical Report',
            url: 'https://arxiv.org/abs/2303.08774',
            created_at: 'Classic',
          },
          {
            title: 'Llama 2: Open Foundation and Chat Models',
            url: 'https://ai.meta.com/research/publications/llama-2-open-foundation-and-chat-models/',
            created_at: 'Classic',
          },
          {
            title:
              'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks',
            url: 'https://arxiv.org/abs/2005.11401',
            created_at: 'Classic',
          },
        ])
        setError('OFFLINE MODE: Displaying Seminal Papers')
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (loading) {
    return (
      <div style={{ padding: '20px 0' }}>
        {[
          'Scanning ArXiv...',
          'Querying Neural Networks...',
          'Fetching Latest Weights...',
        ].map((txt, i) => (
          <div
            key={i}
            style={{
              animation: `fadeIn 0.5s ${i * 0.2}s forwards`,
              opacity: 0,
            }}
          >
            {`> ${txt}`}
          </div>
        ))}
        <span className="cursor"></span>
      </div>
    )
  }

  return (
    <div>
      {error && (
        <div
          style={{
            color: theme.dim,
            marginBottom: '20px',
            borderBottom: `1px solid ${theme.darkGray}`,
            paddingBottom: '10px',
          }}
        >
          ! {error}
        </div>
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
          <div style={{ marginBottom: '5px' }}>
            <a
              href={article.url}
              target="_blank"
              rel="noreferrer"
              style={{ ...styles.link, fontSize: '15px', fontWeight: 'bold' }}
              onMouseEnter={e => {
                e.target.style.background = theme.text
                e.target.style.color = theme.bg
              }}
              onMouseLeave={e => {
                e.target.style.background = 'transparent'
                e.target.style.color = theme.text
              }}
            >
              {article.title || 'Untitled Research'}
            </a>
          </div>
          <div style={{ fontSize: '12px', color: theme.dim }}>
            {article.author
              ? `Author: ${article.author}`
              : 'Source: Research DB'}
            {' · '}
            {article.points ? `${article.points} citations` : 'Peer Reviewed'}
          </div>
        </div>
      ))}
      <div style={{ marginTop: '20px', fontSize: '12px', color: theme.dim }}>
        {'>'} End of feed. Updates daily.
      </div>
    </div>
  )
}

// --- MAIN COMPONENT ---
export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('intro')
  const [displayedText, setDisplayedText] = useState('')
  const typingRef = useRef(null)

  // Typewriter Effect
  useEffect(() => {
    if (activeTab === 'game' || activeTab === 'blogs') return

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
            if (part.match(urlRegex)) {
              return (
                <a
                  key={j}
                  href={part}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.link}
                  onMouseEnter={e => {
                    e.target.style.backgroundColor = theme.text
                    e.target.style.color = theme.bg
                  }}
                  onMouseLeave={e => {
                    e.target.style.backgroundColor = 'transparent'
                    e.target.style.color = theme.text
                  }}
                >
                  {part}
                </a>
              )
            }
            if (part.match(emailRegex)) {
              return (
                <a
                  key={j}
                  href={`mailto:${part}`}
                  style={styles.link}
                  onMouseEnter={e => {
                    e.target.style.backgroundColor = theme.text
                    e.target.style.color = theme.bg
                  }}
                  onMouseLeave={e => {
                    e.target.style.backgroundColor = 'transparent'
                    e.target.style.color = theme.text
                  }}
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
          /* GLOBAL RESET - FIX FOR WHITE BORDERS */
          body, html {
            margin: 0;
            padding: 0;
            background-color: #000000;
            width: 100%;
            height: 100%;
          }
          ::selection { background: ${theme.text}; color: ${theme.bg}; }
          @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
          .cursor { animation: blink 1s step-end infinite; display: inline-block; width: 10px; height: 18px; background: white; vertical-align: text-bottom; margin-left: 4px; }
          button:hover { opacity: 0.8; }
        `}
      </style>

      <div style={styles.container}>
        <div style={styles.inner}>
          {/* HEADER */}
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

          {/* NAV */}
          <nav style={styles.nav}>
            {Object.keys(contentMap).map(key => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                style={styles.navButton(activeTab === key)}
                onMouseEnter={e => {
                  if (activeTab !== key) {
                    e.target.style.color = theme.text
                    e.target.style.borderColor = theme.dim
                  }
                }}
                onMouseLeave={e => {
                  if (activeTab !== key) {
                    e.target.style.color = theme.dim
                    e.target.style.borderColor = 'transparent'
                  }
                }}
              >
                {key === 'game' ? 'PLAY GAME' : key}
              </button>
            ))}
          </nav>

          {/* MAIN CONTENT */}
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
            ) : (
              <div style={{ whiteSpace: 'pre-wrap' }}>
                {renderTextWithLinks(displayedText)}
                <span className="cursor"></span>
              </div>
            )}
          </main>

          {/* FOOTER */}
          <div style={styles.cliBar}>
            <span>user@oracle:~/portfolio/{activeTab}$ _</span>
            <span>© 2025</span>
          </div>
        </div>
      </div>
    </>
  )
}
