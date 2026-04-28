import Link from 'next/link'
import type { Route } from 'next'
import { Button } from '@/components/ui/Button'
import { BrandsGrid } from './BrandsGrid'
import { pluralizeRu } from '@/lib/utils'

type Category = {
  slug: string
  name: string
  count: number
  color: string
  subs: string[]
}

const CATEGORIES: Category[] = [
  {
    slug: 'food-ingredients',
    name: 'Пищевые ингредиенты',
    count: 769,
    color: 'var(--c-rose)',
    subs: [
      'Аром-продукты',
      'Готовая еда',
      'Кондитерские крема и сливки',
      'Дрожжи',
      'Консервация и соусы',
      'Молочные продукты',
      'Кондитерские смеси',
      'Мороженое',
      'Мука',
      'Орехи, семечки, сухофрукты, пасты',
      'Масла для жарки и фритюра',
      'Пищевые добавки',
      'Начинки пастообразные и кремовые',
      'Фруктовые и ягодные начинки, пюре',
      'Сыры',
      'Хлебопекарные смеси',
    ],
  },
  {
    slug: 'chocolate',
    name: 'Шоколад и какао-продукты',
    count: 125,
    color: 'var(--c-amber)',
    subs: [
      'Глазурь шоколадная',
      'Горячий шоколад',
      'Какао-масло',
      'Какао-порошок',
      'Термостабильные капли',
      'Формы и инвентарь для шоколада',
      'Шоколад',
      'Шоколадный декор',
    ],
  },
  {
    slug: 'inventory',
    name: 'Инвентарь',
    count: 95,
    color: 'var(--c-violet)',
    subs: [
      'Для выпечки',
      'Для работы с мастикой',
      'Мелкий инвентарь',
      'Металлические и пластиковые формы',
      'Насадки и кондитерские мешки',
      'Поликарбонатные формы',
      'Силиконовые формы и коврики',
      'Трафареты',
    ],
  },
  {
    slug: 'decoration',
    name: 'Декорирование',
    count: 94,
    color: 'var(--c-coral)',
    subs: [
      'Мастика, марципан',
      'Несъедобный декор',
      'Пищевые красители',
      'Покрытия',
      'Посыпки',
      'Фигурки съедобные',
    ],
  },
  {
    slug: 'packaging',
    name: 'Упаковка',
    count: 74,
    color: 'var(--c-teal)',
    subs: [
      'Коробки',
      'Ленты атласные и декоративные',
      'Пакеты',
      'Посуда для десертов',
      'Расходники',
    ],
  },
  {
    slug: 'drinks',
    name: 'Для напитков',
    count: 19,
    color: 'var(--c-blue)',
    subs: ['Базы для напитков', 'Горячий шоколад (напитки)', 'Молоко альтернативное'],
  },
]

type Brand = { slug: string; name: string; bio: string }

const BRANDS: Brand[] = [
  {
    slug: 'backaldrin',
    name: 'Backaldrin',
    bio: 'Компания Backaldrin, основанная в 1964 году, предлагает высококачественные ингредиенты и разрабатывает инновационные идеи для хлебопекарной и кондитерской отрасли по всему миру.',
  },
  {
    slug: 'csm-ingredients',
    name: 'CSM Ingredients',
    bio: 'Ведущий производитель ингредиентов высочайшего качества более чем в 120 странах: маргарины и жиры, кондитерские ингредиенты, продукты для хлебобулочной, молочной, немолочной промышленности и производства мороженого.',
  },
  {
    slug: 'lesaffre',
    name: 'Lesaffre / Саф-Нева',
    bio: 'Lesaffre — ключевой мировой игрок в области ферментации.',
  },
  {
    slug: 'barry-callebaut',
    name: 'Barry Callebaut',
    bio: 'Мировой лидер по производству высококачественного шоколада, глазурей и какао. Партнёр, который вдохновляет и поддерживает новыми идеями и продуктовыми решениями.',
  },
  {
    slug: 'supermuka',
    name: 'СуперМука',
    bio: 'Бренд «СуперМука» занимает лидирующую позицию на российском рынке по производству специализированных видов муки и мучных смесей.',
  },
  {
    slug: 'art-ko',
    name: 'Арт-Ко',
    bio: 'Российский производитель ингредиентов для хлебопечения.',
  },
  {
    slug: 'bakelab',
    name: 'BakeLab',
    bio: 'Российская компания BakeLab — производитель кондитерских смесей, агентов и кремов.',
  },
  {
    slug: 'invi',
    name: 'ИНВИ',
    bio: 'Компания «ИНВИ» предлагает профессиональный инвентарь для пекарей и кондитеров.',
  },
  {
    slug: 'lactalis',
    name: 'Lactalis',
    bio: 'Группа компаний Lactalis уже почти 100 лет создаёт лучшие молочные продукты по всему миру и поддерживает тех, кто творит шедевры: бариста, кондитеров, пекарей, шефов.',
  },
  {
    slug: 'doronichi',
    name: 'Дороничи',
    bio: 'FOODZAVOD — инновационный для России завод по производству готовых блюд.',
  },
  {
    slug: 'osq-group',
    name: 'OSQ Group',
    bio: 'Один из крупнейших российских производителей потребительской картонной упаковки для ресторанного бизнеса, ретейла и пищевых производств.',
  },
  {
    slug: 'ilyinskoye-95',
    name: 'ПК «Ильинское 95»',
    bio: '«Ильинское 95» — производственный комбинат с богатой историей и традициями.',
  },
  {
    slug: 'berta',
    name: 'Берта',
    bio: 'Группа компаний «Берта» — крупнейший российский производитель продукции для хлебопекарной и кондитерской промышленности.',
  },
  {
    slug: 'erkonprodukt',
    name: 'Эрконпродукт',
    bio: 'ЭРКОНПРОДУКТ — крупный производитель сгущённого молока и начинок для кондитерской и хлебопекарной продукции.',
  },
  {
    slug: 'ekomilk',
    name: 'Экомилк',
    bio: 'Визитная карточка «Экомилк» — сливочное масло, которое миллионы семей ценят за нежный молочный вкус и исключительно натуральный состав.',
  },
  {
    slug: 'sparta',
    name: 'Спарта',
    bio: '«Спарта» — один из ведущих российских производителей продукции для кондитерской промышленности.',
  },
  {
    slug: 'egida-povolzhye',
    name: 'Эгида Поволжье',
    bio: 'Завод компании «Эгида Поволжье» — одно из самых новейших производств России с современным оборудованием и технологиями.',
  },
  {
    slug: 'alekseevsky-mkk',
    name: 'Алексеевский молочноконсервный комбинат',
    bio: 'ЗАО «Алексеевский молочноконсервный комбинат» — российский лидер по объёмам производства молочных консервов.',
  },
  {
    slug: 'fabrika-sladkogo-dekora',
    name: 'Фабрика сладкого декора',
    bio: 'Российский производитель и поставщик ингредиентов для хлебозаводов, пекарен, кондитерских и предприятий HoReCa.',
  },
]

function SubHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-8 flex items-baseline gap-4">
      <span className="font-sub text-[10px] font-bold uppercase tracking-[0.22em] text-stone">
        {label}
      </span>
      <h3 className="text-[14px] font-bold uppercase tracking-[0.06em] text-ink">
        {title}
      </h3>
      <span className="ml-2 flex-1 border-t border-sand" aria-hidden />
    </div>
  )
}

export function CatalogEntryBlock() {
  return (
    <section className="bg-warm px-[var(--container-px)] py-20 md:py-24">
      <div className="mx-auto max-w-container">
        <div className="mb-14 flex items-end justify-between gap-6">
          <div>
            <span className="mb-3 block font-sub text-[10px] font-bold uppercase tracking-[0.22em] text-stone">
              Познакомьтесь с нашим ассортиментом
            </span>
            <h2
              className="font-black uppercase tracking-[0.02em] text-ink"
              style={{ fontSize: 'var(--type-h2)', lineHeight: 1 }}
            >
              Каталог ПАНЕМ
            </h2>
          </div>
          <Link
            href={'/catalog' as Route}
            className="hidden flex-shrink-0 text-[11px] font-bold uppercase tracking-[0.20em] text-stone transition-colors duration-150 hover:text-ink md:block"
          >
            Весь каталог →
          </Link>
        </div>

        {/* Категории с подкатегориями */}
        <div className="mb-20">
          <SubHeading label="01" title="По категориям" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {CATEGORIES.map((cat) => (
              <article
                key={cat.slug}
                className="group/card flex flex-col rounded-card border border-sand bg-white p-7 transition-[box-shadow,border-color] duration-300 ease-out hover:border-stone/30 hover:shadow-[0_18px_36px_-12px_rgba(0,0,0,0.18)]"
                style={{ borderTop: `3px solid ${cat.color}` }}
              >
                <div className="mb-5 flex items-baseline justify-between gap-3">
                  <Link
                    href={`/catalog/category/${cat.slug}` as Route}
                    className="group/title transition-colors duration-200"
                  >
                    <h4
                      className="font-black uppercase text-ink transition-colors duration-200 group-hover/title:text-stone"
                      style={{
                        fontSize: 'clamp(20px, 2vw, 28px)',
                        lineHeight: 1.05,
                        letterSpacing: '-0.005em',
                      }}
                    >
                      {cat.name}
                    </h4>
                  </Link>
                  <span className="flex-shrink-0 text-[12px] font-medium tabular-nums text-stone">
                    {cat.count}{' '}
                    {pluralizeRu(cat.count, ['товар', 'товара', 'товаров'])}
                  </span>
                </div>

                <ul className="flex flex-1 flex-wrap gap-x-1.5 gap-y-1.5 text-[13px] leading-snug">
                  {cat.subs.map((sub, i) => (
                    <li key={sub} className="inline">
                      <Link
                        href={`/catalog/category/${cat.slug}` as Route}
                        className="text-stone underline-offset-[3px] transition-colors duration-150 hover:text-ink hover:underline decoration-2"
                        style={{ textDecorationColor: cat.color }}
                      >
                        {sub}
                      </Link>
                      {i < cat.subs.length - 1 && (
                        <span
                          aria-hidden
                          className="ml-1.5 select-none"
                          style={{ color: cat.color }}
                        >
                          ·
                        </span>
                      )}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/catalog/category/${cat.slug}` as Route}
                  className="group/cta mt-6 inline-flex items-center gap-1.5 self-start text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-200"
                  style={{ color: cat.color }}
                >
                  <span>Перейти к категории</span>
                  <span
                    aria-hidden
                    className="transition-transform duration-300 ease-out group-hover/cta:translate-x-1.5"
                  >
                    →
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Производители */}
        <div className="mb-16">
          <SubHeading label="02" title="По производителям" />
          <BrandsGrid brands={BRANDS} />
        </div>

        <div className="text-center">
          <p className="mx-auto mb-6 max-w-[560px] text-base leading-relaxed text-stone">
            Не знаете, что выбрать?{' '}
            <span className="font-medium text-ink">
              Напишите задачу — технолог подберёт ингредиенты.
            </span>
          </p>
          <div className="flex justify-center">
            <Button href={'/support#contact' as Route} variant="secondary">
              Описать задачу
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
