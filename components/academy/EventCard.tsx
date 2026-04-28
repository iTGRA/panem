import Link from 'next/link'
import type { Route } from 'next'
import { formatDateShort } from '@/lib/utils'
import type { Event, Brand } from '@prisma/client'

type EventProduct = { slug: string; name: string }
type EventCardData = Event & {
  brand: Brand | null
  products?: EventProduct[]
}

export function EventCard({ event }: { event: EventCardData }) {
  const isAnnouncement = event.type === 'ANNOUNCEMENT'
  const accent = 'var(--c-rose)'
  const dotColor = isAnnouncement ? 'var(--c-rose)' : 'var(--c-sand)'
  const labelColor = isAnnouncement ? 'var(--c-rose)' : 'var(--c-mist)'
  const label = isAnnouncement ? 'Анонс' : 'Фотоотчёт'
  const cta = isAnnouncement ? 'Записаться' : 'Смотреть фотоотчёт'

  return (
    <article
      className="group flex flex-col rounded-card border border-sand bg-white transition-[box-shadow,border-color] duration-300 ease-out hover:border-stone/30 hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.18)]"
      style={{ borderTop: `3px solid ${accent}` }}
    >
      <div
        className="aspect-[16/9] overflow-hidden rounded-t-[5px]"
        style={{ background: 'var(--c-warm)' }}
      >
        {event.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.imageUrl}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-[11px] text-stone">{label}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-2">
          <span
            className="h-2 w-2 flex-shrink-0 rounded-full"
            style={{ background: dotColor }}
          />
          <span
            className="text-[9px] font-bold uppercase tracking-[0.20em]"
            style={{ color: labelColor }}
          >
            {label}
          </span>
          {event.date && (
            <span className="ml-auto text-[10px] text-mist">
              {formatDateShort(event.date)}
            </span>
          )}
        </div>

        <h3 className="mb-2 flex-1 text-[14px] font-bold leading-snug text-ink">
          {event.title}
        </h3>

        {(event.format || event.brand) && (
          <p className="mb-2 text-[11px] text-mist">
            {[event.format, event.brand?.name].filter(Boolean).join(' · ')}
          </p>
        )}

        {event.location && (
          <p className="mb-4 text-[11px] text-mist">{event.location}</p>
        )}

        {event.products && event.products.length > 0 && (
          <div className="mb-4 border-t border-sand pt-3">
            <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.18em] text-mist">
              Используем на мастер-классе
            </p>
            <div className="flex flex-col gap-1">
              {event.products.slice(0, 2).map((p) => (
                <Link
                  key={p.slug}
                  href={`/catalog/products/${p.slug}` as Route}
                  className="shoppable-link text-[11px]"
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        <Link
          href={`/academy/events/${event.slug}` as Route}
          className="group/cta mt-auto inline-flex items-center gap-1 self-start text-[10px] font-bold uppercase tracking-[0.18em]"
          style={{ color: accent }}
        >
          <span>{cta}</span>
          <span
            aria-hidden
            className="transition-transform duration-300 ease-out group-hover/cta:translate-x-1.5"
          >
            →
          </span>
        </Link>
      </div>
    </article>
  )
}
