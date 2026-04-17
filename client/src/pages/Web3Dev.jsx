import { Link } from 'react-router-dom';
import './Web3Dev.css';
import heroImg from '../assets/service_!.jpg';

const features = [
  { icon: '⛓️', title: 'Smart Contract Development', desc: 'Audited, gas-optimized Solidity & Rust contracts for any EVM or Solana-based protocol.' },
  { icon: '🏦', title: 'DeFi Protocol Engineering', desc: 'AMMs, lending markets, yield vaults, and liquidity management built to institutional standards.' },
  { icon: '🖼️', title: 'NFT & Digital Assets', desc: 'ERC-721/1155 minting, royalty management, and marketplace infrastructure across chains.' },
  { icon: '🌉', title: 'Cross-Chain Bridges', desc: 'Secure token bridges connecting Ethereum, Polygon, Solana, BNB Chain, and Arbitrum.' },
  { icon: '👛', title: 'Web3 Wallet Integration', desc: 'Self-custodial wallets with social recovery, multi-sig, and hardware wallet support.' },
  { icon: '📊', title: 'On-Chain Analytics', desc: 'Real-time indexing, wallet profiling, and compliance screening for any EVM network.' },
];

const stack = ['Solidity', 'Rust', 'Ethereum', 'Polygon', 'Solana', 'Hardhat', 'Foundry', 'IPFS', 'The Graph', 'Chainlink', 'OpenZeppelin', 'Wagmi'];

const steps = [
  { num: '01', title: 'Discovery', desc: 'We analyze your protocol requirements, tokenomics, and security model.' },
  { num: '02', title: 'Architecture', desc: 'Smart contract design, chain selection, and integration planning.' },
  { num: '03', title: 'Development', desc: 'Iterative builds with full test coverage using Hardhat & Foundry.' },
  { num: '04', title: 'Audit & Launch', desc: 'Third-party audit, mainnet deployment, and post-launch monitoring.' },
];

export default function Web3Dev() {
  return (
    <main className="w3-page">

      {/* Hero */}
      <section className="w3-hero">
        <div className="w3-hero-grid" aria-hidden="true">
          {Array.from({ length: 120 }).map((_, i) => <span key={i} className="w3-grid-dot" />)}
        </div>
        <div className="w3-hero-content">
          <div className="w3-hero-left">
            <span className="w3-tag">Web3 Development</span>
            <h1>Custom Web3<br />Development &amp; dApp<br />Solutions</h1>
            <p>Develop an innovative trading, gaming, or any other platform that boosts transparency, increases your customer reach and grows profit multiple times with our Web3 development services.</p>
            <Link to="/contact" className="w3-hero-btn">Consult Our Experts</Link>
          </div>
          <div className="w3-hero-right">
            <img
              src={heroImg}
              alt="Web3 dApp"
              className="w3-hero-img"
            />
            <div className="w3-float w3-float-1">⟠</div>
            <div className="w3-float w3-float-2">◎</div>
            <div className="w3-float w3-float-3">⬡</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="w3-section">
        <div className="w3-container">
          <span className="w3-label">What We Build</span>
          <h2 className="w3-title">End-to-End Web3 Services</h2>
          <div className="w3-features-grid">
            {features.map(f => (
              <div key={f.title} className="w3-feature-card">
                <span className="w3-feature-icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="w3-stack-section">
        <div className="w3-container">
          <span className="w3-label">Tech Stack</span>
          <h2 className="w3-title">Technologies We Use</h2>
          <div className="w3-stack-pills">
            {stack.map(s => <span key={s} className="w3-pill">{s}</span>)}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="w3-section">
        <div className="w3-container">
          <span className="w3-label">Our Process</span>
          <h2 className="w3-title">How We Deliver</h2>
          <div className="w3-steps">
            {steps.map(s => (
              <div key={s.num} className="w3-step">
                <span className="w3-step-num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w3-cta-section">
        <div className="w3-container w3-cta-inner">
          <h2>Ready to build your Web3 product?</h2>
          <p>Let's architect your protocol from the ground up — secure, scalable, and chain-native.</p>
          <Link to="/contact" className="w3-hero-btn">Start a Project</Link>
        </div>
      </section>

    </main>
  );
}
