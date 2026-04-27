import type { Metadata } from 'next'
import { getCases } from '@/lib/db/cases'
import { CaseCard } from '@/components/consulting/CaseCard'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Консалтинг — открытие, перезапуск, масштабирование',
  description:
    'Сопровождение гастробизнеса под ключ. Открытие, перезапуск, масштабирование. Лучшие консультанты Поволжья.',
}

const SERVICES: { num: string; title: string; body: string }[] = [
  {
    num: '01',
    title: 'Открытие нового заведения',
    body: 'Концепция → меню → рецептуры → поставщики → запуск. Сопровождаем на каждом этапе.',
  },
  {
    num: '02',
    title: 'Перезапуск и редизайн',
    body: 'Аудит текущего бизнеса, поиск точек роста, внедрение изменений без потери выручки.',
  },
  {
    num: '03',
    title: 'Масштабирование',
    body: 'Новые точки, новые направления меню, выход в сети. Привлекаем лучших консультантов страны.',
  },
]

export default async function ConsultingPage() {
  const cases = await getCases()

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-sand px-[var(--container-px)] py-16">
        <div className="mx-auto max-w-container">
          <span className="mb-4 block font-sub text-[9px] font-light uppercase tracking-[0.32em] text-mist">
            П А Н Э М · К О Н С А Л Т И Н Г
          </span>

          <h1
            className="mb-6 font-black uppercase tracking-[0.02em] text-ink"
            style={{ fontSize: 'clamp(28px,5vw,64px)', lineHeight: '0.95' }}
          >
            ОТКРЫВАЕМ.
            <br />
            ПЕРЕЗАПУСКАЕМ.
            <br />
            МАСШТАБИРУЕМ.
          </h1>

          <p className="mb-8 max-w-lg text-sm leading-relaxed text-stone">
            Сопровождение бизнеса под ключ: от концепции до прибыльного
            заведения. Привлекаем ведущих консультантов Поволжья и страны.
          </p>

          <Button href="#contact" variant="primary">
            Обсудить проект
          </Button>
        </div>
      </section>

      <section
        className="px-[var(--container-px)] py-12"
        style={{ background: 'var(--c-warm)' }}
      >
        <div className="mx-auto max-w-container">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {SERVICES.map((service) => (
              <div
                key={service.num}
                className="rounded-card border border-sand bg-white p-6"
                style={{ borderTop: '3px solid var(--c-blue)' }}
              >
                <span className="mb-4 block text-[32px] font-black leading-none text-sand">
                  {service.num}
                </span>
                <h3 className="mb-3 text-[13px] font-bold uppercase tracking-[0.04em] text-ink">
                  {service.title}
                </h3>
                <p className="text-[12px] leading-relaxed text-stone">
                  {service.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {cases.length > 0 && (
        <section className="px-[var(--container-px)] py-12">
          <div className="mx-auto max-w-container">
            <h2
              className="mb-8 font-black uppercase tracking-[0.02em] text-ink"
              style={{ fontSize: 'clamp(20px,3vw,36px)', lineHeight: '1.0' }}
            >
              КЕЙСЫ
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {cases.map((c) => (
                <CaseCard key={c.slug} case={c} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section
        id="contact"
        className="px-[var(--container-px)] py-16"
        style={{ background: 'var(--c-ink)' }}
      >
        <div className="mx-auto max-w-[640px] text-center">
          <h2
            className="mb-3 font-black uppercase tracking-[0.02em] text-white"
            style={{ fontSize: 'clamp(22px,4vw,48px)', lineHeight: '0.95' }}
          >
            ОБСУДИМ
            <br />
            ВАШ ПРОЕКТ?
          </h2>
          <p className="mb-8 text-sm text-mist">
            Опишите задачу — свяжемся в течение часа.
          </p>
          <a
            href="tel:+78463212020"
            className="inline-block px-8 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-90"
            style={{
              background: 'var(--c-blue)',
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
