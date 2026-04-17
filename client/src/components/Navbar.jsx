import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import LangSwitcher from './LangSwitcher';
import './Navbar.css';
import logo from '../assets/logo.png';

const SERVICE_ROUTES = {
  'Web3 Development Company': '/web3-development',
  'NFT Development':          '/nft-development',
  'NFT Marketplace':          '/nft-marketplace',
  'Tokens & Crypto Wallets':  '/crypto-wallets',
  'Real Estate Tokenization': '/real-estate-tokenization',
  'Metaverse Development':    '/metaverse-development',
};

const SERVICES_MENU = [
  {
    title: 'Blockchain Development',
    links: [
      'Web3 Development Company',
      'NFT Development',
      'NFT Marketplace',
    ],
  },
  {
    title: 'Advanced Services',
    links: [
      'Tokens & Crypto Wallets',
      'Real Estate Tokenization',
      'Metaverse Development',
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled]           = useState(false);
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [servicesOpen, setServicesOpen]   = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [companyOpen, setCompanyOpen]     = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState({});

  const closeTimer     = useRef(null);
  const portfolioTimer = useRef(null);
  const companyTimer   = useRef(null);
  const companyRef     = useRef(null);
  const portfolioRef   = useRef(null);
  const [companyLeft, setCompanyLeft]     = useState(0);
  const [portfolioLeft, setPortfolioLeft] = useState(0);

  const updatePositions = () => {
    if (companyRef.current) {
      const r = companyRef.current.getBoundingClientRect();
      setCompanyLeft(Math.round(r.left + r.width / 2));
    }
    if (portfolioRef.current) {
      const r = portfolioRef.current.getBoundingClientRect();
      setPortfolioLeft(Math.round(r.left + r.width / 2));
    }
  };

  const openServices  = () => { clearTimeout(closeTimer.current);     closeTimer.current = setTimeout(() => setServicesOpen(true), 120); };
  const closeServices = () => { clearTimeout(closeTimer.current);     closeTimer.current = setTimeout(() => setServicesOpen(false), 300); };
  const openPortfolio  = () => { clearTimeout(portfolioTimer.current); portfolioTimer.current = setTimeout(() => setPortfolioOpen(true), 120); };
  const closePortfolio = () => { clearTimeout(portfolioTimer.current); portfolioTimer.current = setTimeout(() => setPortfolioOpen(false), 300); };
  const openCompany    = () => { clearTimeout(companyTimer.current);   companyTimer.current = setTimeout(() => setCompanyOpen(true), 120); };
  const closeCompany   = () => { clearTimeout(companyTimer.current);   companyTimer.current = setTimeout(() => setCompanyOpen(false), 300); };

  const { t } = useLang();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setPortfolioOpen(false);
    setCompanyOpen(false);
    setMobileExpanded({});
  }, [pathname]);

  const toggleMobileSection = (key) =>
    setMobileExpanded(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : 'transparent'}`}>
      <div className="navbar-inner">

        {/* Logo */}
        <Link to="/" className="logo">
          <img src={logo} alt="DreamTech" className="logo-img" />
        </Link>

        {/* Vertical divider after logo */}
        <div className="logo-divider" />

        {/* Desktop Nav */}
        <ul className="nav-links-desktop">

          {/* Services */}
          <li
            className="nav-item"
            onMouseEnter={openServices}
            onMouseLeave={closeServices}
          >
            <button className={`nav-link nav-link-btn ${servicesOpen ? 'active' : ''}`} aria-expanded={servicesOpen}>
              {t.nav?.services || 'Services'}
              <svg className={`nav-chevron ${servicesOpen ? 'rotated' : ''}`} width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {servicesOpen && (
              <div className="mega-menu" onMouseEnter={openServices} onMouseLeave={closeServices}>
                <div className="mega-left">
                  <h2 className="mega-title">Services</h2>
                  <p className="mega-desc">Our service portfolio covers an entire software development life cycle and meets varied business needs.</p>
                </div>
                <div className="mega-divider" />
                <div className="mega-cols">
                  {SERVICES_MENU.map(col => (
                    <div className="mega-col" key={col.title}>
                      <h4 className="mega-col-title">{col.title}</h4>
                      <ul>
                        {col.links.map(link => (
                          <li key={link}>
                            <Link to={SERVICE_ROUTES[link] || '/services'} className="mega-link" onClick={() => setServicesOpen(false)}>
                              {link}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </li>

          {/* Products */}
          <li className="nav-item">
            <Link to="/products" className={`nav-link ${pathname === '/products' ? 'active' : ''}`}>
              Products
            </Link>
          </li>

          {/* Company */}
          <li className="nav-item" ref={companyRef} onMouseEnter={() => { updatePositions(); openCompany(); }} onMouseLeave={closeCompany}>
            <button className={`nav-link nav-link-btn ${companyOpen ? 'active' : ''}`} aria-expanded={companyOpen}>
              Company
              <svg className={`nav-chevron ${companyOpen ? 'rotated' : ''}`} width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {companyOpen && (
              <div className="drop-menu" style={{ left: `${companyLeft - 200}px`, transform: 'translateX(-50%)' }} onMouseEnter={() => { clearTimeout(companyTimer.current); setCompanyOpen(true); }} onMouseLeave={closeCompany}>
                <div className="drop-left">
                  <h2 className="drop-title">Company</h2>
                  <p className="drop-desc">We work with innovative entrepreneurs to launch products that solve real market needs.</p>
                </div>
                <div className="drop-divider" />
                <div className="drop-links">
                  <Link to="/about" className="drop-link" onClick={() => setCompanyOpen(false)}>About us</Link>
                  <Link to="/about" className="drop-link" onClick={() => setCompanyOpen(false)}>Process</Link>
                </div>
              </div>
            )}
          </li>

          {/* Portfolio */}
          <li className="nav-item" ref={portfolioRef} onMouseEnter={() => { updatePositions(); openPortfolio(); }} onMouseLeave={closePortfolio}>
            <button className={`nav-link nav-link-btn ${portfolioOpen ? 'active' : ''}`} aria-expanded={portfolioOpen}>
              Portfolio
              <svg className={`nav-chevron ${portfolioOpen ? 'rotated' : ''}`} width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {portfolioOpen && (
              <div className="drop-menu" style={{ left: `${portfolioLeft - 200}px`, transform: 'translateX(-50%)' }} onMouseEnter={() => { clearTimeout(portfolioTimer.current); setPortfolioOpen(true); }} onMouseLeave={closePortfolio}>
                <div className="drop-left">
                  <h2 className="drop-title">Portfolio</h2>
                  <p className="drop-desc">Our user-centered design encourages productivity and boosts revenue.</p>
                </div>
                <div className="drop-divider" />
                <div className="drop-links">
                  <Link to="/case-studies" className="drop-link" onClick={() => setPortfolioOpen(false)}>Case Studies</Link>
                  <Link to="/blog"         className="drop-link" onClick={() => setPortfolioOpen(false)}>Blog</Link>
                </div>
              </div>
            )}
          </li>

          {/* Refer Now */}
          <li className="nav-item">
            <Link to="/refer" className={`nav-link ${pathname === '/refer' ? 'active' : ''}`}>
              Refer Now
            </Link>
          </li>

        </ul>

        {/* Right */}
        <div className="navbar-right">
          <LangSwitcher />
          <Link to="/contact" className="nav-contact-btn">Contact us</Link>
          <button
            className={`hamburger ${mobileOpen ? 'is-open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>

        {/* Services */}
        <div className="mob-section">
          <button className="mob-section-btn" onClick={() => toggleMobileSection('services')}>
            Services
            <svg className={`nav-chevron ${mobileExpanded.services ? 'rotated' : ''}`} width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {mobileExpanded.services && (
            <div className="mob-sub">
              {SERVICES_MENU.flatMap(col => col.links).map(link => (
                <Link key={link} to={SERVICE_ROUTES[link] || '/services'} className="mob-link">
                  {link}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link to="/products" className="mob-top-link">Products</Link>

        {/* Company */}
        <div className="mob-section">
          <button className="mob-section-btn" onClick={() => toggleMobileSection('company')}>
            Company
            <svg className={`nav-chevron ${mobileExpanded.company ? 'rotated' : ''}`} width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {mobileExpanded.company && (
            <div className="mob-sub">
              <Link to="/about" className="mob-link">About us</Link>
              <Link to="/about" className="mob-link">Process</Link>
            </div>
          )}
        </div>

        {/* Portfolio */}
        <div className="mob-section">
          <button className="mob-section-btn" onClick={() => toggleMobileSection('portfolio')}>
            Portfolio
            <svg className={`nav-chevron ${mobileExpanded.portfolio ? 'rotated' : ''}`} width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {mobileExpanded.portfolio && (
            <div className="mob-sub">
              <Link to="/case-studies" className="mob-link">Case Studies</Link>
              <Link to="/blog"         className="mob-link">Blog</Link>
            </div>
          )}
        </div>

        <Link to="/refer" className="mob-top-link">Refer Now</Link>

        <div className="mob-footer">
          <Link to="/contact" className="nav-contact-btn" style={{ width: '100%', justifyContent: 'center' }}>
            Contact us
          </Link>
        </div>
      </div>
    </nav>
  );
}
