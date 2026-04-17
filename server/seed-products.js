require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  // ── E-Commerce ──
  { name:'DreamShop Pro', tagline:'Enterprise E-Commerce Platform', description:'Fully customizable multi-vendor store with real-time inventory, Stripe & crypto payments, and AI-powered product recommendations.', image:'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', category:'E-Commerce', tags:['React','Node.js','MongoDB','Stripe'], featured:true },
  { name:'CartFlow', tagline:'Headless Commerce Engine', description:'API-first headless commerce solution. Connect any frontend to a powerful backend with inventory management, order tracking, and multi-currency support.', image:'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', category:'E-Commerce', tags:['GraphQL','Next.js','PostgreSQL'], featured:false },
  { name:'ShopAnalytics', tagline:'E-Commerce Intelligence Dashboard', description:'Real-time sales analytics, customer behavior tracking, conversion funnel analysis, and automated revenue reports for online stores.', image:'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', category:'E-Commerce', tags:['React','D3.js','Python','BigQuery'], featured:false },

  // ── Blockchain ──
  { name:'ChainVault', tagline:'DeFi Asset Management Protocol', description:'Decentralized finance protocol for secure asset management with multi-sig wallets, yield optimization, and cross-chain bridging. Audited by top security firms.', image:'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', category:'Blockchain', tags:['Solidity','Ethereum','Web3','DeFi'], featured:true },
  { name:'NFTForge', tagline:'NFT Minting & Marketplace Platform', description:'End-to-end NFT platform for creators and collectors. Supports ERC-721 & ERC-1155, lazy minting, royalty management, and multi-chain deployment.', image:'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', category:'Blockchain', tags:['Solidity','IPFS','React','OpenSea API'], featured:false },
  { name:'TokenBridge', tagline:'Cross-Chain Token Bridge', description:'Secure cross-chain bridge enabling seamless token transfers between Ethereum, BSC, Polygon, and Solana with minimal fees and maximum security.', image:'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', category:'Blockchain', tags:['Solidity','Rust','Web3','Multi-chain'], featured:false },

  // ── AI / SaaS ──
  { name:'NexusAI', tagline:'AI-Powered Business Intelligence', description:'Transform business data into actionable insights with natural language queries, predictive analytics, and automated reporting powered by GPT-4.', image:'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', category:'AI / SaaS', tags:['GPT-4','Python','React','Analytics'], featured:true },
  { name:'DocuMind', tagline:'AI Document Processing Suite', description:'Intelligent document extraction, classification, and summarization. Processes PDFs, contracts, invoices, and reports with 99% accuracy using fine-tuned LLMs.', image:'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', category:'AI / SaaS', tags:['LLM','OCR','Python','FastAPI'], featured:false },
  { name:'ChatCore', tagline:'Enterprise AI Chatbot Builder', description:'Build, train, and deploy custom AI chatbots for customer support, sales, and internal knowledge bases. No-code interface with advanced NLP capabilities.', image:'https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', category:'AI / SaaS', tags:['NLP','React','Node.js','OpenAI'], featured:false },

  // ── Healthcare ──
  { name:'MediTrack', tagline:'Healthcare Mobile Platform', description:'HIPAA-compliant mobile platform for healthcare providers. Patient management, appointment scheduling, telemedicine, and secure medical record sharing.', image:'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', category:'Healthcare', tags:['React Native','HIPAA','iOS','Android'], featured:false },
  { name:'ClinicalFlow', tagline:'Clinical Trial Management System', description:'End-to-end clinical trial management with patient enrollment, data collection, adverse event reporting, and FDA 21 CFR Part 11 compliance.', image:'https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', category:'Healthcare', tags:['React','Node.js','PostgreSQL','FDA'], featured:false },
  { name:'PharmaScan', tagline:'AI Drug Interaction Checker', description:'Real-time drug interaction analysis powered by AI. Integrates with EHR systems to alert clinicians of dangerous combinations before prescribing.', image:'https://images.pexels.com/photos/139398/thermometer-headache-pain-pills-139398.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', category:'Healthcare', tags:['AI','Python','HL7','FHIR'], featured:false },

  // ── Cybersecurity ──
  { name:'CloudShield', tagline:'Enterprise Cybersecurity Suite', description:'Comprehensive security platform for cloud infrastructure. Real-time threat detection, automated incident response, and SOC2 compliance monitoring.', image:'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', category:'Cybersecurity', tags:['AWS','Security','SOC2','GDPR'], featured:false },
  { name:'PenTestPro', tagline:'Automated Penetration Testing Platform', description:'Continuous automated penetration testing for web apps, APIs, and cloud infrastructure. Generates detailed vulnerability reports with remediation guidance.', image:'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', category:'Cybersecurity', tags:['Python','Kali','OWASP','API Security'], featured:false },
  { name:'VaultKey', tagline:'Zero-Trust Identity & Access Management', description:'Enterprise IAM solution with zero-trust architecture, MFA, SSO, and privileged access management. Integrates with Active Directory and cloud providers.', image:'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', category:'Cybersecurity', tags:['Zero-Trust','OAuth2','SAML','MFA'], featured:false },

  // ── Logistics ──
  { name:'DeliverX', tagline:'Smart Logistics Management', description:'End-to-end logistics platform with real-time tracking, route optimization, and automated dispatch. Reduces delivery costs by 50%.', image:'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', category:'Logistics', tags:['React Native','Maps API','Node.js','MongoDB'], featured:false },
  { name:'FleetIQ', tagline:'Fleet Management & Telematics', description:'Real-time fleet tracking, driver behavior monitoring, predictive maintenance alerts, and fuel optimization for fleets of any size.', image:'https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', category:'Logistics', tags:['IoT','GPS','React','Node.js'], featured:false },
  { name:'WarehouseOS', tagline:'Intelligent Warehouse Management', description:'AI-powered warehouse management system with automated picking routes, inventory forecasting, barcode scanning, and ERP integration.', image:'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', category:'Logistics', tags:['AI','React','Node.js','SAP'], featured:false },

  // ── Fintech ──
  { name:'FinFlow', tagline:'Real-Time Financial Dashboard', description:'SOC2-compliant financial analytics platform with real-time transaction monitoring, fraud detection, and automated regulatory reporting.', image:'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', category:'Fintech', tags:['React','Node.js','PostgreSQL','SOC2'], featured:false },
  { name:'PayStream', tagline:'Global Payment Processing API', description:'Developer-friendly payment API supporting 150+ currencies, crypto payments, recurring billing, and instant payouts to 190+ countries.', image:'https://images.pexels.com/photos/4968391/pexels-photo-4968391.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', category:'Fintech', tags:['REST API','Stripe','Crypto','Node.js'], featured:false },
  { name:'LoanIQ', tagline:'AI-Powered Credit Scoring Platform', description:'Machine learning credit scoring engine that analyzes alternative data sources for more accurate risk assessment and faster loan approvals.', image:'https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', category:'Fintech', tags:['ML','Python','React','PostgreSQL'], featured:false },

  // ── DevOps ──
  { name:'DevOps Hub', tagline:'Internal Developer Platform', description:'Golden-path developer platform that automates CI/CD, infrastructure provisioning, and deployment workflows. Reduces time-to-production from days to minutes.', image:'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', category:'DevOps', tags:['Kubernetes','Docker','GitOps','AWS'], featured:false },
  { name:'InfraBot', tagline:'Infrastructure as Code Automation', description:'Automated IaC platform that generates Terraform and Pulumi configurations from simple descriptions. Manages multi-cloud infrastructure with drift detection.', image:'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', category:'DevOps', tags:['Terraform','Pulumi','AWS','GCP'], featured:false },
  { name:'ObserveX', tagline:'Full-Stack Observability Platform', description:'Unified observability platform combining metrics, logs, and traces. AI-powered anomaly detection and automated root cause analysis for faster incident resolution.', image:'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', category:'DevOps', tags:['Prometheus','Grafana','OpenTelemetry','AI'], featured:false },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/dreamtech');
  // Clear existing products and re-seed
  await Product.deleteMany({});
  console.log('Cleared existing products');
  for (const p of products) {
    await Product.create(p);
    console.log(`✅ ${p.category} — ${p.name}`);
  }
  console.log(`\nDone. Added ${products.length} products.`);
  await mongoose.disconnect();
}

seed().catch(err => { console.error(err); process.exit(1); });
