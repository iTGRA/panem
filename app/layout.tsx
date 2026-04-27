import { Onest, Exo_2 } from 'next/font/google'
import '@/styles/globals.css'

const onest = Onest({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-onest',
  display: 'swap',
})

const exo2 = Exo_2({
  subsets: ['latin', 'cyrillic'],
  weight: ['300'],
  variable: '--font-exo2',
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${onest.variable} ${exo2.variable}`}>
      <body className="font-main antialiased bg-white text-ink">{children}</body>
    </html>
  )
}
