import Link from 'next/link'
import type { Route } from 'next'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'accent' | 'secondary-dark'
type Size = 'sm' | 'md'

const BASE =
  'inline-flex items-center justify-center font-bold uppercase rounded-xs transition-[background-color,border-color,color,transform,opacity] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]'

const SIZES: Record<Size, string> = {
  sm: 'px-[18px] py-2 text-[9px] tracking-[0.20em]',
  md: 'px-6 py-3 text-[10px] tracking-[0.22em]',
}

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-ink text-white hover:bg-stone',
  secondary: 'border border-sand text-stone hover:border-ink hover:text-ink',
  accent:
    'bg-amber text-ink hover:opacity-90 hover:-translate-y-px duration-150',
  'secondary-dark':
    'border border-stone text-mist hover:border-sand hover:text-white',
}

type CommonProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: React.ReactNode
}

type LinkProps = CommonProps & {
  href: Route | string
  type?: never
  onClick?: never
}

type BtnProps = CommonProps & {
  href?: undefined
  type?: 'button' | 'submit'
  onClick?: () => void
}

export function Button(props: LinkProps | BtnProps) {
  const { variant = 'primary', size = 'md', className, children } = props
  const cls = cn(BASE, SIZES[size], VARIANTS[variant], className)

  if ('href' in props && props.href) {
    return (
      <Link href={props.href as Route} className={cls}>
        {children}
      </Link>
    )
  }
  return (
    <button type={props.type ?? 'button'} onClick={props.onClick} className={cls}>
      {children}
    </button>
  )
}
