import Link from 'next/link'
import type { Route } from 'next'
import { getLatestEvents } from '@/lib/db/events'
import { EventCard } from '@/components/academy/EventCard'

export async function AcademyFeedBlock() {
  const events = await getLatestEvents(3)

  return (
    <section className="bg-white px-[var(--container-px)] py-20 md:py-24">
      <div className="mx-auto max-w-container">
        <div className="mb-12 grid grid-cols-1 items-end gap-6 md:grid-cols-[1fr_auto] md:gap-12">
          <div>
            <span className="mb-3 block font-sub text-[10px] font-bold uppercase tracking-[0.22em] text-stone">
              Знания. Подаются горячими.
            </span>
            <h2
              className="font-black uppercase tracking-[0.02em] text-ink"
              style={{ fontSize: 'var(--type-h2)', lineHeight: 1 }}
            >
              Академия ПАНЕМ
            </h2>
            <p className="mt-5 max-w-[520px] text-base leading-relaxed text-stone">
              Площадка, где эксперты производителей делятся трендами, техниками
              и новыми ингредиентами. Живыми руками, не по учебнику.
            </p>
          </div>
          <Link
            href={'/academy' as Route}
            className="hidden text-[11px] font-bold uppercase tracking-[0.20em] text-stone transition-colors duration-150 hover:text-ink md:block"
          >
            Все мероприятия →
          </Link>
        </div>

        {events.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {events.slice(0, 3).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
            {/* Если событий меньше 3 — добиваем сетку плиткой "Все мероприятия",
                чтобы не было визуальных дыр в lg:grid-cols-3 */}
            {events.length < 3 && (
              <Link
                href={'/academy' as Route}
                className="group flex flex-col justify-between rounded-card border border-sand bg-warm p-6 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-card"
              >
                <span className="font-sub text-[10px] font-bold uppercase tracking-[0.22em] text-stone">
                  Программа
                </span>
                <span
                  className="mt-6 font-black uppercase tracking-[0.02em] text-ink"
                  style={{ fontSize: 'clamp(20px, 2vw, 28px)', lineHeight: 1.05 }}
                >
                  Все мероприятия и курсы
                </span>
                <span
                  className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-ink transition-transform duration-200 group-hover:translate-x-1"
                >
                  Смотреть расписание →
                </span>
              </Link>
            )}
          </div>
        ) : (
          <p className="text-base text-stone">
            Ближайшие мероприятия скоро появятся.
          </p>
        )}
      </div>
    </section>
  )
}
