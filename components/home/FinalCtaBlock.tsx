import { Button } from '@/components/ui/Button'

export function FinalCtaBlock() {
  return (
    <section
      id="contact"
      className="bg-ink px-[var(--container-px)] py-24 md:py-32"
    >
      <div className="mx-auto max-w-container text-center">
        <h2
          className="font-black uppercase tracking-[0.02em] text-white"
          style={{ fontSize: 'var(--type-h2-display)', lineHeight: 0.95 }}
        >
          ГОТОВЫ
          <br />
          НАЧАТЬ?
        </h2>

        <p className="mx-auto mt-7 max-w-[480px] text-base leading-relaxed text-sand">
          Получите прайс или оставьте заявку — свяжемся в течение часа.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/catalog" variant="accent">
            Получить прайс
          </Button>
          <Button href={'tel:+78463212020'} variant="secondary-dark">
            Заказать звонок
          </Button>
        </div>
      </div>
    </section>
  )
}
