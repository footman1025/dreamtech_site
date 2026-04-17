const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

const PLANS = [
  { id: 'basic',        label: 'Basic',        monthly: 4.99,  annual: 3.99  },
  { id: 'plus',         label: 'Plus',         monthly: 9.99,  annual: 7.99  },
  { id: 'professional', label: 'Professional', monthly: 49.00, annual: 39.00 },
  { id: 'premier',      label: 'Premier',      monthly: 99.00, annual: 79.00 },
];

// GET /api/membership/plans
router.get('/plans', (req, res) => res.json(PLANS));

// GET /api/membership/me  – current user's membership
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('membership name email');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/membership/select  – choose / upgrade / downgrade plan
router.post('/select', auth, async (req, res) => {
  try {
    const { plan, billing } = req.body;
    const validPlans = ['none', ...PLANS.map(p => p.id)];
    if (!validPlans.includes(plan)) return res.status(400).json({ message: 'Invalid plan' });
    if (!['monthly', 'annual'].includes(billing)) return res.status(400).json({ message: 'Invalid billing cycle' });

    const now = new Date();
    const renewDate = new Date(now);
    billing === 'annual' ? renewDate.setFullYear(renewDate.getFullYear() + 1)
                         : renewDate.setMonth(renewDate.getMonth() + 1);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { membership: { plan, billing, startDate: now, renewDate } },
      { new: true }
    ).select('membership name email');

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
