import type { Metadata } from 'next'
import { getAllEvents } from '@/lib/db/events'
import { EventFeed } from '@/components/academy/EventFeed'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Академия — обучение для гастроиндустрии Поволжья',
  description:
    'Мастер-классы, курсы и семинары для шеф-поваров, кондитеров, пекарей и бариста. Демонстрационный центр в Самаре.',
}

const DIRECTIONS: { label: string; color: string }[] = [
  { label: 'Хлебопечение', color: 'var(--c-amber)' },
  { label: 'Кондитерское дело', color: 'var(--c-rose)' },
  { label: 'HoReCa / Шефы', color: 'var(--c-teal)' },
  { label: 'Бариста', color: 'var(--c-blue)' },
]

export default async function AcademyPage() {
  const events = await getAllEvents()

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-sand px-[var(--container-px)] py-16">
        <div className="mx-auto max-w-container">
          <span className="mb-4 block font-sub text-[9px] font-light uppercase tracking-[0.32em] text-mist">
            П А Н Э М · А К А Д Е М И Я
          </span>

          <div className="grid grid-cols-1 items-end gap-12 md:grid-cols-2">
            <div>
              <h1
                className="mb-5 font-black uppercase tracking-[0.02em] text-ink"
                style={{ fontSize: 'clamp(28px,5vw,64px)', lineHeight: '0.95' }}
              >
                ЛАБОРАТОРИЯ
                <br />
                ВПЕЧАТЛЕНИЙ
              </h1>
              <p className="max-w-md text-sm leading-relaxed text-stone">
                Площадка, где эксперты производителей и отрасли делятся
                трендами, техниками и новыми ингредиентами. Живыми руками, не по
                учебнику.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {DIRECTIONS.map((dir) => (
                <div
                  key={dir.label}
                  className="rounded-card border border-sand bg-white p-4"
                  style={{ borderTop: `3px solid ${dir.color}` }}
                >
                  <span className="text-[12px] font-bold text-ink">
                    {dir.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-[var(--container-px)] py-12">
        <div className="mx-auto max-w-container">
          <EventFeed events={events} />
        </div>
      </section>

      <section
        className="px-[var(--container-px)] py-16"
        style={{ background: 'var(--c-warm)' }}
      >
        <div className="mx-auto max-w-container">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div>
              <span className="mb-3 block font-sub text-[9px] font-light uppercase tracking-[0.32em] text-mist">
                Д Е М О - Ц Е Н Т Р
              </span>
              <h2
                className="mb-4 font-black uppercase tracking-[0.02em] text-ink"
                style={{ fontSize: 'clamp(22px,3vw,40px)', lineHeight: '1.0' }}
              >
                СОВРЕМЕННАЯ
                <br />
                ТЕХНОЛОГИЧЕСКАЯ
                <br />
                БАЗА
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-stone">
                Профессиональное оборудование. Пространство для практики,
                тестирования ингредиентов и обучения команд. Самара, Корсунский
                пер., 14.
              </p>
              <Button href="/about#contact" variant="primary">
                Записаться на мастер-класс
              </Button>
            </div>

            <div className="flex aspect-[4/3] items-center justify-center rounded-card bg-sand">
              <span className="text-sm text-mist">[Фото демо-центра]</span>
            </div>
          </div>
        </div>
      </section>

      <section
        className="px-[var(--container-px)] py-16"
        style={{ background: 'var(--c-ink)' }}
      >
        <div className="mx-auto max-w-container text-center">
          <h2
            className="mb-4 font-black uppercase tracking-[0.02em] text-white"
            style={{ fontSize: 'clamp(24px,4vw,56px)', lineHeight: '0.95' }}
          >
            ВАШИ ГОСТИ
            <br />
            ЗАПОМНЯТ ВКУС.
          </h2>
          <p className="mb-8 text-sm text-mist">Мы поможем его создать.</p>
          <a
            href="/about#contact"
            className="inline-block px-8 py-3 text-[10px] font-bold uppercase tracking-[0.22em] transition-opacity hover:opacity-90"
            style={{
              background: 'var(--c-rose)',
              color: 'var(--c-white, #FFFFFF)',
              borderRadius: 'var(--r-xs)',
            }}
          >
            Записаться на мастер-класс
          </a>
        </div>
      </section>
    </main>
  )
}
