import Link from 'next/link'
import { HeroAudiences } from './HeroAudiences'

export function HeroBlock() {
  return (
    <section>
      <div className="mx-auto max-w-container px-[var(--container-px)] pb-12 pt-16">
        <span className="mb-6 block font-sub text-[9px] font-light uppercase tracking-[0.32em] text-mist">
          Д Л Я  Т Е Х ,  К Т О  К О Р М И Т  П О В О Л Ж Ь Е
        </span>

        <h1
          className="appear mb-8 font-main font-black uppercase text-ink"
          style={{
            fontSize: 'clamp(40px, 6.5vw, 96px)',
            lineHeight: '0.93',
            letterSpacing: '-0.01em',
          }}
        >
          ИНГРЕДИЕНТЫ
          <br />
          ДЛЯ ПЕКАРЕН,
          <br />
          РЕСТОРАНОВ
          <br />
          И ПРОИЗВОДСТВ.
        </h1>

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
              border: '0.5px solid var(--c-sand)',
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
