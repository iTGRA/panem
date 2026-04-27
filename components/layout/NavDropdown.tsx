'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const CATALOG_ITEMS = [
  { label: 'По категории', href: '/catalog?view=category' as const },
  { label: 'По типу бизнеса', href: '/catalog?view=segment' as const },
  { label: 'По производителю', href: '/catalog?view=brand' as const },
]

export function NavDropdown() {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

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

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="text-[13px] font-medium text-stone transition-colors duration-150 hover:text-ink"
      >
        Каталог <span className="ml-0.5 text-mist text-[10px]">▾</span>
      </button>

      <div
        role="menu"
        className={cn(
          'absolute left-0 top-full z-[120] mt-2 min-w-[220px] origin-top rounded-card border border-sand bg-white p-2 shadow-dropdown transition-[opacity,transform] duration-200 ease-[cubic-bezier(0,0,0.2,1)]',
          open ? 'pointer-events-auto opacity-100 scale-y-100' : 'pointer-events-none opacity-0 scale-y-95',
        )}
      >
        {CATALOG_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-sm px-3 py-2 text-sm text-stone transition-colors duration-150 hover:bg-warm hover:text-ink"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
