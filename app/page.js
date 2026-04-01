'use client';
import { useState, useRef } from 'react';

const SYSTEMS = [
  {
    key: 'attract', name: 'Attract', question: 'How do people find out you exist?',
    ask: 'If a stranger needed what you sell, how would they find you today?',
    covers: 'Marketing, advertising, online presence, referral generation, brand visibility.',
    redFlag: 'We get all our work from word of mouth.',
    bg: '#E1F5EE', accent: '#0F6E56', dark: '#085041',
    scenarios: {
      process: {
        red: 'No defined way to generate leads. "We just wait for the phone to ring." Can\'t describe where leads come from.',
        yellow: 'Some marketing happens but inconsistent and untracked. Runs ads sometimes. Can\'t say what\'s working.',
        green: 'Defined lead gen channels with tracked volume. Knows cost per lead. Consistent cadence. Can scale predictably.'
      },
      tools: {
        red: 'No website or dead brochure site. No Google Business profile. Not listed anywhere customers search. No CRM.',
        yellow: 'Has website and Google profile but outdated. Has CRM but doesn\'t track lead sources. Can\'t measure ROI.',
        green: 'Website converts visitors to inquiries. CRM tracks every lead source. Google profile optimized. Automated follow-up.'
      },
      people: {
        red: 'Nobody is responsible for marketing. Owner does it "when there\'s time" (never). No one monitors reviews.',
        yellow: 'Someone handles marketing part-time, no clear ownership. Reviews go unanswered. Social media sporadic.',
        green: 'Clear marketing owner. Response time under 1 hour. Review requests are systematic.'
      }
    }
  },
  {
    key: 'convert', name: 'Convert', question: 'How do leads become paying customers?',
    ask: 'When someone reaches out interested, what happens next — step by step?',
    covers: 'Lead follow-up, quoting/estimating, proposals, sales conversations, closing.',
    redFlag: 'I quoted that job three weeks ago and never heard back.',
    bg: '#E6F1FB', accent: '#185FA5', dark: '#0C447C',
    scenarios: {
      process: {
        red: 'No defined sales process. Leads responded to "when we get around to it." No quoting template. No follow-up.',
        yellow: 'Quotes go out but follow-up inconsistent. Some leads get callbacks, some don\'t. No close rate tracking.',
        green: 'Every lead gets response in defined timeframe. Quoting standardized. Automatic follow-up. Pipeline visible.'
      },
      tools: {
        red: 'Quotes handwritten or from memory. No CRM — leads in texts and voicemail. No way to know open quotes.',
        yellow: 'Email or spreadsheet for leads. Quoting exists but not standardized. Can\'t pull pipeline reports.',
        green: 'CRM tracks every lead to close. Templated quoting. Automated reminders. Conversion rate reporting.'
      },
      people: {
        red: 'Only owner can quote and close. If owner is on site, leads go unanswered. No one else speaks to price.',
        yellow: 'Someone besides owner can quote but not trained on objections. No accountability for follow-up.',
        green: 'Multiple people sell and quote. Clear marketing-to-sales handoff. Performance tracked per person.'
      }
    }
  },
  {
    key: 'deliver', name: 'Deliver', question: 'How do you fulfill what you sold?',
    ask: 'Walk me through what happens from yes to job done.',
    covers: 'Scheduling, job execution, quality control, customer communication, project management.',
    redFlag: "We're always putting out fires on job sites.",
    bg: '#EEEDFE', accent: '#534AB7', dark: '#3C3489',
    scenarios: {
      process: {
        red: 'No SOP for jobs. Every project run differently. No checklists or quality standards. Scope creep constant.',
        yellow: 'Some jobs follow process, others don\'t. Checklists exist but not enforced. Jobs go over budget unnoticed.',
        green: 'Every job type has documented SOP. Quality checklists before sign-off. Scope changes captured in writing.'
      },
      tools: {
        red: 'Scheduling in owner\'s head or paper. No PM tool. Customer updates only when customer complains.',
        yellow: 'Basic calendar not shared with team. No photo documentation. Customer gets start and end update only.',
        green: 'PM tool tracks all jobs. Automated customer updates at milestones. Photo docs standard. Scheduling optimized.'
      },
      people: {
        red: 'Owner must be on every job. Crew can\'t decide without calling. No training docs. High turnover.',
        yellow: 'Crew runs simple jobs but escalates complex. Tribal knowledge not written. Key-person dependency.',
        green: 'Team executes without owner. Clear roles and decision authority. Training program. Performance measured.'
      }
    }
  },
  {
    key: 'keep', name: 'Keep', question: 'How do you retain, upsell, and get referrals?',
    ask: 'After you finish a job, do you ever hear from that customer again — by accident or design?',
    covers: 'Post-job follow-up, reviews, referral programs, upselling, recurring revenue.',
    redFlag: 'We do great work but never ask for reviews.',
    bg: '#FAECE7', accent: '#993C1D', dark: '#712B13',
    scenarios: {
      process: {
        red: 'Job ends, customer never hears from you. No review request. No referral ask. Repeat business is luck.',
        yellow: 'Sometimes asks for reviews but inconsistent. Some repeat customers but no system. No upsell strategy.',
        green: 'Every job triggers follow-up sequence: satisfaction, review, referral. Periodic outreach. Upsell paths defined.'
      },
      tools: {
        red: 'No customer database beyond old invoices. No email list. Can\'t contact past customers as a group.',
        yellow: 'Has customer list but doesn\'t use it. Reviews exist but unmanaged. No automated review requests.',
        green: 'CRM tracks past customers with history. Automated review requests. Email/text campaigns. Referral tracking.'
      },
      people: {
        red: 'Nobody owns post-job relationships. Crew finishes and moves on. Owner means to follow up but never does.',
        yellow: 'Owner handles all relationships personally. If key person leaves, connections leave too.',
        green: 'Account management is someone\'s job. Team plants seeds during delivery. Referral program communicated.'
      }
    }
  },
  {
    key: 'run', name: 'Run', question: 'How does the business operate day to day?',
    ask: 'What takes up most of your time that isn\'t doing the work or talking to customers?',
    covers: 'Invoicing, collections, bookkeeping, hiring, internal comms, scheduling, compliance.',
    redFlag: 'I spend my Sundays doing invoices and chasing payments.',
    bg: '#F1EFE8', accent: '#5F5E5A', dark: '#444441',
    scenarios: {
      process: {
        red: 'No documented admin processes. Invoices late or missing. Owner does everything in their head. Reactive hiring.',
        yellow: 'Basic systems but all manual. Invoices go out but collections untracked. Scheduling breaks when things change.',
        green: 'Invoicing automatic on completion. Collections follow escalation. Hiring pipeline exists. Owner <20% on admin.'
      },
      tools: {
        red: 'No accounting software. Handwritten invoices. No shared calendar. Crew comms via personal texts.',
        yellow: 'Has QuickBooks but months behind. Calendar not synced with team. Multiple tools don\'t connect.',
        green: 'Accounting current and reconciled. Shared real-time scheduling. Centralized comms. Payroll systematized.'
      },
      people: {
        red: 'Owner is entire back office. No bookkeeper or admin. If owner is sick, nothing happens.',
        yellow: 'Part-time help or family assists. Owner reviews everything. One person knows the real system.',
        green: 'Dedicated admin/ops support. Clear roles. Documented onboarding. Monthly reporting without owner.'
      }
    }
  }
];

const LENSES = ['process', 'tools', 'people'];
const LEVELS = ['red', 'yellow', 'green'];
const LEVEL_LABELS = { red: 'Red — Broken or missing', yellow: 'Yellow — Exists but leaking', green: 'Green — Working, scalable' };
const LEVEL_COLORS = {
  red: { bg: '#FCEBEB', text: '#791F1F', dot: '#E24B4A' },
  yellow: { bg: '#FAEEDA', text: '#633806', dot: '#EF9F27' },
  green: { bg: '#EAF3DE', text: '#27500A', dot: '#639922' }
};

export default function Home() {
  const [screen, setScreen] = useState('intro');
  const [currentSystem, setCurrentSystem] = useState(0);
  const [scores, setScores] = useState({});
  const [notes, setNotes] = useState({});
  const [clientName, setClientName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [copied, setCopied] = useState(false);

  const setScore = (sysKey, lens, level) => {
    setScores(prev => ({ ...prev, [`${sysKey}-${lens}`]: level }));
  };
  const getScore = (sysKey, lens) => scores[`${sysKey}-${lens}`] || null;
  const systemComplete = (sysKey) => LENSES.every(l => getScore(sysKey, l));
  const allComplete = SYSTEMS.every(s => systemComplete(s.key));
  const getScoreValue = (level) => level === 'red' ? 1 : level === 'yellow' ? 2 : level === 'green' ? 3 : 0;
  const getSystemAvg = (sysKey) => {
    const vals = LENSES.map(l => getScoreValue(getScore(sysKey, l))).filter(v => v > 0);
    return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
  };
  const getWorstSystem = () => {
    let worst = null, worstAvg = 4;
    SYSTEMS.forEach(s => { const avg = getSystemAvg(s.key); if (avg > 0 && avg < worstAvg) { worstAvg = avg; worst = s; } });
    return worst;
  };
  const getBiggestDropoff = () => {
    const pipeline = SYSTEMS.slice(0, 4);
    let biggestDrop = 0, dropFrom = null, dropTo = null;
    for (let i = 0; i < pipeline.length - 1; i++) {
      const fromAvg = getSystemAvg(pipeline[i].key), toAvg = getSystemAvg(pipeline[i + 1].key);
      if (fromAvg > 0 && toAvg > 0) { const drop = fromAvg - toAvg; if (drop > biggestDrop) { biggestDrop = drop; dropFrom = pipeline[i]; dropTo = pipeline[i + 1]; } }
    }
    return { dropFrom, dropTo, biggestDrop };
  };

  function generateTextSummary() {
    let txt = `AI JUST MET YOU — Business Systems Audit\n`;
    if (businessName) txt += `Business: ${businessName}\n`;
    if (clientName) txt += `Client: ${clientName}\n`;
    txt += `Date: ${new Date().toLocaleDateString()}\n\n--- SCORES ---\n`;
    SYSTEMS.forEach(sys => {
      const avg = getSystemAvg(sys.key);
      const level = avg <= 1.5 ? 'RED' : avg <= 2.5 ? 'YELLOW' : 'GREEN';
      txt += `\n${sys.name.toUpperCase()} (${level} — ${avg.toFixed(1)})\n`;
      LENSES.forEach(l => { const sc = getScore(sys.key, l); txt += `  ${l.charAt(0).toUpperCase() + l.slice(1)}: ${sc ? sc.toUpperCase() : 'Not scored'}\n`; });
      if (notes[sys.key]) txt += `  Notes: ${notes[sys.key]}\n`;
    });
    const worst = getWorstSystem(), dropoff = getBiggestDropoff();
    txt += `\n--- FINDINGS ---\n`;
    if (worst) txt += `Weakest system: ${worst.name}\n`;
    if (dropoff.dropFrom && dropoff.biggestDrop > 0) txt += `Biggest drop-off: ${dropoff.dropFrom.name} → ${dropoff.dropTo.name}\n`;
    txt += `\n--- RECOMMENDATION ---\n`;
    if (worst) txt += `Focus on ${worst.name} first. Fix the process, then add AI-powered tools, then address people.\n`;
    return txt;
  }

  // INTRO
  if (screen === 'intro') {
    return (
      <div style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
        <div style={{ maxWidth: 440, width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', color: '#B4B2A9', textTransform: 'uppercase', marginBottom: 8 }}>AI Just Met You</div>
            <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#2C2C2A' }}>Business systems<br />audit</h1>
            <p style={{ fontSize: 14, color: '#888780', marginTop: 12, lineHeight: 1.5 }}>Find where AI and automation can fix the biggest problems in your business.</p>
          </div>
          <div style={{ background: '#fff', borderRadius: 14, padding: '1.5rem', border: '1px solid #E8E6E0', marginBottom: '1rem' }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#888780', display: 'block', marginBottom: 6, letterSpacing: '0.02em' }}>Client name</label>
            <input value={clientName} onChange={e => setClientName(e.target.value)} placeholder="Client name"
              style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid #E8E6E0', fontSize: 15, marginBottom: 16, boxSizing: 'border-box', background: '#FAFAF8', outline: 'none' }} />
            <label style={{ fontSize: 12, fontWeight: 600, color: '#888780', display: 'block', marginBottom: 6, letterSpacing: '0.02em' }}>Business name</label>
            <input value={businessName} onChange={e => setBusinessName(e.target.value)} placeholder="Business name"
              style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid #E8E6E0', fontSize: 15, boxSizing: 'border-box', background: '#FAFAF8', outline: 'none' }} />
          </div>
          <button onClick={() => setScreen('audit')}
            style={{ width: '100%', padding: '14px', borderRadius: 10, background: '#2C2C2A', color: '#fff', fontSize: 16, fontWeight: 600, border: 'none', transition: 'transform 0.1s', }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}>
            Start audit
          </button>
          
        </div>
      </div>
    );
  }

  // RESULTS
  if (screen === 'results') {
    const worst = getWorstSystem();
    const dropoff = getBiggestDropoff();
    const runAvg = getSystemAvg('run');
    return (
      <div style={{ maxWidth: 540, margin: '0 auto', padding: '1.5rem 1rem 3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', color: '#B4B2A9', textTransform: 'uppercase', marginBottom: 4 }}>AI Just Met You</div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#2C2C2A', letterSpacing: '-0.02em' }}>Audit results</h1>
          {(clientName || businessName) && <p style={{ fontSize: 14, color: '#888780', marginTop: 4 }}>{businessName}{clientName && businessName ? ' — ' : ''}{clientName}</p>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, margin: '0 0 1.5rem' }}>
          {SYSTEMS.map(sys => {
            const avg = getSystemAvg(sys.key);
            const level = avg <= 1.5 ? 'red' : avg <= 2.5 ? 'yellow' : 'green';
            return (
              <div key={sys.key} style={{ background: sys.bg, borderRadius: 12, padding: '14px 6px', textAlign: 'center', border: worst?.key === sys.key ? `2px solid ${sys.accent}` : '2px solid transparent' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: sys.dark, marginBottom: 8 }}>{sys.name}</div>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: LEVEL_COLORS[level].dot, margin: '0 auto 6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>{avg ? avg.toFixed(1) : '—'}</span>
                </div>
                <div style={{ fontSize: 10, fontWeight: 600, color: sys.accent, letterSpacing: '0.05em' }}>{avg <= 1.5 ? 'RED' : avg <= 2.5 ? 'YELLOW' : 'GREEN'}</div>
              </div>
            );
          })}
        </div>

        {worst && (
          <div style={{ background: '#FCEBEB', borderRadius: 12, padding: '1rem 1.25rem', marginBottom: 10, borderLeft: '4px solid #E24B4A' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#791F1F', marginBottom: 6 }}>Weakest system: {worst.name}</div>
            {LENSES.map(l => { const sc = getScore(worst.key, l); return sc ? (
              <div key={l} style={{ marginTop: 3, fontSize: 13 }}>
                <span style={{ fontWeight: 600, color: '#A32D2D', textTransform: 'capitalize' }}>{l}: </span>
                <span style={{ background: LEVEL_COLORS[sc].bg, color: LEVEL_COLORS[sc].text, padding: '2px 10px', borderRadius: 4, fontSize: 12, fontWeight: 600 }}>{sc.toUpperCase()}</span>
              </div>
            ) : null; })}
          </div>
        )}

        {dropoff.dropFrom && dropoff.biggestDrop > 0 && (
          <div style={{ background: '#FAEEDA', borderRadius: 12, padding: '1rem 1.25rem', marginBottom: 10, borderLeft: '4px solid #EF9F27' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#633806', marginBottom: 4 }}>Biggest pipeline drop-off</div>
            <div style={{ fontSize: 13, color: '#854F0B' }}>{dropoff.dropFrom.name} &rarr; {dropoff.dropTo.name}</div>
            <div style={{ fontSize: 12, color: '#854F0B', marginTop: 4 }}>This is where the most revenue is leaking. Fix this transition first.</div>
          </div>
        )}

        {runAvg > 0 && runAvg <= 1.5 && (
          <div style={{ background: '#F1EFE8', borderRadius: 12, padding: '1rem 1.25rem', marginBottom: 10, borderLeft: '4px solid #5F5E5A' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#444441', marginBottom: 4 }}>Operational drag warning</div>
            <div style={{ fontSize: 12, color: '#5F5E5A', lineHeight: 1.5 }}>RUN scored Red — the back office is eating the owner&apos;s time and slowing everything above it.</div>
          </div>
        )}

        <div style={{ marginTop: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#2C2C2A', marginBottom: 12 }}>Detailed scores</h3>
          {SYSTEMS.map(sys => (
            <div key={sys.key} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: sys.accent }} />
                <span style={{ fontSize: 14, fontWeight: 700, color: sys.dark }}>{sys.name}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
                {LENSES.map(l => { const sc = getScore(sys.key, l); return (
                  <div key={l} style={{ background: sc ? LEVEL_COLORS[sc].bg : '#F4F3F0', borderRadius: 8, padding: '8px 10px', textAlign: 'center' }}>
                    <div style={{ fontSize: 10, color: '#888780', fontWeight: 600, textTransform: 'capitalize', marginBottom: 2, letterSpacing: '0.03em' }}>{l}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: sc ? LEVEL_COLORS[sc].text : '#B4B2A9' }}>{sc ? sc.toUpperCase() : '—'}</div>
                  </div>
                ); })}
              </div>
              {notes[sys.key] && (
                <div style={{ fontSize: 12, color: '#5F5E5A', marginTop: 6, padding: '8px 10px', background: '#F4F3F0', borderRadius: 8, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{notes[sys.key]}</div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, padding: '1.25rem', background: '#E6F1FB', borderRadius: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#0C447C', marginBottom: 8 }}>Recommended next step</div>
          <div style={{ fontSize: 13, color: '#185FA5', lineHeight: 1.6 }}>
            {worst && <>The biggest opportunity is in <strong>{worst.name}</strong>. Fix the <strong>process</strong> first — get a repeatable system in place. Then layer in AI-powered <strong>tools</strong> to automate it. Address <strong>people</strong> last.</>}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
          <button onClick={() => { setScreen('audit'); setCurrentSystem(0); }}
            style={{ flex: 1, padding: '13px', borderRadius: 10, border: '1px solid #D3D1C7', background: '#fff', fontSize: 14, fontWeight: 600, color: '#2C2C2A' }}>
            Edit scores
          </button>
          <button onClick={() => {
            navigator.clipboard.writeText(generateTextSummary()).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }).catch(() => {});
          }} style={{ flex: 1, padding: '13px', borderRadius: 10, border: 'none', background: '#2C2C2A', color: '#fff', fontSize: 14, fontWeight: 600 }}>
            {copied ? 'Copied!' : 'Copy results'}
          </button>
        </div>
      </div>
    );
  }

  // AUDIT SCREEN
  const sys = SYSTEMS[currentSystem];
  const progress = SYSTEMS.map(s => systemComplete(s.key));

  return (
    <div style={{ maxWidth: 540, margin: '0 auto', padding: '1rem 1rem 3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: '1.25rem' }}>
        {SYSTEMS.map((s, i) => (
          <button key={s.key} onClick={() => setCurrentSystem(i)} style={{
            width: 40, height: 40, borderRadius: '50%', border: i === currentSystem ? `2.5px solid ${s.accent}` : '2.5px solid transparent',
            background: progress[i] ? s.accent : i === currentSystem ? s.bg : '#F1EFE8',
            color: progress[i] ? '#fff' : i === currentSystem ? s.dark : '#B4B2A9',
            fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
          }}>
            {s.name.charAt(0)}
          </button>
        ))}
      </div>

      <div style={{ background: sys.bg, borderRadius: 14, padding: '1.25rem 1.25rem 1rem', marginBottom: '1rem', borderLeft: `4px solid ${sys.accent}` }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: sys.dark, margin: 0, letterSpacing: '-0.02em' }}>{sys.name}</h2>
        <p style={{ fontSize: 14, color: sys.accent, margin: '4px 0 0', fontWeight: 500 }}>{sys.question}</p>
      </div>

      <div style={{ background: '#fff', borderRadius: 10, padding: '12px 16px', marginBottom: '1.25rem', border: '1px solid #E8E6E0' }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#B4B2A9', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Ask this</div>
        <div style={{ fontSize: 15, color: '#2C2C2A', fontStyle: 'italic', lineHeight: 1.5 }}>&ldquo;{sys.ask}&rdquo;</div>
      </div>

      {LENSES.map(lens => (
        <div key={lens} style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#2C2C2A', marginBottom: 8, textTransform: 'capitalize', letterSpacing: '0.02em' }}>{lens}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {LEVELS.map(level => {
              const selected = getScore(sys.key, lens) === level;
              const lc = LEVEL_COLORS[level];
              return (
                <button key={level} onClick={() => setScore(sys.key, lens, level)} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10, padding: '11px 14px',
                  borderRadius: 10, border: selected ? `2px solid ${lc.dot}` : '1.5px solid #E8E6E0',
                  background: selected ? lc.bg : '#fff', textAlign: 'left', transition: 'all 0.15s'
                }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%', marginTop: 1, flexShrink: 0,
                    background: selected ? lc.dot : 'transparent', border: selected ? 'none' : '2px solid #D3D1C7',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s'
                  }}>
                    {selected && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5L4.5 7.5L8 3" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: lc.text, marginBottom: 2 }}>{LEVEL_LABELS[level]}</div>
                    <div style={{ fontSize: 12, color: selected ? lc.text : '#888780', lineHeight: 1.5 }}>{sys.scenarios[lens][level]}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#2C2C2A', marginBottom: 6 }}>Notes</div>
        <textarea
          value={notes[sys.key] || ''}
          onChange={e => setNotes(prev => ({ ...prev, [sys.key]: e.target.value }))}
          placeholder={`What did they say about ${sys.name.toLowerCase()}? Key quotes, specifics...`}
          rows={3}
          style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid #E8E6E0', fontSize: 13, resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.5, background: '#fff', outline: 'none' }}
        />
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        {currentSystem > 0 && (
          <button onClick={() => setCurrentSystem(currentSystem - 1)}
            style={{ flex: 1, padding: '13px', borderRadius: 10, border: '1px solid #D3D1C7', background: '#fff', fontSize: 14, fontWeight: 600, color: '#2C2C2A' }}>
            Back
          </button>
        )}
        {currentSystem < SYSTEMS.length - 1 ? (
          <button onClick={() => setCurrentSystem(currentSystem + 1)} style={{
            flex: 2, padding: '13px', borderRadius: 10, border: 'none',
            background: systemComplete(sys.key) ? sys.accent : '#B4B2A9',
            color: '#fff', fontSize: 14, fontWeight: 600, transition: 'all 0.2s'
          }}>
            Next: {SYSTEMS[currentSystem + 1].name}
          </button>
        ) : (
          <button onClick={() => setScreen('results')} style={{
            flex: 2, padding: '13px', borderRadius: 10, border: 'none',
            background: allComplete ? '#2C2C2A' : '#888780',
            color: '#fff', fontSize: 14, fontWeight: 600, transition: 'all 0.2s'
          }}>
            {allComplete ? 'See results' : 'See results (incomplete)'}
          </button>
        )}
      </div>

      <div style={{ marginTop: '1rem', padding: '10px 14px', background: '#FCEBEB', borderRadius: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#A32D2D', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 3 }}>Listen for this red flag</div>
        <div style={{ fontSize: 13, color: '#791F1F', fontStyle: 'italic' }}>&ldquo;{sys.redFlag}&rdquo;</div>
      </div>
    </div>
  );
}
