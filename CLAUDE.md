# CLAUDE.md — ПАНЭМ · Главный файл проекта

**Репозиторий:** https://github.com/iTGRA/panem  
**Домен:** https://panem.swipeandev.ru  
**Стек:** Next.js 14 · TypeScript · PostgreSQL 15 · Prisma · Tailwind CSS

---

## КОМАНДА АГЕНТОВ

Проект реализуется пятью специализированными агентами.  
Перед задачей определи роль и читай соответствующий файл из `/docs`.

---

### АГЕНТ 01 · ARCHITECT
**Задачи:** структура файлов, роутинг, схема БД, API, Server/Client разграничение.

**Правила:**
- App Router везде. Pages Router запрещён.
- Server Components по умолчанию. `'use client'` только при необходимости (формы, useState, useEffect).
- Все запросы к БД только через `/lib/db/*.ts` — никогда в компонентах напрямую.
- Типизация везде. `any` запрещён.
- Читать: `ARCHITECTURE.md`, `DATABASE.md`

---

### АГЕНТ 02 · UI_BUILDER
**Задачи:** создание React-компонентов, вёрстка блоков страниц.

**Правила — без отклонений:**
- **Читать `DESIGN_SYSTEM.md` перед созданием любого компонента.**
- Цвета только через `var(--c-*)` или Tailwind-токены из конфига.
- Шрифт Onest везде. Exo 2 ТОЛЬКО для дескрипторов суббрендов.
- Фон страниц: белый `#FFFFFF`. Warm `#F0EBE0` только для чередования.
- border-radius: кнопки 2px · карточки товаров 6px · портреты 10px.
- Максимум 2 L1-акцента на странице.
- Hover карточки: `translateY(-2px)` + `var(--shadow-card)`.
- `@media (prefers-reduced-motion: reduce)` на все анимации.
- **После создания — пройти чеклист из DESIGN_SYSTEM.md раздел 9.**
- Читать: `DESIGN_SYSTEM.md`, `COMPONENTS.md`

---

### АГЕНТ 03 · CONTENT_BUILDER
**Задачи:** наполнение страниц, тексты, SEO-метатеги, seed-данные.

**Правила:**
- Тексты только из `CONTENT.md`. Не придумывать.
- Данные компании (цифры, адреса, телефоны) из `CONTENT.md` и `DATABASE.md`.
- Если данных нет → ставить `[УТОЧНИТЬ У КЛИЕНТА: ...]`.
- SEO строго по шаблонам из `CONTENT.md`.
- Читать: `CONTENT.md`, `CATALOG.md`

---

### АГЕНТ 04 · QA_CRITIC
**Задачи:** проверка результата ПЕРЕД завершением каждой задачи.

**Чеклист — проверять каждый блок:**

Визуальный:
- [ ] Белый фон? Warm только для чередования? Два warm подряд — ошибка.
- [ ] border-top цвет соответствует категории/направлению?
- [ ] Максимум 2 L1-акцента на странице?
- [ ] Onest везде, Exo 2 только у суббренда?
- [ ] Кнопки border-radius: 2px?
- [ ] Hover на карточках: translateY(-2px)?

Технический:
- [ ] Нет `any` в TypeScript?
- [ ] Нет Prisma в компонентах напрямую?
- [ ] Server/Client разграничение правильное?
- [ ] Нет `console.log` в коде?
- [ ] Alt-текст на изображениях?
- [ ] Семантический HTML (h1-h6, nav, main, section)?

**Если найдена проблема** → записать в раздел INCIDENTS, исправить, закрыть.

---

### АГЕНТ 05 · DEVOPS
**Задачи:** деплой, миграции, PM2, Nginx, переменные окружения.

**Правила:**
- Порядок деплоя строго: `migrate deploy` → `build` → `pm2 restart`
- После деплоя проверять: `pm2 logs panem --lines 50`
- Читать: `DEPLOY.md`, `SERVER_SETUP.md`

---

## ПОРЯДОК РЕАЛИЗАЦИИ

```
Фаза 1  INFRA      SERVER_SETUP.md         VDS готов ✓
Фаза 2  DATABASE   DATABASE.md             schema + seed
Фаза 3  DS_BASE    DESIGN_SYSTEM.md        globals.css + tailwind
Фаза 4  /lab       LAB (см. ниже)          ← ОБЯЗАТЕЛЬНО ПЕРЕД ГЛАВНОЙ
Фаза 5  LAYOUT     COMPONENTS.md           Header + Footer + Nav
Фаза 6  HOME       CONTENT.md              Главная блок за блоком
Фаза 7  CATALOG    CATALOG.md              Три представления
Фаза 8  ACADEMY    CONTENT.md              Академия
Фаза 9  REST       CONTENT.md              Консалтинг, Клуб, About
Фаза 10 CMS        COMPONENTS.md           Базовая админка
```

**ВАЖНО:** Фаза 4 (/lab) — обязательный шаг перед главной страницей.  
Все компоненты тестируются на /lab, получают одобрение, потом идут в продакшн.

---

## СТРАНИЦА /lab

### Назначение

`/lab` — изолированная страница-витрина всех компонентов дизайн-системы.

- `robots: noindex`
- Существует в dev и staging
- Новый компонент → сначала на /lab → проверка → потом в продакшн
- Служит живой документацией для дизайнера и разработчика

### Метаданные

```typescript
// app/(site)/lab/page.tsx
export const metadata = {
  title: 'Design Lab | ПАНЭМ',
  robots: { index: false, follow: false },
}
```

### Структура /lab — секции в порядке

```
01 ЦВЕТА
   Нейтральные (6 чипов): ink / stone / mist / sand / warm / white
   Level 1 (10 чипов): все насыщенные + hex
   Level 2 (11 чипов): все средние + hex
   Level 3 (9 чипов): все тинты + hex
   Кодирование: таблица направления → цвета L1/L2/L3
   Кодирование: таблица сегменты → цвета

02 ТИПОГРАФИКА
   Display (Onest Black 900, clamp 48-96px)
   H1 (Bold 700, uppercase, трекинг)
   H2 (Bold 700, uppercase)
   H3 (Bold 700)
   Subtitle (Medium 500)
   Body (Regular 400, 16px, lh 1.65)
   Body-sm (Regular 400, 14px)
   Caption (Light 300, 12px)
   Label (Bold 700, 10px, uppercase, ls 0.28em)
   Descriptor (Exo 2 Light, 10px, ls 0.32em)
   Контраст Bold + Light в заголовке (пример из брендбука)

03 КНОПКИ
   btn-primary (ink фон) — default + hover
   btn-secondary (border) — default + hover
   btn-accent (amber) — с пометкой "только один на странице"

04 КАРТОЧКИ НАПРАВЛЕНИЙ
   Все 4: Ингредиенты / Академия / Консалтинг / Клуб
   Правильные L1 border-top + L3 фон + дескриптор Exo 2

05 ПОРТРЕТЫ АУДИТОРИЙ
   6 сегментов: Пекарня/Кондитер/Ресторан/Кофейня/Бургер/Столовая
   Tall (2 ряда) + Normal
   Правильные L2 фоны + декоративная буква

06 КАРТОЧКИ ТОВАРОВ
   4 примера с разными категориями и border-top цветами
   С бейджами: NEW + HIT + PROMO
   Без бейджа

07 ФИЛЬТРЫ-ЧИПЫ (сегменты)
   Все 6 сегментов в ряд
   Default → Hover → Active состояния

08 ТЕГИ КОНТЕНТА
   Все 8 типов: RECIPE/TECH/VIDEO/TREND/GUIDE/INTERVIEW/CASE/NEWS

09 БЕЙДЖИ
   Новинка (lime) / Хит (amber) / Акция (rose) / Под заказ (sand)

10 SHOPPABLE ССЫЛКА
   Абзац текста с 2-3 shoppable ссылками
   Hover → tooltip-превью карточки

11 КАРТОЧКИ СТАТЕЙ
   3 примера разных типов (RECIPE / CASE / TREND)

12 ЧЕРЕДОВАНИЕ СЕКЦИЙ
   Демо: white → warm → white → ink
   Показывает правильный ритм страницы

13 ФОРМА ЗАПРОСА ЦЕНЫ
   Все поля: Имя / Телефон / Компания / Комментарий
   Валидация + состояние отправки

14 HEADER / NAVIGATION
   Header в изоляции
   RegionSwitcher (переключение Самара/Саратов/Пенза)
   Dropdown меню каталога

15 MOTION
   Appear animation (scroll-triggered)
   Hover states на карточках
   Dropdown появление
   Tooltip появление
```

### Рабочий процесс с /lab

```
Новый компонент создан
  ↓
Добавить на /lab в нужную секцию
  ↓
АГЕНТ 04 (QA) проверяет по чеклисту
  ↓
Визуально ок + технически ок
  ↓
Использовать в продакшн-страницах
```

---

## INCIDENTS — ЖУРНАЛ ОШИБОК И РЕШЕНИЙ

> **QA-агент** пишет сюда каждый инцидент.  
> **Все агенты** читают этот раздел ПЕРЕД началом работы.  
> Журнал — живой. Обновляется с каждым инцидентом.

### Формат записи

```
### [ДАТА] · [VISUAL / TECH / PERF / SEO / DB]
**Проблема:** что не работало / выглядело неправильно
**Где:** файл или компонент
**Решение:** что сделали
**Правило на будущее:** что добавить в практику
```

---

### Известные ограничения стека

```
### TECH · Next.js 14 + Tailwind
Проблема: CSS-переменные недоступны в Tailwind без обёртки
Решение: использовать style={{ borderTopColor: 'var(--c-amber)' }}
  для динамических цветов, которые нельзя описать в tailwind.config
Правило: динамические цвета (из БД) → inline style с var()
          статические цвета (компонент знает цвет заранее) → Tailwind класс

### TECH · Prisma + Next.js dev mode
Проблема: множественные экземпляры PrismaClient в dev режиме → предупреждения
Решение: singleton паттерн в lib/prisma.ts (уже реализован в ARCHITECTURE.md)
Правило: не создавать new PrismaClient() нигде кроме lib/prisma.ts

### TECH · Server Component + Client Component
Проблема: попытка использовать useState в Server Component → ошибка
Решение: добавить 'use client' только к интерактивным компонентам
Правило: фильтры, формы, переключатели → 'use client'
          всё остальное → Server Component по умолчанию
```

---

### 2026-04-27 · DB · Prisma schema — недостающие inverse-relations в DATABASE.md
**Проблема:** В `DATABASE.md` модель `Case` объявляет `products Product[] @relation("CaseProducts")`, но в модели `Product` нет обратной стороны связи. Аналогично у `Brand.categoryId` есть `category Category?`, но у `Category` не было `brands Brand[]`. Без обратных сторон Prisma валидация падает.
**Где:** `prisma/schema.prisma`
**Решение:** Добавлены `cases Case[] @relation("CaseProducts")` в Product и `brands Brand[]` в Category.
**Правило на будущее:** При копировании схемы из DATABASE.md проверять, что у каждого `@relation(...)` есть обе стороны.

### 2026-04-27 · TECH · Prisma 7 ломает datasource.url
**Проблема:** `npm install prisma` ставит 7.x, где `url = env("DATABASE_URL")` в schema.prisma больше не поддерживается (требуется prisma.config.ts + adapter).
**Где:** установка зависимостей в Фазе 2.
**Решение:** Закреплён Prisma 5.22 (`prisma@^5 @prisma/client@^5`) — соответствует ARCHITECTURE.md.
**Правило на будущее:** При установке `prisma`/`@prisma/client` использовать `^5` явно, пока не переезжаем на новую конфигурацию.

### 2026-04-27 · TECH · Prisma CLI читает .env, не .env.local
**Проблема:** `npx prisma migrate dev` падал с "Environment variable not found: DATABASE_URL", т.к. CLI не подхватывает `.env.local`.
**Где:** локальная разработка.
**Решение:** Создан отдельный `.env` с `DATABASE_URL` (для CLI). `.env.local` остался для Next.js dev.
**Правило на будущее:** для prisma cli держать `DATABASE_URL` в `.env`. Альтернатива — `dotenv -e .env.local -- prisma ...`.

### 2026-04-27 · DEPLOY · Next.js игнорирует PORT из .env.production
**Проблема:** `pm2 start npm -- start` поднимал Next.js на дефолтном `:3000`, хотя в `.env.production` стоит `PORT=13717`. Nginx падал в 502.
**Где:** первый деплой на VDS.
**Решение:** Передавать `PORT` явно при `pm2 start`: `PORT=13717 pm2 start npm --name panem -- start`. После первого старта PM2 хранит env, `pm2 restart panem` его наследует.
**Правило на будущее:** `PORT` читается до загрузки `.env*` в Next.js. Любые server-level переменные (PORT, HOSTNAME) только через PM2 env или ecosystem.config.

### 2026-04-27 · TECH · Дублирование `title` при использовании title.template
**Проблема:** В `(site)/layout.tsx` стоит `title.template: '%s | ПАНЭМ'`, а на странице `/lab` было `title: 'Design Lab | ПАНЭМ'` → итоговый `<title>` стал `'Design Lab | ПАНЭМ | ПАНЭМ'`.
**Где:** `app/(site)/lab/page.tsx`.
**Решение:** В дочерних страницах оставить только базовое имя (`title: 'Design Lab'`), template сам добавит `| ПАНЭМ`. Для absolute-заголовков использовать `title: { absolute: '...' }`.
**Правило на будущее:** на дочерних страницах писать короткие имена; полный suffix даёт layout-level template.

### 2026-04-27 · TECH · useSearchParams требует Suspense при prerender
**Проблема:** `npm run build` падал с `useSearchParams() should be wrapped in a suspense boundary at page "/catalog"`. Next.js 14 не может пререндерить статически страницу с клиентским `useSearchParams`, если она не обёрнута в `<Suspense>`.
**Где:** `app/(site)/catalog/page.tsx` + `components/catalog/CatalogTabs.tsx`.
**Решение:** Завернул `<CatalogTabs>` в `<Suspense fallback={...}>` на серверной странице. Fallback — стартовый таб (CategoryGrid), чтобы не было пустоты до гидрации.
**Правило на будущее:** любой клиентский компонент с `useSearchParams`/`usePathname` на статически рендерящейся странице должен быть в `<Suspense>`. Альтернатива — `export const dynamic = 'force-dynamic'` на странице.

### 2026-04-27 · TECH · Layout с html/body конфликтует с root layout
**Проблема:** Промпт Фазы 5 предлагал в `app/(site)/layout.tsx` обернуть всё в `<html><body>`. У нас уже есть `app/layout.tsx` с html/body и `next/font/google` — два html → React duplicate root warning + ломает фонты.
**Где:** Фаза 5.
**Решение:** Корневой `app/layout.tsx` держит `<html>`, `<body>` и шрифты. `(site)/layout.tsx` — простой Fragment-wrapper с `<Header /><main>{children}</main><Footer />` и собственными metadata.title.template.
**Правило на будущее:** В Next.js App Router `<html>/<body>` живут только в самом верхнем layout. Под-layouts route-групп — без html/body.

### 2026-04-27 · DEPLOY · deploy.sh не подгружал .env.production
**Проблема:** На сервере `.env.production` (из `.gitignore`), а Prisma CLI и `next build` читают только `.env`. На Фазе 8 деплой упал на `npx prisma migrate deploy`: `Environment variable not found: DATABASE_URL`. Затем `next build` падал с теми же `Export encountered errors` для всех страниц со SSR-обращениями к БД.
**Где:** `deploy.sh`.
**Решение:** В начало скрипта добавлен `set -a; source .env.production; set +a` (с `if [ -f ]`). Это экспортирует переменные в окружение шелла, и Prisma + Next.js их видят.
**Правило на будущее:** На сервере держим прод-конфиг в `.env.production`, но любой инструмент, который запускается из shell-скрипта (Prisma, build), видит env только если её принудительно экспортировать. `deploy.sh` сам отвечает за загрузку `.env.production`.

### 2026-04-27 · DEVOPS · `npm run build` уводит шаред-VDS в timeout
**Проблема:** Во время первого деплоя (правка HeroBlock) сервер на минуту перестал пинговаться сразу после `next build`. PM2 не мог рестартнуть, пришлось ждать восстановления.
**Где:** `/var/www/panem` на шаред-VDS (4 соседних SSR-сайта).
**Решение:** Дождаться восстановления, рестартнуть руками. Сама сборка прошла успешно, проблема в пиковом потреблении памяти Next.js.
**Правило на будущее:** На шаред-VDS пик `next build` может вытолкнуть процессы соседей (или себя) в OOM. Если деплой в окно, когда соседи активны — лучше избегать. Долгосрочно — рассмотреть `NODE_OPTIONS=--max-old-space-size=512` или сборку на CI с деплоем готового `.next`.

---

## БЫСТРЫЕ КОМАНДЫ

```bash
# Разработка
npm run dev                              # запуск локально

# База данных
npx prisma migrate dev --name [name]    # создать миграцию
npx prisma migrate deploy               # применить на прод
npx prisma generate                     # обновить клиент
npx prisma db seed                      # заполнить данными
npx prisma studio                       # визуальный редактор

# Продакшн
npm run build
./deploy.sh
pm2 logs panem --lines 50
pm2 restart panem
```

---

## ДОКУМЕНТАЦИЯ ПРОЕКТА

```
SERVER_SETUP.md     — развёртывание VDS (разовый)
CLAUDE.md           — этот файл (читать всегда)

docs/
├── ARCHITECTURE.md  — структура, роутинг, паттерны
├── DESIGN_SYSTEM.md — цвета, типографика, компоненты, motion
├── CONTENT.md       — тексты страниц, SEO
├── CATALOG.md       — каталог: три представления, SEO
├── DATABASE.md      — Prisma схема, seed данные
├── DEPLOY.md        — деплой, git workflow
└── COMPONENTS.md    — спецификации компонентов
```

**Правило #1:** читай нужный файл перед задачей. Не работай по памяти.  
**Правило #2:** при инциденте → записать в INCIDENTS → исправить → продолжить.  
**Правило #3:** /lab перед продакшном. Всегда.
