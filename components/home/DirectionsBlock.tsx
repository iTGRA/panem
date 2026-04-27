import Link from 'next/link'
import type { Route } from 'next'

type Direction = {
  descriptor: string
  title: string
  body: string
  cta: string
  href: Route
  colorL1: string
  colorL3: string
}

const DIRECTIONS: Direction[] = [
  {
    descriptor: 'И Н Г Р Е Д И Е Н Т Ы',
    title: 'Ингредиенты',
    body: 'Один поставщик закрывает всё меню — от теста до декора. Технолог на связи 24/7.',
    cta: 'Получить прайс',
    href: '/catalog' as Route,
    colorL1: 'var(--c-amber)',
    colorL3: 'var(--c-amber-t)',
  },
  {
    descriptor: 'А К А Д Е М И Я',
    title: 'Академия',
    body: 'Ваши гости запомнят вкус. Мы поможем его создать.',
    cta: 'Расписание',
    href: '/academy' as Route,
    colorL1: 'var(--c-rose)',
    colorL3: 'var(--c-rose-t)',
  },
  {
    descriptor: 'К О Н С А Л Т И Н Г',
    title: 'Консалтинг',
    body: 'Открываете или перезапускаете — не учитесь на своих ошибках. Лучшие эксперты рядом.',
    cta: 'Обсудить проект',
    href: '/consulting' as Route,
    colorL1: 'var(--c-blue)',
    colorL3: 'var(--c-blue-t)',
  },
  {
    descriptor: 'Б И З Н Е С - К Л У Б',
    title: 'Бизнес-клуб',
    body: 'Решения, которые рождаются в разговоре с теми, кто прошёл тот же путь.',
    cta: 'Вступить',
    href: '/club' as Route,
    colorL1: 'var(--c-teal)',
    colorL3: 'var(--c-sky-t)',
  },
]

export function DirectionsBlock() {
  return (
    <section className="bg-white px-[var(--container-px)] py-16">
      <div className="mx-auto grid max-w-container grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {DIRECTIONS.map((d) => (
          <Link
            key={d.title}
            href={d.href}
            className="group block rounded-card border border-sand p-5 transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 hover:shadow-card"
            style={{
              borderTop: `3px solid ${d.colorL1}`,
              background: d.colorL3,
            }}
          >
            <span className="mb-2 block font-sub text-[8px] font-light uppercase tracking-[0.28em] text-mist">
              {d.descriptor}
            </span>
            <h3 className="mb-2 text-base font-bold uppercase tracking-[0.06em] text-ink">
              {d.title}
            </h3>
            <p className="mb-5 text-[13px] leading-[1.55] text-stone">{d.body}</p>
            <span
              className="text-[9px] font-bold uppercase tracking-[0.18em]"
              style={{ color: d.colorL1 }}
            >
              {d.cta} →
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
