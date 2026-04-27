'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

function AppearOnScroll({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={visible ? { animation: `fadeUp 500ms cubic-bezier(0,0,0.2,1) ${delay}ms both` } : { opacity: 0 }}
    >
      {children}
    </div>
  )
}

export function AppearDemo() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {[0, 80, 160].map((delay, i) => (
        <AppearOnScroll key={i} delay={delay}>
          <div className="rounded-card border border-sand bg-white p-4 text-center shadow-card">
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-mist">
              Карточка {i + 1}
            </div>
            <div className="mt-2 text-sm text-ink">delay {delay}ms</div>
          </div>
        </AppearOnScroll>
      ))}
    </div>
  )
}

export function HoverDemo() {
  return (
    <div className="max-w-[260px]">
      <div className="group rounded-card border border-sand bg-white p-5 transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 hover:shadow-card">
        <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-mist">Brand</div>
        <div className="mt-1.5 text-sm font-medium text-ink">Карточка-пример</div>
        <div className="mt-2 text-xs text-stone">наведи курсор → translateY(-2px) + shadow</div>
      </div>
    </div>
  )
}

export function DropdownDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded-xs border border-sand px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-stone hover:border-ink transition-colors duration-200"
      >
        Открыть dropdown {open ? '▴' : '▾'}
      </button>
      <div
        className={cn(
          'absolute left-0 top-full mt-2 min-w-[200px] origin-top rounded-card border border-sand bg-white p-2 shadow-dropdown transition-[opacity,transform] duration-200 ease-[cubic-bezier(0,0,0.2,1)]',
          open ? 'pointer-events-auto opacity-100 scale-y-100' : 'pointer-events-none opacity-0 scale-y-95',
        )}
      >
        {['Пункт 1', 'Пункт 2', 'Пункт 3'].map((label) => (
          <div key={label} className="rounded-sm px-3 py-2 text-sm text-stone hover:bg-warm">
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

export function TooltipDemo() {
  return (
    <div className="text-base text-stone">
      Например{' '}
      <span className="group relative inline-block">
        <a className="shoppable-link" href="#">
          смесь Brötchen
        </a>
        <span
          className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-[260px] -translate-x-1/2 translate-y-1 rounded-card border border-sand bg-white p-3 text-left text-xs opacity-0 shadow-dropdown transition-[opacity,transform] duration-150 ease-[cubic-bezier(0,0,0.2,1)] [transition-delay:200ms] group-hover:translate-y-0 group-hover:opacity-100"
          role="tooltip"
        >
          <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-mist">
            Backaldrin · Австрия
          </div>
          <div className="mt-1 text-sm font-medium text-ink">Смесь для булочек Brötchen</div>
          <div className="mt-1 text-xs text-stone">Фасовка: 25 кг</div>
        </span>
      </span>{' '}
      — наведите для превью.
    </div>
  )
}
