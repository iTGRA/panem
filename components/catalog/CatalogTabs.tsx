'use client'

import { useState, useEffect, type ReactNode } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'

const TABS = [
  { id: 'category', label: 'По категории' },
  { id: 'segment', label: 'По типу бизнеса' },
  { id: 'brand', label: 'По производителю' },
] as const

type TabId = (typeof TABS)[number]['id']

function isTabId(value: string | null): value is TabId {
  return value === 'category' || value === 'segment' || value === 'brand'
}

export function CatalogTabs({
  category,
  segment,
  brand,
}: {
  category: ReactNode
  segment: ReactNode
  brand: ReactNode
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initial = isTabId(searchParams.get('view')) ? (searchParams.get('view') as TabId) : 'category'
  const [active, setActive] = useState<TabId>(initial)

  useEffect(() => {
    const v = searchParams.get('view')
    if (isTabId(v) && v !== active) setActive(v)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  function switchTab(id: TabId) {
    setActive(id)
    router.replace(`/catalog?view=${id}`, { scroll: false })
  }

  const panels: Record<TabId, ReactNode> = { category, segment, brand }

  return (
    <div>
      <div role="tablist" className="mb-8 flex gap-1 border-b border-sand">
        {TABS.map((tab) => {
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => switchTab(tab.id)}
              className={cn(
                '-mb-px border-b-2 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.18em] transition-[color,border-color] duration-150',
                isActive ? 'border-amber text-ink' : 'border-transparent text-mist hover:text-stone',
              )}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div role="tabpanel" key={active} className="appear">
        {panels[active]}
      </div>
    </div>
  )
}
