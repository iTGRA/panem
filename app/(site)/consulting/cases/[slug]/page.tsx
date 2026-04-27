import type { Metadata } from 'next'
import type { Route } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCaseBySlug } from '@/lib/db/cases'

type Params = { params: { slug: string } }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const c = await getCaseBySlug(params.slug)
  if (!c) return {}
  return {
    title: `${c.title} | Консалтинг`,
    description: c.task ?? c.title,
  }
}

export default async function CasePage({ params }: Params) {
  const c = await getCaseBySlug(params.slug)
  if (!c) notFound()

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-sand px-[var(--container-px)] py-12">
        <div className="mx-auto max-w-narrow">
          <nav className="mb-6 flex gap-2 text-[11px] text-mist">
            <Link
              href="/consulting"
              className="transition-colors hover:text-ink"
            >
              Консалтинг
            </Link>
            <span>·</span>
            <span className="text-ink">Кейс</span>
          </nav>

          {c.result && (
            <span
              className="mb-3 block font-black"
              style={{
                fontSize: 'clamp(40px,6vw,80px)',
                lineHeight: '1',
                color: 'var(--c-blue)',
              }}
            >
              {c.result}
            </span>
          )}

          <h1
            className="mb-4 font-black uppercase tracking-[0.02em] text-ink"
            style={{ fontSize: 'clamp(20px,3.5vw,44px)', lineHeight: '1.0' }}
          >
            {c.title.toUpperCase()}
          </h1>

          {c.client && <p className="text-[12px] text-mist">{c.client}</p>}
        </div>
      </section>

      <section className="px-[var(--container-px)] py-10">
        <div className="mx-auto max-w-narrow">
          {c.task && (
            <div className="mb-8">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-mist">
                Задача
              </p>
              <p className="text-sm leading-relaxed text-stone">{c.task}</p>
            </div>
          )}

          {c.solution && (
            <div className="mb-8">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-mist">
                Решение
              </p>
              <p className="text-sm leading-relaxed text-stone">{c.solution}</p>
            </div>
          )}
        </div>
      </section>

      {c.products.length > 0 && (
        <section
          className="px-[var(--container-px)] py-10"
          style={{ background: 'var(--c-warm)' }}
        >
          <div className="mx-auto max-w-narrow">
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-mist">
              Применили в решении
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {c.products.map((p) => (
                <Link
                  key={p.slug}
                  href={`/catalog/products/${p.slug}` as Route}
                  className="block rounded-card border border-sand bg-white p-4 transition-transform duration-200 hover:-translate-y-0.5"
                  style={{ borderTop: '3px solid var(--c-blue)' }}
                >
                  {p.brand && (
                    <span className="mb-1 block text-[10px] text-mist">
                      {p.brand.name}
                    </span>
                  )}
                  <span className="text-[13px] font-bold text-ink">
                    {p.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section
        className="px-[var(--container-px)] py-12"
        style={{ background: 'var(--c-ink)' }}
      >
        <div className="mx-auto flex max-w-narrow flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-sm font-bold text-white">
            Похожая задача? Обсудим ваш проект.
          </p>
          <a
            href="/consulting#contact"
            className="flex-shrink-0 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-90"
            style={{
              background: 'var(--c-blue)',
              borderRadius: 'var(--r-xs)',
            }}
          >
            Обсудить проект
          </a>
        </div>
      </section>
    </main>
  )
}
