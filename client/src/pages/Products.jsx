import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import app0Img from '../assets/app_0.jpg';
import appImg from '../assets/app_!.jpg';
import app2Img from '../assets/app_2.jpg';
import app3Img from '../assets/app_3.jpg';
import app4Img from '../assets/app_4.jpg';
import app5Img from '../assets/app_5.jpg';
import app6Img from '../assets/app_6.jpg';
import app7Img from '../assets/app_7.jpg';
import app8Img from '../assets/app_8.jpg';
import app9Img from '../assets/app_9.jpg';
import downloadBtn from '../assets/download_button.jpg';
import './Products.css';

const stats = [
  {
    value: 'USD $7301.78 billion',
    desc: 'This is the amount the Global FinTech Market was valued in 2020 and is projected to grow at a CAGR of 26.87% during the next few years.',
    highlight: false,
  },
  {
    value: '45%',
    desc: 'FinTech software development is considered the largest segment with 45% of the whole global market share.',
    highlight: false,
  },
  {
    value: 'USA',
    desc: 'Even though the FinTech segment is popular in the UK, China, Germany and India, USA is largest region boasting 73% of the global FinTech investment market.',
    highlight: true,
  },
];

export default function Products() {
  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = downloadBtn;
    a.download = 'download_button.jpg';
    a.click();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const targets = document.querySelectorAll('.products-need-left, .products-need-right, .products-expertise-left, .products-expertise-right, .products-wealth-left, .products-wealth-right, .products-insurtech-left, .products-insurtech-right, .products-payments-left, .products-payments-right, .products-p2p-left, .products-p2p-right, .products-pfm-left, .products-pfm-right, .products-crypto-left, .products-crypto-right, .products-dwallet-left, .products-dwallet-right');
    targets.forEach(t => observer.observe(t));

    return () => observer.disconnect();
  }, []);

  return (
    <main style={{ paddingTop: 0 }}>
      <img src={downloadBtn} alt="Download App" className="products-download-float" onClick={handleDownload} />
      <div className="products-hero-new">
        <div className="products-hero-left">
          <h1>FinTech app<br />development services</h1>
          <p>Whether you're looking for improvement of your applications or starting them from scratch, DreamTech is ready for complex challenges and has all resources to deliver smart fintech solutions. Discover our fast and mess-free financial app development services from our high-skilled team.</p>
          <Link to="/contact" className="products-hero-btn">Get consultation</Link>
        </div>
        <div className="products-hero-right">
          <img
            src={app0Img}
            alt="FinTech app development"
            className="products-hero-img"
          />
        </div>
      </div>

      {/* Why Now section */}
      <section className="products-why-section">
        <div className="products-why-container">
          <h2 className="products-why-title">Why the perfect time for your FinTech app is now?</h2>
          <div className="products-why-grid">
            {stats.map(s => (
              <div key={s.value} className={`products-why-card${s.highlight ? ' highlight' : ''}`}>
                <strong>{s.value}</strong>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why do you need section */}
      <section className="products-need-section">
        <div className="products-need-container">
          <div className="products-need-left">
            <img src={appImg} alt="FinTech illustration" className="products-need-img" />
          </div>
          <div className="products-need-right">
            <h2 className="products-need-title">Why do you need FinTech app development services?</h2>
            <p className="products-need-sub">Our custom FinTech development services can cover all unique needs and business goals you set. This may help your business providing the following:</p>
            <ul className="products-need-list">
              <li>More opportunities for funding;</li>
              <li>Increased customer base and target audience;</li>
              <li>Enhanced efficiency of business processes;</li>
              <li>Hassle-free and quick payments;</li>
              <li>Higher retention and engagement rate;</li>
              <li>Better risk management.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FinTech expertise section */}
      <section className="products-expertise-section">
        <div className="products-expertise-container">
          <h2 className="products-expertise-title">Our FinTech software development expertise</h2>
          <div className="products-expertise-body">
            <div className="products-expertise-left">
              <div className="products-expertise-card">
                <h3>Digital Banking</h3>
                <p>Our Digital Banking services can play a significant role in enhancing your business processes, boost your company's agility, and increase the efficiency of daily workflow.</p>
              </div>
            </div>
            <div className="products-expertise-right">
              <img src={app2Img} alt="FinTech expertise" className="products-expertise-img" />
            </div>
          </div>
        </div>
      </section>

      {/* Wealth management section */}
      <section className="products-wealth-section">
        <div className="products-wealth-container">
          <div className="products-wealth-left">
            <img src={app3Img} alt="Wealth management" className="products-wealth-img" />
          </div>
          <div className="products-wealth-right">
            <div className="products-wealth-card">
              <h3>Wealth management and investment</h3>
              <p>We provide next-gen wealth management services that allow you to easily manage an affluent client's wealth holistically by combining different financial services to address the needs of affluent customers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* InsurTech section */}
      <section className="products-insurtech-section">
        <div className="products-insurtech-container">
          <div className="products-insurtech-left">
            <div className="products-insurtech-card">
              <h3>InsurTech</h3>
              <p>We use Insurtech technologies to help companies to streamline their operations, provide better services and save money. Most popular examples of these products are chatbots and smartphone apps.</p>
            </div>
          </div>
          <div className="products-insurtech-right">
            <img src={app4Img} alt="InsurTech" className="products-insurtech-img" />
          </div>
        </div>
      </section>

      {/* Online Payments section */}
      <section className="products-payments-section">
        <div className="products-payments-container">
          <div className="products-payments-left">
            <img src={app5Img} alt="Online payments" className="products-payments-img" />
          </div>
          <div className="products-payments-right">
            <div className="products-payments-card">
              <h3>Online payments and transfering</h3>
              <p>With constant innovations in this fast-speed world, we guarantee that with our online payments and transferring solutions your business will grow every day.</p>
            </div>
          </div>
        </div>
      </section>

      {/* P2P Lending section */}
      <section className="products-p2p-section">
        <div className="products-p2p-container">
          <div className="products-p2p-left">
            <div className="products-p2p-card">
              <h3>Peer To Peer (P2P) Lending Platforms</h3>
              <p>Our P2P development services give both borrowers and lenders the platform with no mess and provide you with a great and stable income.</p>
            </div>
          </div>
          <div className="products-p2p-right">
            <img src={app6Img} alt="P2P Lending" className="products-p2p-img" />
          </div>
        </div>
      </section>

      {/* PFM section */}
      <section className="products-pfm-section">
        <div className="products-pfm-container">
          <div className="products-pfm-left">
            <img src={app7Img} alt="Personal Finance Management" className="products-pfm-img" />
          </div>
          <div className="products-pfm-right">
            <div className="products-pfm-card">
              <h3>Personal Finance Management (PFM)</h3>
              <p>The PFM solutions we develop are integrated with core banking systems and fetch data from various bank accounts, credit cards and loans.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Crypto & Blockchain section */}
      <section className="products-crypto-section">
        <div className="products-crypto-container">
          <div className="products-crypto-left">
            <div className="products-crypto-card">
              <h3>Cryptocurrency &amp; Blockchain development</h3>
              <p>Since cryptocurrency and blockchain are the most popular industries today, our team develops the most efficient and brand-new solutions for specific needs and sphere's requirements.</p>
            </div>
          </div>
          <div className="products-crypto-right">
            <img src={app8Img} alt="Cryptocurrency & Blockchain" className="products-crypto-img" />
          </div>
        </div>
      </section>

      {/* Digital Wallet section */}
      <section className="products-dwallet-section">
        <div className="products-dwallet-container">
          <div className="products-dwallet-left">
            <img src={app9Img} alt="Digital wallet solutions" className="products-dwallet-img" />
          </div>
          <div className="products-dwallet-right">
            <div className="products-dwallet-card">
              <h3>Digital wallet solutions</h3>
              <p>Whether you want to power a wallet with AI algorithms, online access or smart chatbots, we help create feature-rich digital wallets, boost customer loyalty, ensure safety and keep clients engaged at every stage of their interaction with a bank.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
