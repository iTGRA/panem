import Link from 'next/link'
import type { Route } from 'next'

interface Audience {
  id: string
  direction: string
  href: Route
  colorL2: string
  colorL1: string
  name: string
  role: string
  quote: string
  initial: string
  ctaLabel: string
  imageUrl?: string
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
    ctaLabel: 'Перейти в каталог',
    imageUrl: '/images/audiences/cafe_owner.jpg',
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
    ctaLabel: 'Смотреть Академию',
    imageUrl: '/images/audiences/chef_conditer.jpg',
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
    ctaLabel: 'Обсудить проект',
    imageUrl: '/images/audiences/manager1.jpg',
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
    ctaLabel: 'Вступить в сообщество',
    imageUrl: '/images/audiences/boss1.jpg',
  },
]

export function HeroAudiences() {
  return (
    <div
      className="grid grid-cols-1 bg-white md:grid-cols-2 lg:grid-cols-4"
      style={{ gap: '3px' }}
    >
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
  const delayClass =
    ['appear', 'appear-d1', 'appear-d2', 'appear-d3'][index] ?? 'appear'

  return (
    <Link
      href={a.href}
      className={`group relative flex cursor-pointer flex-col overflow-hidden bg-white transition-transform duration-300 hover:-translate-y-1 ${delayClass}`}
      style={{
        minHeight: 'clamp(580px, 70vh, 780px)',
        borderRadius: '75px',
      }}
    >
      <div className="relative flex-shrink-0" style={{ height: '75%' }}>
        <div
          className="absolute inset-0 h-full w-full"
          style={{ background: a.colorL2 }}
        >
          <div className="flex h-full w-full items-center justify-center">
            <span
              className="select-none font-main font-black"
              style={{
                fontSize: 'clamp(120px, 18vw, 200px)',
                lineHeight: '1',
                color: 'rgba(0,0,0,0.10)',
                letterSpacing: '-0.02em',
              }}
              aria-hidden="true"
            >
              {a.initial}
            </span>
          </div>

          {a.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={a.imageUrl}
              alt={a.name}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          )}
        </div>

        <div
          className="absolute left-0 right-0"
          style={{
            bottom: '64px',
            height: '75px',
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.7) 60%, #ffffff 100%)',
          }}
          aria-hidden="true"
        />
      </div>

      <div className="relative -mt-16 flex flex-1 flex-col bg-white px-7 pb-0 pt-5">
        <span
          className="mb-5 block font-sub font-light uppercase"
          style={{
            fontSize: '8px',
            letterSpacing: '0.28em',
            color: a.colorL1,
          }}
        >
          {a.direction}
        </span>

        <blockquote
          className="mb-2 flex-1 font-main leading-snug text-ink"
          style={{ fontSize: 'clamp(14px, 1.3vw, 17px)', fontWeight: 500 }}
        >
          «{a.quote}»
        </blockquote>

        <div className="mb-5 text-right">
          <div className="flex items-center justify-end gap-2">
            <span
              className="h-2 w-2 flex-shrink-0 rounded-full"
              style={{ background: a.colorL1 }}
            />
            <span
              className="font-bold text-ink"
              style={{ fontSize: '13px', lineHeight: '1.2' }}
            >
              {a.name}
            </span>
          </div>
          <span
            className="mt-0.5 block"
            style={{ fontSize: '11px', color: 'rgba(0,0,0,0.40)' }}
          >
            {a.role}
          </span>
        </div>

        <div
          className="-mx-7 mt-auto flex items-center justify-center gap-2 px-7 py-4 transition-all duration-200 group-hover:brightness-95"
          style={{ background: a.colorL1 }}
        >
          <span
            className="font-main font-bold uppercase text-white"
            style={{ fontSize: '10px', letterSpacing: '0.22em' }}
          >
            {a.ctaLabel}
          </span>
          <span
            className="font-bold text-white transition-transform duration-200 group-hover:translate-x-1"
            style={{ fontSize: '16px' }}
          >
            →
          </span>
        </div>
      </div>
    </Link>
  )
}
