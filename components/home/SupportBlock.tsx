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
    <section className="bg-white px-[var(--container-px)] py-16">
      <div className="mx-auto max-w-container">
        <div
          className="border-l-[3px] pl-8"
          style={{ borderColor: 'var(--c-amber)' }}
        >
          <span className="mb-2 block font-sub text-[9px] font-light uppercase tracking-[0.32em] text-mist">
            Т Е Х П О Д Д Е Р Ж К А · 2 4 / 7
          </span>
          <h2
            className="font-black uppercase tracking-[0.02em] text-ink"
            style={{ fontSize: 'clamp(22px, 3vw, 40px)', lineHeight: 1 }}
          >
            НАШИ ТЕХНОЛОГИ
            <br />
            РАБОТАЮТ НА РОСТ
            <br />
            ВАШЕЙ КОМПАНИИ
          </h2>
          <p className="mt-4 text-sm text-mist">
            Бесплатно. На всех этапах. 24/7.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item) => (
            <div key={item.title} className="flex gap-4">
              <span
                aria-hidden
                className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                style={{ background: 'var(--c-amber)' }}
              />
              <div>
                <p className="text-[14px] font-bold text-ink">{item.title}</p>
                <p className="mt-1 text-[12px] leading-[1.55] text-stone">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Button href="/support" variant="primary">
            Задать вопрос технологу
          </Button>
        </div>
      </div>
    </section>
  )
}
