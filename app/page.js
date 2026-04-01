'use client';
import { useState, useEffect } from 'react';

// ─── System Definitions ─────────────────────────────────────

const SYSTEMS = [
  { key: 'attract', name: 'Attract', phase: '01', phaseName: 'MARKETING & VISIBILITY' },
  { key: 'convert', name: 'Convert', phase: '02', phaseName: 'SALES & CLOSING' },
  { key: 'deliver', name: 'Deliver', phase: '03', phaseName: 'EXECUTION & FULFILLMENT' },
  { key: 'keep', name: 'Keep', phase: '04', phaseName: 'RETENTION & GROWTH' },
  { key: 'run', name: 'Run', phase: '05', phaseName: 'OPERATIONS & ADMIN' },
];

// ─── 15 Diagnostic Steps ────────────────────────────────────

const STEPS = [
  // ── ATTRACT ──
  {
    systemIdx: 0, lens: 'process', lensLabel: 'PROCESS ANALYSIS',
    question: 'How does your business generate new leads?',
    hint: 'Consider whether lead generation happens by design or by luck.',
    options: [
      { letter: 'A', text: "No defined way to generate leads. You wait for the phone to ring and rely on word of mouth.", level: 'red' },
      { letter: 'B', text: "Some marketing happens but it's inconsistent and untracked. Can't say what's actually working.", level: 'yellow' },
      { letter: 'C', text: "Defined lead gen channels with tracked volume and cost per lead. Consistent cadence that can scale.", level: 'green' },
    ]
  },
  {
    systemIdx: 0, lens: 'tools', lensLabel: 'TOOLS ANALYSIS',
    question: 'What tools support your marketing and online presence?',
    hint: 'Think about your website, search presence, and how you track where leads come from.',
    options: [
      { letter: 'A', text: "No website or a dead brochure site. Not listed where customers search. No CRM.", level: 'red' },
      { letter: 'B', text: "Website and Google profile exist but are outdated. CRM doesn't track lead sources or ROI.", level: 'yellow' },
      { letter: 'C', text: "Website converts visitors to inquiries. CRM tracks every lead source. Automated follow-up in place.", level: 'green' },
    ]
  },
  {
    systemIdx: 0, lens: 'people', lensLabel: 'PEOPLE ANALYSIS',
    question: 'Who owns marketing and lead generation?',
    hint: 'Consider whether someone is accountable for visibility, or if it falls through the cracks.',
    options: [
      { letter: 'A', text: "Nobody. The owner does it \"when there's time\" — which is never. Reviews go unmonitored.", level: 'red' },
      { letter: 'B', text: "Someone handles it part-time but there's no clear ownership. Social media is sporadic.", level: 'yellow' },
      { letter: 'C', text: "Clear marketing owner with defined KPIs. Response time under 1 hour. Review requests are systematic.", level: 'green' },
    ]
  },

  // ── CONVERT ──
  {
    systemIdx: 1, lens: 'process', lensLabel: 'PROCESS ANALYSIS',
    question: 'What happens when a potential customer reaches out?',
    hint: 'Consider how quickly and consistently leads are followed up.',
    options: [
      { letter: 'A', text: "No sales process. Leads get responded to \"when we get around to it.\" No follow-up system.", level: 'red' },
      { letter: 'B', text: "Quotes go out but follow-up is inconsistent. Some leads get callbacks, some don't. No close rate tracking.", level: 'yellow' },
      { letter: 'C', text: "Every lead gets a response within a defined timeframe. Quoting is standardized. Pipeline is visible.", level: 'green' },
    ]
  },
  {
    systemIdx: 1, lens: 'tools', lensLabel: 'TOOLS ANALYSIS',
    question: 'How do you track and manage your sales pipeline?',
    hint: 'Think about how you quote, follow up, and know what\'s outstanding.',
    options: [
      { letter: 'A', text: "Quotes from memory or handwritten. Leads live in texts and voicemail. No way to see what's open.", level: 'red' },
      { letter: 'B', text: "Spreadsheet or email for leads. Quoting exists but isn't standardized. Can't pull pipeline reports.", level: 'yellow' },
      { letter: 'C', text: "CRM tracks every lead to close. Templated quoting with automated reminders. Conversion rate reporting.", level: 'green' },
    ]
  },
  {
    systemIdx: 1, lens: 'people', lensLabel: 'PEOPLE ANALYSIS',
    question: 'Who can sell, quote, and close deals?',
    hint: 'Consider what happens to leads when the owner is unavailable.',
    options: [
      { letter: 'A', text: "Only the owner can quote and close. When they're on site, leads go unanswered.", level: 'red' },
      { letter: 'B', text: "Someone else can quote but isn't trained on objections or closing. No follow-up accountability.", level: 'yellow' },
      { letter: 'C', text: "Multiple people sell and quote. Clear marketing-to-sales handoff. Performance tracked per person.", level: 'green' },
    ]
  },

  // ── DELIVER ──
  {
    systemIdx: 2, lens: 'process', lensLabel: 'PROCESS ANALYSIS',
    question: 'How consistent is your project execution?',
    hint: 'Consider whether every job follows the same standard or each one is run differently.',
    options: [
      { letter: 'A', text: "No SOPs. Every project is run differently. No checklists or quality standards. Scope creep is constant.", level: 'red' },
      { letter: 'B', text: "Some jobs follow a process, others don't. Checklists exist but aren't enforced. Jobs go over budget.", level: 'yellow' },
      { letter: 'C', text: "Every job type has documented SOPs. Quality checklists before sign-off. Scope changes captured in writing.", level: 'green' },
    ]
  },
  {
    systemIdx: 2, lens: 'tools', lensLabel: 'TOOLS ANALYSIS',
    question: 'What tools support project management and client communication?',
    hint: 'Think about scheduling, progress tracking, and how clients get updates.',
    options: [
      { letter: 'A', text: "Scheduling lives in the owner's head. No PM tool. Clients only hear from you when they complain.", level: 'red' },
      { letter: 'B', text: "Basic calendar but not shared with the team. No photo documentation. Clients get start and end updates only.", level: 'yellow' },
      { letter: 'C', text: "PM tool tracks all jobs. Automated client updates at milestones. Photo documentation is standard.", level: 'green' },
    ]
  },
  {
    systemIdx: 2, lens: 'people', lensLabel: 'PEOPLE ANALYSIS',
    question: 'Can your team execute without the owner present?',
    hint: 'Consider decision-making authority, training, and key-person dependencies.',
    options: [
      { letter: 'A', text: "Owner must be on every job. Crew can't make decisions without calling. No training docs. High turnover.", level: 'red' },
      { letter: 'B', text: "Crew handles simple jobs but escalates anything complex. Tribal knowledge only. Key-person dependency.", level: 'yellow' },
      { letter: 'C', text: "Team executes independently. Clear roles and decision authority. Training program exists. Performance measured.", level: 'green' },
    ]
  },

  // ── KEEP ──
  {
    systemIdx: 3, lens: 'process', lensLabel: 'PROCESS ANALYSIS',
    question: 'What happens after you finish a job?',
    hint: 'Consider whether post-job follow-up is systematic or accidental.',
    options: [
      { letter: 'A', text: "Job ends, customer never hears from you. No review request. No referral ask. Repeat business is luck.", level: 'red' },
      { letter: 'B', text: "Sometimes ask for reviews but it's inconsistent. Some repeat customers but no system. No upsell strategy.", level: 'yellow' },
      { letter: 'C', text: "Every job triggers a follow-up sequence: satisfaction check, review request, referral ask. Upsell paths defined.", level: 'green' },
    ]
  },
  {
    systemIdx: 3, lens: 'tools', lensLabel: 'TOOLS ANALYSIS',
    question: 'How do you stay connected with past customers?',
    hint: 'Think about your ability to reach past customers as a group.',
    options: [
      { letter: 'A', text: "No customer database beyond old invoices. No email list. Can't contact past customers as a group.", level: 'red' },
      { letter: 'B', text: "Customer list exists but isn't used. Reviews are unmanaged. No automated review requests or outreach.", level: 'yellow' },
      { letter: 'C', text: "CRM tracks customer history. Automated review requests. Email/text campaigns active. Referral tracking in place.", level: 'green' },
    ]
  },
  {
    systemIdx: 3, lens: 'people', lensLabel: 'PEOPLE ANALYSIS',
    question: 'Who owns customer relationships after delivery?',
    hint: 'Consider whether retention is someone\'s job or nobody\'s.',
    options: [
      { letter: 'A', text: "Nobody. Crew finishes and moves on. Owner means to follow up but never does.", level: 'red' },
      { letter: 'B', text: "Owner handles all relationships personally. If they're unavailable, connections go cold.", level: 'yellow' },
      { letter: 'C', text: "Account management is assigned. Team plants seeds during delivery. Referral program is communicated and active.", level: 'green' },
    ]
  },

  // ── RUN ──
  {
    systemIdx: 4, lens: 'process', lensLabel: 'PROCESS ANALYSIS',
    question: 'How does your back office operate day to day?',
    hint: 'Consider invoicing, collections, scheduling, and how much owner time admin consumes.',
    options: [
      { letter: 'A', text: "No documented processes. Invoices late or missing. Owner does everything in their head. Reactive hiring.", level: 'red' },
      { letter: 'B', text: "Basic systems but all manual. Invoices go out but collections aren't tracked. Scheduling breaks when things change.", level: 'yellow' },
      { letter: 'C', text: "Invoicing automatic on completion. Collections follow escalation path. Owner spends less than 20% on admin.", level: 'green' },
    ]
  },
  {
    systemIdx: 4, lens: 'tools', lensLabel: 'TOOLS ANALYSIS',
    question: 'What software runs your business operations?',
    hint: 'Think about accounting, scheduling, team communication, and whether tools are connected.',
    options: [
      { letter: 'A', text: "No accounting software. Handwritten invoices. No shared calendar. Crew communicates via personal texts.", level: 'red' },
      { letter: 'B', text: "QuickBooks exists but is months behind. Calendar not synced with team. Multiple tools that don't connect.", level: 'yellow' },
      { letter: 'C', text: "Accounting current and reconciled. Shared real-time scheduling. Centralized comms. Payroll systematized.", level: 'green' },
    ]
  },
  {
    systemIdx: 4, lens: 'people', lensLabel: 'PEOPLE ANALYSIS',
    question: 'Who handles admin and operations besides the owner?',
    hint: 'Consider what happens to the business if the owner is out for a week.',
    options: [
      { letter: 'A', text: "Owner is the entire back office. No bookkeeper, no admin. If they're sick, nothing happens.", level: 'red' },
      { letter: 'B', text: "Part-time help or family assists. Owner reviews everything. One person knows how things really work.", level: 'yellow' },
      { letter: 'C', text: "Dedicated admin/ops support. Clear roles. Documented onboarding. Monthly reporting runs without the owner.", level: 'green' },
    ]
  },
];

const TOTAL_STEPS = STEPS.length;

// ─── Scoring Helpers ────────────────────────────────────────

const scoreValue = (level) => level === 'red' ? 1 : level === 'yellow' ? 2 : level === 'green' ? 3 : 0;
const LENSES = ['process', 'tools', 'people'];

function getSystemAvg(answers, sysKey) {
  const vals = LENSES.map(l => scoreValue(answers[`${sysKey}-${l}`])).filter(v => v > 0);
  return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
}

function getSystemLevel(avg) {
  if (avg <= 1.5) return 'red';
  if (avg <= 2.5) return 'yellow';
  return 'green';
}

function getWorstSystem(answers) {
  let worst = null, worstAvg = 4;
  SYSTEMS.forEach(s => {
    const avg = getSystemAvg(answers, s.key);
    if (avg > 0 && avg < worstAvg) { worstAvg = avg; worst = s; }
  });
  return worst;
}

function getBiggestDropoff(answers) {
  const pipeline = SYSTEMS.slice(0, 4);
  let biggestDrop = 0, dropFrom = null, dropTo = null;
  for (let i = 0; i < pipeline.length - 1; i++) {
    const fromAvg = getSystemAvg(answers, pipeline[i].key);
    const toAvg = getSystemAvg(answers, pipeline[i + 1].key);
    if (fromAvg > 0 && toAvg > 0) {
      const drop = fromAvg - toAvg;
      if (drop > biggestDrop) { biggestDrop = drop; dropFrom = pipeline[i]; dropTo = pipeline[i + 1]; }
    }
  }
  return { dropFrom, dropTo, biggestDrop };
}

function generateTextSummary(answers, notes, clientName, businessName) {
  let txt = `AI JUST MET YOU — Business Systems Audit\n`;
  if (businessName) txt += `Business: ${businessName}\n`;
  if (clientName) txt += `Client: ${clientName}\n`;
  txt += `Date: ${new Date().toLocaleDateString()}\n\n--- SCORES ---\n`;
  SYSTEMS.forEach(sys => {
    const avg = getSystemAvg(answers, sys.key);
    const level = getSystemLevel(avg).toUpperCase();
    txt += `\n${sys.name.toUpperCase()} (${level} — ${avg.toFixed(1)})\n`;
    LENSES.forEach(l => {
      const sc = answers[`${sys.key}-${l}`];
      txt += `  ${l.charAt(0).toUpperCase() + l.slice(1)}: ${sc ? sc.toUpperCase() : 'Not scored'}\n`;
    });
    if (notes[sys.key]) txt += `  Notes: ${notes[sys.key]}\n`;
  });
  const worst = getWorstSystem(answers);
  const dropoff = getBiggestDropoff(answers);
  txt += `\n--- FINDINGS ---\n`;
  if (worst) txt += `Weakest system: ${worst.name}\n`;
  if (dropoff.dropFrom && dropoff.biggestDrop > 0) txt += `Biggest drop-off: ${dropoff.dropFrom.name} → ${dropoff.dropTo.name}\n`;
  txt += `\n--- RECOMMENDATION ---\n`;
  if (worst) txt += `Focus on ${worst.name} first. Fix the process, then add AI-powered tools, then address people.\n`;
  return txt;
}

// ─── Colors ─────────────────────────────────────────────────

const C = {
  bg: '#D8E8F1',
  surface: '#E8F0F5',
  surfaceBorder: '#C0D0DA',
  white: '#FFFFFF',
  black: '#0A0A0A',
  blackSoft: '#1A1A1A',
  muted: '#5C6E78',
  mutedLight: '#8A9AA4',
  divider: '#B4C6D0',
  accent: '#DC2626',
  red: '#DC2626',
  yellow: '#D97706',
  green: '#059669',
  redBg: '#FEF2F2',
  yellowBg: '#FFFBEB',
  greenBg: '#ECFDF5',
  redText: '#991B1B',
  yellowText: '#92400E',
  greenText: '#065F46',
};

const LEVEL_DISPLAY = {
  red: { label: 'RED', color: C.red, bg: C.redBg, text: C.redText },
  yellow: { label: 'YELLOW', color: C.yellow, bg: C.yellowBg, text: C.yellowText },
  green: { label: 'GREEN', color: C.green, bg: C.greenBg, text: C.greenText },
};

// ─── Main Component ─────────────────────────────────────────

export default function AuditApp() {
  const [screen, setScreen] = useState('intro');
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [notes, setNotes] = useState({});
  const [clientName, setClientName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  // Load saved progress
  useEffect(() => {
    try {
      const data = localStorage.getItem('aijmy-audit');
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed.answers) setAnswers(parsed.answers);
        if (parsed.notes) setNotes(parsed.notes);
        if (parsed.clientName) setClientName(parsed.clientName);
        if (parsed.businessName) setBusinessName(parsed.businessName);
        if (parsed.currentStep !== undefined) setCurrentStep(parsed.currentStep);
        if (parsed.screen) setScreen(parsed.screen);
      }
    } catch (e) { /* ignore */ }
  }, []);

  const saveProgress = () => {
    try {
      localStorage.setItem('aijmy-audit', JSON.stringify({
        screen, currentStep, answers, notes, clientName, businessName,
      }));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) { /* ignore */ }
  };

  const resetAudit = () => {
    setScreen('intro');
    setCurrentStep(0);
    setAnswers({});
    setNotes({});
    setClientName('');
    setBusinessName('');
    localStorage.removeItem('aijmy-audit');
  };

  const setAnswer = (sysKey, lens, level) => {
    setAnswers(prev => ({ ...prev, [`${sysKey}-${lens}`]: level }));
  };

  const step = STEPS[currentStep];
  const system = step ? SYSTEMS[step.systemIdx] : null;
  const currentAnswer = step ? answers[`${system.key}-${step.lens}`] : null;
  const isLastLensOfSystem = step && step.lens === 'people';
  const answeredCount = Object.keys(answers).length;

  // ─── Header ─────────────────────────────────────────────

  const Header = ({ showSave = true }) => (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 28px', maxWidth: 1100, margin: '0 auto', width: '100%',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          background: C.accent, color: C.white, fontSize: 11, fontWeight: 800,
          padding: '6px 8px', letterSpacing: '0.05em', lineHeight: 1,
        }}>AI</div>
        <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.12em', color: C.black }}>
          JUSTMETYOU
        </span>
      </div>
      {showSave && (
        <button onClick={saveProgress} style={{
          background: 'none', border: 'none', fontSize: 11, fontWeight: 600,
          letterSpacing: '0.12em', color: C.muted, textTransform: 'uppercase',
          padding: '8px 0',
        }}>
          {saved ? 'SAVED ✓' : 'SAVE PROGRESS'}
        </button>
      )}
    </div>
  );

  // ─── INTRO SCREEN ───────────────────────────────────────

  if (screen === 'intro') {
    return (
      <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
        <Header showSave={false} />
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '0 28px 60px',
        }}>
          <div style={{ maxWidth: 480, width: '100%' }}>
            <div style={{ marginBottom: 48 }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24,
              }}>
                <div style={{ width: 40, height: 1, background: C.black }} />
                <span style={{
                  fontSize: 11, fontWeight: 600, letterSpacing: '0.15em',
                  color: C.muted, textTransform: 'uppercase',
                }}>BUSINESS SYSTEMS AUDIT</span>
              </div>
              <h1 style={{
                fontSize: 'clamp(36px, 7vw, 56px)', fontWeight: 900, lineHeight: 0.95,
                letterSpacing: '-0.03em', color: C.black, textTransform: 'uppercase',
                marginBottom: 20,
              }}>
                FIND WHERE<br />AI CAN FIX<br />YOUR BUSINESS.
              </h1>
              <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.6, maxWidth: 360 }}>
                A structured diagnostic across 5 core systems. 15 questions. Takes about 10 minutes.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
              <div>
                <label style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.15em',
                  color: C.mutedLight, textTransform: 'uppercase', display: 'block', marginBottom: 8,
                }}>CLIENT NAME</label>
                <input
                  value={clientName} onChange={e => setClientName(e.target.value)}
                  placeholder="e.g. Vinny Matarazzo"
                  style={{
                    width: '100%', padding: '14px 16px', background: C.surface,
                    border: `1px solid ${C.surfaceBorder}`, fontSize: 15, outline: 'none',
                    color: C.black,
                  }}
                />
              </div>
              <div>
                <label style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.15em',
                  color: C.mutedLight, textTransform: 'uppercase', display: 'block', marginBottom: 8,
                }}>BUSINESS NAME</label>
                <input
                  value={businessName} onChange={e => setBusinessName(e.target.value)}
                  placeholder="e.g. LaTerra Builders"
                  style={{
                    width: '100%', padding: '14px 16px', background: C.surface,
                    border: `1px solid ${C.surfaceBorder}`, fontSize: 15, outline: 'none',
                    color: C.black,
                  }}
                />
              </div>
            </div>

            <button
              onClick={() => setScreen('audit')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 12,
                padding: '16px 36px', background: C.black, color: C.white,
                fontSize: 12, fontWeight: 700, letterSpacing: '0.15em',
                textTransform: 'uppercase', border: 'none',
                transition: 'transform 0.1s',
              }}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              BEGIN AUDIT
              <span style={{ fontSize: 16 }}>→</span>
            </button>
          </div>
        </div>

        <div style={{
          padding: '20px 28px', textAlign: 'right',
          fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', color: C.divider,
        }}>
          SYS.AUDIT.V1
        </div>
      </div>
    );
  }

  // ─── RESULTS SCREEN ─────────────────────────────────────

  if (screen === 'results') {
    const worst = getWorstSystem(answers);
    const dropoff = getBiggestDropoff(answers);
    const runAvg = getSystemAvg(answers, 'run');

    return (
      <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
        <Header />

        <div style={{ flex: 1, maxWidth: 900, margin: '0 auto', width: '100%', padding: '0 28px 80px' }}>
          {/* Breadcrumb */}
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', color: C.mutedLight,
            textTransform: 'uppercase', marginBottom: 32,
          }}>
            AUDIT <span style={{ margin: '0 8px', opacity: 0.4 }}>/</span> RESULTS
          </div>

          {/* Title */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 40, height: 1, background: C.black }} />
              <span style={{
                fontSize: 11, fontWeight: 600, letterSpacing: '0.15em',
                color: C.muted, textTransform: 'uppercase',
              }}>AUDIT COMPLETE</span>
            </div>
            <h1 style={{
              fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 900, lineHeight: 0.95,
              letterSpacing: '-0.03em', color: C.black, textTransform: 'uppercase',
              marginBottom: 12,
            }}>
              {businessName ? `${businessName.toUpperCase()} RESULTS` : 'YOUR RESULTS'}
            </h1>
            {clientName && (
              <p style={{ fontSize: 14, color: C.muted }}>Prepared for {clientName}</p>
            )}
          </div>

          {/* System Overview Grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 12, marginBottom: 40,
          }}>
            {SYSTEMS.map(sys => {
              const avg = getSystemAvg(answers, sys.key);
              const level = getSystemLevel(avg);
              const ld = LEVEL_DISPLAY[level];
              const isWorst = worst?.key === sys.key;
              return (
                <div key={sys.key} style={{
                  padding: '20px 16px', textAlign: 'center',
                  background: isWorst ? C.black : C.surface,
                  border: `1px solid ${isWorst ? C.black : C.surfaceBorder}`,
                }}>
                  <div style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
                    color: isWorst ? C.mutedLight : C.mutedLight, marginBottom: 8,
                    textTransform: 'uppercase',
                  }}>{sys.phase}</div>
                  <div style={{
                    fontSize: 16, fontWeight: 800, color: isWorst ? C.white : C.black,
                    marginBottom: 8, letterSpacing: '-0.02em',
                  }}>{sys.name}</div>
                  <div style={{
                    fontSize: 28, fontWeight: 900, color: isWorst ? ld.color : ld.color,
                    marginBottom: 4,
                  }}>{avg ? avg.toFixed(1) : '—'}</div>
                  <div style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                    color: isWorst ? C.white : ld.color,
                  }}>{ld.label}</div>
                </div>
              );
            })}
          </div>

          {/* Insights */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
            {worst && (
              <div style={{ padding: '20px 24px', background: C.surface, borderLeft: `4px solid ${C.red}` }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: C.mutedLight,
                  textTransform: 'uppercase', marginBottom: 8,
                }}>WEAKEST SYSTEM</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: C.black, marginBottom: 12, letterSpacing: '-0.02em' }}>
                  {worst.name}
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {LENSES.map(l => {
                    const sc = answers[`${worst.key}-${l}`];
                    if (!sc) return null;
                    const ld = LEVEL_DISPLAY[sc];
                    return (
                      <span key={l} style={{
                        fontSize: 11, fontWeight: 700, padding: '4px 12px',
                        background: ld.bg, color: ld.text, letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                      }}>
                        {l}: {ld.label}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {dropoff.dropFrom && dropoff.biggestDrop > 0 && (
              <div style={{ padding: '20px 24px', background: C.surface, borderLeft: `4px solid ${C.yellow}` }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: C.mutedLight,
                  textTransform: 'uppercase', marginBottom: 8,
                }}>BIGGEST PIPELINE DROP-OFF</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: C.black, letterSpacing: '-0.02em' }}>
                  {dropoff.dropFrom.name} → {dropoff.dropTo.name}
                </div>
                <p style={{ fontSize: 13, color: C.muted, marginTop: 8, lineHeight: 1.5 }}>
                  This is where the most revenue is leaking. Fix this transition first.
                </p>
              </div>
            )}

            {runAvg > 0 && runAvg <= 1.5 && (
              <div style={{ padding: '20px 24px', background: C.surface, borderLeft: `4px solid ${C.mutedLight}` }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: C.mutedLight,
                  textTransform: 'uppercase', marginBottom: 8,
                }}>OPERATIONAL DRAG WARNING</div>
                <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>
                  RUN scored Red — the back office is consuming the owner's time and slowing everything above it.
                </p>
              </div>
            )}
          </div>

          {/* Detailed Scores */}
          <div style={{ marginBottom: 40 }}>
            <div style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', color: C.mutedLight,
              textTransform: 'uppercase', marginBottom: 20,
            }}>DETAILED BREAKDOWN</div>
            {SYSTEMS.map(sys => (
              <div key={sys.key} style={{
                marginBottom: 20, padding: '20px 24px', background: C.surface,
                border: `1px solid ${C.surfaceBorder}`,
              }}>
                <div style={{
                  display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 14,
                }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: C.mutedLight,
                  }}>{sys.phase}</span>
                  <span style={{ fontSize: 16, fontWeight: 800, color: C.black, letterSpacing: '-0.02em' }}>
                    {sys.name}
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  {LENSES.map(l => {
                    const sc = answers[`${sys.key}-${l}`];
                    const ld = sc ? LEVEL_DISPLAY[sc] : null;
                    return (
                      <div key={l} style={{
                        padding: '12px', textAlign: 'center',
                        background: ld ? ld.bg : 'rgba(0,0,0,0.03)',
                      }}>
                        <div style={{
                          fontSize: 10, fontWeight: 600, letterSpacing: '0.08em',
                          color: C.mutedLight, textTransform: 'uppercase', marginBottom: 4,
                        }}>{l}</div>
                        <div style={{
                          fontSize: 13, fontWeight: 800,
                          color: ld ? ld.text : C.mutedLight,
                          letterSpacing: '0.05em',
                        }}>{ld ? ld.label : '—'}</div>
                      </div>
                    );
                  })}
                </div>
                {notes[sys.key] && (
                  <div style={{
                    marginTop: 12, padding: '12px', background: 'rgba(0,0,0,0.03)',
                    fontSize: 13, color: C.muted, lineHeight: 1.5, whiteSpace: 'pre-wrap',
                  }}>
                    {notes[sys.key]}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Recommendation */}
          {worst && (
            <div style={{
              padding: '24px', background: C.black, color: C.white, marginBottom: 40,
            }}>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.15em',
                color: C.mutedLight, textTransform: 'uppercase', marginBottom: 12,
              }}>RECOMMENDED NEXT STEP</div>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: '#E0E0E0' }}>
                The biggest opportunity is in <strong style={{ color: C.white }}>{worst.name}</strong>.
                Fix the <strong style={{ color: C.white }}>process</strong> first — get a repeatable system in place.
                Then layer in AI-powered <strong style={{ color: C.white }}>tools</strong> to automate it.
                Address <strong style={{ color: C.white }}>people</strong> last.
              </p>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              onClick={() => { setScreen('audit'); setCurrentStep(0); }}
              style={{
                padding: '14px 28px', background: 'transparent',
                border: `1px solid ${C.surfaceBorder}`, color: C.black,
                fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              EDIT SCORES
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(generateTextSummary(answers, notes, clientName, businessName))
                  .then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); })
                  .catch(() => {});
              }}
              style={{
                padding: '14px 28px', background: C.black, border: 'none',
                color: C.white, fontSize: 11, fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
              }}
            >
              {copied ? 'COPIED ✓' : 'COPY RESULTS'}
            </button>
            <button
              onClick={resetAudit}
              style={{
                padding: '14px 28px', background: 'transparent',
                border: `1px solid ${C.surfaceBorder}`, color: C.muted,
                fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              NEW AUDIT
            </button>
          </div>
        </div>

        <div style={{
          padding: '20px 28px', textAlign: 'right',
          fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', color: C.divider,
        }}>
          SYS.AUDIT.V1
        </div>
      </div>
    );
  }

  // ─── AUDIT SCREEN ───────────────────────────────────────

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <div style={{ flex: 1, maxWidth: 1100, margin: '0 auto', width: '100%', padding: '0 28px' }}>
        {/* Breadcrumb */}
        <div style={{
          fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', color: C.mutedLight,
          textTransform: 'uppercase', marginBottom: 40,
        }}>
          AUDIT
          <span style={{ margin: '0 8px', opacity: 0.4 }}>/</span>
          PHASE {system.phase}
          <span style={{ margin: '0 8px', opacity: 0.4 }}>/</span>
          <span style={{ color: C.muted }}>{system.name.toUpperCase()}</span>
        </div>

        {/* Two-column layout */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '40px 60px', alignItems: 'flex-start',
        }}>
          {/* Left: Question */}
          <div style={{ flex: '1 1 320px', minWidth: 280, maxWidth: 480 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 40, height: 1, background: C.black }} />
              <span style={{
                fontSize: 11, fontWeight: 600, letterSpacing: '0.15em',
                color: C.muted, textTransform: 'uppercase',
              }}>{step.lensLabel}</span>
            </div>

            <h2 style={{
              fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 900, lineHeight: 0.95,
              letterSpacing: '-0.03em', color: C.black, textTransform: 'uppercase',
              marginBottom: 20,
            }}>
              {step.question.replace('?', '').toUpperCase() + '.'}
            </h2>

            <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.6, maxWidth: 380 }}>
              {step.hint}
            </p>
          </div>

          {/* Right: Options */}
          <div style={{ flex: '1 1 340px', minWidth: 300 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {step.options.map((opt) => {
                const selected = currentAnswer === opt.level;
                return (
                  <button
                    key={opt.letter}
                    onClick={() => setAnswer(system.key, step.lens, opt.level)}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: 16,
                      padding: '18px 20px', textAlign: 'left', width: '100%',
                      background: selected ? C.black : C.surface,
                      border: `1px solid ${selected ? C.black : C.surfaceBorder}`,
                      color: selected ? C.white : C.black,
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span style={{
                      fontSize: 13, fontWeight: 700, color: selected ? C.mutedLight : C.mutedLight,
                      flexShrink: 0, marginTop: 1, width: 16,
                    }}>
                      {opt.letter}
                    </span>
                    <span style={{
                      fontSize: 14, fontWeight: selected ? 700 : 500, lineHeight: 1.5,
                      letterSpacing: selected ? '0.02em' : '0',
                    }}>
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Notes (shows on last lens of each system) */}
            {isLastLensOfSystem && (
              <div style={{ marginTop: 20 }}>
                {!showNotes ? (
                  <button
                    onClick={() => setShowNotes(true)}
                    style={{
                      background: 'none', border: 'none', fontSize: 12,
                      fontWeight: 600, color: C.mutedLight, letterSpacing: '0.08em',
                      textTransform: 'uppercase', padding: '8px 0',
                    }}
                  >
                    + ADD NOTES FOR {system.name.toUpperCase()}
                  </button>
                ) : (
                  <div>
                    <label style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
                      color: C.mutedLight, textTransform: 'uppercase', display: 'block',
                      marginBottom: 8,
                    }}>NOTES — {system.name.toUpperCase()}</label>
                    <textarea
                      value={notes[system.key] || ''}
                      onChange={e => setNotes(prev => ({ ...prev, [system.key]: e.target.value }))}
                      placeholder={`Key quotes, observations, specifics about ${system.name.toLowerCase()}...`}
                      rows={3}
                      style={{
                        width: '100%', padding: '14px 16px', background: C.surface,
                        border: `1px solid ${C.surfaceBorder}`, fontSize: 13,
                        resize: 'vertical', outline: 'none', color: C.black, lineHeight: 1.5,
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div style={{
        maxWidth: 1100, margin: '0 auto', width: '100%', padding: '0 28px',
      }}>
        <div style={{
          borderTop: `1px solid ${C.divider}`, marginTop: 48,
          padding: '24px 0 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <button
            onClick={() => {
              if (currentStep > 0) {
                setCurrentStep(currentStep - 1);
                setShowNotes(false);
              } else {
                setScreen('intro');
              }
            }}
            style={{
              background: 'none', border: 'none', fontSize: 11, fontWeight: 700,
              letterSpacing: '0.12em', color: C.muted, textTransform: 'uppercase',
              padding: '8px 0',
            }}
          >
            PREV STEP
          </button>

          <span style={{
            fontSize: 13, fontWeight: 700, color: C.mutedLight, letterSpacing: '0.05em',
          }}>
            {currentStep + 1} / {TOTAL_STEPS}
          </span>

          {currentStep < TOTAL_STEPS - 1 ? (
            <button
              onClick={() => {
                setCurrentStep(currentStep + 1);
                setShowNotes(false);
              }}
              style={{
                padding: '14px 28px', background: C.black, border: 'none',
                color: C.white, fontSize: 11, fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                transition: 'transform 0.1s',
              }}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              NEXT STEP
            </button>
          ) : (
            <button
              onClick={() => setScreen('results')}
              style={{
                padding: '14px 28px',
                background: answeredCount === TOTAL_STEPS ? C.black : C.muted,
                border: 'none', color: C.white, fontSize: 11, fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                transition: 'all 0.15s',
              }}
            >
              {answeredCount === TOTAL_STEPS ? 'SEE RESULTS' : 'SEE RESULTS →'}
            </button>
          )}
        </div>

        <div style={{
          padding: '0 0 20px', textAlign: 'right',
          fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', color: C.divider,
        }}>
          SYS.AUDIT.V1
        </div>
      </div>
    </div>
  );
}
