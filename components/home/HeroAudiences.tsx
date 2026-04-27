import Link from 'next/link'
import type { Route } from 'next'

interface Audience {
  id: string
  direction: string
  heading: string
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
    heading: 'Каталог',
    href: '/catalog',
    colorL2: '#FFD291',
    colorL1: '#FFB45A',
    name: 'Анна',
    role: 'Владелица кондитерской',
    quote:
      'Раньше работала с тремя поставщиками. Теперь один. Всё есть, всегда в наличии.',
    initial: 'А',
    ctaLabel: 'Перейти',
    imageUrl: '/images/audiences/cafe_owner.jpg',
  },
  {
    id: 'academy',
    direction: 'А К А Д Е М И Я',
    heading: 'Академия',
    href: '/academy',
    colorL2: '#FAC3D2',
    colorL1: '#F582A0',
    name: 'Рита',
    role: 'Шеф-кондитер',
    quote:
      'После мастер-класса я переделала всю линейку тортов. Гости заметили сразу.',
    initial: 'Р',
    ctaLabel: 'Смотреть',
    imageUrl: '/images/audiences/chef_conditer.jpg',
  },
  {
    id: 'consulting',
    direction: 'К О Н С А Л Т И Н Г',
    heading: 'Консалтинг',
    href: '/consulting',
    colorL2: '#AACBFF',
    colorL1: '#5A8CD7',
    name: 'Дмитрий',
    role: 'Управляющий рестораном',
    quote:
      'Снизили фудкост с 38% до 28%. Меню и техкарты пересобрали за три месяца.',
    initial: 'Д',
    ctaLabel: 'Обсудить',
    imageUrl: '/images/audiences/manager1.jpg',
  },
  {
    id: 'club',
    direction: 'Б И З Н Е С - К Л У Б',
    heading: 'Бизнес-клуб',
    href: '/club',
    colorL2: '#A5D2DC',
    colorL1: '#6EA5AA',
    name: 'Вадим',
    role: 'Ресторатор, 3 заведения',
    quote:
      'Здесь не продают — здесь делятся. Реальные решения от тех, кто уже прошёл этот путь.',
    initial: 'В',
    ctaLabel: 'Вступить',
    imageUrl: '/images/audiences/boss1.jpg',
  },
]

type Variant = 'photo' | 'color'

export function HeroAudiences({ variant = 'photo' }: { variant?: Variant } = {}) {
  return (
    <div
      className="grid grid-cols-1 bg-white md:grid-cols-2 lg:grid-cols-4"
      style={{ gap: '3px' }}
    >
      {AUDIENCES.map((a, i) => (
        <AudienceCard key={a.id} audience={a} index={i} variant={variant} />
      ))}
    </div>
  )
}

function AudienceCard({
  audience,
  index,
  variant,
}: {
  audience: Audience
  index: number
  variant: Variant
}) {
  if (variant === 'color') return <ColorCard audience={audience} index={index} />
  return <PhotoCard audience={audience} index={index} />
}

function delayClassFor(index: number): string {
  return ['appear', 'appear-d1', 'appear-d2', 'appear-d3'][index] ?? 'appear'
}

const CARD_BASE =
  'group relative flex cursor-pointer flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1'

const CARD_SHELL: React.CSSProperties = {
  minHeight: 'clamp(580px, 70vh, 780px)',
  borderRadius: '75px',
  border: '1px solid rgba(0,0,0,0.06)',
}

function PhotoCard({ audience: a, index }: { audience: Audience; index: number }) {
  return (
    <Link
      href={a.href}
      className={`${CARD_BASE} bg-white ${delayClassFor(index)}`}
      style={CARD_SHELL}
    >
      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0" style={{ background: a.colorL2 }}>
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
      </div>

      <div
        className="flex flex-col bg-white px-6 pb-6 pt-5"
        style={{ minHeight: '260px' }}
      >
        <span
          className="mb-5 block font-sub font-bold uppercase"
          style={{
            fontSize: '9px',
            letterSpacing: '0.28em',
            color: a.colorL1,
          }}
        >
          {a.direction}
        </span>

        <blockquote
          className="mb-3 flex-1 font-main leading-snug text-ink"
          style={{ fontSize: 'clamp(13px, 1.2vw, 16px)', fontWeight: 500 }}
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

        <div className="mt-auto flex justify-center">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-5 py-3 transition-all duration-200 group-hover:brightness-95"
            style={{ background: a.colorL1 }}
          >
            <span
              className="font-main font-bold uppercase text-white"
              style={{ fontSize: '10px', letterSpacing: '0.14em' }}
            >
              {a.ctaLabel}
            </span>
            <span
              className="font-bold text-white transition-transform duration-200 group-hover:translate-x-0.5"
              style={{ fontSize: '13px' }}
            >
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  )
}

function ColorCard({ audience: a, index }: { audience: Audience; index: number }) {
  return (
    <Link
      href={a.href}
      className={`${CARD_BASE} ${delayClassFor(index)}`}
      style={{ ...CARD_SHELL, background: a.colorL2 }}
    >
      <div className="flex flex-1 flex-col px-7 pb-7 pt-9">
        <h3
          className="font-main font-black text-ink"
          style={{
            fontSize: 'clamp(28px, 2.8vw, 44px)',
            lineHeight: '1.0',
            letterSpacing: '-0.015em',
            wordBreak: 'break-word',
          }}
        >
          {a.heading}
        </h3>

        <div className="mt-auto">
          <blockquote
            className="mb-5 font-main leading-snug text-ink"
            style={{ fontSize: 'clamp(13px, 1.1vw, 15px)', fontWeight: 500 }}
          >
            «{a.quote}»
          </blockquote>

          <div className="mb-6 flex items-center gap-3">
            <div
              className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-white"
              style={{ boxShadow: '0 0 0 2px rgba(255,255,255,0.6)' }}
            >
              {a.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={a.imageUrl}
                  alt={a.name}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <div>
              <span
                className="block font-bold text-ink"
                style={{ fontSize: '13px', lineHeight: '1.2' }}
              >
                {a.name}
              </span>
              <span
                className="mt-0.5 block"
                style={{ fontSize: '11px', color: 'rgba(0,0,0,0.55)' }}
              >
                {a.role}
              </span>
            </div>
          </div>

          <div className="flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-3 transition-transform duration-200 group-hover:scale-105">
              <span
                className="font-main font-bold uppercase text-ink"
                style={{ fontSize: '10px', letterSpacing: '0.14em' }}
              >
                {a.ctaLabel}
              </span>
              <span
                className="font-bold text-ink transition-transform duration-200 group-hover:translate-x-0.5"
                style={{ fontSize: '13px' }}
              >
                →
              </span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
