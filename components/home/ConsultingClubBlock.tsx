import Link from 'next/link'
import type { Route } from 'next'

type CardData = {
  href: Route
  descriptor: string
  heading: React.ReactNode
  body: React.ReactNode
  cta: string
  color: string
}

const CARDS: CardData[] = [
  {
    href: '/consulting' as Route,
    descriptor: 'Консалтинг',
    heading: (
      <>
        ОТКРЫТИЕ.
        <br />
        ПЕРЕЗАПУСК.
        <br />
        МАСШТАБ.
      </>
    ),
    body: (
      <>
        Сопровождение под ключ от лучших экспертов Поволжья. Привлекаем ведущих
        консультантов страны.
      </>
    ),
    cta: 'Обсудить проект',
    color: 'var(--c-blue)',
  },
  {
    href: '/club' as Route,
    descriptor: 'Бизнес-клуб',
    heading: (
      <>
        ЕДИНСТВЕННЫЙ
        <br />
        ФОРУМ
        <br />
        ПОВОЛЖЬЯ.
      </>
    ),
    body: (
      <>
        «Пекарь&Кондитер» и «ПАНЭМ&HoReCa» — 100+ участников ежегодно.
        Эксперты. Дегустации. Нетворкинг.
      </>
    ),
    cta: 'Вступить в клуб',
    color: 'var(--c-teal)',
  },
]

export function ConsultingClubBlock() {
  return (
    <section className="bg-warm px-[var(--container-px)] py-20 md:py-24">
      <div className="mx-auto grid max-w-container grid-cols-1 gap-4 md:grid-cols-2">
        {CARDS.map((c, i) => (
          <Link
            key={i}
            href={c.href}
            className="group block rounded-card border border-sand bg-white p-10 transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 hover:shadow-card"
            style={{ borderTop: `3px solid ${c.color}` }}
          >
            <span className="mb-4 block font-sub text-[10px] font-bold uppercase tracking-[0.22em] text-stone">
              {c.descriptor}
            </span>
            <h2
              className="mb-6 font-black uppercase tracking-[0.02em] text-ink"
              style={{ fontSize: 'clamp(24px, 2.6vw, 38px)', lineHeight: 1.0 }}
            >
              {c.heading}
            </h2>
            <p className="mb-8 max-w-[420px] text-base leading-relaxed text-stone">
              {c.body}
            </p>
            <span
              className="inline-flex items-center text-[11px] font-bold uppercase tracking-[0.18em] transition-transform duration-200 group-hover:translate-x-1"
              style={{ color: c.color }}
            >
              {c.cta} →
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
