import Link from 'next/link'
import { getOffices } from '@/lib/db/offices'
import { cn } from '@/lib/utils'
import { NavDropdown } from './NavDropdown'
import { RegionSwitcher, type OfficeLite } from './RegionSwitcher'
import { MobileMenu } from './MobileMenu'

const NAV_ITEMS = [
  { label: 'Академия', href: '/academy' as const },
  { label: 'Консалтинг', href: '/consulting' as const },
  { label: 'Клуб', href: '/club' as const },
  { label: 'О нас', href: '/about' as const },
]

export async function Header({ sticky = true }: { sticky?: boolean }) {
  const offices = await getOffices()
  const officesLite: OfficeLite[] = offices.map((o) => ({
    slug: o.slug,
    city: o.city,
    phone: o.phone,
    isHq: o.isHq,
  }))

  return (
    <header
      className={cn(
        'h-16 border-b border-sand bg-white shadow-nav z-[100]',
        sticky && 'sticky top-0',
      )}
    >
      <div className="mx-auto flex h-full max-w-container items-center gap-6 px-[var(--container-px)]">
        <Link
          href={'/' as const}
          className="font-black text-lg uppercase tracking-[0.08em] text-ink"
        >
          ПАНЭМ
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavDropdown />
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium text-stone transition-colors duration-150 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-5">
          <div className="hidden md:block">
            <RegionSwitcher offices={officesLite} />
          </div>
          <Link
            href={'/support' as const}
            className="hidden md:inline-flex rounded-xs bg-ink px-[18px] py-2 text-[9px] font-bold uppercase tracking-[0.20em] text-white transition-colors duration-200 hover:bg-stone"
          >
            Получить прайс
          </Link>
          <MobileMenu offices={officesLite} />
        </div>
      </div>
    </header>
  )
}
