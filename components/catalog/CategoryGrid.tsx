import Link from 'next/link'
import type { Category } from '@prisma/client'
import { getCategoryColor } from '@/lib/catalog-colors'
import { pluralize } from '@/lib/utils-text'

type CategoryWithCount = Category & { _count: { products: number } }

export function CategoryGrid({ categories }: { categories: CategoryWithCount[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/catalog/category/${cat.slug}`}
          className="block rounded-card border border-sand bg-white p-4 transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 hover:shadow-card"
          style={{ borderTop: `3px solid ${getCategoryColor(cat.slug)}` }}
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
  )
}
