export default function Home() {
  return (
    <main>
      <div className="grain" />

      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <div className="brandmark" aria-label="AI Just Met You">
              <span>AI</span><i />
              <strong>JMY</strong>
            </div>
            <p className="eyebrow">AI Just Met You</p>
            <h1>
              ALi is the second operator your business has been missing.
            </h1>
            <p className="lead">
              A managed AI employee that learns how you work, watches the moving parts, and keeps follow-up, inbox, admin, and next steps moving without turning into another tool you have to manage.
            </p>
            <div className="hero-actions">
              <a className="primary" href="https://calendly.com/luke72/20min">Book a 20-minute workflow audit</a>
              <a className="secondary" href="/follow-up-operator">Run the follow-up audit</a>
            </div>
          </div>

          <aside className="operator-card" aria-label="ALi operator preview">
            <div className="operator-topline">
              <span>ALi</span>
              <b>Always on</b>
            </div>
            <div className="operator-feed">
              <div>
                <small>Watching</small>
                <p>New leads, stale estimates, unread replies, calendar promises, and open loops.</p>
              </div>
              <div>
                <small>Thinking like the owner</small>
                <p>Prioritizes by money at risk, relationship context, and what normally gets handled first.</p>
              </div>
              <div>
                <small>Preparing the move</small>
                <p>Drafts the text, email, task, or owner brief in the business voice. Nothing sends without approval.</p>
              </div>
            </div>
          </aside>
        </div>
        <div className="scroll-cue">Scroll<span /></div>
      </section>

      <section>
        <div className="wrap split">
          <div>
            <p className="eyebrow">The real problem</p>
            <h2>Your business does not need more software. It needs more of you.</h2>
          </div>
          <div className="copy-stack">
            <p>Owners already know what should happen next. Call this lead back. Chase that quote. Reply to that client. Prep for tomorrow. Update the team.</p>
            <p>The problem is capacity. The whole business still depends on one person remembering, checking, deciding, and nudging the work forward.</p>
            <p>ALi gives the business a second operating layer that understands the way you move and keeps the obvious next step from dying in the gap.</p>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap section-head">
          <p className="eyebrow">What ALi becomes</p>
          <h2>A native extension of how the business already runs.</h2>
          <p className="section-lead">Not a dashboard. Not a prompt pack. Not a chatbot waiting for perfect instructions.</p>
        </div>
        <div className="wrap pillars">
          <article>
            <span>01</span>
            <h3>Learns the operating rhythm</h3>
            <p>How you prioritize, what you approve, what gets escalated, what should never happen without you.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Lives where work happens</h3>
            <p>Email, calendar, CRM, sheets, docs, Slack, notes, browser-based systems, and the messy handoffs between them.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Moves the next step forward</h3>
            <p>Daily money lists, drafted replies, follow-up queues, meeting actions, research, reports, and admin loops.</p>
          </article>
          <article>
            <span>04</span>
            <h3>Improves every week</h3>
            <p>New skills, sharper memory, better rules, fewer edge cases, and more of the business handled without re-explaining.</p>
          </article>
        </div>
      </section>

      <section className="dark-band">
        <div className="wrap split compact">
          <div>
            <p className="eyebrow">First proof</p>
            <h2>We start where dropped follow-up is already costing money.</h2>
          </div>
          <div className="flow">
            <div className="step"><b>1</b><p>ALi reads the lead queue, inbox, estimates, notes, and calendar promises.</p></div>
            <div className="step"><b>2</b><p>It finds the threads most likely to turn into revenue or reputation damage.</p></div>
            <div className="step"><b>3</b><p>It writes the next move in the owner’s voice and explains why it matters.</p></div>
            <div className="step"><b>4</b><p>You approve, edit, or ignore. ALi learns from the decision and gets better.</p></div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap split">
          <div>
            <p className="eyebrow">The offer</p>
            <h2>One managed AI employee. Live on one workflow first.</h2>
          </div>
          <div className="pricing-card">
            <div>
              <span className="tag">Pilot</span>
              <h3>$5K/mo</h3>
              <p>For the first focused workflow where the pain is obvious and the scope is tight.</p>
            </div>
            <div>
              <span className="tag">Standard</span>
              <h3>$10K/mo</h3>
              <p>Managed AI employee, unlimited reasonable usage, 48-hour first-agent live, weekly improvements, monitoring, and support.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="closer">
        <div className="wrap">
          <p className="eyebrow">Next step</p>
          <h2>Bring the messy workflow. We’ll show you what ALi would take off your plate.</h2>
          <p className="lead">No prep. No giant transformation project. One workflow review. You will know in 20 minutes if it is worth building.</p>
          <a className="primary" href="https://calendly.com/luke72/20min">Book a workflow audit</a>
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
