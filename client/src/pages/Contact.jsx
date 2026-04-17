import { useState, useRef, useEffect } from 'react';
import './Contact.css';

function StarField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    const stars = [];
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < 160; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.6 + 0.3,
        a: Math.random(),
        speed: Math.random() * 0.004 + 0.002,
        drift: (Math.random() - 0.5) * 0.12,
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.a += s.speed;
        s.x += s.drift;
        if (s.x > canvas.width) s.x = 0;
        if (s.x < 0) s.x = canvas.width;
        const alpha = (Math.sin(s.a) + 1) / 2;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147,210,255,${alpha * 0.85})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = 'rgba(100,180,255,0.6)';
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="contact-starfield" />;
}

const COUNTRIES = ['United States','United Kingdom','Canada','Australia','Germany','France','India','UAE','Singapore','Other'];
const DIALCODES = ['+1','+44','+1','+61','+49','+33','+91','+971','+65'];

const TESTIMONIALS = [
  {
    rating: 4.5,
    review: "In less than three months, DreamTech successfully delivered a stable application. External stakeholders gave overall positive feedback, and the client was impressed with the team's project management. They communicated effectively through Slack, video meetings, Confluence, and Jira.",
    name: 'Marcus Eng',
    role: 'CEO, Anatomia (PhysAct)',
    project: 'Project',
    projectDesc: 'PhysAct is a mobile app for patients combined with a web platform for doctors that works as a bridge between doctors and patients struggling with depression. Our goal was to develop a product that will successfully launch, attract an audience and help people fight mild depression.',
    caseLink: '#',
  },
  {
    rating: 5,
    review: "DreamTech delivered our blockchain platform on time and within budget. The smart contracts were thoroughly audited and the team was proactive in suggesting improvements. Highly recommend for any Web3 project.",
    name: 'Sarah Chen',
    role: 'CTO, ChainVault',
    project: 'Project',
    projectDesc: 'ChainVault is a DeFi lending protocol built on Ethereum. The platform allows users to deposit collateral and borrow stablecoins with competitive interest rates and full on-chain transparency.',
    caseLink: '#',
  },
  {
    rating: 5,
    review: "The team exceeded our expectations at every stage. From discovery to launch, communication was seamless and the final product was polished and performant. We will definitely work with DreamTech again.",
    name: 'James Rivera',
    role: 'Founder, NexusAI',
    project: 'Project',
    projectDesc: 'NexusAI is an AI-powered SaaS platform that automates customer support workflows using large language models. The platform integrates with existing CRM tools and reduces support ticket volume by up to 60%.',
    caseLink: '#',
  },
  {
    rating: 4.5,
    review: "Professional, fast, and detail-oriented. DreamTech built our cross-platform mobile app in React Native and it works flawlessly on both iOS and Android. The code quality was excellent.",
    name: 'Priya Patel',
    role: 'Product Manager, MediTrack',
    project: 'Project',
    projectDesc: 'MediTrack is a healthcare mobile application that allows patients to track medications, schedule appointments, and communicate securely with their healthcare providers.',
    caseLink: '#',
  },
  {
    rating: 5,
    review: "We hired DreamTech for a security audit and penetration test. They found critical vulnerabilities we had missed and provided clear remediation steps. Our platform is now SOC2 compliant thanks to their work.",
    name: 'Alex Morgan',
    role: 'CEO, CloudShield',
    project: 'Project',
    projectDesc: 'CloudShield is a cybersecurity platform offering automated vulnerability scanning, compliance reporting, and real-time threat monitoring for cloud-native applications.',
    caseLink: '#',
  },
  {
    rating: 5,
    review: "Outstanding work on our NFT marketplace. The team handled everything from smart contract development to the frontend UI. Launch day was smooth with zero critical issues.",
    name: 'Liam Chen',
    role: 'Co-Founder, NFTForge',
    project: 'Project',
    projectDesc: 'NFTForge is a multi-chain NFT marketplace supporting ERC-721 and ERC-1155 tokens. The platform features lazy minting, royalty management, and a curated discovery feed.',
    caseLink: '#',
  },
];

function Stars({ rating }) {
  return (
    <div className="t-stars">
      <span className="t-rating">{rating}</span>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24"
          fill={i <= Math.floor(rating) ? '#ef4444' : i - 0.5 === rating ? 'url(#half)' : '#e5e7eb'}
          xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="half"><stop offset="50%" stopColor="#ef4444"/><stop offset="50%" stopColor="#e5e7eb"/></linearGradient>
          </defs>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
        </svg>
      ))}
    </div>
  );
}

function TestimonialsSlider() {
  const [idx, setIdx] = useState(0);
  const total = TESTIMONIALS.length;
  const t = TESTIMONIALS[idx];
  const prev = () => setIdx(i => (i - 1 + total) % total);
  const next = () => setIdx(i => (i + 1) % total);

  return (
    <div className="t-slider">
      <div className="t-body">
        <div className="t-left">
          <Stars rating={t.rating} />
          <p className="t-review">"{t.review}"</p>
          <div className="t-author">
            <strong>{t.name}</strong>
            <span>{t.role}</span>
          </div>
        </div>
        <div className="t-divider" />
        <div className="t-right">
          <h4>{t.project}</h4>
          <p>{t.projectDesc}</p>
          <a href={t.caseLink} className="t-case-btn">Full case</a>
        </div>
      </div>
      <div className="t-nav">
        <button onClick={prev} aria-label="Previous" className="t-arrow">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <span className="t-counter">{idx + 1} / {total}</span>
        <button onClick={next} aria-label="Next" className="t-arrow">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>
  );
}

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'How we start working together',
    desc: "Fill out the short form below. We'll sign an NDA immediately to protect your idea.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    title: 'Free consultation',
    desc: 'One of our experts will contact you during 2–5 minutes to talk about your goals, requirements, and technical needs.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    title: 'Detailed proposal',
    desc: "See exactly what you'll get: timelines, costs, and the people behind the project. And you're under no obligation to move forward.",
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', country: '', dialcode: '+1', phone: '', message: '',
  });
  const [file, setFile]     = useState(null);
  const [status, setStatus] = useState(null);
  const fileRef = useRef(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', country: '', dialcode: '+1', phone: '', message: '' });
      setFile(null);
    }, 800);
  };

  return (
    <main className="contact-page">
      {/* Starfield animation */}
      <StarField />
      {/* Background texture */}
      <div className="contact-bg" aria-hidden="true" />

      <div className="contact-wrap">
        {/* ── Left ── */}
        <div className="contact-left">
          <div className="contact-left-card">
            <h1 className="contact-headline">
              Let's Build Your Scalable<br />Software Solution
            </h1>
            <p className="contact-sub">
              Give us a few details about your project. We'll reach out for a friendly
              conversation, then put together a proposal that fits your timeline and budget.
            </p>
            <div className="contact-features-row">
              {features.map(f => (
                <div className="cf-card-box" key={f.title}>
                  <span className="cf-icon">{f.icon}</span>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Form card ── */}
        <div className="contact-right">
          <div className="contact-card">
            <h2>Share Your Project's Vision</h2>

            <form onSubmit={handleSubmit} noValidate>
              <div className="cf-row">
                <input
                  name="name" type="text" placeholder="Full Name"
                  value={form.name} onChange={handleChange} required
                />
                <input
                  name="email" type="email" placeholder="Work Email"
                  value={form.email} onChange={handleChange} required
                />
              </div>

              <div className="cf-row">
                <select name="country" value={form.country} onChange={handleChange}>
                  <option value="">Country</option>
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="cf-phone-wrap">
                  <select
                    name="dialcode" value={form.dialcode} onChange={handleChange}
                    className="cf-dialcode"
                  >
                    {DIALCODES.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <input
                    name="phone" type="tel" placeholder="Contact Number"
                    value={form.phone} onChange={handleChange}
                    className="cf-phone-input"
                  />
                </div>
              </div>

              <textarea
                name="message" rows={4} placeholder="Describe your project..."
                value={form.message} onChange={handleChange} required
              />

              {/* File attach */}
              <div className="cf-attach" onClick={() => fileRef.current.click()}>
                <span>{file ? file.name : 'Attach File'}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                </svg>
                <input ref={fileRef} type="file" style={{ display: 'none' }} onChange={e => setFile(e.target.files[0])} />
              </div>

              {/* NDA note */}
              <div className="cf-nda">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Your idea is 100% protected by our <strong>Non Disclosure Agreement</strong>.</span>
              </div>

              {status === 'success' && <p className="cf-success">Message sent! We'll be in touch shortly.</p>}
              {status === 'error'   && <p className="cf-error">Something went wrong. Please try again.</p>}

              <button type="submit" className="cf-submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending…' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Trusted Clients — full width white section ── */}
      <section className="clients-section">
        <div className="clients-inner">
          <p className="clients-tag">Our clients</p>
          <h2 className="clients-title">We are trusted</h2>
          <div className="clients-grid">
            <div className="client-tile"><span className="client-logo-sap">SAP</span></div>
            <div className="client-tile">
              <span className="client-logo-decard">
                <span className="decard-star">✳</span>
                <small>DECARD</small>
              </span>
            </div>
            <div className="client-tile"><span className="client-logo-oracle">ORACLE</span></div>
            <div className="client-tile"><span className="client-logo-coinhook"><b>C</b>&nbsp;coinhook</span></div>
            <div className="client-tile"><span className="client-logo-nextstreet">next street</span></div>
            <div className="client-tile"><span className="client-logo-paid">⊛&nbsp;Paid</span></div>
            <div className="client-tile"><span className="client-logo-xbto">⬡&nbsp;XBTO</span></div>
            <div className="client-tile"><span className="client-logo-deverus"><em>de</em>verus</span></div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="testimonials-section">
        <div className="testimonials-inner">
          <p className="testimonials-tag">Reviews</p>
          <h2 className="testimonials-title">Highly satisfied clients</h2>
          <TestimonialsSlider />
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="contact-cta-banner">
        <div className="cta-banner-content">
          <h2>Ready to discuss your project with us?</h2>
          <p>Share your requirements and our team will contact you shortly to plan the next steps and kick off your project fast.</p>
          <button className="cta-banner-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Contact us
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </button>
        </div>
      </section>

    </main>
  );
}
