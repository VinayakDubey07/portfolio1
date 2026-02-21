import React, { useState, useEffect, useRef } from "react";

// ─── THEME ────────────────────────────────────────────────────────────────────
const THEMES = {
  dark: {
    bg: "#0a0a0a",
    bgAlt: "#111111",
    surface: "#141414",
    surfaceHover: "#1a1a1a",
    border: "#1e1e1e",
    borderHover: "#333",
    text: "#e8e8e8",
    textDim: "#555",
    textMid: "#888",
    green: "#3a7a3a",
    greenText: "#5fbd5f",
    cursor: "#e8e8e8",
    label: "DARK MODE",
  },
  light: {
    bg: "#f4f1ec",
    bgAlt: "#ede9e2",
    surface: "#e8e4db",
    surfaceHover: "#e0dbd1",
    border: "#c8c2b8",
    borderHover: "#a09890",
    text: "#1a1a1a",
    textDim: "#9a9080",
    textMid: "#5a5248",
    green: "#3a7a3a",
    greenText: "#2d6b2d",
    cursor: "#1a1a1a",
    label: "LIGHT MODE",
  },
};

// ─── KNOWLEDGE BASE ───────────────────────────────────────────────────────────
const KB = [
  {
    id: "greeting",
    keywords: ["hi", "hello", "hey", "greetings", "sup", "yo", "hola", "howdy"],
    weight: 1,
    response: () =>
      "Hey. I'm Vinayak's portfolio agent.\n\nI can answer questions about:\n→ experience & work history\n→ technical skills & stack\n→ projects & open source\n→ contact & availability\n\nWhat do you want to know?",
  },
  {
    id: "oracle",
    keywords: [
      "oracle",
      "current",
      "job",
      "work",
      "role",
      "employed",
      "company",
      "where work",
      "doing now",
    ],
    weight: 2,
    response: () =>
      "Currently at Oracle Corporation (Bengaluru, 2024–present).\n\nDay-to-day:\n→ Enterprise-scale application development\n→ Distributed systems architecture & APIs\n→ ODI / Database optimization for high-throughput loads\n→ Cross-team infrastructure work",
  },
  {
    id: "skills",
    keywords: [
      "skill",
      "stack",
      "technology",
      "technologies",
      "language",
      "framework",
      "tool",
      "know",
      "use",
      "work with",
      "expertise",
      "proficient",
    ],
    weight: 2,
    response: () =>
      "Primary stack:\n\nLanguages  →  C++, Python, JavaScript, SQL\nAI / ML    →  PyTorch, LangChain, RAG, Transformers\nWeb        →  React, Next.js, Node.js, Express\nDevOps     →  Docker, Kubernetes, AWS, Terraform\nOther      →  Solidity, IPFS, Gun.js, WebRTC",
  },
  {
    id: "ai_ml",
    keywords: [
      "ai",
      "ml",
      "machine learning",
      "artificial intelligence",
      "llm",
      "rag",
      "transformer",
      "langchain",
      "pytorch",
      "neural",
      "model",
      "gpt",
      "deep learning",
      "nlp",
    ],
    weight: 3,
    response: () =>
      "AI / ML is the primary focus.\n\nI work with:\n→ LLMs & fine-tuning (PyTorch, HuggingFace)\n→ RAG pipelines for grounded context injection\n→ LangChain for agent & chain orchestration\n→ Vector databases (Pinecone, Chroma)\n→ Computer Vision pipelines\n→ MLOps & model serving at scale",
  },
  {
    id: "blockchain",
    keywords: [
      "blockchain",
      "web3",
      "decentralized",
      "solidity",
      "ipfs",
      "smart contract",
      "crypto",
      "ethereum",
      "p2p",
      "peer",
    ],
    weight: 3,
    response: () =>
      "Solid Web3 experience.\n\nBuilt:\n→ Decentralized image storage (Solidity + IPFS)\n→ Serverless P2P chat using Gun.js + WebRTC\n→ On-chain verification for asset integrity\n\nNo central server dependencies in any of these.",
  },
  {
    id: "projects",
    keywords: [
      "project",
      "build",
      "portfolio",
      "app",
      "built",
      "made",
      "created",
      "work on",
      "side project",
      "github",
    ],
    weight: 2,
    response: () =>
      'Three key projects:\n\n[1] Decentralized Image Storage\n    Blockchain + IPFS, no central server\n\n[2] AI Article Summarizer\n    NLP pipeline on OpenAI, batch processing\n\n[3] Blockchain Multi-Chat\n    Gun.js + WebRTC, fully encrypted P2P\n\nClick "PROJECTS" tab for live previews & details.',
  },
  {
    id: "experience",
    keywords: [
      "experience",
      "background",
      "history",
      "career",
      "past",
      "previous",
      "resume",
      "cv",
      "worked",
      "internship",
      "intern",
    ],
    weight: 2,
    response: () =>
      "Work timeline:\n\nOracle Corp          2024–present  (Full-time)\nTimelyAI             Jul 2023      (Intern)\nExquisite            2022–2023     (Founding Member)\nStepApp              2022–2023     (Developer)\n\nAsk about any specific role for more detail.",
  },
  {
    id: "timely",
    keywords: ["timely", "timelyai", "timely ai"],
    weight: 3,
    response: () =>
      "TimelyAI (July 2023 internship, remote).\n\nFocused on automating business workflows for independent professionals. Built AI pipelines that abstracted operational overhead — letting people focus on creative work, not admin.",
  },
  {
    id: "exquisite",
    keywords: ["exquisite", "startup", "founding", "founder", "mlp", "minimum lovable"],
    weight: 3,
    response: () =>
      'Exquisite (Founding Member, 2022–2023).\n\nBuilt "Minimum Lovable Products" for early-stage startups. Led rapid prototyping cycles and full-stack development. Worked directly with founders to translate product vision into working code.',
  },
  {
    id: "contact",
    keywords: [
      "contact",
      "email",
      "reach",
      "hire",
      "available",
      "open to",
      "dm",
      "message",
      "connect",
      "talk",
    ],
    weight: 2,
    response: () =>
      "Contact:\n\nEmail     → vinayak.d.dubey@oracle.com\nLinkedIn  → linkedin.com/in/vinayaksde\nGitHub    → github.com/VinayakDubey07\n\nOpen to interesting technical challenges and consulting opportunities.",
  },
  {
    id: "location",
    keywords: [
      "where",
      "location",
      "city",
      "country",
      "based",
      "india",
      "bangalore",
      "bengaluru",
      "remote",
    ],
    weight: 2,
    response: () =>
      "Based in Bengaluru, India (IST timezone).\n\nOpen to remote collaboration globally.",
  },
  {
    id: "education",
    keywords: [
      "education",
      "degree",
      "university",
      "college",
      "study",
      "studied",
      "graduate",
      "school",
      "qualification",
    ],
    weight: 2,
    response: () =>
      "Engineering background with a focus on Computer Science.\n\nStrong foundation in Algorithms, Data Structures, and Distributed Systems — applied directly in professional work.",
  },
];

const generateResponse = (query, chatHistory) => {
  const q = query.toLowerCase().trim();
  if (!q || q.length < 2) {
    return "Please ask a question — I can answer about Vinayak's experience, skills, projects, or contact info.";
  }

  const scores = KB.map((entry) => {
    let score = 0;
    for (const kw of entry.keywords) {
      if (q === kw) {
        score += 4 * entry.weight;
      } else if (q.includes(kw)) {
        score += 2 * entry.weight;
      } else {
        const qWords = q.split(/\s+/);
        const kwWords = kw.split(/\s+/);
        for (const qw of qWords) {
          for (const kw2 of kwWords) {
            if (qw.length > 2 && kw2.includes(qw)) score += 1 * entry.weight;
            else if (kw2.length > 2 && qw.includes(kw2)) score += 1 * entry.weight;
          }
        }
      }
    }
    const recentTopics = chatHistory
      .slice(-4)
      .map((m) => m.topic)
      .filter(Boolean);
    if (recentTopics.includes(entry.id)) score *= 0.5;
    return { entry, score };
  });

  scores.sort((a, b) => b.score - a.score);
  const best = scores[0];

  if (best.score === 0) {
    return "Not sure I have data on that. Try asking about:\n→ skills, experience, projects, contact\n→ oracle, blockchain, ai/ml";
  }

  return { text: best.entry.response(), topic: best.entry.id };
};

// ─── STORAGE HOOK ─────────────────────────────────────────────────────────────
const useStorage = () => {
  const get = async (key, shared = false) => {
    try {
      return await window.storage?.get(key, shared);
    } catch {
      return null;
    }
  };
  const set = async (key, value, shared = false) => {
    try {
      return await window.storage?.set(key, value, shared);
    } catch {
      return null;
    }
  };
  return { get, set };
};

// ─── STYLES ───────────────────────────────────────────────────────────────────
const makeStyles = (t) => ({
  root: {
    minHeight: "100vh",
    backgroundColor: t.bg,
    color: t.text,
    fontFamily: '"JetBrains Mono", "Fira Code", "Courier New", monospace',
    padding: "48px 24px 80px",
    transition: "background 0.3s ease, color 0.3s ease",
    letterSpacing: "0.3px",
  },
  inner: { maxWidth: "860px", margin: "0 auto" },
  header: {
    display: "flex",
    gap: "28px",
    alignItems: "flex-start",
    marginBottom: "52px",
    paddingBottom: "36px",
    borderBottom: `1px solid ${t.border}`,
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  headerLeft: {
    display: "flex",
    gap: "28px",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  photo: {
    width: "72px",
    height: "72px",
    objectFit: "cover",
    flexShrink: 0,
    filter: "grayscale(100%) contrast(1.25)",
    border: `1px solid ${t.border}`,
  },
  name: {
    fontSize: "22px",
    fontWeight: "700",
    letterSpacing: "-0.5px",
    marginBottom: "4px",
  },
  roleText: {
    fontSize: "11px",
    color: t.textDim,
    letterSpacing: "2px",
    marginBottom: "14px",
  },
  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    border: `1px solid ${t.border}`,
    padding: "3px 10px",
    fontSize: "10px",
    letterSpacing: "1.5px",
    color: t.greenText,
  },
  themeBtn: {
    background: "transparent",
    border: `1px solid ${t.border}`,
    color: t.textDim,
    cursor: "pointer",
    padding: "6px 12px",
    fontSize: "10px",
    fontFamily: "inherit",
    letterSpacing: "1.5px",
    transition: "border-color 0.2s, color 0.2s",
    flexShrink: 0,
    alignSelf: "flex-start",
  },
  nav: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: "40px",
    borderBottom: `1px solid ${t.border}`,
  },
  content: { minHeight: "420px" },
  cmdLine: {
    fontSize: "10px",
    color: t.textDim,
    letterSpacing: "1.5px",
    marginBottom: "28px",
  },
  footer: {
    marginTop: "80px",
    paddingTop: "20px",
    borderTop: `1px solid ${t.border}`,
    display: "flex",
    justifyContent: "space-between",
    fontSize: "10px",
    color: t.textDim,
    letterSpacing: "1px",
    flexWrap: "wrap",
    gap: "8px",
  },
});

// ─── TYPED TEXT ───────────────────────────────────────────────────────────────
const TypedText = ({ text, t }) => {
  const [displayed, setDisplayed] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    ref.current = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(ref.current);
      }
    }, 7);
    return () => clearInterval(ref.current);
  }, [text]);

  return (
    <div
      style={{
        fontSize: "13px",
        lineHeight: "1.95",
        color: t.textMid,
        whiteSpace: "pre-wrap",
      }}
    >
      {displayed}
      <span
        style={{
          display: "inline-block",
          width: "7px",
          height: "14px",
          background: t.cursor,
          verticalAlign: "text-bottom",
          marginLeft: "2px",
          animation: "blink 1s step-end infinite",
        }}
      />
    </div>
  );
};

// ─── PROJECT CARDS ────────────────────────────────────────────────────────────
const ImgStoragePreview = ({ t }) => (
  <div
    style={{
      background: t.bgAlt,
      border: `1px solid ${t.border}`,
      padding: "16px",
      fontSize: "11px",
      fontFamily: "inherit",
      lineHeight: "1.8",
      color: t.textMid,
    }}
  >
    <div style={{ color: t.textDim, marginBottom: "8px" }}>
      {"// ipfs_store.sol (simplified)"}
    </div>
    <div>
      <span style={{ color: t.textMid }}>contract</span>{" "}
      <span style={{ color: t.text }}>ImageStore</span> {"{"}
    </div>
    <div>&nbsp;&nbsp;mapping(address =&gt; string[]) public images;</div>
    <div>
      &nbsp;&nbsp;<span style={{ color: t.textMid }}>function</span>{" "}
      <span style={{ color: t.text }}>store</span>(string memory cid) public {"{"}{" "}
    </div>
    <div>&nbsp;&nbsp;&nbsp;&nbsp;images[msg.sender].push(cid);</div>
    <div>&nbsp;&nbsp;{"}"}</div>
    <div>{"}"}</div>
    <div
      style={{
        marginTop: "12px",
        padding: "8px",
        background: t.surface,
        borderLeft: `2px solid ${t.border}`,
      }}
    >
      <div style={{ color: t.textDim }}>→ CID: QmX9k3f...a72b</div>
      <div style={{ color: t.textDim }}>→ TX: 0xd4e8...f91a</div>
      <div style={{ color: t.greenText }}>✓ Pinned to IPFS</div>
    </div>
  </div>
);

const SummarizerPreview = ({ t }) => (
  <div
    style={{
      background: t.bgAlt,
      border: `1px solid ${t.border}`,
      padding: "16px",
      fontSize: "11px",
      fontFamily: "inherit",
      lineHeight: "1.8",
      color: t.textMid,
    }}
  >
    <div style={{ color: t.textDim, marginBottom: "8px" }}>
      $ python summarize.py --url &quot;...&quot;
    </div>
    <div style={{ color: t.textDim }}>› Fetching article... done</div>
    <div style={{ color: t.textDim }}>› Chunking (2,847 tokens)... done</div>
    <div style={{ color: t.textDim }}>› Embedding + retrieval... done</div>
    <div style={{ color: t.textDim }}>› Generating summary...</div>
    <div
      style={{
        marginTop: "12px",
        padding: "10px",
        background: t.surface,
        borderLeft: `2px solid ${t.border}`,
      }}
    >
      <div style={{ color: t.text, fontWeight: "600", marginBottom: "4px" }}>
        SUMMARY
      </div>
      <div style={{ color: t.textMid }}>
        Researchers demonstrate a novel approach to sparse attention with 40% reduced
        compute on long-context tasks...
      </div>
    </div>
    <div style={{ marginTop: "8px", color: t.greenText }}>
      ✓ 2847 → 94 tokens (96.7% compression)
    </div>
  </div>
);

const ChatPreview = ({ t }) => (
  <div
    style={{
      background: t.bgAlt,
      border: `1px solid ${t.border}`,
      padding: "16px",
      fontSize: "11px",
      fontFamily: "inherit",
      lineHeight: "1.8",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "10px",
        color: t.textDim,
      }}
    >
      <span>p2p-chat://room/0xf9a2</span>
      <span style={{ color: t.greenText }}>2 peers</span>
    </div>
    {[
      { from: "peer_A", msg: "No server. No logs.", align: "left" },
      { from: "you", msg: "Fully decentralized?", align: "right" },
      { from: "peer_A", msg: "Gun.js + WebRTC. Direct.", align: "left" },
    ].map((m, i) => (
      <div
        key={i}
        style={{
          display: "flex",
          justifyContent: m.align === "right" ? "flex-end" : "flex-start",
          marginBottom: "6px",
        }}
      >
        <div
          style={{
            background: m.align === "right" ? t.surface : t.surfaceHover,
            border: `1px solid ${t.border}`,
            padding: "4px 10px",
            maxWidth: "70%",
            color: m.align === "right" ? t.text : t.textMid,
          }}
        >
          <span style={{ color: t.textDim, marginRight: "6px" }}>{m.from}:</span>
          {m.msg}
        </div>
      </div>
    ))}
    <div style={{ marginTop: "10px", color: t.textDim, fontSize: "10px" }}>
      🔒 E2E encrypted · no relay server
    </div>
  </div>
);

const PROJECTS = [
  {
    id: "img-storage",
    name: "Decentralized Image Storage",
    year: "2023",
    tags: ["Solidity", "IPFS", "Web3", "Ethereum"],
    desc: "Blockchain-backed image storage. Files pinned to IPFS, hashes verified on-chain. Zero central server.",
    Preview: ImgStoragePreview,
  },
  {
    id: "ai-summarizer",
    name: "AI Article Summarizer",
    year: "2023",
    tags: ["NLP", "OpenAI", "Python", "RAG"],
    desc: "NLP pipeline that ingests long-form articles and returns structured summaries. Supports batch mode.",
    Preview: SummarizerPreview,
  },
  {
    id: "blockchain-chat",
    name: "Blockchain Multi-Chat",
    year: "2022",
    tags: ["Gun.js", "WebRTC", "P2P", "Encryption"],
    desc: "Real-time encrypted P2P messaging. No server, no database. Peers connect directly via WebRTC.",
    Preview: ChatPreview,
  },
];

const ProjectCards = ({ t }) => {
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{ display: "grid", gap: "10px" }}>
      {PROJECTS.map((p, i) => {
        const isOpen = expanded === p.id;
        return (
          <div
            key={p.id}
            className="fade-up"
            style={{
              border: `1px solid ${isOpen ? t.borderHover : t.border}`,
              background: isOpen ? t.surface : "transparent",
              transition: "border-color 0.2s, background 0.2s",
              animationDelay: `${i * 60}ms`,
            }}
          >
            <button
              onClick={() => setExpanded(isOpen ? null : p.id)}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "18px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontFamily: "inherit",
                color: t.text,
                gap: "12px",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    marginBottom: "4px",
                  }}
                >
                  {p.name}
                </div>
                <div style={{ fontSize: "11px", color: t.textDim }}>{p.desc}</div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "6px",
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: "10px", color: t.textDim }}>{p.year}</span>
                <span
                  style={{
                    fontSize: "10px",
                    color: t.textDim,
                    border: `1px solid ${t.border}`,
                    padding: "2px 6px",
                  }}
                >
                  {isOpen ? "HIDE ↑" : "PREVIEW ↓"}
                </span>
              </div>
            </button>
            {isOpen && (
              <div style={{ padding: "0 20px 20px" }}>
                <div style={{ marginBottom: "12px" }}>
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        display: "inline-block",
                        fontSize: "9px",
                        letterSpacing: "1px",
                        padding: "2px 7px",
                        border: `1px solid ${t.border}`,
                        color: t.textDim,
                        marginRight: "4px",
                        marginBottom: "4px",
                        textTransform: "uppercase",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p.Preview t={t} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// ─── GUESTBOOK ────────────────────────────────────────────────────────────────
const Guestbook = ({ t }) => {
  const { get, set } = useStorage();
  const [entries, setEntries] = useState([]);
  const [count, setCount] = useState(null);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState("idle");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const init = async () => {
      const countResult = await get("visitor_count", true);
      const currentCount = countResult ? parseInt(countResult.value) || 0 : 0;
      const newCount = currentCount + 1;
      await set("visitor_count", String(newCount), true);
      setCount(newCount);

      const entriesResult = await get("guestbook_entries", true);
      const existing = entriesResult ? JSON.parse(entriesResult.value) : [];
      setEntries(existing);
      setLoaded(true);
    };
    init();
  }, []);

  const submit = async () => {
    if (!name.trim() || !msg.trim()) return;
    setStatus("saving");
    const newEntry = {
      id: Date.now(),
      name: name.trim().slice(0, 32),
      msg: msg.trim().slice(0, 200),
      ts: new Date().toISOString().split("T")[0],
    };
    const updated = [newEntry, ...entries].slice(0, 20);
    await set("guestbook_entries", JSON.stringify(updated), true);
    setEntries(updated);
    setName("");
    setMsg("");
    setStatus("done");
    setTimeout(() => setStatus("idle"), 2000);
  };

  const inputStyle = {
    background: "transparent",
    border: `1px solid ${t.border}`,
    color: t.text,
    fontFamily: "inherit",
    fontSize: "12px",
    padding: "8px 12px",
    outline: "none",
    width: "100%",
    transition: "border-color 0.2s",
  };

  return (
    <div>
      <div
        style={{
          display: "inline-flex",
          gap: "16px",
          alignItems: "center",
          border: `1px solid ${t.border}`,
          padding: "10px 16px",
          marginBottom: "32px",
          fontSize: "11px",
          color: t.textMid,
        }}
      >
        <span style={{ color: t.textDim }}>TOTAL VISITORS</span>
        <span
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: t.text,
            letterSpacing: "2px",
          }}
        >
          {count !== null ? String(count).padStart(4, "0") : "—"}
        </span>
      </div>

      <div style={{ marginBottom: "32px" }}>
        <div
          style={{
            fontSize: "10px",
            letterSpacing: "2px",
            color: t.textDim,
            marginBottom: "14px",
          }}
        >
          LEAVE A MESSAGE
        </div>
        <div style={{ display: "grid", gap: "8px", maxWidth: "480px" }}>
          <input
            style={inputStyle}
            placeholder="your handle..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={32}
            onFocus={(e) => {
              e.target.style.borderColor = t.borderHover;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = t.border;
            }}
          />
          <textarea
            style={{ ...inputStyle, resize: "vertical", minHeight: "72px" }}
            placeholder="say something..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            maxLength={200}
            onFocus={(e) => {
              e.target.style.borderColor = t.borderHover;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = t.border;
            }}
          />
          <button
            onClick={submit}
            disabled={!name.trim() || !msg.trim() || status === "saving"}
            style={{
              background: status === "done" ? t.green : "transparent",
              color: status === "done" ? "#fff" : t.text,
              border: `1px solid ${status === "done" ? t.green : t.border}`,
              fontFamily: "inherit",
              fontSize: "11px",
              letterSpacing: "1.5px",
              padding: "8px 16px",
              cursor: "pointer",
              transition: "all 0.2s",
              alignSelf: "flex-start",
            }}
          >
            {status === "saving" ? "POSTING..." : status === "done" ? "✓ POSTED" : "POST →"}
          </button>
        </div>
      </div>

      {loaded && entries.length > 0 && (
        <div>
          <div
            style={{
              fontSize: "10px",
              letterSpacing: "2px",
              color: t.textDim,
              marginBottom: "14px",
            }}
          >
            MESSAGES ({entries.length})
          </div>
          {entries.map((e) => (
            <div
              key={e.id}
              className="fade-up"
              style={{
                borderLeft: `1px solid ${t.border}`,
                paddingLeft: "14px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  color: t.textDim,
                  marginBottom: "3px",
                }}
              >
                <span style={{ color: t.textMid, fontWeight: "600" }}>{e.name}</span>
                <span style={{ marginLeft: "10px" }}>{e.ts}</span>
              </div>
              <div
                style={{ fontSize: "12px", color: t.textMid, lineHeight: "1.7" }}
              >
                {e.msg}
              </div>
            </div>
          ))}
        </div>
      )}
      {loaded && entries.length === 0 && (
        <div style={{ fontSize: "12px", color: t.textDim }}>
          No messages yet. Be the first.
        </div>
      )}
    </div>
  );
};

// ─── AI CHAT ──────────────────────────────────────────────────────────────────
const AIChat = ({ t }) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [booted, setBooted] = useState(false);
  const inputRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    const steps = [
      "Initializing semantic matching engine...",
      "Loading knowledge vectors (local)...",
      "Agent ready.",
    ];
    let delay = 0;
    steps.forEach((text, i) => {
      delay += 700;
      setTimeout(() => {
        setHistory((prev) => [...prev, { sender: "SYS", text }]);
        if (i === steps.length - 1) {
          setBooted(true);
          setTimeout(() => inputRef.current?.focus(), 100);
        }
      }, delay);
    });
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isTyping]);

  const typeWrite = (text, topic) => {
    setIsTyping(true);
    setHistory((prev) => [...prev, { sender: "AI", text: "", topic }]);
    let i = 0;
    const interval = setInterval(() => {
      setHistory((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          ...next[next.length - 1],
          text: text.slice(0, i + 1),
        };
        return next;
      });
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 12);
  };

  const send = () => {
    if (!input.trim() || !booted || isTyping) return;
    const q = input.trim();
    setHistory((prev) => [...prev, { sender: "USR", text: q }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const result = generateResponse(q, history);
      setIsTyping(false);
      if (typeof result === "string") typeWrite(result, null);
      else typeWrite(result.text, result.topic);
    }, 600);
  };

  const msgColor = (sender) =>
    sender === "USR" ? t.text : sender === "SYS" ? t.border : t.textMid;
  const labelColor = (sender) =>
    sender === "USR" ? t.textDim : sender === "SYS" ? t.border : t.textDim;

  return (
    <div
      style={{
        border: `1px solid ${t.border}`,
        display: "flex",
        flexDirection: "column",
        height: "480px",
      }}
    >
      <div
        style={{
          borderBottom: `1px solid ${t.border}`,
          padding: "9px 16px",
          fontSize: "10px",
          letterSpacing: "2px",
          color: t.textDim,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>PORTFOLIO AGENT · KEYWORD ENGINE v2</span>
        <span style={{ color: booted ? t.greenText : t.textDim }}>
          ● {booted ? "ONLINE" : "BOOTING"}
        </span>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px",
          fontSize: "13px",
          lineHeight: "1.75",
        }}
      >
        {history.map((msg, i) => (
          <div
            key={i}
            style={{
              marginBottom: "14px",
              opacity: msg.sender === "SYS" ? 0.4 : 1,
            }}
          >
            <span
              style={{
                color: labelColor(msg.sender),
                fontWeight: "700",
                marginRight: "8px",
                fontSize: "10px",
                letterSpacing: "1px",
              }}
            >
              {msg.sender === "AI"
                ? "[AGENT]"
                : msg.sender === "USR"
                  ? "[YOU]"
                  : "[SYS]"}
            </span>
            <span style={{ color: msgColor(msg.sender), whiteSpace: "pre-wrap" }}>
              {msg.text}
            </span>
          </div>
        ))}
        {isTyping && history[history.length - 1]?.sender !== "AI" && (
          <div style={{ color: t.textDim, fontSize: "13px" }}>
            <span
              style={{
                fontWeight: "700",
                marginRight: "8px",
                fontSize: "10px",
              }}
            >
              [AGENT]
            </span>
            <span style={{ animation: "blink 1s step-end infinite" }}>_</span>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div
        style={{
          borderTop: `1px solid ${t.border}`,
          padding: "10px 16px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
          opacity: booted ? 1 : 0.4,
        }}
      >
        <span style={{ color: t.textDim, fontSize: "13px" }}>&gt;</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") send();
          }}
          placeholder={booted ? "Ask anything about Vinayak..." : "Booting..."}
          disabled={!booted || isTyping}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: t.text,
            fontFamily: "inherit",
            fontSize: "13px",
          }}
        />
        <button
          onClick={send}
          disabled={!booted || isTyping || !input.trim()}
          style={{
            background: t.text,
            color: t.bg,
            border: "none",
            padding: "7px 14px",
            fontFamily: "inherit",
            fontSize: "11px",
            fontWeight: "700",
            letterSpacing: "1px",
            cursor: "pointer",
            opacity: !booted || isTyping || !input.trim() ? 0.3 : 1,
            transition: "opacity 0.2s",
          }}
        >
          SEND
        </button>
      </div>
    </div>
  );
};

// ─── BLOGS ────────────────────────────────────────────────────────────────────
const Blogs = ({ t }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    fetch(
      "https://hn.algolia.com/api/v1/search_by_date?query=LLM+OR+Generative+AI&tags=story&hitsPerPage=8",
    )
      .then((r) => r.json())
      .then((d) => {
        setArticles(d.hits);
        setLoading(false);
      })
      .catch(() => {
        setArticles([
          {
            title: "Attention Is All You Need",
            url: "https://arxiv.org/abs/1706.03762",
            created_at: null,
          },
          {
            title: "GPT-4 Technical Report",
            url: "https://arxiv.org/abs/2303.08774",
            created_at: null,
          },
          {
            title: "LLaMA 2: Open Foundation Models",
            url: "https://arxiv.org/abs/2307.09288",
            created_at: null,
          },
        ]);
        setOffline(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ fontSize: "13px", color: t.textDim, lineHeight: "2" }}>
        <div>&gt; Querying Hacker News API...</div>
        <span
          style={{
            display: "inline-block",
            width: "7px",
            height: "14px",
            background: t.cursor,
            verticalAlign: "text-bottom",
            marginLeft: "2px",
            animation: "blink 1s step-end infinite",
          }}
        />
      </div>
    );
  }

  return (
    <div>
      {offline && (
        <div
          style={{
            fontSize: "10px",
            color: t.textDim,
            letterSpacing: "1.5px",
            marginBottom: "24px",
          }}
        >
          ! OFFLINE — SHOWING CURATED ARCHIVE
        </div>
      )}
      {articles.map((a, i) => (
        <div
          key={i}
          className="fade-up"
          style={{ marginBottom: "24px", animationDelay: `${i * 40}ms` }}
        >
          <div
            style={{
              fontSize: "10px",
              color: t.textDim,
              letterSpacing: "1px",
              marginBottom: "4px",
            }}
          >
            {String(i + 1).padStart(2, "0")} ·{" "}
            {a.created_at
              ? new Date(a.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "ARCHIVE"}
            {a.author ? ` · ${a.author}` : a.points ? ` · ${a.points} pts` : ""}
          </div>
          <a
            href={a.url}
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: t.text,
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            {a.title || "Untitled"}
          </a>
        </div>
      ))}
    </div>
  );
};

// ─── TIC-TAC-TOE ──────────────────────────────────────────────────────────────
const TicTacToe = ({ t }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [status, setStatus] = useState("YOUR MOVE [X]");

  const checkWinner = (sq) => {
    for (const [a, b, c] of [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]) {
      if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) return sq[a];
    }
    return sq.includes(null) ? null : "DRAW";
  };

  const minimax = (sq, isMax) => {
    const w = checkWinner(sq);
    if (w === "O") return 10;
    if (w === "X") return -10;
    if (!sq.includes(null)) return 0;
    const vals = sq.map((v, i) => {
      if (v) return isMax ? -Infinity : Infinity;
      const n = [...sq];
      n[i] = isMax ? "O" : "X";
      return minimax(n, !isMax);
    });
    return isMax ? Math.max(...vals) : Math.min(...vals);
  };

  const getBest = (squares) => {
    let best = -Infinity;
    let move = -1;
    squares.forEach((v, i) => {
      if (!v) {
        const n = [...squares];
        n[i] = "O";
        const s = minimax(n, false);
        if (s > best) {
          best = s;
          move = i;
        }
      }
    });
    return move;
  };

  const click = (i) => {
    if (board[i] || winner || !playerTurn) return;
    const nb = [...board];
    nb[i] = "X";
    setBoard(nb);
    setPlayerTurn(false);
    const r = checkWinner(nb);
    if (r) {
      setWinner(r);
      setStatus(r === "DRAW" ? "DRAW — WELL PLAYED" : "YOU WIN");
      return;
    }
    setStatus("COMPUTING...");
  };

  useEffect(() => {
    if (!playerTurn && !winner) {
      const timer = setTimeout(() => {
        const m = getBest(board);
        if (m === -1) return;
        const nb = [...board];
        nb[m] = "O";
        setBoard(nb);
        setPlayerTurn(true);
        const r = checkWinner(nb);
        if (r) {
          setWinner(r);
          setStatus(r === "DRAW" ? "DRAW" : "SYSTEM WINS");
        } else {
          setStatus("YOUR MOVE [X]");
        }
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [playerTurn, board, winner]);

  const reset = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setPlayerTurn(true);
    setStatus("YOUR MOVE [X]");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontSize: "10px",
          letterSpacing: "2px",
          color: t.textDim,
          marginBottom: "28px",
        }}
      >
        STATUS: {status}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "1px",
          maxWidth: "220px",
          margin: "0 auto",
          background: t.border,
        }}
      >
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => click(i)}
            disabled={!!cell || !!winner}
            style={{
              aspectRatio: "1",
              background: cell === "X" ? t.bgAlt : cell === "O" ? t.surface : t.bg,
              border: "none",
              color: cell === "X" ? t.text : t.textDim,
              fontSize: "24px",
              fontFamily: "inherit",
              cursor: !cell && !winner ? "pointer" : "default",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.15s",
            }}
          >
            {cell}
          </button>
        ))}
      </div>
      {winner && (
        <button
          onClick={reset}
          style={{
            marginTop: "28px",
            background: "transparent",
            color: t.text,
            border: `1px solid ${t.border}`,
            padding: "8px 20px",
            fontFamily: "inherit",
            fontSize: "11px",
            cursor: "pointer",
            letterSpacing: "1px",
            transition: "border-color 0.2s",
          }}
        >
          RESTART
        </button>
      )}
      <div
        style={{
          marginTop: "16px",
          fontSize: "10px",
          color: t.border,
          letterSpacing: "1px",
        }}
      >
        OPPONENT: MINIMAX ALGORITHM
      </div>
    </div>
  );
};

// ─── SECTIONS ─────────────────────────────────────────────────────────────────
const makeSections = (t) => ({
  intro: {
    label: "HOME",
    cmd: "cat readme.txt",
    render: () => (
      <div>
        <div
          style={{
            fontSize: "20px",
            fontWeight: "700",
            letterSpacing: "-0.5px",
            marginBottom: "10px",
            color: t.text,
          }}
        >
          Vinayak Dubey
        </div>
        <div
          style={{
            fontSize: "11px",
            color: t.textDim,
            letterSpacing: "2.5px",
            marginBottom: "24px",
          }}
        >
          SOFTWARE DEVELOPER · ORACLE CORPORATION · BENGALURU
        </div>
        <div
          style={{
            fontSize: "13px",
            color: t.textMid,
            maxWidth: "520px",
            lineHeight: "2",
            marginBottom: "32px",
          }}
        >
          Building robust, scalable systems at the intersection of Artificial
          Intelligence and Distributed Computing. Focused on high-throughput database
          architecture and intelligent agent frameworks.
        </div>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {[
            ["GitHub ↗", "https://github.com/VinayakDubey07"],
            ["LinkedIn ↗", "https://linkedin.com/in/vinayaksde"],
            ["Medium ↗", "https://medium.com/@vinayakdubey.is20"],
          ].map(([label, url]) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: "11px",
                letterSpacing: "1.5px",
                color: t.textDim,
                textDecoration: "none",
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    ),
  },
  about: {
    label: "ABOUT",
    cmd: "cat about.txt",
    render: () => (
      <TypedText
        t={t}
        text={
          "PROFESSIONAL SUMMARY\n\nSoftware Developer at Oracle with expertise in AI Agents and Database development. Proven track record of designing scalable enterprise solutions.\n\nStrong foundation in Algorithms & Data Structures with expertise in Distributed Systems Architecture.\n\nI thrive at the intersection of AI systems and production infrastructure — building things that work reliably at scale."
        }
      />
    ),
  },
  experience: {
    label: "WORK",
    cmd: "history | grep work",
    render: () => (
      <TypedText
        t={t}
        text={
          "ORACLE CORPORATION\n2024 – Present · Bengaluru, Full-time\n\n  → Enterprise-scale application development\n  → Distributed systems & API implementation\n  → ODI / Database optimization (high-throughput)\n  → Core infrastructure contribution\n\n──────────────────────────────\n\nTIMELY AI (Intern)\nJuly 2023 · Remote\n\n  → Automated business workflows using AI\n  → Abstracted operational overhead for professionals\n  → Integrated LLM pipelines for efficiency gains\n\n──────────────────────────────\n\nEXQUISITE (Founding Member)\nSep 2022 – May 2023\n\n  → Built MLPs for early-stage startups\n  → Led rapid prototyping & full-stack dev cycles\n  → Worked directly with founders on product vision\n\n──────────────────────────────\n\nSTEPAPP (Developer)\nSep 2022 – Jan 2023\n\n  → Core application development\n  → Feature implementation & perf optimization"
        }
      />
    ),
  },
  skills: {
    label: "SKILLS",
    cmd: "ls -la ./skills",
    render: () => (
      <TypedText
        t={t}
        text={
          "LANGUAGES\n  C++  ·  Python  ·  JavaScript  ·  SQL\n\n──────────────────────────────\n\nAI / MACHINE LEARNING\n  LLMs & Transformers  ·  RAG Systems\n  PyTorch  ·  LangChain  ·  Computer Vision\n  Vector DBs  ·  OpenAI API  ·  MLOps\n\n──────────────────────────────\n\nDEVOPS & CLOUD\n  Docker  ·  Kubernetes  ·  Jenkins\n  Terraform  ·  AWS  ·  Prometheus\n\n──────────────────────────────\n\nFRAMEWORKS & TOOLS\n  React  ·  Next.js  ·  Node.js  ·  Express\n  Solidity  ·  IPFS  ·  Gun.js  ·  WebRTC"
        }
      />
    ),
  },
  projects: {
    label: "PROJECTS",
    cmd: "ls ./projects --preview",
    render: () => <ProjectCards t={t} />,
  },
  blogs: {
    label: "RESEARCH",
    cmd: "curl api/ai-feed",
    render: () => <Blogs t={t} />,
  },
  game: {
    label: "PLAY",
    cmd: "./tictactoe.sh --ai=minimax",
    render: () => <TicTacToe t={t} />,
  },
  chat: {
    label: "CHAT",
    cmd: "./agent.sh --engine=semantic-v2",
    render: () => <AIChat t={t} />,
  },
  guestbook: {
    label: "GUESTBOOK",
    cmd: "open guestbook.db",
    render: () => <Guestbook t={t} />,
  },
  contact: {
    label: "CONTACT",
    cmd: "whoami --contact",
    render: () => (
      <TypedText
        t={t}
        text={
          "EMAIL\n  vinayak.d.dubey@oracle.com\n\nPROFESSIONAL NETWORKS\n  LinkedIn  →  linkedin.com/in/vinayaksde\n  GitHub    →  github.com/VinayakDubey07\n  Medium    →  medium.com/@vinayakdubey.is20\n\nSTATUS\n  Open for interesting technical challenges\n  and consulting opportunities."
        }
      />
    ),
  },
});

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [themeName, setThemeName] = useState("dark");
  const [activeTab, setActiveTab] = useState("intro");
  const t = THEMES[themeName];
  const s = makeStyles(t);
  const sections = makeSections(t);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body, html { margin: 0; padding: 0; }
        ::selection { background: ${t.text}; color: ${t.bg}; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: ${t.bg}; }
        ::-webkit-scrollbar-thumb { background: ${t.border}; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp 0.35s ease forwards; opacity: 0; }
        .nav-tab {
          background: transparent;
          border: none;
          border-bottom: 1.5px solid transparent;
          color: ${t.textDim};
          cursor: pointer;
          padding: 8px 14px;
          font-family: inherit;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          transition: color 0.18s, border-color 0.18s;
        }
        .nav-tab:hover { color: ${t.textMid}; }
        .nav-tab.active { color: ${t.text}; border-bottom-color: ${t.text}; }
      `}</style>

      <div style={s.root}>
        <div style={s.inner}>
          {/* HEADER */}
          <header style={s.header}>
            <div style={s.headerLeft}>
              <img src="/1000108932.jpg" alt="Vinayak" style={s.photo} />
              <div>
                <div style={s.name}>Vinayak Dubey</div>
                <div style={s.roleText}>SOFTWARE DEVELOPER · ORACLE CORPORATION</div>
                <div style={s.statusBadge}>
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: t.greenText,
                      display: "inline-block",
                    }}
                  />
                  AVAILABLE FOR CONSULTING
                </div>
              </div>
            </div>
            <button
              style={s.themeBtn}
              onClick={() => setThemeName((n) => (n === "dark" ? "light" : "dark"))}
            >
              {themeName === "dark" ? "◐ LIGHT" : "◑ DARK"}
            </button>
          </header>

          {/* NAV */}
          <nav style={s.nav}>
            {Object.entries(sections).map(([key, sec]) => (
              <button
                key={key}
                className={`nav-tab${activeTab === key ? " active" : ""}`}
                onClick={() => setActiveTab(key)}
              >
                {sec.label}
              </button>
            ))}
          </nav>

          {/* CONTENT */}
          <main style={s.content}>
            <div style={s.cmdLine}>$ {sections[activeTab].cmd}</div>
            <div key={activeTab} className="fade-up">
              {sections[activeTab].render()}
            </div>
          </main>

          {/* FOOTER */}
          <footer style={s.footer}>
            <span>user@oracle:~/portfolio/{activeTab}$ _</span>
            <span>© 2025 VINAYAK DUBEY</span>
          </footer>
        </div>
      </div>
    </>
  );
}
