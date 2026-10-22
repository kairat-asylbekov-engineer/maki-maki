@AGENTS.md

# Maki Maki — контекст проекта

Демо-сайт доставки суши «Maki Maki» для показа клиенту. Данные моковые, бэкенда нет.
Общаемся с владельцем проекта на русском; тексты сайта — на русском.

- Прод (демо): https://maki-maki-sushi.netlify.app — Netlify деплоит автоматически из `main`
- Образец, который копируем: шаблон Megagroup https://sushi-roll-shop-online.oml.ru (главная, `/magazin`, `/about`, `/oplata`, `/dostavka`, `/otzyvy`, `/akcii`, `/contacts`, `/magazin/product/...`, `/magazin/cart`). PDF-макет главной — это тот же шаблон в масштабе 0.75 (1440 → 1080). WebFetch его не читает (robots), смотреть через браузер. Тексты шаблона не копируем дословно — пишем свои под Maki Maki

## Стек

- Next.js 16 (App Router, `cacheComponents` + `partialPrefetching` включены в `next.config.ts`), React 19, TypeScript
- Tailwind CSS v4 — конфиг в CSS (`src/app/globals.css`: `@theme`, `@utility`), файла `tailwind.config` нет
- Шрифты через `@fontsource` (импорт в `src/app/layout.tsx`): **Unbounded** — заголовки (`font-display`), **Onest** — текст (`font-sans`). Именно эти шрифты в макете — не менять
- Иконки — `lucide-react`; свои SVG (VK, OK, Telegram, коробка доставки) — `src/components/ui/icons.tsx`

## Страницы

Все страницы статические (`generateStaticParams`), пути на английском:

| Страница | Аналог в шаблоне | Файл |
|---|---|---|
| `/` главная | `/` | `app/page.tsx` (по PDF-макету) |
| `/catalog` | `/magazin` | чипы разделов + модалка «Фильтр» (`CatalogView`) |
| `/catalog/[category]`, `/catalog/[category]/[sub]` | `/magazin/folder/...` | `components/catalog/CategoryPage.tsx`, розовые чипы подразделов |
| `/product/[id]` | `/magazin/product/...` | галерея, порция, цена справа, описание, параметры, отзыв, «Похожие», «Рекомендуемые» |
| `/cart` | `/magazin/cart` | `components/cart/CartPage.tsx`: позиции, доставка, форма, итог, промокод (`MAKI10`) |
| `/about`, `/payment`, `/delivery`, `/reviews`, `/promo`, `/promo/[slug]`, `/contacts` | `/about`, `/oplata`, `/dostavka`, `/otzyvy`, `/akcii`, `/contacts` | тексты — `src/data/pages.ts` |

- **Шапка** (`components/layout/SiteHeader.tsx`) — общая, в `layout.tsx`, лежит поверх страницы (`absolute`). Логотип уезжает при прокрутке, плашка меню + «В корзине: N» закреплены (`fixed`), ниже `lg` — бургер. Поэтому у страниц верхний отступ: у внутренних — `PageShell` (`pt-[104px] lg:pt-[134px]`), у главной — спейсер в `Hero`
- **Каркас внутренних страниц** — `PageShell`: крошки, `h1`, контент, общий подвал `SiteFooter` (баннеры контактов + copyright + «наверх»). `width="narrow"` — текстовые страницы (`container-narrow`, 840px)
- Next 16 с `cacheComponents` держит предыдущие страницы скрытыми в DOM (React Activity) — в Playwright-тестах используйте `:visible`

## Главное правило: главная = макет пиксель в пиксель

- Макет сделан на ширине **1080px**; высота страницы на 1080px должна оставаться **4386px** (±1px). Если правите главную — проверьте это скриншотом (Playwright) и не «округляйте» отступы
- Значения вроде `lg:pt-[87px]`, `text-[15.5px]`, `rounded-[22px]` сняты с макета — это не мусор, не заменять на ближайшие классы Tailwind
- Контейнеры повторяют сетку макета (см. `globals.css`): `container-main` 996px · `container-hero` 1042px · `container-wide` 1050px (баннеры) · `container-contact` 1016px. На больших экранах растут до предела
- Цвета — токены: `accent #ff5b4a`, `page #f7f3f2`, `cream #fdf6f2`, `ink`, `muted`, `skeleton`. Новые цвета — через `@theme`, а не хардкодом
- Ниже `lg` — своя адаптивная вёрстка (мобайл/планшет): там свободнее, но фон-фото с текстом сверху получают подложку-градиент для читаемости

## Данные (моки)

- `src/data/site.ts` — город, валюта, телефон, адрес, часы, реквизиты, соцсети, пункты меню (`navLinks`), тексты секций главной, отзывы, `formatPrice`
- `src/data/menu.ts` — категории с подразделами и все товары. У товара `options` (варианты порции, первый — по умолчанию, цена берётся из варианта, `oldPrice` → бейдж скидки), состав, ккал, БЖУ, метки `hit | new | spicy | veg | baked | promo` (цвета — `tagColors`). «Популярное сегодня» и «Ролл дня» берут товары отсюда по `id`
- `src/data/pages.ts` — тексты «О нас», «Оплата», «Доставка» (зоны и цены — моки), акции, промокоды
- В тексте шаблона макета город — Москва, валюта — ₽. Реальные данные клиента ещё не получены — уточнить у владельца, прежде чем менять

## Картинки

- `public/images/` — фото из макета (hero, категории, баннеры, аватары), `logo.webp` — логотип клиента (жёлтый «Maki Maki»), `src/app/icon.png` — фавикон
- `public/images/menu/` — фото товаров каталога, **временно вырезанные из фото макета** (поэтому некоторые похожи). В рабочей версии заменить на реальные фото меню
- Использовать `next/image` с `sizes`

## Корзина (демо)

`src/components/cart/` — контекст `useCart()` (`add(product, qty, option)`, `setQty`, `remove`, `clear`, сумма, `hydrated`) и тост «добавлен в корзину» со ссылкой на `/cart`. Позиция = товар + вариант порции. Хранится в `localStorage` (ключ `maki-maki-cart-v2`, обёрнуто в try/catch). Формы (`DemoForm`, заказ) ничего не отправляют — показывают демо-подтверждение. Карты — iframe Яндекс-виджета (`MapEmbed`, координаты в `site.mapCenter`).

## Проверка перед коммитом

```bash
npm run build   # генерирует типы маршрутов (LayoutProps); до первой сборки tsc ругается на LayoutProps
npx tsc --noEmit
npm run lint
```

## Открытые вопросы / что дальше

- Нужны реальные данные клиента: город, адрес, телефон, часы, реквизиты, зоны и цены доставки, меню и фото блюд
- Отправка заказов/отзывов (например, в Telegram-бот) и онлайн-оплата — не подключены
- Зоны доставки на карте не нарисованы — сейчас обычная карта + карточки зон
- В подвале макета была строка «Создание сайтов… megagroup.kz» из шаблона — убрана намеренно
