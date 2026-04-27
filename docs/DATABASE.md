# DATABASE.md — Схема базы данных

## Модели Prisma

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── КАТАЛОГ ───────────────────────────────────────────────

model Category {
  id          Int       @id @default(autoincrement())
  slug        String    @unique
  name        String
  description String?
  color       String    // CSS-переменная: --c-amber, --c-rose и т.д.
  sortOrder   Int       @default(0)
  isActive    Boolean   @default(true)
  products    Product[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@map("categories")
}

model Segment {
  id          Int       @id @default(autoincrement())
  slug        String    @unique
  name        String              // "Пекарня и кулинария"
  description String?
  colorL1     String              // "#FFB45A"
  colorL2     String              // "#FFD291"
  colorL3     String              // "#FCF0C8"
  icon        String?
  sortOrder   Int       @default(0)
  isActive    Boolean   @default(true)
  products    Product[] @relation("ProductSegments")
  createdAt   DateTime  @default(now())

  @@map("segments")
}

model Brand {
  id          Int       @id @default(autoincrement())
  slug        String    @unique
  name        String
  description String?
  country     String?
  logoUrl     String?
  websiteUrl  String?
  categoryId  Int?                // Основная категория → наследует цвет
  category    Category? @relation(fields: [categoryId], references: [id])
  products    Product[]
  events      Event[]             // Мастер-классы производителя
  sortOrder   Int       @default(0)
  isActive    Boolean   @default(true)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@map("brands")
}

model Product {
  id            Int       @id @default(autoincrement())
  slug          String    @unique
  name          String
  description   String?
  application   String?             // Применение: "темперирование, покрытие"
  packaging     String?             // Фасовка: "2,5 кг / 10 кг"
  imageUrl      String?
  isActive      Boolean   @default(true)
  isFeatured    Boolean   @default(false)
  badge         BadgeType?          // NEW | HIT | PROMO | null
  sortOrder     Int       @default(0)

  // Связи
  categoryId    Int
  category      Category  @relation(fields: [categoryId], references: [id])
  brandId       Int?
  brand         Brand?    @relation(fields: [brandId], references: [id])
  segments      Segment[] @relation("ProductSegments")
  articles      Article[] @relation("ArticleProducts")
  events        Event[]   @relation("EventProducts")

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  @@map("products")
}

enum BadgeType {
  NEW
  HIT
  PROMO
}

// ─── АКАДЕМИЯ ──────────────────────────────────────────────

model Event {
  id          Int         @id @default(autoincrement())
  slug        String      @unique
  title       String
  description String?
  type        EventType               // ANNOUNCEMENT | REPORT
  format      String?                 // "Мастер-класс" / "Семинар" / "Курс"
  date        DateTime?
  location    String?                 // "Демо-центр Самара"
  expertName  String?
  imageUrl    String?
  isPublished Boolean     @default(false)
  sortOrder   Int         @default(0)

  // Связи
  brandId     Int?
  brand       Brand?      @relation(fields: [brandId], references: [id])
  products    Product[]   @relation("EventProducts")

  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  @@map("events")
}

enum EventType {
  ANNOUNCEMENT
  REPORT
}

// ─── КОНСАЛТИНГ ────────────────────────────────────────────

model Case {
  id          Int       @id @default(autoincrement())
  slug        String    @unique
  title       String                  // "Снизили себестоимость на 18%"
  result      String?                 // "-18%" / "47 дней" / "+23%"
  client      String?                 // Тип клиента без названия
  segmentSlug String?                 // Ссылка на сегмент
  task        String?                 // Задача
  solution    String?                 // Решение
  body        String?                 // Полный текст кейса (markdown)
  imageUrl    String?
  isPublished Boolean   @default(false)
  sortOrder   Int       @default(0)

  // Связи с товарами
  products    Product[] @relation("CaseProducts")

  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@map("cases")
}

// ─── МЕДИА / СТАТЬИ ────────────────────────────────────────

model Article {
  id          Int           @id @default(autoincrement())
  slug        String        @unique
  title       String
  excerpt     String?
  body        String?                 // Markdown / HTML
  type        ArticleType
  imageUrl    String?
  isPublished Boolean       @default(false)
  publishedAt DateTime?
  sortOrder   Int           @default(0)

  // Связанные товары (shoppable)
  products    Product[]     @relation("ArticleProducts")

  // Тег сегмента
  segmentSlug String?

  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt

  @@map("articles")
}

enum ArticleType {
  RECIPE        // Рецептура (shoppable)
  TECH          // Технологическая статья
  VIDEO         // Видео-техника
  TREND         // Разбор тренда
  GUIDE         // Гайд / чек-лист
  INTERVIEW     // Интервью участника клуба
  DIGEST        // Дайджест отрасли
  NEWS          // Новость компании
}

// ─── КОМПАНИЯ И РЕГИОНЫ ────────────────────────────────────

model Office {
  id        Int    @id @default(autoincrement())
  slug      String @unique              // samara | saratov | penza
  city      String                      // "Самара"
  region    String                      // "Самарская область"
  address   String
  phone     String
  schedule  String                      // "Пн–Чт 9:00–17:00, Пт 9:00–16:00"
  isHq      Boolean @default(false)     // Головной офис
  sortOrder Int     @default(0)

  @@map("offices")
}

model Testimonial {
  id        Int     @id @default(autoincrement())
  name      String
  role      String                      // "Менеджер по закупкам"
  company   String                      // "Ресторанная компания Поляна"
  segment   String?                     // "restaurant"
  body      String
  isActive  Boolean @default(true)
  sortOrder Int     @default(0)

  @@map("testimonials")
}
```

---

## Seed данные для демо

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

  // ── КАТЕГОРИИ ──
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'bakery' },
      update: {},
      create: {
        slug: 'bakery',
        name: 'Хлебопекарное',
        description: 'Смеси, дрожжи, мука, улучшители',
        color: '--c-amber',
        sortOrder: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'confectionery' },
      update: {},
      create: {
        slug: 'confectionery',
        name: 'Кондитерское',
        description: 'Смеси, кремы, начинки, украшения',
        color: '--c-rose',
        sortOrder: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'chocolate' },
      update: {},
      create: {
        slug: 'chocolate',
        name: 'Шоколад и какао',
        description: 'Шоколад, глазурь, какао-порошок',
        color: '--c-amber',
        sortOrder: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'dairy' },
      update: {},
      create: {
        slug: 'dairy',
        name: 'Молочное',
        description: 'Молоко, сливки, сыры, творог',
        color: '--c-sky',
        sortOrder: 4,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'drinks' },
      update: {},
      create: {
        slug: 'drinks',
        name: 'Для напитков',
        description: 'Базы, топпинги, альтернативное молоко',
        color: '--c-blue',
        sortOrder: 5,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'decoration' },
      update: {},
      create: {
        slug: 'decoration',
        name: 'Декорирование',
        description: 'Красители, посыпки, фигурки, покрытия',
        color: '--c-coral',
        sortOrder: 6,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'packaging' },
      update: {},
      create: {
        slug: 'packaging',
        name: 'Упаковка',
        description: 'Коробки, пакеты, посуда, расходники',
        color: '--c-teal',
        sortOrder: 7,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'inventory' },
      update: {},
      create: {
        slug: 'inventory',
        name: 'Инвентарь',
        description: 'Формы, насадки, коврики, трафареты',
        color: '--c-violet',
        sortOrder: 8,
      },
    }),
  ])

  // ── СЕГМЕНТЫ ──
  await Promise.all([
    prisma.segment.upsert({
      where: { slug: 'bakery-shop' },
      update: {},
      create: {
        slug: 'bakery-shop',
        name: 'Пекарня и кулинария',
        colorL1: '#FFB45A', colorL2: '#FFD291', colorL3: '#FCF0C8',
        sortOrder: 1,
      },
    }),
    prisma.segment.upsert({
      where: { slug: 'confectionery-shop' },
      update: {},
      create: {
        slug: 'confectionery-shop',
        name: 'Кондитерская',
        colorL1: '#F582A0', colorL2: '#FAC3D2', colorL3: '#FFE1DC',
        sortOrder: 2,
      },
    }),
    prisma.segment.upsert({
      where: { slug: 'restaurant' },
      update: {},
      create: {
        slug: 'restaurant',
        name: 'Ресторан и кафе',
        colorL1: '#6EA5AA', colorL2: '#AFE6C3', colorL3: '#D2FAE6',
        sortOrder: 3,
      },
    }),
    prisma.segment.upsert({
      where: { slug: 'coffee-shop' },
      update: {},
      create: {
        slug: 'coffee-shop',
        name: 'Кофейня',
        colorL1: '#5A8CD7', colorL2: '#A5D2DC', colorL3: '#D7F0F5',
        sortOrder: 4,
      },
    }),
    prisma.segment.upsert({
      where: { slug: 'burger' },
      update: {},
      create: {
        slug: 'burger',
        name: 'Бургерная и фастфуд',
        colorL1: '#FF967D', colorL2: '#FFCBB5', colorL3: '#FFE1DC',
        sortOrder: 5,
      },
    }),
    prisma.segment.upsert({
      where: { slug: 'canteen' },
      update: {},
      create: {
        slug: 'canteen',
        name: 'Столовая и корппит',
        colorL1: '#7D78DC', colorL2: '#BEB4FA', colorL3: '#E6F0FF',
        sortOrder: 6,
      },
    }),
  ])

  // ── БРЕНДЫ ──
  const barryCallebaut = await prisma.brand.upsert({
    where: { slug: 'barry-callebaut' },
    update: {},
    create: {
      slug: 'barry-callebaut',
      name: 'Barry Callebaut',
      description: 'Мировой лидер по производству шоколада и какао. Официальный дистрибьютор — ПАНЭМ.',
      country: 'Бельгия',
      sortOrder: 1,
    },
  })
  const backaldrin = await prisma.brand.upsert({
    where: { slug: 'backaldrin' },
    update: {},
    create: {
      slug: 'backaldrin',
      name: 'Backaldrin',
      description: 'Высококачественные ингредиенты для хлебопекарной и кондитерской отрасли с 1964 года.',
      country: 'Австрия',
      sortOrder: 2,
    },
  })
  const lesaffre = await prisma.brand.upsert({
    where: { slug: 'lesaffre' },
    update: {},
    create: {
      slug: 'lesaffre',
      name: 'Lesaffre / Саф-Нева',
      description: 'Ключевой мировой игрок в области ферментации и хлебопекарных дрожжей.',
      country: 'Франция',
      sortOrder: 3,
    },
  })
  const lactalis = await prisma.brand.upsert({
    where: { slug: 'lactalis' },
    update: {},
    create: {
      slug: 'lactalis',
      name: 'Lactalis',
      description: 'Профессиональные молочные продукты для бариста, кондитеров и шеф-поваров.',
      country: 'Франция',
      sortOrder: 4,
    },
  })

  // ── ТОВАРЫ (демо) ──
  const chocolateCategory = categories.find(c => c.slug === 'chocolate')!
  const bakeryCategory = categories.find(c => c.slug === 'bakery')!
  const dairyCategory = categories.find(c => c.slug === 'dairy')!

  await Promise.all([
    prisma.product.upsert({
      where: { slug: 'barry-callebaut-dark-70' },
      update: {},
      create: {
        slug: 'barry-callebaut-dark-70',
        name: 'Шоколад тёмный 70%',
        description: 'Кувертюр для темперирования, покрытия и выпечки. Насыщенный вкус, стабильная текстура.',
        application: 'Темперирование · Покрытие · Выпечка · Горячие напитки',
        packaging: '2,5 кг / 10 кг',
        badge: 'HIT',
        categoryId: chocolateCategory.id,
        brandId: barryCallebaut.id,
        sortOrder: 1,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'backaldrin-brotchen-mix' },
      update: {},
      create: {
        slug: 'backaldrin-brotchen-mix',
        name: 'Смесь для булочек Brötchen',
        description: 'Готовая смесь для производства мягких пшеничных булочек. Стабильный результат в любую смену.',
        application: 'Булочки · Хот-доги · Бургерные булки',
        packaging: '25 кг',
        badge: 'HIT',
        categoryId: bakeryCategory.id,
        brandId: backaldrin.id,
        sortOrder: 1,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'lesaffre-saf-instant' },
      update: {},
      create: {
        slug: 'lesaffre-saf-instant',
        name: 'Дрожжи Саф-Инстант',
        description: 'Инстантные хлебопекарные дрожжи с высокой подъёмной силой. Не требуют предварительной активации.',
        application: 'Хлеб · Булочки · Сдоба',
        packaging: '500 г / 10 кг',
        categoryId: bakeryCategory.id,
        brandId: lesaffre.id,
        sortOrder: 2,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'lactalis-professional-cream' },
      update: {},
      create: {
        slug: 'lactalis-professional-cream',
        name: 'Сливки 33% профессиональные',
        description: 'Сливки для взбивания с устойчивой пеной. Идеальны для десертов, кремов и горячих напитков.',
        application: 'Крем · Десерты · Латте-арт',
        packaging: '1 л / 10 л',
        badge: 'NEW',
        categoryId: dairyCategory.id,
        brandId: lactalis.id,
        sortOrder: 1,
      },
    }),
  ])

  // ── СОБЫТИЯ АКАДЕМИИ ──
  await Promise.all([
    prisma.event.upsert({
      where: { slug: 'barry-callebaut-masterclass-may' },
      update: {},
      create: {
        slug: 'barry-callebaut-masterclass-may',
        title: 'Мастер-класс: Работа с шоколадом Barry Callebaut',
        description: 'Темперирование, покрытие, декор. Практические техники от технолога производителя.',
        type: 'ANNOUNCEMENT',
        format: 'Мастер-класс',
        date: new Date('2025-05-15T10:00:00'),
        location: 'Демо-центр ПАНЭМ, Самара',
        expertName: 'Технолог Barry Callebaut',
        brandId: barryCallebaut.id,
        isPublished: true,
      },
    }),
    prisma.event.upsert({
      where: { slug: 'lesaffre-seminar-april-report' },
      update: {},
      create: {
        slug: 'lesaffre-seminar-april-report',
        title: 'Семинар Lesaffre: ферментация и закваски — фотоотчёт',
        description: 'Как прошёл апрельский семинар по работе с заквасками. Фото, инсайты, участники.',
        type: 'REPORT',
        format: 'Семинар',
        date: new Date('2025-04-10T10:00:00'),
        location: 'Демо-центр ПАНЭМ, Самара',
        expertName: 'Технолог Lesaffre',
        brandId: lesaffre.id,
        isPublished: true,
      },
    }),
  ])

  // ── КЕЙСЫ КОНСАЛТИНГА ──
  await prisma.case.upsert({
    where: { slug: 'bakery-cost-reduction-18' },
    update: {},
    create: {
      slug: 'bakery-cost-reduction-18',
      title: 'Снизили себестоимость хлеба на 18% в сети из 12 пекарен',
      result: '−18%',
      client: 'Сеть из 12 пекарен, Самарская область',
      segmentSlug: 'bakery-shop',
      task: 'Себестоимость продукции росла быстрее выручки. Три разных поставщика давали нестабильное качество.',
      solution: 'Провели аудит рецептур, перевели хлебопекарные смеси на Backaldrin, настроили единый прайс, технолог выехал на производство.',
      isPublished: true,
    },
  })

  // ── ОФИСЫ ──
  await Promise.all([
    prisma.office.upsert({
      where: { slug: 'samara' },
      update: {},
      create: {
        slug: 'samara',
        city: 'Самара',
        region: 'Самарская область',
        address: 'Корсунский пер., 14',
        phone: '+7 (846) 321-20-20',
        schedule: 'Пн–Чт 9:00–17:00, Пт 9:00–16:00',
        isHq: true,
        sortOrder: 1,
      },
    }),
    prisma.office.upsert({
      where: { slug: 'saratov' },
      update: {},
      create: {
        slug: 'saratov',
        city: 'Саратов',
        region: 'Саратовская область',
        address: 'Ново-Астраханское шоссе, 81/5',
        phone: '+7 (8452) 39-54-85',
        schedule: 'Пн–Пт 9:00–18:00',
        isHq: false,
        sortOrder: 2,
      },
    }),
    prisma.office.upsert({
      where: { slug: 'penza' },
      update: {},
      create: {
        slug: 'penza',
        city: 'Пенза',
        region: 'Пензенская область',
        address: 'ул. Ростовская, 1а',
        phone: '+7 (8412) 99-61-01',
        schedule: 'Пн–Пт 8:00–17:00',
        isHq: false,
        sortOrder: 3,
      },
    }),
  ])

  // ── ОТЗЫВЫ ──
  await Promise.all([
    prisma.testimonial.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Виктория Артищева',
        role: 'Менеджер по закупкам',
        company: 'Ресторанная компания Поляна',
        segment: 'restaurant',
        body: 'Сотрудничество с данной компанией — настоящее удовольствие! Оперативная обработка заказа, приветливые менеджеры, отличное качество товаров.',
        sortOrder: 1,
      },
    }),
    prisma.testimonial.upsert({
      where: { id: 2 },
      update: {},
      create: {
        name: 'Вадим Деревянко',
        role: 'Владелец',
        company: 'Кондитерская компания D-Mur',
        segment: 'confectionery-shop',
        body: 'Работаем с ПАНЭМ с 2022 года. Индивидуальная ценовая политика на сырьё позволила нам выдержать маржинальную модель даже в кризисные периоды.',
        sortOrder: 2,
      },
    }),
    prisma.testimonial.upsert({
      where: { id: 3 },
      update: {},
      create: {
        name: 'Александр Редькин',
        role: 'Помощник управляющего',
        company: 'Сеть кофеен Mosaic coffee & tea',
        segment: 'coffee-shop',
        body: 'Широкий ассортимент, поставки всегда вовремя. Устраивают полезные мероприятия, комфортный офис.',
        sortOrder: 3,
      },
    }),
  ])

  console.log('✅ Seed завершён')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

---

## Команды

```bash
# Создать миграцию (после изменения schema.prisma)
npx prisma migrate dev --name название

# Применить миграции на проде
npx prisma migrate deploy

# Обновить Prisma Client
npx prisma generate

# Заполнить тестовыми данными
npx prisma db seed

# Открыть Prisma Studio
npx prisma studio

# Сбросить БД и запустить seed заново (только dev!)
npx prisma migrate reset
```

---

## package.json — добавить seed конфиг

```json
{
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

Или через tsx:
```json
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```
