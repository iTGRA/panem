import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Button } from '@/components/ui/Button'
import { CatalogTabs } from '@/components/catalog/CatalogTabs'
import { CategoryGrid } from '@/components/catalog/CategoryGrid'
import { SegmentGrid } from '@/components/catalog/SegmentGrid'
import { BrandGrid } from '@/components/catalog/BrandGrid'
import { getCategoriesWithCounts } from '@/lib/db/categories'
import { getSegments } from '@/lib/db/segments'
import { getBrands } from '@/lib/db/brands'

export const metadata: Metadata = {
  title: 'Каталог ингредиентов для гастроиндустрии Поволжья',
  description:
    '2300+ наименований от Barry Callebaut, Lesaffre, Backaldrin, Lactalis. Доставка по Поволжью. Технологическая поддержка 24/7.',
}

export default async function CatalogPage() {
  const [categories, segments, brands] = await Promise.all([
    getCategoriesWithCounts(),
    getSegments(),
    getBrands(),
  ])

  return (
    <div className="bg-white">
      <section className="border-b border-sand bg-white px-[var(--container-px)] py-12 md:py-16">
        <div className="mx-auto max-w-container">
          <span className="mb-3 block font-sub text-[9px] font-light uppercase tracking-[0.32em] text-mist">
            К А Т А Л О Г
          </span>
          <h1
            className="font-black uppercase tracking-[0.02em] text-ink"
            style={{ fontSize: 'clamp(28px, 4vw, 56px)', lineHeight: 1 }}
          >
            2 300+ ИНГРЕДИЕНТОВ
            <br />
            ДЛЯ ГАСТРОИНДУСТРИИ
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-[1.65] text-stone">
            Один поставщик для всего меню. Технолог поможет с подбором.
          </p>
        </div>
      </section>

      <section className="bg-white px-[var(--container-px)] py-12">
        <div className="mx-auto max-w-container">
          <Suspense fallback={<CategoryGrid categories={categories} />}>
            <CatalogTabs
              category={<CategoryGrid categories={categories} />}
              segment={<SegmentGrid segments={segments} />}
              brand={<BrandGrid brands={brands} />}
            />
          </Suspense>
        </div>
      </section>

      <section className="bg-warm px-[var(--container-px)] py-12">
        <div className="mx-auto flex max-w-container flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="border-l-[3px] pl-6" style={{ borderColor: 'var(--c-amber)' }}>
            <p className="mb-1 text-sm font-bold text-ink">Не знаете, что выбрать?</p>
            <p className="text-sm leading-[1.6] text-stone">
              Напишите задачу — технолог подберёт ингредиенты под вашу рецептуру и экономику продукта.
            </p>
          </div>
          <Button href="/support#contact" variant="primary">
            Описать задачу
          </Button>
        </div>
      </section>
    </div>
  )
}
