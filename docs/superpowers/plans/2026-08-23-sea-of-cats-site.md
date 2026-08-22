# Sea of Cats Landing Page Implementation Plan

> **For Codex:** REQUIRED SUB-SKILL: Use subagent-driven-development to execute this plan task-by-task. Apply test-driven-development for behavior, verification-before-completion before claims, requesting-code-review at checkpoints, and finishing-a-development-branch for final handoff.

**Goal:** Build, visually verify, and publish a truthful, high-fidelity responsive landing page for «Море Котиков».

**Architecture:** Astro owns the static document, image pipeline and SEO. Small React islands own mobile navigation and the cat photo rail. Central content data prevents business facts from drifting between sections. A single global stylesheet implements the visual system and responsive composition.

**Tech Stack:** Astro 7, React 19, TypeScript strict, Vitest, Testing Library, Playwright, Axe, GitHub Pages.

---

## Task 1: Project foundation and red tests

**Files:** `package.json`, `astro.config.mjs`, `playwright.config.ts`, `vitest.config.ts`, `tests/unit/*`, `tests/e2e/*`

1. Add React, sitemap, check and test dependencies.
2. Write failing tests for verified facts, navigation behavior, gallery controls, public actions and 320 px overflow.
3. Run the focused suites and capture the expected red state.
4. Configure Pages base path and fixed local port 4327.

## Task 2: Asset provenance and processing

**Files:** `src/assets/images/**`, `src/assets/images/SOURCES.md`

1. Copy the selected public Yandex photographs into descriptive `.webp` files.
2. Copy the generated watercolor background and record the exact imagegen prompt.
3. Extract the mascot from the supplied reference and evaluate local background removal. Keep it only if the transparent edge quality improves the header.
4. Record each asset source and documentary/generated classification.

## Task 3: Data and document shell

**Files:** `src/data/site.ts`, `src/layouts/BaseLayout.astro`, `src/styles/global.css`, `src/components/ui/*`

1. Centralize verified contact data, opening hours, links and gallery metadata.
2. Implement metadata, JSON-LD, skip link, header, footer and responsive tokens.
3. Make unit tests for data and semantic structure green.

## Task 4: Hero and narrative sections

**Files:** `src/components/sections/Hero.astro`, `About.astro`, `Inside.astro`

1. Recreate the reference proportions with real photos and restrained nautical art.
2. Preserve alternating desktop composition and custom mobile ordering.
3. Add progressive reveal hooks without hiding content when JavaScript is absent.

## Task 5: Stateful navigation and cat rail

**Files:** `src/components/ui/SiteNavigation.tsx`, `CatRail.tsx`, `src/components/sections/Cats.astro`

1. Implement accessible menu state, Escape close and anchor behavior.
2. Implement scroll-snap rail with previous/next controls and live status.
3. Make interaction tests green.

## Task 6: Rules, social proof and contact

**Files:** `src/components/sections/Visit.astro`, `Reviews.astro`, `Contact.astro`

1. Present price context honestly with a verification note.
2. Use review-theme paraphrases with a direct Yandex link.
3. Implement phone, VK, MAX and route actions, hours and facade image.

## Task 7: Page assembly and motion

**Files:** `src/pages/index.astro`, `src/scripts/reveal.ts`, `src/styles/global.css`

1. Assemble one semantic page in the approved order.
2. Add scroll reveal and hover transitions using transform and opacity only.
3. Implement reduced-motion and sticky mobile CTA behavior.

## Task 8: Deployment and documentation

**Files:** `.github/workflows/pages.yml`, `README.md`

1. Add reproducible install, check, test, build and fixed-port preview commands.
2. Add GitHub Pages workflow for `/seaofcats/`.
3. Document data provenance, local URL and verification matrix.

## Task 9: Visual refinement and independent review

1. Run the site on `http://127.0.0.1:4327/seaofcats/`.
2. Inspect and capture 1672×941, 1440×900, 1024×768, 390×844 and 320×568 in the in-app browser.
3. Compare composition, typography, crop and rhythm with the six references.
4. Run independent design and code reviewers; fix all critical and important findings.

## Task 10: Final verification and publication

1. Run fresh check, unit, build and Playwright commands.
2. Run `git diff --check`, inspect status and ensure no secrets or temp assets are tracked.
3. Commit the completed site and push `main` to `origin`.
4. Verify the remote commit and Pages workflow state, then report exact evidence and approved deviations.
