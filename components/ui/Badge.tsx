import type { BadgeType } from '@prisma/client'

const LABELS: Record<BadgeType, string> = {
  NEW: 'Новинка',
  HIT: 'Хит',
  PROMO: 'Акция',
}

const COLORS: Record<BadgeType, string> = {
  NEW: 'var(--c-lime)',
  HIT: 'var(--c-amber)',
  PROMO: 'var(--c-rose)',
}

export function Badge({ type }: { type: BadgeType }) {
  return (
    <span
      className="inline-block rounded-xs px-2 py-1 text-[8px] font-bold uppercase tracking-[0.18em]"
      style={{ background: COLORS[type], color: 'rgba(0,0,0,.65)' }}
    >
      {LABELS[type]}
    </span>
  )
}
