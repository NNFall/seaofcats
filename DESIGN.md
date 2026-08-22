# Море Котиков Design System

## 1. Overview

Лендинг строится как шесть связанных разворотов спокойной иллюстрированной книги. В основе лежат пользовательские референсы: теплый бумажный фон, глубокие синие чернила, коралловый акцент, арочные фотографии, тонкая морская графика и воздух между сценами.

Physical scene: человек вечером открывает сайт на телефоне, выбирая место на завтра; экран должен давать ощущение дневного света, бумаги и безопасного тихого пространства.

Color strategy: committed. Синий несет структуру и типографику, коралловый занимает только ключевые действия и небольшие графические акценты, бумажные оттенки формируют большую часть поверхности.

## 2. Color Palette

Все рабочие токены задаются в OKLCH.

- Paper: `oklch(0.965 0.012 82)`
- Paper warm: `oklch(0.93 0.028 73)`
- Mist: `oklch(0.91 0.025 235)`
- Navy ink: `oklch(0.36 0.09 242)`
- Navy deep: `oklch(0.285 0.083 241)`
- Muted ink: `oklch(0.49 0.045 238)` (darkened to meet 4.5:1 on paper at small sizes)
- Coral: `oklch(0.55 0.145 39)` (accessible primary fill while preserving the warm orange accent)
- Coral hover: `oklch(0.49 0.16 36)`
- Hairline: `oklch(0.84 0.025 235)`

## 3. Typography

- Display: Oranienbaum, выразительный русский антиквенный шрифт с поддержкой кириллицы. Он ближе к литературному рисунку референсов и менее шаблонен, чем Cormorant.
- UI and body: Manrope, спокойный гуманистический гротеск с высокой читаемостью на мобильных.
- Hero H1: `clamp(3rem, 6.1vw, 6.35rem)`, line-height 0.9.
- Section H2: `clamp(2.65rem, 5vw, 5.25rem)`, line-height 0.95.
- Body: `clamp(1rem, 1.2vw, 1.25rem)`, line-height 1.6, max-width 68ch.
- Microcopy is never all caps except very short navigation or status labels.

## 4. Layout

- Reference viewport: 1672×941.
- Maximum content width: 1504 px, side gutters `clamp(1rem, 5vw, 5.5rem)`.
- Section spacing varies between 96 and 180 px on desktop, 72 and 112 px on mobile.
- Desktop compositions intentionally alternate: copy/photo, photo/copy, then full-width narrative scenes.
- Mobile is separately composed, not merely stacked. Cards reveal a partial next item, contact actions become thumb-friendly, ornamental lines are reduced.
- Grid and normal flow are preferred over absolute positioning. Decorative art may escape the grid but never control document height.

## 5. Components

- Header: wordmark, concise anchors, coral booking CTA; condensed mobile menu with explicit accessible label.
- Buttons: pill silhouette, 56 px desktop and at least 48 px mobile; coral primary, outlined navy secondary.
- Image frames: large arch for emotional scenes, soft asymmetric radius for documentary details.
- Cat rail: horizontal snap carousel on mobile, controlled rail on desktop, real photos and descriptive alt text.
- Rules: numbered editorial list with thin dividers, no repeated icon cards.
- Contact scene: practical information beside a real facade image, always exposes phone, VK and route without a fake booking form.

## 6. Motion

- One coordinated initial reveal for hero copy and image.
- Scroll reveal uses opacity and transform only, ease-out-quint, 560 to 760 ms.
- Hover uses small image scale or underline travel, never layout movement.
- Slider transitions preserve keyboard and touch control.
- `prefers-reduced-motion: reduce` removes transforms, smooth scrolling and autoplay-like behavior.

## 7. Imagery

- Documentary imagery comes only from visually checked public Yandex/VK sources and is recorded in `src/assets/images/SOURCES.md`.
- Generated imagery is limited to background texture or clearly decorative art, never presented as the actual venue or cats.
- One decisive real cat portrait leads the hero. Interior, tea station, visitors and facade support later sections.
- Photo treatment stays natural: modest crop, no heavy color filters, no invented detail.

## 8. Accessibility

- Minimum AA contrast for all meaningful text.
- Visible `:focus-visible` outline with offset.
- Skip link, semantic landmarks and exactly one H1.
- Controls have text or accessible names; decorative SVGs are hidden from assistive technology.
- 320 px viewport has no horizontal overflow.
