const express = require('express');
const router = express.Router();

const services = [
  { id: 1, title: 'DeFi Protocol Suite',     icon: 'blockchain', description: 'Production-ready DeFi infrastructure: AMMs, lending protocols, yield vaults, and liquidity management — audited and battle-tested.' },
  { id: 2, title: 'Smart Contract Platform', icon: 'web',        description: 'Deploy, manage, and monitor smart contracts across EVM chains. Includes automated auditing, upgrade patterns, and gas optimization.' },
  { id: 3, title: 'Web3 Wallet SDK',         icon: 'mobile',     description: 'Embed self-custodial wallets into any app. Supports multi-chain, social recovery, and hardware wallet integration out of the box.' },
  { id: 4, title: 'NFT & Digital Assets',    icon: 'ai',         description: 'End-to-end NFT infrastructure: minting, royalties, marketplace, and provenance tracking across Ethereum, Polygon, and Solana.' },
  { id: 5, title: 'Chain Analytics Engine',  icon: 'cloud',      description: 'Real-time on-chain data indexing, wallet profiling, transaction monitoring, and compliance screening for any EVM network.' },
  { id: 6, title: 'Blockchain Security',     icon: 'security',   description: 'Smart contract audits, penetration testing, formal verification, and 24/7 threat monitoring for your on-chain infrastructure.' },
  { id: 7, title: 'AI & Machine Learning',   icon: 'ai2',        description: 'Custom ML models, LLM integrations, computer vision pipelines, and intelligent automation solutions built for production scale.' },
  { id: 8, title: 'Cloud Infrastructure',    icon: 'cloud2',     description: 'Multi-cloud architecture, Kubernetes orchestration, CI/CD pipelines, and DevOps automation to keep your platform always-on.' },
];

router.get('/', (req, res) => res.json(services));

module.exports = router;
