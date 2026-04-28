import { Button } from '@/components/ui/Button'

const ITEMS = [
  {
    title: 'Выезд на производство',
    body: 'Технолог приедет, посмотрит, предложит решение.',
  },
  {
    title: 'Показательные выпечки',
    body: 'Тестируем ингредиенты на вашем оборудовании.',
  },
  {
    title: 'Разработка рецептур',
    body: 'Создаём и адаптируем рецептуры под ваши задачи.',
  },
  {
    title: 'Расчёт себестоимости',
    body: 'Считаем экономику каждого изделия.',
  },
  {
    title: 'Обучение персонала',
    body: 'Обучаем вашу команду работе с новыми ингредиентами.',
  },
]

export function SupportBlock() {
  return (
    <section className="bg-white px-[var(--container-px)] py-20 md:py-24">
      <div className="mx-auto max-w-container">
        <div
          className="border-l-[3px] pl-8"
          style={{ borderColor: 'var(--c-amber)' }}
        >
          <span className="mb-3 block font-sub text-[10px] font-bold uppercase tracking-[0.22em] text-stone">
            Техподдержка · 24/7
          </span>
          <h2
            className="font-black uppercase tracking-[0.02em] text-ink"
            style={{ fontSize: 'var(--type-h2)', lineHeight: 1.0 }}
          >
            Наши технологи
            <br />
            работают на рост
            <br />
            вашей компании
          </h2>
          <p className="mt-5 text-base leading-relaxed text-stone">
            Бесплатно. На всех этапах. 24/7.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item) => (
            <div key={item.title} className="flex gap-4">
              <span
                aria-hidden
                className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                style={{ background: 'var(--c-amber)' }}
              />
              <div>
                <p className="text-[15px] font-bold text-ink">{item.title}</p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-stone">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <Button href="/support" variant="primary">
            Задать вопрос технологу
          </Button>
        </div>
      </div>
    </section>
  )
}
