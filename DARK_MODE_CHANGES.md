# Dark Mode Implementation — ClientFlow

## Summary
Full dark mode pass applied. Premium, warm, calm aesthetic using the spec palette.

## Palette Applied
- Page bg: `#0F1923`
- Section alt: `#141F2B`
- Deep section: `#0A1520`
- Surface/card: `#1E2D3D`
- Border: `#2A3A4A`
- Text primary: `#F0EDE8`
- Text muted: `#8896A5`
- Accent: `#2D6A4F` (unchanged)
- CTA section: solid accent green (unchanged)

## Files Changed
- `tailwind.config.ts` — extended color palette
- `src/app/globals.css` — body bg + text
- `src/components/Navbar.tsx`
- `src/components/HeroSection.tsx`
- `src/components/ProblemSection.tsx`
- `src/components/CostSection.tsx`
- `src/components/HandlesSection.tsx`
- `src/components/HowItWorksSection.tsx`
- `src/components/MiniDemoSection.tsx`
- `src/components/IndustriesSection.tsx`
- `src/components/FounderSection.tsx`
- `src/components/VideoSection.tsx`
- `src/components/CtaSection.tsx` (no changes needed — green bg already works)
- `src/components/Footer.tsx`
- `src/components/icons.tsx` — NEW: inline SVG icon shim (replaces lucide-react dep)
- `next.config.mjs` — Unsplash image domain added
- `package.json` — lucide-react added as dependency

## To Complete
Run in the project directory:
```bash
npm install && npm run build
```
This installs lucide-react (real package) and verifies the TypeScript build.

## Notes
- Icon components use local `./icons.tsx` shim — zero new dependencies at runtime
- After `npm install`, you can optionally update the imports back to `lucide-react`
  (the icons.tsx shim is identical in API and visuals)
- Section rhythm: alternates between `#0F1923` ↔ `#141F2B` throughout
- No glow effects — MiniDemo section uses 1px border lines instead
