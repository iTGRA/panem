import type { Metadata } from 'next'
import type { Route } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getEventBySlug } from '@/lib/db/events'
import { formatDateRu } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

type Params = { params: { slug: string } }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const event = await getEventBySlug(params.slug)
  if (!event) return {}
  return {
    title: `${event.title} | Академия`,
    description: event.description ?? event.title,
  }
}

export default async function EventPage({ params }: Params) {
  const event = await getEventBySlug(params.slug)
  if (!event) notFound()

  const isAnnouncement = event.type === 'ANNOUNCEMENT'
  const dotColor = isAnnouncement ? 'var(--c-rose)' : 'var(--c-sand)'
  const labelColor = isAnnouncement ? 'var(--c-rose)' : 'var(--c-mist)'
  const label = isAnnouncement ? 'Анонс' : 'Фотоотчёт'

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-sand px-[var(--container-px)] py-12">
        <div className="mx-auto max-w-narrow">
          <nav className="mb-6 flex gap-2 text-[11px] text-mist">
            <Link
              href="/academy"
              className="transition-colors hover:text-ink"
            >
              Академия
            </Link>
            <span>·</span>
            <span className="text-ink">{label}</span>
          </nav>

          <div className="mb-4 flex items-center gap-3">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: dotColor }}
            />
            <span
              className="text-[10px] font-bold uppercase tracking-[0.22em]"
              style={{ color: labelColor }}
            >
              {label}
            </span>
            {event.date && (
              <span className="text-[10px] text-mist">
                {formatDateRu(event.date)}
              </span>
            )}
          </div>

          <h1
            className="mb-4 font-black uppercase tracking-[0.02em] text-ink"
            style={{ fontSize: 'clamp(22px,4vw,48px)', lineHeight: '1.0' }}
          >
            {event.title.toUpperCase()}
          </h1>

          <div className="flex flex-wrap gap-4 text-[12px] text-stone">
            {event.format && <span>{event.format}</span>}
            {event.location && <span>{event.location}</span>}
            {event.brand && (
              <Link
                href={`/catalog/brands/${event.brand.slug}` as Route}
                className="shoppable-link"
              >
                {event.brand.name}
              </Link>
            )}
          </div>
        </div>
      </section>

      {event.description && (
        <section className="px-[var(--container-px)] py-10">
          <div className="mx-auto max-w-narrow">
            <p className="text-sm leading-relaxed text-stone">
              {event.description}
            </p>
          </div>
        </section>
      )}

      {event.products.length > 0 && (
        <section
          className="px-[var(--container-px)] py-10"
          style={{ background: 'var(--c-warm)' }}
        >
          <div className="mx-auto max-w-narrow">
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-mist">
              {isAnnouncement
                ? 'Будем работать с этими продуктами'
                : 'Продукты с мастер-класса'}
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {event.products.map((p) => (
                <Link
                  key={p.slug}
                  href={`/catalog/products/${p.slug}` as Route}
                  className="block rounded-card border border-sand bg-white p-4 transition-transform duration-200 hover:-translate-y-0.5"
                  style={{ borderTop: '3px solid var(--c-rose)' }}
                >
                  <span className="mb-1 block text-[10px] text-mist">
                    {p.category?.name}
                  </span>
                  <span className="text-[13px] font-bold text-ink">
                    {p.name}
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-6">
              <Button href="/about#contact" variant="primary">
                {isAnnouncement
                  ? 'Записаться на мастер-класс'
                  : 'Запросить эти продукты'}
              </Button>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
