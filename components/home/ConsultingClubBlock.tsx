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
    descriptor: 'К О Н С А Л Т И Н Г',
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
        Сопровождение под ключ от лучших экспертов Поволжья.
        Привлекаем ведущих консультантов страны.
      </>
    ),
    cta: 'Обсудить проект',
    color: 'var(--c-blue)',
  },
  {
    href: '/club' as Route,
    descriptor: 'Б И З Н Е С - К Л У Б',
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
    <section className="bg-warm px-[var(--container-px)] py-16">
      <div className="mx-auto grid max-w-container grid-cols-1 gap-4 md:grid-cols-2">
        {CARDS.map((c, i) => (
          <Link
            key={i}
            href={c.href}
            className="group block rounded-card border border-sand bg-white p-8 transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 hover:shadow-card"
            style={{ borderTop: `3px solid ${c.color}` }}
          >
            <span className="mb-3 block font-sub text-[8px] font-light uppercase tracking-[0.28em] text-mist">
              {c.descriptor}
            </span>
            <h2
              className="mb-5 font-black uppercase tracking-[0.02em] text-ink"
              style={{ fontSize: 'clamp(22px, 2.5vw, 36px)', lineHeight: 1 }}
            >
              {c.heading}
            </h2>
            <p className="mb-7 max-w-[360px] text-sm leading-[1.6] text-stone">
              {c.body}
            </p>
            <span
              className="text-[9px] font-bold uppercase tracking-[0.18em]"
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
