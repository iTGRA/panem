import Link from 'next/link'
import type { Route } from 'next'

type Audience = {
  id: string
  direction: string
  href: Route
  colorL2: string
  colorL1: string
  name: string
  role: string
  quote: string
  initial: string
  cta: string
}

const AUDIENCES: Audience[] = [
  {
    id: 'ingredients',
    direction: 'И Н Г Р Е Д И Е Н Т Ы',
    href: '/catalog',
    colorL2: '#FFD291',
    colorL1: '#FFB45A',
    name: 'Анна',
    role: 'Владелица кондитерской',
    quote:
      'Раньше работала с тремя поставщиками. Теперь один. Всё есть, всегда в наличии.',
    initial: 'А',
    cta: 'Перейти в каталог →',
  },
  {
    id: 'academy',
    direction: 'А К А Д Е М И Я',
    href: '/academy',
    colorL2: '#FAC3D2',
    colorL1: '#F582A0',
    name: 'Рита',
    role: 'Шеф-кондитер',
    quote:
      'После мастер-класса я переделала всю линейку тортов. Гости заметили сразу.',
    initial: 'Р',
    cta: 'Смотреть расписание →',
  },
  {
    id: 'consulting',
    direction: 'К О Н С А Л Т И Н Г',
    href: '/consulting',
    colorL2: '#AACBFF',
    colorL1: '#5A8CD7',
    name: 'Дмитрий',
    role: 'Управляющий рестораном',
    quote:
      'Снизили фудкост с 38% до 28%. Меню и техкарты пересобрали за три месяца.',
    initial: 'Д',
    cta: 'Обсудить проект →',
  },
  {
    id: 'club',
    direction: 'Б И З Н Е С - К Л У Б',
    href: '/club',
    colorL2: '#A5D2DC',
    colorL1: '#6EA5AA',
    name: 'Вадим',
    role: 'Ресторатор, 3 заведения',
    quote:
      'Здесь не продают — здесь делятся. Реальные решения от тех, кто уже прошёл этот путь.',
    initial: 'В',
    cta: 'Вступить в клуб →',
  },
]

export function HeroAudiences() {
  return (
    <div className="grid grid-cols-1 gap-[3px] bg-sand md:grid-cols-2 lg:grid-cols-4">
      {AUDIENCES.map((a, i) => (
        <AudienceCard key={a.id} audience={a} index={i} />
      ))}
    </div>
  )
}

function AudienceCard({
  audience: a,
  index,
}: {
  audience: Audience
  index: number
}) {
  const delayClass = ['appear', 'appear-d1', 'appear-d2', 'appear-d3'][index] ?? 'appear'

  return (
    <Link
      href={a.href}
      className={`group relative flex flex-col justify-between overflow-hidden ${delayClass}`}
      style={{
        background: a.colorL2,
        minHeight: 'clamp(280px, 45vh, 520px)',
        padding: 'clamp(20px, 3vw, 28px)',
      }}
    >
      <span
        className="pointer-events-none absolute right-5 top-4 select-none font-main font-black"
        style={{
          fontSize: 'clamp(80px, 12vw, 140px)',
          lineHeight: '1',
          color: 'rgba(0,0,0,0.07)',
          letterSpacing: '-0.02em',
        }}
        aria-hidden="true"
      >
        {a.initial}
      </span>

      <div className="relative z-10">
        <span
          className="mb-2 block font-sub text-[8px] font-light uppercase tracking-[0.28em]"
          style={{ color: 'rgba(0,0,0,0.45)' }}
        >
          {a.direction}
        </span>
      </div>

      <div className="relative z-10">
        <blockquote
          className="mb-5 font-main font-medium leading-snug text-ink"
          style={{ fontSize: 'clamp(14px, 1.4vw, 18px)' }}
        >
          «{a.quote}»
        </blockquote>

        <div className="mb-5 flex items-center gap-3">
          <div
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-[13px] font-black text-white"
            style={{ background: a.colorL1 }}
          >
            {a.initial}
          </div>

          <div>
            <span className="block text-[13px] font-bold leading-tight text-ink">
              {a.name}
            </span>
            <span
              className="mt-0.5 block text-[11px]"
              style={{ color: 'rgba(0,0,0,0.45)' }}
            >
              {a.role}
            </span>
          </div>
        </div>

        <span
          className="font-main text-[9px] font-bold uppercase tracking-[0.20em] transition-all duration-200 group-hover:tracking-[0.28em]"
          style={{ color: a.colorL1 }}
        >
          {a.cta}
        </span>
      </div>

      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'rgba(0,0,0,0.04)' }}
        aria-hidden="true"
      />
    </Link>
  )
}
