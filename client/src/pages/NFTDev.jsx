import { Link } from 'react-router-dom';
import './NFTDev.css';

const features = [
  { icon: '🖼️', title: 'NFT Minting Platform', desc: 'Custom ERC-721 & ERC-1155 smart contracts with lazy minting, batch minting, and royalty management.' },
  { icon: '🏪', title: 'NFT Marketplace', desc: 'Full-featured marketplace with auctions, fixed-price listings, offers, and multi-currency support.' },
  { icon: '🎮', title: 'Gaming NFTs', desc: 'In-game asset tokenization, play-to-earn mechanics, and cross-game interoperability.' },
  { icon: '🎨', title: 'Digital Art Platforms', desc: 'Creator-first platforms with provenance tracking, unlockable content, and collector tools.' },
  { icon: '🏠', title: 'Real-World Asset NFTs', desc: 'Tokenize real estate, luxury goods, and physical assets with legal compliance frameworks.' },
  { icon: '🔐', title: 'NFT Security & Audits', desc: 'Smart contract audits, reentrancy protection, and metadata security for your NFT contracts.' },
];

const stack = ['Solidity', 'ERC-721', 'ERC-1155', 'IPFS', 'Arweave', 'OpenSea API', 'Ethereum', 'Polygon', 'Solana', 'Metaplex', 'Hardhat', 'OpenZeppelin'];

const steps = [
  { num: '01', title: 'Concept & Design', desc: 'NFT utility planning, tokenomics, metadata structure, and smart contract architecture.' },
  { num: '02', title: 'Smart Contract Dev', desc: 'Audited ERC-721/1155 contracts with minting, royalties, and access control.' },
  { num: '03', title: 'Marketplace Build', desc: 'Frontend marketplace with wallet connect, listings, auctions, and activity feeds.' },
  { num: '04', title: 'Launch & Scale', desc: 'Mainnet deployment, IPFS pinning, marketing support, and post-launch monitoring.' },
];

export default function NFTDev() {
  return (
    <main className="nft-page">

      {/* Hero */}
      <section className="nft-hero">
        <div className="nft-hero-content">
          <div className="nft-hero-left">
            <span className="nft-tag">NFT Development</span>
            <h1>Non-Fungible Token<br />(NFT) Development<br />Services</h1>
            <p>We are highly experienced in the latest technology advancements and ready to provide you with cutting-edge NFT development services. Want to earn revenue with only a tap of a finger? Consult our NFT token development company and let's go!</p>
            <Link to="/contact" className="nft-hero-btn">Consult Our Experts</Link>
          </div>
          <div className="nft-hero-right">
            <div className="nft-card-stack">
              <div className="nft-card nft-card-1">
                <img src="https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?auto=format&fit=crop&w=400&h=500&q=85" alt="NFT Art" />
                <div className="nft-card-info">
                  <span className="nft-card-name">DreamArt #001</span>
                  <span className="nft-card-price">2.5 ETH</span>
                </div>
              </div>
              <div className="nft-card nft-card-2">
                <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&h=500&q=85" alt="NFT Art 2" />
              </div>
              <div className="nft-card nft-card-3">
                <img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=400&h=500&q=85" alt="NFT Art 3" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="nft-section">
        <div className="nft-container">
          <span className="nft-label">What We Build</span>
          <h2 className="nft-title">End-to-End NFT Services</h2>
          <div className="nft-features-grid">
            {features.map(f => (
              <div key={f.title} className="nft-feature-card">
                <span className="nft-feature-icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="nft-stack-section">
        <div className="nft-container">
          <span className="nft-label">Tech Stack</span>
          <h2 className="nft-title">Technologies We Use</h2>
          <div className="nft-stack-pills">
            {stack.map(s => <span key={s} className="nft-pill">{s}</span>)}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="nft-section">
        <div className="nft-container">
          <span className="nft-label">Our Process</span>
          <h2 className="nft-title">How We Deliver</h2>
          <div className="nft-steps">
            {steps.map(s => (
              <div key={s.num} className="nft-step">
                <span className="nft-step-num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="nft-cta-section">
        <div className="nft-container nft-cta-inner">
          <h2>Ready to launch your NFT project?</h2>
          <p>From concept to mainnet — we build NFT platforms that creators and collectors love.</p>
          <Link to="/contact" className="nft-hero-btn">Start a Project</Link>
        </div>
      </section>

    </main>
  );
}
