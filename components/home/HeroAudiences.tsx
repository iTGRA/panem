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
  ctaLabelLong: string
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
    ctaLabelLong: 'Перейти в каталог',
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
    ctaLabelLong: 'Получить знания',
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
    ctaLabelLong: 'Получить консультацию',
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
    ctaLabelLong: 'Вступить',
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

function Ornament({ id }: { id: string }) {
  const stroke = 'rgba(0,0,0,0.18)'
  const dot = 'rgba(0,0,0,0.28)'
  const common = {
    className: 'absolute inset-0 h-full w-full',
    preserveAspectRatio: 'xMidYMid slice' as const,
    'aria-hidden': true,
  }

  if (id === 'ingredients') {
    // Регулярная сетка точек — ассортимент, склад, единицы товара
    const dots: { x: number; y: number }[] = []
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        dots.push({ x: 10 + col * 14, y: 12 + row * 16 })
      }
    }
    return (
      <svg viewBox="0 0 100 100" {...common}>
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={1.4} fill={dot} />
        ))}
      </svg>
    )
  }

  if (id === 'academy') {
    // Концентрические круги — расширяющееся знание
    return (
      <svg viewBox="0 0 100 100" {...common}>
        {[16, 28, 40, 52, 64, 76].map((r, i) => (
          <circle
            key={i}
            cx={50}
            cy={50}
            r={r}
            stroke={stroke}
            strokeWidth="0.6"
            fill="none"
          />
        ))}
      </svg>
    )
  }

  if (id === 'consulting') {
    // Параллельные диагональные штрихи — траектория, рост
    const lines = []
    for (let i = -3; i < 14; i++) {
      lines.push(
        <line
          key={i}
          x1={i * 11}
          y1={0}
          x2={i * 11 + 36}
          y2={100}
          stroke={stroke}
          strokeWidth="0.7"
        />
      )
    }
    return (
      <svg viewBox="0 0 100 100" {...common}>
        {lines}
      </svg>
    )
  }

  if (id === 'club') {
    // Сеть узлов — сообщество, связи
    const nodes = [
      { x: 18, y: 22 },
      { x: 52, y: 14 },
      { x: 82, y: 28 },
      { x: 32, y: 48 },
      { x: 68, y: 52 },
      { x: 22, y: 76 },
      { x: 60, y: 80 },
    ]
    const edges: [number, number][] = [
      [0, 1],
      [1, 2],
      [0, 3],
      [1, 3],
      [2, 4],
      [3, 4],
      [3, 5],
      [4, 6],
      [5, 6],
    ]
    return (
      <svg viewBox="0 0 100 100" {...common}>
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke={stroke}
            strokeWidth="0.6"
          />
        ))}
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={1.8} fill={dot} />
        ))}
      </svg>
    )
  }

  return null
}

function ColorCard({ audience: a, index }: { audience: Audience; index: number }) {
  return (
    <Link
      href={a.href}
      className={`${CARD_BASE} ${delayClassFor(index)}`}
      style={{ ...CARD_SHELL, background: a.colorL2 }}
    >
      <div className="flex flex-1 flex-col px-7 pb-7 pt-9">
        {/* Top zone: primitive ornament unique per direction */}
        <div className="relative -mx-7 -mt-9 flex-1 overflow-hidden">
          <Ornament id={a.id} />
        </div>

        {/* Bottom zone: heading + quote + persona + CTA stacked compactly */}
        <div className="pt-6">
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

          <blockquote className="mt-5">
            <span
              className="block font-main font-bold leading-none"
              style={{
                fontSize: '64px',
                color: '#000',
                letterSpacing: '-0.05em',
                marginBottom: '-12px',
              }}
              aria-hidden="true"
            >
              «
            </span>
            <span
              className="block font-main leading-snug text-ink"
              style={{ fontSize: 'clamp(13px, 1.1vw, 15px)', fontWeight: 500 }}
            >
              {a.quote}
            </span>
          </blockquote>

          <div className="mt-5 flex items-center gap-3">
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

          <div className="mt-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 transition-transform duration-200 group-hover:scale-105">
              <span
                className="font-main font-bold uppercase text-ink"
                style={{ fontSize: '10px', letterSpacing: '0.10em' }}
              >
                {a.ctaLabelLong}
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
