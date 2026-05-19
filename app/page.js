const operatingLoops = [
  ['08:12', 'New estimate idle 6 days', 'Drafted a check-in that references the exact scope and keeps pressure low.'],
  ['08:19', 'Calendar promise detected', 'Added a prep note for tomorrow’s client call and pulled the last thread.'],
  ['08:31', 'Unread buyer reply', 'Flagged as money-risk because the quote is still open and response time matters.'],
];

const principles = [
  {
    label: 'Learns the rhythm',
    text: 'ALi studies how the owner decides: what gets approved, what gets escalated, what should never move without a human.'
  },
  {
    label: 'Lives in the tools',
    text: 'Inbox, calendar, CRM, docs, sheets, Slack, browser apps, notes, and the handoffs between them.'
  },
  {
    label: 'Prepares the move',
    text: 'The next email, call note, daily money list, meeting brief, task, or admin pass is ready before the owner asks.'
  }
];

const proofSteps = [
  'Connect the systems where work already happens.',
  'Watch for open loops, stale money, and owner bottlenecks.',
  'Draft the next move in the company voice with context attached.',
  'Learn from approvals, edits, ignores, and edge cases every week.'
];

export default function Home() {
  return (
    <main>
      <section className="hero-shell">
        <nav className="topbar wrap" aria-label="Primary">
          <a className="wordmark" href="/">AI<span>JMY</span></a>
          <div className="nav-links">
            <a href="/audit">Audit</a>
            <a href="/follow-up-operator">Follow-up operator</a>
            <a className="nav-cta" href="https://calendly.com/luke72/20min">Book a call</a>
          </div>
        </nav>

        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="kicker"><span /> Managed AI employee</p>
            <h1>ALi gives your business a second operating mind.</h1>
            <p className="lede">
              AI Just Met You builds the AI operator that learns how you work, watches the moving parts, and prepares the next move before follow-up, admin, or client context slips.
            </p>
            <p className="service-line">
              We connect to your existing tools, build one live operator workflow, and manage it weekly with approval controls.
            </p>
            <div className="hero-actions">
              <a className="btn primary" href="https://calendly.com/luke72/20min">Book a 20-minute workflow audit</a>
              <a className="btn secondary" href="/follow-up-operator">Preview the follow-up audit</a>
            </div>
          </div>

          <aside className="command-panel" aria-label="ALi live command layer preview">
            <div className="panel-header">
              <div>
                <small>ALi command layer</small>
                <strong>Today’s money queue</strong>
              </div>
              <span className="status-dot">Live</span>
            </div>
            <div className="signal-map">
              <div className="orb one" />
              <div className="orb two" />
              <div className="orb three" />
              <div className="radar-line" />
            </div>
            <div className="feed-list">
              {operatingLoops.map(([time, title, body]) => (
                <div className="feed-item" key={title}>
                  <time>{time}</time>
                  <div>
                    <b>{title}</b>
                    <p>{body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="approval-card">
              <small>Prepared for approval</small>
              <p>“Quick nudge on the estimate — I kept the original scope attached and can adjust timing if your priorities changed.”</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="thesis-section">
        <div className="wrap narrow">
          <p className="kicker"><span /> The shift</p>
          <h2>Your business does not need more software. It needs more of the person who already knows what should happen.</h2>
          <p>
            That person is usually the bottleneck. ALi becomes the parallel layer that sees the same context, remembers the operating rules, and turns scattered work into clear next actions.
          </p>
        </div>
      </section>

      <section className="principles-section">
        <div className="wrap section-intro">
          <p className="kicker"><span /> What ALi becomes</p>
          <h2>A native extension of the founder’s operating system.</h2>
        </div>
        <div className="wrap principle-grid">
          {principles.map((item, index) => (
            <article key={item.label}>
              <span>0{index + 1}</span>
              <h3>{item.label}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="proof-section">
        <div className="wrap proof-grid">
          <div>
            <p className="kicker"><span /> How we start</p>
            <h2>We start where dropped follow-up is already costing money.</h2>
            <p className="body-large">The first workflow is usually simple: stale estimates, missed replies, old leads, and daily owner follow-through.</p>
          </div>
          <div className="timeline">
            {proofSteps.map((step, index) => (
              <div className="timeline-row" key={step}>
                <b>{String(index + 1).padStart(2, '0')}</b>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="offer-section">
        <div className="wrap offer-grid">
          <div className="offer-copy">
            <p className="kicker"><span /> The offer</p>
            <h2>One managed AI employee. One workflow live first.</h2>
            <p>We keep scope tight enough to ship, then expand once the operator proves it can remove real owner load.</p>
          </div>
          <div className="price-stack">
            <article>
              <small>Pilot</small>
              <h3>$5K/mo</h3>
              <p>Focused workflow, obvious pain, tight scope, fast operating proof.</p>
            </article>
            <article className="featured-price">
              <small>Standard</small>
              <h3>$10K/mo</h3>
              <p>Managed AI employee, unlimited reasonable usage, 48-hour first-agent live, weekly improvements, monitoring, and support.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="trust-section">
        <div className="wrap trust-grid">
          <article>
            <span>Approval layer</span>
            <p>ALi drafts and prepares. You approve customer-facing moves until the workflow has earned more autonomy.</p>
          </article>
          <article>
            <span>No rip-and-replace</span>
            <p>The first workflow runs through the tools you already use: email, calendar, CRM, docs, sheets, and notes.</p>
          </article>
          <article>
            <span>Weekly operating loop</span>
            <p>Edits, ignores, edge cases, and new rules become better behavior instead of another meeting about process.</p>
          </article>
        </div>
      </section>

      <section className="final-section">
        <div className="wrap final-card">
          <p className="kicker"><span /> Next step</p>
          <h2>Bring the messy workflow. We’ll show you what ALi would take off your plate.</h2>
          <a className="btn primary" href="https://calendly.com/luke72/20min">Book a workflow audit</a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <span>AI Just Met You</span>
          <nav>
            <a href="/audit">Business audit</a>
            <a href="/follow-up-operator">Follow-up operator</a>
            <a href="https://calendly.com/luke72/20min">Book a call</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
