# «Море Котиков» Landing Page Specification

## Objective

Создать цельный адаптивный бренд-лендинг, который повторяет композиционный язык шести референсных экранов и использует только проверяемые данные и реальные фотографии заведения. Основной результат: посетитель понимает формат, видит атмосферу, знакомится с котиками и сразу выбирает звонок, VK или маршрут.

## Verified source facts

- Название: «Море Котиков».
- Формат: котокафе-антикафе.
- Адрес: Самара, улица Дыбенко, 33А.
- Телефон: +7 (902) 299-55-43.
- Время работы по открытой карточке Яндекс Карт на 23 августа 2026: понедельник закрыто; вторник-воскресенье 13:00-20:00.
- Основные публичные каналы: VK, MAX и Яндекс Карты.
- Цены на публичных материалах могут быть устаревшими, поэтому сайт показывает их с пометкой о проверке перед визитом и ведет к прямому контакту.
- Число отзывов и оценок динамическое. Их нельзя подавать как вечные факты без даты.

## Information architecture

1. Hero: понятное обещание, реальный кот, три практических действия.
2. About: формат антикафе, реальная фотография пространства, короткие особенности.
3. Cats: фотолента с живыми кадрами и честной подписью без выдуманных биографий.
4. Inside: чай, кофе, настольные игры, книги и атмосфера.
5. Visit and rules: стоимость с оговоркой, базовые правила, доступность.
6. Social proof: аккуратные парафразы тем из отзывов и ссылка на первоисточник.
7. Contact: адрес, часы, телефон, VK, MAX, маршрут, реальный фасад.

## Visual contract

- Референсная композиция проверяется при 1672×941.
- Ключевые признаки: бумажная фактура, navy-чернила, коралловый CTA, арочные фото, контурная морская графика, низкая глубина теней, крупная литературная типографика.
- Секции не превращаются в однообразную сетку карточек.
- На 390×844 и 320×568 создается отдельный ритм: 16 px gutters, H1 38-48 px, горизонтальная фотолента с видимым следующим элементом, 44 px controls, sticky CTA без перекрытия контента.

## Interaction contract

- Якорная навигация с корректным focus management.
- Мобильное меню открывается и закрывается с клавиатуры и Escape.
- Галерея управляется кнопками, клавишами и свайпом через native scroll snap.
- Scroll reveal не скрывает контент при отключенном JavaScript и выключается для reduced motion.
- Все внешние действия используют реальные URL; фальшивой формы бронирования нет.

## Technical architecture

- Astro static output with strict TypeScript.
- React is used only for stateful islands such as navigation and gallery controls.
- CSS uses project tokens and native responsive layout.
- Optimized local WebP/AVIF imagery with width and height metadata.
- Vitest and Testing Library cover content and interactions; Playwright covers navigation, mobile menu, carousel, links and overflow.
- GitHub Actions builds and deploys the static site to GitHub Pages under `/seaofcats/`.

## Acceptance criteria

- `npm run check`, unit tests, production build and Playwright tests pass from a clean command.
- No horizontal overflow at 1672, 1440, 1024, 390 and 320 px widths.
- In-app browser screenshots exist for 1672×941, 390×844 and 320×568.
- Lighthouse-relevant basics are present: semantic HTML, metadata, canonical URL, Open Graph, responsive images and reduced motion.
- Every documentary photo has provenance; generated background is disclosed as decorative.
- Git status is clean after commit and push to `origin/main`.

## Approved deviations from reference mockups

- Mock contact details and hours are replaced with verified real details.
- The mock date/time booking form is replaced with phone and social actions because no public booking backend was confirmed.
- Desktop reference compositions are reauthored for mobile instead of scaled down.
- Cormorant-like typography is interpreted with Oranienbaum to preserve the literary shape while avoiding an overused default.
