import { getTestimonials } from '@/lib/db/testimonials'

const STATS = [
  { value: '2 300+', label: 'наименований ассортимента' },
  { value: '2 000+', label: 'клиентов по Поволжью' },
  { value: '25 лет', label: 'на рынке с 2001 года' },
  { value: '120+', label: 'специалистов в команде' },
]

export async function TestimonialsBlock() {
  const testimonials = await getTestimonials()

  return (
    <section className="bg-white px-[var(--container-px)] py-16">
      <div className="mx-auto max-w-container">
        {testimonials.length > 0 && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <figure key={t.id} className="border-t border-sand pt-6">
                <blockquote className="mb-6 text-sm italic leading-[1.65] text-stone">
                  «{t.body}»
                </blockquote>
                <figcaption>
                  <p className="text-[13px] font-bold text-ink">{t.name}</p>
                  <p className="mt-0.5 text-[11px] text-mist">{t.role}</p>
                  <p className="text-[11px] text-mist">{t.company}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-sand pt-10 md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p
                className="font-black text-ink"
                style={{ fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: 1 }}
              >
                {stat.value}
              </p>
              <p className="mt-2 text-[11px] leading-snug text-mist">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
