import { ProductCard } from './ProductCard'
import type { Product, Brand, Category, Segment } from '@prisma/client'

type ProductWithRelations = Product & {
  brand: Brand | null
  category: Category
  segments: Segment[]
}

export function ProductGrid({
  products,
  accentColor,
}: {
  products: ProductWithRelations[]
  accentColor?: string
}) {
  if (products.length === 0) {
    return (
      <div className="rounded-card border border-dashed border-sand py-16 text-center">
        <p className="text-sm text-mist">Товары пока не добавлены.</p>
        <p className="mt-2 text-xs text-mist">
          Опишите задачу — технолог подберёт ингредиенты под вашу рецептуру.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} accentColor={accentColor} />
      ))}
    </div>
  )
}
