'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

const SEGMENTS = [
  { slug: 'all', label: 'Все сегменты', l1: null, l2: null },
  { slug: 'bakery-shop', label: 'Пекарня', l1: '#FFB45A', l2: '#FFD291' },
  { slug: 'confectionery-shop', label: 'Кондитерская', l1: '#F582A0', l2: '#FAC3D2' },
  { slug: 'restaurant', label: 'Ресторан', l1: '#6EA5AA', l2: '#AFE6C3' },
  { slug: 'coffee-shop', label: 'Кофейня', l1: '#5A8CD7', l2: '#A5D2DC' },
  { slug: 'burger', label: 'Бургерная', l1: '#FF967D', l2: '#FFCBB5' },
  { slug: 'canteen', label: 'Столовая', l1: '#7D78DC', l2: '#BEB4FA' },
] as const

export function FilterChipsDemo() {
  const [active, setActive] = useState<string>('all')

  return (
    <div className="flex flex-wrap gap-2">
      {SEGMENTS.map((s) => {
        const isActive = active === s.slug
        const isAll = s.slug === 'all'
        return (
          <button
            key={s.slug}
            type="button"
            onClick={() => setActive(s.slug)}
            className={cn(
              'rounded-full px-4 py-2 text-[11px] font-medium transition-[background,border,color] duration-200',
              'border-[1.5px]',
              isAll && isActive && 'bg-ink text-white border-ink',
              isAll && !isActive && 'bg-white text-stone border-sand hover:border-ink',
              !isAll && isActive && 'text-ink',
              !isAll && !isActive && 'bg-white text-stone border-sand hover:border-ink',
            )}
            style={
              !isAll && isActive
                ? { backgroundColor: s.l2 ?? undefined, borderColor: s.l1 ?? undefined }
                : undefined
            }
          >
            {s.label}
          </button>
        )
      })}
    </div>
  )
}
