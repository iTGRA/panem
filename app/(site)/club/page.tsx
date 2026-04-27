import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Бизнес-клуб — среда совместного роста',
  description:
    'Форум «Пекарь&Кондитер» и «ПАНЭМ&HoReCa». Единственный отраслевой форум Поволжья. 100+ участников ежегодно.',
}

const STATS: { value: string; label: string }[] = [
  { value: '100+', label: 'участников ежегодно' },
  { value: '2021', label: 'год основания форума' },
  { value: '2', label: 'форума в год' },
]

const FORUMS: {
  title: string
  desc: string
  since: string
  color: string
}[] = [
  {
    title: 'Пекарь & Кондитер',
    desc: 'Ежегодный отраслевой форум для пекарей, кондитеров и производителей. Дегустации, тренды, нетворкинг.',
    since: 'С 2021 года',
    color: 'var(--c-amber)',
  },
  {
    title: 'ПАНЭМ & HoReCa',
    desc: 'Форум для рестораторов, шеф-поваров и кофеен. Актуальные тренды гастрономии и профессиональное сообщество.',
    since: 'С 2023 года',
    color: 'var(--c-teal)',
  },
]

const FORUM_POINTS = [
  'Доклады экспертов',
  'Дегустации новинок',
  'Дискуссии с сетями',
  'Нетворкинг',
]

const AUDIENCE: { role: string; desc: string }[] = [
  {
    role: 'Собственники',
    desc: 'предприятий пищевой промышленности и ресторанов',
  },
  { role: 'Руководители', desc: 'производств, шеф-повара, технологи' },
  { role: 'Профессионалы', desc: 'гастроиндустрии Поволжья и страны' },
]

export default function ClubPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-sand px-[var(--container-px)] py-16">
        <div className="mx-auto max-w-container">
          <span className="mb-4 block font-sub text-[9px] font-light uppercase tracking-[0.32em] text-mist">
            П А Н Э М · Б И З Н Е С - К Л У Б
          </span>

          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div>
              <h1
                className="mb-5 font-black uppercase tracking-[0.02em] text-ink"
                style={{ fontSize: 'clamp(28px,5vw,64px)', lineHeight: '0.95' }}
              >
                СРЕДА, ГДЕ
                <br />
                РОЖДАЮТСЯ
                <br />
                ИДЕИ.
              </h1>
              <p className="mb-8 max-w-md text-sm leading-relaxed text-stone">
                Бизнес-клуб для собственников и руководителей предприятий
                пищевой промышленности и ресторанов Поволжья. Мы создаём
                пространство для обмена опытом и совместного роста.
              </p>
              <a
                href="#join"
                className="inline-block px-6 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-90"
                style={{
                  background: 'var(--c-teal)',
                  borderRadius: 'var(--r-xs)',
                }}
              >
                Вступить в клуб
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="border-t-[3px] pt-4"
                  style={{ borderColor: 'var(--c-teal)' }}
                >
                  <span
                    className="block font-black text-ink"
                    style={{
                      fontSize: 'clamp(24px,3vw,40px)',
                      lineHeight: '1',
                    }}
                  >
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-[11px] text-mist">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="px-[var(--container-px)] py-12"
        style={{ background: 'var(--c-warm)' }}
      >
        <div className="mx-auto max-w-container">
          <h2
            className="mb-8 font-black uppercase tracking-[0.02em] text-ink"
            style={{ fontSize: 'clamp(20px,3vw,36px)', lineHeight: '1.0' }}
          >
            НАШИ ФОРУМЫ
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {FORUMS.map((forum) => (
              <div
                key={forum.title}
                className="rounded-card border border-sand bg-white p-8"
                style={{ borderTop: `3px solid ${forum.color}` }}
              >
                <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.18em] text-mist">
                  {forum.since}
                </span>

                <h3
                  className="mb-4 font-black uppercase tracking-[0.02em] text-ink"
                  style={{
                    fontSize: 'clamp(18px,2.5vw,32px)',
                    lineHeight: '1.0',
                  }}
                >
                  {forum.title}
                </h3>

                <p className="mb-6 text-sm leading-relaxed text-stone">
                  {forum.desc}
                </p>

                <div className="grid grid-cols-2 gap-2">
                  {FORUM_POINTS.map((point) => (
                    <div key={point} className="flex items-start gap-2">
                      <span
                        className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                        style={{ background: forum.color }}
                      />
                      <span className="text-[12px] text-stone">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-[var(--container-px)] py-12">
        <div className="mx-auto max-w-container">
          <h2
            className="mb-8 font-black uppercase tracking-[0.02em] text-ink"
            style={{ fontSize: 'clamp(20px,3vw,36px)', lineHeight: '1.0' }}
          >
            ДЛЯ КОГО
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {AUDIENCE.map((who) => (
              <div
                key={who.role}
                className="border-t-[3px] pt-5"
                style={{ borderColor: 'var(--c-teal)' }}
              >
                <p className="mb-2 text-[14px] font-bold uppercase tracking-[0.06em] text-ink">
                  {who.role}
                </p>
                <p className="text-[12px] leading-relaxed text-stone">
                  {who.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="join"
        className="px-[var(--container-px)] py-16"
        style={{ background: 'var(--c-ink)' }}
      >
        <div className="mx-auto max-w-[640px] text-center">
          <h2
            className="mb-3 font-black uppercase tracking-[0.02em] text-white"
            style={{ fontSize: 'clamp(22px,4vw,48px)', lineHeight: '0.95' }}
          >
            ВСТУПИТЬ
            <br />
            В КЛУБ
          </h2>
          <p className="mb-8 text-sm text-mist">
            Свяжитесь с нами — расскажем об условиях участия.
          </p>
          <a
            href="tel:+78463212020"
            className="inline-block px-8 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-90"
            style={{
              background: 'var(--c-teal)',
              borderRadius: 'var(--r-xs)',
            }}
          >
            Позвонить: +7 (846) 321-20-20
          </a>
        </div>
      </section>
    </main>
  )
}
