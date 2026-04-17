const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  Table, TableRow, TableCell, WidthType, BorderStyle,
  AlignmentType, ShadingType, PageBreak, Spacing
} = require('docx');
const fs = require('fs');

// ── Color palette ──────────────────────────────────────────────
const C = {
  red:    'C0392B', orange: 'E67E22', blue:   '1D4ED8',
  green:  '16A34A', gray:   '6B7280', black:  '0F172A',
  white:  'FFFFFF', codeBg: '1E293B', codeText:'E2E8F0',
  lightBg:'F8FAFF', border: 'E2E8F0', heading:'0F172A',
  critical:'C0392B', high:'E67E22', medium:'D97706', low:'16A34A',
};

// ── Helpers ────────────────────────────────────────────────────
const h1 = (text) => new Paragraph({
  text, heading: HeadingLevel.HEADING_1,
  spacing: { before: 400, after: 200 },
  run: { bold: true, size: 36, color: C.black, font: 'Calibri' },
});

const h2 = (text) => new Paragraph({
  text, heading: HeadingLevel.HEADING_2,
  spacing: { before: 320, after: 160 },
  run: { bold: true, size: 28, color: C.blue, font: 'Calibri' },
});

const h3 = (text, color = C.black) => new Paragraph({
  children: [new TextRun({ text, bold: true, size: 24, color, font: 'Calibri' })],
  spacing: { before: 240, after: 120 },
});

const body = (text) => new Paragraph({
  children: [new TextRun({ text, size: 22, color: C.black, font: 'Calibri' })],
  spacing: { before: 80, after: 80 },
});

const bullet = (text) => new Paragraph({
  children: [new TextRun({ text, size: 22, color: C.black, font: 'Calibri' })],
  bullet: { level: 0 },
  spacing: { before: 60, after: 60 },
});

const label = (key, val, valColor = C.black) => new Paragraph({
  children: [
    new TextRun({ text: key + ': ', bold: true, size: 22, color: C.black, font: 'Calibri' }),
    new TextRun({ text: val, size: 22, color: valColor, font: 'Calibri' }),
  ],
  spacing: { before: 60, after: 60 },
});

const divider = () => new Paragraph({
  children: [new TextRun({ text: '─'.repeat(80), size: 18, color: C.border })],
  spacing: { before: 120, after: 120 },
});

const space = () => new Paragraph({ text: '', spacing: { before: 80, after: 80 } });

// Code block — dark background with monospace colored text
const code = (lines) => {
  const children = [];
  lines.forEach((line, i) => {
    // Simple syntax coloring
    let color = C.codeText;
    if (line.trim().startsWith('//')) color = '6A9955';          // comment green
    else if (/\b(const|let|var|function|return|if|async|await|require|module|new|try|catch)\b/.test(line)) color = '569CD6'; // keyword blue
    else if (/['"`]/.test(line)) color = 'CE9178';               // string orange
    else if (/\d+/.test(line) && !/[a-zA-Z]/.test(line.replace(/\d/g,''))) color = 'B5CEA8'; // number green

    children.push(new Paragraph({
      children: [new TextRun({ text: line || ' ', font: 'Courier New', size: 18, color })],
      shading: { type: ShadingType.SOLID, color: C.codeBg, fill: C.codeBg },
      spacing: { before: 0, after: 0 },
      indent: { left: 200 },
    }));
  });
  return children;
};

const severityBadge = (sev) => {
  const colors = { Critical: C.critical, High: C.high, Medium: C.medium, Low: C.low };
  const col = colors[sev] || C.gray;
  return new Paragraph({
    children: [
      new TextRun({ text: 'Severity: ', bold: true, size: 22, color: C.black, font: 'Calibri' }),
      new TextRun({ text: ` ${sev} `, bold: true, size: 22, color: C.white, font: 'Calibri',
        shading: { type: ShadingType.SOLID, color: col, fill: col } }),
    ],
    spacing: { before: 80, after: 80 },
  });
};

// ── Table builder ──────────────────────────────────────────────
const makeTable = (headers, rows) => {
  const headerRow = new TableRow({
    children: headers.map(h => new TableCell({
      children: [new Paragraph({
        children: [new TextRun({ text: h, bold: true, size: 20, color: C.white, font: 'Calibri' })],
        alignment: AlignmentType.CENTER,
      })],
      shading: { type: ShadingType.SOLID, color: C.blue, fill: C.blue },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
    })),
    tableHeader: true,
  });

  const dataRows = rows.map((row, ri) => new TableRow({
    children: row.map(cell => new TableCell({
      children: [new Paragraph({
        children: [new TextRun({ text: cell, size: 18, color: C.black, font: 'Calibri' })],
      })],
      shading: { type: ShadingType.SOLID, color: ri % 2 === 0 ? 'F0F4FF' : C.white, fill: ri % 2 === 0 ? 'F0F4FF' : C.white },
      margins: { top: 60, bottom: 60, left: 120, right: 120 },
    })),
  }));

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [headerRow, ...dataRows],
    borders: {
      top:    { style: BorderStyle.SINGLE, size: 1, color: C.border },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: C.border },
      left:   { style: BorderStyle.SINGLE, size: 1, color: C.border },
      right:  { style: BorderStyle.SINGLE, size: 1, color: C.border },
      insideH:{ style: BorderStyle.SINGLE, size: 1, color: C.border },
      insideV:{ style: BorderStyle.SINGLE, size: 1, color: C.border },
    },
  });
};

// ── DOCUMENT CONTENT ──────────────────────────────────────────
const children = [

  // ── TITLE PAGE ──
  new Paragraph({
    children: [new TextRun({ text: 'DreamTech Platform', bold: true, size: 56, color: C.blue, font: 'Calibri' })],
    alignment: AlignmentType.CENTER, spacing: { before: 800, after: 100 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Security Analysis Report', bold: true, size: 44, color: C.black, font: 'Calibri' })],
    alignment: AlignmentType.CENTER, spacing: { before: 100, after: 400 },
  }),
  new Paragraph({
    children: [new TextRun({ text: '━'.repeat(60), color: C.blue, size: 24 })],
    alignment: AlignmentType.CENTER, spacing: { before: 0, after: 400 },
  }),
  label('Project',     'DreamTech MERN Web Application'),
  label('Stack',       'MongoDB, Express.js, React.js, Node.js'),
  label('Report Date', 'April 1, 2026'),
  label('Analyst',     'Security Review — Automated + Manual Code Analysis'),
  label('Scope',       'Backend APIs, Frontend, Authentication, Authorization, Database, Payment, Sessions'),
  space(),
  new Paragraph({ children: [new PageBreak()] }),

  // ── EXECUTIVE SUMMARY ──
  h1('EXECUTIVE SUMMARY'),
  divider(),
  body('This report presents a comprehensive security assessment of the DreamTech MERN-stack web application. The analysis covers all layers of the application including the Node.js/Express backend, React frontend, MongoDB database layer, JWT-based authentication system, blockchain payment integration, and email handling.'),
  body('A total of 18 distinct vulnerabilities were identified across 5 severity levels. The most critical findings include a hardcoded JWT fallback secret, an unauthenticated admin endpoint exposing all user contact data, unlimited base64 avatar storage enabling denial-of-service, and missing rate limiting on all authentication endpoints.'),
  body('Immediate remediation is recommended for all Critical and High severity findings before any production deployment.'),
  space(),

  // ── SCOPE TABLE ──
  h1('SCOPE OF ASSESSMENT'),
  divider(),
  makeTable(
    ['Component', 'Files Reviewed'],
    [
      ['Backend Server',   'server/index.js, all routes, middleware'],
      ['Authentication',   'routes/auth.js, middleware/auth.js'],
      ['Database Models',  'models/User.js, models/Contact.js'],
      ['Frontend Auth',    'Login.jsx, Signup.jsx, AuthContext.jsx'],
      ['Payment',          'WalletPay.jsx'],
      ['Configuration',    '.env, package.json'],
    ]
  ),
  space(),
  new Paragraph({ children: [new PageBreak()] }),

  // ── CRITICAL ──
  h1('VULNERABILITY FINDINGS'),
  h2('🔴  CRITICAL SEVERITY'),
  divider(),

  // VULN-001
  h3('VULN-001: Hardcoded JWT Secret Fallback', C.critical),
  label('File',       'server/routes/auth.js line 7, server/middleware/auth.js line 7'),
  label('CVSS Score', '9.8 (Critical)', C.critical),
  severityBadge('Critical'),
  h3('Current Status:'),
  ...code([
    '// auth.js',
    "const signToken = (id) =>",
    "  jwt.sign({ id }, process.env.JWT_SECRET || 'dreamtech_secret', { expiresIn: '7d' });",
    '',
    '// middleware/auth.js',
    "req.user = jwt.verify(token, process.env.JWT_SECRET || 'dreamtech_secret');",
  ]),
  space(),
  body("The application falls back to the hardcoded string 'dreamtech_secret' if JWT_SECRET is not set. Any attacker who knows this string can forge valid JWT tokens for any user ID, gaining full authenticated access to any account."),
  label('Impact', 'Complete authentication bypass. Attacker can impersonate any user, access private data, change passwords, and modify membership plans.', C.critical),
  h3('Remediation:'),
  ...code([
    '// Throw at startup if secret is missing',
    'const JWT_SECRET = process.env.JWT_SECRET;',
    'if (!JWT_SECRET) {',
    "  console.error('FATAL: JWT_SECRET environment variable is not set');",
    '  process.exit(1);',
    '}',
    'const signToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: \'7d\' });',
  ]),
  space(), divider(),

  // VULN-002
  h3('VULN-002: Unauthenticated Admin Endpoint Exposes All Contact Data', C.critical),
  label('File',       'server/routes/contact.js lines 68–75'),
  label('CVSS Score', '9.1 (Critical)', C.critical),
  severityBadge('Critical'),
  h3('Current Status:'),
  ...code([
    '// GET /api/contact (admin) — NO AUTH MIDDLEWARE',
    'router.get(\'/\', async (req, res) => {',
    '  const contacts = await Contact.find().sort({ createdAt: -1 });',
    '  res.json(contacts);',
    '});',
  ]),
  space(),
  body('The GET /api/contact endpoint returns all contact form submissions including names, emails, phone numbers, and messages with zero authentication. Any person who discovers this endpoint can harvest all user PII.'),
  label('Impact', 'Full exposure of all user contact data. GDPR/PIPEDA violation. Enables targeted phishing attacks.', C.critical),
  h3('Remediation:'),
  ...code([
    "const auth = require('../middleware/auth');",
    'const adminOnly = (req, res, next) => {',
    "  if (!req.user?.isAdmin) return res.status(403).json({ message: 'Forbidden' });",
    '  next();',
    '};',
    "router.get('/', auth, adminOnly, async (req, res) => { ... });",
  ]),
  space(),
  new Paragraph({ children: [new PageBreak()] }),
];

// ── HIGH ──
children.push(
  h2('🟠  HIGH SEVERITY'), divider(),

  h3('VULN-003: No Rate Limiting on Authentication Endpoints', C.high),
  label('File', 'server/routes/auth.js, server/index.js'),
  label('CVSS Score', '8.1 (High)', C.high), severityBadge('High'),
  body('The /api/auth/login and /api/auth/signup endpoints have no rate limiting. reCAPTCHA exists on the frontend but is never verified server-side — completely bypassable via direct HTTP requests.'),
  label('Impact', 'Brute-force attacks, credential stuffing, account takeover.', C.high),
  h3('Remediation:'),
  ...code([
    '// npm install express-rate-limit',
    "const rateLimit = require('express-rate-limit');",
    'const authLimiter = rateLimit({',
    '  windowMs: 15 * 60 * 1000,',
    '  max: 10,',
    "  message: { message: 'Too many attempts. Try again in 15 minutes.' },",
    '});',
    "app.use('/api/auth/login', authLimiter);",
    "app.use('/api/auth/signup', authLimiter);",
  ]),
  space(), divider(),

  h3('VULN-004: Unlimited Base64 Avatar Storage — DoS Vector', C.high),
  label('File', 'server/routes/auth.js — PATCH /profile'),
  label('CVSS Score', '7.5 (High)', C.high), severityBadge('High'),
  ...code(['if (avatar !== undefined) {', '  update.avatar = avatar; // No size limit', '}']),
  space(),
  body('An authenticated user can upload arbitrarily large base64 strings. A 10MB image per user document rapidly exhausts MongoDB storage.'),
  label('Impact', 'MongoDB storage exhaustion. Application slowdown. Out-of-memory crashes.', C.high),
  h3('Remediation:'),
  ...code([
    'if (avatar !== undefined) {',
    '  if (avatar.length > 1100000)',
    "    return res.status(400).json({ message: 'Avatar too large. Max 600KB.' });",
    "  if (avatar && !avatar.startsWith('data:image/'))",
    "    return res.status(400).json({ message: 'Invalid image format.' });",
    '  update.avatar = avatar;',
    '}',
  ]),
  space(), divider(),

  h3('VULN-005: Wildcard CORS Configuration', C.high),
  label('File', 'server/index.js line 7'),
  label('CVSS Score', '7.4 (High)', C.high), severityBadge('High'),
  ...code(['app.use(cors()); // Allows ALL origins']),
  space(),
  body('Any website can make authenticated cross-origin requests to the API using a victim\'s credentials.'),
  label('Impact', 'CORS abuse. Combined with XSS, enables CSRF-style attacks.', C.high),
  h3('Remediation:'),
  ...code([
    "const allowedOrigins = ['http://localhost:5173', 'https://yourdomain.com'];",
    'app.use(cors({',
    '  origin: (origin, cb) => allowedOrigins.includes(origin) ? cb(null,true) : cb(new Error()),',
    '  credentials: true,',
    "}));",
  ]),
  space(), divider(),

  h3('VULN-006: JWT Stored in localStorage — XSS Theft Risk', C.high),
  label('File', 'client/src/context/AuthContext.jsx'),
  label('CVSS Score', '7.2 (High)', C.high), severityBadge('High'),
  ...code([
    "localStorage.setItem('dt_user', JSON.stringify(userData));",
    "localStorage.setItem('dt_token', token);",
  ]),
  space(),
  body('JWT tokens in localStorage are accessible to any JavaScript on the page. An XSS vulnerability anywhere allows token theft and persistent account takeover.'),
  label('Impact', 'Session hijacking via XSS. Persistent account takeover for 7 days.', C.high),
  h3('Remediation:'),
  ...code([
    "res.cookie('dt_token', token, {",
    '  httpOnly: true,',
    "  secure: process.env.NODE_ENV === 'production',",
    "  sameSite: 'strict',",
    '  maxAge: 7 * 24 * 60 * 60 * 1000',
    '});',
    'axios.defaults.withCredentials = true;',
  ]),
  space(), divider(),

  h3('VULN-007: No Input Sanitization — XSS in Email Templates', C.high),
  label('File', 'server/routes/contact.js'),
  label('CVSS Score', '7.0 (High)', C.high), severityBadge('High'),
  ...code([
    'html: `...<td>${name}</td>...',
    '       <p>${message.replace(/\\n/g, \'<br/>\')}</p>`',
  ]),
  space(),
  body('User-supplied fields are interpolated directly into HTML email templates. Attackers can inject HTML into admin notification emails for phishing.'),
  label('Impact', 'HTML injection in admin emails. Admin phishing risk.', C.high),
  h3('Remediation:'),
  ...code([
    'const escapeHtml = (str) => String(str)',
    "  .replace(/&/g, '&amp;').replace(/</g, '&lt;')",
    "  .replace(/>/g, '&gt;').replace(/\"/g, '&quot;');",
    'html: `...<td>${escapeHtml(name)}</td>...`',
  ]),
  space(),
  new Paragraph({ children: [new PageBreak()] }),
);

// ── MEDIUM ──
children.push(
  h2('🟡  MEDIUM SEVERITY'), divider(),

  h3('VULN-008: No Security Headers'), label('CVSS Score','6.1 (Medium)', C.medium), severityBadge('Medium'),
  body('Missing X-Content-Type-Options, X-Frame-Options, Content-Security-Policy, HSTS, Referrer-Policy.'),
  label('Impact','Clickjacking, MIME sniffing, downgrade attacks.', C.medium),
  h3('Remediation:'),
  ...code(["const helmet = require('helmet');", 'app.use(helmet({ contentSecurityPolicy: { directives: { defaultSrc: ["\'self\'"] } } }));']),
  space(), divider(),

  h3('VULN-009: Weak Password Policy'), label('CVSS Score','5.9 (Medium)', C.medium), severityBadge('Medium'),
  ...code(["if (password.length < 6) return res.status(400).json({ message: 'Min 6 chars' });"]),
  space(), body('6-character minimum is far below NIST standards. No complexity requirements. Passwords like "123456" are accepted.'),
  label('Impact','Weak passwords easily brute-forced.', C.medium),
  h3('Remediation:'),
  ...code(['const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$/;', 'if (!re.test(password)) return res.status(400).json({ message: \'Min 8 chars, upper, lower, number\' });']),
  space(), divider(),

  h3('VULN-010: Membership Activation Without Payment Verification'), label('CVSS Score','5.8 (Medium)', C.medium), severityBadge('Medium'),
  body('Any authenticated user can POST to /api/membership/select and activate Premier ($99/month) for free. The crypto payment is entirely client-side with no server-side blockchain verification.'),
  label('Impact','Users obtain premium membership without paying.', C.medium),
  h3('Remediation:'),
  ...code([
    'router.post(\'/select\', auth, async (req, res) => {',
    '  const { plan, billing, txHash } = req.body;',
    '  if (txHash) {',
    '    const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL);',
    '    const tx = await provider.getTransaction(txHash);',
    '    if (!tx || tx.to.toLowerCase() !== RECEIVER.toLowerCase())',
    "      return res.status(400).json({ message: 'Invalid transaction' });",
    '  }',
    '});',
  ]),
  space(), divider(),

  h3('VULN-011: No Request Body Size Limit'), label('CVSS Score','5.5 (Medium)', C.medium), severityBadge('Medium'),
  ...code(["app.use(express.json()); // Default 100kb — avatar payloads exceed this"]),
  space(), body('Avatar uploads send multi-megabyte base64 strings. Explicit limits per route are needed.'),
  h3('Remediation:'),
  ...code(["app.use(express.json({ limit: '100kb' }));", "app.use('/api/auth/profile', express.json({ limit: '2mb' }));"]),
  space(), divider(),

  h3('VULN-012: Sensitive Data in Error Messages'), label('CVSS Score','5.3 (Medium)', C.medium), severityBadge('Medium'),
  ...code(['res.status(500).json({ message: err.message }); // Leaks internals']),
  space(),
  h3('Remediation:'),
  ...code(["const isDev = process.env.NODE_ENV === 'development';", "res.status(500).json({ message: isDev ? err.message : 'Internal error.' });"]),
  space(), divider(),

  h3('VULN-013: No Account Lockout Mechanism'), label('CVSS Score','5.0 (Medium)', C.medium), severityBadge('Medium'),
  body('No mechanism locks an account after repeated failed login attempts. Enables unlimited brute-force.'),
  h3('Remediation:'),
  ...code([
    '// User schema additions:',
    'loginAttempts: { type: Number, default: 0 },',
    'lockUntil: { type: Date },',
    '// In login route:',
    'if (user.lockUntil && user.lockUntil > Date.now())',
    "  return res.status(423).json({ message: 'Account locked 30 min.' });",
    'user.loginAttempts += 1;',
    'if (user.loginAttempts >= 5) user.lockUntil = new Date(Date.now() + 30*60*1000);',
  ]),
  space(),
  new Paragraph({ children: [new PageBreak()] }),
);

// ── LOW ──
children.push(
  h2('🟢  LOW SEVERITY'), divider(),

  h3('VULN-014: JWT Token Expiry Too Long'), label('CVSS Score','3.9 (Low)', C.low), severityBadge('Low'),
  ...code(["jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' }); // No refresh token"]),
  space(), body('7-day tokens with no revocation mechanism. Stolen tokens remain valid for a week.'),
  body('Remediation: Use 15-minute access tokens + httpOnly refresh tokens. Add Redis token blacklist for logout.'),
  space(), divider(),

  h3('VULN-015: No HTTPS Enforcement'), label('CVSS Score','3.7 (Low)', C.low), severityBadge('Low'),
  body('Server runs plain HTTP. In production, JWT tokens and passwords transmit in plaintext.'),
  body('Remediation: Use Nginx reverse proxy with SSL termination. Enable HSTS via Helmet.'),
  space(), divider(),

  h3('VULN-016: Hardcoded Ethereum Receiver Address'), label('CVSS Score','3.5 (Low)', C.low), severityBadge('Low'),
  ...code(["const RECEIVER = '0x742d35Cc6634C0532925a3b8D4C9B7e5e3F1a2b3'; // Public in source"]),
  space(), body('Wallet address is visible in client-side JS. Requires full redeployment to change.'),
  body('Remediation: Fetch receiver address from authenticated server API endpoint.'),
  space(), divider(),

  h3('VULN-017: No MongoDB Query Sanitization'), label('CVSS Score','3.2 (Low)', C.low), severityBadge('Low'),
  body('User-supplied values passed directly to Mongoose queries. Missing protection against NoSQL injection operators.'),
  h3('Remediation:'),
  ...code(["const mongoSanitize = require('express-mongo-sanitize');", 'app.use(mongoSanitize());']),
  space(), divider(),

  h3('VULN-018: Missing Logging and Monitoring'), label('CVSS Score','2.8 (Low)', C.low), severityBadge('Low'),
  body('No structured logging, no audit trail for auth events, no alerting for suspicious activity.'),
  h3('Remediation:'),
  ...code([
    "const morgan = require('morgan');",
    "const winston = require('winston');",
    "app.use(morgan('combined'));",
    'const secLog = winston.createLogger({ transports: [new winston.transports.File({ filename: \'security.log\' })] });',
    'secLog.warn(`Failed login for ${email} from ${req.ip}`);',
  ]),
  space(),
  new Paragraph({ children: [new PageBreak()] }),
);

// ── SUMMARY TABLE ──
children.push(
  h1('VULNERABILITY SUMMARY TABLE'), divider(),
  makeTable(
    ['ID','Title','Severity','CVSS','Status'],
    [
      ['VULN-001','Hardcoded JWT Secret Fallback','Critical','9.8','Open'],
      ['VULN-002','Unauthenticated Admin Contact Endpoint','Critical','9.1','Open'],
      ['VULN-003','No Rate Limiting / reCAPTCHA Not Server-Verified','High','8.1','Open'],
      ['VULN-004','Unlimited Avatar Storage DoS','High','7.5','Open'],
      ['VULN-005','Wildcard CORS Configuration','High','7.4','Open'],
      ['VULN-006','JWT in localStorage — XSS Theft','High','7.2','Open'],
      ['VULN-007','XSS via Email Template Injection','High','7.0','Open'],
      ['VULN-008','Missing Security Headers','Medium','6.1','Open'],
      ['VULN-009','Weak Password Policy','Medium','5.9','Open'],
      ['VULN-010','Membership Activation Without Payment Verification','Medium','5.8','Open'],
      ['VULN-011','No Request Body Size Limit','Medium','5.5','Open'],
      ['VULN-012','Sensitive Data in Error Messages','Medium','5.3','Open'],
      ['VULN-013','No Account Lockout Mechanism','Medium','5.0','Open'],
      ['VULN-014','JWT Token Expiry Too Long','Low','3.9','Open'],
      ['VULN-015','No HTTPS Enforcement','Low','3.7','Open'],
      ['VULN-016','Hardcoded Ethereum Receiver Address','Low','3.5','Open'],
      ['VULN-017','No MongoDB Query Sanitization','Low','3.2','Open'],
      ['VULN-018','Missing Logging and Monitoring','Low','2.8','Open'],
    ]
  ),
  space(),
  new Paragraph({ children: [new PageBreak()] }),

  // ── POSITIVE FINDINGS ──
  h1('POSITIVE SECURITY FINDINGS'), divider(),
  body('The following controls are correctly implemented and should be maintained:'),
  bullet('Password Hashing — bcryptjs with cost factor 12. Passwords never stored in plaintext.'),
  bullet('JWT Authentication Middleware — Correctly validates tokens on all protected routes.'),
  bullet('Frontend reCAPTCHA — Google reCAPTCHA v2 integrated on login (server-side verification missing).'),
  bullet('Password Confirmation — Signup requires confirmation before account creation.'),
  bullet('Email Enumeration Protection — Generic "Invalid email or password" message on login failure.'),
  bullet('Membership Input Validation — Plan IDs validated against an allowlist.'),
  bullet('Current Password Verification — Password change requires current password.'),
  bullet('Mongoose Schema Validation — Enums and required fields enforce data integrity.'),
  space(),
  new Paragraph({ children: [new PageBreak()] }),

  // ── ROADMAP ──
  h1('REMEDIATION PRIORITY ROADMAP'), divider(),
  h3('Immediate — Before Production Launch', C.critical),
  bullet('VULN-001: Remove JWT secret fallback, enforce environment variable'),
  bullet('VULN-002: Add authentication to the admin contact endpoint'),
  bullet('VULN-003: Add express-rate-limit and server-side reCAPTCHA verification'),
  bullet('VULN-004: Re-add avatar size limit and format validation'),
  bullet('VULN-005: Restrict CORS to known origins'),
  space(),
  h3('Short Term — Within 2 Weeks', C.high),
  bullet('VULN-006: Migrate JWT to httpOnly cookies'),
  bullet('VULN-007: Sanitize all user input in email templates'),
  bullet('VULN-008: Add Helmet.js security headers'),
  bullet('VULN-009: Strengthen password policy to 8+ chars with complexity'),
  bullet('VULN-010: Add server-side blockchain transaction verification'),
  space(),
  h3('Medium Term — Within 1 Month', C.medium),
  bullet('VULN-011 through VULN-013: Body limits, error handling, account lockout'),
  bullet('VULN-014: Implement refresh token rotation with Redis blacklist'),
  bullet('VULN-015: Configure HTTPS and HSTS via Nginx + Helmet'),
  space(),
  h3('Ongoing', C.low),
  bullet('VULN-016 through VULN-018: Hardcoded values, NoSQL sanitization, structured logging'),
  space(),

  // ── PACKAGES ──
  h1('RECOMMENDED ADDITIONAL PACKAGES'), divider(),
  ...code([
    '# Server security packages',
    'npm install helmet express-rate-limit express-mongo-sanitize winston morgan',
    '',
    '# Production infrastructure',
    'npm install redis   # Token blacklisting for logout invalidation',
    'npm install joi     # Request body validation schemas',
  ]),
  space(),

  // ── COMPLIANCE ──
  h1('COMPLIANCE NOTES'), divider(),
  label('GDPR / PIPEDA', 'VULN-002 (unauthenticated contact endpoint) is a direct violation of Canadian PIPEDA and EU GDPR. Must be fixed before handling real user data.', C.critical),
  label('PCI-DSS',       'VULN-010 (no payment verification) violates PCI-DSS requirements for financial transaction systems.', C.high),
  label('OWASP Top 10',  'Vulnerable to: A01 Broken Access Control, A02 Cryptographic Failures, A03 Injection, A05 Security Misconfiguration, A07 Auth Failures, A09 Logging Failures.', C.medium),
  space(),
  divider(),
  new Paragraph({
    children: [new TextRun({ text: 'Report generated through manual code review and static analysis of the DreamTech MERN application codebase. Dynamic testing (penetration testing, fuzzing) was not performed and is recommended as a follow-up engagement.', size: 18, color: C.gray, italics: true, font: 'Calibri' })],
    spacing: { before: 200, after: 200 },
  }),
);

// ── BUILD & SAVE ──────────────────────────────────────────────
const doc = new Document({
  sections: [{ properties: {}, children }],
  styles: {
    default: {
      document: { run: { font: 'Calibri', size: 22, color: C.black } },
    },
  },
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync('DreamTech_Security_Report.docx', buf);
  console.log('✅  Report saved: DreamTech_Security_Report.docx');
});
