import Link from 'next/link'
import type { Route } from 'next'
import { Button } from '@/components/ui/Button'
import { getCategoriesWithCounts } from '@/lib/db/categories'
import { getSegments } from '@/lib/db/segments'
import { getBrands } from '@/lib/db/brands'

function pluralize(n: number, forms: [string, string, string]) {
  const a = Math.abs(n) % 100
  const b = a % 10
  if (a > 10 && a < 20) return forms[2]
  if (b > 1 && b < 5) return forms[1]
  if (b === 1) return forms[0]
  return forms[2]
}

function SubHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-5 flex items-baseline gap-4">
      <span className="font-sub text-[8px] font-light uppercase tracking-[0.28em] text-mist">
        {label}
      </span>
      <h3 className="text-[13px] font-bold uppercase tracking-[0.06em] text-ink">
        {title}
      </h3>
      <span className="ml-2 flex-1 border-t border-sand" aria-hidden />
    </div>
  )
}

export async function CatalogEntryBlock() {
  const [categories, segments, brands] = await Promise.all([
    getCategoriesWithCounts(),
    getSegments(),
    getBrands(),
  ])

  return (
    <section className="bg-warm px-[var(--container-px)] py-16">
      <div className="mx-auto max-w-container">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <span className="mb-2 block font-sub text-[9px] font-light uppercase tracking-[0.32em] text-mist">
              К А Т А Л О Г
            </span>
            <h2
              className="font-black uppercase tracking-[0.02em] text-ink"
              style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', lineHeight: 1 }}
            >
              НАШ КАТАЛОГ
            </h2>
          </div>
          <Link
            href={'/catalog' as Route}
            className="hidden text-[9px] font-bold uppercase tracking-[0.20em] text-mist transition-colors duration-150 hover:text-ink md:block"
          >
            Весь каталог →
          </Link>
        </div>

        {/* Категории */}
        <div className="mb-12">
          <SubHeading label="0 1" title="По категории" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/catalog/category/${cat.slug}` as Route}
                className="group block rounded-card border border-sand bg-white p-4 transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 hover:shadow-card"
                style={{ borderTop: `3px solid ${`var(${cat.color})`}` }}
              >
                <span className="mb-1 block text-[12px] font-bold uppercase tracking-[0.06em] text-ink">
                  {cat.name}
                </span>
                <span className="text-[10px] text-mist">
                  {cat._count.products}{' '}
                  {pluralize(cat._count.products, ['товар', 'товара', 'товаров'])}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Сегменты */}
        <div className="mb-12">
          <SubHeading label="0 2" title="По типу бизнеса" />
          <div className="flex flex-wrap gap-2">
            {segments.map((s) => (
              <Link
                key={s.slug}
                href={`/catalog/segment/${s.slug}` as Route}
                className="inline-flex items-center gap-2 rounded-full border-[1.5px] px-4 py-2 text-[12px] font-medium text-ink transition-transform duration-200 hover:-translate-y-0.5"
                style={{ background: s.colorL2, borderColor: s.colorL1 }}
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Бренды */}
        <div>
          <SubHeading label="0 3" title="По производителю" />
          <div className="flex flex-wrap gap-2">
            {brands.map((b) => (
              <Link
                key={b.slug}
                href={`/catalog/brands/${b.slug}` as Route}
                className="rounded-card border border-sand bg-white px-4 py-3 text-[13px] font-medium text-ink transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-card"
              >
                {b.name}
                {b.country && (
                  <span className="ml-2 text-[10px] font-light text-mist">{b.country}</span>
                )}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-14 text-center">
          <p className="mx-auto max-w-[520px] text-sm text-stone">
            Не знаете, что выбрать?{' '}
            <span className="font-medium text-ink">
              Напишите задачу — технолог подберёт ингредиенты.
            </span>
          </p>
          <div className="mt-5 flex justify-center">
            <Button href={'/support#contact' as Route} variant="secondary">
              Описать задачу
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
