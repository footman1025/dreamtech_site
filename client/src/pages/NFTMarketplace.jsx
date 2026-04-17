import { Link } from 'react-router-dom';
import './NFTMarketplace.css';

const features = [
  { icon: '🛒', title: 'Buy & Sell NFTs', desc: 'Fixed-price listings, Dutch auctions, and English auctions with real-time bidding.' },
  { icon: '🎨', title: 'Creator Tools', desc: 'No-code minting, collection management, royalty settings, and unlockable content.' },
  { icon: '🔍', title: 'Discovery Engine', desc: 'Advanced search, trending collections, rarity rankings, and personalized feeds.' },
  { icon: '💳', title: 'Multi-Currency', desc: 'Accept ETH, MATIC, SOL, USDC, and credit cards via on-ramp integrations.' },
  { icon: '⛓️', title: 'Multi-Chain', desc: 'Deploy on Ethereum, Polygon, Solana, BNB Chain, and Arbitrum from one platform.' },
  { icon: '📊', title: 'Analytics Dashboard', desc: 'Floor price tracking, volume charts, wallet analytics, and collection insights.' },
];

const stack = ['Solidity', 'ERC-721', 'ERC-1155', 'React', 'Next.js', 'IPFS', 'Arweave', 'Wagmi', 'Ethers.js', 'The Graph', 'Polygon', 'OpenSea SDK'];

const steps = [
  { num: '01', title: 'Platform Design', desc: 'UX research, wireframes, and marketplace architecture planning.' },
  { num: '02', title: 'Smart Contracts', desc: 'Audited marketplace contracts with escrow, royalties, and access control.' },
  { num: '03', title: 'Frontend Build', desc: 'Responsive marketplace UI with wallet connect, listings, and activity feeds.' },
  { num: '04', title: 'Launch & Growth', desc: 'Mainnet deployment, SEO, creator onboarding, and ongoing support.' },
];

export default function NFTMarketplace() {
  return (
    <main className="nftm-page">

      {/* Hero */}
      <section className="nftm-hero">
        <div className="nftm-hero-content">
          <div className="nftm-hero-left">
            <span className="nftm-tag">NFT Marketplace</span>
            <h1>NFT Marketplace App<br />Development Services</h1>
            <p>Let's learn more about our NFT marketplace development solutions and enter the most popular industry. Being completely secure, based on the blockchain and with an engaging user interface, we can develop a next competitor for market giants to help you stay in demand.</p>
            <Link to="/contact" className="nftm-hero-btn">Book a call</Link>
          </div>
          <div className="nftm-hero-right">
            <div className="nftm-illustration">
              <div className="nftm-circle">
                <img
                  src="https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?auto=format&fit=crop&w=500&h=500&q=85"
                  alt="NFT Marketplace"
                  className="nftm-circle-img"
                />
              </div>
              <div className="nftm-float nftm-float-1">📊</div>
              <div className="nftm-float nftm-float-2">▶</div>
              <div className="nftm-float nftm-float-3">🖼️</div>
              <div className="nftm-float nftm-float-4">✅</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="nftm-section">
        <div className="nftm-container">
          <span className="nftm-label">What We Build</span>
          <h2 className="nftm-title">Full-Featured NFT Marketplace</h2>
          <div className="nftm-features-grid">
            {features.map(f => (
              <div key={f.title} className="nftm-feature-card">
                <span className="nftm-feature-icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="nftm-stack-section">
        <div className="nftm-container">
          <span className="nftm-label">Tech Stack</span>
          <h2 className="nftm-title">Technologies We Use</h2>
          <div className="nftm-stack-pills">
            {stack.map(s => <span key={s} className="nftm-pill">{s}</span>)}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="nftm-section">
        <div className="nftm-container">
          <span className="nftm-label">Our Process</span>
          <h2 className="nftm-title">How We Deliver</h2>
          <div className="nftm-steps">
            {steps.map(s => (
              <div key={s.num} className="nftm-step">
                <span className="nftm-step-num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="nftm-cta-section">
        <div className="nftm-container nftm-cta-inner">
          <h2>Ready to build your NFT Marketplace?</h2>
          <p>We deliver secure, scalable, and beautiful NFT marketplaces from concept to launch.</p>
          <Link to="/contact" className="nftm-hero-btn">Start a Project</Link>
        </div>
      </section>

    </main>
  );
}
