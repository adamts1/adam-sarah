/**
 * Hero – ראש הדף: תמונת ההזמנה, שעון ספירה לאחור בחלק התחתון של התמונה.
 */

import headHeb from '../../assets/head-heb.jpg'
import headFr from '../../assets/head-fr.png'
import Countdown from './Countdown'

const heroImages = { heb: headHeb, fr: headFr }

export default function Hero({ lang = 'heb', onLangChange }) {
  const heroImage = heroImages[lang] ?? headHeb

  return (
    <header className="w-full h-[80vh] flex flex-col items-stretch px-0 py-0 bg-[#FFE9C7]">
      {/* Image fills full section height; clock and flag overlay */}
      <div className="relative w-full flex-1 min-h-0 flex flex-col">
        <img
          src={heroImage}
          alt="הזמנה לחתונה"
          className="absolute inset-0 w-full h-full object-cover rounded-none"
        />
        {onLangChange && (
          <div className="absolute top-3 left-3 z-20">
            <button
              type="button"
              onClick={() => onLangChange(lang === 'heb' ? 'fr' : 'heb')}
              aria-label={lang === 'heb' ? 'Switch to Français' : 'Switch to עברית'}
              className="flex items-center justify-center text-2xl bg-transparent border-0 p-0 cursor-pointer"
            >
              {lang === 'heb' ? '🇫🇷' : '🇮🇱'}
            </button>
          </div>
        )}
        <div className="absolute left-1/2 bottom-4 transform -translate-x-1/2 w-full px-4 z-10">
          <Countdown embedded lang={lang} />
        </div>
      </div>
    </header>
  )
}
