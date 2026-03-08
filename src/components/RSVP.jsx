/**
 * Section 4 – RSVP: טופס אישור הגעה בסגנון ההזמנה.
 * שם, טלפון × מספר אורחים, הודעה משותפת, שליחה למייל + Supabase.
 */

import { useState } from 'react'
import footerBg from '../../assets/footer.png'
import { supabase } from '../lib/supabase'
import emailjs from '@emailjs/browser'

const texts = {
  heb: {
    rsvp: 'אישור הגעה',
    intro: 'מחכים בקוצר רוח לחגוג איתכם את הרגעים היקרים הללו!',
    contactTitle: 'יצירת קשר',
    adam: 'אדם',
    sarah: 'שרה',
    phoneAdam: '052-5600493',
    phoneSarah: '055-3161876',
    adults: 'מספר אורחים',
    guestLabel: (i) => `אורח ${i + 1}`,
    nameLabel: 'שם מלא *',
    phoneLabel: 'מס׳ טלפון *',
    messageLabel: 'המילה שלכם לחתן ולכלה',
    submit: 'שלח',
    submitting: 'שולח...',
    ariaMinus: 'הפחת',
    ariaPlus: 'הוסף',
    thankYou: 'תודה על האישור',
    successMsg: 'אישור ההגעה התקבל. נתראה בשמחה!',
    errName: 'נא להזין שם מלא',
    errNameShort: 'שם מלא חייב להכיל לפחות 2 תווים',
    errPhone: 'נא להזין מספר טלפון',
    errPhoneInvalid: 'נא להזין מספר טלפון תקין',
    errMinGuests: 'נא להוסיף לפחות אורח אחד',
    errSubmit: 'שגיאה בשליחה, נסו שוב',
    removeGuest: 'הסר',
  },
  fr: {
    rsvp: 'RSVP',
    intro: 'Nous avons hâte de célébrer avec vous ces moments précieux !',
    contactTitle: 'Nous contacter',
    adam: 'Adam',
    sarah: 'Sarah',
    phoneAdam: '+972 52-5600493',
    phoneSarah: '+972 55-3161876',
    adults: 'Nombre d\'invités',
    guestLabel: (i) => `Invité ${i + 1}`,
    nameLabel: 'Nom complet *',
    phoneLabel: 'Téléphone *',
    messageLabel: 'Votre message aux mariés',
    submit: 'Envoyer',
    submitting: 'Envoi en cours...',
    ariaMinus: 'Diminuer',
    ariaPlus: 'Augmenter',
    thankYou: 'Merci pour votre confirmation',
    successMsg: 'Votre confirmation a bien été reçue. À bientôt !',
    errName: 'Veuillez indiquer votre nom complet',
    errNameShort: 'Le nom doit contenir au moins 2 caractères',
    errPhone: 'Veuillez indiquer un numéro de téléphone',
    errPhoneInvalid: 'Veuillez indiquer un numéro de téléphone valide',
    errMinGuests: 'Veuillez ajouter au moins un invité',
    errSubmit: 'Erreur lors de l\'envoi, veuillez réessayer',
    removeGuest: 'Supprimer',
  },
}

function validateGuests(guests, lang) {
  const t = texts[lang] || texts.heb
  return guests.map((g) => {
    const errors = { name: '', phone: '' }
    if (!g.name.trim()) errors.name = t.errName
    else if (g.name.trim().length < 2) errors.name = t.errNameShort
    if (!g.phone.trim()) errors.phone = t.errPhone
    else if (!/^[\d\s\-+()]{9,20}$/.test(g.phone.trim())) errors.phone = t.errPhoneInvalid
    return errors
  })
}

const inputBase =
  'w-full px-4 py-3 rounded-lg border border-black/30 bg-[#F3E3FF] text-black placeholder:text-black/50 focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none transition-all duration-200'

const emptyGuest = () => ({ name: '', phone: '' })

export default function RSVP({ lang = 'heb' }) {
  const [guests, setGuests] = useState([emptyGuest()])
  const [message, setMessage] = useState('')
  const [guestErrors, setGuestErrors] = useState([{ name: '', phone: '' }])
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const t = texts[lang] || texts.heb

  const setGuestCount = (delta) => {
    setGuests((prev) => {
      const newCount = Math.max(1, Math.min(20, prev.length + delta))
      if (newCount > prev.length) {
        const added = Array.from({ length: newCount - prev.length }, emptyGuest)
        return [...prev, ...added]
      }
      return prev.slice(0, newCount)
    })
    setGuestErrors((prev) => {
      const newCount = Math.max(1, Math.min(20, prev.length + delta))
      if (newCount > prev.length) {
        const added = Array.from({ length: newCount - prev.length }, () => ({ name: '', phone: '' }))
        return [...prev, ...added]
      }
      return prev.slice(0, newCount)
    })
  }

  const updateGuest = (index, field, value) => {
    setGuests((prev) => prev.map((g, i) => (i === index ? { ...g, [field]: value } : g)))
    setGuestErrors((prev) =>
      prev.map((e, i) => (i === index ? { ...e, [field]: '' } : e))
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')

    if (guests.length === 0) {
      setSubmitError(t.errMinGuests)
      return
    }

    const errors = validateGuests(guests, lang)
    setGuestErrors(errors)
    const hasError = errors.some((e) => e.name || e.phone)
    if (hasError) return

    setSubmitting(true)

    try {
      // Insert each guest as a row in Supabase
      const rows = guests.map((g) => ({
        name: g.name.trim(),
        phone: g.phone.trim(),
        message: message.trim(),
        lang,
        created_at: new Date().toISOString(),
      }))

      if (supabase) {
        const { error: dbError } = await supabase.from('rsvp').insert(rows)
        if (dbError) throw dbError
      }

      // Send one email with all guest details
      const guestList = guests
        .map((g, i) => `${i + 1}. ${g.name} — ${g.phone}`)
        .join('\n')

      const emailParams = {
        to_email: import.meta.env.VITE_NOTIFICATION_EMAIL,
        guest_count: String(guests.length),
        guest_list: guestList,
        message: message.trim() || '—',
      }

      try {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          emailParams,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        )
      } catch {
        // Email failure is non-critical — data is already saved in Supabase
        console.warn('Email notification failed, but RSVP was saved.')
      }

      setSubmitted(true)
    } catch (err) {
      console.error('RSVP submission error:', err)
      setSubmitError(t.errSubmit)
    } finally {
      setSubmitting(false)
    }
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
          {/* Guest count selector */}
          <div className="flex items-center justify-between gap-4">
            <label className="font-sans text-sm font-medium text-black">{t.adults}</label>
            <div className="flex items-center border border-black/30 rounded-lg overflow-hidden bg-[#F3E3FF]">
              <button
                type="button"
                onClick={() => setGuestCount(-1)}
                aria-label={t.ariaMinus}
                className="w-10 h-10 flex items-center justify-center text-black hover:bg-black/10 transition-colors"
              >
                <span className="text-lg leading-none">−</span>
              </button>
              <span className="w-12 text-center font-sans text-black tabular-nums">{guests.length}</span>
              <button
                type="button"
                onClick={() => setGuestCount(1)}
                aria-label={t.ariaPlus}
                className="w-10 h-10 flex items-center justify-center text-black hover:bg-black/10 transition-colors"
              >
                <span className="text-lg leading-none">+</span>
              </button>
            </div>
          </div>

          {/* Dynamic guest fields */}
          {guests.map((guest, i) => (
            <div
              key={i}
              className="rounded-xl border border-black/15 bg-[#FFE9CF]/40 p-4 space-y-3"
            >
              <p className="font-sans text-sm font-semibold text-black/70">{t.guestLabel(i)}</p>

              <div>
                <label
                  htmlFor={`name-${i}`}
                  className="block font-sans text-sm font-medium text-black mb-1"
                >
                  {t.nameLabel}
                </label>
                <input
                  id={`name-${i}`}
                  type="text"
                  value={guest.name}
                  onChange={(e) => updateGuest(i, 'name', e.target.value)}
                  className={inputBase}
                  autoComplete="name"
                />
                {guestErrors[i]?.name && (
                  <p className="mt-1 text-sm text-black" role="alert">{guestErrors[i].name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor={`phone-${i}`}
                  className="block font-sans text-sm font-medium text-black mb-1"
                >
                  {t.phoneLabel}
                </label>
                <input
                  id={`phone-${i}`}
                  type="tel"
                  value={guest.phone}
                  onChange={(e) => updateGuest(i, 'phone', e.target.value)}
                  className={inputBase}
                  autoComplete="tel"
                />
                {guestErrors[i]?.phone && (
                  <p className="mt-1 text-sm text-black" role="alert">{guestErrors[i].phone}</p>
                )}
              </div>
            </div>
          ))}

          {/* Shared message */}
          <div>
            <label htmlFor="message" className="block font-sans text-sm font-medium text-black mb-1">
              {t.messageLabel}
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className={`${inputBase} resize-y min-h-[80px] md:min-h-[100px]`}
            />
          </div>

          {submitError && (
            <p className="text-sm text-red-700 text-center" role="alert">{submitError}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 px-6 rounded-lg border-2 border-black bg-transparent text-black font-sans font-medium hover:bg-black/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? t.submitting : t.submit}
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
