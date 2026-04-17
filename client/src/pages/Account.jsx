import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import AvatarCropper from '../components/AvatarCropper';
import WalletPay from '../components/WalletPay';
import './Account.css';
import './Membership.css';

const TABS = [
  { id: 'profile',       label: 'Profile',                icon: '👤' },
  { id: 'notifications', label: 'Email & Notifications',  icon: '🔔' },
  { id: 'membership',    label: 'Membership',             icon: '⭐' },
  { id: 'password',      label: 'Password',               icon: '🔒' },
  { id: 'payment',       label: 'Payment & Financials',   icon: '💳' },
  { id: 'security',      label: 'Account Security',       icon: '🛡️' },
  { id: 'verification',  label: 'Trust & Verification',   icon: '✅' },
  { id: 'account',       label: 'Account',                icon: '⚙️' },
];

const PLAN_ICONS = {
  basic:        { color: '#3b82f6' },
  plus:         { color: '#1d4ed8' },
  professional: { color: '#f97316' },
  premier:      { color: '#eab308' },
};
const PLAN_ORDER = ['basic', 'plus', 'professional', 'premier'];

export default function Account() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'profile';

  // Membership state
  const [plans, setPlans] = useState([]);
  const [annual, setAnnual] = useState(false);
  const [planLoading, setPlanLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(user?.membership?.plan || 'none');
  const [renewDate, setRenewDate] = useState(user?.membership?.renewDate || null);
  const [walletPlan, setWalletPlan] = useState(null); // plan being paid via wallet

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    window.scrollTo(0, 0);
  }, [user, navigate]);

  useEffect(() => {
    if (activeTab !== 'membership') return;
    const token = localStorage.getItem('dt_token');
    axios.get('/api/membership/plans').then(r => setPlans(r.data));
    axios.get('/api/membership/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => {
        setCurrentPlan(r.data.membership?.plan || 'none');
        setRenewDate(r.data.membership?.renewDate || null);
        setAnnual(r.data.membership?.billing === 'annual');
      }).catch(() => {});
  }, [activeTab]);

  const handlePlanSelect = async (planId) => {
    if (planLoading) return;
    setPlanLoading(true);
    try {
      const token = localStorage.getItem('dt_token');
      const { data } = await axios.post(
        '/api/membership/select',
        { plan: planId, billing: annual ? 'annual' : 'monthly' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCurrentPlan(data.membership.plan);
      setRenewDate(data.membership.renewDate);
      const stored = JSON.parse(localStorage.getItem('dt_user') || '{}');
      login({ ...stored, membership: data.membership }, token);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update plan');
    } finally {
      setPlanLoading(false);
    }
  };

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
  const currentIdx = PLAN_ORDER.indexOf(currentPlan);

  const handleWalletSuccess = async (txHash) => {
    // After crypto payment, activate the plan on the server
    setWalletPlan(null);
    if (!walletPlan) return;
    await handlePlanSelect(walletPlan.id);
  };

  const setTab = (id) => setSearchParams({ tab: id });

  return (
    <main className="account-page">
      <div className="container">
        <div className="account-layout">

          {/* Sidebar */}
          <aside className="account-sidebar" role="navigation" aria-label="Account settings">
            {TABS.map(t => (
              <button
                key={t.id}
                className={`sidebar-item${activeTab === t.id ? ' active' : ''}`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </aside>

          {/* Content */}
          <div className="account-content">
            {activeTab === 'profile' && <ProfileTab user={user} />}
            {activeTab === 'notifications' && <PlaceholderTab title="Email & Notifications" desc="Manage your email preferences and notification settings." />}
            {activeTab === 'membership' && (
              <div className="account-membership">
                {walletPlan && (
                  <WalletPay
                    plan={walletPlan}
                    billing={annual ? 'annual' : 'monthly'}
                    onSuccess={handleWalletSuccess}
                    onCancel={() => setWalletPlan(null)}
                  />
                )}
                <div className="membership-header" style={{ textAlign: 'center', marginBottom: 32 }}>
                  <span className="tag">Plans</span>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: 700, margin: '8px 0' }}>Choose Your Membership</h1>
                  <p style={{ color: 'var(--text-muted)' }}>Unlock services that match your needs. Upgrade or downgrade anytime.</p>
                </div>

                <div className="billing-toggle">
                  <span className={!annual ? 'active' : ''}>Monthly</span>
                  <label className="toggle-switch" aria-label="Toggle annual billing">
                    <input type="checkbox" checked={annual} onChange={e => setAnnual(e.target.checked)} />
                    <span className="toggle-track"><span className="toggle-thumb" /></span>
                  </label>
                  <span className={annual ? 'active' : ''}>Annual</span>
                </div>

                <div className="plans-grid">
                  {plans.map(plan => {
                    const isCurrent = currentPlan === plan.id;
                    const planIdx = PLAN_ORDER.indexOf(plan.id);
                    const isUpgrade = planIdx > currentIdx;
                    const color = PLAN_ICONS[plan.id]?.color || '#7c3aed';
                    const price = annual ? plan.annual : plan.monthly;
                    return (
                      <div key={plan.id} className={`plan-card${isCurrent ? ' current' : ''}`}>
                        <div className="plan-icon" style={{ background: color + '22' }}>
                          <span style={{ width: 24, height: 24, borderRadius: '50%', background: color, display: 'inline-block' }} />
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
                          <div className="plan-btn-group">
                            <button
                              className={`plan-btn ${isUpgrade ? 'upgrade' : 'downgrade'}`}
                              onClick={() => handlePlanSelect(plan.id)}
                              disabled={planLoading}
                            >
                              {planLoading ? '...' : isUpgrade ? 'Upgrade' : 'Downgrade'}
                            </button>
                            <button
                              className="plan-btn plan-btn-crypto"
                              onClick={() => setWalletPlan(plan)}
                              disabled={planLoading}
                              title="Pay with crypto wallet"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/></svg>
                              Pay with Crypto
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <p className="membership-notice">
                  {currentPlan === 'none'
                    ? "You don't have an active plan yet. Pick one above to get started."
                    : <>To cancel your membership, <Link to="/contact">contact support</Link>.</>}
                </p>
              </div>
            )}
            {activeTab === 'password'     && <PasswordTab />}
            {activeTab === 'payment'      && <PlaceholderTab title="Payment & Financials" desc="Manage your payment methods and billing history." />}
            {activeTab === 'security'     && <PlaceholderTab title="Account Security" desc="Two-factor authentication and active sessions." />}
            {activeTab === 'verification' && <PlaceholderTab title="Trust & Verification" desc="Verify your identity and build trust on the platform." />}
            {activeTab === 'account'      && <PlaceholderTab title="Account" desc="Manage your account settings or delete your account." />}
          </div>

        </div>
      </div>
    </main>
  );
}

function ProfileTab({ user }) {
  const { login } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [preview, setPreview] = useState(user?.avatar || '');
  const [rawSrc, setRawSrc] = useState(null);   // original file for cropper
  const [cropping, setCropping] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const fileRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setMsg('');
    const reader = new FileReader();
    reader.onload = (ev) => { setRawSrc(ev.target.result); setCropping(true); };
    reader.readAsDataURL(file);
    // reset input so same file can be re-selected
    e.target.value = '';
  };

  const handleCropDone = (croppedDataUrl) => {
    setPreview(croppedDataUrl);
    setAvatar(croppedDataUrl);
    setCropping(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true); setMsg('');
    try {
      const token = localStorage.getItem('dt_token');
      const { data } = await axios.patch('/api/auth/profile', { name, avatar },
        { headers: { Authorization: `Bearer ${token}` } });
      login(data, token);
      setMsg('Saved successfully');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Save failed');
    } finally { setSaving(false); }
  };

  const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) : '?';

  return (
    <>
      {cropping && (
        <AvatarCropper
          imageSrc={rawSrc}
          onDone={handleCropDone}
          onCancel={() => setCropping(false)}
        />
      )}
      <h2>Profile</h2>
      <form className="profile-form" onSubmit={handleSave}>
        <div className="avatar-upload-wrap">
          <div className="avatar-upload-circle" onClick={() => fileRef.current.click()} title="Click to change photo">
            {preview
              ? <img src={preview} alt="avatar" className="avatar-upload-img" />
              : <span className="avatar-upload-initials">{initials}</span>}
            <div className="avatar-upload-overlay">📷</div>
          </div>
          <div className="avatar-upload-hint">
            <span>Click to upload photo</span>
            <small>Any image — you can crop after selecting</small>
          </div>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
        </div>

        <div className="form-group">
          <label>Full Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={user?.email} readOnly />
        </div>
        {msg && <p style={{ fontSize: 13, color: msg.includes('success') ? '#22c55e' : '#f87171' }}>{msg}</p>}
        <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: 8 }} disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </>
  );
}

function PlaceholderTab({ title, desc }) {
  return (
    <>
      <h2>{title}</h2>
      <p className="account-placeholder">{desc}</p>
    </>
  );
}

function PasswordTab() {
  const [form, setForm] = useState({ current: '', newPass: '', confirm: '' });
  const [show, setShow] = useState({ current: false, newPass: false, confirm: false });
  const [msg, setMsg] = useState('');
  const [saving, setSaving] = useState(false);

  const toggle = (field) => setShow(s => ({ ...s, [field]: !s[field] }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    if (form.newPass !== form.confirm) { setMsg('New passwords do not match.'); return; }
    if (form.newPass.length < 6) { setMsg('Password must be at least 6 characters.'); return; }
    setSaving(true);
    try {
      const token = localStorage.getItem('dt_token');
      await axios.patch('/api/auth/password',
        { currentPassword: form.current, newPassword: form.newPass },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMsg('success');
      setForm({ current: '', newPass: '', confirm: '' });
    } catch (err) {
      setMsg(err.response?.data?.message || 'Failed to update password.');
    } finally { setSaving(false); }
  };

  const EyeIcon = ({ visible }) => visible ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );

  return (
    <>
      <h2>Password</h2>
      <div className="pw-divider" />
      <form className="pw-form" onSubmit={handleSubmit}>
        <h3 className="pw-subtitle">Change Password</h3>
        {['current', 'newPass', 'confirm'].map((field, i) => (
          <div className="form-group" key={field}>
            <label>{['Current Password', 'New Password', 'Confirm Password'][i]}</label>
            <div className="pw-input-wrap">
              <input
                type={show[field] ? 'text' : 'password'}
                value={form[field]}
                onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                required
              />
              <button type="button" className="pw-eye" onClick={() => toggle(field)} aria-label="Toggle visibility">
                <EyeIcon visible={show[field]} />
              </button>
            </div>
          </div>
        ))}
        {msg === 'success'
          ? <p style={{ color: '#22c55e', fontSize: 13 }}>Password updated successfully.</p>
          : msg ? <p style={{ color: '#f87171', fontSize: 13 }}>{msg}</p> : null}
        <div className="pw-divider" />
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </>
  );
}
