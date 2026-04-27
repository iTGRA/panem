'use client'

import { useState, FormEvent } from 'react'

const FIELD_BASE =
  'w-full border border-sand rounded-sm px-4 py-3 text-sm bg-white outline-none transition-colors duration-200 focus:border-ink placeholder:text-mist'

export function RequestFormDemo() {
  const [submitted, setSubmitted] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-card border border-sand bg-mint-t px-6 py-8 text-center">
        <p className="text-base font-medium text-ink">Заявка отправлена ✓</p>
        <p className="mt-2 text-sm text-stone">
          Менеджер свяжется в течение рабочего дня.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 max-w-narrow">
      <div className="grid gap-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-mist">
          Имя <span className="text-rose">*</span>
        </label>
        <input required type="text" name="name" placeholder="Как к вам обращаться" className={FIELD_BASE} />
      </div>

      <div className="grid gap-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-mist">
          Телефон <span className="text-rose">*</span>
        </label>
        <input required type="tel" name="phone" placeholder="+7 (___) ___-__-__" className={FIELD_BASE} />
      </div>

      <div className="grid gap-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-mist">Компания</label>
        <input type="text" name="company" placeholder="Название бизнеса" className={FIELD_BASE} />
      </div>

      <div className="grid gap-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-mist">Тип запроса</label>
        <select name="topic" defaultValue="ingredients" className={FIELD_BASE}>
          <option value="ingredients">Ингредиенты</option>
          <option value="academy">Академия</option>
          <option value="consulting">Консалтинг</option>
          <option value="club">Клуб</option>
        </select>
      </div>

      <div className="grid gap-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-mist">Комментарий</label>
        <textarea name="message" rows={4} placeholder="Опишите задачу или запрос" className={FIELD_BASE} />
      </div>

      <button
        type="submit"
        className="mt-2 w-full rounded-xs bg-ink px-6 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition-colors duration-200 hover:bg-stone"
      >
        Отправить заявку
      </button>
    </form>
  )
}
