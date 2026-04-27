# DESIGN_SYSTEM.md — Дизайн-система ПАНЭМ v1.1

> **Для Claude Code:** читай этот файл полностью перед любой работой с UI.  
> Не интерпретируй — применяй точно. При сомнении — спроси.

---

## 1. ПРИНЦИПЫ

1. **Белый фон** — основа всего. `#FFFFFF` везде. `#F0EBE0` (Warm) только для чередования секций.
2. **Цвет — акцент, не фон** — L1 цвета только точечно: `border-top`, dot, hover, badge. Никогда фоном секции.
3. **Один цвет = один смысл** — Amber = Пекарня/Ингредиенты, Rose = Академия, Blue = Консалтинг, Teal = Клуб.
4. **Максимум 2 акцентных L1 цвета на странице** (не считая hero-портреты).
5. **Иерархия через вес шрифта и пространство** — не через смену цвета фона блока.
6. **Система замкнута** — цвет Пекарни появляется в портрете hero, полоске карточки и чипе фильтра.

---

## 2. CSS-ПЕРЕМЕННЫЕ (globals.css)

```css
@import url('https://fonts.googleapis.com/css2?family=Onest:wght@300;400;500;700;900&family=Exo+2:wght@300&display=swap');

:root {
  /* Нейтральные — 80%+ пространства */
  --c-white:      #FFFFFF;
  --c-warm:       #F0EBE0;
  --c-sand:       #D4CFC4;
  --c-mist:       #9A9890;
  --c-stone:      #4A4845;
  --c-ink:        #1D1D1B;

  /* Level 1 — насыщенные акценты */
  --c-amber:      #FFB45A;
  --c-yellow:     #FFD232;
  --c-lime:       #CDDC3C;
  --c-teal:       #6EA5AA;
  --c-blue:       #5A8CD7;
  --c-violet:     #7D78DC;
  --c-purple:     #A064DC;
  --c-magenta:    #EB6EC8;
  --c-rose:       #F582A0;
  --c-coral:      #FF967D;

  /* Level 2 — средние тона */
  --c-amber-m:    #FFD291;
  --c-yellow-m:   #FFE16E;
  --c-mint:       #AFE6C3;
  --c-sky:        #A5D2DC;
  --c-blue-m:     #AACBFF;
  --c-violet-m:   #BEB4FA;
  --c-lavender:   #CD9BF5;
  --c-lilac:      #F5BEE6;
  --c-rose-m:     #FAC3D2;
  --c-peach:      #FFCBB5;
  --c-lime-m:     #E6F596;

  /* Level 3 — светлые тинты */
  --c-amber-t:    #FCF0C8;
  --c-yellow-t:   #FFF0CD;
  --c-lime-t:     #F5FAC8;
  --c-mint-t:     #D2FAE6;
  --c-sky-t:      #D7F0F5;
  --c-blue-t:     #E6F0FF;
  --c-purple-t:   #F0E6FF;
  --c-lilac-t:    #F8DBFF;
  --c-rose-t:     #FFE1DC;

  /* Семантические */
  --c-cta-primary:  var(--c-ink);
  --c-cta-accent:   var(--c-amber);
  --c-link:         var(--c-blue);
  --c-shoppable:    var(--c-amber);
  --c-success:      var(--c-mint);
  --c-warning:      var(--c-yellow);
  --c-badge-new:    var(--c-lime);
  --c-badge-hit:    var(--c-amber);
  --c-badge-promo:  var(--c-rose);

  /* Типографика */
  --font-main: 'Onest', sans-serif;
  --font-sub:  'Exo 2', sans-serif;

  /* Радиусы */
  --r-xs:   2px;
  --r-sm:   4px;
  --r-md:   6px;
  --r-lg:   10px;
  --r-xl:   16px;
  --r-full: 9999px;

  /* Тени */
  --shadow-card:     0 1px 4px rgba(0,0,0,.06), 0 0 0 0.5px rgba(0,0,0,.06);
  --shadow-nav:      0 2px 16px rgba(0,0,0,.06);
  --shadow-dropdown: 0 4px 20px rgba(0,0,0,.08);
  --shadow-modal:    0 8px 40px rgba(0,0,0,.12);

  /* Пространство (8px base) */
  --sp-1: 4px;  --sp-2: 8px;   --sp-3: 12px;
  --sp-4: 16px; --sp-6: 24px;  --sp-8: 32px;
  --sp-12: 48px; --sp-16: 64px; --sp-24: 96px;

  /* Анимации */
  --dur-fast:   150ms;
  --dur-base:   200ms;
  --dur-slow:   350ms;
  --dur-appear: 500ms;
  --ease:       cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out:   cubic-bezier(0, 0, 0.2, 1);

  /* Контейнеры */
  --container-max:    1280px;
  --container-narrow: 800px;
  --container-px:     clamp(20px, 5vw, 80px);
}

*, *::before, *::after { box-sizing: border-box; }

body {
  font-family: var(--font-main);
  background:  var(--c-white);
  color:       var(--c-ink);
  -webkit-font-smoothing: antialiased;
}

/* Анимация появления */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.appear      { animation: fadeUp var(--dur-appear) var(--ease-out) both; }
.appear-d1   { animation-delay: 80ms; }
.appear-d2   { animation-delay: 160ms; }
.appear-d3   { animation-delay: 240ms; }
.appear-d4   { animation-delay: 320ms; }

/* Shoppable ссылка */
.shoppable-link {
  color: var(--c-ink);
  text-decoration: none;
  border-bottom: 1.5px solid var(--c-amber);
  padding-bottom: 1px;
  transition: color var(--dur-base) var(--ease);
}
.shoppable-link:hover { color: var(--c-amber); }

/* Доступность */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 3. TAILWIND КОНФИГ

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1D1D1B', stone: '#4A4845', mist: '#9A9890',
        sand: '#D4CFC4', warm: '#F0EBE0',
        amber: '#FFB45A', yellow: '#FFD232', lime: '#CDDC3C',
        teal: '#6EA5AA', blue: '#5A8CD7', violet: '#7D78DC',
        purple: '#A064DC', magenta: '#EB6EC8', rose: '#F582A0', coral: '#FF967D',
        'amber-m': '#FFD291', 'yellow-m': '#FFE16E', mint: '#AFE6C3',
        sky: '#A5D2DC', 'blue-m': '#AACBFF', 'violet-m': '#BEB4FA',
        lavender: '#CD9BF5', lilac: '#F5BEE6', 'rose-m': '#FAC3D2',
        peach: '#FFCBB5', 'lime-m': '#E6F596',
        'amber-t': '#FCF0C8', 'sky-t': '#D7F0F5', 'blue-t': '#E6F0FF',
        'rose-t': '#FFE1DC', 'mint-t': '#D2FAE6', 'purple-t': '#F0E6FF',
      },
      fontFamily: {
        main: ['Onest', 'sans-serif'],
        sub:  ['Exo 2', 'sans-serif'],
      },
      borderRadius: {
        xs: '2px', card: '6px', port: '10px',
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
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
```

---

## 4. ЦВЕТОВОЕ КОДИРОВАНИЕ

### 4.1 Четыре направления

```
ИНГРЕДИЕНТЫ  L1: #FFB45A  L2: #FFD291  L3: #FCF0C8
АКАДЕМИЯ     L1: #F582A0  L2: #FAC3D2  L3: #FFE1DC
КОНСАЛТИНГ   L1: #5A8CD7  L2: #AACBFF  L3: #E6F0FF
КЛУБ         L1: #6EA5AA  L2: #A5D2DC  L3: #D7F0F5
```

### 4.2 Сегменты бизнеса

| Сегмент | slug | L1 | L2 | L3 |
|---|---|---|---|---|
| Пекарня | bakery-shop | `#FFB45A` | `#FFD291` | `#FCF0C8` |
| Кондитерская | confectionery-shop | `#F582A0` | `#FAC3D2` | `#FFE1DC` |
| Ресторан | restaurant | `#6EA5AA` | `#AFE6C3` | `#D2FAE6` |
| Кофейня | coffee-shop | `#5A8CD7` | `#A5D2DC` | `#D7F0F5` |
| Бургерная | burger | `#FF967D` | `#FFCBB5` | `#FFE1DC` |
| Столовая | canteen | `#7D78DC` | `#BEB4FA` | `#E6F0FF` |
| Производство | production | `#A064DC` | `#CD9BF5` | `#F0E6FF` |

### 4.3 Типы контента → тег

| Константа | Метка | Фон тега |
|---|---|---|
| RECIPE | Рецептура | `#FFD291` |
| TECH | Технология | `#A5D2DC` |
| VIDEO | Видео | `#FFCBB5` |
| TREND | Тренд | `#E6F596` |
| GUIDE | Гайд | `#BEB4FA` |
| INTERVIEW | Интервью | `#CD9BF5` |
| CASE | Кейс | `#AACBFF` |
| NEWS | Новость | `#D4CFC4` |

### 4.4 Категории каталога → border-top

```
Хлебопекарное   → var(--c-amber)    Кондитерское → var(--c-rose)
Шоколад         → var(--c-amber)    Молочное     → var(--c-sky)
Для напитков    → var(--c-blue)     Гастрономия  → var(--c-teal)
Декорирование   → var(--c-coral)    Упаковка     → var(--c-teal)
Инвентарь       → var(--c-violet)
```

---

## 5. ТИПОГРАФИКА

| Роль | Семейство | Вес | Размер | Применение |
|---|---|---|---|---|
| Display | Onest | 900 | clamp(48px,7vw,96px), lh:0.93 | Логотип, hero |
| H1 | Onest | 700 | clamp(36px,4.5vw,64px), lh:1.0 | Заголовки страниц, uppercase |
| H2 | Onest | 700 | clamp(24px,3vw,40px), lh:1.1 | Разделы, uppercase |
| H3 | Onest | 700 | clamp(18px,2vw,26px) | Блоки |
| Subtitle | Onest | 500 | clamp(15px,1.5vw,20px) | Подзаголовки |
| Body | Onest | 400 | 16px, lh:1.65 | Основной текст |
| Body-sm | Onest | 400 | 14px, lh:1.6 | Карточки |
| Caption | Onest | 300 | 12px, lh:1.5 | Подписи |
| Label | Onest | 700 | 10px, ls:0.28em, uppercase | Теги, кнопки |
| Descriptor | Exo 2 | 300 | 10px, ls:0.32em, uppercase | ТОЛЬКО суббренды |

**Правило uppercase:** letter-spacing минимум 0.015em. Иначе буквы слипаются.

**Exo 2 — только так:**
```tsx
<span className="font-sub font-light text-[10px] tracking-[0.32em] uppercase text-mist">
  А К А Д Е М И Я
</span>
```

---

## 6. MOTION

```
Hover карточки:    translateY(-2px) + shadow · 200ms standard
Hover btn-primary: bg ink→stone · 200ms
Hover btn-accent:  opacity 0.9, translateY(-1px) · 150ms
Appear (scroll):   fadeUp 500ms decelerate, stagger +80ms
Tab switch:        opacity 0→1 · 250ms
Dropdown:          opacity + scaleY(0.95→1) · 200ms decelerate
Tooltip:           opacity + translateY(4px→0) · 150ms, delay 200ms
Region switch:     opacity flash 200ms
```

**Запрещено анимировать:** фон секций, размер шрифта, border-width.

---

## 7. ЧЕРЕДОВАНИЕ ФОНОВ СЕКЦИЙ

```
Hero             → white
4 направления    → white
Каталог          → warm
Академия         → white
Консалтинг+Клуб  → warm
Техподдержка     → white
Отзывы+цифры     → white
Регионы          → warm
Финальный CTA    → ink   ← единственный тёмный!
```

Правило: white ↔ warm ↔ white. Два warm подряд — запрещено.

---

## 8. ЧТО НЕЛЬЗЯ

```
✗ Exo 2 вне дескриптора суббренда
✗ L1 цвет фоном секции
✗ Более 2 L1 акцентов на странице
✗ Тёмный фон кроме финального CTA
✗ Логотип в цвете
✗ border-radius > 10px на карточках товаров
✗ Gradient на фонах
✗ Декоративные тени
✗ Более 1 бейджа на карточке
✗ Более 1 accent-кнопки (amber) на странице
✗ Два warm-раздела подряд
✗ Анимации без prefers-reduced-motion
```

---

## 9. ЧЕКЛИСТ БЛОКА

- [ ] Белый/warm фон чередуется правильно
- [ ] border-top карточек соответствует категории/направлению
- [ ] Максимум 2 L1-цвета на странице
- [ ] Onest везде, Exo 2 только у суббренда
- [ ] Кнопки border-radius: 2px
- [ ] Hover: translateY(-2px) + shadow на карточках
- [ ] prefers-reduced-motion есть
- [ ] Контраст ≥ 4.5:1 (WCAG AA)
- [ ] Alt-тексты на изображениях
- [ ] Семантический HTML
