import { useLang } from '../context/LangContext';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './About.css';

/* ── Counter animation hook ── */
function useCountUp(target, duration = 3000, inView = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);
  return count;
}

/* ── Animated stat card ── */
function StatCard({ raw, label }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Parse: leading non-digits (prefix), digits (num), trailing non-digits (suffix)
  const match = raw.match(/^([^0-9]*)(\d+(?:\.\d+)?)([^0-9]*)$/);
  const prefix = match ? match[1] : '';
  const num    = match ? parseFloat(match[2]) : 0;
  const suffix = match ? match[3] : '';
  const animated = useCountUp(num, 3000, inView);

  return (
    <div className="mission-card" ref={ref}>
      <div className="mc-stat">{prefix}{animated}{suffix}</div>
      <p>{label}</p>
    </div>
  );
}


function ParticleHero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let W, H;

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles forming a flowing wave
    const COUNT = 220;
    const particles = Array.from({ length: COUNT }, (_, i) => ({
      x: Math.random() * W,
      y: H * 0.35 + Math.sin(i * 0.4) * H * 0.18 + (Math.random() - 0.5) * H * 0.22,
      vx: 0.18 + Math.random() * 0.22,
      vy: (Math.random() - 0.5) * 0.12,
      r:  0.8 + Math.random() * 1.6,
      a:  0.3 + Math.random() * 0.7,
      phase: Math.random() * Math.PI * 2,
      speed: 0.008 + Math.random() * 0.012,
    }));

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.012;

      particles.forEach(p => {
        // Wave motion
        p.x += p.vx;
        p.y += Math.sin(t + p.phase) * 0.35 + p.vy;
        if (p.x > W + 10) { p.x = -10; p.y = H * 0.35 + (Math.random() - 0.5) * H * 0.4; }

        // Glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        grad.addColorStop(0, `rgba(96,165,250,${p.a})`);
        grad.addColorStop(1, `rgba(56,189,248,0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147,197,253,${p.a * 0.9})`;
        ctx.fill();
      });

      // Connect nearby particles with lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(96,165,250,${0.18 * (1 - dist / 60)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="particle-hero">
      <canvas ref={canvasRef} className="particle-canvas" />
      <div className="particle-hero-content">
        <h1>We Turn Your Idea Into a<br />Winning Product</h1>
        <p>We empower businesses to achieve digital transformation and maintain strong customer connections through innovative, high-quality solutions and cutting-edge technologies.</p>
        <Link to="/contact" className="particle-hero-btn">Let's talk</Link>
      </div>
    </section>
  );
}

const team = [
  { name: 'Gabriel Ohno',  role: 'CEO & Co-Founder',     bio: 'My mission is to ensure that we, at DreamTech, always stick to our values. We have an obsession with our clients\' success, laser focus on select few businesses and staying at the forefront of blockchain development.', founder: true, img: 'https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop&crop=face' },
  { name: 'James Rivera',  role: 'Co-Founder & CTO',     bio: 'I am a scientist turned Software Engineer turned Senior IT Consultant and will be the bridge between your business objectives and development strategies. My intention is to become your ultimate development partner.', founder: true, img: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop&crop=face' },
  { name: 'Rebeka Galic',  role: 'Head of Business Development', img: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400&h=460&fit=crop&crop=face' },
  { name: 'Marcus Lee',    role: 'Partnership Manager',  img: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400&h=460&fit=crop&crop=face' },
  { name: 'Tom Nguyen',    role: 'Lead Project Manager', img: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400&h=460&fit=crop&crop=face' },
  { name: 'David Kim',     role: 'Marketing Manager',    img: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400&h=460&fit=crop&crop=face' },
  { name: 'Ryan Patel',    role: 'Tech Lead',             img: 'https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=400&h=460&fit=crop&crop=face' },
  { name: 'Liam Chen',     role: 'Tech Lead',             img: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=400&h=460&fit=crop&crop=face' },
];

const values = [
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="8" fill="#eff6ff"/>
        <path d="M12 3L4 7v5c0 4.418 3.582 8 8 8s8-3.582 8-8V7l-8-4z" stroke="#3b82f6" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Chain-Native',
    desc: 'We build for the blockchain from day one — not as an afterthought. Every product is designed for decentralization.'
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="8" fill="#fef3c7"/>
        <rect x="7" y="11" width="10" height="8" rx="2" stroke="#f59e0b" strokeWidth="1.5"/>
        <path d="M9 11V8a3 3 0 0 1 6 0v3" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="12" cy="15" r="1" fill="#f59e0b"/>
      </svg>
    ),
    title: 'Security First',
    desc: 'Every smart contract we ship is audited. Security is not a feature — it is the foundation.'
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="8" fill="#ecfdf5"/>
        <circle cx="12" cy="12" r="7" stroke="#10b981" strokeWidth="1.5"/>
        <path d="M12 5c0 0-3 3-3 7s3 7 3 7" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 5c0 0 3 3 3 7s-3 7-3 7" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M5 12h14" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Multi-Chain',
    desc: 'We support Ethereum, Polygon, Solana, BNB Chain, Arbitrum, and more. Your product should not be chain-limited.'
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="8" fill="#fdf4ff"/>
        <path d="M5 17l4-4 3 3 4-5 3 3" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 8h2v2" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Built to Scale',
    desc: 'From 100 users to 1 million — our infrastructure handles growth without compromising decentralization.'
  },
];

export default function About() {
  const { t } = useLang();
  return (
    <main style={{ paddingTop: 0 }}>
      <ParticleHero />

      {/* Mission */}
      <section className="section">
        <div className="container mission-grid">
          <div className="mission-text">
            <span className="tag">{t.aboutPage.missionTag}</span>
            <h2>{t.aboutPage.missionTitle}</h2>
            <p>{t.aboutPage.missionP1}</p>
            <p>{t.aboutPage.missionP2}</p>
          </div>
          <div className="mission-visual">
            <StatCard raw="2023" label="Founded" />
            <StatCard raw="10+" label="Chains Supported" />
            <StatCard raw="$2B+" label="TVL Secured" />
            <StatCard raw="50+" label="Protocols Deployed" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'var(--dark2)' }}>
        <div className="container">
          <span className="tag">{t.aboutPage.valuesTag}</span>
          <h2 className="section-title">What Drives Us</h2>
          <div className="values-grid">
            {values.map(v => (
              <div key={v.title} className="value-card">
                <span className="value-icon">{v.icon}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <span className="tag">{t.aboutPage.teamTag}</span>
          <h2 className="section-title">{t.aboutPage.teamTitle}</h2>

          {/* Founders row */}
          <div className="team-founders-grid">
            {team.filter(m => m.founder).map(m => (
              <div key={m.name} className="team-founder-card">
                <div className="tfc-info">
                  <h3>{m.name}</h3>
                  <p className="tfc-role">{m.role}</p>
                  <p className="tfc-bio">{m.bio}</p>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="tfc-linkedin" aria-label="LinkedIn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                </div>
                <div className="tfc-img-wrap">
                  <img src={m.img} alt={m.name} className="tfc-img" />
                </div>
              </div>
            ))}
          </div>

          {/* Rest of team */}
          <div className="team-members-grid">
            {team.filter(m => !m.founder).map(m => (
              <div key={m.name} className="team-member-card">
                <img src={m.img} alt={m.name} className="tmc-img" />
                <div className="tmc-bar">
                  <span className="tmc-name">{m.name}</span>
                  <span className="tmc-role">{m.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
