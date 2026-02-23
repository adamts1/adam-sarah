/**
 * Section 4 – RSVP: טופס אישור הגעה בסגנון ההזמנה.
 * שם, טלפון, מבוגרים, בחירת אירועים, הודעה, כפתור שלח.
 */

import { useState } from 'react'

const initialValues = {
  name: '',
  phone: '',
  adults: 0,
  chuppah: false,
  friday: false,
  shabbat: false,
  message: '',
}
const initialErrors = { name: '', phone: '' }

const texts = {
  heb: {
    intro: 'מחכים בקוצר רוח לחגוג איתכם את הרגעים היקרים הללו!',
    nameLabel: 'שם מלא *',
    phoneLabel: 'מס׳ טלפון *',
    adults: 'מבוגרים',
    events: 'הגעה לאירועים',
    chuppah: 'חופה',
    friday: 'יום שישי ערב',
    shabbat: 'יום שבת צהריים',
    messageLabel: 'המילה שלכם לחתן ולכלה',
    submit: 'שלח',
    ariaMinus: 'הפחת',
    ariaPlus: 'הוסף',
    thankYou: 'תודה על האישור',
    successMsg: 'אישור ההגעה התקבל. נתראה בשמחה!',
    errName: 'נא להזין שם מלא',
    errNameShort: 'שם מלא חייב להכיל לפחות 2 תווים',
    errPhone: 'נא להזין מספר טלפון',
    errPhoneInvalid: 'נא להזין מספר טלפון תקין',
  },
  fr: {
    intro: 'Nous avons hâte de célébrer avec vous ces moments précieux !',
    nameLabel: 'Nom complet *',
    phoneLabel: 'Téléphone *',
    adults: 'Adultes',
    events: 'Présence aux événements',
    chuppah: 'Houppa (mariage)',
    friday: 'Vendredi soir',
    shabbat: 'Shabbat après-midi',
    messageLabel: 'Votre message aux mariés',
    submit: 'Envoyer',
    ariaMinus: 'Diminuer',
    ariaPlus: 'Augmenter',
    thankYou: 'Merci pour votre confirmation',
    successMsg: 'Votre confirmation a bien été reçue. À bientôt !',
    errName: 'Veuillez indiquer votre nom complet',
    errNameShort: 'Le nom doit contenir au moins 2 caractères',
    errPhone: 'Veuillez indiquer un numéro de téléphone',
    errPhoneInvalid: 'Veuillez indiquer un numéro de téléphone valide',
  },
}

function validate(values, lang) {
  const t = texts[lang] || texts.heb
  const errors = { ...initialErrors }
  if (!values.name.trim()) errors.name = t.errName
  else if (values.name.trim().length < 2) errors.name = t.errNameShort
  if (!values.phone.trim()) errors.phone = t.errPhone
  else if (!/^[\d\s\-+()]{9,20}$/.test(values.phone.trim())) errors.phone = t.errPhoneInvalid
  return errors
}

const inputBase =
  'w-full px-4 py-3 rounded-lg border border-coral-dark/30 bg-white/80 text-coral-dark placeholder:text-coral-dark/50 focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none transition-all duration-200'

export default function RSVP({ lang = 'heb' }) {
  const [form, setForm] = useState(initialValues)
  const [errors, setErrors] = useState(initialErrors)
  const [submitted, setSubmitted] = useState(false)
  const t = texts[lang] || texts.heb

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const next = type === 'checkbox' ? checked : value
    setForm((prev) => ({ ...prev, [name]: next }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const setAdults = (delta) => {
    setForm((prev) => ({
      ...prev,
      adults: Math.max(0, Math.min(20, (Number(prev.adults) || 0) + delta)),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = validate(form, lang)
    const hasError = Object.values(nextErrors).some(Boolean)
    setErrors(nextErrors)
    if (!hasError) setSubmitted(true)
  }

  if (submitted) {
    return (
      <section id="rsvp" className="py-16 md:py-24 px-6 md:px-10 bg-peach">
        <div className="max-w-lg mx-auto text-center">
          <div className="bg-peach-light rounded-2xl shadow-soft-lg p-8 md:p-10 border border-coral/20">
            <div className="w-14 h-14 rounded-full bg-coral/15 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-display text-2xl text-coral-dark mb-2">{t.thankYou}</h2>
            <p className="text-coral-dark/80">{t.successMsg}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="py-16 md:py-24 px-6 md:px-10 bg-peach text-coral-dark">
      <div className="max-w-lg mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-center text-coral-dark mb-2">
          RSVP
        </h2>
        <p className="text-center font-sans text-base text-coral-dark/80 mb-8">
          {t.intro}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block font-sans text-sm font-medium text-coral-dark mb-1">
              {t.nameLabel}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className={inputBase}
              autoComplete="name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-coral" role="alert">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block font-sans text-sm font-medium text-coral-dark mb-1">
              {t.phoneLabel}
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              className={inputBase}
              autoComplete="tel"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-coral" role="alert">{errors.phone}</p>
            )}
          </div>

          <div className="flex items-center justify-between gap-4">
            <label className="font-sans text-sm font-medium text-coral-dark">{t.adults}</label>
            <div className="flex items-center border border-coral-dark/30 rounded-lg overflow-hidden bg-white/80">
              <button
                type="button"
                onClick={() => setAdults(-1)}
                aria-label={t.ariaMinus}
                className="w-10 h-10 flex items-center justify-center text-coral-dark hover:bg-coral-dark/10 transition-colors"
              >
                <span className="text-lg leading-none">−</span>
              </button>
              <span className="w-12 text-center font-sans text-coral-dark tabular-nums">{form.adults}</span>
              <button
                type="button"
                onClick={() => setAdults(1)}
                aria-label={t.ariaPlus}
                className="w-10 h-10 flex items-center justify-center text-coral-dark hover:bg-coral-dark/10 transition-colors"
              >
                <span className="text-lg leading-none">+</span>
              </button>
            </div>
          </div>

          <div>
            <p className="font-sans text-sm font-medium text-coral-dark mb-2">{t.events}</p>
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="chuppah"
                  checked={form.chuppah}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-coral-dark/40 text-coral focus:ring-coral/20"
                />
                <span className="font-sans text-sm text-coral-dark">{t.chuppah}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="friday"
                  checked={form.friday}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-coral-dark/40 text-coral focus:ring-coral/20"
                />
                <span className="font-sans text-sm text-coral-dark">{t.friday}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="shabbat"
                  checked={form.shabbat}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-coral-dark/40 text-coral focus:ring-coral/20"
                />
                <span className="font-sans text-sm text-coral-dark">{t.shabbat}</span>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block font-sans text-sm font-medium text-coral-dark mb-1">
              {t.messageLabel}
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              className={`${inputBase} resize-y min-h-[100px]`}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-lg border-2 border-coral-dark/40 bg-transparent text-coral-dark font-sans font-medium hover:bg-coral-dark/10 transition-colors"
          >
            {t.submit}
          </button>
        </form>
      </div>
    </section>
  )
}
