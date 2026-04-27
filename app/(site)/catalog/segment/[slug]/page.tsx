import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { ProductGrid } from '@/components/catalog/ProductGrid'
import { getSegmentBySlug } from '@/lib/db/segments'
import { getProductsBySegment } from '@/lib/db/products'

const SEGMENT_H1: Record<string, string> = {
  'bakery-shop': 'ИНГРЕДИЕНТЫ ДЛЯ ПЕКАРНИ — НАДЁЖНО, ТЕХНОЛОГИЧНО, С ПОДДЕРЖКОЙ',
  'confectionery-shop':
    'ИНГРЕДИЕНТЫ ДЛЯ КОНДИТЕРСКОЙ — ОТ BARRY CALLEBAUT ДО ФРУКТОВЫХ ПЮРЕ',
  restaurant: 'ИНГРЕДИЕНТЫ ДЛЯ РЕСТОРАНА — ПОЛНЫЙ АССОРТИМЕНТ ДЛЯ ЛЮБОЙ КУХНИ',
  'coffee-shop': 'ВСЁ ДЛЯ КОФЕЙНИ — ОТ АЛЬТЕРНАТИВНОГО МОЛОКА ДО ТОППИНГОВ',
  burger: 'ИНГРЕДИЕНТЫ ДЛЯ БУРГЕРНОЙ — СТАБИЛЬНОСТЬ В КАЖДОЙ СМЕНЕ',
  canteen: 'ИНГРЕДИЕНТЫ ДЛЯ СТОЛОВОЙ — ОБЪЁМ, КАЧЕСТВО, ПРЕДСКАЗУЕМОСТЬ',
  production: 'ИНГРЕДИЕНТЫ ДЛЯ ПРОИЗВОДСТВА — ОПТОВЫЕ ПОСТАВКИ ПОД ВАШИ ЗАДАЧИ',
}

const SEGMENT_TASKS: Record<string, string[]> = {
  'bakery-shop': [
    'Нужны стабильные дрожжи с предсказуемым подъёмом',
    'Ищем готовую смесь под новую позицию меню',
    'Хотим снизить себестоимость без потери качества',
    'Нужна помощь с разработкой рецептуры',
  ],
  'confectionery-shop': [
    'Ищем шоколад с нужным процентом какао для покрытия',
    'Нужны начинки с долгим сроком годности',
    'Хотим обновить линейку тортов — нужна идея и ингредиент',
    'Ищем альтернативу текущему поставщику сливок',
  ],
  'coffee-shop': [
    'Ищем альтернативное молоко для latte art',
    'Нужны базы для фирменных напитков',
    'Хотим добавить горячий шоколад в меню',
    'Ищем поставщика сиропов и топпингов',
  ],
  burger: [
    'Хлебобулочные смеси под бургерные булки',
    'Соусы и майонезы оптом',
    'Масло для фритюра с высокой точкой дымления',
    'Упаковка для навынос',
  ],
  restaurant: [
    'Полный ассортимент для любой кухни',
    'Молочные продукты для десертов и соусов',
    'Профессиональный шоколад для кондитерского цеха',
    'Поддержка технолога при разработке меню',
  ],
  canteen: [
    'Молочная продукция большими объёмами',
    'Консервация и соусы для горячего цеха',
    'Мука и хлебопекарные смеси',
    'Стабильные поставки с гарантией наличия',
  ],
  production: [
    'Оптовые поставки сырья',
    'Готовые смеси под промышленные линии',
    'Технологическая поддержка',
    'Консультация по сертификации',
  ],
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const seg = await getSegmentBySlug(params.slug)
  if (!seg) return {}
  return {
    title: `Ингредиенты для ${seg.name} оптом`,
    description: `Подборка ингредиентов для ${seg.name}. Доставка по Поволжью. Технолог поможет с выбором.`,
  }
}

export default async function SegmentPage({
  params,
}: {
  params: { slug: string }
}) {
  const [seg, products] = await Promise.all([
    getSegmentBySlug(params.slug),
    getProductsBySegment(params.slug),
  ])

  if (!seg) notFound()

  const h1 = SEGMENT_H1[seg.slug] ?? `ИНГРЕДИЕНТЫ ДЛЯ ${seg.name.toUpperCase()}`
  const tasks = SEGMENT_TASKS[seg.slug] ?? []

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
              href="/catalog?view=segment"
              className="transition-colors duration-150 hover:text-ink"
            >
              По типу бизнеса
            </Link>
            <span aria-hidden>·</span>
            <span className="text-ink">{seg.name}</span>
          </nav>

          <span
            className="mb-5 inline-block rounded-full border-[1.5px] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-ink"
            style={{ background: seg.colorL2, borderColor: seg.colorL1 }}
          >
            {seg.name}
          </span>

          <div className="border-l-[3px] pl-6" style={{ borderColor: seg.colorL1 }}>
            <h1
              className="font-black uppercase tracking-[0.02em] text-ink"
              style={{ fontSize: 'clamp(24px, 4vw, 52px)', lineHeight: 1 }}
            >
              {h1}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-[1.65] text-stone">
              Надёжно, технологично, с пониманием реальных процессов. {products.length}{' '}
              наименований, технолог на связи 24/7.
            </p>
          </div>
        </div>
      </section>

      {tasks.length > 0 && (
        <section className="bg-warm px-[var(--container-px)] py-12">
          <div className="mx-auto max-w-container">
            <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.22em] text-mist">
              Типичные задачи
            </p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {tasks.map((task) => (
                <div
                  key={task}
                  className="flex items-start gap-3 rounded-card border border-sand bg-white p-4"
                  style={{ borderTop: `2px solid ${seg.colorL1}` }}
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ background: seg.colorL1 }}
                    aria-hidden
                  />
                  <span className="text-[13px] leading-[1.5] text-stone">{task}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-white px-[var(--container-px)] py-12">
        <div className="mx-auto max-w-container">
          <ProductGrid products={products} />
        </div>
      </section>

      <section className="bg-warm px-[var(--container-px)] py-12">
        <div className="mx-auto flex max-w-container flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="border-l-[3px] pl-6" style={{ borderColor: seg.colorL1 }}>
            <p className="mb-1 text-sm font-bold text-ink">Нужна помощь с подбором?</p>
            <p className="text-sm leading-[1.6] text-stone">
              Технолог ПАНЭМ знает вашу отрасль. Поможет с выбором и расчётом себестоимости.
            </p>
          </div>
          <Button href="/support#contact" variant="primary">
            Задать вопрос технологу
          </Button>
        </div>
      </section>
    </div>
  )
}
