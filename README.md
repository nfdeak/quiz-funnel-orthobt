# quiz-funnel — OrthoBelt

High-converting quiz funnel for OrthoBelt (lower back / SI joint pain product).

**Stack:** Next.js 16 · TypeScript · Tailwind CSS · Framer Motion

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## A/B Versions

| URL | Version |
|-----|---------|
| `/` or `/?v=a` | **Version A** — Starts directly at Question 1 (no landing page) |
| `/?v=b` | **Version B** — Landing page first; gender buttons act as quiz entry |

## Quiz Flow

```
[Version B only] Landing Page (gender CTA)
  → Q1: Age
  → Q2: Pain location
  → Q3: Morning stiffness
  → Q4: Daily impact
  → Q5: Duration
  → Results Page 1 — Back Pain Profile Summary
  → Q6: Solutions tried (multi-select)
  → Education Slide — Why nothing works
  → Q7: Biggest concern
  → Q8: Motivation level
  → Results Page 2 — Final pitch + Claim Discount CTA
```

## Key Files

| File | Purpose |
|------|---------|
| `src/lib/quizData.ts` | All questions, options, screen order |
| `src/lib/types.ts` | TypeScript types |
| `src/components/QuizFunnel.tsx` | State machine / orchestrator |
| `src/components/LandingPage.tsx` | Version B landing page |
| `src/components/ResultsPage2.tsx` | Final CTA — update `PRODUCT_URL` here |
