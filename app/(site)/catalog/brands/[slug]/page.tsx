import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ProductGrid } from '@/components/catalog/ProductGrid'
import { getBrandBySlug } from '@/lib/db/brands'
import { getProductsByBrand } from '@/lib/db/products'
import { getBrandColor } from '@/lib/catalog-colors'
import { pluralize } from '@/lib/utils-text'

const ADVANTAGES = [
  'Официальный дистрибьютор — оригинальная продукция',
  'Наличие на складе в Самаре',
  'Технологическая поддержка по продуктам бренда',
  'Доставка по всему Поволжью',
]

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const brand = await getBrandBySlug(params.slug)
  if (!brand) return {}
  return {
    title: `${brand.name} в Самаре — официальный дистрибьютор`,
    description: `Полный ассортимент ${brand.name} в наличии на складе в Самаре. Оригинальная продукция. Доставка по Поволжью.`,
  }
}

export default async function BrandPage({
  params,
}: {
  params: { slug: string }
}) {
  const [brand, products] = await Promise.all([
    getBrandBySlug(params.slug),
    getProductsByBrand(params.slug),
  ])

  if (!brand) notFound()

  const accent = getBrandColor(brand.slug)

  return (
    <div className="bg-white">
      <section className="border-b border-sand bg-white px-[var(--container-px)] py-12">
        <div className="mx-auto max-w-container">
          <nav className="mb-6 flex flex-wrap gap-2 text-[11px] text-mist">
            <Link href="/catalog" className="transition-colors duration-150 hover:text-ink">
              Каталог
            </Link>
            <span aria-hidden>·</span>
            <Link
              href="/catalog/brands"
              className="transition-colors duration-150 hover:text-ink"
            >
              Производители
            </Link>
            <span aria-hidden>·</span>
            <span className="text-ink">{brand.name}</span>
          </nav>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-5 inline-flex items-center justify-center rounded-card border border-sand bg-warm px-6 py-4">
                <span className="text-xl font-black tracking-[0.04em] text-ink">
                  {brand.name}
                </span>
              </div>

              {brand.country && (
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-mist">
                  {brand.country}
                </p>
              )}

              <h1
                className="mb-4 font-black uppercase tracking-[0.02em] text-ink"
                style={{ fontSize: 'clamp(22px, 3.5vw, 48px)', lineHeight: 1 }}
              >
                {brand.name.toUpperCase()}
              </h1>

              <p className="text-sm leading-[1.65] text-stone">
                ПАНЭМ —{' '}
                <span
                  className="border-b-[1.5px] pb-px font-bold text-ink"
                  style={{ borderColor: accent }}
                >
                  официальный дистрибьютор
                </span>{' '}
                в Поволжье
              </p>
            </div>

            <Link
              href="/support#contact"
              className="inline-flex flex-shrink-0 items-center justify-center rounded-xs px-6 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-ink transition-[transform,opacity] duration-150 hover:-translate-y-px hover:opacity-90"
              style={{ background: accent }}
            >
              Запросить прайс {brand.name}
            </Link>
          </div>

          {brand.description && (
            <p className="mt-8 max-w-xl text-sm leading-[1.65] text-stone">
              {brand.description}
            </p>
          )}
        </div>
      </section>

      <section className="bg-warm px-[var(--container-px)] py-12">
        <div className="mx-auto max-w-container">
          <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.22em] text-mist">
            Почему через ПАНЭМ
          </p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {ADVANTAGES.map((point) => (
              <div key={point} className="flex items-start gap-3">
                <span
                  className="text-[13px] font-bold leading-none"
                  style={{ color: accent }}
                  aria-hidden
                >
                  ✓
                </span>
                <span className="text-[13px] leading-[1.55] text-stone">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-[var(--container-px)] py-12">
        <div className="mx-auto max-w-container">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="text-[16px] font-bold uppercase tracking-[0.06em] text-ink">
              Ассортимент
            </h2>
            <span className="text-[11px] text-mist">
              {products.length} {pluralize(products.length, ['товар', 'товара', 'товаров'])}
            </span>
          </div>
          <ProductGrid products={products} accentColor={accent} />
        </div>
      </section>
    </div>
  )
}
