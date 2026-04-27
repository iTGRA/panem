import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1D1D1B',
        stone: '#4A4845',
        mist: '#9A9890',
        sand: '#D4CFC4',
        warm: '#F0EBE0',

        amber: '#FFB45A',
        yellow: '#FFD232',
        lime: '#CDDC3C',
        teal: '#6EA5AA',
        blue: '#5A8CD7',
        violet: '#7D78DC',
        purple: '#A064DC',
        magenta: '#EB6EC8',
        rose: '#F582A0',
        coral: '#FF967D',

        'amber-m': '#FFD291',
        'yellow-m': '#FFE16E',
        mint: '#AFE6C3',
        sky: '#A5D2DC',
        'blue-m': '#AACBFF',
        'violet-m': '#BEB4FA',
        lavender: '#CD9BF5',
        lilac: '#F5BEE6',
        'rose-m': '#FAC3D2',
        peach: '#FFCBB5',
        'lime-m': '#E6F596',

        'amber-t': '#FCF0C8',
        'yellow-t': '#FFF0CD',
        'lime-t': '#F5FAC8',
        'sky-t': '#D7F0F5',
        'blue-t': '#E6F0FF',
        'rose-t': '#FFE1DC',
        'mint-t': '#D2FAE6',
        'purple-t': '#F0E6FF',
        'lilac-t': '#F8DBFF',
      },
      fontFamily: {
        main: ['var(--font-onest)', 'Onest', 'sans-serif'],
        sub: ['var(--font-exo2)', 'Exo 2', 'sans-serif'],
      },
      borderRadius: {
        xs: '2px',
        card: '6px',
        port: '10px',
      },
      boxShadow: {
        card: '0 1px 4px rgba(0,0,0,.06), 0 0 0 0.5px rgba(0,0,0,.06)',
        nav: '0 2px 16px rgba(0,0,0,.06)',
        dropdown: '0 4px 20px rgba(0,0,0,.08)',
        modal: '0 8px 40px rgba(0,0,0,.12)',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
      },
      animation: {
        appear: 'fadeUp 500ms cubic-bezier(0, 0, 0.2, 1) both',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      maxWidth: {
        container: '1280px',
        narrow: '800px',
      },
    },
  },
  plugins: [],
}
export default config
