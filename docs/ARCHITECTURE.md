# ARCHITECTURE.md — Структура проекта

## Стек

| Слой | Технология | Версия | Зачем |
|---|---|---|---|
| Фронтенд | Next.js App Router | 14 | SSR/SSG, SEO, routing |
| Язык | TypeScript | 5 | Типизация везде |
| Стили | Tailwind CSS | 3 | Утилитарный CSS, токены |
| БД | PostgreSQL | 15 | Реляционные данные, полнотекстовый поиск |
| ORM | Prisma | 5 | Типизированные запросы, миграции |
| Runtime | Node.js | 20 LTS | JavaScript на сервере |
| Процессы | PM2 | latest | Автозапуск, кластеризация |
| Proxy | Nginx | latest | SSL, роутинг, кэш статики |

---

## Структура папок

```
panem/
├── app/
│   ├── (site)/                     # Группа публичного сайта
│   │   ├── layout.tsx              # Корневой layout с Header/Footer
│   │   ├── page.tsx                # Главная страница
│   │   ├── catalog/
│   │   │   ├── page.tsx            # Каталог — три входа
│   │   │   ├── category/
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx    # Страница категории
│   │   │   ├── segment/
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx    # Страница сегмента бизнеса
│   │   │   └── brands/
│   │   │       ├── page.tsx        # Все производители
│   │   │       └── [slug]/
│   │   │           └── page.tsx    # Страница бренда
│   │   ├── academy/
│   │   │   ├── page.tsx
│   │   │   └── events/
│   │   │       └── [slug]/
│   │   │           └── page.tsx
│   │   ├── consulting/
│   │   │   ├── page.tsx
│   │   │   └── cases/
│   │   │       └── [slug]/
│   │   │           └── page.tsx
│   │   ├── club/
│   │   │   └── page.tsx
│   │   ├── support/
│   │   │   └── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   └── media/
│   │       ├── page.tsx
│   │       └── [slug]/
│   │           └── page.tsx
│   ├── (admin)/                    # Группа админки CMS
│   │   └── admin/
│   │       ├── layout.tsx
│   │       ├── page.tsx            # Dashboard
│   │       ├── products/
│   │       │   ├── page.tsx        # Список товаров
│   │       │   ├── new/page.tsx    # Новый товар
│   │       │   └── [id]/page.tsx   # Редактирование
│   │       ├── events/
│   │       ├── cases/
│   │       └── articles/
│   └── api/
│       ├── products/
│       │   └── route.ts
│       ├── events/
│       │   └── route.ts
│       └── articles/
│           └── route.ts
│
├── components/
│   ├── ui/                         # Атомарные компоненты
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Tag.tsx
│   │   ├── Chip.tsx
│   │   └── Divider.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── RegionSwitcher.tsx
│   ├── home/
│   │   ├── HeroBlock.tsx
│   │   ├── PortraitGrid.tsx
│   │   ├── DirectionsBlock.tsx
│   │   ├── CatalogEntryBlock.tsx
│   │   ├── AcademyFeedBlock.tsx
│   │   ├── ConsultingClubBlock.tsx
│   │   ├── SupportBlock.tsx
│   │   ├── TestimonialsBlock.tsx
│   │   ├── RegionsBlock.tsx
│   │   └── FinalCtaBlock.tsx
│   ├── catalog/
│   │   ├── CatalogTabs.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── CategoryCard.tsx
│   │   ├── SegmentCard.tsx
│   │   ├── BrandCard.tsx
│   │   ├── FilterChips.tsx
│   │   └── RequestPriceForm.tsx
│   ├── academy/
│   │   ├── EventCard.tsx
│   │   └── EventFeed.tsx
│   ├── consulting/
│   │   ├── CaseCard.tsx
│   │   └── CaseGrid.tsx
│   └── content/
│       ├── ArticleCard.tsx
│       ├── ContentTag.tsx
│       └── ShoppableLink.tsx
│
├── lib/
│   ├── prisma.ts                   # Prisma client singleton
│   ├── db/
│   │   ├── products.ts             # Запросы товаров
│   │   ├── categories.ts           # Запросы категорий
│   │   ├── brands.ts               # Запросы брендов
│   │   ├── events.ts               # Запросы событий
│   │   ├── cases.ts                # Запросы кейсов
│   │   └── articles.ts             # Запросы статей
│   └── utils.ts
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── public/
│   └── images/
│
├── styles/
│   └── globals.css
│
├── docs/                           # Документация проекта
│   ├── ARCHITECTURE.md             # этот файл
│   ├── DESIGN_SYSTEM.md
│   ├── CONTENT.md
│   ├── DATABASE.md
│   ├── DEPLOY.md
│   └── COMPONENTS.md
│
├── .env.local                      # Локальные переменные (не в git)
├── .env.example                    # Пример переменных (в git)
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── CLAUDE.md                       # Главный файл для Claude Code
└── deploy.sh                       # Скрипт деплоя
```

---

## Prisma Client — singleton

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

---

## Паттерны запросов к БД

Все запросы — в `/lib/db/*.ts`. Компоненты не импортируют Prisma напрямую.

```typescript
// lib/db/products.ts
import { prisma } from '@/lib/prisma'

export async function getProductsByCategory(categorySlug: string) {
  return prisma.product.findMany({
    where: {
      category: { slug: categorySlug },
      isActive: true,
    },
    include: { brand: true, category: true },
    orderBy: { sortOrder: 'asc' },
  })
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      brand: true,
      category: true,
      articles: { take: 3 },
      events: { take: 2 },
    },
  })
}
```

```typescript
// app/(site)/catalog/category/[slug]/page.tsx
import { getProductsByCategory } from '@/lib/db/products'

export default async function CategoryPage({
  params,
}: {
  params: { slug: string }
}) {
  const products = await getProductsByCategory(params.slug)
  // ...
}
```

---

## Server vs Client Components

```
Server Component (по умолчанию):
  ✓ Страницы (page.tsx)
  ✓ Layout (layout.tsx)
  ✓ Компоненты которые только рендерят данные
  ✓ Запросы к БД

Client Component ('use client'):
  ✓ Формы с состоянием (RequestPriceForm, FilterChips)
  ✓ Региональный переключатель (useState)
  ✓ Табы каталога (CatalogTabs)
  ✓ Shoppable tooltip (hover state)
  ✓ Мобильное меню
```

---

## Metadata и SEO

```typescript
// app/(site)/catalog/category/[slug]/page.tsx
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug)

  return {
    title: `${category.name} оптом в Самаре | ПАНЭМ`,
    description: `${category.description} Доставка по Поволжью. Технологическая поддержка 24/7.`,
    openGraph: {
      title: `${category.name} | ПАНЭМ`,
      images: [category.ogImage ?? '/og-default.jpg'],
    },
  }
}
```

---

## Переменные окружения

```env
# .env.example — копируй в .env.local для разработки

# База данных
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/panem_db"

# Next.js
NODE_ENV=development
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here

# Публичные (доступны на клиенте)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_REGION_DEFAULT=samara
```

---

## Конфиг Next.js

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    domains: ['panem.swipeandev.ru'],
  },
  experimental: {
    typedRoutes: true,
  },
}

export default config
```

---

## .gitignore

```
node_modules/
.next/
.env.local
.env.production
*.log
.DS_Store
```
