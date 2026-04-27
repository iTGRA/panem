import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    template: '%s | ПАНЭМ',
    default: 'ПАНЭМ — ингредиенты, обучение и консалтинг для гастробизнеса Поволжья',
  },
  description:
    'Дистрибьютор 2300+ ингредиентов для пекарен, кондитерских и HORECA. Академия, консалтинг, бизнес-клуб. Самара, Саратов, Пенза. С 2001 года.',
  openGraph: {
    siteName: 'ПАНЭМ',
    locale: 'ru_RU',
    type: 'website',
  },
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
