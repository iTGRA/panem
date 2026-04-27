'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { RegionSwitcher, type OfficeLite } from './RegionSwitcher'

const NAV_ITEMS = [
  { label: 'Каталог', href: '/catalog' as const },
  { label: 'Академия', href: '/academy' as const },
  { label: 'Консалтинг', href: '/consulting' as const },
  { label: 'Клуб', href: '/club' as const },
  { label: 'О нас', href: '/about' as const },
]

export function MobileMenu({ offices }: { offices: OfficeLite[] }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        aria-label="Открыть меню"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="md:hidden flex h-9 w-9 items-center justify-center rounded-xs border border-sand text-stone transition-colors duration-150 hover:border-ink hover:text-ink"
      >
        <span className="sr-only">Меню</span>
        <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden>
          <rect x="0" y="0" width="16" height="1.5" fill="currentColor" />
          <rect x="0" y="5.25" width="16" height="1.5" fill="currentColor" />
          <rect x="0" y="10.5" width="16" height="1.5" fill="currentColor" />
        </svg>
      </button>

      <div
        aria-hidden={!open}
        className={cn(
          'fixed inset-0 z-[200] bg-ink/50 transition-opacity duration-200',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        onClick={() => setOpen(false)}
      />

      <aside
        role="dialog"
        aria-label="Главное меню"
        aria-hidden={!open}
        className={cn(
          'fixed inset-y-0 right-0 z-[201] flex w-full max-w-[360px] flex-col bg-white shadow-modal transition-transform duration-300 ease-[cubic-bezier(0,0,0.2,1)]',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <header className="flex items-center justify-between border-b border-sand px-5 py-4">
          <span className="font-black text-base uppercase tracking-[0.08em] text-ink">ПАНЭМ</span>
          <button
            type="button"
            aria-label="Закрыть меню"
            onClick={() => setOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-xs border border-sand text-stone hover:border-ink hover:text-ink"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
              <path d="M1 1 L13 13 M13 1 L1 13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </header>

        <nav className="flex flex-col gap-1 px-5 py-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-sm px-2 py-3 text-base font-medium text-ink hover:bg-warm transition-colors duration-150"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-4 border-t border-sand px-5 py-5">
          <RegionSwitcher offices={offices} />
          <Link
            href={'/support' as const}
            onClick={() => setOpen(false)}
            className="rounded-xs bg-ink px-5 py-3 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-white"
          >
            Получить прайс
          </Link>
        </div>
      </aside>
    </>
  )
}
