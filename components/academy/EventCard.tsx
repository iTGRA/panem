import Link from 'next/link'
import type { Route } from 'next'
import { formatDateRu } from '@/lib/utils'
import type { Event, Brand } from '@prisma/client'

type EventWithBrand = Event & { brand: Brand | null }

export function EventCard({ event }: { event: EventWithBrand }) {
  const isAnnouncement = event.type === 'ANNOUNCEMENT'
  const accent = isAnnouncement ? 'var(--c-rose)' : 'var(--c-sand)'
  const label = isAnnouncement ? 'Анонс' : 'Фотоотчёт'
  const cta = isAnnouncement ? 'Записаться' : 'Смотреть'

  return (
    <article
      className="flex flex-col rounded-card border border-sand bg-white p-5 transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 hover:shadow-card"
      style={{ borderTop: `3px solid ${accent}` }}
    >
      <div className="mb-3 flex items-center gap-2">
        <span
          className="h-2 w-2 flex-shrink-0 rounded-full"
          style={{ background: accent }}
        />
        <span
          className="text-[9px] font-bold uppercase tracking-[0.20em]"
          style={{ color: isAnnouncement ? 'var(--c-rose)' : 'var(--c-mist)' }}
        >
          {label}
        </span>
        {event.date && (
          <span className="ml-auto text-[10px] text-mist">
            {formatDateRu(event.date)}
          </span>
        )}
      </div>

      <h3 className="mb-2 text-[14px] font-bold leading-snug text-ink">
        {event.title}
      </h3>

      {(event.format || event.brand) && (
        <p className="mb-5 text-[11px] text-mist">
          {[event.format, event.brand?.name].filter(Boolean).join(' · ')}
        </p>
      )}

      <Link
        href={`/academy/events/${event.slug}` as Route}
        className="mt-auto inline-block text-[9px] font-bold uppercase tracking-[0.18em]"
        style={{ color: accent }}
      >
        {cta} →
      </Link>
    </article>
  )
}
