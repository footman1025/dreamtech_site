import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

const BLOG_POSTS = [
  { _id:'1', title:'The Future of DeFi: What to Expect in 2025', authorName:'Gabriel Ohno', createdAt:'2025-01-15', category:'Blockchain', preview:'Decentralized finance is evolving rapidly. We explore the key trends shaping DeFi protocols, liquidity management, and cross-chain interoperability in 2025.', img:'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&auto=format&fit=crop&q=60' },
  { _id:'2', title:'Building Production-Grade Smart Contracts with Foundry', authorName:'James Rivera', createdAt:'2025-02-03', category:'Web3', preview:'Foundry has become the go-to framework for serious smart contract development. Learn how we use it for testing, fuzzing, and deploying audited contracts.', img:'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=600&auto=format&fit=crop&q=60' },
  { _id:'3', title:'AI-Powered Code Review: How We Ship Faster', authorName:'Liam Chen', createdAt:'2025-02-20', category:'AI', preview:'Integrating LLMs into our development workflow has cut code review time by 40%. Here is how we built our internal AI review pipeline.', img:'https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=600&auto=format&fit=crop&q=60' },
  { _id:'4', title:'NFT Marketplace Architecture: Lessons Learned', authorName:'Ryan Patel', createdAt:'2025-03-10', category:'Blockchain', preview:'After building three NFT marketplaces, we share the architectural decisions, pitfalls, and optimizations that make the difference between a good and great platform.', img:'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=600&auto=format&fit=crop&q=60' },
  { _id:'5', title:'Kubernetes at Scale: Our DevOps Playbook', authorName:'David Kim', createdAt:'2025-03-25', category:'DevOps', preview:'Managing 50+ microservices across multiple cloud providers requires a solid Kubernetes strategy. We share our complete playbook for production deployments.', img:'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&auto=format&fit=crop&q=60' },
  { _id:'6', title:'Web3 Wallet UX: Designing for Non-Crypto Users', authorName:'Rebeka Galic', createdAt:'2025-04-05', category:'Design', preview:'The biggest barrier to Web3 adoption is UX. We break down how to design wallet experiences that feel as simple as a banking app.', img:'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=600&auto=format&fit=crop&q=60' },
];

const CATEGORIES = ['All articles', 'AI', 'Blockchain', 'Web3', 'DevOps', 'Design', 'Other'];

export default function Blog() {
  const [filter, setFilter] = useState('All articles');
  const [search, setSearch] = useState('');
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const filtered = BLOG_POSTS.filter(p => {
    const matchCat = filter === 'All articles' || p.category === filter;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="blog-page">
      <section className="blog-hero">
        <div className="blog-hero-overlay" />
        <img className="blog-hero-bg" src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1600&auto=format&fit=crop&q=80" alt="" aria-hidden="true" />
        <div className="blog-hero-content">
          <h1>DreamTech Blog:<br />Expert Insights &amp; Guides</h1>
          <p>New product features, the latest in technology, solutions and updates.</p>
          <div className="blog-subscribe">
            {subscribed ? (
              <span className="blog-subscribed">✅ Subscribed!</span>
            ) : (
              <>
                <input type="email" placeholder="E-mail" value={subscribeEmail} onChange={e => setSubscribeEmail(e.target.value)} aria-label="Subscribe email" />
                <button onClick={() => subscribeEmail && setSubscribed(true)}>Subscribe</button>
              </>
            )}
          </div>
        </div>
      </section>

      <div className="container blog-main">
        <div className="blog-header">
          <h2 className="blog-page-title">All articles</h2>
        </div>

        <div className="blog-toolbar">
          <div className="blog-filters">
            {CATEGORIES.map(cat => (
              <button key={cat} className={`blog-filter-chip ${filter === cat ? 'active' : ''}`} onClick={() => setFilter(cat)}>{cat}</button>
            ))}
          </div>
          <div className="blog-search">
            <input type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="blog-empty">No posts found.</p>
        ) : (
          <div className="blog-grid">
            {filtered.map(p => (
              <div key={p._id} className="blog-card">
                <div className="blog-card-img">
                  <img src={p.img} alt={p.title} />
                </div>
                <div className="blog-card-body">
                  <span className="blog-card-tag">{p.category}</span>
                  <h2>{p.title}</h2>
                  <p className="blog-card-preview">{p.preview}</p>
                  <div className="blog-card-footer">
                    <div className="blog-card-meta">
                      <span>{p.authorName}</span>
                      <span className="dot">·</span>
                      <span>{new Date(p.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <Link to={`/blog/${p._id}`} className="blog-read-more">Read more →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
