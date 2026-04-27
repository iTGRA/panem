'use client'

import { useState } from 'react'
import { EventCard } from './EventCard'
import type { Event, Brand } from '@prisma/client'

type EventProduct = { slug: string; name: string }
type EventItem = Event & { brand: Brand | null; products?: EventProduct[] }

type FilterType = 'ALL' | 'ANNOUNCEMENT' | 'REPORT'

const FILTERS: { id: FilterType; label: string }[] = [
  { id: 'ALL', label: 'Все' },
  { id: 'ANNOUNCEMENT', label: 'Анонсы' },
  { id: 'REPORT', label: 'Фотоотчёты' },
]

export function EventFeed({ events }: { events: EventItem[] }) {
  const [active, setActive] = useState<FilterType>('ALL')

  const filtered =
    active === 'ALL' ? events : events.filter((e) => e.type === active)

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h2
          className="font-black uppercase tracking-[0.02em] text-ink"
          style={{ fontSize: 'clamp(20px,3vw,36px)', lineHeight: '1.0' }}
        >
          МЕРОПРИЯТИЯ
        </h2>

        <div className="flex gap-1 border-b border-sand">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActive(f.id)}
              className={`-mb-px border-b-2 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-150 ${
                active === f.id
                  ? 'border-rose text-ink'
                  : 'border-transparent text-mist hover:text-stone'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-mist">
          Нет мероприятий в этой категории
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}
