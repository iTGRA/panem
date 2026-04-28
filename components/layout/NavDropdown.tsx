'use client'

import Link from 'next/link'
import type { Route } from 'next'
import { useEffect, useRef, useState } from 'react'
import { cn, pluralizeRu } from '@/lib/utils'
import { CATEGORIES, BRANDS } from '@/lib/data/catalog'

const CLOSE_DELAY = 120 // мс — успеваем переместиться с кнопки на меню

export function NavDropdown() {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleEnter = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    setOpen(true)
  }

  const handleLeave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY)
  }

  useEffect(() => {
    if (!open) return
    function onPointer(e: PointerEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
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
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="text-[13px] font-medium text-stone transition-colors duration-150 hover:text-ink"
      >
        Каталог{' '}
        <span
          className={cn(
            'ml-0.5 inline-block text-[10px] text-mist transition-transform duration-200',
            open && 'rotate-180',
          )}
        >
          ▾
        </span>
      </button>

      {/* Невидимый «мост» между кнопкой и меню — закрывает 8px зазор,
          чтобы курсор не выпадал из ховер-зоны при движении вниз. */}
      {open && (
        <span
          aria-hidden
          className="absolute left-0 right-0 top-full h-2"
        />
      )}

      <div
        role="menu"
        className={cn(
          'absolute left-0 top-full z-[120] mt-2 origin-top overflow-hidden rounded-card border border-sand bg-white shadow-dropdown transition-[opacity,transform] duration-200 ease-[cubic-bezier(0,0,0.2,1)]',
          open
            ? 'pointer-events-auto opacity-100 scale-y-100'
            : 'pointer-events-none opacity-0 scale-y-95',
        )}
        style={{ width: 'min(880px, calc(100vw - 64px))' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr]">
          {/* Категории */}
          <div className="border-r border-sand p-7">
            <p className="mb-5 font-sub text-[10px] font-bold uppercase tracking-[0.22em] text-stone">
              Категории
            </p>
            <ul className="grid gap-1">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/catalog/category/${cat.slug}` as Route}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline justify-between gap-3 rounded-sm px-3 py-2 transition-colors duration-150 hover:bg-warm"
                    role="menuitem"
                  >
                    <span className="flex items-center gap-2.5 text-[14px] font-medium text-ink">
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 flex-shrink-0 rounded-full transition-transform duration-200 group-hover:scale-150"
                        style={{ background: cat.color }}
                      />
                      {cat.name}
                    </span>
                    <span className="flex-shrink-0 text-[11px] tabular-nums text-stone">
                      {cat.count}{' '}
                      {pluralizeRu(cat.count, ['товар', 'товара', 'товаров'])}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={'/catalog' as Route}
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center gap-1 px-3 text-[10px] font-bold uppercase tracking-[0.20em] text-stone transition-colors duration-150 hover:text-ink"
            >
              <span>Весь каталог</span>
              <span aria-hidden>→</span>
            </Link>
          </div>

          {/* Бренды */}
          <div className="p-7">
            <p className="mb-5 font-sub text-[10px] font-bold uppercase tracking-[0.22em] text-stone">
              Производители
            </p>
            <ul className="grid grid-cols-1 gap-0.5">
              {BRANDS.map((b) => (
                <li key={b.slug}>
                  <Link
                    href={`/catalog/brands/${b.slug}` as Route}
                    onClick={() => setOpen(false)}
                    className="block rounded-sm px-3 py-1.5 text-[13px] text-stone transition-colors duration-150 hover:bg-warm hover:text-amber"
                    role="menuitem"
                  >
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={'/catalog/brands' as Route}
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center gap-1 px-3 text-[10px] font-bold uppercase tracking-[0.20em] text-stone transition-colors duration-150 hover:text-ink"
            >
              <span>Все производители</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
