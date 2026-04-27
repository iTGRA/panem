import Link from 'next/link'
import type { Brand } from '@prisma/client'
import { getBrandColor } from '@/lib/catalog-colors'
import { pluralize } from '@/lib/utils-text'

type BrandWithCount = Brand & { _count: { products: number } }

export function BrandGrid({ brands }: { brands: BrandWithCount[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {brands.map((brand) => (
        <Link
          key={brand.slug}
          href={`/catalog/brands/${brand.slug}`}
          className="block rounded-card border border-sand bg-white p-5 transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 hover:shadow-card"
          style={{ borderTop: `3px solid ${getBrandColor(brand.slug)}` }}
        >
          <span className="mb-1 block text-[13px] font-bold text-ink">
            {brand.name}
          </span>
          {brand.country && (
            <span className="block text-[10px] uppercase tracking-[0.18em] text-mist">
              {brand.country}
            </span>
          )}
          <span className="mt-1 block text-[10px] text-mist">
            {brand._count.products}{' '}
            {pluralize(brand._count.products, ['товар', 'товара', 'товаров'])}
          </span>
        </Link>
      ))}
    </div>
  )
}
