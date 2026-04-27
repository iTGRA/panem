import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { ProductGrid } from '@/components/catalog/ProductGrid'
import { FilterChips } from '@/components/catalog/FilterChips'
import { getCategoryBySlug } from '@/lib/db/categories'
import { getProductsByCategory } from '@/lib/db/products'
import { getSegments } from '@/lib/db/segments'
import { getCategoryColor } from '@/lib/catalog-colors'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const cat = await getCategoryBySlug(params.slug)
  if (!cat) return {}
  return {
    title: `${cat.name} оптом в Самаре`,
    description: `${cat.description ?? cat.name}. Доставка по Поволжью. Технологическая поддержка 24/7. Запросите прайс.`,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string }
}) {
  const [cat, products, segments] = await Promise.all([
    getCategoryBySlug(params.slug),
    getProductsByCategory(params.slug),
    getSegments(),
  ])

  if (!cat) notFound()

  const accent = getCategoryColor(cat.slug)

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
              href="/catalog?view=category"
              className="transition-colors duration-150 hover:text-ink"
            >
              По категории
            </Link>
            <span aria-hidden>·</span>
            <span className="text-ink">{cat.name}</span>
          </nav>

          <div className="border-l-[3px] pl-6" style={{ borderColor: accent }}>
            <h1
              className="font-black uppercase tracking-[0.02em] text-ink"
              style={{ fontSize: 'clamp(24px, 4vw, 52px)', lineHeight: 1 }}
            >
              {cat.name.toUpperCase()}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-[1.65] text-stone">
              {cat.description ??
                `${products.length} наименований от ведущих производителей. Доставка по Поволжью.`}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-[var(--container-px)] py-10">
        <div className="mx-auto max-w-container">
          <FilterChips segments={segments} />
          <div className="mt-8">
            <ProductGrid products={products} accentColor={accent} />
          </div>
        </div>
      </section>

      <section className="bg-warm px-[var(--container-px)] py-12">
        <div className="mx-auto flex max-w-container flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="mb-1 text-sm font-bold text-ink">Не нашли нужный ингредиент?</p>
            <p className="text-sm leading-[1.6] text-stone">
              Опишите задачу — технолог подберёт под вашу рецептуру.
            </p>
          </div>
          <Button href="/support#contact" variant="primary">
            Описать задачу технологу
          </Button>
        </div>
      </section>
    </div>
  )
}
