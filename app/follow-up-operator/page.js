const sections = [
  {
    eyebrow: '01',
    title: 'What it watches',
    body: 'Missed calls, form fills, stale estimates, unsent review asks, old customers, and any inbox or spreadsheet where revenue can sit untouched.'
  },
  {
    eyebrow: '02',
    title: 'What it returns',
    body: 'A daily money list: the leads most likely to turn into booked work today, why they matter, and the exact follow-up draft to approve.'
  },
  {
    eyebrow: '03',
    title: 'What sends',
    body: 'Nothing sends automatically during the pilot. The owner approves, edits, or ignores every message before it goes out.'
  }
];

const proof = [
  'Leads contacted within 5 minutes are reported as 21x more likely to qualify than leads contacted after 30 minutes.',
  'Home-service leads often come in after hours, when small teams are least likely to respond cleanly.',
  'The fastest revenue lift is usually not more ad spend. It is better follow-up on the leads already paid for.'
];

const deliverables = [
  'Lead source map: where inquiries, calls, forms, estimates, and old customers live today.',
  'Daily Money List: highest-value opportunities ranked by urgency and likely revenue.',
  'Owner-approved SMS/email follow-up drafts written in the company voice.',
  'Weekly improvement loop based on replies, bookings, ignored drafts, and owner feedback.',
  'Simple operating manual so the workflow keeps running after installation.'
];

const who = [
  'HVAC, plumbing, roofing, electrical, remodeling, landscaping, pest control, garage door, paving, fencing, septic.',
  '$500K-$5M owner-operated business with enough lead flow that missed follow-up costs real money.',
  'Owner, office manager, or dispatcher is still manually chasing leads, estimates, callbacks, and review requests.'
];

export default function FollowUpOperatorPage() {
  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.kicker}>AI Just Met You</div>
        <h1 style={styles.h1}>Stop wasting the home-service leads you already paid for.</h1>
        <p style={styles.lede}>
          We install an AI Follow-Up Operator for owner-operated contractors. It finds stale leads and open estimates, drafts the next touch, and gives the owner a daily money list.
        </p>
        <div style={styles.ctaRow}>
          <a style={styles.primaryCta} href="https://calendly.com/luke72/20min">Book a 20-minute follow-up teardown</a>
          <a style={styles.secondaryCta} href="#pilot">See the pilot</a>
        </div>
      </section>

      <section style={styles.band}>
        <p style={styles.bandText}>
          Most contractors do not need more leads. They need to stop losing jobs between the missed call, the sent estimate, and the follow-up nobody owned.
        </p>
      </section>

      <section style={styles.gridSection}>
        {sections.map((item) => (
          <article key={item.title} style={styles.card}>
            <div style={styles.eyebrow}>{item.eyebrow}</div>
            <h2 style={styles.cardTitle}>{item.title}</h2>
            <p style={styles.cardBody}>{item.body}</p>
          </article>
        ))}
      </section>

      <section style={styles.split}>
        <div>
          <div style={styles.kicker}>Why this is the first offer</div>
          <h2 style={styles.h2}>The money is already in the pipeline.</h2>
        </div>
        <div style={styles.stack}>
          {proof.map((item) => (
            <p key={item} style={styles.listItem}>{item}</p>
          ))}
        </div>
      </section>

      <section id="pilot" style={styles.pilot}>
        <div>
          <div style={styles.kicker}>14-30 day pilot</div>
          <h2 style={styles.h2}>What gets installed</h2>
        </div>
        <div style={styles.stack}>
          {deliverables.map((item) => (
            <p key={item} style={styles.checkItem}>{item}</p>
          ))}
        </div>
      </section>

      <section style={styles.split}>
        <div>
          <div style={styles.kicker}>Best fit</div>
          <h2 style={styles.h2}>Built for owner-operated home-service businesses.</h2>
        </div>
        <div style={styles.stack}>
          {who.map((item) => (
            <p key={item} style={styles.listItem}>{item}</p>
          ))}
        </div>
      </section>

      <section style={styles.priceBox}>
        <div>
          <div style={styles.kicker}>Pilot pricing</div>
          <h2 style={styles.price}>$2.5K-$5K</h2>
          <p style={styles.priceText}>14-30 days. Owner approval before every send. Success metric: more followed-up estimates, faster response, and booked revenue from stale opportunities.</p>
        </div>
        <a style={styles.primaryCta} href="https://calendly.com/luke72/20min">Book the teardown</a>
      </section>
    </main>
  );
}

const styles = {
  page: {
    background: '#12110E',
    color: '#F6F1E8',
    minHeight: '100vh',
    fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
  },
  hero: {
    maxWidth: 1120,
    margin: '0 auto',
    padding: '96px 24px 72px'
  },
  kicker: {
    color: '#B79A5B',
    textTransform: 'uppercase',
    letterSpacing: '0.16em',
    fontSize: 12,
    fontWeight: 800,
    marginBottom: 18
  },
  h1: {
    fontSize: 'clamp(46px, 8vw, 96px)',
    lineHeight: 0.92,
    letterSpacing: '-0.07em',
    maxWidth: 980,
    margin: 0
  },
  lede: {
    color: '#D8D1C3',
    fontSize: 'clamp(20px, 3vw, 30px)',
    lineHeight: 1.25,
    maxWidth: 820,
    marginTop: 28
  },
  ctaRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 14,
    marginTop: 36
  },
  primaryCta: {
    background: '#F6F1E8',
    color: '#12110E',
    textDecoration: 'none',
    borderRadius: 999,
    padding: '15px 22px',
    fontWeight: 800,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  secondaryCta: {
    border: '1px solid rgba(246,241,232,0.28)',
    color: '#F6F1E8',
    textDecoration: 'none',
    borderRadius: 999,
    padding: '15px 22px',
    fontWeight: 700
  },
  band: {
    borderTop: '1px solid rgba(246,241,232,0.14)',
    borderBottom: '1px solid rgba(246,241,232,0.14)',
    padding: '34px 24px',
    background: '#1A1813'
  },
  bandText: {
    maxWidth: 1120,
    margin: '0 auto',
    fontSize: 'clamp(24px, 4vw, 44px)',
    lineHeight: 1.02,
    letterSpacing: '-0.04em',
    fontWeight: 800
  },
  gridSection: {
    maxWidth: 1120,
    margin: '0 auto',
    padding: '72px 24px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: 18
  },
  card: {
    background: '#1D1A14',
    border: '1px solid rgba(246,241,232,0.12)',
    borderRadius: 28,
    padding: 28
  },
  eyebrow: {
    color: '#B79A5B',
    fontSize: 13,
    fontWeight: 900,
    marginBottom: 28
  },
  cardTitle: {
    fontSize: 28,
    lineHeight: 1,
    margin: 0,
    letterSpacing: '-0.04em'
  },
  cardBody: {
    color: '#D8D1C3',
    fontSize: 18,
    lineHeight: 1.45,
    marginTop: 18
  },
  split: {
    maxWidth: 1120,
    margin: '0 auto',
    padding: '56px 24px',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)',
    gap: 42
  },
  h2: {
    fontSize: 'clamp(34px, 5vw, 62px)',
    lineHeight: 0.98,
    letterSpacing: '-0.06em',
    margin: 0
  },
  stack: {
    display: 'grid',
    gap: 14
  },
  listItem: {
    margin: 0,
    padding: '20px 0',
    borderTop: '1px solid rgba(246,241,232,0.14)',
    color: '#D8D1C3',
    fontSize: 20,
    lineHeight: 1.35
  },
  pilot: {
    maxWidth: 1120,
    margin: '0 auto',
    padding: '56px 24px',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 0.8fr) minmax(0, 1.2fr)',
    gap: 42,
    background: '#181611',
    borderRadius: 32
  },
  checkItem: {
    margin: 0,
    padding: '18px 20px',
    background: '#211E17',
    border: '1px solid rgba(246,241,232,0.1)',
    borderRadius: 18,
    color: '#E8E0D0',
    fontSize: 18,
    lineHeight: 1.35
  },
  priceBox: {
    maxWidth: 1120,
    margin: '0 auto',
    padding: '72px 24px 96px',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 32,
    flexWrap: 'wrap'
  },
  price: {
    fontSize: 'clamp(58px, 8vw, 104px)',
    lineHeight: 0.9,
    letterSpacing: '-0.07em',
    margin: 0
  },
  priceText: {
    color: '#D8D1C3',
    maxWidth: 640,
    fontSize: 20,
    lineHeight: 1.35,
    marginTop: 18
  }
};
