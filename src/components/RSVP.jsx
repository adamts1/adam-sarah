/**
 * Section 4 – RSVP: טופס אישור הגעה בסגנון ההזמנה.
 * שם, טלפון, מבוגרים, בחירת אירועים, הודעה, כפתור שלח.
 */

import { useState } from 'react'
import footerBg from '../../assets/footer.png'

const initialValues = {
  name: '',
  phone: '',
  adults: 0,
  message: '',
}
const initialErrors = { name: '', phone: '' }

const texts = {
  heb: {
    rsvp: 'אישור הגעה',
    intro: 'מחכים בקוצר רוח לחגוג איתכם את הרגעים היקרים הללו!',
    contactTitle: 'יצירת קשר',
    adam: 'אדם',
    sarah: 'שרה',
    phoneAdam: '052-5600493',
    phoneSarah: '055-3161876',
    nameLabel: 'שם מלא *',
    phoneLabel: 'מס׳ טלפון *',
    adults: 'מבוגרים',
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
    rsvp: 'RSVP',
    intro: 'Nous avons hâte de célébrer avec vous ces moments précieux !',
    contactTitle: 'Nous contacter',
    adam: 'Adam',
    sarah: 'Sarah',
    phoneAdam: '+972 52-5600493',
    phoneSarah: '+972 55-3161876',
    nameLabel: 'Nom complet *',
    phoneLabel: 'Téléphone *',
    adults: 'Adultes',
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
  'w-full px-4 py-3 rounded-lg border border-black/30 bg-[#F3E3FF] text-black placeholder:text-black/50 focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none transition-all duration-200'

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
      <section
        id="rsvp"
        className="py-8 md:min-h-screen md:flex md:flex-col md:justify-center md:py-24 px-4 md:px-10 bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url(${footerBg})` }}
      >
        <div className="max-w-lg mx-auto text-center">
          <div className="bg-[#FFE9CF] rounded-2xl shadow-soft-lg p-6 md:p-10 border border-coral/20">
            <div className="w-14 h-14 rounded-full bg-coral/15 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-display text-2xl text-black mb-2">{t.thankYou}</h2>
            <p className="text-black/80">{t.successMsg}</p>
          </div>
          <div id="contact" className="mt-6 pt-4 md:mt-12 md:pt-8 border-t border-black/20 text-center">
            <h2 className="font-display text-xl md:text-2xl text-black mb-4">{t.contactTitle}</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 font-sans pb-4">
              <a href="tel:+972525600493" className="text-black hover:opacity-80 transition-opacity">
                {t.adam}: {t.phoneAdam}
              </a>
              <a href="tel:+972553161876" className="text-black hover:opacity-80 transition-opacity">
                {t.sarah}: {t.phoneSarah}
              </a>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="rsvp"
      className="py-8 md:min-h-screen md:flex md:flex-col md:justify-center md:py-24 px-4 md:px-10 bg-cover bg-center bg-no-repeat text-black overflow-hidden"
      style={{ backgroundImage: `url(${footerBg})` }}
    >
      <div className="max-w-lg mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-center text-black mb-2">
          {t.rsvp}
        </h2>
        <p className="text-center font-sans text-base text-black/80 mb-4 md:mb-8">
          {t.intro}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
          <div>
            <label htmlFor="name" className="block font-sans text-sm font-medium text-black mb-1">
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
              <p className="mt-1 text-sm text-black" role="alert">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block font-sans text-sm font-medium text-black mb-1">
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
              <p className="mt-1 text-sm text-black" role="alert">{errors.phone}</p>
            )}
          </div>

          <div className="flex items-center justify-between gap-4">
            <label className="font-sans text-sm font-medium text-black">{t.adults}</label>
            <div className="flex items-center border border-black/30 rounded-lg overflow-hidden bg-[#F3E3FF]">
              <button
                type="button"
                onClick={() => setAdults(-1)}
                aria-label={t.ariaMinus}
                className="w-10 h-10 flex items-center justify-center text-black hover:bg-black/10 transition-colors"
              >
                <span className="text-lg leading-none">−</span>
              </button>
              <span className="w-12 text-center font-sans text-black tabular-nums">{form.adults}</span>
              <button
                type="button"
                onClick={() => setAdults(1)}
                aria-label={t.ariaPlus}
                className="w-10 h-10 flex items-center justify-center text-black hover:bg-black/10 transition-colors"
              >
                <span className="text-lg leading-none">+</span>
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block font-sans text-sm font-medium text-black mb-1">
              {t.messageLabel}
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={3}
              className={`${inputBase} resize-y min-h-[80px] md:min-h-[100px]`}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-lg border-2 border-black bg-transparent text-black font-sans font-medium hover:bg-black/10 transition-colors"
          >
            {t.submit}
          </button>
        </form>

        <div id="contact" className="mt-6 pt-4 md:mt-12 md:pt-8 border-t border-black/20 text-center">
          <h2 className="font-display text-xl md:text-2xl text-black mb-3 md:mb-4">{t.contactTitle}</h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-8 font-sans pb-10">
            <a href="tel:+972525600493" className="text-black hover:opacity-80 transition-opacity">
              {t.adam}: {t.phoneAdam}
            </a>
            <a href="tel:+972553161876" className="text-black hover:opacity-80 transition-opacity">
              {t.sarah}: {t.phoneSarah}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
