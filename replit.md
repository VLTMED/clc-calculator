# Cooling & Heating Load Calculator (حساب أحمال التبريد والتكييف)

## Project Overview

A professional Arabic-first web application for calculating cooling/heating loads based on ASHRAE tables. The UI is fully RTL (Arabic) with mobile-first design. Supports: wall/roof/floor conduction layers, solar/glass radiation, internal gains (people/lighting/equipment), product/storage cold-room gains, and air infiltration/ventilation loads.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS + shadcn/ui (Radix UI)
- **Fonts:** Thmanyah Sans (5 weights) + Thmanyah Serif Display (2 weights)
- **Charts:** Recharts
- **Package Manager:** npm

## Typography System (Thmanyah)

Two font families following the official Thmanyah Font Guide:

| Family | Weights | Use |
|---|---|---|
| ThmanyahSans | 300, 400, 500, 700, 900 | Body, labels, buttons, numbers |
| ThmanyahSerifDisplay | 700, 900 | H1/H2 headings, hero titles |

### OpenType Features Enabled
- `"salt" 1` — Stylistic Alternates (حروف مرسلة تُفعَّل تلقائياً)
- `"calt" 1` — Contextual Alternates (روابط سياقية)
- `"liga" 1` — Standard Ligatures (ربط الحروف)
- `"tnum" 1` — Tabular Numerals (للأرقام فقط)
- `"ss01" 1` — Stylistic Set 1 / كشيدة مائلة (utility class: `.font-kashida-italic`)

## Project Structure

- `src/main.tsx` — React entry point (RTL/Arabic setup)
- `src/App.tsx` — Main UI, mobile-first header, tab navigation, state management
- `src/engine/` — Calculation logic (`calculator.ts`, `fullCalculator.ts`)
- `src/types/` — TypeScript types (`inputs.ts`, `WallLayer`)
- `src/data/` — ASHRAE/material/product lookup tables
- `src/sections/` — Input sections (ConstructionSection redesigned as layer cards)
- `src/components/ui/` — Shared UI components
- `public/fonts/` — Arabic fonts
- `public/fonts.css` — Font-face declarations + global OpenType settings
- `src/index.css` — Full typography system + mobile-first utilities

## Layers System (ConstructionSection)

Each construction layer (طبقة) is an independent card unit containing:
1. **اسم الطبقة** — Material selector (full width dropdown)
2. **السُّمك (m)** — Editable thickness input
3. **معامل التوصيل k** — Auto-filled from material, displayed as read-only badge

Layers are independently addable, deletable, and editable. The thermal calculation uses: U = 1 / (1/hi + Σ(L/k) + 1/ho).

## Mobile-First RTL Design

- Header: compact layout on mobile, badges hidden on xs, clamp() font scaling, color changes with appMode (blue=refrig, orange=ac)
- Tabs: horizontally scrollable on mobile (icon + label stacked), full on desktop
- Layer cards: full-width material select, 2-column thickness/k grid
- Touch targets: minimum 44px on mobile
- Checkbox toggles: card-style rows with clear visual affordance

## UX Overhaul (v4A — May 2026)

Key changes applied from 30-point observation report:
1. **appMode switch** — prominent 2-button card at top of App.tsx (تبريد/تكييف). Header color adapts dynamically.
2. **lightsEnabled + peopleEnabled** — independent card toggles in InternalLoadsSection, same pattern as equipment.
3. **Neutral defaults** — all inputs start at 0. "تحميل مثال" button loads demo data.
4. **handleReset** — now resets all inputs (not just results). Clears localStorage too.
5. **Ground temp label** — "درجة حرارة التربة/الهواء المحاذي للأرضية" with explanatory sub-label.
6. **Product field locking** — constants auto-filled on product selection, locked by default. "مؤمّن — انقر للتعديل" button to unlock.
7. **Frozen product note** — blue info banner shown when product has latentHeat=0 or frozen.
8. **Temp validation** — amber warning banner when productEnterTemp < storageTemp.
9. **Auto-infiltration** — AirLoadsSection auto-calculates suggested infiltration rate from room volume via INFILTRATION_RATES interpolation, with one-tap "تطبيق" button.
10. **localStorage** — inputs auto-saved on every change; restored on page load; cleared on reset.
11. **fullCalculator.ts** — lightsEnabled and peopleEnabled flags now multiply their respective loads.
12. **DisabledBadge** — consistent "غير محسوب" indicator across all disabled load cards.

## Development

```bash
npm install
npm run dev
```

App runs on port 5000 at `0.0.0.0`.

## Deployment

Configured as a static site:
- **Build:** `npm run build`
- **Public Dir:** `dist`
- **GitHub:** https://github.com/VLTMED/clc-calculator (branch: main)
