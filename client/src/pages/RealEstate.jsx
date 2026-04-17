import { Link } from 'react-router-dom';
import './RealEstate.css';

const features = [
  { icon: '🏢', title: 'Asset Tokenization', desc: 'Convert real-world properties into digital tokens on-chain, enabling fractional ownership and 24/7 liquidity.' },
  { icon: '📜', title: 'Smart Contract Automation', desc: 'Automate rental income distribution, ownership transfers, and compliance checks without intermediaries.' },
  { icon: '🔐', title: 'Regulatory Compliance', desc: 'Built-in KYC/AML checks and jurisdiction-aware compliance frameworks for global real estate markets.' },
  { icon: '💰', title: 'Fractional Ownership', desc: 'Lower investment barriers by splitting high-value properties into affordable token-based shares.' },
  { icon: '🌐', title: 'Cross-Border Investment', desc: 'Enable investors worldwide to participate in property markets without legal or geographic friction.' },
  { icon: '📊', title: 'On-Chain Analytics', desc: 'Real-time transparency into asset performance, ownership records, and transaction history on the blockchain.' },
];

const steps = [
  { num: '01', title: 'Asset Structuring', desc: 'We analyze the property, define token economics, and create the legal wrapper for on-chain representation.' },
  { num: '02', title: 'Smart Contract Development', desc: 'Custom ERC-1400 or ERC-3643 security token contracts with built-in compliance and governance.' },
  { num: '03', title: 'Platform Integration', desc: 'Investor dashboard, KYC onboarding, and secondary market infrastructure.' },
  { num: '04', title: 'Launch & Liquidity', desc: 'Token issuance, exchange listing, and ongoing smart contract monitoring.' },
];

export default function RealEstate() {
  return (
    <main className="re-page">

      {/* Hero */}
      <section className="re-hero">
        <div className="re-hero-inner">
          <div className="re-hero-left">
            <span className="re-tag">Real Estate Tokenization</span>
            <h1>Real Estate<br />Tokenization Services</h1>
            <p>Setting new standards in property investment — we develop fail-proof tokenization platforms that enable fractional ownership, instant liquidity, and global accessibility for real estate assets across sectors.</p>
            <Link to="/contact" className="re-hero-btn">Book A Call</Link>
          </div>
          <div className="re-hero-right">
            <img
              src="/src/assets/service_2.jpg"
              onError={e => { e.currentTarget.style.display = 'none'; }}
              alt="Real Estate Tokenization"
              className="re-hero-img"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="re-section">
        <div className="re-container">
          <span className="re-label">What We Build</span>
          <h2 className="re-title">End-to-End Tokenization Solutions</h2>
          <div className="re-features-grid">
            {features.map(f => (
              <div key={f.title} className="re-feature-card">
                <span className="re-feature-icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="re-process-section">
        <div className="re-container">
          <span className="re-label">Our Process</span>
          <h2 className="re-title">How We Deliver</h2>
          <div className="re-steps">
            {steps.map(s => (
              <div key={s.num} className="re-step">
                <span className="re-step-num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="re-cta-section">
        <div className="re-container re-cta-inner">
          <h2>Ready to tokenize your real estate assets?</h2>
          <p>Let's build the infrastructure that brings property investment on-chain — compliant, secure, and globally accessible.</p>
          <Link to="/contact" className="re-hero-btn">Start a Project</Link>
        </div>
      </section>

    </main>
  );
}
