/**
 * ספירה לאחור – ימים, שעות, דקות, שניות עד התאריך המבוקש.
 * תאריך יעד: 15 במאי 2026
 */

import { useState, useEffect } from 'react'

const TARGET_DATE = new Date(2026, 4, 15, 17, 0, 0) // 15/5/2026 17:00

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

export default function Countdown({ embedded = false }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft)

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(t)
  }, [])

  const Wrapper = embedded ? 'div' : 'section'
  const wrapperClass = embedded ? 'w-full max-w-2xl mx-auto' : 'py-12 md:py-16 px-4 bg-peach'

  if (timeLeft.done) {
    return (
      <Wrapper className={wrapperClass}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-display text-2xl text-coral-dark">הגיע היום! 🎉</p>
        </div>
      </Wrapper>
    )
  }

  const units = [
    { value: timeLeft.days, label: 'ימים' },
    { value: timeLeft.hours, label: 'שעות' },
    { value: timeLeft.minutes, label: 'דקות' },
    { value: timeLeft.seconds, label: 'שניות' },
  ]

  const isCompact = embedded
  return (
    <Wrapper className={wrapperClass}>
      <div className={isCompact ? 'w-full max-w-full' : 'max-w-2xl mx-auto'}>
        <div className={`flex flex-wrap justify-center ${isCompact ? 'gap-1.5 md:gap-2' : 'gap-4 md:gap-6'}`}>
          {units.map(({ value, label }) => (
            <div
              key={label}
              className={`flex flex-col items-center rounded-lg bg-peach-light/90 border border-coral/20 ${isCompact ? 'min-w-[2.5rem] md:min-w-[3rem] py-1.5 px-1.5 md:py-2 md:px-2 shadow-sm' : 'min-w-[4.5rem] md:min-w-[5.5rem] py-4 px-3 rounded-xl shadow-soft'}`}
            >
              <span className={`font-display text-coral tabular-nums ${isCompact ? 'text-lg md:text-xl' : 'text-3xl md:text-4xl'}`}>
                {pad(value)}
              </span>
              <span className={`font-sans text-coral-dark/80 ${isCompact ? 'text-[10px] md:text-xs mt-0.5' : 'text-sm mt-1'}`}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  )
}
