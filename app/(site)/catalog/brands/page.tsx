import type { Metadata } from 'next'
import { BrandGrid } from '@/components/catalog/BrandGrid'
import { getBrands } from '@/lib/db/brands'

export const metadata: Metadata = {
  title: 'Производители — официальные дистрибьюторы',
  description:
    'Barry Callebaut, Backaldrin, Lesaffre, Lactalis и другие. Оригинальная продукция на складе в Самаре.',
}

export default async function BrandsPage() {
  const brands = await getBrands()

  return (
    <div className="bg-white">
      <section className="border-b border-sand bg-white px-[var(--container-px)] py-12">
        <div className="mx-auto max-w-container">
          <span className="mb-3 block font-sub text-[9px] font-light uppercase tracking-[0.32em] text-mist">
            П Р О И З В О Д И Т Е Л И
          </span>
          <h1
            className="font-black uppercase tracking-[0.02em] text-ink"
            style={{ fontSize: 'clamp(24px, 4vw, 52px)', lineHeight: 1 }}
          >
            ПРОИЗВОДИТЕЛИ
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-[1.65] text-stone">
            Официальные дистрибьюторы. Оригинальная продукция. Наличие на складе в Самаре.
          </p>
        </div>
      </section>

      <section className="bg-white px-[var(--container-px)] py-12">
        <div className="mx-auto max-w-container">
          <BrandGrid brands={brands} />
        </div>
      </section>
    </div>
  )
}
