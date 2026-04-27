import Link from 'next/link'

const COLUMNS = [
  {
    title: 'Каталог',
    links: [
      { label: 'Хлебопекарное', href: '/catalog/category/bakery' as const },
      { label: 'Кондитерское', href: '/catalog/category/confectionery' as const },
      { label: 'Шоколад и какао', href: '/catalog/category/chocolate' as const },
      { label: 'Молочное', href: '/catalog/category/dairy' as const },
      { label: 'Для напитков', href: '/catalog/category/drinks' as const },
      { label: 'Декорирование', href: '/catalog/category/decoration' as const },
      { label: 'Упаковка', href: '/catalog/category/packaging' as const },
      { label: 'Инвентарь', href: '/catalog/category/inventory' as const },
    ],
  },
  {
    title: 'Компания',
    links: [
      { label: 'О нас', href: '/about' as const },
      { label: 'История', href: '/about#history' as const },
      { label: 'Производители', href: '/catalog?view=brand' as const },
      { label: 'Вакансии', href: '/about#careers' as const },
    ],
  },
  {
    title: 'Направления',
    links: [
      { label: 'Академия', href: '/academy' as const },
      { label: 'Консалтинг', href: '/consulting' as const },
      { label: 'Бизнес-клуб', href: '/club' as const },
      { label: 'Поддержка', href: '/support' as const },
    ],
  },
] as const

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-container px-[var(--container-px)] pt-16 pb-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Бренд-колонка */}
          <div>
            <Link
              href={'/' as const}
              className="font-black text-base uppercase tracking-[0.08em] text-white"
            >
              ПАНЭМ
            </Link>
            <p className="mt-5 text-sm leading-[1.55] text-mist">
              <span className="block text-white">Сильное плечо</span>
              для развития
              <span className="block text-white">вкусного бизнеса</span>
            </p>
            <a
              href="tel:+78463212020"
              className="mt-5 inline-block text-sm text-white tabular-nums hover:text-amber transition-colors duration-150"
            >
              +7 (846) 321-20-20
            </a>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-sand">
                {col.title}
              </h3>
              <ul className="mt-5 grid gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-mist transition-colors duration-150 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-stone pt-6 text-xs text-mist md:flex-row md:items-center md:justify-between">
          <div>
            © {new Date().getFullYear()} ПАНЭМ · Самара, Корсунский пер., 14
          </div>
          <Link
            href={'/privacy' as const}
            className="hover:text-white transition-colors duration-150"
          >
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  )
}
