# CLAUDE.md — AIJMY Sales Site

Use this file as the project-specific instruction layer for Claude Code.

## Project

This is the public AI Just Met You sales site.

- Company/studio: **AI Just Met You**
- Client-facing operator/product: **ALi**
- Internal infrastructure: **Hermes** — never buyer-facing
- Live deployment: Vercel project backed by this GitHub repo
- Primary CTA: `https://calendly.com/luke72/20min` until Stripe Payment Links are ready

## Stack

- Next.js 14 App Router
- React 18
- CSS in `app/globals.css`
- Routes:
  - `/` — ALi homepage
  - `/audit` — business systems audit tool
  - `/follow-up-operator` — lead follow-up operator demo page

## Commands

Run before reporting done:

```bash
npm run build
```

For route checks:

```bash
npm run dev -- -p 3001
curl -I http://localhost:3001/
curl -I http://localhost:3001/audit
curl -I http://localhost:3001/follow-up-operator
```

## Behavioral rules

### 1. Think before coding

Do not silently guess. If a request can mean multiple materially different things, state the options before editing. If the next step is obvious, act.

### 2. Simplicity first

Make the smallest change that solves the actual problem.

Do not add:
- new frameworks
- component libraries
- CMS layers
- animation libraries
- analytics packages
- speculative abstractions
- extra routes

### 3. Surgical changes

Touch only the files required by the request.

Do not:
- reformat unrelated code
- refactor working pages while fixing copy
- remove existing routes
- rename buyer-facing terms without checking positioning rules
- overwrite `DESIGN.md` unless asked

Every changed line should trace to the task.

### 4. Goal-driven execution

For any implementation task, define success criteria and verify them.

Examples:
- Copy change → verify the text appears on the route.
- Visual change → verify local route renders and build passes.
- Route change → verify `/`, `/audit`, and `/follow-up-operator` still return 200.
- Deployment change → verify live Vercel route after push.

## Design system

Read `DESIGN.md` before touching visual design.

Current design direction: **ALi Command Layer**.

Use:
- dark void/panel system
- cream primary CTA
- restrained violet intelligence signal
- mint only for live/ready states
- precise panels, command/log language, operating-room clarity

Do not use:
- generic SaaS card sludge
- fake metrics
- stock photos
- purple-gradient startup mush
- random icon grids
- chatbot framing

## Copy rules

Luke's voice: direct, practical, no-BS.

Use:
- ALi as the thing the client buys
- managed AI employee as the category explanation
- second operator / operating layer / native extension language
- concrete workflows: inbox triage, lead follow-up, scheduling, recurring back-office work

Avoid:
- “Hermes” in buyer-facing copy
- “install” as primary positioning
- “agent” as the main term
- “automation” as the main term
- token/credit/usage-based language
- hype words like revolutionary, game-changing, powerful, seamless unless backed by specifics
- rally-cry endings

## Offer rules

Current offer architecture:

- Pilot: **$5,000**, four weeks
- Managed monthly: **$10,000/mo**
- Pilot fee credited toward first month if they continue
- First useful workflow live in 48 hours
- Weekly improvements
- Month-to-month
- No token/credit language

## Safety rules

Do not delete, send, publish, charge, or submit external forms without explicit Luke approval.

Do not store credentials, API keys, bank details, SSNs, or Stripe/Mercury secrets in this repo.

## Git rules

Before pushing:

```bash
git status --short
git diff
npm run build
```

If remote moved, fetch/rebase. Do not force-push unless Luke explicitly approves.
