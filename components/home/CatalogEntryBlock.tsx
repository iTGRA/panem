import Link from 'next/link'
import type { Route } from 'next'
import { Button } from '@/components/ui/Button'
import { BrandsGrid } from './BrandsGrid'
import { pluralizeRu } from '@/lib/utils'
import { CATEGORIES, BRANDS } from '@/lib/data/catalog'


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
