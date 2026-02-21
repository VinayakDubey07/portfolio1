import React, { useState, useEffect, useRef } from 'react'

// --- THEME ---
const theme = {
  bg: '#000000',
  surface: '#0a0a0a',
  text: '#FFFFFF',
  dim: '#666666',
  dimmer: '#333333',
  accent: '#FFFFFF',
  font: '"JetBrains Mono", "Courier New", monospace',
}

// --- GLOBAL CSS ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; }
    body, html { margin: 0; padding: 0; background: #000; }
    ::selection { background: #fff; color: #000; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #000; }
    ::-webkit-scrollbar-thumb { background: #333; }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
    @keyframes scanline {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(100vh); }
    }
    .cursor {
      display: inline-block; width: 8px; height: 16px;
      background: #fff; vertical-align: text-bottom;
      margin-left: 2px; animation: blink 1s step-end infinite;
    }
    .fade-up { animation: fadeUp 0.4s ease forwards; }
    .nav-btn {
      background: transparent; color: #555; border: none;
      cursor: pointer; padding: 6px 14px; font-family: inherit;
      font-size: 12px; font-weight: 500; letter-spacing: 1.5px;
      text-transform: uppercase; transition: color 0.2s, border-color 0.2s;
      border-bottom: 1px solid transparent;
    }
    .nav-btn:hover { color: #aaa; }
    .nav-btn.active { color: #fff; border-bottom-color: #fff; }
    .project-card {
      border: 1px solid #1a1a1a; padding: 20px; cursor: pointer;
      transition: border-color 0.2s, background 0.2s;
      animation: fadeUp 0.4s ease forwards;
    }
    .project-card:hover { border-color: #444; background: #0d0d0d; }
    .chat-msg { animation: fadeUp 0.3s ease forwards; }
    a { color: #fff; text-decoration: underline; text-underline-offset: 3px; }
    a:hover { opacity: 0.7; }
    .scanline {
      position: fixed; top: 0; left: 0; right: 0; height: 2px;
      background: rgba(255,255,255,0.03); pointer-events: none;
      animation: scanline 8s linear infinite; z-index: 9999;
    }
    .tag {
      display: inline-block; font-size: 10px; letter-spacing: 1px;
      padding: 2px 6px; border: 1px solid #2a2a2a; color: #555;
      margin: 2px; text-transform: uppercase;
    }
    .reset-btn {
      background: transparent; color: #fff; border: 1px solid #333;
      padding: 8px 20px; font-family: inherit; font-size: 12px;
      cursor: pointer; letter-spacing: 1px; transition: border-color 0.2s;
    }
    .reset-btn:hover { border-color: #fff; }
    .game-cell {
      aspect-ratio: 1; background: #000; border: none;
      color: #fff; font-family: inherit; font-size: 28px;
      cursor: pointer; display: flex; align-items: center;
      justify-content: center; transition: background 0.15s;
    }
    .game-cell:hover:not(:disabled) { background: #0d0d0d; }
    .send-btn {
      background: #fff; color: #000; border: none; padding: 8px 16px;
      font-family: inherit; font-size: 12px; font-weight: 700;
      letter-spacing: 1px; cursor: pointer; flex-shrink: 0;
      transition: opacity 0.2s;
    }
    .send-btn:hover { opacity: 0.8; }
    .send-btn:disabled { opacity: 0.3; cursor: not-allowed; }
  `}</style>
)

// --- DATA ---
const PROFILE = {
  name: 'Vinayak Dubey',
  role: 'Software Developer @ Oracle',
  location: 'Bengaluru, India',
  email: 'vinayak.d.dubey@oracle.com',
  linkedin: 'https://linkedin.com/in/vinayaksde',
  github: 'https://github.com/VinayakDubey07',
  medium: 'https://medium.com/@vinayakdubey.is20',
}

const SYSTEM_PROMPT = `You are an AI assistant for Vinayak Dubey's portfolio website. 
You answer questions about Vinayak in a concise, technical, terminal-style manner.
Keep responses short (2-5 sentences max), factual, and confident.
Use plain text only — no markdown, no asterisks, no bullet symbols.
If asked something you don't know, say so briefly.

ABOUT VINAYAK:
- Software Developer at Oracle Corporation, Bengaluru (2024-Present)
- Works on enterprise-scale applications, distributed systems, ODI/Database development
- Previously: TimelyAI (Intern, 2023), Exquisite Founding Member (2022-2023), StepApp Developer (2022-2023)
- Skills: C++, Python, JavaScript, SQL, PyTorch, LangChain, RAG Systems, React, Next.js, Node.js, Docker, Kubernetes, AWS
- Projects: Decentralized Image Storage (Blockchain/IPFS), AI Article Summarizer (NLP/OpenAI), Blockchain Multi-chat App (Gun.js/WebRTC)
- Contact: vinayak.d.dubey@oracle.com
- Open to interesting technical challenges and consulting`

const PROJECTS = [
  {
    id: 'p1',
    name: 'Decentralized Image Storage',
    desc: 'Peer-to-peer image storage using blockchain and IPFS. Eliminates central server dependency with on-chain verification.',
    tags: ['Blockchain', 'IPFS', 'Web3', 'Solidity'],
    year: '2023',
  },
  {
    id: 'p2',
    name: 'AI Article Summarizer',
    desc: 'NLP pipeline leveraging OpenAI to distill long-form content. Supports batch processing with configurable output length.',
    tags: ['NLP', 'OpenAI', 'Python', 'RAG'],
    year: '2023',
  },
  {
    id: 'p3',
    name: 'Blockchain Multi-Chat',
    desc: 'Serverless real-time messaging app using Gun.js and WebRTC. No central server, fully encrypted P2P communication.',
    tags: ['Gun.js', 'WebRTC', 'P2P', 'JavaScript'],
    year: '2022',
  },
]

// --- TIC TAC TOE ---
const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [winner, setWinner] = useState(null)
  const [status, setStatus] = useState('YOUR TURN [X]')

  const checkWinner = squares => {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
    for (const [a,b,c] of lines) {
      if (squares[a] && squares[a]===squares[b] && squares[a]===squares[c]) return squares[a]
    }
    return squares.includes(null) ? null : 'DRAW'
  }

  const minimax = (sq, isMax) => {
    const w = checkWinner(sq)
    if (w === 'O') return 10
    if (w === 'X') return -10
    if (!sq.includes(null)) return 0
    const scores = sq.map((v,i) => {
      if (v) return isMax ? -Infinity : Infinity
      const next = [...sq]; next[i] = isMax ? 'O' : 'X'
      return minimax(next, !isMax)
    })
    return isMax ? Math.max(...scores) : Math.min(...scores)
  }

  const getBestMove = squares => {
    let best = -Infinity, move = -1
    squares.forEach((v, i) => {
      if (!v) {
        const next = [...squares]; next[i] = 'O'
        const score = minimax(next, false)
        if (score > best) { best = score; move = i }
      }
    })
    return move
  }

  const handleClick = index => {
    if (board[index] || winner || !isPlayerTurn) return
    const nb = [...board]; nb[index] = 'X'
    setBoard(nb); setIsPlayerTurn(false)
    const r = checkWinner(nb)
    if (r) { setWinner(r); setStatus(r==='DRAW'?'DRAW — WELL PLAYED':'YOU WIN'); return }
    setStatus('COMPUTING...')
  }

  useEffect(() => {
    if (!isPlayerTurn && !winner) {
      const t = setTimeout(() => {
        const move = getBestMove(board)
        if (move === -1) return
        const nb = [...board]; nb[move] = 'O'
        setBoard(nb); setIsPlayerTurn(true)
        const r = checkWinner(nb)
        if (r) { setWinner(r); setStatus(r==='DRAW'?'DRAW':'SYSTEM WINS') }
        else setStatus('YOUR TURN [X]')
      }, 500)
      return () => clearTimeout(t)
    }
  }, [isPlayerTurn, board, winner])

  const reset = () => { setBoard(Array(9).fill(null)); setWinner(null); setIsPlayerTurn(true); setStatus('YOUR TURN [X]') }

  return (
    <div style={{ textAlign: 'center', paddingTop: '20px' }}>
      <div style={{ fontSize: '11px', letterSpacing: '2px', color: theme.dim, marginBottom: '24px' }}>
        STATUS: {status}
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px',
        maxWidth: '240px', margin: '0 auto', background: '#1a1a1a',
      }}>
        {board.map((cell, i) => (
          <button key={i} className="game-cell"
            onClick={() => handleClick(i)} disabled={!!cell||!!winner}
            style={{ background: cell==='X'?'#080808':cell==='O'?'#0f0f0f':'#000' }}>
            <span style={{ color: cell==='X'?'#fff':'#888' }}>{cell}</span>
          </button>
        ))}
      </div>
      {winner && (
        <button className="reset-btn" onClick={reset} style={{ marginTop: '28px' }}>
          RESTART.EXE
        </button>
      )}
      <div style={{ marginTop: '20px', fontSize: '10px', color: '#2a2a2a', letterSpacing: '1px' }}>
        OPPONENT: MINIMAX ALGORITHM
      </div>
    </div>
  )
}

// --- BLOGS ---
const Blogs = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [offline, setOffline] = useState(false)

  useEffect(() => {
    fetch('https://hn.algolia.com/api/v1/search_by_date?query=LLM+OR+Generative+AI&tags=story&hitsPerPage=8')
      .then(r => r.json())
      .then(d => { setArticles(d.hits); setLoading(false) })
      .catch(() => {
        setArticles([
          { title: 'Attention Is All You Need', url: 'https://arxiv.org/abs/1706.03762', created_at: null },
          { title: 'GPT-4 Technical Report', url: 'https://arxiv.org/abs/2303.08774', created_at: null },
          { title: 'LangChain Documentation', url: 'https://docs.langchain.com', created_at: null },
        ])
        setOffline(true); setLoading(false)
      })
  }, [])

  if (loading) return (
    <div style={{ color: theme.dim, fontSize: '13px', paddingTop: '10px' }}>
      <div>&gt; Fetching AI research feeds...</div>
      <div style={{ marginTop: '8px' }}><span className="cursor" /></div>
    </div>
  )

  return (
    <div>
      {offline && <div style={{ color: theme.dim, fontSize: '11px', marginBottom: '20px', letterSpacing: '1px' }}>! OFFLINE MODE — SHOWING ARCHIVES</div>}
      {articles.map((a, i) => (
        <div key={i} className="fade-up" style={{ marginBottom: '22px', animationDelay: `${i*40}ms` }}>
          <div style={{ fontSize: '10px', color: theme.dim, letterSpacing: '1px', marginBottom: '4px' }}>
            {a.created_at ? new Date(a.created_at).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}) : 'ARCHIVE'}
            {' · '}{String(i+1).padStart(2,'0')}
          </div>
          <a href={a.url} target="_blank" rel="noreferrer" style={{ fontSize: '14px', fontWeight: '500' }}>
            {a.title}
          </a>
        </div>
      ))}
    </div>
  )
}

// --- PROJECTS ---
const Projects = () => (
  <div style={{ display: 'grid', gap: '12px' }}>
    {PROJECTS.map((p, i) => (
      <div key={p.id} className="project-card fade-up" style={{ animationDelay: `${i*80}ms` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '14px', fontWeight: '700', letterSpacing: '0.5px' }}>{p.name}</span>
          <span style={{ fontSize: '10px', color: theme.dim, letterSpacing: '1px' }}>{p.year}</span>
        </div>
        <div style={{ fontSize: '13px', color: '#aaa', marginBottom: '12px', lineHeight: '1.7' }}>{p.desc}</div>
        <div>{p.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
      </div>
    ))}
  </div>
)

// --- CLAUDE-POWERED CHAT ---
const AIChat = () => {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [booted, setBooted] = useState(false)
  const endRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const steps = [
      { sender: 'SYS', text: 'Initializing Claude-powered agent...' },
      { sender: 'SYS', text: 'Loading knowledge context...' },
      { sender: 'SYS', text: 'Agent online. Ask me anything about Vinayak.' },
    ]
    let delay = 0
    steps.forEach((s, i) => {
      delay += 600
      setTimeout(() => {
        setHistory(prev => [...prev, s])
        if (i === steps.length - 1) {
          setBooted(true)
          setTimeout(() => inputRef.current?.focus(), 100)
        }
      }, delay)
    })
  }, [])

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [history, loading])

  const sendMessage = async () => {
    if (!input.trim() || loading || !booted) return
    const userText = input.trim()
    setInput('')
    setHistory(prev => [...prev, { sender: 'USR', text: userText }])
    setLoading(true)

    // Build conversation history for the API
    const conversationHistory = history
      .filter(m => m.sender === 'USR' || m.sender === 'AI')
      .map(m => ({ role: m.sender === 'USR' ? 'user' : 'assistant', content: m.text }))

    conversationHistory.push({ role: 'user', content: userText })

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: conversationHistory,
        }),
      })
      const data = await response.json()
      const replyText = data.content?.map(b => b.text || '').join('') || 'No response received.'
      setHistory(prev => [...prev, { sender: 'AI', text: replyText }])
    } catch {
      setHistory(prev => [...prev, { sender: 'AI', text: 'Connection error. Claude API unreachable.' }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }

  return (
    <div style={{
      border: '1px solid #1a1a1a', background: theme.surface,
      display: 'flex', flexDirection: 'column', height: '480px',
    }}>
      {/* Header */}
      <div style={{
        borderBottom: '1px solid #1a1a1a', padding: '10px 16px',
        fontSize: '10px', letterSpacing: '2px', color: theme.dim,
        display: 'flex', justifyContent: 'space-between',
      }}>
        <span>CLAUDE-POWERED AGENT v2.0</span>
        <span style={{ color: booted ? '#4a4' : '#555' }}>● {booted ? 'ONLINE' : 'BOOTING'}</span>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', fontSize: '13px', lineHeight: '1.7' }}>
        {history.map((msg, i) => (
          <div key={i} className="chat-msg" style={{ marginBottom: '14px' }}>
            <span style={{
              color: msg.sender === 'USR' ? '#aaa' : msg.sender === 'SYS' ? '#2a2a2a' : '#555',
              fontWeight: '700', marginRight: '8px', fontSize: '10px', letterSpacing: '1px',
            }}>
              {msg.sender === 'AI' ? '[AGENT]' : msg.sender === 'USR' ? '[YOU]' : '[SYS]'}
            </span>
            <span style={{
              color: msg.sender === 'USR' ? '#fff' : msg.sender === 'SYS' ? '#333' : '#ccc',
              whiteSpace: 'pre-wrap',
            }}>{msg.text}</span>
          </div>
        ))}
        {loading && (
          <div style={{ color: theme.dim, fontSize: '13px' }}>
            <span style={{ fontWeight: '700', marginRight: '8px', fontSize: '10px' }}>[AGENT]</span>
            Processing<span className="cursor" />
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div style={{ borderTop: '1px solid #1a1a1a', padding: '10px 16px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <span style={{ color: theme.dim, fontSize: '12px' }}>&gt;</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder={booted ? 'Ask about Vinayak...' : 'Booting...'}
          disabled={!booted || loading}
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            color: '#fff', fontFamily: theme.font, fontSize: '14px',
          }}
        />
        <button className="send-btn" onClick={sendMessage} disabled={!booted || loading || !input.trim()}>
          SEND
        </button>
      </div>
    </div>
  )
}

// --- CONTENT SECTIONS ---
const SECTIONS = {
  intro: {
    cmd: 'cat profile.txt',
    render: () => (
      <div style={{ lineHeight: '2' }}>
        <div style={{ fontSize: '22px', fontWeight: '700', letterSpacing: '-0.5px', marginBottom: '16px' }}>
          {PROFILE.name}
        </div>
        <div style={{ color: theme.dim, marginBottom: '24px', letterSpacing: '1px', fontSize: '12px' }}>
          SOFTWARE DEVELOPER · ORACLE CORPORATION · BENGALURU
        </div>
        <div style={{ fontSize: '14px', color: '#bbb', maxWidth: '500px', lineHeight: '1.9' }}>
          Building robust, scalable systems at the intersection of Artificial Intelligence and Distributed Computing.
          Focused on high-throughput database architecture and intelligent agent frameworks.
        </div>
        <div style={{ marginTop: '32px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {[['GitHub', PROFILE.github], ['LinkedIn', PROFILE.linkedin], ['Medium', PROFILE.medium]].map(([label, url]) => (
            <a key={label} href={url} target="_blank" rel="noreferrer"
              style={{ fontSize: '11px', letterSpacing: '1.5px', color: theme.dim }}>
              {label} ↗
            </a>
          ))}
        </div>
      </div>
    ),
  },
  about: {
    cmd: 'cat about.txt',
    render: () => (
      <TypedText text={`PROFESSIONAL SUMMARY\n\nSoftware Developer at Oracle with expertise in AI Agents and Database development. Track record of designing scalable enterprise solutions. Strong foundation in Algorithms & Data Structures with expertise in Distributed Systems Architecture.\n\nI thrive at the edge of AI systems and production infrastructure — building things that work reliably at scale.`} />
    ),
  },
  experience: {
    cmd: "history | grep work",
    render: () => (
      <TypedText text={`ORACLE CORPORATION — Software Developer\n2024 - Present · Bengaluru\n\n  • Enterprise-scale application development\n  • Distributed systems & API implementation\n  • ODI/Database optimization for high-throughput\n  • Core infrastructure contribution\n\n──────────────────────────────────────\n\nTIMELY AI — Software Engineering Intern\nJuly 2023 · Remote\n\n  • Automated business processes using AI pipelines\n  • Abstracted operational workflows for professionals\n  • Integrated LLM solutions for efficiency gains\n\n──────────────────────────────────────\n\nEXQUISITE — Founding Member\nSep 2022 - May 2023\n\n  • Created MLPs for early-stage startups\n  • Led rapid prototyping cycles\n  • Full-stack development across multiple products\n\n──────────────────────────────────────\n\nSTEPAPP — Developer\nSep 2022 - Jan 2023\n\n  • Core application development\n  • Feature implementation & performance optimization`} />
    ),
  },
  skills: {
    cmd: 'ls -la ./skills',
    render: () => (
      <TypedText text={`LANGUAGES\nC++  ·  Python  ·  JavaScript  ·  SQL\n\n──────────────────────────────────────\n\nAI / MACHINE LEARNING\nLLMs & Transformers  ·  RAG Systems  ·  PyTorch\nComputer Vision  ·  MLOps  ·  LangChain\nOpenAI API  ·  Vector Databases\n\n──────────────────────────────────────\n\nDEVOPS & CLOUD\nDocker  ·  Kubernetes  ·  Jenkins  ·  CI/CD\nTerraform  ·  AWS  ·  Prometheus  ·  Grafana\n\n──────────────────────────────────────\n\nFRAMEWORKS & TOOLS\nReact  ·  Next.js  ·  Node.js  ·  Express\nGun.js  ·  WebRTC  ·  IPFS  ·  Solidity`} />
    ),
  },
  projects: { cmd: 'ls ./projects', render: () => <Projects /> },
  blogs: { cmd: 'curl api/ai-research', render: () => <Blogs /> },
  game: { cmd: './tictactoe.sh', render: () => <TicTacToe /> },
  chat: { cmd: './agent --model=claude', render: () => <AIChat /> },
  contact: {
    cmd: 'whoami --contact',
    render: () => (
      <TypedText text={`EMAIL\n${PROFILE.email}\n\n──────────────────────────────────────\n\nPROFESSIONAL NETWORKS\n\nLinkedIn  ${PROFILE.linkedin}\nGitHub    ${PROFILE.github}\nMedium    ${PROFILE.medium}\n\n──────────────────────────────────────\n\nSTATUS\nOpen for interesting technical challenges and consulting.`} />
    ),
  },
}

// --- TYPED TEXT COMPONENT ---
const TypedText = ({ text }) => {
  const [displayed, setDisplayed] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    setDisplayed('')
    let i = 0
    ref.current = setInterval(() => {
      if (i < text.length) { setDisplayed(text.slice(0, i + 1)); i++ }
      else clearInterval(ref.current)
    }, 8)
    return () => clearInterval(ref.current)
  }, [text])

  const renderLine = (line, i) => {
    const urlRe = /https?:\/\/\S+/g
    if (!urlRe.test(line)) return <div key={i} style={{ minHeight: '1.6em' }}>{line}</div>
    const parts = []; let last = 0; let m
    urlRe.lastIndex = 0
    while ((m = urlRe.exec(line)) !== null) {
      if (m.index > last) parts.push(<span key={last}>{line.slice(last, m.index)}</span>)
      parts.push(<a key={m.index} href={m[0]} target="_blank" rel="noreferrer">{m[0]}</a>)
      last = m.index + m[0].length
    }
    if (last < line.length) parts.push(<span key={last}>{line.slice(last)}</span>)
    return <div key={i} style={{ minHeight: '1.6em' }}>{parts}</div>
  }

  return (
    <div style={{ fontSize: '13px', lineHeight: '1.9', color: '#ccc', whiteSpace: 'pre-wrap' }}>
      {displayed.split('\n').map(renderLine)}
      <span className="cursor" />
    </div>
  )
}

// --- MAIN ---
export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('intro')

  const tabs = Object.keys(SECTIONS)
  const TAB_LABELS = {
    intro: 'HOME', about: 'ABOUT', experience: 'WORK',
    skills: 'SKILLS', projects: 'PROJECTS', blogs: 'RESEARCH',
    game: 'PLAY', chat: 'AI CHAT', contact: 'CONTACT',
  }

  return (
    <>
      <GlobalStyles />
      <div className="scanline" />
      <div style={{
        minHeight: '100vh', background: theme.bg, color: theme.text,
        fontFamily: theme.font, padding: '40px 20px',
      }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>

          {/* HEADER */}
          <header style={{
            display: 'flex', gap: '32px', alignItems: 'center',
            marginBottom: '48px', paddingBottom: '32px',
            borderBottom: '1px solid #111', flexWrap: 'wrap',
          }}>
            <div style={{
              width: '80px', height: '80px', flexShrink: 0,
              border: '1px solid #1a1a1a', overflow: 'hidden',
            }}>
              <img src="/1000108932.jpg" alt="Vinayak" style={{
                width: '100%', height: '100%', objectFit: 'cover',
                filter: 'grayscale(100%) contrast(1.3)',
              }} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '-0.5px', marginBottom: '6px' }}>
                Vinayak Dubey
              </div>
              <div style={{ fontSize: '11px', color: theme.dim, letterSpacing: '2px', marginBottom: '12px' }}>
                SOFTWARE DEVELOPER · ORACLE
              </div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                border: '1px solid #1a1a1a', padding: '4px 10px', fontSize: '10px',
                letterSpacing: '1.5px', color: '#4a4',
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4a4', display: 'inline-block' }} />
                ONLINE
              </div>
            </div>
          </header>

          {/* NAV */}
          <nav style={{
            display: 'flex', flexWrap: 'wrap', gap: '0',
            marginBottom: '40px', borderBottom: '1px solid #111',
          }}>
            {tabs.map(tab => (
              <button key={tab} className={`nav-btn${activeTab===tab?' active':''}`}
                onClick={() => setActiveTab(tab)}>
                {TAB_LABELS[tab] || tab.toUpperCase()}
              </button>
            ))}
          </nav>

          {/* CONTENT */}
          <main style={{ minHeight: '400px' }}>
            <div style={{
              fontSize: '10px', color: '#2a2a2a', letterSpacing: '1.5px',
              marginBottom: '24px', fontWeight: '500',
            }}>
              $ {SECTIONS[activeTab].cmd}
            </div>
            <div key={activeTab} className="fade-up">
              {SECTIONS[activeTab].render()}
            </div>
          </main>

          {/* FOOTER */}
          <footer style={{
            marginTop: '80px', paddingTop: '20px', borderTop: '1px solid #111',
            display: 'flex', justifyContent: 'space-between',
            fontSize: '10px', color: '#222', letterSpacing: '1px',
          }}>
            <span>user@oracle:~/portfolio/{activeTab}$ _</span>
            <span>© 2025 VINAYAK DUBEY</span>
          </footer>

        </div>
      </div>
    </>
  )
}