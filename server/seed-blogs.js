require('dotenv').config();
const mongoose = require('mongoose');
const Blog = require('./models/Blog');

const posts = [
  {
    authorName: 'Gabriel Ohno',
    title: 'Why Every Startup Needs a Blockchain Strategy in 2026',
    content: `Blockchain is no longer just for crypto enthusiasts. In 2026, startups across every industry — from healthcare to logistics — are integrating blockchain to solve real problems: supply chain transparency, tamper-proof records, and decentralized identity.

The key insight is that blockchain isn't about replacing your database. It's about adding a layer of trust that no single party controls. For startups, this means you can build products that users trust by design, not just by reputation.

At DreamTech, we've helped over 20 startups launch blockchain-powered features. The most successful ones started small — a single smart contract for payment escrow, or an NFT-based loyalty program — and scaled from there.

If you're building a product in 2026 and haven't thought about blockchain, you're leaving a competitive advantage on the table.`,
  },
  {
    authorName: 'James Rivera',
    title: 'The Future of Mobile Development: What to Expect in 2026',
    content: `Mobile development has evolved dramatically. In 2026, the lines between native and cross-platform are blurring. React Native and Flutter have matured to the point where 90% of apps can be built once and deployed everywhere.

But the real shift is in AI-powered mobile experiences. Apps that adapt to user behavior, predict what you need before you ask, and run ML models on-device are becoming the standard, not the exception.

At DreamTech, our mobile team has shipped apps with 100K+ downloads. The secret? We treat performance as a feature from day one. Every screen transition, every API call, every image load is optimized before we ship.

The future of mobile is ambient — apps that work in the background, integrate with wearables, and feel invisible until you need them.`,
  },
  {
    authorName: 'Rebeka Galic',
    title: 'How to Hire the Right Tech Team for Your Product',
    content: `Hiring engineers is one of the hardest things a founder does. The wrong hire can set you back months. The right one can 10x your velocity.

Here's what we've learned after helping 50+ companies build their tech teams:

1. Hire for problem-solving, not just skills. Technologies change. Thinking doesn't.
2. Culture fit matters more than you think. A brilliant engineer who can't collaborate will slow everyone down.
3. Test with real work. Give candidates a small paid project that mirrors actual work, not abstract puzzles.
4. Don't skip references. Talk to people who've worked with them, not just the ones they list.

At DreamTech, we've built a team of 50+ engineers across 10 countries. The common thread? Everyone is curious, communicates clearly, and takes ownership.`,
  },
  {
    authorName: 'Marcus Lee',
    title: 'DevOps in 2026: Kubernetes, GitOps, and the Platform Engineering Revolution',
    content: `DevOps has grown up. In 2026, the conversation has shifted from "should we use containers?" to "how do we build an internal developer platform that makes every engineer 10x more productive?"

Platform engineering is the answer. Instead of every team managing their own infrastructure, a dedicated platform team builds golden paths — opinionated, automated workflows that let developers ship without thinking about Kubernetes, networking, or security.

GitOps is the foundation. Every infrastructure change is a pull request. Every deployment is auditable. Rollbacks take seconds.

At DreamTech, our DevOps team has helped companies reduce deployment time from days to minutes. The ROI is immediate and measurable.`,
  },
  {
    authorName: 'Tom Nguyen',
    title: 'Building Secure APIs: Lessons from 100+ Production Systems',
    content: `After reviewing the security of over 100 production APIs, we've seen the same mistakes over and over. Here are the top 5:

1. No rate limiting. Attackers can brute-force your login endpoint in minutes without it.
2. Verbose error messages. Never return stack traces or database errors to clients.
3. Missing input validation. Always validate and sanitize every field, even if your frontend does it too.
4. Weak JWT secrets. A hardcoded secret in your source code is a critical vulnerability.
5. Wildcard CORS. Allowing all origins means any website can make authenticated requests on behalf of your users.

The good news? All of these are fixable in a day. The bad news? Most teams don't fix them until after an incident.

Don't wait for the incident.`,
  },
  {
    authorName: 'David Kim',
    title: 'AI Integration Patterns That Actually Work in Production',
    content: `Everyone wants to add AI to their product. Few know how to do it without creating a maintenance nightmare.

Here are the patterns that work:

**The Wrapper Pattern**: Don't build your own LLM. Wrap GPT-4 or Claude with your business logic. Add caching, rate limiting, and fallbacks.

**The Human-in-the-Loop Pattern**: For high-stakes decisions, always have a human review AI output before it affects users. Trust but verify.

**The Feedback Loop Pattern**: Collect user feedback on AI outputs. Use it to fine-tune prompts and improve accuracy over time.

**The Graceful Degradation Pattern**: When the AI is unavailable or wrong, fall back to a rule-based system. Never let AI failure break your core product.

At DreamTech, we've integrated AI into 30+ products. The ones that succeed treat AI as a feature, not a foundation.`,
  },
  {
    authorName: 'Ryan Patel',
    title: 'Product-Market Fit: How to Know When You Have It',
    content: `Product-market fit is the most important milestone for any startup. But how do you know when you've achieved it?

The classic test: ask your users "How would you feel if you could no longer use this product?" If more than 40% say "very disappointed," you have PMF.

But there are other signals:
- Users are referring others without being asked
- Your churn rate is dropping month over month
- You're getting feature requests, not just bug reports
- Your support team is overwhelmed (in a good way)

The mistake most founders make is optimizing for growth before they have PMF. You can't scale a leaky bucket.

At DreamTech, we help startups build products that users love. The technical execution matters, but it starts with understanding what users actually need.`,
  },
  {
    authorName: 'Gabriel Ohno',
    title: 'Web3 Wallets: A Developer\'s Guide to MetaMask Integration',
    content: `Integrating MetaMask into your web app is easier than you think. Here's a practical guide.

**Step 1: Detect MetaMask**
Check for window.ethereum. If it's not there, prompt users to install MetaMask.

**Step 2: Request Account Access**
Use eth_requestAccounts to get the user's wallet address. This triggers the MetaMask popup.

**Step 3: Sign Messages for Authentication**
Instead of passwords, ask users to sign a message with their private key. Verify the signature on your server. This is the Web3 equivalent of OAuth.

**Step 4: Send Transactions**
Use ethers.js or web3.js to construct and send transactions. Always show users exactly what they're signing before they confirm.

**Security Note**: Never store private keys. Never ask users for their seed phrase. If your app needs either, something is very wrong.`,
  },
  {
    authorName: 'James Rivera',
    title: 'Design Systems: Why Your Team Needs One and How to Build It',
    content: `A design system is a collection of reusable components, guided by clear standards, that can be assembled to build any number of applications.

Without one, every designer and developer makes slightly different decisions. Buttons are different sizes. Colors are slightly off. Spacing is inconsistent. The result is a product that feels fragmented.

With a design system, everyone works from the same source of truth. New features ship faster because components already exist. Redesigns are easier because you change one component, not hundreds of screens.

At DreamTech, we build design systems for every client that plans to scale. The investment pays off within the first month.

Start small: define your color palette, typography scale, and spacing system. Then build your most-used components. The rest follows naturally.`,
  },
  {
    authorName: 'Rebeka Galic',
    title: 'Remote Team Management: What Works and What Doesn\'t',
    content: `DreamTech has been fully remote since 2018. Here's what we've learned about managing distributed teams across 10+ time zones.

**What works:**
- Async-first communication. Not everything needs a meeting.
- Clear written documentation. If it's not written down, it doesn't exist.
- Regular 1:1s. Relationships matter even when you're remote.
- Overlap hours. Find 2-3 hours where everyone is online simultaneously.

**What doesn't work:**
- Micromanagement. Trust your team or don't hire them.
- Meeting-heavy culture. Meetings are expensive when you're paying for everyone's time.
- Ignoring time zones. Rotating meeting times shows respect.

The biggest mistake remote companies make is trying to replicate an office online. Remote work is different, not worse. Embrace the difference.`,
  },
  {
    authorName: 'Marcus Lee',
    title: 'Cloud Cost Optimization: How We Cut AWS Bills by 60%',
    content: `Cloud costs can spiral out of control fast. Here's how we helped a client cut their AWS bill from $45,000/month to $18,000/month in 90 days.

**Step 1: Audit everything.** Use AWS Cost Explorer to find the top 10 cost drivers. You'll be surprised what you find.

**Step 2: Right-size instances.** Most teams over-provision. Use CloudWatch metrics to find instances running at 10% CPU and downsize them.

**Step 3: Use Reserved Instances.** If you know you'll need a resource for 12+ months, commit to it. Savings of 40-60% are common.

**Step 4: Delete unused resources.** Old snapshots, unattached EBS volumes, and forgotten load balancers add up.

**Step 5: Implement auto-scaling.** Don't pay for peak capacity 24/7. Scale up when you need it, scale down when you don't.

The result: $27,000/month in savings, reinvested into product development.`,
  },
  {
    authorName: 'Tom Nguyen',
    title: 'Full-Stack JavaScript in 2026: The State of the Ecosystem',
    content: `JavaScript has won. In 2026, you can build anything with JS — web apps, mobile apps, desktop apps, serverless functions, even embedded systems.

The ecosystem has matured significantly:

**Frontend**: React remains dominant, but Next.js has become the default for production apps. Server components are changing how we think about data fetching.

**Backend**: Node.js with Express is still the workhorse, but Bun is gaining traction for its speed. Hono is the new Express for edge computing.

**Database**: MongoDB for flexibility, PostgreSQL for reliability. Prisma has made type-safe database access the standard.

**Deployment**: Vercel for frontend, Railway or Render for backend. Kubernetes for when you need serious scale.

The full-stack JS developer in 2026 is more powerful than ever. The tools are better, the ecosystem is more mature, and the community is larger than ever.`,
  },
  {
    authorName: 'David Kim',
    title: 'Cybersecurity for Startups: The Minimum Viable Security Stack',
    content: `Most startups think security is something you add later. By then, it's too late.

Here's the minimum viable security stack every startup should have from day one:

**Authentication**: Use a proven provider like Auth0 or implement JWT correctly. Never roll your own crypto.

**HTTPS everywhere**: Free with Let's Encrypt. No excuse not to have it.

**Input validation**: Validate everything on the server. Never trust the client.

**Rate limiting**: Protect your APIs from brute force and DDoS.

**Dependency scanning**: Use Dependabot or Snyk to catch vulnerable packages automatically.

**Secrets management**: Never commit secrets to git. Use environment variables and a secrets manager.

**Backups**: Automated, tested, and stored separately from your production environment.

This stack costs almost nothing to implement and protects you from 90% of common attacks.`,
  },
  {
    authorName: 'Ryan Patel',
    title: 'How to Write a Technical Specification That Engineers Will Actually Read',
    content: `Most technical specs are either too vague to be useful or so detailed that no one reads them. Here's how to write one that hits the sweet spot.

**The one-page rule**: If your spec is longer than one page, it's too long. Force yourself to be concise.

**Start with the problem, not the solution**: Engineers are good at finding solutions. Make sure they understand the problem first.

**Include success criteria**: How will you know when this feature is done? Define it upfront.

**List assumptions and open questions**: What are you assuming to be true? What decisions still need to be made?

**Include a simple diagram**: A picture is worth a thousand words. Even a rough sketch helps.

**Get feedback before you build**: Share the spec with the team before writing a single line of code. Catch misunderstandings early.

The best specs I've seen are written by product managers who used to be engineers. They know what information developers actually need.`,
  },
  {
    authorName: 'Gabriel Ohno',
    title: 'DreamTech\'s Vision for 2027: Building the Future of Enterprise Software',
    content: `As we look ahead to 2027, DreamTech is doubling down on three areas that we believe will define the next generation of enterprise software.

**AI-Native Applications**: Not apps with AI features bolted on, but applications designed from the ground up around AI capabilities. Every workflow, every interface, every data model optimized for human-AI collaboration.

**Blockchain-Verified Trust**: As digital content becomes harder to trust, blockchain provides a foundation for verified identity, provenance, and authenticity. We're building infrastructure for a world where trust is cryptographic, not institutional.

**Edge-First Architecture**: As 5G and edge computing mature, the next generation of applications will process data closer to users, enabling real-time experiences that cloud-only architectures can't match.

Our mission remains the same: help businesses build products that matter. The technology changes. The mission doesn't.

We're hiring across all disciplines. If you want to build the future of enterprise software, we'd love to talk.`,
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/dreamtech');
  console.log('Connected to MongoDB');

  // Only add posts that don't already exist (check by title)
  let added = 0;
  for (const post of posts) {
    const exists = await Blog.findOne({ title: post.title });
    if (!exists) {
      await Blog.create(post);
      added++;
      console.log(`✅ Added: ${post.title}`);
    } else {
      console.log(`⏭️  Skipped (exists): ${post.title}`);
    }
  }

  console.log(`\nDone. Added ${added} new posts.`);
  await mongoose.disconnect();
}

seed().catch(err => { console.error(err); process.exit(1); });
