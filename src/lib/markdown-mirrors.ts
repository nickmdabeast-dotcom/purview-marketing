/**
 * Markdown mirrors — clean, structured markdown versions of every public page.
 *
 * Served via /api/md/[slug] route handler and exposed to users under the
 * canonical .md URL via rewrites in next.config.ts (e.g. /index.md, /privacy.md,
 * /terms.md). These exist so LLM-based search systems can ingest page content
 * in a single, well-formed pass with no HTML/CSS/JS noise.
 *
 * Keys must match the rewrite slugs defined in next.config.ts.
 */

import { faqs } from "./faq-data";

const faqMarkdown = faqs
  .map((faq) => `### ${faq.question}\n\n${faq.answer}`)
  .join("\n\n");

const indexMd = `# Purview — Multi-State Privacy Compliance for Small Businesses

Free scan — find out exactly which privacy laws apply to your business. Get a compliance checklist and fix legal blind spots in minutes, no legal degree required.

Purview is a multi-state US privacy compliance platform for small and mid-sized businesses. We determine which state privacy laws apply to your business, track compliance status across all applicable states, generate attorney-reviewed privacy policies, and provide step-by-step implementation guidance.

- Scan your website free: https://app.getpurview.com/scan
- Take the free compliance assessment: https://app.getpurview.com/quiz

No credit card required. 10-second scan. Backed by real enforcement data.

## You're probably exposed to laws you don't even know about

State Attorneys General are issuing fines now, with more laws taking effect every quarter. If you have customers in multiple states, overlapping privacy laws are already actively enforced against businesses like yours. Ignorance isn't a defense.

### The landscape

- **20+ state privacy laws and counting.** Each with different thresholds, requirements, and deadlines.
- **$7,988 per-violation fine.** California's penalty rate — with no aggregate cap. Other states go up to $25,000.
- **0 days cure period.** California eliminated the right to cure. Colorado's expires soon. More states following.

### Recent enforcement actions

- **$345,000 — Todd Snyder Inc.** Fined by the California Attorney General for failure to honor opt-out requests and inadequate privacy disclosures.
- **$85,000 — TicketNetwork.** Settled with the Connecticut Attorney General over unauthorized data collection and missing consumer disclosures.

Sourced directly from actual state attorney general enforcement records.

## How it works

Compliance doesn't have to be a headache.

### 01 — Scan your site

Answer a few questions about your business size and data. We handle the complex legal mapping to see what applies.

### 02 — Get your checklist

See requirements organized by priority. One unified dashboard across all states — the strictest standard wins.

### 03 — Check the boxes

Follow step-by-step actions: generate policies, install banners, send DPA requests. Get compliant without hiring consultants.

## Features — built for multi-state compliance

Everything you need to map, execute, and maintain compliance automatically.

### Compliance Matching Engine

Stop guessing. Purview automatically matches your business revenue and data practices against 20+ state laws to tell you exactly what applies.

### Privacy Policy Generator

Ditch the expensive lawyers. Generate an attorney-reviewed privacy policy that covers every applicable state in one hosted document.

### Website Scanner

Instantly detect risky trackers like Meta Pixel or Stripe. Find missing consent banners before regulators or competitors do.

### Unified Dashboard

One view across all states. Requirements are merged by the "strictest wins" rule to eliminate duplicate work and confusion.

### Quick Compliance Actions

Access pre-written DPA emails and code snippets for cookie banners. One click marks requirements globally compliant.

### Compliance Tracking

Watch your score improve in real time. Prove to partners, board members, or acquirers that you take data privacy seriously.

## Who it's for

If any of these sound like you, Purview was built for your exact situation.

### E-commerce stores selling nationally

You use Shopify or WooCommerce, run Meta Pixel, collect shipping addresses across state lines, and have no idea which privacy laws apply to you.

### SaaS companies with multi-state user bases

Your users sign up from everywhere. You're storing PII, processing payments, and using analytics — but your privacy policy was copied from a template two years ago.

### Marketing agencies managing client compliance

Your clients ask if their sites are compliant and you don't have a clear answer. Purview gives you a tool to audit clients and upsell compliance services.

### Growing startups preparing for due diligence

Investors and acquirers check your compliance posture. A clean compliance dashboard signals operational maturity and reduces deal friction.

## How Purview compares

Enterprise tools are overkill. Cookie-only tools aren't enough. Purview is the middle ground.

| Feature | Purview | OneTrust | Termly | DIY |
|---|---|---|---|---|
| Multi-state compliance matching | Yes | Yes | No | Partial |
| Privacy policy generation | Yes | Yes | Yes | Partial |
| Step-by-step remediation | Yes | Partial | No | No |
| Website tracker scanning | Yes | Yes | Yes | No |
| SMB-friendly pricing | Yes | No | Yes | Yes |
| Setup in under 30 minutes | Yes | No | Yes | No |
| No consultants required | Yes | No | Partial | No |
| Pricing | From $49/mo | $10,000+/yr | From $10/mo | "Free" + 40 hrs |

Comparison based on publicly available pricing and feature information as of 2026.

## Built on real regulatory data

- Attorney-reviewed templates
- 20+ states, 170+ requirements
- Real enforcement data
- Current through 2026

Purview provides legal information, not legal advice. Consult a qualified attorney for specific compliance decisions.

## Pricing

Simple pricing. No hidden fees. Start with a free scan. Upgrade when you're ready. All plans include: cancel anytime, and annual pricing saves 20%.

| Plan | Monthly | Annual (save 20%) | Annual total | Best for |
|---|---|---|---|---|
| Starter | $49/mo | $39/mo | $468/yr | Businesses with limited exposure |
| Growth (Most Popular) | $99/mo | $79/mo | $948/yr | Multi-state operators |
| Pro | $149/mo | $119/mo | $1,428/yr | Complex data operations |

### Starter — $49/mo ($39/mo annual)

For businesses with limited exposure.

- Up to 5 states
- 1 policy generation per period
- Website scanner
- Quick compliance actions

Sign up: https://app.getpurview.com/signup?plan=starter

### Growth — $99/mo ($79/mo annual) — Most Popular

For multi-state operators.

- All applicable states (unlimited)
- Unlimited policy generation
- Full compliance dashboard
- Priority action items
- Implementation guides

Sign up: https://app.getpurview.com/signup?plan=growth

### Pro — $149/mo ($119/mo annual)

For complex data operations.

- Everything in Growth
- Advanced compliance reporting
- Priority support
- Custom implementation guidance

Sign up: https://app.getpurview.com/signup?plan=pro

### Free Forever

Your free account includes a full website tracker scan and a basic multi-state exposure report. No credit card required.

### Paid plans

Unlock the full multi-state dashboard, AI-generated privacy policies, step-by-step remediation actions, and ongoing tracker alerts.

## Frequently Asked Questions

${faqMarkdown}

## Stop wondering. Start complying.

Scan your website in 10 seconds — free, no credit card required.

- Scan your website free: https://app.getpurview.com/scan
- Take the free compliance assessment: https://app.getpurview.com/quiz

## Security

- 256-bit data encryption
- GDPR compliant infrastructure
- Privacy-first design

## Contact

- Website: https://getpurview.com
- App: https://app.getpurview.com
- Email: nikolas@getpurview.com

## Legal

- [Privacy Policy](/privacy.md)
- [Terms of Service](/terms.md)

This site provides legal information, not legal advice. Consult a qualified attorney for legal guidance regarding privacy compliance for your specific business operations.

© 2026 Purview LLC.
`;

const privacyMd = `# Privacy Policy — Purview

Purview's privacy policy governs how we collect, use, and protect your data.

Our privacy policy is being finalized. For questions, contact [nikolas@getpurview.com](mailto:nikolas@getpurview.com).

## Related

- [Homepage](/index.md)
- [Terms of Service](/terms.md)

© 2026 Purview LLC.
`;

const termsMd = `# Terms of Service — Purview

Purview's terms of service set out the usage terms and conditions for our privacy compliance platform.

Our terms of service are being finalized. For questions, contact [nikolas@getpurview.com](mailto:nikolas@getpurview.com).

## Related

- [Homepage](/index.md)
- [Privacy Policy](/privacy.md)

© 2026 Purview LLC.
`;

export const markdownMirrors: Record<string, string> = {
  index: indexMd,
  privacy: privacyMd,
  terms: termsMd,
};

export const markdownMirrorSlugs = Object.keys(markdownMirrors);
