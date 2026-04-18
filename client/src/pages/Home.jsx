import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import './Home.css';
import achivementImg from '../assets/achivement.jpg';
import expertise1Img from '../assets/expertise_1.jpg';
import expertise2Img from '../assets/expertise_2.jpg';
import expertise3Img from '../assets/expertise_3.jpg';
import expertise4Img from '../assets/expertise_4.jpg';
import expertise5Img from '../assets/expertise_5.jpg';
import expertise6Img from '../assets/expertise_6.jpg';
import expertise7Img from '../assets/expertise_7.jpg';

const SERVICES_DATA = [
  { id: 1, title: 'DeFi Protocol Suite',     icon: 'blockchain', description: 'Production-ready DeFi infrastructure: AMMs, lending protocols, yield vaults, and liquidity management — audited and battle-tested.' },
  { id: 2, title: 'Smart Contract Platform', icon: 'web',        description: 'Deploy, manage, and monitor smart contracts across EVM chains. Includes automated auditing, upgrade patterns, and gas optimization.' },
  { id: 3, title: 'Web3 Wallet SDK',         icon: 'mobile',     description: 'Embed self-custodial wallets into any app. Supports multi-chain, social recovery, and hardware wallet integration out of the box.' },
  { id: 4, title: 'NFT & Digital Assets',    icon: 'ai',         description: 'End-to-end NFT infrastructure: minting, royalties, marketplace, and provenance tracking across Ethereum, Polygon, and Solana.' },
  { id: 5, title: 'Chain Analytics Engine',  icon: 'cloud',      description: 'Real-time on-chain data indexing, wallet profiling, transaction monitoring, and compliance screening for any EVM network.' },
  { id: 6, title: 'Blockchain Security',     icon: 'security',   description: 'Smart contract audits, penetration testing, formal verification, and 24/7 threat monitoring for your on-chain infrastructure.' },
  { id: 7, title: 'AI & Machine Learning',   icon: 'ai2',        description: 'Custom ML models, LLM integrations, computer vision pipelines, and intelligent automation solutions built for production scale.' },
  { id: 8, title: 'Cloud Infrastructure',    icon: 'cloud2',     description: 'Multi-cloud architecture, Kubernetes orchestration, CI/CD pipelines, and DevOps automation to keep your platform always-on.' },
];

const heroSlides = [
  { label: 'DeFi Protocol',   tag: 'DECENTRALIZED FINANCE',   img: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=1600&h=900&q=90' },
  { label: 'Smart Contracts', tag: 'SMART CONTRACT PLATFORM', img: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1600&h=900&q=90' },
  { label: 'Web3 Wallet',     tag: 'WEB3 INFRASTRUCTURE',     img: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=1600&h=900&q=90' },
  { label: 'Chain Analytics', tag: 'ON-CHAIN ANALYTICS',      img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1600&h=900&q=90' },
];

const techStack = ['Solidity', 'Rust', 'Ethereum', 'Polygon', 'Solana', 'Hardhat', 'Foundry', 'IPFS'];

const serviceImages = {
  blockchain: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&h=900&q=95',
  web:        'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=600&h=900&q=95',
  mobile:     'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&h=900&q=95',
  ai:         'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=600&h=900&q=95',
  cloud:      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&h=900&q=95',
  security:   'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=600&h=900&q=95',
  ai2:        'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&h=900&q=95',
  cloud2:     'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&h=900&q=95',
};

const serviceMenuData = [
  {
    category: 'AI Solutions',
    items: [
      { name: 'Artificial Intelligence Development', featured: true },
      { name: 'AI Consulting Services' },
      { name: 'Generative AI Development' },
      { name: 'Machine Learning Solutions', featured: true },
      { name: 'Natural Language Processing' },
      { name: 'Neural Network Development' },
      { name: 'AI-Powered Chatbots' },
      { name: 'Predictive Analytics' },
    ],
  },
  {
    category: 'Custom Software Development',
    items: [
      { name: 'Web Application Development', featured: true },
      { name: 'Mobile App Development' },
      { name: 'API Development & Integration' },
      { name: 'Legacy System Modernization', featured: true },
      { name: 'SaaS Product Development' },
      { name: 'MVP Development' },
    ],
  },
  {
    category: 'Cloud Solutions',
    items: [
      { name: 'Cloud Migration', featured: true },
      { name: 'Cloud Architecture Design' },
      { name: 'DevOps & CI/CD' },
      { name: 'Kubernetes & Docker', featured: true },
      { name: 'Serverless Solutions' },
      { name: 'Cloud Cost Optimization' },
    ],
  },
  {
    category: 'Blockchain & Web3',
    items: [
      { name: 'Smart Contract Development', featured: true },
      { name: 'DeFi Protocol Development' },
      { name: 'NFT Marketplace Development' },
      { name: 'Web3 Wallet Integration', featured: true },
      { name: 'Tokenization Solutions' },
      { name: 'Blockchain Audit & Security' },
    ],
  },
  {
    category: 'Data Services & Solutions',
    items: [
      { name: 'Data Engineering', featured: true },
      { name: 'Business Intelligence' },
      { name: 'Big Data Analytics' },
      { name: 'Data Visualization', featured: true },
      { name: 'ETL Pipeline Development' },
      { name: 'Real-time Analytics' },
    ],
  },
  {
    category: 'Business Analysis',
    items: [
      { name: 'Requirements Engineering', featured: true },
      { name: 'Process Optimization' },
      { name: 'Digital Transformation' },
      { name: 'Product Strategy', featured: true },
      { name: 'Market Research' },
      { name: 'ROI Analysis' },
    ],
  },
  {
    category: 'Design Services',
    items: [
      { name: 'UI/UX Design', featured: true },
      { name: 'Product Design' },
      { name: 'Brand Identity' },
      { name: 'Design Systems', featured: true },
      { name: 'Prototyping & Wireframing' },
      { name: 'Motion Design' },
    ],
  },
  {
    category: 'Software Quality Assurance',
    items: [
      { name: 'Manual Testing', featured: true },
      { name: 'Automated Testing' },
      { name: 'Performance Testing' },
      { name: 'Security Testing', featured: true },
      { name: 'Load & Stress Testing' },
      { name: 'QA Consulting' },
    ],
  },
];

const techStackData = {
  AI:       ['Python', 'R', 'JavaScript', 'TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'OpenCV', 'NLTK', 'SpaCy', 'Pandas', 'NumPy', 'Apache Spark'],
  Mobile:   ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo', 'Firebase', 'Xcode', 'Android Studio', 'Capacitor', 'Ionic'],
  'Back-End': ['Node.js', 'Python', 'Go', 'Rust', 'Java', 'Express', 'FastAPI', 'Django', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL'],
  'Front-End': ['React', 'Next.js', 'Vue', 'TypeScript', 'Tailwind CSS', 'Vite', 'Webpack', 'Storybook', 'Figma', 'Three.js'],
  Cloud:    ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'GitHub Actions', 'Vercel', 'Cloudflare'],
  Design:   ['Figma', 'Adobe XD', 'Sketch', 'Framer', 'Illustrator', 'Photoshop', 'Lottie', 'Zeplin', 'InVision'],
  'Continuous Integration': ['GitHub Actions', 'Jenkins', 'CircleCI', 'GitLab CI', 'Travis CI', 'ArgoCD', 'SonarQube', 'Datadog', 'Sentry'],
};

const homeTeam = [
  { name: 'Gabriel Ohno',  role: 'CEO & Co-Founder',     bio: "My mission is to ensure that we, at DreamTech, always stick to our values. We have an obsession with our clients' success, laser focus on select few businesses and staying at the forefront of blockchain development.", founder: true, img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=500&q=90&crop=face' },
  { name: 'James Rivera',  role: 'Co-Founder & CTO',     bio: 'I am a scientist turned Software Engineer turned Senior IT Consultant and will be the bridge between your business objectives and development strategies. My intention is to become your ultimate development partner.', founder: true, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=500&q=90&crop=face' },
  { name: 'Rebeka Galic',  role: 'Head of Business Development', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=700&q=90&crop=face' },
  { name: 'Marcus Lee',    role: 'Partnership Manager',  img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&h=700&q=90&crop=face' },
  { name: 'Tom Nguyen',    role: 'Lead Project Manager', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&h=700&q=90&crop=face' },
  { name: 'David Kim',     role: 'Marketing Manager',    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&h=700&q=90&crop=face' },
  { name: 'Ryan Patel',    role: 'Tech Lead',             img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&h=700&q=90&crop=face' },
  { name: 'Liam Chen',     role: 'Tech Lead',             img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&h=700&q=90&crop=face' },
];

function ServicesSlider({ services, serviceImages, t }) {
  const trackRef = useRef(null);
  const posRef = useRef(0);
  const rafRef = useRef(null);
  const pausedRef = useRef(false);
  const SPEED = 0.6; // px per frame
  const CARD_W = 296; // card width (280) + gap (16)

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const halfW = track.scrollWidth / 2;

    const tick = () => {
      if (!pausedRef.current) {
        posRef.current -= SPEED;
        if (posRef.current <= -halfW) posRef.current += halfW;
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [services]);

  const nudge = (dir) => {
    posRef.current += dir * CARD_W;
    const track = trackRef.current;
    if (!track) return;
    const halfW = track.scrollWidth / 2;
    if (posRef.current > 0) posRef.current = -halfW + Math.abs(posRef.current % halfW);
    if (posRef.current < -halfW) posRef.current += halfW;
    track.style.transform = `translateX(${posRef.current}px)`;
  };

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">{t.sections.ourServices}</h2>
        <p className="section-subtitle">{t.sections.servicesSubtitle}</p>
      </div>
      <div className="svc-marquee-outer">
        <button className="svc-marquee-btn svc-marquee-btn--left" onClick={() => nudge(1)} aria-label="Previous">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div className="svc-marquee-wrap">
          <div className="svc-marquee-track" ref={trackRef}>
            {[...services, ...services].map((s, i) => (
              <div
                key={i}
                className={`service-card service-card--${s.icon}`}
                onMouseEnter={() => { pausedRef.current = true; }}
                onMouseLeave={() => { pausedRef.current = false; }}
              >
                <div className="service-icon">
                  <img src={serviceImages[s.icon]} alt={s.title} className="service-img" />
                </div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <Link to="/services" className="service-link">{t.sections.learnMore}</Link>
              </div>
            ))}
          </div>
        </div>
        <button className="svc-marquee-btn svc-marquee-btn--right" onClick={() => nudge(-1)} aria-label="Next">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </section>
  );
}

function HomeContact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', industry: '', budget: '$50 - 100k', country: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const steps = [
    'Our expert reaches out shortly after receiving your request and analyzing your requirements.',
    'If needed, we sign an NDA to protect your privacy.',
    'We request additional information to better understand and analyze your project.',
    'We schedule a call to discuss your project, goals, and priorities, and provide preliminary feedback.',
    "If you're satisfied, we finalize the agreement and start your project.",
  ];

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setSent(true); setLoading(false); }, 800);
  };

  return (
    <section className="home-contact-section">
      <div className="home-contact-container">
        <div className="hc-left">
          <h2 className="hc-title">Ready to discuss your project with us?</h2>
          <p className="hc-sub">Fill out the form with your details and we will get back to you shortly.</p>
          <h3 className="hc-next-title">What's next?</h3>
          <div className="hc-steps">
            {steps.map((s, i) => (
              <div key={i} className="hc-step">
                <div className="hc-step-num">0{i + 1}</div>
                <p>{s}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="hc-right">
          <div className="hc-card">
            <h3 className="hc-card-title">Contact us</h3>
            {sent ? (
              <p className="hc-success">Thanks! We'll be in touch shortly.</p>
            ) : (
              <form className="hc-form" onSubmit={handleSubmit}>
                <div className="hc-row">
                  <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                  <input placeholder="E-mail" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
                </div>
                <div className="hc-row">
                  <input placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                  <select value={form.industry} onChange={e => setForm({...form, industry: e.target.value})}>
                    <option value="">Industry</option>
                    <option>AI / ML</option>
                    <option>FinTech</option>
                    <option>Healthcare</option>
                    <option>Blockchain / Web3</option>
                    <option>E-Commerce</option>
                    <option>EdTech</option>
                    <option>Real Estate</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="hc-field-label">Project budget (min.$50k)</div>
                <select value={form.budget} onChange={e => setForm({...form, budget: e.target.value})}>
                  <option>$50 - 100k</option>
                  <option>$100k - 250k</option>
                  <option>$250k - 500k</option>
                  <option>$500k+</option>
                </select>
                <select value={form.country} onChange={e => setForm({...form, country: e.target.value})}>
                  <option value="">Country</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Germany</option>
                  <option>France</option>
                  <option>UAE</option>
                  <option>Singapore</option>
                  <option>Australia</option>
                  <option>Other</option>
                </select>
                <textarea placeholder="Please describe your request in detail" rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                <button type="submit" className="hc-submit" disabled={loading}>
                  {loading ? 'Sending…' : 'Send a message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeTeam() {
  return (
    <section className="home-team-section">
      <div className="container">
        <span className="tag">THE TEAM</span>
        <h2 className="section-title">Meet Our Team</h2>

        {/* Founders */}
        <div className="team-founders-grid">
          {homeTeam.filter(m => m.founder).map(m => (
            <div key={m.name} className="team-founder-card">
              <div className="tfc-img-wrap">
                <img src={m.img} alt={m.name} className="tfc-img" />
              </div>
              <div className="tfc-info">
                <p className="tfc-role">{m.role}</p>
                <h3>{m.name}</h3>
                <p className="tfc-bio">{m.bio}</p>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="tfc-linkedin" aria-label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Members */}
        <div className="team-members-grid">
          {homeTeam.filter(m => !m.founder).map(m => (
            <div key={m.name} className="team-member-card">
              <img src={m.img} alt={m.name} className="tmc-img" />
              <div className="tmc-overlay">
                <span className="tmc-name">{m.name}</span>
                <span className="tmc-role">{m.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const expertiseData = [
  { title: 'Artificial Intelligence', img: expertise1Img, desc: 'Build intelligent systems with cutting-edge ML models, NLP pipelines, and computer vision solutions tailored to your business needs.' },
  { title: 'Healthcare',              img: expertise2Img, desc: 'Develop HIPAA-compliant digital health platforms, telemedicine apps, and medical data analytics tools that improve patient outcomes.' },
  { title: 'FinTech',                 img: expertise3Img, desc: 'Create secure, scalable financial applications — from payment gateways and trading platforms to digital banking and compliance tools.' },
  { title: 'Blockchain',              img: expertise4Img, desc: 'Empower your business and transactions with our secure, transparent, and decentralized blockchain solutions.' },
  { title: 'EdTech',                  img: expertise5Img, desc: 'Build engaging e-learning platforms, LMS systems, and adaptive learning tools that scale to millions of students.' },
  { title: 'Real Estate',             img: expertise6Img, desc: 'Digitize property management, build marketplace platforms, and integrate smart contract-based transactions for real estate.' },
  { title: 'E-Commerce',              img: expertise7Img, desc: 'Launch high-performance online stores with seamless checkout, inventory management, and personalized shopping experiences.' },
];

function AreasOfExpertise() {
  const [open, setOpen] = useState(0);
  const activeImg = expertiseData[open ?? 0].img;

  return (
    <section className="expertise-section">
      <div className="expertise-container">
        <div className="expertise-left">
          <span className="expertise-tag">Expertise</span>
          <h2 className="expertise-title">Areas of expertise</h2>
          <div className="expertise-laptop">
            <img
              key={activeImg}
              src={activeImg}
              alt={expertiseData[open ?? 0].title}
              className="expertise-laptop-img"
            />
          </div>
        </div>
        <div className="expertise-right">
          {expertiseData.map((item, i) => (
            <div key={item.title} className={`expertise-item${open === i ? ' open' : ''}`}>
              <button
                className="expertise-row"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="expertise-name">{item.title}</span>
                <span className="expertise-icon">{open === i ? '×' : '+'}</span>
              </button>
              {open === i && (
                <div className="expertise-body">
                  <p>{item.desc}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechStack() {
  const tabs = Object.keys(techStackData);
  const [active, setActive] = useState(0);

  return (
    <section className="tech-stack-section">
      <div className="tech-stack-container">
        <span className="tech-stack-tag">Tech stack</span>
        <h2 className="tech-stack-title">Technologies we use</h2>
        <div className="tech-stack-tabs">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              className={`tech-stack-tab${i === active ? ' active' : ''}`}
              onClick={() => setActive(i)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="tech-stack-pills">
          {techStackData[tabs[active]].map(tech => (
            <span key={tech} className="tech-pill">{tech}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesMenu() {
  const [active, setActive] = useState(0);
  const current = serviceMenuData[active];
  const col1 = current.items.filter((_, i) => i % 2 === 0);
  const col2 = current.items.filter((_, i) => i % 2 === 1);

  return (
    <section className="svc-menu-section">
      <div className="svc-menu-container">
        <div className="svc-menu-header">
          <span className="svc-menu-tag">Our services</span>
          <h2 className="svc-menu-title">Services</h2>
        </div>
        <div className="svc-menu-body">
          {/* Left: category list */}
          <div className="svc-menu-left">
            {serviceMenuData.map((s, i) => (
              <button
                key={s.category}
                className={`svc-menu-cat${i === active ? ' active' : ''}`}
                onClick={() => setActive(i)}
              >
                {s.category}
              </button>
            ))}
          </div>
          {/* Right: sub-services */}
          <div className="svc-menu-right">
            <div className="svc-menu-col">
              {col1.map(item => (
                <span key={item.name} className={`svc-menu-item${item.featured ? ' featured' : ''}`}>
                  {item.name}
                </span>
              ))}
            </div>
            <div className="svc-menu-col">
              {col2.map(item => (
                <span key={item.name} className={`svc-menu-item${item.featured ? ' featured' : ''}`}>
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { t } = useLang();
  const [services] = useState(SERVICES_DATA);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSlideIndex(i => (i + 1) % heroSlides.length), 3000);
    return () => clearInterval(timer);
  }, []);

  const svcPrev = () => {};
  const svcNext = () => {};

  return (
    <main>
      {/* Hero */}
      <section className="hero">
        {heroSlides.map((s, i) => (
          <div key={s.label} className={`hero-slide ${i === slideIndex ? 'active' : ''}`}>
            <img src={s.img} alt={s.label} />
          </div>
        ))}
        <div className="hero-overlay" />
        <div className="hero-inner">
          <div className="hero-content">
            <p className="hero-eyebrow">{t.hero.eyebrow}</p>
            <h1>{t.hero.title1} <span className="gradient-text">{t.hero.title2}</span></h1>
            <p className="hero-sub">{t.hero.sub}</p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-hero-primary">{t.hero.cta1}</Link>
              <Link to="/blog" className="btn btn-hero-outline">{t.hero.cta2}</Link>
            </div>
          </div>
        </div>
        <div className="slide-dots">
          {heroSlides.map((_, i) => (
            <button key={i} className={`slide-dot ${i === slideIndex ? 'active' : ''}`}
              onClick={() => setSlideIndex(i)} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
      </section>



      {/* Stats */}
      <section className="stats-section">
        <div className="container stats-grid">
          {t.stats.map(s => (
            <div key={s.label} className="stat-card">
              <h3>{s.value}</h3>
              <p>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <ServicesSlider services={services} serviceImages={serviceImages} t={t} />

      {/* Services Menu */}
      <ServicesMenu />

      {/* Tech Stack */}
      <TechStack />

      {/* Areas of Expertise */}
      <AreasOfExpertise />

      {/* Achievements */}
      <section className="achievements-strip">
        <div className="achievements-header">
          <span className="achievements-tag">Awards</span>
          <h2 className="achievements-title">Our Achievements</h2>
        </div>
        <img src={achivementImg} alt="Our Achievements" className="achievements-full-img" />
      </section>

      {/* Team */}
      <HomeTeam />

      {/* Contact Form */}
      <HomeContact />
    </main>
  );
}
