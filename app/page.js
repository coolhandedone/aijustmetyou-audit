export const metadata = {
  title: 'AI Just Met You — Hire your AI employee',
  description: 'A managed AI employee for your business. Live in 48 hours. Unlimited usage. Weekly improvements. $10K/mo.',
};

const whatItDoes = [
  {
    eyebrow: '01',
    title: 'Answers in your voice',
    body: 'Reads your inbox, calendar, CRM, and docs. Drafts replies, schedules, follows up, and runs recurring work. You approve anything customer-facing.'
  },
  {
    eyebrow: '02',
    title: 'Plugs into your tools',
    body: 'Gmail, Slack, Calendly, your CRM, your spreadsheets. No password sharing, no rip-and-replace. We connect what you already use.'
  },
  {
    eyebrow: '03',
    title: 'Gets better every week',
    body: 'You flag what was off. We tune behavior, add skills, expand scope. Every Friday a recap goes out: what shipped, what is next.'
  }
];

const whoFor = [
  'Owner-operators and small teams where the owner is the bottleneck on inbox, follow-up, scheduling, or research.',
  'Real estate teams, marketing agencies, insurance brokerages, law firms, home-services contractors.',
  'Anyone who has paid a VA, an executive assistant, or a consultant and walked away wishing it just got handled.'
];

const pricing = [
  {
    name: 'Managed AI Employee',
    price: '$10,000',
    cadence: '/ month',
    tag: 'The full offer',
    bullets: [
      'One AI employee scoped to a role you pick',
      'First agent live in 48 hours',
      'Unlimited usage. No tokens. No credits.',
      'Weekly improvements based on what your team flags',
      'Connected to your existing tools',
      'Owner approval on anything customer-facing',
      'Direct line to the team that built it',
      'Cancel anytime',
    ],
    cta: 'Hire your AI employee',
    primary: true,
  },
  {
    name: 'Pilot',
    price: '$5,000',
    cadence: '4 weeks',
    tag: 'Decide if it earns the seat',
    bullets: [
      'One scoped workflow we agree on before kickoff',
      'First agent live in 48 hours',
      'Unlimited usage during the pilot',
      'Weekly improvements for all four weeks',
      'Handoff doc at the end: what worked, what to expand, what to kill',
      'Credit applied to month one if you continue at $10K/mo',
    ],
    cta: 'Start a 4-week pilot',
    primary: false,
  }
];

const objections = [
  {
    q: 'Why not just hire someone?',
    a: 'A junior hire is $60-80K/yr loaded, takes 6 weeks to ramp, and asks for direction. The AI employee runs in 48 hours, never forgets context, and works while you sleep. You still hire humans for human work.'
  },
  {
    q: 'Why not ChatGPT or Claude?',
    a: 'Those are tools. This is a managed employee built on top of them — connected to your business, trained on your voice, monitored and improved weekly. You do not pay for tokens, run prompts, or babysit anything.'
  },
  {
    q: 'What if it screws up?',
    a: 'Anything that talks to a customer goes through owner approval until you trust it. Anything internal gets logged. If something breaks, we fix it before you notice.'
  },
  {
    q: 'What about my data?',
    a: 'Connections use OAuth, not password sharing. Your data stays in your accounts. We can scope access per workflow. No training on your data, ever.'
  }
];

export default function HomePage() {
  return (
    <main style={styles.page}>
      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.kicker}>AI Just Met You</div>
        <h1 style={styles.h1}>Hire your AI employee.</h1>
        <p style={styles.lede}>
          A managed AI employee for your business. Live in 48 hours. Unlimited usage. Weekly improvements. $10K a month.
        </p>
        <div style={styles.ctaRow}>
          <a style={styles.primaryCta} href="https://calendly.com/luke72/20min">Book a 20-minute call</a>
          <a style={styles.secondaryCta} href="#pricing">See pricing</a>
        </div>
      </section>

      {/* BAND */}
      <section style={styles.band}>
        <p style={styles.bandText}>
          You do not need more tools. You need someone running the work.
        </p>
      </section>

      {/* WHAT IT DOES */}
      <section style={styles.gridSection}>
        {whatItDoes.map((item) => (
          <article key={item.title} style={styles.card}>
            <div style={styles.eyebrow}>{item.eyebrow}</div>
            <h2 style={styles.cardTitle}>{item.title}</h2>
            <p style={styles.cardBody}>{item.body}</p>
          </article>
        ))}
      </section>

      {/* WHO IT IS FOR */}
      <section style={styles.split}>
        <div>
          <div style={styles.kicker}>Best fit</div>
          <h2 style={styles.h2}>Built for owners drowning in their own inbox.</h2>
        </div>
        <div style={styles.stack}>
          {whoFor.map((item) => (
            <p key={item} style={styles.listItem}>{item}</p>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={styles.pricingSection}>
        <div style={styles.pricingHeader}>
          <div style={styles.kicker}>Pricing</div>
          <h2 style={styles.h2}>One price. One AI employee. Live in 48 hours.</h2>
          <p style={styles.pricingSub}>Unlimited usage. No tokens. No credits. Weekly improvements. Cancel anytime.</p>
        </div>
        <div style={styles.pricingGrid}>
          {pricing.map((tier) => (
            <div key={tier.name} style={tier.primary ? styles.tierPrimary : styles.tierSecondary}>
              <div style={styles.tierTag}>{tier.tag}</div>
              <h3 style={styles.tierName}>{tier.name}</h3>
              <div style={styles.tierPriceRow}>
                <span style={styles.tierPrice}>{tier.price}</span>
                <span style={styles.tierCadence}>{tier.cadence}</span>
              </div>
              <ul style={styles.tierList}>
                {tier.bullets.map((b) => (
                  <li key={b} style={styles.tierBullet}>{b}</li>
                ))}
              </ul>
              <a
                style={tier.primary ? styles.primaryCta : styles.secondaryCta}
                href="https://calendly.com/luke72/20min"
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={styles.faqSection}>
        <div style={styles.kicker}>Common questions</div>
        <div style={styles.faqGrid}>
          {objections.map((item) => (
            <div key={item.q} style={styles.faqItem}>
              <h3 style={styles.faqQ}>{item.q}</h3>
              <p style={styles.faqA}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={styles.finalCta}>
        <h2 style={styles.h2}>48 hours from call to live.</h2>
        <p style={styles.finalSub}>20-minute call. We map one workflow. If it is a fit, your AI employee is running Wednesday.</p>
        <a style={styles.primaryCta} href="https://calendly.com/luke72/20min">Book the call</a>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <span style={styles.footerBrand}>AI Just Met You</span>
          <div style={styles.footerLinks}>
            <a style={styles.footerLink} href="/audit">Free Business Audit</a>
            <a style={styles.footerLink} href="/follow-up-operator">Follow-Up Operator</a>
            <a style={styles.footerLink} href="https://calendly.com/luke72/20min">Book a call</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

const styles = {
  page: {
    background: '#12110E',
    color: '#F6F1E8',
    minHeight: '100vh',
    fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
  },
  hero: {
    maxWidth: 1120,
    margin: '0 auto',
    padding: '120px 24px 80px',
  },
  kicker: {
    color: '#B79A5B',
    textTransform: 'uppercase',
    letterSpacing: '0.16em',
    fontSize: 12,
    fontWeight: 800,
    marginBottom: 18,
  },
  h1: {
    fontSize: 'clamp(52px, 10vw, 128px)',
    lineHeight: 0.9,
    letterSpacing: '-0.07em',
    maxWidth: 1000,
    margin: 0,
  },
  lede: {
    color: '#D8D1C3',
    fontSize: 'clamp(20px, 3vw, 30px)',
    lineHeight: 1.25,
    maxWidth: 820,
    marginTop: 28,
  },
  ctaRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 14,
    marginTop: 36,
  },
  primaryCta: {
    background: '#F6F1E8',
    color: '#12110E',
    textDecoration: 'none',
    borderRadius: 999,
    padding: '15px 24px',
    fontWeight: 800,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryCta: {
    border: '1px solid rgba(246,241,232,0.28)',
    color: '#F6F1E8',
    textDecoration: 'none',
    borderRadius: 999,
    padding: '15px 24px',
    fontWeight: 700,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  band: {
    borderTop: '1px solid rgba(246,241,232,0.14)',
    borderBottom: '1px solid rgba(246,241,232,0.14)',
    padding: '40px 24px',
    background: '#1A1813',
  },
  bandText: {
    maxWidth: 1120,
    margin: '0 auto',
    fontSize: 'clamp(26px, 4.5vw, 52px)',
    lineHeight: 1.02,
    letterSpacing: '-0.04em',
    fontWeight: 800,
  },
  gridSection: {
    maxWidth: 1120,
    margin: '0 auto',
    padding: '80px 24px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 18,
  },
  card: {
    background: '#1D1A14',
    border: '1px solid rgba(246,241,232,0.12)',
    borderRadius: 28,
    padding: 32,
  },
  eyebrow: {
    color: '#B79A5B',
    fontSize: 13,
    fontWeight: 900,
    marginBottom: 28,
  },
  cardTitle: {
    fontSize: 30,
    lineHeight: 1,
    margin: 0,
    letterSpacing: '-0.04em',
  },
  cardBody: {
    color: '#D8D1C3',
    fontSize: 18,
    lineHeight: 1.45,
    marginTop: 18,
  },
  split: {
    maxWidth: 1120,
    margin: '0 auto',
    padding: '64px 24px',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)',
    gap: 42,
  },
  h2: {
    fontSize: 'clamp(36px, 5.5vw, 72px)',
    lineHeight: 0.98,
    letterSpacing: '-0.06em',
    margin: 0,
  },
  stack: {
    display: 'grid',
    gap: 14,
  },
  listItem: {
    margin: 0,
    padding: '20px 0',
    borderTop: '1px solid rgba(246,241,232,0.14)',
    color: '#D8D1C3',
    fontSize: 20,
    lineHeight: 1.35,
  },
  pricingSection: {
    maxWidth: 1120,
    margin: '0 auto',
    padding: '80px 24px',
  },
  pricingHeader: {
    marginBottom: 48,
    maxWidth: 820,
  },
  pricingSub: {
    color: '#D8D1C3',
    fontSize: 20,
    lineHeight: 1.4,
    marginTop: 20,
  },
  pricingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: 20,
  },
  tierPrimary: {
    background: '#1D1A14',
    border: '2px solid #B79A5B',
    borderRadius: 28,
    padding: 36,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  tierSecondary: {
    background: '#181611',
    border: '1px solid rgba(246,241,232,0.12)',
    borderRadius: 28,
    padding: 36,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  tierTag: {
    color: '#B79A5B',
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
  },
  tierName: {
    fontSize: 32,
    margin: 0,
    letterSpacing: '-0.03em',
  },
  tierPriceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 10,
  },
  tierPrice: {
    fontSize: 52,
    fontWeight: 800,
    letterSpacing: '-0.05em',
  },
  tierCadence: {
    color: '#D8D1C3',
    fontSize: 18,
  },
  tierList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'grid',
    gap: 12,
  },
  tierBullet: {
    color: '#E8E0D0',
    fontSize: 16,
    lineHeight: 1.4,
    paddingLeft: 22,
    position: 'relative',
  },
  faqSection: {
    maxWidth: 1120,
    margin: '0 auto',
    padding: '80px 24px',
  },
  faqGrid: {
    marginTop: 32,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
    gap: 20,
  },
  faqItem: {
    background: '#181611',
    border: '1px solid rgba(246,241,232,0.12)',
    borderRadius: 24,
    padding: 28,
  },
  faqQ: {
    margin: 0,
    fontSize: 22,
    letterSpacing: '-0.02em',
  },
  faqA: {
    color: '#D8D1C3',
    fontSize: 17,
    lineHeight: 1.45,
    marginTop: 14,
  },
  finalCta: {
    maxWidth: 1120,
    margin: '0 auto',
    padding: '96px 24px 120px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
  },
  finalSub: {
    color: '#D8D1C3',
    fontSize: 20,
    lineHeight: 1.4,
    maxWidth: 640,
    margin: 0,
  },
  footer: {
    borderTop: '1px solid rgba(246,241,232,0.14)',
    padding: '32px 24px',
  },
  footerInner: {
    maxWidth: 1120,
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  footerBrand: {
    color: '#B79A5B',
    fontWeight: 800,
    letterSpacing: '0.12em',
    fontSize: 13,
    textTransform: 'uppercase',
  },
  footerLinks: {
    display: 'flex',
    gap: 24,
    flexWrap: 'wrap',
  },
  footerLink: {
    color: '#D8D1C3',
    textDecoration: 'none',
    fontSize: 14,
  },
};
