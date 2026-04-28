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
            className="group/cta inline-flex items-center gap-2 bg-ink px-7 py-3.5 font-main font-bold uppercase text-white shadow-none transition-all duration-300 ease-out hover:bg-stone hover:shadow-[0_10px_24px_-8px_rgba(0,0,0,0.4)]"
            style={{
              fontSize: '10px',
              letterSpacing: '0.22em',
              borderRadius: 'var(--r-xs)',
            }}
          >
            <span>Перейти в каталог</span>
            <span
              aria-hidden
              className="transition-transform duration-300 ease-out group-hover/cta:translate-x-1"
              style={{ fontSize: '13px' }}
            >
              →
            </span>
          </Link>
          <a
            href="#contact"
            className="group/sec relative inline-flex items-center overflow-hidden px-7 py-3.5 font-main font-bold uppercase text-stone transition-colors duration-300 hover:text-white"
            style={{
              fontSize: '10px',
              letterSpacing: '0.22em',
              borderRadius: 'var(--r-xs)',
              border: '1px solid var(--c-stone)',
            }}
          >
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-0 origin-bottom bg-ink transition-[height] duration-300 ease-out group-hover/sec:h-full"
            />
            <span className="relative">Стать партнёром</span>
          </a>
        </div>
      </div>

      <HeroAudiences />
    </section>
  )
}
