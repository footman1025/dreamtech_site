import { useState } from 'react';
import { useLang } from '../context/LangContext';
import './Refer.css';

const STEPS = [
  { num: '01', title: 'Refer a client', desc: 'Share our contact details or introduce us directly via email to a company that needs software development.' },
  { num: '02', title: 'We close the deal', desc: 'Our sales team takes over, presents a proposal, and signs the contract with your referred client.' },
  { num: '03', title: 'You earn 10%', desc: 'Receive 10% of the project revenue every month starting from the second month of the engagement.' },
];

const FAQS = [
  { q: 'Who can become a partner?', a: 'Anyone — freelancers, agencies, consultants, or individuals who know companies looking for software development services.' },
  { q: 'How much can I earn?', a: 'You earn 10% of the monthly project revenue starting from the second month. For a $10,000/month project that\'s $1,000 every month.' },
  { q: 'When do I get paid?', a: 'Payments are processed on the 5th of each month for the previous month\'s revenue. We support bank transfer, PayPal, and crypto.' },
  { q: 'Is there a limit on referrals?', a: 'No limit. Refer as many clients as you want and earn from all of them simultaneously.' },
  { q: 'Do I need a contract?', a: 'Yes, we sign a simple referral agreement before the first payout. It protects both parties and outlines the terms clearly.' },
];

export default function Refer() {
  const { t } = useLang();
  const r = t.refer || {};
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', company: '', message: '' });
    }, 800);
  };

  return (
    <main className="refer-page">

      {/* ── Hero ── */}
      <section className="refer-hero">
        <div className="refer-hero-overlay" />
        <img
          className="refer-hero-bg"
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&auto=format&fit=crop&q=80"
          alt=""
          aria-hidden="true"
        />
        <div className="refer-hero-content">
          <div className="refer-hero-left">
            <h1>{(r.heroTitle || 'Earn $10,000 from\nproject sales').split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}</h1>
            <p>{r.heroSub || 'Receive an additional 10% of project revenue starting from the second month'}</p>
            <a href="#refer-form" className="refer-hero-btn">{r.heroBtn || 'Become a partner'}</a>
            <div className="refer-hero-badges">
              <div className="refer-badge-clutch">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#e53e3e"><polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"/></svg>
                <div>
                  <span className="badge-score">4.9</span>
                  <div className="badge-stars">★★★★★</div>
                  <span className="badge-source">{r.clutchLabel || 'Based on 60 Clutch reviews'}</span>
                </div>
              </div>
              <div className="refer-badge-upwork">
                <span className="upwork-logo">Up<span>work</span></span>
                <div className="badge-stars upwork-stars">★★★★★</div>
                <span className="badge-source">{r.upworkLabel || '100+ reviews'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Partner ── */}
      <section className="refer-section refer-why">
        <div className="refer-container">
          <div className="refer-why-grid">
            <div className="refer-why-card">
              <span className="refer-why-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
              </span>
              <h3>New-World Opportunities</h3>
              <p>With extensive expertise in next-gen technologies, we are here to help you explore new opportunities and create cutting-edge web and mobile apps that solve modern challenges and meet real market needs.</p>
            </div>
            <div className="refer-why-card">
              <span className="refer-why-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </span>
              <h3>Security &amp; Compliance</h3>
              <p>Innovations can be strong and healthy just when they're safe. We care about the security of your customers and business data and will ensure your app complies with legal and industry requirements.</p>
            </div>
            <div className="refer-why-card">
              <span className="refer-why-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </span>
              <h3>Dedicated Team</h3>
              <p>With us, you can outsource the whole project, augment your team, or hire a dedicated team tailored to project requirements. Our top talent is ready to build innovative, scalable, and robust solutions for your business.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="refer-how-section">
        <img
          className="refer-how-bg"
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80"
          alt=""
          aria-hidden="true"
        />
        <div className="refer-how-overlay" />
        <div className="refer-how-content">
          <h2 className="refer-how-title">How <span>Does</span> it Work?</h2>
          <div className="refer-how-card">
            <div className="refer-how-step">
              <span className="refer-how-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </span>
              <h4>Join as a referrer</h4>
              <p>It's free to join. Fill out the form, and we'll get in touch.</p>
            </div>
            <div className="refer-how-step">
              <span className="refer-how-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </span>
              <h4>Start referring</h4>
              <p>You can refer a business owner or share their contact details. We'll track their progress.</p>
            </div>
            <div className="refer-how-step">
              <span className="refer-how-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </span>
              <h4>Projects of all sizes</h4>
              <p>For larger projects (more than $100,000), you receive a $10,000 commission from project sales and recurring monthly payments of 10% of the revenue starting from the second month.</p>
            </div>
            <div className="refer-how-step">
              <span className="refer-how-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
              <h4>Success</h4>
              <p>For projects under $100,000, upon a successful referral you receive monthly payments of 10% of the project revenue starting from the second month from the agreement date.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="refer-stats-bar">
        <div className="refer-container refer-stats-grid">
          {[
            { value: '$10K+', label: 'Avg. partner earnings' },
            { value: '10%',   label: 'Revenue share' },
            { value: '150+',  label: 'Projects delivered' },
            { value: '48h',   label: 'Avg. proposal time' },
          ].map(s => (
            <div className="refer-stat" key={s.label}>
              <h3>{s.value}</h3>
              <p>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact Form ── */}
      <section className="refer-section refer-contact-section" id="refer-form">
        <div className="refer-container">
          {/* Top: heading full width */}
          <div className="refer-contact-top">
            <h2>Ready to discuss your project with us?</h2>
            <p className="refer-contact-sub">Fill out the form with your details and we will get back to you shortly.</p>
          </div>

          {/* Bottom: two columns */}
          <div className="refer-contact-wrap">
            {/* Left: What's next */}
            <div className="refer-contact-left">
              <h4 className="refer-whats-next">What's next?</h4>
              <div className="refer-next-steps">
                {[
                  'Our expert reaches out shortly after receiving your request and analyzing your requirements.',
                  'If needed, we sign an NDA to protect your privacy.',
                  'We request additional information to better understand and analyze your project.',
                  'We schedule a call to discuss your project, goals, and priorities, and provide preliminary feedback.',
                  "If you're satisfied, we finalize the agreement and start your project.",
                ].map((step, i) => (
                  <div className="refer-next-step" key={i}>
                    <span className="refer-next-num">0{i + 1}</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <form className="refer-contact-card" onSubmit={handleSubmit}>
              <h3>Contact us</h3>
              <div className="refer-form-row">
                <input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} required />
                <input name="email" type="email" placeholder="E-mail" value={form.email} onChange={handleChange} required />
              </div>
              <div className="refer-form-row">
                <input name="phone" type="tel" placeholder="Phone" value={form.phone || ''} onChange={handleChange} />
                <select name="industry" value={form.industry || ''} onChange={handleChange}>
                  <option value="">Industry</option>
                  {['Technology','Finance','Healthcare','E-commerce','Education','Real Estate','Other'].map(ind => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>
              <div className="refer-budget-label">Project budget (min.$50k)</div>
              <select name="budget" value={form.budget || ''} onChange={handleChange}>
                <option value="">$50 - 100k</option>
                <option>$100k - 250k</option>
                <option>$250k - 500k</option>
                <option>$500k+</option>
              </select>
              <select name="country" value={form.country || ''} onChange={handleChange}>
                <option value="">Country</option>
                {['United States','United Kingdom','Canada','Australia','Germany','France','India','UAE','Other'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <textarea name="message" rows={3} placeholder="Please describe your request in detail" value={form.message} onChange={handleChange} />
              {status === 'success' && <p className="refer-success">✅ Message sent! We'll be in touch shortly.</p>}
              <button type="submit" className="refer-submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending…' : 'Send a message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="refer-section refer-faq-section">
        <div className="refer-container">
          <p className="refer-tag">FAQ</p>
          <h2>Common questions</h2>
          <div className="refer-faqs">
            {FAQS.map((f, i) => (
              <div className={`refer-faq ${openFaq === i ? 'open' : ''}`} key={i}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {f.q}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points={openFaq === i ? '18 15 12 9 6 15' : '6 9 12 15 18 9'}/>
                  </svg>
                </button>
                {openFaq === i && <p className="faq-a">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
