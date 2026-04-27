import { Button } from '@/components/ui/Button'
import { PortraitGrid } from './PortraitGrid'

export function HeroBlock() {
  return (
    <section className="bg-white px-[var(--container-px)] py-16 md:py-24">
      <div className="mx-auto grid max-w-container items-center gap-12 md:grid-cols-2">
        {/* Левая часть */}
        <div className="appear">
          <span className="mb-5 block font-sub text-[9px] font-light uppercase tracking-[0.32em] text-mist">
            Д Л Я  Т Е Х ,  К Т О  К О Р М И Т  П О В О Л Ж Ь Е
          </span>

          <h1
            className="font-main font-black uppercase tracking-[0.02em] text-ink"
            style={{ fontSize: 'clamp(32px, 4.2vw, 60px)', lineHeight: 0.95 }}
          >
            ИНГРЕДИЕНТЫ
            <br />
            ДЛЯ ПЕКАРЕН,
            <br />
            РЕСТОРАНОВ
            <br />
            И ПРОИЗВОДСТВ.
          </h1>

          <div className="mt-6 max-w-[440px]">
            <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.18em] text-ink">
              Поставляем · Обучаем · Консультируем
            </p>
            <p className="text-sm leading-[1.65] text-stone">
              2&nbsp;500+ SKU от 50 брендов.
              <br />
              Barry Callebaut, Backaldrin, Lesaffre и другие.
              <br />
              Самара · Саратов · Пенза.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/catalog" variant="primary">
              Перейти в каталог
            </Button>
            <Button href={'/about#contact'} variant="secondary">
              Стать партнёром
            </Button>
          </div>
        </div>

        {/* Правая часть */}
        <div className="appear appear-d1">
          <PortraitGrid />
        </div>
      </div>
    </section>
  )
}
