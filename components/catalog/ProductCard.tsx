import Link from 'next/link'
import Image from 'next/image'
import type { Product, Brand, Category, Segment } from '@prisma/client'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { getCategoryColor } from '@/lib/catalog-colors'

type ProductWithRelations = Product & {
  brand: Brand | null
  category: Category
  segments: Segment[]
}

export function ProductCard({
  product,
  accentColor,
}: {
  product: ProductWithRelations
  accentColor?: string
}) {
  const borderColor = accentColor ?? getCategoryColor(product.category.slug)

  return (
    <article
      className="group relative flex flex-col rounded-card border border-sand bg-white shadow-card transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 hover:shadow-dropdown"
      style={{ borderTop: `3px solid ${borderColor}` }}
    >
      {product.badge && (
        <div className="absolute right-3 top-3 z-10">
          <Badge type={product.badge} />
        </div>
      )}

      <div
        className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-warm rounded-t-[5px]"
      >
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={300}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-[11px] text-mist">Фото</span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        {product.brand && (
          <Link
            href={`/catalog/brands/${product.brand.slug}`}
            className="mb-1 block text-[10px] font-bold uppercase tracking-[0.20em] text-mist transition-colors duration-150 hover:text-ink"
          >
            {product.brand.name}
          </Link>
        )}

        <h3 className="mb-2 flex-1 text-[14px] font-semibold leading-snug text-ink">
          {product.name}
        </h3>

        {product.packaging && (
          <p className="mb-1 text-[12px] text-stone">{product.packaging}</p>
        )}
        {product.application && (
          <p className="mb-3 text-[12px] leading-snug text-mist">
            {product.application}
          </p>
        )}

        {product.segments.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {product.segments.slice(0, 2).map((seg) => (
              <span
                key={seg.slug}
                className="rounded-full border px-2 py-0.5 text-[9px] font-medium text-ink"
                style={{
                  background: seg.colorL2,
                  borderColor: seg.colorL1,
                  borderWidth: '1px',
                }}
              >
                {seg.name}
              </span>
            ))}
          </div>
        )}

        <Button
          href={`/catalog/products/${product.slug}`}
          variant="primary"
          size="sm"
          className="mt-auto w-full"
        >
          Запросить цену
        </Button>
      </div>
    </article>
  )
}
