import Link from 'next/link'
import type { Route } from 'next'
import { getLatestEvents } from '@/lib/db/events'
import { EventCard } from '@/components/academy/EventCard'

export async function AcademyFeedBlock() {
  const events = await getLatestEvents(3)

  return (
    <section className="bg-white px-[var(--container-px)] py-16">
      <div className="mx-auto max-w-container">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="mb-2 block font-sub text-[9px] font-light uppercase tracking-[0.32em] text-mist">
              А К А Д Е М И Я
            </span>
            <h2
              className="font-black uppercase tracking-[0.02em] text-ink"
              style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', lineHeight: 1 }}
            >
              ЗНАНИЯ.<br />
              ПОДАЮТСЯ<br />
              ГОРЯЧИМИ.
            </h2>
            <p className="mt-4 max-w-[480px] text-sm leading-[1.6] text-stone">
              Площадка, где эксперты производителей делятся трендами, техниками
              и новыми ингредиентами. Живыми руками, не по учебнику.
            </p>
          </div>
          <Link
            href={'/academy' as Route}
            className="hidden text-[9px] font-bold uppercase tracking-[0.20em] text-mist transition-colors duration-150 hover:text-ink md:block"
          >
            Все мероприятия →
          </Link>
        </div>

        {events.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-mist">
            Ближайшие мероприятия скоро появятся.
          </p>
        )}
      </div>
    </section>
  )
}
