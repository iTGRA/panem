'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export type OfficeLite = {
  slug: string
  city: string
  phone: string
  isHq: boolean
}

const STORAGE_KEY = 'panem.region'

export function RegionSwitcher({
  offices,
  defaultRegion,
}: {
  offices: OfficeLite[]
  defaultRegion?: string
}) {
  const initial = defaultRegion ?? offices.find((o) => o.isHq)?.slug ?? offices[0]?.slug
  const [activeSlug, setActiveSlug] = useState<string | undefined>(initial)
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  // Восстановить выбранный регион из localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved && offices.some((o) => o.slug === saved)) {
        setActiveSlug(saved)
      }
    } catch {
      // localStorage может быть недоступен
    }
  }, [offices])

  // Закрытие по клику снаружи и Esc
  useEffect(() => {
    if (!open) return
    function onPointer(e: PointerEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (!offices.length) return null
  const active = offices.find((o) => o.slug === activeSlug) ?? offices[0]

  function pick(slug: string) {
    setActiveSlug(slug)
    setOpen(false)
    try {
      localStorage.setItem(STORAGE_KEY, slug)
    } catch {
      // ignore
    }
  }

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 text-xs text-stone transition-colors duration-150 hover:text-ink"
      >
        <span className={cn('h-1.5 w-1.5 rounded-full', active.isHq ? 'bg-amber' : 'bg-sand')} />
        <span>{active.city}</span>
        <span className="text-mist text-[10px]">▾</span>
        <span className="text-mist">·</span>
        <span className="font-medium text-ink tabular-nums">{active.phone}</span>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full z-[120] mt-2 min-w-[260px] origin-top rounded-card border border-sand bg-white p-2 shadow-dropdown"
          style={{ animation: 'fadeUp 200ms cubic-bezier(0,0,0.2,1) both' }}
        >
          {offices.map((o) => (
            <button
              key={o.slug}
              type="button"
              role="option"
              aria-selected={o.slug === active.slug}
              onClick={() => pick(o.slug)}
              className={cn(
                'flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm transition-colors duration-150',
                o.slug === active.slug ? 'bg-warm text-ink' : 'text-stone hover:bg-warm',
              )}
            >
              <span
                className={cn('h-1.5 w-1.5 rounded-full', o.isHq ? 'bg-amber' : 'bg-sand')}
              />
              <span className="font-medium">{o.city}</span>
              <span className="ml-auto text-xs text-mist tabular-nums">{o.phone}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
