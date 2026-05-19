---
version: alpha
name: ALi Command Layer
description: Dark precision, executive operating-room clarity, and one restrained signal color for a managed AI employee.
colors:
  void: "#06070A"
  panel: "#0D1017"
  surface: "#131824"
  surfaceAlt: "#1A2030"
  ink: "#F6F7FB"
  text: "#D7DCE8"
  muted: "#8891A3"
  faint: "#555E70"
  line: "#232A3A"
  lineSoft: "#161C29"
  signal: "#8B7CFF"
  signalBright: "#B7AEFF"
  mint: "#66E7C8"
  cream: "#ECE6D8"
typography:
  display:
    fontFamily: Inter
    fontSize: 5rem
    fontWeight: 510
    lineHeight: 0.94
    letterSpacing: "-0.06em"
  h2:
    fontFamily: Inter
    fontSize: 3.5rem
    fontWeight: 510
    lineHeight: 0.98
    letterSpacing: "-0.045em"
  body:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  mono:
    fontFamily: JetBrains Mono
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.4
rounded:
  sm: 8px
  md: 14px
  lg: 24px
  xl: 36px
spacing:
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 72px
components:
  button-primary:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.void}"
    rounded: "{rounded.sm}"
    padding: 14px 18px
  button-secondary:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    padding: 14px 18px
  panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: 24px
---

## Overview

ALi should feel like an executive command layer, not generic SaaS. The page should make the buyer feel the business has gained another operator who is quietly watching, triaging, and preparing decisions.

The visual system borrows principles from the Meng To / Greg Isenberg design workflow: capture the soul of the design in reusable rules, avoid template drift, use one distinctive moat, and make every section feel custom rather than copied.

## Colors

Darkness is the workspace. White is reserved for decisive text. Violet is the intelligence signal. Mint is used only for live/ready states. Cream is the calm executive CTA color.

## Typography

Inter is used with tight display tracking and compressed line-height. Mono labels behave like operating-room instrumentation, not decorative captions.

## Layout

Use large dark fields, precise panels, and asymmetric composition. The hero’s visual moat is a command interface showing ALi actively watching and preparing work. Sections should vary rhythm: cinematic hero, narrow editorial thesis, operational proof, pricing, final CTA.

## Elevation & Depth

Depth comes from luminance steps, hairline borders, radial light, and restrained glows. Avoid glassy generic cards. Panels should feel like instruments.

## Shapes

Radii are deliberate: 8px for controls, 14px for small surfaces, 24px+ for hero/product panels. No pill overload except tiny status chips.

## Components

Primary CTA is warm cream on dark. Secondary CTA is dark with a thin border. Operator panels use small status lights, mono timestamps, and structured rows.

## Do's and Don'ts

Do:
- Use one memorable visual device: ALi as a live command layer.
- Let product-like interface carry the story.
- Keep copy short enough that the design breathes.
- Maintain design memory through this file before future edits.

Don't:
- Use purple-gradient startup sludge.
- Add fake metrics or fake testimonials.
- Repeat the same card grid section over and over.
- Let ALi feel like a chatbot, dashboard, or one-off automation.
