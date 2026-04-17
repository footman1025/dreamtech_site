import { useState } from 'react';
import { ethers } from 'ethers';
import './WalletPay.css';

// DreamTech receiving wallet — replace with your actual address
const RECEIVER = '0x742d35Cc6634C0532925a3b8D4C9B7e5e3F1a2b3';

// ETH price per plan (monthly) — adjust to match real ETH value
const ETH_PRICES = {
  basic:        '0.002',
  plus:         '0.004',
  professional: '0.02',
  premier:      '0.04',
};

export default function WalletPay({ plan, billing, onSuccess, onCancel }) {
  const [step, setStep] = useState('idle'); // idle | connecting | confirm | paying | done | error
  const [wallet, setWallet] = useState('');
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');

  const ethAmount = ETH_PRICES[plan.id] || '0.002';
  const displayEth = billing === 'annual'
    ? (parseFloat(ethAmount) * 10).toFixed(4)   // ~2 months free
    : ethAmount;

  const connectWallet = async () => {
    setError('');
    if (!window.ethereum) {
      setError('MetaMask not detected. Please install MetaMask to pay with crypto.');
      return;
    }
    try {
      setStep('connecting');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      setWallet(accounts[0]);
      setStep('confirm');
    } catch (e) {
      setError(e.message || 'Connection cancelled');
      setStep('idle');
    }
  };

  const sendPayment = async () => {
    setError('');
    setStep('paying');
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to: RECEIVER,
        value: ethers.parseEther(displayEth),
      });
      setTxHash(tx.hash);
      setStep('done');
      // Notify parent after short delay
      setTimeout(() => onSuccess(tx.hash), 1500);
    } catch (e) {
      setError(e.message?.includes('user rejected') ? 'Transaction cancelled.' : (e.message || 'Transaction failed'));
      setStep('confirm');
    }
  };

  const short = (addr) => addr ? `${addr.slice(0,6)}...${addr.slice(-4)}` : '';

  return (
    <div className="wallet-overlay" role="dialog" aria-modal="true">
      <div className="wallet-modal">
        <button className="wallet-close" onClick={onCancel} aria-label="Close">✕</button>

        <div className="wallet-header">
          <div className="wallet-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
            </svg>
          </div>
          <h3>Pay with Crypto</h3>
          <p>Activate <strong>{plan.label}</strong> plan via MetaMask</p>
        </div>

        <div className="wallet-plan-summary">
          <span>{plan.label} — {billing === 'annual' ? 'Annual' : 'Monthly'}</span>
          <span className="wallet-eth">{displayEth} ETH</span>
        </div>

        {error && <p className="wallet-error">{error}</p>}

        {step === 'idle' && (
          <button className="btn wallet-btn-connect" onClick={connectWallet}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/></svg>
            Connect MetaMask
          </button>
        )}

        {step === 'connecting' && (
          <p className="wallet-status">Connecting to MetaMask...</p>
        )}

        {step === 'confirm' && (
          <div className="wallet-confirm">
            <div className="wallet-address">
              <span>Wallet</span>
              <strong>{short(wallet)}</strong>
            </div>
            <div className="wallet-address">
              <span>To</span>
              <strong>{short(RECEIVER)}</strong>
            </div>
            <div className="wallet-address">
              <span>Amount</span>
              <strong>{displayEth} ETH</strong>
            </div>
            <button className="btn wallet-btn-pay" onClick={sendPayment}>
              Confirm &amp; Pay {displayEth} ETH
            </button>
          </div>
        )}

        {step === 'paying' && (
          <p className="wallet-status">⏳ Waiting for transaction confirmation...</p>
        )}

        {step === 'done' && (
          <div className="wallet-success">
            <span className="wallet-check">✓</span>
            <p>Payment sent!</p>
            <a href={`https://etherscan.io/tx/${txHash}`} target="_blank" rel="noreferrer" className="wallet-tx">
              View on Etherscan ↗
            </a>
          </div>
        )}

        <p className="wallet-note">Payments are processed on Ethereum mainnet. Make sure you have enough ETH for gas fees.</p>
      </div>
    </div>
  );
}
