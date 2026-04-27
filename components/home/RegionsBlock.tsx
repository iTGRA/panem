import { getOffices } from '@/lib/db/offices'
import { cn } from '@/lib/utils'

export async function RegionsBlock() {
  const offices = await getOffices()

  return (
    <section className="bg-warm px-[var(--container-px)] py-16">
      <div className="mx-auto max-w-container">
        <div className="mb-10">
          <span className="mb-2 block font-sub text-[9px] font-light uppercase tracking-[0.32em] text-mist">
            Р Е Г И О Н Ы
          </span>
          <h2
            className="font-black uppercase tracking-[0.02em] text-ink"
            style={{ fontSize: 'clamp(22px, 3vw, 40px)', lineHeight: 1 }}
          >
            МЫ РЯДОМ
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {offices.map((office) => (
            <article
              key={office.slug}
              className="rounded-card border border-sand bg-white p-6"
            >
              <div className="mb-4 flex items-center gap-2">
                <span
                  className={cn(
                    'h-2 w-2 flex-shrink-0 rounded-full',
                    office.isHq ? 'bg-amber' : 'bg-sand',
                  )}
                />
                <span className="text-[14px] font-bold text-ink">
                  {office.city}
                </span>
                {office.isHq && (
                  <span className="ml-2 text-[9px] font-medium uppercase tracking-[0.18em] text-mist">
                    Головной офис
                  </span>
                )}
              </div>

              <p className="text-[12px] leading-[1.5] text-stone">
                {office.address}
              </p>
              <p className="mt-1 text-[12px] text-mist">{office.schedule}</p>
              <a
                href={`tel:${office.phone.replace(/\D/g, '')}`}
                className="mt-3 block text-[14px] font-bold tabular-nums text-ink transition-colors duration-150 hover:text-amber"
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
