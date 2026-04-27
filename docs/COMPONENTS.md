# COMPONENTS.md — Библиотека компонентов

## Правила написания компонентов

- Server Component по умолчанию — `'use client'` только если нужна интерактивность
- Props строго типизированы через TypeScript interface
- Tailwind классы через `cn()` (clsx/tailwind-merge) при условных стилях
- Цвета через CSS-переменные (`style={{ borderTopColor: 'var(--c-amber)' }}`) или Tailwind-токены

---

## UI / Атомарные компоненты

### Button

```tsx
// components/ui/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
}

// Варианты:
// primary  → bg-ink text-white
// secondary→ border border-sand text-stone hover:border-ink
// accent   → bg-amber text-ink (только один на страницу)
```

### Badge

```tsx
// components/ui/Badge.tsx
// Бейдж на карточке товара: Новинка | Хит | Акция | Под заказ
interface BadgeProps {
  type: 'NEW' | 'HIT' | 'PROMO' | 'ORDER'
}
// NEW   → bg-lime text-black/65
// HIT   → bg-amber text-black/65
// PROMO → bg-rose text-black/65
// ORDER → bg-sand text-black/50
// border-radius: 2px (--r-xs), font Onest Bold 8px uppercase ls 0.18em
```

### Tag

```tsx
// components/ui/Tag.tsx
// Тег типа контента на карточке статьи
interface TagProps {
  type: 'RECIPE' | 'TECH' | 'VIDEO' | 'TREND' | 'GUIDE' | 'INTERVIEW' | 'CASE' | 'NEWS'
  children?: React.ReactNode
}
// Каждый тип → свой bg из Level 2 палитры
```

### Chip

```tsx
// components/ui/Chip.tsx
// Фильтр-чип сегмента (интерактивный — 'use client')
interface ChipProps {
  segment: string
  label: string
  colorL1: string  // "#FFB45A"
  colorL2: string  // "#FFD291"
  active?: boolean
  onClick?: () => void
}
// Active: bg colorL2 + border colorL1 + text-ink
// Default: bg-white border-sand text-stone
// border-radius: full (pill)
```

---

## Layout компоненты

### Header

```tsx
// components/layout/Header.tsx
// Server Component — данные офисов получает из БД
// Включает: RegionSwitcher (Client), Navigation, Logo, CTA

// Структура:
// [ПАНЭМ logo] [nav items] [RegionSwitcher] [btn Получить прайс]
// sticky, border-bottom: 0.5px solid sand, bg-white, z-100
```

### RegionSwitcher

```tsx
// components/layout/RegionSwitcher.tsx
'use client'
// Состояние: selectedRegion (samara | saratov | penza)
// При смене → обновляет телефон и часы в шапке
// Данные офисов получает через props от Header (Server Component)

interface RegionSwitcherProps {
  offices: Office[]  // из БД
  defaultRegion?: string
}
```

### Footer

```tsx
// components/layout/Footer.tsx
// Server Component
// 4 колонки + нижняя строка
// Все данные статичны (не из БД)
```

---

## Home компоненты

### HeroBlock

```tsx
// components/home/HeroBlock.tsx
// Server Component
// Левая часть: текст + CTA
// Правая часть: <PortraitGrid audiences={...} />
// Данные аудиторий статичны (не из БД)
```

### PortraitGrid

```tsx
// components/home/PortraitGrid.tsx
// Server Component
// Сетка 2x2: 1 tall portrait + 3 normal
// Каждый portrait: bg Level 2 цвет сегмента, декоративная буква, имя/роль

interface Portrait {
  segment: string
  colorL2: string
  name: string
  role: string
  business?: string
  tall?: boolean
}
```

### DirectionsBlock

```tsx
// components/home/DirectionsBlock.tsx
// Server Component
// 4 карточки в ряд
// Данные статичны — из константы в компоненте
// border-top L1 + bg L3 тинт для каждого направления
```

### AcademyFeedBlock

```tsx
// components/home/AcademyFeedBlock.tsx
// Server Component — запрашивает 3 последних события из БД
import { getLatestEvents } from '@/lib/db/events'

// Динамически рендерит EventCard для каждого события
```

### RegionsBlock

```tsx
// components/home/RegionsBlock.tsx
// Server Component
// Данные офисов из БД
import { getOffices } from '@/lib/db/offices'

// 3 карточки офисов
// Самара (ГО) → Amber dot
// Саратов, Пенза → Sand dot
```

---

## Catalog компоненты

### CatalogTabs

```tsx
// components/catalog/CatalogTabs.tsx
'use client'
// Три таба: По категории | По типу бизнеса | По производителю
// Управляет activeTab state
// При смене таба → показывает нужную сетку
// Синхронизирует с URL query param (?view=category)

interface CatalogTabsProps {
  categories: Category[]
  segments: Segment[]
  brands: Brand[]
}
```

### ProductCard

```tsx
// components/catalog/ProductCard.tsx
// Server Component
// Карточка товара в листинге каталога

interface ProductCardProps {
  product: Product & {
    brand: Brand | null
    category: Category
  }
}

// Структура:
// border-top 3px → цвет категории (category.color CSS-переменная)
// badge (если есть)
// фото
// производитель (mist, uppercase, small)
// название (ink, medium)
// packaging + application (stone, small)
// кнопка "Запросить цену" → открывает форму
```

### FilterChips

```tsx
// components/catalog/FilterChips.tsx
'use client'
// Фильтры по сегменту в листинге каталога
// При выборе чипа → фильтрует список товаров (через URL params или state)

interface FilterChipsProps {
  segments: Segment[]
  activeSegment?: string
  onChange: (slug: string | null) => void
}
```

### RequestPriceForm

```tsx
// components/catalog/RequestPriceForm.tsx
'use client'
// Форма запроса прайса
// Поля: Имя, Телефон, Компания, Комментарий
// Submit → POST /api/requests
// После отправки → показывает подтверждение

// Может открываться как:
// 1. Модальное окно при клике на "Запросить цену"
// 2. Inline форма в конце страницы
```

---

## Academy компоненты

### EventCard

```tsx
// components/academy/EventCard.tsx
// Server Component

interface EventCardProps {
  event: Event & { brand: Brand | null }
}

// Тип ANNOUNCEMENT:
//   Rose dot + дата + format + title + brand + [Записаться]
// Тип REPORT:
//   фото + "прошло" label + title + [Смотреть отчёт]
```

### EventFeed

```tsx
// components/academy/EventFeed.tsx
// Server Component
// Список EventCard с опциональным фильтром (All | Announcements | Reports)
// Фильтрация через URL searchParams (Server-side)
```

---

## Content компоненты

### ArticleCard

```tsx
// components/content/ArticleCard.tsx
// Server Component

interface ArticleCardProps {
  article: Article
}

// Структура:
// фото 16:9
// тег типа контента (Tag component)
// заголовок
// дата + excerpt
// ссылка "Читать →" цвет зависит от типа статьи
```

### ShoppableLink

```tsx
// components/content/ShoppableLink.tsx
'use client'
// Ссылка на товар в тексте статьи
// amber border-bottom
// hover → показывает tooltip с превью карточки товара

interface ShoppableLinkProps {
  productSlug: string
  productName: string
  children: React.ReactNode
}
```

### ContentTag

```tsx
// components/content/ContentTag.tsx
// Server Component
// Тег типа контента с цветом по типу

interface ContentTagProps {
  type: ArticleType
}

const TAG_LABELS: Record<ArticleType, string> = {
  RECIPE:    'Рецептура',
  TECH:      'Технология',
  VIDEO:     'Видео',
  TREND:     'Тренд',
  GUIDE:     'Гайд',
  INTERVIEW: 'Интервью',
  CASE:      'Кейс',
  NEWS:      'Новость',
}

const TAG_COLORS: Record<ArticleType, string> = {
  RECIPE:    'var(--c-amber-m)',
  TECH:      'var(--c-sky)',
  VIDEO:     'var(--c-peach)',
  TREND:     'var(--c-lime-m)',
  GUIDE:     'var(--c-violet-m)',
  INTERVIEW: 'var(--c-lavender)',
  CASE:      'var(--c-blue-m)',
  NEWS:      'var(--c-sand)',
}
```

---

## Утилиты

### cn() — классы с условиями

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Цвет категории → CSS-переменная

```typescript
// lib/utils.ts
export function getCategoryColor(colorVar: string): string {
  // colorVar = '--c-amber' → возвращает значение переменной
  return `var(${colorVar})`
}
```

### Форматирование даты (русский)

```typescript
// lib/utils.ts
export function formatDateRu(date: Date): string {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}
// → "15 мая 2025 г."
```
