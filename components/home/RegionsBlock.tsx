import { getOffices } from '@/lib/db/offices'
import { cn } from '@/lib/utils'

export async function RegionsBlock() {
  const offices = await getOffices()

  return (
    <section className="bg-warm px-[var(--container-px)] py-20 md:py-24">
      <div className="mx-auto max-w-container">
        <div className="mb-12">
          <span className="mb-3 block font-sub text-[10px] font-bold uppercase tracking-[0.22em] text-stone">
            Регионы
          </span>
          <h2
            className="font-black uppercase tracking-[0.02em] text-ink"
            style={{ fontSize: 'var(--type-h2)', lineHeight: 1.0 }}
          >
            МЫ РЯДОМ
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {offices.map((office) => (
            <article
              key={office.slug}
              className="rounded-card border border-sand bg-white p-7"
            >
              <div className="mb-5 flex items-center gap-2">
                <span
                  className={cn(
                    'h-2 w-2 flex-shrink-0 rounded-full',
                    office.isHq ? 'bg-amber' : 'bg-sand',
                  )}
                />
                <span className="text-[15px] font-bold text-ink">
                  {office.city}
                </span>
                {office.isHq && (
                  <span className="ml-2 text-[10px] font-medium uppercase tracking-[0.18em] text-stone">
                    Головной офис
                  </span>
                )}
              </div>

              <p className="text-[14px] leading-relaxed text-stone">
                {office.address}
              </p>
              <p className="mt-1.5 text-[13px] text-stone">{office.schedule}</p>
              <a
                href={`tel:${office.phone.replace(/\D/g, '')}`}
                className="mt-4 block text-[16px] font-bold tabular-nums text-ink transition-colors duration-150 hover:text-amber"
              >
                {office.phone}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
