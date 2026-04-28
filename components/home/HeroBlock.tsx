import Link from 'next/link'
import { HeroAudiences } from './HeroAudiences'

export function HeroBlock() {
  return (
    <section className="pb-12 md:pb-20">
      <div className="mx-auto max-w-container px-[var(--container-px)] pb-12 pt-16">
        <h1
          className="appear mb-7 font-main font-black uppercase text-ink"
          style={{
            fontSize: 'clamp(36px, 5.6vw, 84px)',
            lineHeight: '0.95',
            letterSpacing: '-0.01em',
          }}
        >
          ИНГРЕДИЕНТЫ
          <br />
          ДЛЯ КОНДИТЕРОВ,
          <br />
          РЕСТОРАНОВ, ПЕКАРЕН,
          <br />
          КАФЕ И ПРОИЗВОДСТВ.
        </h1>

        <p
          className="appear appear-d1 mb-10 max-w-[640px] leading-relaxed text-stone"
          style={{ fontSize: 'clamp(16px, 1.3vw, 20px)' }}
        >
          Получайте профессиональный сервис, экономьте время, развивайте свои
          проекты.
        </p>

        <div className="appear appear-d1 flex flex-wrap gap-3">
          <Link
            href="/catalog"
            className="bg-ink px-7 py-3.5 font-main font-bold uppercase text-white transition-colors duration-200 hover:bg-stone"
            style={{
              fontSize: '10px',
              letterSpacing: '0.22em',
              borderRadius: 'var(--r-xs)',
            }}
          >
            Перейти в каталог
          </Link>
          <a
            href="#contact"
            className="px-7 py-3.5 font-main font-bold uppercase text-stone transition-colors duration-200 hover:border-ink hover:text-ink"
            style={{
              fontSize: '10px',
              letterSpacing: '0.22em',
              borderRadius: 'var(--r-xs)',
              border: '1px solid var(--c-stone)',
            }}
          >
            Стать партнёром
          </a>
        </div>
      </div>

      <HeroAudiences />
    </section>
  )
}
