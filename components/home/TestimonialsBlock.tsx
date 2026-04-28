import { getTestimonials } from '@/lib/db/testimonials'

const STATS = [
  // Используем неразрывный пробел (\u00A0), чтобы число не ломалось на «2» + «300+»
  // в узких колонках (мобайл).
  { value: '2\u00A0300+', label: 'наименований ассортимента' },
  { value: '2\u00A0000+', label: 'клиентов по Поволжью' },
  { value: '25\u00A0лет', label: 'на рынке с 2001 года' },
  { value: '120+', label: 'специалистов в команде' },
]

export async function TestimonialsBlock() {
  const testimonials = await getTestimonials()

  return (
    <section className="bg-white px-[var(--container-px)] py-20 md:py-24">
      <div className="mx-auto max-w-container">
        <header className="mb-14">
          <span className="mb-3 block font-sub text-[10px] font-bold uppercase tracking-[0.22em] text-stone">
            Опыт и доверие
          </span>
          <h2
            className="font-black uppercase tracking-[0.02em] text-ink"
            style={{ fontSize: 'var(--type-h2)', lineHeight: 1.0 }}
          >
            Нам доверяют
            <br />
            четверть века
          </h2>
        </header>

        {testimonials.length > 0 && (
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <figure
                key={t.id}
                className="border-t-[2px] border-ink pt-7"
              >
                <blockquote className="mb-7 text-[15px] italic leading-relaxed text-stone">
                  «{t.body}»
                </blockquote>
                <figcaption>
                  <p className="text-[14px] font-bold text-ink">{t.name}</p>
                  <p className="mt-1 text-[12px] text-stone">{t.role}</p>
                  <p className="text-[12px] text-stone">{t.company}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        {/* Stats — крупная цифровая стена. Магентовая точка-маркер связывает
            этот блок с биолюм-палитрой /lab. На мобайле 2-в-ряд, на десктопе
            4-в-ряд. */}
        <div className="mt-20 border-t border-sand pt-14">
          <h3 className="mb-10 text-[12px] font-bold uppercase tracking-[0.22em] text-stone">
            ПАНЭМ в цифрах
          </h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <span
                  aria-hidden
                  className="mb-3 block h-1.5 w-1.5 rounded-full"
                  style={{ background: '#EB6EC8' }}
                />
                <p
                  className="font-black text-ink"
                  style={{
                    fontSize: 'var(--type-stat)',
                    lineHeight: 0.95,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {stat.value}
                </p>
                <p className="mt-3 text-[13px] leading-snug text-stone">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
