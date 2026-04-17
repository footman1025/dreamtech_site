import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LangProvider } from './context/LangContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Products from './pages/Products';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Refer from './pages/Refer';
import CaseStudies from './pages/CaseStudies';
import Web3Dev from './pages/Web3Dev';
import NFTDev from './pages/NFTDev';
import NFTMarketplace from './pages/NFTMarketplace';
import CryptoWallets from './pages/CryptoWallets';
import RealEstate from './pages/RealEstate';
import MetaverseDev from './pages/MetaverseDev';
import CookieBanner from './components/CookieBanner';
import { AuthProvider } from './context/AuthContext';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);
  return null;
}

function ScrollToTopBtn() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      style={{
        position: 'fixed',
        bottom: 100,
        right: 36,
        width: 44,
        height: 44,
        borderRadius: 10,
        background: '#0ea5e9',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(14,165,233,0.4)',
        zIndex: 1998,
        transition: 'background 0.15s, transform 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = '#0284c7'}
      onMouseLeave={e => e.currentTarget.style.background = '#0ea5e9'}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    </button>
  );
}

export default function App() {
  return (
    <LangProvider>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<Products />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/refer" element={<Refer />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/web3-development" element={<Web3Dev />} />
            <Route path="/nft-development" element={<NFTDev />} />
            <Route path="/nft-marketplace" element={<NFTMarketplace />} />
            <Route path="/crypto-wallets" element={<CryptoWallets />} />
            <Route path="/real-estate-tokenization" element={<RealEstate />} />
            <Route path="/metaverse-development" element={<MetaverseDev />} />
          </Routes>
          <Footer />
          <Chatbot />
          <ScrollToTopBtn />
          <CookieBanner />
        </BrowserRouter>
      </AuthProvider>
    </LangProvider>
  );
}
