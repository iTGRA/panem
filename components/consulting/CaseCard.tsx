import Link from 'next/link'
import type { Route } from 'next'
import type { Case, Product, Category } from '@prisma/client'

type CaseProduct = Product & { category: Category }
type CaseCardData = Case & { products: CaseProduct[] }

export function CaseCard({ case: c }: { case: CaseCardData }) {
  return (
    <Link
      href={`/consulting/cases/${c.slug}` as Route}
      className="block rounded-card border border-sand bg-white p-6 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-card"
      style={{ borderTop: '3px solid var(--c-blue)' }}
    >
      {c.result && (
        <span
          className="mb-2 block font-black"
          style={{
            fontSize: 'clamp(28px,3vw,44px)',
            lineHeight: '1',
            color: 'var(--c-blue)',
          }}
        >
          {c.result}
        </span>
      )}

      {c.segmentSlug && (
        <span
          className="mb-3 inline-block rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em]"
          style={{
            background: 'var(--c-blue-t)',
            borderColor: 'var(--c-blue)',
            color: 'var(--c-ink)',
          }}
        >
          {c.segmentSlug}
        </span>
      )}

      <h3 className="mb-3 text-[14px] font-bold leading-snug text-ink">
        {c.title}
      </h3>

      {c.client && <p className="mb-4 text-[11px] text-mist">{c.client}</p>}

      {c.products.length > 0 && (
        <div className="mb-4 border-t border-sand pt-3">
          <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.18em] text-mist">
            Применили в решении
          </p>
          {c.products.slice(0, 2).map((p) => (
            <span key={p.slug} className="block text-[11px] text-stone">
              · {p.name}
            </span>
          ))}
        </div>
      )}

      <span
        className="text-[9px] font-bold uppercase tracking-[0.18em]"
        style={{ color: 'var(--c-blue)' }}
      >
        Читать кейс →
      </span>
    </Link>
  )
}
