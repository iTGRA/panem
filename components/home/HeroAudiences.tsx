import Link from 'next/link'
import type { Route } from 'next'

interface Audience {
  id: string
  direction: string
  heading: string
  href: Route
  colorL2: string
  colorL1: string
  colorL3: string
  name: string
  role: string
  quote: string
  initial: string
  ctaLabel: string
  usps: string[]
  imageUrl?: string
}

const AUDIENCES: Audience[] = [
  {
    id: 'ingredients',
    direction: 'Ингредиенты',
    heading: 'Каталог',
    href: '/catalog',
    colorL2: '#FFD291',
    colorL1: '#FFB45A',
    colorL3: '#FCF0C8',
    name: 'Анна',
    role: 'Владелица кондитерской',
    quote:
      'Раньше работала с тремя поставщиками. Теперь один. Всё есть, всегда в наличии. Стало заметно больше времени на развитие проекта, а не это вот всё.',
    initial: 'А',
    ctaLabel: 'Перейти в каталог',
    usps: [
      '2 500+ SKU',
      'Бесплатная доставка',
      'Правильное хранение',
      'Простой документооборот',
    ],
    imageUrl: '/images/audiences/cafe_owner.jpg',
  },
  {
    id: 'academy',
    direction: 'Академия',
    heading: 'Академия',
    href: '/academy',
    colorL2: '#FAC3D2',
    colorL1: '#F582A0',
    colorL3: '#FFE1DC',
    name: 'Рита',
    role: 'Шеф-кондитер',
    quote:
      'После мастер-класса я переделала всю линейку тортов. Гости заметили сразу.',
    initial: 'Р',
    ctaLabel: 'Смотреть курсы',
    usps: ['Демо-зона', 'Мастер-классы', 'База знаний', 'Обучение'],
    imageUrl: '/images/audiences/chef_conditer.jpg',
  },
  {
    id: 'consulting',
    direction: 'Консалтинг',
    heading: 'Консалтинг',
    href: '/consulting',
    colorL2: '#AACBFF',
    colorL1: '#5A8CD7',
    colorL3: '#E6F0FF',
    name: 'Дмитрий',
    role: 'Управляющий рестораном',
    quote:
      'Снизили фудкост с 38% до 28%. Меню и техкарты пересобрали за три месяца.',
    initial: 'Д',
    ctaLabel: 'Заказать проект',
    usps: ['Запуск', 'Перезапуск', 'Масштабирование'],
    imageUrl: '/images/audiences/manager1.jpg',
  },
  {
    id: 'club',
    direction: 'Бизнес-клуб',
    heading: 'Бизнес-клуб',
    href: '/club',
    colorL2: '#A5D2DC',
    colorL1: '#6EA5AA',
    colorL3: '#D7F0F5',
    name: 'Вадим',
    role: 'Ресторатор, 3 заведения',
    quote:
      'Здесь не продают — здесь делятся. Реальные решения от тех, кто уже прошёл этот путь.',
    initial: 'В',
    ctaLabel: 'Вступить в клуб',
    usps: ['Мероприятия', 'Нетворкинг', '300+ профессионалов в сообществе'],
    imageUrl: '/images/audiences/boss1.jpg',
  },
]

type Variant = 'photo' | 'color'

export function HeroAudiences({ variant = 'photo' }: { variant?: Variant } = {}) {
  return (
    <div
      className="grid grid-cols-1 bg-white md:grid-cols-2 lg:grid-cols-4"
      style={{
        gap: '14px',
        paddingLeft: 'clamp(20px, 3vw, 48px)',
        paddingRight: 'clamp(20px, 3vw, 48px)',
      }}
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

// Карточка не двигается сама — реагируют её внутренности.
// Фото "наезжает" (Ken Burns), pill-CTA вырастает, точка-маркер пульсирует.
const CARD_BASE =
  'group relative flex cursor-pointer flex-col overflow-hidden'

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
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
            />
          )}
        </div>

        {/* Тёмный градиент по нижнему краю фото — обеспечивает контраст
            белой подписи персоны независимо от яркости снимка. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%]"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 45%, transparent 100%)',
          }}
        />

        {/* Подпись героя — белая, прижата к низу фото. */}
        <div className="pointer-events-none absolute bottom-6 left-7 right-7 z-10">
          <p
            className="font-bold leading-tight text-white"
            style={{
              fontSize: '15px',
              textShadow: '0 2px 8px rgba(0,0,0,0.4)',
            }}
          >
            {a.name}
          </p>
          <p
            className="mt-0.5 leading-snug text-white/90"
            style={{
              fontSize: '12px',
              textShadow: '0 2px 8px rgba(0,0,0,0.4)',
            }}
          >
            {a.role}
          </p>
        </div>

        {/* Speech-bubble с цитатой героя — оверлей поверх фото.
            Сдвинут от верх-левого угла так, чтобы не задеть скругление 75px карточки. */}
        <div className="pointer-events-none absolute left-7 top-7 z-10 max-w-[72%]">
          <div
            className="relative rounded-2xl bg-white px-4 py-3"
            style={{
              boxShadow:
                '0 10px 24px -8px rgba(0,0,0,0.22), 0 2px 6px -2px rgba(0,0,0,0.12)',
            }}
          >
            <p
              className="leading-snug text-ink"
              style={{ fontSize: '14px', fontWeight: 500, lineHeight: 1.4 }}
            >
              «{a.quote}»
            </p>
            {/* «Хвостик» спич-бабла — клипом, чтобы не двойная тень */}
            <span
              aria-hidden
              className="absolute -bottom-[7px] left-6 block h-3 w-4 bg-white"
              style={{ clipPath: 'polygon(0 0, 100% 0, 35% 100%)' }}
            />
          </div>
        </div>
      </div>

      <div
        className="flex flex-col bg-white px-7 pb-7 pt-7 transition-colors duration-500 ease-out group-hover:bg-[var(--card-hover-bg)]"
        style={
          {
            minHeight: '320px',
            '--card-hover-bg': a.colorL3,
          } as React.CSSProperties
        }
      >
        {/* Заголовок направления — самое важное в карточке */}
        <h3
          className="mb-5 font-main font-black uppercase text-ink"
          style={{
            fontSize: 'clamp(22px, 2.1vw, 32px)',
            lineHeight: 1,
            letterSpacing: '-0.01em',
          }}
        >
          {a.heading}
        </h3>

        {/* УТП — bullet-лист с цветной точкой направления */}
        <ul className="mb-6 flex flex-1 flex-col gap-2.5">
          {a.usps.map((usp) => (
            <li key={usp} className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                style={{ background: a.colorL1 }}
              />
              <span className="text-[13px] leading-snug text-stone">{usp}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex justify-center">
          <span
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 shadow-none transition-all duration-300 ease-out group-hover:scale-[1.06] group-hover:shadow-[0_10px_24px_-6px_rgba(0,0,0,0.22)]"
            style={{ background: a.colorL1 }}
          >
            <span
              className="font-main font-bold uppercase text-white"
              style={{ fontSize: '10px', letterSpacing: '0.12em' }}
            >
              {a.ctaLabel}
            </span>
            <span
              className="font-bold text-white transition-transform duration-300 ease-out group-hover:translate-x-1"
              style={{ fontSize: '14px' }}
            >
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  )
}

// Биолюминесцентная палитра — ультрафиолетово-неоновый десерт.
// Каждый цвет — L1 из дизайн-системы, выбран для максимального glow-эффекта
// на конкретной L2-подложке.
const ORNAMENT_COLOR: Record<string, string> = {
  ingredients: '#EB6EC8', // magenta на amber-m → малиновая глазурь
  academy: '#7D78DC',     // violet на rose-m → черничная пенка
  consulting: '#A064DC',  // purple на blue-m → ультрафиолет в космосе
  club: '#F582A0',        // rose на sky → candy floss на бирюзе
}

function Ornament({ id }: { id: string }) {
  const accent = ORNAMENT_COLOR[id] ?? '#000'
  const stroke = accent
  const dot = accent
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
        {/* Top zone: primitive ornament unique per direction (fades on hover) */}
        <div className="relative -mx-7 -mt-9 flex-1 overflow-hidden transition-opacity duration-300 ease-out group-hover:opacity-30">
          <Ornament id={a.id} />
        </div>

        {/* Bottom zone: heading + quote + persona + CTA stacked compactly,
            slides up on hover to expose the USP list below */}
        <div className="relative z-10 pt-6 transition-transform duration-300 ease-out group-hover:-translate-y-[150px]">
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

        {/* USPs — fade in at the bottom on hover, content above shifts up */}
        <div
          className="pointer-events-none absolute inset-x-7 bottom-7 translate-y-3 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ul className="space-y-2.5">
            {a.usps.map((usp) => (
              <li
                key={usp}
                className="flex items-center gap-2.5 font-main font-medium text-ink"
                style={{ fontSize: '13px', lineHeight: '1.3' }}
              >
                <span
                  className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                  style={{ background: ORNAMENT_COLOR[a.id] ?? '#000' }}
                  aria-hidden="true"
                />
                <span>{usp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  )
}
