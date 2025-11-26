import React, { useState, useEffect } from 'react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('intro');
  const [cursorVisible, setCursorVisible] = useState(true);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const sections = {
    intro: `Vinayak Dubey
═════════════

Software Developer @ Oracle
Bengaluru, India

────────────────────────────────────────────────────────────────

Building robust, scalable systems at the intersection of 
Artificial Intelligence and Distributed 
computing. Focused on delivering high-quality solutions that 
solve complex engineering challenges.`,

    about: `PROFESSIONAL SUMMARY
════════════════════

Software Developer at Oracle with demonstrated expertise 
in full-stack development, database development, and machine 
learning systems. 

Track record of designing and implementing scalable enterprise 
solutions, optimizing system performance, and driving technical 
innovation. Strong foundation in computer science fundamentals 
with focus on algorithms, data structures, and system design.

Core competencies include distributed systems architecture, 
cloud infrastructure, and building production-grade applications 
that serve users at scale.`,

    experience: `PROFESSIONAL EXPERIENCE
═══════════════════════

Software Developer
Oracle Corporation
2024 - Present | Bengaluru, India

• Ddeveloping enterprise-scale applications 
  with focus on reliability and performance
  
• Implementing API's and distributed 
  systems using modern cloud technologies
  
• Contributing to ODI/Database development serving 
  millions of users globally
  
• Collaborating with cross-functional teams on system design 
  and technical architecture decisions
  
• Optimizing application performance and database queries 
  for high-throughput systems`,

    skills: `TECHNICAL EXPERTISE
══════════════════

Programming Languages
────────────────────
C++ · Python · JavaScript · SQL · HTML5/CSS3

Frameworks & Technologies
─────────────────────────
Frontend:    React · Next.js · Bootstrap
Backend:     Node.js · Express
Database:    MongoDB · MySQL · Elasticsearch
Cloud:       AWS · Netlify · Vercel

Machine Learning & AI
─────────────────────
TensorFlow · Keras · Scikit-learn
Pandas · NumPy · Natural Language Processing (NLP)
Advanced Mathematics and Algorithm Knowledge

Blockchain & Web3
─────────────────
Smart Contracts · Decentralized Applications
Ethereum · Gun.js · Distributed Storage

Development Tools
─────────────────
Git · GitHub · GitLab · Jenkins
Ubuntu/Linux · CI/CD Pipelines

Areas of Expertise
──────────────────
• Full-Stack Web Development
• System Design & Architecture  
• Blockchain & Distributed Systems
• Machine Learning & AI Integration
• Algorithm Design & Optimization
• Cloud Infrastructure & DevOps`,

    projects: `FEATURED PROJECTS
═════════════════

[1] DECENTRALIZED IMAGE STORAGE & SHARING PLATFORM
    ───────────────────────────────────────────────
    Enterprise-grade blockchain-based system for secure image 
    storage and sharing with cryptographic verification.
    
    Tech Stack: Blockchain, Smart Contracts, IPFS
    GitHub: github.com/VinayakDubey07/Decentralised-Image-Sharing-And-Storing-System
    
    Key Features:
    • Decentralized storage architecture
    • End-to-end encryption
    • Smart contract-based access control
    • Immutable audit trails


[2] AI ARTICLE SUMMARIZER
    ──────────────────────
    Production-ready application leveraging NLP and machine 
    learning for intelligent article summarization.
    
    Tech Stack: React, OpenAI API, Node.js
    Live: shortthebig.netlify.app
    
    Key Features:
    • Real-time text processing
    • Advanced NLP algorithms
    • Responsive web interface
    • Optimized for performance


[3] BLOCKCHAIN MULTI-CHAT APPLICATION
    ──────────────────────────────────
    Decentralized messaging platform with end-to-end encryption 
    and distributed architecture using Gun.js.
    
    Tech Stack: Blockchain, Gun.js, React, WebRTC
    GitHub: github.com/VinayakDubey07/Chat-app-Blockchain
    
    Key Features:
    • Peer-to-peer messaging
    • No central server dependency
    • Cryptographic security
    • Real-time synchronization`,

    algorithms: `ALGORITHM IMPLEMENTATIONS
═════════════════════════

[1] SPLITWISE SETTLEMENT ALGORITHM
    ──────────────────────────────
    Optimized algorithm for minimizing transactions in group 
    expense settlements using graph theory and greedy approach.
    
    Complexity: O(N log N)
    GitHub: github.com/VinayakDubey07/splitwise-algorithm
    
    Implementation highlights:
    • Graph-based debt optimization
    • Minimum transaction calculation
    • Efficient settlement strategy


[2] HUFFMAN ENCODING FILE COMPRESSOR
    ─────────────────────────────────
    High-performance file compression utility implementing 
    Huffman encoding algorithm for lossless compression.
    
    Compression Ratio: Up to 40-60% reduction
    GitHub: github.com/VinayakDubey07/File-zipper
    
    Implementation highlights:
    • Custom binary tree structure
    • Frequency analysis optimization
    • Efficient bit manipulation
    • Support for various file types`,

    publications: `TECHNICAL WRITING
═════════════════

Publishing technical articles and insights on software 
development, system design, and emerging technologies.

Medium Blog: medium.com/@vinayakdubey.is20

Topics covered:
• Software Architecture & Design Patterns
• Blockchain Technology & Web3
• Machine Learning Applications
• Algorithm Optimization Techniques
• Best Practices in Software Engineering`,

    contact: `PROFESSIONAL CONTACT
════════════════════

Email
─────
vinayak.d.dubey@oracle.com

Professional Networks
─────────────────────
LinkedIn    linkedin.com/in/vinayaksde
GitHub      github.com/VinayakDubey07
Medium      medium.com/@vinayakdubey.is20

Location
────────
Amsterdam, Netherlands
Available for remote collaboration

────────────────────────────────────────────────────────────────

Open to discussing:
• Interesting technical challenges
• Collaboration opportunities  
• Speaking engagements
• Technical consulting

Response time: Within 24-48 hours`
  };

  const menuItems = [
    { key: 'intro', label: 'HOME' },
    { key: 'about', label: 'ABOUT' },
    { key: 'experience', label: 'EXPERIENCE' },
    { key: 'skills', label: 'SKILLS' },
    { key: 'projects', label: 'PROJECTS' },
    { key: 'algorithms', label: 'ALGORITHMS' },
    { key: 'publications', label: 'PUBLICATIONS' },
    { key: 'contact', label: 'CONTACT' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: '#FFFFFF',
      fontFamily: '"Courier New", Courier, monospace',
      padding: '40px 20px',
      lineHeight: '1.7',
      letterSpacing: '0.3px'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        {/* Header with photo */}
        <div style={{
          marginBottom: '50px',
          paddingBottom: '30px',
          borderBottom: '2px solid #333',
          display: 'flex',
          alignItems: 'center',
          gap: '30px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid #444',
            flexShrink: 0
          }}>
            <img 
              src="/1000108932.jpg"
              alt="Vinayak Dubey"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: '13px',
              color: '#888',
              marginBottom: '8px',
              letterSpacing: '1px'
            }}>
              Hi There 👋
            </div>
            <div style={{
              fontSize: '11px',
              color: '#666',
              fontStyle: 'italic'
            }}>
              Last updated: November 2025
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{
          marginBottom: '50px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '25px',
          fontSize: '13px',
          letterSpacing: '1.5px'
        }}>
          {menuItems.map(item => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              style={{
                background: 'none',
                border: 'none',
                color: activeSection === item.key ? '#FFFFFF' : '#666',
                cursor: 'pointer',
                fontSize: '13px',
                fontFamily: 'inherit',
                padding: '0',
                fontWeight: activeSection === item.key ? 'bold' : 'normal',
                transition: 'color 0.2s',
                letterSpacing: '1.5px'
              }}
              onMouseEnter={(e) => e.target.style.color = '#FFFFFF'}
              onMouseLeave={(e) => {
                if (activeSection !== item.key) e.target.style.color = '#666';
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <main style={{
          fontSize: '14px',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          minHeight: '400px'
        }}>
          {sections[activeSection].split('\n').map((line, index) => {
            // Check if line contains a URL
            const urlMatch = line.match(/((?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)/);
            
            if (urlMatch) {
              const parts = line.split(urlMatch[0]);
              const url = urlMatch[0].startsWith('http') ? urlMatch[0] : `https://${urlMatch[0]}`;
              return (
                <div key={index} style={{ marginBottom: '4px' }}>
                  {parts[0]}
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#888',
                      textDecoration: 'underline',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#FFFFFF'}
                    onMouseLeave={(e) => e.target.style.color = '#888'}
                  >
                    {urlMatch[0]}
                  </a>
                  {parts[1]}
                </div>
              );
            }
            
            return (
              <div key={index} style={{ marginBottom: '4px' }}>
                {line || '\u00A0'}
              </div>
            );
          })}
          <span style={{
            opacity: cursorVisible ? 1 : 0,
            transition: 'opacity 0.1s'
          }}>▋</span>
        </main>

        {/* Footer */}
        <footer style={{
          marginTop: '80px',
          paddingTop: '30px',
          borderTop: '2px solid #333',
          fontSize: '11px',
          color: '#666',
          textAlign: 'center',
          letterSpacing: '1px'
        }}>
          <div style={{ marginBottom: '10px' }}>
            © 2025 VINAYAK DUBEY · ALL RIGHTS RESERVED
          </div>
          <div style={{ color: '#555' }}>
            Crafted with precision and attention to detail
          </div>
        </footer>
      </div>
    </div>
  );
}