import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Membership.css';

const PLAN_ICONS = {
  basic:        { emoji: '🔵', bg: '#3b82f6' },
  plus:         { emoji: '🔷', bg: '#1d4ed8' },
  professional: { emoji: '🟠', bg: '#f97316' },
  premier:      { emoji: '🟡', bg: '#eab308' },
};

const PLAN_ORDER = ['basic', 'plus', 'professional', 'premier'];

export default function Membership() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [annual, setAnnual] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(user?.membership?.plan || 'none');
  const [renewDate, setRenewDate] = useState(user?.membership?.renewDate || null);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    axios.get('/api/membership/plans').then(r => setPlans(r.data));
    // Fetch fresh membership data
    const token = localStorage.getItem('dt_token');
    axios.get('/api/membership/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => {
        setCurrentPlan(r.data.membership?.plan || 'none');
        setRenewDate(r.data.membership?.renewDate || null);
        setAnnual(r.data.membership?.billing === 'annual');
      })
      .catch(() => {});
    window.scrollTo(0, 0);
  }, [user, navigate]);

  const handleSelect = async (planId) => {
    if (loading) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('dt_token');
      const billing = annual ? 'annual' : 'monthly';
      const { data } = await axios.post(
        '/api/membership/select',
        { plan: planId, billing },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCurrentPlan(data.membership.plan);
      setRenewDate(data.membership.renewDate);
      // Update stored user
      const stored = JSON.parse(localStorage.getItem('dt_user') || '{}');
      login({ ...stored, membership: data.membership }, token);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update plan');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (d) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const currentIdx = PLAN_ORDER.indexOf(currentPlan);

  return (
    <main className="membership-page">
      <div className="container">
        <div className="membership-header">
          <span className="tag">Plans</span>
          <h1>Choose Your Membership</h1>
          <p>Unlock services that match your needs. Upgrade or downgrade anytime.</p>
        </div>

        <div className="billing-toggle">
          <span className={!annual ? 'active' : ''}>Monthly</span>
          <label className="toggle-switch" aria-label="Toggle annual billing">
            <input type="checkbox" checked={annual} onChange={e => setAnnual(e.target.checked)} />
            <span className="toggle-track">
              <span className="toggle-thumb" />
            </span>
          </label>
          <span className={annual ? 'active' : ''}>Annual</span>
        </div>

        <div className="plans-grid">
          {plans.map((plan) => {
            const isCurrent = currentPlan === plan.id;
            const planIdx = PLAN_ORDER.indexOf(plan.id);
            const isUpgrade = planIdx > currentIdx;
            const icon = PLAN_ICONS[plan.id];
            const price = annual ? plan.annual : plan.monthly;

            return (
              <div key={plan.id} className={`plan-card${isCurrent ? ' current' : ''}`}>
                <div className="plan-icon" style={{ background: icon.bg + '22', color: icon.bg }}>
                  {icon.emoji}
                </div>
                <div className="plan-name">{plan.label}</div>
                <div className="plan-price">
                  <span className="sup">$</span>
                  <span className="amount">{price.toFixed(2)}</span>
                  <div className="period">/ {annual ? 'month, billed annually' : 'month'}</div>
                </div>

                {isCurrent ? (
                  <div className="plan-current-label">
                    <strong>Current Plan</strong>
                    {renewDate && <span>Renews {formatDate(renewDate)}</span>}
                  </div>
                ) : (
                  <button
                    className={`plan-btn ${isUpgrade ? 'upgrade' : 'downgrade'}`}
                    onClick={() => handleSelect(plan.id)}
                    disabled={loading}
                  >
                    {loading ? '...' : isUpgrade ? 'Upgrade' : 'Downgrade'}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {currentPlan === 'none' && (
          <p className="membership-notice">You don't have an active plan yet. Pick one above to get started.</p>
        )}
        {currentPlan !== 'none' && (
          <p className="membership-notice">
            To cancel your membership, <Link to="/contact">contact support</Link>.
          </p>
        )}
      </div>
    </main>
  );
}
