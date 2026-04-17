import { Link } from 'react-router-dom';
import './CryptoWallets.css';

const features = [
  { icon: '👛', title: 'Custodial Wallets', desc: 'Exchange-grade custodial wallets with HSM key management, MFA, and institutional security.' },
  { icon: '🔐', title: 'Non-Custodial Wallets', desc: 'Self-custody wallets with seed phrase backup, biometric auth, and hardware wallet support.' },
  { icon: '🌉', title: 'Multi-Chain Support', desc: 'Single wallet supporting ETH, BTC, SOL, BNB, MATIC, and 100+ tokens out of the box.' },
  { icon: '💱', title: 'In-App Swap', desc: 'DEX aggregator integration for best-rate token swaps directly inside the wallet.' },
  { icon: '📱', title: 'Mobile & Web', desc: 'Native iOS & Android apps plus a browser extension — all synced in real time.' },
  { icon: '🛡️', title: 'Security Audits', desc: 'Penetration testing, smart contract audits, and compliance reviews for every release.' },
];

const stack = ['React Native', 'Swift', 'Kotlin', 'Web3.js', 'Ethers.js', 'WalletConnect', 'Solidity', 'Bitcoin Core', 'Fireblocks SDK', 'AWS KMS', 'Biometric Auth'];

const steps = [
  { num: '01', title: 'Requirements', desc: 'Chain selection, custody model, compliance needs, and feature scoping.' },
  { num: '02', title: 'Architecture', desc: 'Key management design, backend infrastructure, and security model.' },
  { num: '03', title: 'Development', desc: 'Mobile & web builds with full test coverage and security hardening.' },
  { num: '04', title: 'Audit & Launch', desc: 'Third-party security audit, app store submission, and post-launch support.' },
];

export default function CryptoWallets() {
  return (
    <main className="cw-page">

      {/* Hero */}
      <section className="cw-hero">
        <div className="cw-hero-content">
          <div className="cw-hero-left">
            <span className="cw-tag">Tokens & Crypto Wallets</span>
            <h1>Cryptocurrency App<br />Development Services</h1>
            <p>With people starting investing in cryptocurrency and the immense growth of this space, we can cover all your development needs and produce efficient, stable and engaging applications.</p>
            <Link to="/contact" className="cw-hero-btn">Let's See Closer</Link>
          </div>
          <div className="cw-hero-right">
            <div className="cw-coins">
              <div className="cw-coin cw-coin-center">
                <img src="https://cryptologos.cc/logos/bnb-bnb-logo.png" alt="BNB" />
              </div>
              <div className="cw-coin cw-coin-1"><img src="https://cryptologos.cc/logos/ethereum-eth-logo.png" alt="ETH" /></div>
              <div className="cw-coin cw-coin-2"><img src="https://cryptologos.cc/logos/solana-sol-logo.png" alt="SOL" /></div>
              <div className="cw-coin cw-coin-3"><img src="https://cryptologos.cc/logos/polygon-matic-logo.png" alt="MATIC" /></div>
              <div className="cw-coin cw-coin-4"><img src="https://cryptologos.cc/logos/chainlink-link-logo.png" alt="LINK" /></div>
              <div className="cw-coin cw-coin-5"><img src="https://cryptologos.cc/logos/uniswap-uni-logo.png" alt="UNI" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="cw-section">
        <div className="cw-container">
          <span className="cw-label">What We Build</span>
          <h2 className="cw-title">Complete Wallet Solutions</h2>
          <div className="cw-features-grid">
            {features.map(f => (
              <div key={f.title} className="cw-feature-card">
                <span className="cw-feature-icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="cw-stack-section">
        <div className="cw-container">
          <span className="cw-label">Tech Stack</span>
          <h2 className="cw-title">Technologies We Use</h2>
          <div className="cw-stack-pills">
            {stack.map(s => <span key={s} className="cw-pill">{s}</span>)}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="cw-section">
        <div className="cw-container">
          <span className="cw-label">Our Process</span>
          <h2 className="cw-title">How We Deliver</h2>
          <div className="cw-steps">
            {steps.map(s => (
              <div key={s.num} className="cw-step">
                <span className="cw-step-num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cw-cta-section">
        <div className="cw-container cw-cta-inner">
          <h2>Ready to build your crypto wallet?</h2>
          <p>Secure, multi-chain, and production-ready — we deliver wallets users trust.</p>
          <Link to="/contact" className="cw-hero-btn">Start a Project</Link>
        </div>
      </section>

    </main>
  );
}
