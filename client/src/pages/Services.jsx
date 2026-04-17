import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import './Services.css';

const SERVICES_DATA = [
  { id: 1, title: 'DeFi Protocol Suite',     icon: 'blockchain', description: 'Production-ready DeFi infrastructure: AMMs, lending protocols, yield vaults, and liquidity management — audited and battle-tested.' },
  { id: 2, title: 'Smart Contract Platform', icon: 'web',        description: 'Deploy, manage, and monitor smart contracts across EVM chains. Includes automated auditing, upgrade patterns, and gas optimization.' },
  { id: 3, title: 'Web3 Wallet SDK',         icon: 'mobile',     description: 'Embed self-custodial wallets into any app. Supports multi-chain, social recovery, and hardware wallet integration out of the box.' },
  { id: 4, title: 'NFT & Digital Assets',    icon: 'ai',         description: 'End-to-end NFT infrastructure: minting, royalties, marketplace, and provenance tracking across Ethereum, Polygon, and Solana.' },
  { id: 5, title: 'Chain Analytics Engine',  icon: 'cloud',      description: 'Real-time on-chain data indexing, wallet profiling, transaction monitoring, and compliance screening for any EVM network.' },
  { id: 6, title: 'Blockchain Security',     icon: 'security',   description: 'Smart contract audits, penetration testing, formal verification, and 24/7 threat monitoring for your on-chain infrastructure.' },
];

const details = {
  web: ['React / Next.js', 'Node.js / Express', 'REST & GraphQL APIs', 'PWA & SSR'],
  mobile: ['React Native', 'iOS & Android', 'Push Notifications', 'Offline Support'],
  blockchain: ['Smart Contracts', 'NFT Platforms', 'DeFi Protocols', 'Web3 Wallets'],
  ai: ['LLM Integration', 'Computer Vision', 'NLP Pipelines', 'Predictive Analytics'],
  cloud: ['AWS / GCP / Azure', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Infrastructure as Code'],
  security: ['Penetration Testing', 'SOC2 Compliance', 'GDPR Readiness', 'Security Audits'],
};

const serviceImages = {
  web:        'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
  mobile:     'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
  blockchain: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
  ai:         'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
  cloud:      'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
  security:   'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
};

export default function Services() {
  const { t } = useLang();
  const [services] = useState(SERVICES_DATA);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main style={{ paddingTop: 0 }}>
      <section className="services-hero">
        <img className="hero-bg-img" src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&auto=format&fit=crop" alt="" aria-hidden="true" />
        <div className="hero-banner-overlay" />
        <div className="hero-banner-content">
          <span className="tag">{t.servicesPage.tag}</span>
          <h1 className="section-title">{t.servicesPage.title}</h1>
          <p className="section-subtitle">{t.servicesPage.subtitle}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="services-detail-grid">
            {services.map(s => (
              <div key={s.id} className="service-detail-card">
                <div className="sdc-header">
                  <div className="sdc-icon-wrap">
                    <img
                      src={serviceImages[s.icon]}
                      alt={s.title}
                      className="sdc-img"
                      onError={e => { e.target.style.display='none'; }}
                    />
                  </div>
                  <h2>{s.title}</h2>
                </div>
                <p>{s.description}</p>
                <ul className="sdc-list">
                  {(details[s.icon] || []).map(item => (
                    <li key={item}><span className="check">✓</span> {item}</li>
                  ))}
                </ul>
                <Link to="/contact" className="btn btn-outline" style={{ marginTop: '24px' }}>{t.servicesPage.getQuote}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}


