'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { Segment } from '@prisma/client'

export function FilterChips({ segments }: { segments: Segment[] }) {
  const [active, setActive] = useState<string | null>(null)

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => setActive(null)}
        className={cn(
          'rounded-full border px-4 py-2 text-[11px] font-medium transition-[background-color,color,border-color] duration-200',
          active === null
            ? 'border-ink bg-ink text-white'
            : 'border-sand bg-white text-stone hover:border-ink',
        )}
      >
        Все сегменты
      </button>

      {segments.map((seg) => {
        const isActive = active === seg.slug
        return (
          <button
            key={seg.slug}
            type="button"
            onClick={() => setActive(isActive ? null : seg.slug)}
            className="rounded-full border-[1.5px] px-4 py-2 text-[11px] font-medium transition-[background-color,color,border-color] duration-200"
            style={
              isActive
                ? { background: seg.colorL2, borderColor: seg.colorL1, color: 'var(--c-ink)' }
                : { background: 'white', borderColor: 'var(--c-sand)', color: 'var(--c-stone)' }
            }
          >
            {seg.name}
          </button>
        )
      })}
    </div>
  )
}
