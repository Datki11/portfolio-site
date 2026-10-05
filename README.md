# Daniel Atkinson — Portfolio

Personal portfolio built with Next.js, React, TypeScript, and Tailwind CSS. The violet-and-mint night-sky theme carries forward the original site’s palette, with custom SVG orbit and constellation graphics. Uses locally bundled fonts, with no external font requests.

## Run locally

Use Node.js 24 or newer (`nvm use` selects the project's version).

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

## Checks and production

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

## Update your headshot

Your photo is configured at `public/images/headshot.webp`. Replace this image or update `headshotSrc` in `app/page.tsx` to another path under `public`.

The photo fills the existing frame and is cropped with `object-fit: cover`. Adjust `.headshot` in `app/globals.css` with `object-position` if needed. Set `headshotSrc` to `null` to display the monogram placeholder.

## Edit content

- Page copy, experience, social links, and contact: `app/page.tsx`.
- Colors, layout, and responsive styling: `app/globals.css`.
- SEO and social metadata: `app/layout.tsx`.
- Downloadable résumé: `public/Daniel_Atkinson_Resume_2026.pdf` (rendered from the supplied 2026 résumé).

Experience and impact figures were adapted from the supplied 2026 résumé and Notion résumé library. Selected work descriptions draw on the Notion Interview Story Bank.

## Dependency compatibility

Next.js 16, React 19, and Tailwind CSS 4 are upgraded to their current stable releases. TypeScript stays on 6.x and ESLint on 9.x because the current Next.js lint plugins do not support TypeScript 7 and have ESLint peer dependencies capped at 9. Node types match the Node 24 runtime.

The current audit reports five linked high-severity findings through `braces` in the development-only Next.js ESLint dependency tree. There is no patched `braces` release available; the suggested automatic fix downgrades Next's lint configuration to version 14 and is not applied. `npm audit --omit=dev` checks the production dependency tree separately.

## Interactive depth

GSAP drives four restrained star depths and layered portrait parallax from one viewport-relative cursor position. Hero layers move in a consistent direction without proximity scaling, extra hover rotations, or label spreading. The flat molecule offers five clickable and keyboard-operable subjects: Interfaces, Systems, AI workflows, Cloud, and Delivery. Nodes stay synchronized with the tabs, with room for labels even while expanded.

Project copy and controls remain fixed. Hovering or focusing a project starts terrain tracing and an occasional shooting star for the gaming site, or line tracing for analytics. Both have a brief shimmer with a seven-second interval between passes; chart bars stay still. The career blueprint expands once while the pointer or keyboard focus is inside the career area. Moving between titles and planes does not alter that expansion. Selecting a title or plane smoothly transitions the corresponding colors. The planet is continuously scrubbed by pointer position or arrow keys, controlling surface longitude, ring angle, and lighting; Home resets its view.

`app/MotionScene.tsx` owns motion and cleanup; `app/StarField.tsx` supplies deterministic stars. `app/Molecule.tsx` and `app/StackMap.tsx` provide skill selection. `app/CareerJourney.tsx` owns the career blueprint and title selection.

Motion runs only for fine pointers with hover support and no reduced-motion preference. The motion control disables the enhanced effects. Semantic selection buttons work on touch devices and with reduced motion. All page content stays visible without JavaScript. Media-query changes and unmounts clean up listeners, tweens, and geometry.

The approved pre-motion design is preserved on `codex/cosmic-portfolio-checkpoint` at `5d0eabb`. The motion iteration lives on `codex/immersive-3d-motion`.
