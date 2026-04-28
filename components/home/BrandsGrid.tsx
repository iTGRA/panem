'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { pluralizeRu } from '@/lib/utils'
import type { Brand } from '@/lib/data/catalog'

const INITIAL_VISIBLE = 3 // первый ряд на десктопе (lg:grid-cols-3)

export function BrandsGrid({ brands }: { brands: Brand[] }) {
  const [expanded, setExpanded] = useState(false)
  const hidden = Math.max(0, brands.length - INITIAL_VISIBLE)
  const visible = expanded ? brands : brands.slice(0, INITIAL_VISIBLE)
  const showButton = !expanded && hidden > 0

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((b) => (
          <Link
            key={b.slug}
            href={`/catalog/brands/${b.slug}` as Route}
            className="group block rounded-card border border-sand bg-white p-6 transition-[box-shadow,border-color] duration-300 ease-out hover:border-amber/40 hover:shadow-[0_14px_28px_-10px_rgba(0,0,0,0.16)]"
          >
            <h4
              className="mb-3 font-black uppercase text-ink transition-colors duration-300 group-hover:text-amber"
              style={{
                fontSize: 'clamp(18px, 1.4vw, 22px)',
                lineHeight: 1.1,
                letterSpacing: '-0.005em',
              }}
            >
              {b.name}
            </h4>
            <p className="text-[13px] leading-relaxed text-stone">{b.bio}</p>
          </Link>
        ))}
      </div>

      {showButton && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="group/exp inline-flex items-center gap-2 rounded-xs border border-stone px-7 py-3.5 font-main font-bold uppercase text-stone transition-colors duration-300 hover:border-ink hover:text-ink"
            style={{ fontSize: '10px', letterSpacing: '0.18em' }}
          >
            <span>
              Развернуть ещё {hidden}{' '}
              {pluralizeRu(hidden, [
                'производителя',
                'производителя',
                'производителей',
              ])}
            </span>
            <span
              aria-hidden
              className="text-[14px] transition-transform duration-300 ease-out group-hover/exp:translate-y-0.5"
            >
              ↓
            </span>
          </button>
        </div>
      )}
    </>
  )
}
