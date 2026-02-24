/**
 * ספירה לאחור – ימים, שעות, דקות, שניות. תמיכה בעברית וצרפתית.
 */

import { useState, useEffect } from 'react'

const TARGET_DATE = new Date(2026, 4, 15, 17, 0, 0) // 15/5/2026 17:00

const labels = {
  heb: { days: 'ימים', hours: 'שעות', minutes: 'דקות', seconds: 'שניות', done: 'הגיע היום! 🎉' },
  fr: { days: 'jours', hours: 'heures', minutes: 'minutes', seconds: 'secondes', done: "C'est le grand jour ! 🎉" },
}

function pad(n) {
  return String(n).padStart(2, '0')
}

function getTimeLeft() {
  const now = new Date()
  const diff = TARGET_DATE - now
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true }
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return { days, hours, minutes, seconds, done: false }
}

export default function Countdown({ embedded = false, lang = 'heb' }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft)
  const t = labels[lang] || labels.heb

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const Wrapper = embedded ? 'div' : 'section'
  const wrapperClass = embedded ? 'w-full max-w-2xl mx-auto border-0' : 'py-12 md:py-16 px-4 bg-[#FFE9CF]'

  if (timeLeft.done) {
    return (
      <Wrapper className={wrapperClass}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-display text-2xl text-black">{t.done}</p>
        </div>
      </Wrapper>
    )
  }

  const units = [
    { value: timeLeft.days, label: t.days },
    { value: timeLeft.hours, label: t.hours },
    { value: timeLeft.minutes, label: t.minutes },
    { value: timeLeft.seconds, label: t.seconds },
  ]

  const isCompact = embedded
  return (
    <Wrapper className={wrapperClass}>
      <div className={isCompact ? 'w-full max-w-full' : 'max-w-2xl mx-auto'}>
        <div className={`flex flex-wrap justify-center ${isCompact ? 'gap-1.5 md:gap-2' : 'gap-4 md:gap-6'}`}>
          {units.map(({ value, label }) => (
            <div
              key={label}
              className={`flex flex-col items-center rounded-lg bg-[#FFE9CF]/90 border border-coral/20 ${isCompact ? 'min-w-[2.5rem] md:min-w-[3rem] py-1.5 px-1.5 md:py-2 md:px-2 shadow-sm' : 'min-w-[4.5rem] md:min-w-[5.5rem] py-4 px-3 rounded-xl shadow-soft'}`}
            >
              <span className={`font-display text-black tabular-nums ${isCompact ? 'text-lg md:text-xl' : 'text-3xl md:text-4xl'}`}>
                {pad(value)}
              </span>
              <span className={`font-sans text-black/80 ${isCompact ? 'text-[10px] md:text-xs mt-0.5' : 'text-sm mt-1'}`}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  )
}
