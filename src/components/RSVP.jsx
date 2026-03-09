/**
 * Section 4 – RSVP: טופס אישור הגעה בסגנון ההזמנה.
 * שם, טלפון × מספר אורחים, הודעה משותפת, שליחה למייל + Supabase.
 */

import { useState, useEffect } from 'react'

import { supabase } from '../lib/supabase'
import emailjs from '@emailjs/browser'
import celebrationMusic from '../../assets/music.mp3'

const texts = {
  heb: {
    rsvp: 'אישור הגעה',
    intro: 'מחכים לחגוג איתכם את היום המיוחד הזה!',
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

function validateGuests(guests, phone, lang) {
  const t = texts[lang] || texts.heb
  const phoneError = !phone.trim() ? t.errPhone : !/^[\d\s\-+()]{9,20}$/.test(phone.trim()) ? t.errPhoneInvalid : ''
  const nameErrors = guests.map((g) => {
    if (!g.name.trim()) return t.errName
    if (g.name.trim().length < 2) return t.errNameShort
    return ''
  })
  return { nameErrors, phoneError }
}

const CONFETTI_COLORS = ['#FFD700', '#FF6B6B', '#C084FC', '#F472B6', '#34D399', '#60A5FA', '#FBBF24', '#F3E3FF']
const CONFETTI_SHAPES = ['circle', 'square', 'heart']

function makePieces(count, direction) {
  return Array.from({ length: count }, (_, i) => ({
    id: `${direction}-${i}`,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2.5 + Math.random() * 2,
    size: 6 + Math.random() * 10,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    shape: CONFETTI_SHAPES[Math.floor(Math.random() * CONFETTI_SHAPES.length)],
    rotation: Math.random() * 360,
    drift: -30 + Math.random() * 60,
    direction,
  }))
}

function Confetti() {
  const [pieces, setPieces] = useState([])

  useEffect(() => {
    setPieces([...makePieces(40, 'down'), ...makePieces(40, 'up')])
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            ...(p.direction === 'down' ? { top: '-5%' } : { bottom: '-5%' }),
            animation: `${p.direction === 'down' ? 'confettiFall' : 'confettiRise'} ${p.duration}s ease-out ${p.delay}s forwards`,
            '--drift': `${p.drift}px`,
          }}
        >
          {p.shape === 'heart' ? (
            <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill={p.color}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <span
              style={{
                display: 'block',
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                borderRadius: p.shape === 'circle' ? '50%' : '2px',
                transform: `rotate(${p.rotation}deg)`,
              }}
            />
          )}
        </span>
      ))}
    </div>
  )
}

const inputBase =
  'w-full px-4 py-3 md:py-3.5 rounded-lg border border-black/30 bg-[#F3E3FF] text-black md:text-lg placeholder:text-black/50 focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none transition-all duration-200'

const emptyGuest = () => ({ name: '' })

export default function RSVP({ lang = 'heb' }) {
  const [guests, setGuests] = useState([emptyGuest()])
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [nameErrors, setNameErrors] = useState([''])
  const [phoneError, setPhoneError] = useState('')
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
    setNameErrors((prev) => {
      const newCount = Math.max(1, Math.min(20, prev.length + delta))
      if (newCount > prev.length) {
        const added = Array.from({ length: newCount - prev.length }, () => '')
        return [...prev, ...added]
      }
      return prev.slice(0, newCount)
    })
  }

  const updateGuestName = (index, value) => {
    setGuests((prev) => prev.map((g, i) => (i === index ? { name: value } : g)))
    setNameErrors((prev) => prev.map((e, i) => (i === index ? '' : e)))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')

    if (guests.length === 0) {
      setSubmitError(t.errMinGuests)
      return
    }

    const { nameErrors: nErrors, phoneError: pError } = validateGuests(guests, phone, lang)
    setNameErrors(nErrors)
    setPhoneError(pError)
    if (nErrors.some((e) => e) || pError) return

    setSubmitting(true)

    try {
      // Insert each guest as a row in Supabase
      const rows = guests.map((g) => ({
        name: g.name.trim(),
        phone: phone.trim(),
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
        .map((g, i) => `${i + 1}. ${g.name}`)
        .join('\n') + `\nPhone: ${phone.trim()}`

      try {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            to_email: import.meta.env.VITE_NOTIFICATION_EMAIL,
            guest_count: String(guests.length),
            guest_list: guestList,
            message: message.trim() || '—',
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        )
      } catch {
        // Email failure is non-critical — data is already saved in Supabase
        console.warn('Email notification failed, but RSVP was saved.')
      }

      setSubmitted(true)
      try {
        const audio = new Audio(celebrationMusic)
        audio.volume = 0.5
        audio.play()
      } catch {
        // Audio playback is non-critical
      }
    } catch (err) {
      console.error('RSVP submission error:', err)
      setSubmitError(t.errSubmit)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <>
      <Confetti />
      <section
        id="rsvp"
        className="py-8 md:min-h-screen md:flex md:flex-col md:justify-center md:py-24 px-4 md:px-10 bg-[#FFE9CF] overflow-hidden"
      >
        <div className="max-w-lg md:max-w-xl lg:max-w-2xl mx-auto text-center">
          <div className="bg-[#FFE9CF] rounded-2xl shadow-soft-lg p-6 md:p-12 border border-coral/20 animate-fade-in-up">
            <div className="w-14 h-14 md:w-18 md:h-18 rounded-full bg-coral/15 flex items-center justify-center mx-auto mb-4 md:mb-6 animate-bounce-in">
              <svg className="w-7 h-7 md:w-9 md:h-9 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-display text-2xl md:text-3xl text-black mb-2">{t.thankYou}</h2>
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
      </>
    )
  }

  return (
    <section
      id="rsvp"
      className="py-8 md:min-h-screen md:flex md:flex-col md:justify-center md:py-24 px-4 md:px-10 bg-[#FFE9CF] text-black overflow-hidden"
    >
      <div className="max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
        <h2 className="font-opensans text-3xl md:text-4xl lg:text-5xl text-center text-black mb-2 md:mb-4">
          {t.rsvp}
        </h2>
        <p className="text-center font-sans text-base md:text-lg text-black/80 mb-4 md:mb-8">
          {t.intro}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {/* Guest count selector */}
          <div className="flex items-center justify-between gap-4">
            <label className="font-sans text-sm md:text-base font-medium text-black">{t.adults}</label>
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

          {/* Dynamic guest name fields */}
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
                  onChange={(e) => updateGuestName(i, e.target.value)}
                  className={`${inputBase} ${nameErrors[i] ? 'border-red-500 ring-2 ring-red-200' : ''}`}
                  autoComplete="name"
                />
                {nameErrors[i] && (
                  <p className="mt-1 text-sm text-red-600" role="alert">{nameErrors[i]}</p>
                )}
              </div>
            </div>
          ))}

          {/* Phone – shared for all guests */}
          <div>
            <label
              htmlFor="phone"
              className="block font-sans text-sm font-medium text-black mb-1"
            >
              {t.phoneLabel}
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => { setPhone(e.target.value); setPhoneError('') }}
              className={`${inputBase} ${phoneError ? 'border-red-500 ring-2 ring-red-200' : ''}`}
              autoComplete="tel"
            />
            {phoneError && (
              <p className="mt-1 text-sm text-red-600" role="alert">{phoneError}</p>
            )}
          </div>

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
