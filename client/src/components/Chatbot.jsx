import { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const BOT_NAME = 'DreamTech AI';

const rules = [
  {
    match: ['hello', 'hi there', 'hey there', 'greetings', 'good morning', 'good evening', 'howdy'],
    reply: 'Hey there! 👋 Welcome to DreamTech. I can help you with our services, pricing, team, or anything else. What would you like to know?'
  },
  {
    match: ['role', "site's role", 'purpose', 'what is this site', 'what does this site do', 'mission', 'goal'],
    reply: 'DreamTech\'s role is to be your end-to-end technology partner. We design, build, and secure digital products — from web and mobile apps to blockchain and AI solutions — helping businesses launch faster, scale confidently, and stay secure.'
  },
  {
    match: ['about', 'know about', 'tell me', 'what is', 'who are', 'this site', 'this company', 'dreamtech', 'your company'],
    reply: 'DreamTech is a global software development company founded in 2018. We have 12+ engineers across 10+ countries and have delivered 150+ projects. We build web, mobile, blockchain, and AI-powered products for startups and enterprises worldwide.'
  },
  {
    match: ['service', 'services', 'offer', 'what do you do', 'what can you do', 'capabilities'],
    reply: 'We offer 6 core services:\n\n🌐 Web Development\n📱 Mobile Apps\n⛓️ Blockchain & Web3\n🤖 AI Integration\n☁️ Cloud & DevOps\n🔒 Cybersecurity\n\nWhich one would you like to know more about?'
  },
  {
    match: ['web', 'website', 'web development', 'web app', 'frontend', 'backend', 'fullstack'],
    reply: 'Our Web Development team builds enterprise-grade apps using React, Next.js, Node.js, and MongoDB. We handle everything from UI/UX design to deployment. Want to start a project?'
  },
  {
    match: ['mobile', 'app', 'android', 'ios', 'react native', 'flutter', 'phone'],
    reply: 'We build cross-platform iOS & Android apps using React Native. Our apps are fast, offline-capable, and production-ready. We\'ve shipped apps with 100K+ downloads.'
  },
  {
    match: ['blockchain', 'web3', 'smart contract', 'nft', 'defi', 'crypto', 'solidity', 'ethereum'],
    reply: 'We develop audited smart contracts, DeFi protocols, NFT platforms, and Web3 wallet integrations. Our blockchain team has launched projects with $2M+ TVL.'
  },
  {
    match: ['ai', 'artificial intelligence', 'machine learning', 'ml', 'chatbot', 'gpt', 'llm', 'automation'],
    reply: 'We integrate AI/ML into your products — LLMs like GPT-4, computer vision, NLP pipelines, and predictive analytics. We can build custom AI features tailored to your business.'
  },
  {
    match: ['cloud', 'devops', 'aws', 'docker', 'kubernetes', 'ci/cd', 'infrastructure', 'hosting', 'deployment'],
    reply: 'Our DevOps team handles CI/CD pipelines, Docker & Kubernetes containerization, and cloud infrastructure on AWS, GCP, and Azure. We ensure your app scales reliably.'
  },
  {
    match: ['security', 'cybersecurity', 'pentest', 'compliance', 'gdpr', 'soc2', 'hack', 'vulnerability'],
    reply: 'Our security experts perform penetration testing, SOC2 compliance audits, GDPR readiness assessments, and security hardening. We make sure your product is audit-ready from day one.'
  },
  {
    match: ['price', 'cost', 'pricing', 'how much', 'quote', 'budget', 'rate', 'charge', 'fee'],
    reply: 'Pricing depends on project scope and complexity. We offer flexible engagement models — fixed price, time & material, or dedicated teams. Fill out our Contact form and we\'ll send a free detailed estimate within 1 hour!'
  },
  {
    match: ['contact', 'reach', 'email', 'talk', 'speak', 'get in touch', 'call', 'phone'],
    reply: 'You can reach us at:\n📧 dreamtech1025@gmail.com\n📞 +1 (856) 896-4552\n\nOr visit our Contact page to send a message directly. We respond within 1 hour.'
  },
  {
    match: ['team', 'engineers', 'developers', 'staff', 'employees', 'people', 'founder', 'ceo'],
    reply: 'Our leadership team includes Alex Morgan (CEO), Sarah Chen (CTO), James Rivera (Head of Design), and Priya Patel (Lead Blockchain Dev). We have 12+ engineers globally.'
  },
  {
    match: ['project', 'portfolio', 'case study', 'work', 'clients', 'examples', 'built'],
    reply: 'We\'ve built projects like FinFlow Dashboard (Fintech), ChainVault (Blockchain), MediTrack Mobile (Healthcare), and NexusAI Platform (AI/SaaS). Check the Case Studies section on our homepage!'
  },
  {
    match: ['process', 'how do you work', 'methodology', 'steps', 'workflow', 'approach'],
    reply: 'Our process has 4 steps:\n\n1️⃣ Discovery — understand your goals\n2️⃣ Design — wireframes & prototypes\n3️⃣ Build — agile sprints with weekly updates\n4️⃣ Launch & Scale — deployment + ongoing support'
  },
  {
    match: ['time', 'timeline', 'how long', 'duration', 'deadline', 'delivery'],
    reply: 'Timelines vary by project. A typical MVP takes 6–12 weeks. Enterprise projects can take 3–6 months. We\'ll give you a detailed timeline after the discovery call.'
  },
  {
    match: ['location', 'where', 'country', 'office', 'based', 'headquarters'],
    reply: 'Our headquarters is in Toronto, Ontario, Canada. We have remote teams across 30+ countries and serve clients globally.'
  },
  {
    match: ['signup', 'sign up', 'register', 'create account', 'join'],
    reply: 'You can create a free account by clicking "Sign Up" in the top navigation bar. It only takes a minute!'
  },
  {
    match: ['login', 'log in', 'sign in', 'account'],
    reply: 'Click "Login" in the navbar to access your account. If you don\'t have one yet, click "Sign Up" to register for free.'
  },
  {
    match: ['bye', 'goodbye', 'see you', 'later', 'thanks', 'thank you', 'cheers'],
    reply: 'Thanks for chatting with DreamTech AI! 🚀 Feel free to come back anytime. Have a great day!'
  },
];

function getBotReply(input) {
  const lower = input.toLowerCase().trim();

  // Score each rule by how many keywords match
  let bestRule = null;
  let bestScore = 0;

  for (const rule of rules) {
    let score = 0;
    for (const k of rule.match) {
      if (lower.includes(k)) {
        // Longer keyword = more specific = higher score
        score += k.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestRule = rule;
    }
  }

  if (bestRule && bestScore > 0) return bestRule.reply;
  return "I'm not sure about that specifically, but our team can help! You can reach us at dreamtech1025@gmail.com or visit the Contact page for a free consultation. 😊";
}

const suggestions = ['Our Services', 'Pricing', 'Contact Us', 'About DreamTech', 'Get a Quote'];

const EMOJIS = [
  '😀','😂','😍','🥰','😎','🤔','👍','👋','🙏','🔥',
  '💯','✅','❤️','🚀','💡','🎉','😊','😅','🤝','💪',
  '😢','😮','🤩','😴','🥳','👏','🌟','💬','📱','⚡',
];

export default function Chatbot() {
  const [open, setOpen]           = useState(false);
  const [messages, setMessages]   = useState([
    { from: 'bot', text: 'Hi, my name is Dream. I am the AI assistant that can get you where you want to go 🤖', time: now() }
  ]);
  const [input, setInput]         = useState('');
  const [typing, setTyping]       = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [recording, setRecording] = useState(false);
  const [recSeconds, setRecSeconds] = useState(0);
  const fileRef   = useRef(null);
  const bottomRef = useRef(null);
  const recTimer  = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setMessages(prev => [...prev, { from: 'user', text: msg, time: now() }]);
    setInput('');
    setShowEmoji(false);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { from: 'bot', text: getBotReply(msg), time: now() }]);
    }, 900);
  };

  const handleKey = e => { if (e.key === 'Enter') sendMessage(); };

  const insertEmoji = (emoji) => {
    setInput(prev => prev + emoji);
    setShowEmoji(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setMessages(prev => [...prev, {
      from: 'user',
      text: `📎 ${file.name}`,
      time: now(),
    }]);
    e.target.value = '';
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, {
        from: 'bot',
        text: `Thanks for sharing "${file.name}"! Our team will review it. You can also email us directly at dreamtech1025@gmail.com.`,
        time: now(),
      }]);
    }, 900);
  };

  const toggleRecording = () => {
    if (recording) {
      clearInterval(recTimer.current);
      setRecording(false);
      const secs = recSeconds;
      setRecSeconds(0);
      setMessages(prev => [...prev, {
        from: 'user',
        text: `🎤 Voice message (${secs}s)`,
        time: now(),
      }]);
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages(prev => [...prev, {
          from: 'bot',
          text: "I received your voice message! Unfortunately I can't process audio yet, but our team will get back to you. You can also type your question here. 😊",
          time: now(),
        }]);
      }, 900);
    } else {
      setRecording(true);
      setRecSeconds(0);
      recTimer.current = setInterval(() => setRecSeconds(s => s + 1), 1000);
    }
  };

  return (
    <>
      <button className="chat-fab" onClick={() => setOpen(!open)} aria-label="Open chat">
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <img src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop" alt="Chat assistant" className="chat-fab-avatar" />
        )}
      </button>

      {open && (
        <div className="chat-window">
          {/* Top bar */}
          <div className="chat-topbar">
            <div className="chat-topbar-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Messages
            </div>
            <button className="chat-topbar-close" onClick={() => setOpen(false)}>⌄</button>
          </div>

          {/* Agent header */}
          <div className="chat-header">
            <div className="chat-header-left">
              <div className="chat-avatar">
                <img src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop" alt="Dream" />
                <span className="chat-avatar-online" />
              </div>
              <div className="chat-header-info">
                <strong>{BOT_NAME}</strong>
              </div>
              <button className="chat-header-chevron" style={{display:'none'}}>⌄</button>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.from}`}>
                {m.from === 'bot' && (
                  <div className="msg-avatar">
                    <img src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop" alt="Dream" />
                  </div>
                )}
                <div className="msg-content">
                  {m.from === 'bot' && (
                    <div className="msg-sender">
                      {BOT_NAME} <span className="msg-bot-tag">Bot</span>
                    </div>
                  )}
                  <div className={`chat-bubble ${m.from}`}>
                    {m.text.split('\n').map((line, j) => (
                      <span key={j}>{line}{j < m.text.split('\n').length - 1 && <br />}</span>
                    ))}
                  </div>
                  <div className="msg-meta">
                    <span className="msg-time">{m.time}</span>
                    {m.from === 'user' && <span className="msg-read">✔✔ Read</span>}
                  </div>
                </div>
              </div>
            ))}
            {typing && (
              <div className="chat-msg bot">
                <div className="msg-avatar">
                  <img src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop" alt="Dream" />
                </div>
                <div className="msg-content">
                  <div className="chat-bubble bot typing">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="chat-footer">
            {/* Emoji picker */}
            {showEmoji && (
              <div className="emoji-picker">
                {EMOJIS.map(e => (
                  <button key={e} className="emoji-btn" onClick={() => insertEmoji(e)}>{e}</button>
                ))}
              </div>
            )}

            <div className="chat-footer-box">
              {/* Recording indicator */}
              {recording ? (
                <div className="rec-indicator">
                  <span className="rec-dot" />
                  Recording… {recSeconds}s
                </div>
              ) : (
                <input
                  type="text"
                  placeholder="Compose your message..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  aria-label="Chat input"
                />
              )}

              <div className="chat-footer-bottom">
                <div className="chat-footer-icons">
                  {/* Emoji */}
                  <button className={`footer-icon-btn ${showEmoji ? 'active' : ''}`} onClick={() => setShowEmoji(v => !v)} aria-label="Emoji" title="Emoji">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                  </button>
                  {/* Attach */}
                  <button className="footer-icon-btn" onClick={() => fileRef.current.click()} aria-label="Attach file" title="Attach file">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                  </button>
                  <input ref={fileRef} type="file" style={{ display: 'none' }} onChange={handleFileChange} />
                  {/* Voice */}
                  <button className={`footer-icon-btn ${recording ? 'recording' : ''}`} onClick={toggleRecording} aria-label={recording ? 'Stop recording' : 'Voice message'} title={recording ? 'Stop' : 'Voice message'}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="4" y2="12"/><line x1="8" y1="8" x2="8" y2="16"/><line x1="12" y1="5" x2="12" y2="19"/><line x1="16" y1="8" x2="16" y2="16"/><line x1="20" y1="12" x2="20" y2="12"/></svg>
                  </button>
                </div>

                <button className="chat-send-btn" onClick={() => sendMessage()} aria-label="Send">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2" fill="currentColor" stroke="none"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function now() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
