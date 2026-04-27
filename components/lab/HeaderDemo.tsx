'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

type Office = {
  slug: string
  city: string
  phone: string
  isHq: boolean
}

const OFFICES: Office[] = [
  { slug: 'samara', city: 'Самара', phone: '+7 (846) 321-20-20', isHq: true },
  { slug: 'saratov', city: 'Саратов', phone: '+7 (8452) 39-54-85', isHq: false },
  { slug: 'penza', city: 'Пенза', phone: '+7 (8412) 99-61-01', isHq: false },
]

const NAV_ITEMS = ['Каталог', 'Академия', 'Консалтинг', 'Клуб', 'О нас']

export function HeaderDemo() {
  const [activeSlug, setActiveSlug] = useState<string>('samara')
  const [open, setOpen] = useState(false)
  const active = OFFICES.find((o) => o.slug === activeSlug)!

  return (
    <header className="bg-white border border-sand rounded-card shadow-nav">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3 px-6 py-4">
        <div className="font-black text-base tracking-[0.18em]">ПАНЭМ</div>

        <nav className="flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm text-stone hover:text-ink transition-colors duration-200"
            >
              {item}
              {item === 'Каталог' && <span className="ml-1 text-mist">▾</span>}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-2 text-sm text-stone hover:text-ink transition-colors duration-200"
            >
              <span
                className={cn('h-1.5 w-1.5 rounded-full', active.isHq ? 'bg-amber' : 'bg-sand')}
              />
              <span>{active.city}</span>
              <span className="text-mist">▾</span>
              <span className="text-stone">·</span>
              <span className="font-medium text-ink">{active.phone}</span>
            </button>

            {open && (
              <div
                className="absolute right-0 top-full mt-2 min-w-[240px] origin-top rounded-card border border-sand bg-white p-2 shadow-dropdown"
                style={{ animation: 'fadeUp 200ms cubic-bezier(0,0,0.2,1) both' }}
              >
                {OFFICES.map((o) => (
                  <button
                    key={o.slug}
                    type="button"
                    onClick={() => {
                      setActiveSlug(o.slug)
                      setOpen(false)
                    }}
                    className={cn(
                      'flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm transition-colors duration-150',
                      o.slug === activeSlug ? 'bg-warm text-ink' : 'text-stone hover:bg-warm',
                    )}
                  >
                    <span
                      className={cn(
                        'h-1.5 w-1.5 rounded-full',
                        o.isHq ? 'bg-amber' : 'bg-sand',
                      )}
                    />
                    <span className="font-medium">{o.city}</span>
                    <span className="ml-auto text-mist text-xs">{o.phone}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            className="rounded-xs bg-ink px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition-colors duration-200 hover:bg-stone"
          >
            Получить прайс
          </button>
        </div>
      </div>
    </header>
  )
}
