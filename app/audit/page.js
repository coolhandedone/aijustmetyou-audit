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

const INDUSTRIES = [
  'Construction / Trades', 'Professional Services', 'Real Estate', 'Healthcare / Medical',
  'Retail / E-commerce', 'Food & Hospitality', 'Technology / SaaS', 'Home Services',
  'Creative / Agency', 'Manufacturing', 'Other',
];

const TEAM_SIZES = ['Just me', '2–5', '6–15', '16–50', '50+'];

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

// Look up the answer text for a given system + lens
function getAnswerText(answers, sysKey, lens) {
  const level = answers[`${sysKey}-${lens}`];
  if (!level) return null;
  const step = STEPS.find(s => SYSTEMS[s.systemIdx].key === sysKey && s.lens === lens);
  if (!step) return null;
  const option = step.options.find(o => o.level === level);
  return option ? option.text : null;
}

// Look up the GREEN (ideal) answer for a system + lens
function getGreenText(sysKey, lens) {
  const step = STEPS.find(s => SYSTEMS[s.systemIdx].key === sysKey && s.lens === lens);
  if (!step) return null;
  const option = step.options.find(o => o.level === 'green');
  return option ? option.text : null;
}

// Build personalized recommendation
function getRecommendation(worst, answers, industry, teamSize, mainService) {
  if (!worst) return '';
  const avg = getSystemAvg(answers, worst.key);
  const worstLens = LENSES.reduce((a, b) =>
    scoreValue(answers[`${worst.key}-${a}`] || 'green') < scoreValue(answers[`${worst.key}-${b}`] || 'green') ? a : b
  );
  const bizDesc = mainService
    ? `a ${industry || 'business'} focused on ${mainService}`
    : `a ${industry || 'business'} of your size`;
  const sizeContext = teamSize === 'Just me'
    ? "As a solo operator, you're likely the bottleneck in every system."
    : teamSize === '2–5'
    ? "With a small team, the owner is probably still involved in everything."
    : teamSize === '6–15'
    ? "At your team size, systems need to work without the owner in the room."
    : teamSize === '16–50'
    ? "With a team this size, undocumented processes create compounding inefficiency."
    : "At scale, every broken system multiplies across the organization.";

  let rec = `For ${bizDesc}, the highest-impact area to fix is ${worst.name}. `;
  rec += sizeContext + ' ';

  if (worstLens === 'process') {
    rec += `Start by documenting a repeatable process for ${worst.name.toLowerCase()}. You can't automate or delegate what isn't defined. Once the process is clear, layer in tools to speed it up, then assign ownership.`;
  } else if (worstLens === 'tools') {
    rec += `Your ${worst.name.toLowerCase()} process exists but isn't supported by the right technology. Identify one tool that eliminates the biggest manual bottleneck, implement it, and build the habit before adding more.`;
  } else {
    rec += `The ${worst.name.toLowerCase()} system lacks clear ownership. Assign one person to own it, give them a simple metric to hit, and review it weekly. Tools and process improvements won't stick without accountability.`;
  }

  return rec;
}

function generateTextSummary(answers, notes, clientName, businessName, industry, teamSize, mainService) {
  let txt = `AI JUST MET YOU — Business Systems Audit\n`;
  if (businessName) txt += `Business: ${businessName}\n`;
  if (clientName) txt += `Client: ${clientName}\n`;
  if (industry) txt += `Industry: ${industry}\n`;
  if (teamSize) txt += `Team size: ${teamSize}\n`;
  if (mainService) txt += `Primary service: ${mainService}\n`;
  txt += `Date: ${new Date().toLocaleDateString()}\n\n--- SCORES ---\n`;
  SYSTEMS.forEach(sys => {
    const avg = getSystemAvg(answers, sys.key);
    const level = getSystemLevel(avg).toUpperCase();
    txt += `\n${sys.name.toUpperCase()} (${level} — ${avg.toFixed(1)})\n`;
    LENSES.forEach(l => {
      const answerText = getAnswerText(answers, sys.key, l);
      txt += `  ${l.charAt(0).toUpperCase() + l.slice(1)}: ${answerText || 'Not scored'}\n`;
    });
    if (notes[sys.key]) txt += `  Notes: ${notes[sys.key]}\n`;
  });
  const worst = getWorstSystem(answers);
  const dropoff = getBiggestDropoff(answers);
  txt += `\n--- FINDINGS ---\n`;
  if (worst) txt += `Weakest system: ${worst.name}\n`;
  if (dropoff.dropFrom && dropoff.biggestDrop > 0) txt += `Biggest drop-off: ${dropoff.dropFrom.name} → ${dropoff.dropTo.name}\n`;
  txt += `\n--- RECOMMENDATION ---\n`;
  if (worst) txt += getRecommendation(worst, answers, industry, teamSize, mainService) + '\n';
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
  red: { label: 'Needs attention', color: C.red, bg: C.redBg, text: C.redText },
  yellow: { label: 'Has gaps', color: C.yellow, bg: C.yellowBg, text: C.yellowText },
  green: { label: 'Working well', color: C.green, bg: C.greenBg, text: C.greenText },
};

// ─── Main Component ─────────────────────────────────────────

export default function AuditApp() {
  const [screen, setScreen] = useState('intro');
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [notes, setNotes] = useState({});
  const [clientName, setClientName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [mainService, setMainService] = useState('');
  const [biggestFrustration, setBiggestFrustration] = useState('');
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
        if (parsed.industry) setIndustry(parsed.industry);
        if (parsed.teamSize) setTeamSize(parsed.teamSize);
        if (parsed.mainService) setMainService(parsed.mainService);
        if (parsed.biggestFrustration) setBiggestFrustration(parsed.biggestFrustration);
        if (parsed.currentStep !== undefined) setCurrentStep(parsed.currentStep);
        if (parsed.screen) setScreen(parsed.screen);
      }
    } catch (e) { /* ignore */ }
  }, []);

  const saveProgress = () => {
    try {
      localStorage.setItem('aijmy-audit', JSON.stringify({
        screen, currentStep, answers, notes, clientName, businessName,
        industry, teamSize, mainService, biggestFrustration,
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
    setIndustry('');
    setTeamSize('');
    setMainService('');
    setBiggestFrustration('');
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

  // Shared input style
  const inputStyle = {
    width: '100%', padding: '14px 16px', background: C.surface,
    border: `1px solid ${C.surfaceBorder}`, fontSize: 15, outline: 'none',
    color: C.black, appearance: 'none', WebkitAppearance: 'none',
  };

  const selectStyle = {
    ...inputStyle, cursor: 'pointer',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%238A9AA4' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center',
  };

  const labelStyle = {
    fontSize: 10, fontWeight: 700, letterSpacing: '0.15em',
    color: C.mutedLight, textTransform: 'uppercase', display: 'block', marginBottom: 8,
  };

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
            <div style={{ marginBottom: 40 }}>
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
              {/* Row: Name + Business */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={labelStyle}>YOUR NAME</label>
                  <input value={clientName} onChange={e => setClientName(e.target.value)}
                    placeholder="First and last name" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>BUSINESS NAME</label>
                  <input value={businessName} onChange={e => setBusinessName(e.target.value)}
                    placeholder="Your company name" style={inputStyle} />
                </div>
              </div>

              {/* Row: Industry + Team Size */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={labelStyle}>INDUSTRY</label>
                  <select value={industry} onChange={e => setIndustry(e.target.value)} style={selectStyle}>
                    <option value="">Select industry</option>
                    {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>TEAM SIZE</label>
                  <select value={teamSize} onChange={e => setTeamSize(e.target.value)} style={selectStyle}>
                    <option value="">Select size</option>
                    {TEAM_SIZES.map(s => <option key={s} value={s}>{s} people</option>)}
                  </select>
                </div>
              </div>

              {/* Main Service */}
              <div>
                <label style={labelStyle}>WHAT DO YOU SELL OR DELIVER?</label>
                <input value={mainService} onChange={e => setMainService(e.target.value)}
                  placeholder="e.g. Kitchen renovations, tax prep, web design"
                  style={inputStyle} />
              </div>

              {/* Biggest Frustration */}
              <div>
                <label style={labelStyle}>BIGGEST FRUSTRATION RIGHT NOW</label>
                <input value={biggestFrustration} onChange={e => setBiggestFrustration(e.target.value)}
                  placeholder="e.g. I spend all my time on admin instead of growth"
                  style={inputStyle} />
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
    const recommendation = getRecommendation(worst, answers, industry, teamSize, mainService);

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
            <p style={{ fontSize: 14, color: C.muted }}>
              {[clientName, industry, teamSize ? `${teamSize} people` : ''].filter(Boolean).join(' · ')}
            </p>
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
                    color: C.mutedLight, marginBottom: 8, textTransform: 'uppercase',
                  }}>{sys.phase}</div>
                  <div style={{
                    fontSize: 16, fontWeight: 800, color: isWorst ? C.white : C.black,
                    marginBottom: 8, letterSpacing: '-0.02em',
                  }}>{sys.name}</div>
                  <div style={{
                    fontSize: 28, fontWeight: 900, color: ld.color,
                    marginBottom: 4,
                  }}>{avg ? avg.toFixed(1) : '—'}</div>
                  <div style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                    color: isWorst ? C.mutedLight : ld.color,
                  }}>{ld.label.toUpperCase()}</div>
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
                  {worst.name} — {worst.phaseName.toLowerCase()}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {LENSES.map(l => {
                    const sc = answers[`${worst.key}-${l}`];
                    const text = getAnswerText(answers, worst.key, l);
                    if (!sc || !text) return null;
                    const ld = LEVEL_DISPLAY[sc];
                    return (
                      <div key={l} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <div style={{
                          width: 8, height: 8, borderRadius: '50%', background: ld.color,
                          marginTop: 5, flexShrink: 0,
                        }} />
                        <div>
                          <span style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {l}:
                          </span>
                          <span style={{ fontSize: 13, color: C.black, marginLeft: 6 }}>{text}</span>
                        </div>
                      </div>
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
                  {mainService
                    ? `Your ${mainService.toLowerCase()} business is generating interest but losing it between ${dropoff.dropFrom.name.toLowerCase()} and ${dropoff.dropTo.name.toLowerCase()}. This is where revenue is leaking.`
                    : `This is where the most revenue is leaking. Fix this transition first.`
                  }
                </p>
              </div>
            )}

            {biggestFrustration && (
              <div style={{ padding: '20px 24px', background: C.surface, borderLeft: `4px solid ${C.muted}` }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: C.mutedLight,
                  textTransform: 'uppercase', marginBottom: 8,
                }}>YOU TOLD US YOUR BIGGEST FRUSTRATION</div>
                <div style={{ fontSize: 15, color: C.black, fontStyle: 'italic', lineHeight: 1.5 }}>
                  &ldquo;{biggestFrustration}&rdquo;
                </div>
                {worst && (
                  <p style={{ fontSize: 13, color: C.muted, marginTop: 8, lineHeight: 1.5 }}>
                    Based on your scores, this likely traces back to gaps in your {worst.name.toLowerCase()} system. The fix starts there.
                  </p>
                )}
              </div>
            )}

            {runAvg > 0 && runAvg <= 1.5 && (
              <div style={{ padding: '20px 24px', background: C.surface, borderLeft: `4px solid ${C.mutedLight}` }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: C.mutedLight,
                  textTransform: 'uppercase', marginBottom: 8,
                }}>OPERATIONAL DRAG WARNING</div>
                <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>
                  {teamSize === 'Just me'
                    ? "Your back office is consuming your time. As a solo operator, every hour spent on admin is an hour not spent on revenue."
                    : "Your back office is consuming the owner's time and slowing everything above it. Until operations runs without constant intervention, growth will stall."
                  }
                </p>
              </div>
            )}
          </div>

          {/* Detailed Breakdown — shows actual answer descriptions */}
          <div style={{ marginBottom: 40 }}>
            <div style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', color: C.mutedLight,
              textTransform: 'uppercase', marginBottom: 20,
            }}>DETAILED BREAKDOWN</div>
            {SYSTEMS.map(sys => {
              const avg = getSystemAvg(answers, sys.key);
              const level = getSystemLevel(avg);
              const ld = LEVEL_DISPLAY[level];
              return (
                <div key={sys.key} style={{
                  marginBottom: 16, background: C.surface,
                  border: `1px solid ${C.surfaceBorder}`,
                }}>
                  {/* System header */}
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '16px 24px', borderBottom: `1px solid ${C.surfaceBorder}`,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: C.mutedLight }}>
                        {sys.phase}
                      </span>
                      <span style={{ fontSize: 16, fontWeight: 800, color: C.black, letterSpacing: '-0.02em' }}>
                        {sys.name}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: ld.color }} />
                      <span style={{ fontSize: 12, fontWeight: 700, color: ld.color }}>
                        {avg.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  {/* Lens details */}
                  <div style={{ padding: '16px 24px' }}>
                    {LENSES.map((l, i) => {
                      const sc = answers[`${sys.key}-${l}`];
                      const text = getAnswerText(answers, sys.key, l);
                      const lensLd = sc ? LEVEL_DISPLAY[sc] : null;
                      return (
                        <div key={l} style={{
                          display: 'flex', alignItems: 'flex-start', gap: 12,
                          padding: '10px 0',
                          borderTop: i > 0 ? `1px solid rgba(0,0,0,0.06)` : 'none',
                        }}>
                          <div style={{
                            width: 8, height: 8, borderRadius: '50%', marginTop: 5, flexShrink: 0,
                            background: lensLd ? lensLd.color : C.divider,
                          }} />
                          <div>
                            <div style={{
                              fontSize: 10, fontWeight: 700, color: C.mutedLight,
                              textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3,
                            }}>{l}</div>
                            <div style={{ fontSize: 13, color: C.black, lineHeight: 1.5 }}>
                              {text || 'Not scored'}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {notes[sys.key] && (
                    <div style={{
                      padding: '12px 24px 16px', borderTop: `1px solid ${C.surfaceBorder}`,
                      fontSize: 13, color: C.muted, lineHeight: 1.5, whiteSpace: 'pre-wrap',
                      fontStyle: 'italic',
                    }}>
                      {notes[sys.key]}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* What good looks like — for the weakest system */}
          {worst && (
            <div style={{ marginBottom: 40, padding: '24px', background: C.greenBg, border: `1px solid #BBF0D5` }}>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', color: C.greenText,
                textTransform: 'uppercase', marginBottom: 12,
              }}>WHAT GOOD LOOKS LIKE — {worst.name.toUpperCase()}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {LENSES.map(l => {
                  const greenText = getGreenText(worst.key, l);
                  return (
                    <div key={l} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <div style={{
                        width: 8, height: 8, borderRadius: '50%', background: C.green,
                        marginTop: 5, flexShrink: 0,
                      }} />
                      <div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: C.greenText, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          {l}:
                        </span>
                        <span style={{ fontSize: 13, color: C.greenText, marginLeft: 6 }}>{greenText}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recommendation */}
          {worst && (
            <div style={{
              padding: '24px', background: C.black, color: C.white, marginBottom: 40,
            }}>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.15em',
                color: C.mutedLight, textTransform: 'uppercase', marginBottom: 12,
              }}>RECOMMENDED NEXT STEP</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: '#E0E0E0' }}>
                {recommendation}
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
                navigator.clipboard.writeText(generateTextSummary(answers, notes, clientName, businessName, industry, teamSize, mainService))
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
              {step.question.toUpperCase()}
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
                    onClick={() => {
                      setAnswer(system.key, step.lens, opt.level);
                      if (currentStep < TOTAL_STEPS - 1) {
                        setTimeout(() => { setCurrentStep(currentStep + 1); setShowNotes(false); }, 600);
                      }
                    }}
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
