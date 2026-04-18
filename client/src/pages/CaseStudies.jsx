import { useState } from 'react';
import { Link } from 'react-router-dom';
import './CaseStudies.css';

const CATEGORIES = ['All', 'E-Commerce', 'Blockchain', 'AI / SaaS', 'Healthcare', 'Cybersecurity', 'Logistics', 'Fintech', 'DevOps'];

const PRODUCTS = [
  { _id:'1', name:'NexusAI',       tagline:'AI-Powered Business Intelligence',      category:'AI / SaaS',     image:'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', tags:['GPT-4','Python','React','Analytics'], featured:true, link:'#' },
  { _id:'2', name:'ChainVault',    tagline:'DeFi Asset Management Protocol',        category:'Blockchain',    image:'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', tags:['Solidity','Ethereum','Web3','DeFi'], featured:true, link:'#' },
  { _id:'3', name:'DreamShop Pro', tagline:'Enterprise E-Commerce Platform',        category:'E-Commerce',    image:'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', tags:['React','Node.js','MongoDB','Stripe'], featured:true, link:'#' },
  { _id:'4', name:'DevOps Hub',    tagline:'Internal Developer Platform',           category:'DevOps',        image:'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', tags:['Kubernetes','Docker','GitOps','AWS'], featured:false, link:'#' },
  { _id:'5', name:'InfraBot',      tagline:'Infrastructure as Code Automation',     category:'DevOps',        image:'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', tags:['Terraform','Pulumi','AWS','GCP'], featured:false, link:'#' },
  { _id:'6', name:'ObserveX',      tagline:'Full-Stack Observability Platform',     category:'DevOps',        image:'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', tags:['Prometheus','Grafana','OpenTelemetry','AI'], featured:false, link:'#' },
  { _id:'7', name:'CloudShield',   tagline:'Enterprise Cybersecurity Suite',        category:'Cybersecurity', image:'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', tags:['AWS','Security','SOC2','GDPR'], featured:false, link:'#' },
  { _id:'8', name:'MediTrack',     tagline:'Healthcare Mobile Platform',            category:'Healthcare',    image:'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', tags:['React Native','HIPAA','iOS','Android'], featured:false, link:'#' },
  { _id:'9', name:'FinFlow',       tagline:'Real-Time Financial Dashboard',         category:'Fintech',       image:'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', tags:['React','Node.js','PostgreSQL','SOC2'], featured:false, link:'#' },
  { _id:'10',name:'DeliverX',      tagline:'Smart Logistics Management',            category:'Logistics',     image:'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', tags:['React Native','Maps API','Node.js','MongoDB'], featured:false, link:'#' },
  { _id:'11',name:'NFTForge',      tagline:'NFT Minting & Marketplace Platform',    category:'Blockchain',    image:'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', tags:['Solidity','IPFS','React','OpenSea API'], featured:false, link:'#' },
  { _id:'12',name:'CartFlow',      tagline:'Headless Commerce Engine',              category:'E-Commerce',    image:'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', tags:['GraphQL','Next.js','PostgreSQL'], featured:false, link:'#' },
];

export default function CaseStudies() {
  const [products] = useState(PRODUCTS);
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? products : products.filter(p => p.category === filter);
  return (
    <main className="cs-page">

      {/* Hero */}
      <section className="cs-hero">
        <div className="cs-hero-overlay" />
        <img
          className="cs-hero-bg"
          src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1600&auto=format&fit=crop&q=80"
          alt=""
          aria-hidden="true"
        />
        <div className="cs-hero-content">
          <span className="cs-hero-eyebrow">Portfolio</span>
          <h1>Case Studies &amp;<br />Completed Projects</h1>
          <p>We work with innovative entrepreneurs to launch products that solve real market needs and create delightful experiences for their users.</p>
          <Link to="/contact" className="cs-hero-btn">Book a call</Link>
        </div>
      </section>

      {/* Products */}
      {products.length > 0 && (
        <section className="cs-section cs-products-section">
          <div className="cs-container">
            {/* Filter tabs */}
            <div className="cs-filter">
              {CATEGORIES.map(c => (
                <button
                  key={c}
                  className={`cs-filter-btn ${filter === c ? 'active' : ''}`}
                  onClick={() => setFilter(c)}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="cs-grid">
              {filtered.map(p => (
                <div className="cs-card" key={p._id}>
                  <div className="cs-img-wrap">
                    <img src={p.image} alt={p.name} className="cs-img" />
                    <span className="cs-category">{p.category}</span>
                    {p.featured && <span className="cs-featured-badge">Featured</span>}
                  </div>
                  <div className="cs-body">
                    <h3>{p.name}</h3>
                    <p>{p.tagline || p.description}</p>
                    <div className="cs-tech">
                      {(p.tags || []).map(t => <span key={t} className="cs-tag">{t}</span>)}
                    </div>
                    <a href={p.link} className="cs-product-link">Learn More →</a>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <p className="cs-empty">No products found in this category.</p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="cs-cta">
        <div className="cs-container cs-cta-inner">
          <h2>Have a project in mind?</h2>
          <p>Let's build something great together. Our team is ready to start within 48 hours.</p>
          <Link to="/contact" className="cs-hero-btn">Start a project</Link>
        </div>
      </section>

    </main>
  );
}
