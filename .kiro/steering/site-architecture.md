# Site Architecture & SEO Rules — mindperformancehub.com

## Content Cluster Definitions

### Supporting Articles vs Cross-Linking Articles
- **Supporting articles** — written specifically for a subcategory topic, live under that subcategory in content-data.js, appear in the subcategory card on category pages
- **Cross-linking articles** — from other subcategories that link to a pillar as a natural recommendation; they stay in their own subcategory and just pass traffic to the pillar

### Cluster 7: Brainwave Audio / Affiliate (Brain Optimization subcategory)
- **Pillar**: `brainwave-audio-for-focus.html` — targets "brainwave audio for focus"
- **True supporting** (subcategory: Brain Optimization): `neuroplasticity-and-memory.html`, `brain-training-games-effectiveness.html`
- **Cross-linking** (from other subcategories, link to pillar):
  - Memory: `improve-memory-science-backed.html`
  - Sleep: `sleep-and-memory-formation.html`
  - Mental Energy: `boost-mental-energy-naturally.html`
  - Learning: `active-recall-guide.html`
- **Product page**: `brain-song.html` — targets "brain song", contains hop link
- **Funnel**: cross-linking articles → pillar → brain-song.html → ClickBank hop link

## Pillar Structure Rules
- One pillar per subcategory (never two — they'd compete)
- Pillar: 3,000–4,500 words; supporting: 1,500–2,500 words
- Pillar links DOWN to all supporting articles
- Supporting articles link UP to pillar
- Pillar links to product page; product page contains hop link
- Never put ClickBank hop links in pillar articles — send to product page first

## Category Hierarchy
```
Homepage
├── Brain Health (brain-health.html)
│   ├── Memory (pillar: improve-memory-science-backed)
│   ├── Mental Energy (pillar: boost-mental-energy-naturally)
│   ├── Sleep & Brain Function (pillar: sleep-cognitive-performance)
│   ├── Learning & Cognitive Skills (pillar: memory-enhancement-techniques)
│   └── Brain Optimization (pillar: brainwave-audio-for-focus → brain-song.html)
├── Focus & Concentration (focus-concentration.html)
│   ├── Focus Habits & Techniques (pillar: mindfulness-better-focus)
│   ├── Deep Work (pillar: deep-work-focus-guide)
│   ├── Attention Training (pillar: attention-span-expansion)
│   ├── Study & Learning Techniques (pillar: retrieval-practice-guide)
│   └── Distraction Management (pillar: digital-minimalism-focus)
└── Productivity & Self-Improvement (productivity.html)
    ├── Habit Building (pillar: building-habits-framework)
    ├── Time Management (pillar: time-management-strategies)
    ├── Goal Setting (pillar: smart-goals-framework)
    ├── Learning & Skill Development (pillar: retrieval-practice-guide)
    └── Personal Performance (pillar: peak-performance-states)
```

## Content Data (content-data.js) Category Values
- Brain Health articles: `"category": "Brain Health"`
- Focus articles: `"category": "Focus & Concentration"`
- Productivity articles: `"category": "Productivity"` ← use short form, matches blog.js and blog.html

## Affiliate Product: The Brain Song
- Product: 12-minute daily gamma brainwave audio
- Price: $39 one-time
- Guarantee: 90-day money-back (terms apply) — from official vendor page
- Delivery: Instant digital download
- Hop link: `https://85bd0ji-yf5zdzd-21ke4d0eyz.hop.clickbank.net`
- Always use `rel="nofollow sponsored"` on hop links
- Do NOT mention ClickBank by name on the sales page — use "secure checkout" language
- Visible page: no pricing shown (let ClickBank checkout page show price)
- Schema: Product schema with image, availability InStock, 90-day return policy

## Content Quality Thresholds
- Under 1,500 words = thin content, do not surface in navigation or content-data.js
- 1,500–2,500 words = acceptable supporting article
- 3,000+ words = pillar quality
- Currently thin (do not list): active-recall-guide.html (899w), spaced-repetition-guide.html (944w), neuroplasticity-and-memory.html (881w), memory-palace-method.html (938w)

## Badge Labels
- Pillar article badge in subcategory cards: "Start Here" (not "Pillar" — internal term)
- Supporting article indicator: → arrow
