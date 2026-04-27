import { cn } from '@/lib/utils'

type Portrait = {
  letter: string
  bg: string
  role: string
  name: string
  business: string
  tall?: boolean
  hideOnMobile?: boolean
  delayClass?: string
}

const PORTRAITS: Portrait[] = [
  {
    letter: 'П',
    bg: '#FFD291',
    role: 'Пекарня',
    name: 'Вадим, 41',
    business: 'Сеть 5 точек',
    tall: true,
    delayClass: 'appear',
  },
  {
    letter: 'К',
    bg: '#FAC3D2',
    role: 'Кондитер',
    name: 'Анна, 33',
    business: 'Свой цех',
    delayClass: 'appear appear-d1',
  },
  {
    letter: 'К',
    bg: '#A5D2DC',
    role: 'Кофейня',
    name: 'Дима, 27',
    business: '2 кофейни',
    delayClass: 'appear appear-d2',
  },
  {
    letter: 'Р',
    bg: '#AFE6C3',
    role: 'Ресторан',
    name: 'Рита, 29',
    business: 'Шеф-повар',
    hideOnMobile: true,
    delayClass: 'appear appear-d3',
  },
]

export function PortraitGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 auto-rows-[140px]">
      {PORTRAITS.map((p) => (
        <article
          key={p.name}
          className={cn(
            'relative overflow-hidden rounded-port p-[18px]',
            p.tall && 'row-span-2',
            p.hideOnMobile && 'hidden lg:block',
            p.delayClass,
          )}
          style={{ background: p.bg }}
        >
          <span
            aria-hidden
            className="absolute right-4 top-3 select-none font-black leading-none"
            style={{ fontSize: 56, color: 'rgba(0,0,0,.08)' }}
          >
            {p.letter}
          </span>
          <div className="absolute inset-x-[18px] bottom-[18px]">
            <div
              className="text-[9px] font-bold uppercase tracking-[0.22em]"
              style={{ color: 'rgba(0,0,0,.38)' }}
            >
              {p.role}
            </div>
            <div className="mt-1 text-[15px] font-bold" style={{ color: 'rgba(0,0,0,.65)' }}>
              {p.name}
            </div>
            <div className="text-[11px] font-light" style={{ color: 'rgba(0,0,0,.38)' }}>
              {p.business}
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
