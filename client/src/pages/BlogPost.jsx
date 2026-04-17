import { useParams, Link } from 'react-router-dom';
import './Blog.css';

const BLOG_POSTS = [
  { _id:'1', title:'The Future of DeFi: What to Expect in 2025', authorName:'Gabriel Ohno', createdAt:'2025-01-15', category:'Blockchain', content:`Decentralized finance is evolving rapidly. We explore the key trends shaping DeFi protocols, liquidity management, and cross-chain interoperability in 2025.\n\nThe rise of Layer 2 solutions has dramatically reduced gas costs, making DeFi accessible to a broader audience. Protocols like Arbitrum and Optimism have seen explosive growth, and we expect this trend to continue.\n\nCross-chain bridges are maturing, with formal verification becoming standard practice. The days of bridge exploits costing hundreds of millions are numbered as the industry adopts more rigorous security standards.\n\nReal-world asset tokenization is perhaps the most exciting frontier — bringing traditional financial instruments on-chain opens up entirely new markets and liquidity pools.` },
  { _id:'2', title:'Building Production-Grade Smart Contracts with Foundry', authorName:'James Rivera', createdAt:'2025-02-03', category:'Web3', content:`Foundry has become the go-to framework for serious smart contract development. Learn how we use it for testing, fuzzing, and deploying audited contracts.\n\nThe key advantage of Foundry over Hardhat is its native Solidity testing — you write tests in Solidity, which means you catch edge cases that JavaScript tests miss. The fuzzer is particularly powerful for finding unexpected inputs that break invariants.\n\nOur workflow: write the contract, write invariant tests, run the fuzzer for 24 hours, then submit for audit. This approach has helped us ship zero critical vulnerabilities across 15+ production contracts.` },
  { _id:'3', title:'AI-Powered Code Review: How We Ship Faster', authorName:'Liam Chen', createdAt:'2025-02-20', category:'AI', content:`Integrating LLMs into our development workflow has cut code review time by 40%. Here is how we built our internal AI review pipeline.\n\nWe built a GitHub Action that runs on every PR, sending the diff to GPT-4 with a custom prompt tuned for our coding standards. The model flags potential bugs, security issues, and style violations before a human reviewer even looks at the code.\n\nThe key insight was that AI review works best as a first pass, not a replacement for human review. It catches the obvious issues so human reviewers can focus on architecture and business logic.` },
  { _id:'4', title:'NFT Marketplace Architecture: Lessons Learned', authorName:'Ryan Patel', createdAt:'2025-03-10', category:'Blockchain', content:`After building three NFT marketplaces, we share the architectural decisions, pitfalls, and optimizations that make the difference between a good and great platform.\n\nThe biggest mistake teams make is storing metadata on-chain. IPFS with Arweave pinning is the right approach — immutable, decentralized, and cost-effective. We learned this the hard way on our first marketplace.\n\nFor the smart contract layer, use a proxy pattern from day one. You will need to upgrade your contracts, and retrofitting upgradeability is painful. OpenZeppelin's UUPS proxy is our current recommendation.` },
  { _id:'5', title:'Kubernetes at Scale: Our DevOps Playbook', authorName:'David Kim', createdAt:'2025-03-25', category:'DevOps', content:`Managing 50+ microservices across multiple cloud providers requires a solid Kubernetes strategy. We share our complete playbook for production deployments.\n\nWe use ArgoCD for GitOps — every deployment is a git commit, which gives us a complete audit trail and easy rollbacks. Combined with Helm charts for templating, we can deploy a new service in under 10 minutes.\n\nObservability is non-negotiable at scale. Our stack: Prometheus for metrics, Loki for logs, Tempo for traces, all visualized in Grafana. We set up SLOs for every service and alert on error budget burn rate.` },
  { _id:'6', title:'Web3 Wallet UX: Designing for Non-Crypto Users', authorName:'Rebeka Galic', createdAt:'2025-04-05', category:'Design', content:`The biggest barrier to Web3 adoption is UX. We break down how to design wallet experiences that feel as simple as a banking app.\n\nThe seed phrase problem is real. Most users cannot safely store 12 words. Social recovery wallets — where trusted contacts can help recover access — are the solution. We have implemented this in three production wallets now.\n\nTransaction confirmation screens need to speak human, not hex. Instead of showing a raw transaction hash, show "You are sending 0.5 ETH to Alice" with a clear fee breakdown. This single change reduced support tickets by 60% in our last project.` },
];

export default function BlogPost() {
  const { id } = useParams();
  const post = BLOG_POSTS.find(p => p._id === id);

  if (!post) return (
    <div className="blog-page">
      <div className="container" style={{ paddingTop: 100 }}>
        <p className="blog-error">Post not found.</p>
        <Link to="/blog" className="blog-read-more">← Back to Blog</Link>
      </div>
    </div>
  );

  return (
    <div className="blog-page">
      <div className="container" style={{ maxWidth: 760, paddingTop: 100 }}>
        <Link to="/blog" className="blog-read-more" style={{ display: 'inline-block', marginBottom: '1.5rem' }}>← Back to Blog</Link>
        <div className="blog-form-card" style={{ marginBottom: '2rem' }}>
          <div className="blog-card-meta" style={{ marginBottom: '0.75rem' }}>
            <span>{post.authorName}</span>
            <span className="dot">·</span>
            <span>{new Date(post.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
            <span className="dot">·</span>
            <span className="blog-card-tag">{post.category}</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text)', margin: '0 0 1rem' }}>{post.title}</h1>
          <p style={{ color: 'var(--text)', lineHeight: 1.8, whiteSpace: 'pre-wrap', margin: 0 }}>{post.content}</p>
        </div>
      </div>
    </div>
  );
}
