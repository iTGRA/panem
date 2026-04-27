import type { Metadata } from 'next'
import { cn } from '@/lib/utils'
import { FilterChipsDemo } from '@/components/lab/FilterChipsDemo'
import { RequestFormDemo } from '@/components/lab/RequestFormDemo'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import {
  AppearDemo,
  HoverDemo,
  DropdownDemo,
  TooltipDemo,
} from '@/components/lab/MotionDemo'
import { HeroAudiences } from '@/components/home/HeroAudiences'

export const metadata: Metadata = {
  title: 'Design Lab',
  robots: { index: false, follow: false },
}

// ─── Цветовые наборы ──────────────────────────────────────

type Chip = { name: string; hex: string; dark?: boolean }

const NEUTRALS: Chip[] = [
  { name: 'ink', hex: '#1D1D1B', dark: true },
  { name: 'stone', hex: '#4A4845', dark: true },
  { name: 'mist', hex: '#9A9890', dark: true },
  { name: 'sand', hex: '#D4CFC4' },
  { name: 'warm', hex: '#F0EBE0' },
  { name: 'white', hex: '#FFFFFF' },
]

const L1_COLORS: Chip[] = [
  { name: 'amber', hex: '#FFB45A' },
  { name: 'yellow', hex: '#FFD232' },
  { name: 'lime', hex: '#CDDC3C' },
  { name: 'teal', hex: '#6EA5AA' },
  { name: 'blue', hex: '#5A8CD7' },
  { name: 'violet', hex: '#7D78DC' },
  { name: 'purple', hex: '#A064DC' },
  { name: 'magenta', hex: '#EB6EC8' },
  { name: 'rose', hex: '#F582A0' },
  { name: 'coral', hex: '#FF967D' },
]

const L2_COLORS: Chip[] = [
  { name: 'amber-m', hex: '#FFD291' },
  { name: 'yellow-m', hex: '#FFE16E' },
  { name: 'mint', hex: '#AFE6C3' },
  { name: 'sky', hex: '#A5D2DC' },
  { name: 'blue-m', hex: '#AACBFF' },
  { name: 'violet-m', hex: '#BEB4FA' },
  { name: 'lavender', hex: '#CD9BF5' },
  { name: 'lilac', hex: '#F5BEE6' },
  { name: 'rose-m', hex: '#FAC3D2' },
  { name: 'peach', hex: '#FFCBB5' },
  { name: 'lime-m', hex: '#E6F596' },
]

const L3_COLORS: Chip[] = [
  { name: 'amber-t', hex: '#FCF0C8' },
  { name: 'yellow-t', hex: '#FFF0CD' },
  { name: 'lime-t', hex: '#F5FAC8' },
  { name: 'mint-t', hex: '#D2FAE6' },
  { name: 'sky-t', hex: '#D7F0F5' },
  { name: 'blue-t', hex: '#E6F0FF' },
  { name: 'purple-t', hex: '#F0E6FF' },
  { name: 'lilac-t', hex: '#F8DBFF' },
  { name: 'rose-t', hex: '#FFE1DC' },
]

const DIRECTIONS = [
  { name: 'Ингредиенты', l1: '#FFB45A', l2: '#FFD291', l3: '#FCF0C8' },
  { name: 'Академия', l1: '#F582A0', l2: '#FAC3D2', l3: '#FFE1DC' },
  { name: 'Консалтинг', l1: '#5A8CD7', l2: '#AACBFF', l3: '#E6F0FF' },
  { name: 'Клуб', l1: '#6EA5AA', l2: '#A5D2DC', l3: '#D7F0F5' },
]

// ─── UI-помощники для лаборатории ─────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-10 text-[10px] font-bold uppercase tracking-[0.28em] text-mist">
      {children}
    </div>
  )
}

function Section({
  num,
  title,
  bg = 'white',
  children,
}: {
  num: string
  title: string
  bg?: 'white' | 'warm'
  children: React.ReactNode
}) {
  return (
    <section
      className={cn(
        'border-b border-sand px-[var(--container-px)] py-16',
        bg === 'warm' ? 'bg-warm' : 'bg-white',
      )}
    >
      <div className="mx-auto max-w-container">
        <SectionLabel>
          {num} · {title}
        </SectionLabel>
        {children}
      </div>
    </section>
  )
}

function ColorChip({
  chip,
  height = 64,
}: {
  chip: Chip
  height?: number
}) {
  const textColor = chip.dark ? 'rgba(255,255,255,.55)' : 'rgba(0,0,0,.45)'
  const nameColor = chip.dark ? 'rgba(255,255,255,.75)' : 'rgba(0,0,0,.6)'
  return (
    <div
      className={cn(
        'flex flex-1 min-w-0 flex-col justify-end rounded-card border p-3',
        chip.hex.toLowerCase() === '#ffffff' ? 'border-sand' : 'border-transparent',
      )}
      style={{ background: chip.hex, height }}
    >
      <div className="text-[11px] font-bold leading-none" style={{ color: nameColor }}>
        {chip.name}
      </div>
      <div className="mt-0.5 text-[10px] leading-none tabular-nums" style={{ color: textColor }}>
        {chip.hex.toUpperCase()}
      </div>
    </div>
  )
}

// ─── Подсекции карточек ───────────────────────────────────

function DirectionCard({
  desc,
  name,
  description,
  cta,
  l1,
  l3,
}: {
  desc: string
  name: string
  description: string
  cta: string
  l1: string
  l3: string
}) {
  return (
    <article
      className="rounded-card border border-sand p-5"
      style={{ background: l3, borderTop: `3px solid ${l1}` }}
    >
      <div className="font-sub text-[8px] uppercase tracking-[0.28em] text-mist">{desc}</div>
      <h3 className="mt-3 text-lg font-bold uppercase tracking-[0.06em] text-ink">{name}</h3>
      <p className="mt-2 text-[13px] leading-[1.55] text-stone">{description}</p>
      <a
        href="#"
        className="mt-4 inline-block text-[9px] font-bold uppercase tracking-[0.18em]"
        style={{ color: l1 }}
      >
        {cta}
      </a>
    </article>
  )
}

function Portrait({
  letter,
  l2,
  role,
  name,
  business,
  tall,
}: {
  letter: string
  l2: string
  role: string
  name: string
  business: string
  tall?: boolean
}) {
  return (
    <article
      className={cn(
        'relative overflow-hidden rounded-port p-[18px]',
        tall ? 'row-span-2 min-h-[280px]' : 'min-h-[140px]',
      )}
      style={{ background: l2 }}
    >
      <span
        className="absolute right-4 top-3 select-none font-black"
        style={{ fontSize: 48, color: 'rgba(0,0,0,.08)', lineHeight: 1 }}
      >
        {letter}
      </span>
      <div className="absolute inset-x-[18px] bottom-[18px]">
        <div className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: 'rgba(0,0,0,.38)' }}>
          {role}
        </div>
        <div className="mt-1 text-[15px] font-bold" style={{ color: 'rgba(0,0,0,.65)' }}>
          {name}
        </div>
        <div className="text-[11px] font-light" style={{ color: 'rgba(0,0,0,.38)' }}>
          {business}
        </div>
      </div>
    </article>
  )
}

function ProductCard({
  brand,
  name,
  application,
  packaging,
  borderTop,
  badge,
  badgeColor,
  badgeTextColor = 'rgba(0,0,0,.65)',
  segments,
}: {
  brand: string
  name: string
  application: string
  packaging: string
  borderTop: string
  badge?: string
  badgeColor?: string
  badgeTextColor?: string
  segments: { label: string; l2: string }[]
}) {
  return (
    <article
      className="group relative rounded-card border border-sand bg-white p-5 transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 hover:shadow-card"
      style={{ borderTop: `3px solid ${borderTop}` }}
    >
      {badge && (
        <span
          className="absolute right-3 top-3 rounded-xs px-2 py-1 text-[8px] font-bold uppercase tracking-[0.18em]"
          style={{ background: badgeColor, color: badgeTextColor }}
        >
          {badge}
        </span>
      )}
      <div className="flex aspect-[4/3] items-center justify-center rounded-sm bg-warm text-mist text-xs">
        [Фото]
      </div>
      <div className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-mist">{brand}</div>
      <h3 className="mt-1 text-sm font-semibold text-ink">{name}</h3>
      <div className="mt-1 text-xs font-light text-stone">
        {packaging} · {application}
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {segments.map((s) => (
          <span
            key={s.label}
            className="rounded-full px-2.5 py-1 text-[9px] font-medium"
            style={{ background: s.l2, color: 'rgba(0,0,0,.55)' }}
          >
            {s.label}
          </span>
        ))}
      </div>
      <button
        type="button"
        className="mt-4 w-full rounded-xs bg-ink py-2 text-[9px] font-bold uppercase tracking-[0.22em] text-white transition-colors duration-200 hover:bg-stone"
      >
        Запросить цену
      </button>
    </article>
  )
}

const CONTENT_TAGS = [
  { label: 'Рецептура', bg: '#FFD291' },
  { label: 'Технология', bg: '#A5D2DC' },
  { label: 'Видео', bg: '#FFCBB5' },
  { label: 'Тренд', bg: '#E6F596' },
  { label: 'Гайд', bg: '#BEB4FA' },
  { label: 'Интервью', bg: '#CD9BF5' },
  { label: 'Кейс', bg: '#AACBFF' },
  { label: 'Новость', bg: '#D4CFC4' },
] as const

function ContentTag({ label, bg }: { label: string; bg: string }) {
  return (
    <span
      className="rounded-xs px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.20em]"
      style={{ background: bg, color: 'rgba(0,0,0,.6)' }}
    >
      {label}
    </span>
  )
}

const BADGES = [
  { label: 'Новинка', bg: '#CDDC3C' },
  { label: 'Хит', bg: '#FFB45A' },
  { label: 'Акция', bg: '#F582A0' },
  { label: 'Под заказ', bg: '#D4CFC4' },
] as const

function Badge({ label, bg }: { label: string; bg: string }) {
  return (
    <span
      className="rounded-xs px-2 py-1 text-[8px] font-bold uppercase tracking-[0.18em]"
      style={{ background: bg, color: 'rgba(0,0,0,.65)' }}
    >
      {label}
    </span>
  )
}

function ArticleCard({
  tagLabel,
  tagBg,
  title,
  date,
  ctaColor,
}: {
  tagLabel: string
  tagBg: string
  title: string
  date: string
  ctaColor: string
}) {
  return (
    <article className="overflow-hidden rounded-card border border-sand bg-white">
      <div className="flex aspect-[16/9] items-center justify-center bg-warm text-mist text-xs">
        [Фото 16:9]
      </div>
      <div className="p-5">
        <ContentTag label={tagLabel} bg={tagBg} />
        <h3 className="mt-3 text-base font-medium leading-[1.3] text-ink">{title}</h3>
        <div className="mt-2 text-xs font-light text-mist">{date} · краткое описание материала</div>
        <a
          href="#"
          className="mt-3 inline-block text-[9px] font-bold uppercase tracking-[0.18em]"
          style={{ color: ctaColor }}
        >
          Читать →
        </a>
      </div>
    </article>
  )
}

// ─── Страница ─────────────────────────────────────────────

export default function LabPage() {
  return (
    <div>
      {/* Header полосы лаборатории */}
      <div className="bg-white px-[var(--container-px)] py-12">
        <div className="mx-auto max-w-container">
          <span className="font-sub text-[10px] uppercase tracking-[0.32em] text-mist">
            D E S I G N &nbsp; L A B
          </span>
          <h1 className="mt-4 text-[clamp(36px,4.5vw,64px)] font-bold uppercase leading-none tracking-tight text-ink">
            ПАНЭМ · витрина дизайн-системы v1.1
          </h1>
          <p className="mt-4 max-w-narrow text-base text-stone">
            Каждый компонент — изолированный пример. Перед использованием в продакшн-страницах
            проверяется на этой витрине.
          </p>
        </div>
      </div>

      {/* 01 ЦВЕТА */}
      <Section num="01" title="Цвета">
        <h3 className="mb-3 text-base font-bold uppercase tracking-[0.06em] text-ink">Нейтральные</h3>
        <div className="flex gap-3">
          {NEUTRALS.map((c) => (
            <ColorChip key={c.name} chip={c} />
          ))}
        </div>

        <h3 className="mb-3 mt-12 text-base font-bold uppercase tracking-[0.06em] text-ink">
          Level 1 — насыщенные
        </h3>
        <div className="flex gap-3">
          {L1_COLORS.map((c) => (
            <ColorChip key={c.name} chip={c} />
          ))}
        </div>

        <h3 className="mb-3 mt-12 text-base font-bold uppercase tracking-[0.06em] text-ink">
          Level 2 — средние
        </h3>
        <div className="flex gap-3">
          {L2_COLORS.map((c) => (
            <ColorChip key={c.name} chip={c} />
          ))}
        </div>

        <h3 className="mb-3 mt-12 text-base font-bold uppercase tracking-[0.06em] text-ink">
          Level 3 — тинты
        </h3>
        <div className="flex gap-3">
          {L3_COLORS.map((c) => (
            <ColorChip key={c.name} chip={c} height={36} />
          ))}
        </div>

        <h3 className="mb-3 mt-12 text-base font-bold uppercase tracking-[0.06em] text-ink">
          Кодирование направлений
        </h3>
        <div className="overflow-hidden rounded-card border border-sand">
          <table className="w-full text-sm">
            <thead className="bg-warm">
              <tr>
                <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.18em] text-mist">
                  Направление
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.18em] text-mist">
                  L1
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.18em] text-mist">
                  L2
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.18em] text-mist">
                  L3
                </th>
              </tr>
            </thead>
            <tbody>
              {DIRECTIONS.map((d) => (
                <tr key={d.name} className="border-t border-sand">
                  <td className="px-4 py-3 font-medium text-ink">{d.name}</td>
                  {[d.l1, d.l2, d.l3].map((hex) => (
                    <td key={hex} className="px-4 py-3 align-middle">
                      <span className="inline-flex items-center gap-2">
                        <span
                          className="inline-block h-4 w-4 rounded-sm border border-sand"
                          style={{ background: hex }}
                        />
                        <span className="font-mono text-xs tabular-nums">{hex}</span>
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 02 ТИПОГРАФИКА */}
      <Section num="02" title="Типографика" bg="warm">
        <div className="grid gap-10">
          {[
            {
              label: 'Onest Black 900 · Display',
              demo: (
                <div className="text-[clamp(48px,7vw,96px)] font-black leading-[0.93] text-ink">
                  ПАНЭМ
                </div>
              ),
            },
            {
              label: 'Onest Bold 700 · H1 · Uppercase',
              demo: (
                <h1 className="text-[clamp(36px,4.5vw,64px)] font-bold uppercase leading-none tracking-tight text-ink">
                  МЫ СИЛЬНОЕ ПЛЕЧО
                </h1>
              ),
            },
            {
              label: 'Onest Bold 700 · H2 · Uppercase',
              demo: (
                <h2 className="text-[clamp(24px,3vw,40px)] font-bold uppercase leading-[1.1] tracking-tight text-ink">
                  Ингредиенты для гастроиндустрии
                </h2>
              ),
            },
            {
              label: 'Onest Bold 700 · H3',
              demo: (
                <h3 className="text-[clamp(18px,2vw,26px)] font-bold leading-tight text-ink">
                  Технологическая поддержка 24/7
                </h3>
              ),
            },
            {
              label: 'Onest Medium 500 · Subtitle',
              demo: (
                <p className="text-[clamp(15px,1.5vw,20px)] font-medium text-ink">
                  Ингредиенты для гастроиндустрии Поволжья
                </p>
              ),
            },
            {
              label: 'Onest Regular 400 · Body · 16px · lh 1.65',
              demo: (
                <p className="max-w-narrow text-base leading-[1.65] text-ink">
                  Мы поставляем ингредиенты как фундамент: надёжно, технологично и с пониманием того,
                  что от каждой партии зависит результат гостя.
                </p>
              ),
            },
            {
              label: 'Onest Regular 400 · Body-sm · 14px',
              demo: <p className="text-sm leading-[1.6] text-stone">Barry Callebaut · Бельгия · 2,5 кг</p>,
            },
            {
              label: 'Onest Light 300 · Caption · 12px',
              demo: (
                <p className="text-xs font-light leading-[1.5] text-mist">
                  Дистрибуция ингредиентов для гастроиндустрии — основа экосистемы
                </p>
              ),
            },
            {
              label: 'Onest Bold 700 · Label · 10px · Uppercase · ls 0.28em',
              demo: (
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-ink">
                  ХЛЕБОПЕКАРНОЕ · КОНДИТЕРСКОЕ · HORECA
                </p>
              ),
            },
            {
              label: 'Exo 2 Light 300 · Descriptor · 10px · ls 0.32em (только суббренды!)',
              demo: (
                <p className="font-sub text-[10px] font-light uppercase tracking-[0.32em] text-mist">
                  А К А Д Е М И Я
                </p>
              ),
            },
          ].map((row) => (
            <div key={row.label} className="grid gap-3 md:grid-cols-[260px_1fr] md:gap-8">
              <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-mist md:pt-2">
                {row.label}
              </div>
              <div>{row.demo}</div>
            </div>
          ))}

          <div className="grid gap-3 md:grid-cols-[260px_1fr] md:gap-8">
            <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-mist md:pt-2">
              Bold + Light контраст
            </div>
            <div className="leading-[0.95] text-ink">
              <div className="text-[clamp(36px,5vw,72px)] font-bold uppercase">МЫ СИЛЬНОЕ</div>
              <div className="text-[clamp(36px,5vw,72px)] font-bold uppercase">ПЛЕЧО</div>
              <div className="mt-1 text-[clamp(20px,2.4vw,32px)] font-light">для развития</div>
              <div className="text-[clamp(36px,5vw,72px)] font-bold uppercase">ВКУСНОГО</div>
              <div className="text-[clamp(36px,5vw,72px)] font-bold uppercase">БИЗНЕСА</div>
            </div>
          </div>
        </div>
      </Section>

      {/* 03 КНОПКИ */}
      <Section num="03" title="Кнопки">
        <div className="flex flex-wrap items-end gap-8">
          <div>
            <button
              type="button"
              className="rounded-xs bg-ink px-6 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition-colors duration-200 hover:bg-stone"
            >
              Получить прайс
            </button>
            <div className="mt-2 text-[10px] text-mist">btn-primary</div>
          </div>
          <div>
            <button
              type="button"
              className="rounded-xs border border-sand px-6 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-stone transition-colors duration-200 hover:border-ink hover:text-ink"
            >
              Стать партнёром
            </button>
            <div className="mt-2 text-[10px] text-mist">btn-secondary</div>
          </div>
          <div>
            <button
              type="button"
              className="rounded-xs bg-amber px-6 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-ink transition-[transform,opacity] duration-150 hover:-translate-y-px hover:opacity-90"
            >
              Записаться
            </button>
            <div className="mt-2 text-[10px] text-mist">btn-accent · только один на странице</div>
          </div>
        </div>
      </Section>

      {/* 04 КАРТОЧКИ НАПРАВЛЕНИЙ */}
      <Section num="04" title="Карточки направлений" bg="warm">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DirectionCard
            desc="И Н Г Р Е Д И Е Н Т Ы"
            name="Каталог"
            description="2300+ ингредиентов для пекарен, кондитерских и HoReCa."
            cta="Получить прайс →"
            l1="#FFB45A"
            l3="#FCF0C8"
          />
          <DirectionCard
            desc="А К А Д Е М И Я"
            name="Обучение"
            description="Мастер-классы технологов и фотоотчёты прошедших семинаров."
            cta="Расписание →"
            l1="#F582A0"
            l3="#FFE1DC"
          />
          <DirectionCard
            desc="К О Н С А Л Т И Н Г"
            name="Решения"
            description="Кейсы по снижению себестоимости и стабилизации качества."
            cta="Обсудить →"
            l1="#5A8CD7"
            l3="#E6F0FF"
          />
          <DirectionCard
            desc="Б И З Н Е С - К Л У Б"
            name="Сообщество"
            description="Закрытое сообщество участников гастроиндустрии Поволжья."
            cta="Вступить →"
            l1="#6EA5AA"
            l3="#D7F0F5"
          />
        </div>
      </Section>

      {/* 05 ПОРТРЕТЫ АУДИТОРИЙ */}
      <Section num="05" title="Портреты аудиторий">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <Portrait letter="П" l2="#FFD291" role="Пекарня" name="Вадим, 41" business="Сеть 5 точек" tall />
          <Portrait letter="К" l2="#FAC3D2" role="Кондитер" name="Анна, 33" business="Свой цех" />
          <Portrait letter="Р" l2="#AFE6C3" role="Ресторан" name="Рита, 29" business="Шеф-повар" />
          <Portrait letter="К" l2="#A5D2DC" role="Кофейня" name="Дима, 27" business="2 кофейни" />
          <Portrait letter="Б" l2="#FFCBB5" role="Бургерная" name="Артём, 31" business="Фастфуд-сеть" />
          <Portrait letter="С" l2="#BEB4FA" role="Столовая" name="Ирина, 44" business="Корппитание" />
        </div>

        <div className="mt-8">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-mist">
            Hero Audiences — новый компонент
          </p>
          <HeroAudiences />
        </div>
      </Section>

      {/* 06 КАРТОЧКИ ТОВАРОВ */}
      <Section num="06" title="Карточки товаров" bg="warm">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ProductCard
            brand="Barry Callebaut"
            name="Шоколад тёмный 70%"
            application="Темперирование, покрытие"
            packaging="2,5 кг"
            borderTop="#FFB45A"
            badge="Хит"
            badgeColor="#FFB45A"
            segments={[
              { label: 'Кондитерская', l2: '#FAC3D2' },
              { label: 'Кофейня', l2: '#A5D2DC' },
            ]}
          />
          <ProductCard
            brand="Backaldrin"
            name="Смесь для булочек Brötchen"
            application="Булочки, хот-доги"
            packaging="25 кг"
            borderTop="#FFB45A"
            badge="Новинка"
            badgeColor="#CDDC3C"
            segments={[
              { label: 'Пекарня', l2: '#FFD291' },
              { label: 'Бургерная', l2: '#FFCBB5' },
            ]}
          />
          <ProductCard
            brand="Lactalis"
            name="Сливки 33% профессиональные"
            application="Крем, латте-арт"
            packaging="1 л"
            borderTop="#A5D2DC"
            segments={[
              { label: 'Кофейня', l2: '#A5D2DC' },
              { label: 'Кондитерская', l2: '#FAC3D2' },
            ]}
          />
          <ProductCard
            brand="Roha"
            name="Красители пищевые"
            application="Гелевые, жирораств."
            packaging="100 г"
            borderTop="#FF967D"
            badge="Акция"
            badgeColor="#F582A0"
            segments={[{ label: 'Кондитерская', l2: '#FAC3D2' }]}
          />
        </div>
      </Section>

      {/* 07 ФИЛЬТРЫ-ЧИПЫ */}
      <Section num="07" title="Фильтры-чипы">
        <h3 className="mb-4 text-base font-bold text-ink">Фильтрация по типу бизнеса</h3>
        <FilterChipsDemo />
      </Section>

      {/* 08 ТЕГИ КОНТЕНТА */}
      <Section num="08" title="Теги контента" bg="warm">
        <div className="flex flex-wrap gap-2">
          {CONTENT_TAGS.map((t) => (
            <ContentTag key={t.label} label={t.label} bg={t.bg} />
          ))}
        </div>
      </Section>

      {/* 09 БЕЙДЖИ */}
      <Section num="09" title="Бейджи">
        <div className="flex flex-wrap items-center gap-3">
          {BADGES.map((b) => (
            <Badge key={b.label} label={b.label} bg={b.bg} />
          ))}
        </div>
      </Section>

      {/* 10 SHOPPABLE ССЫЛКА */}
      <Section num="10" title="Shoppable ссылка" bg="warm">
        <p className="max-w-[640px] text-base leading-[1.65] text-ink">
          Для приготовления чёрного бургера вам понадобятся{' '}
          <a className="shoppable-link" href="#">
            смесь для булки Backaldrin
          </a>
          ,{' '}
          <a className="shoppable-link" href="#">
            соус чёрный Унигра
          </a>{' '}
          и{' '}
          <a className="shoppable-link" href="#">
            активированный уголь пищевой
          </a>
          . Технолог ПАНЭМ поможет подобрать точные пропорции.
        </p>

        <div className="mt-8 max-w-[320px] rounded-card border border-sand bg-white p-3.5 shadow-dropdown">
          <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-mist">
            Backaldrin · Австрия
          </div>
          <div className="mt-1.5 text-sm font-medium text-ink">Смесь для булки Brötchen</div>
          <div className="mt-1 text-xs font-light text-stone">Фасовка: 25 кг</div>
          <button
            type="button"
            className="mt-3 rounded-xs bg-ink px-3 py-2 text-[9px] font-bold uppercase tracking-[0.22em] text-white"
          >
            Запросить цену
          </button>
        </div>
      </Section>

      {/* 11 КАРТОЧКИ СТАТЕЙ */}
      <Section num="11" title="Карточки статей">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <ArticleCard
            tagLabel="Рецептура"
            tagBg="#FFD291"
            title="Как сделать чёрный бургер"
            date="15 апреля 2025"
            ctaColor="#FFB45A"
          />
          <ArticleCard
            tagLabel="Кейс"
            tagBg="#AACBFF"
            title="Снизили себестоимость на 18%"
            date="10 апреля 2025"
            ctaColor="#5A8CD7"
          />
          <ArticleCard
            tagLabel="Тренд"
            tagBg="#E6F596"
            title="Матча в 2025: как работать с ингредиентом"
            date="5 апреля 2025"
            ctaColor="#CDDC3C"
          />
        </div>
      </Section>

      {/* 12 ЧЕРЕДОВАНИЕ СЕКЦИЙ */}
      <Section num="12" title="Чередование секций" bg="warm">
        <div className="overflow-hidden rounded-card border border-sand">
          <div className="flex h-20 items-center justify-center bg-white text-sm text-stone">
            White #FFFFFF — основной фон страницы
          </div>
          <div className="flex h-20 items-center justify-center bg-warm text-sm text-stone">
            Warm #F0EBE0 — чередующийся фон
          </div>
          <div className="flex h-20 items-center justify-center bg-white text-sm text-stone">
            White #FFFFFF — снова основной
          </div>
          <div className="flex h-20 items-center justify-center bg-ink text-sm text-white">
            Ink #1D1D1B — только финальный CTA-блок
          </div>
        </div>
      </Section>

      {/* 13 ФОРМА */}
      <Section num="13" title="Форма">
        <h3 className="mb-6 text-base font-bold text-ink">Запросить прайс</h3>
        <RequestFormDemo />
      </Section>

      {/* 14 НАВИГАЦИЯ */}
      <Section num="14" title="Навигация" bg="warm">
        <div className="overflow-hidden rounded-card border border-sand">
          <p className="bg-warm px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-mist">
            Header Component
          </p>
          <Header sticky={false} />
        </div>

        <div className="mt-4 overflow-hidden rounded-card border border-sand">
          <p className="bg-warm px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-mist">
            Footer Component
          </p>
          <Footer />
        </div>
      </Section>

      {/* 15 MOTION */}
      <Section num="15" title="Motion">
        <div className="grid gap-12">
          <div>
            <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-mist">
              Appear on scroll · stagger 80ms
            </div>
            <AppearDemo />
          </div>

          <div>
            <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-mist">
              Hover state · карточка
            </div>
            <HoverDemo />
          </div>

          <div>
            <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-mist">
              Dropdown · scaleY + opacity
            </div>
            <DropdownDemo />
          </div>

          <div>
            <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-mist">
              Tooltip · delay 200ms
            </div>
            <TooltipDemo />
          </div>
        </div>
      </Section>
    </div>
  )
}
