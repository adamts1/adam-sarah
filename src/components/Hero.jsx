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
    <header className="w-full min-h-[80vh] flex flex-col items-center justify-center px-4 py-4 bg-[#FFE9C7]">
      {/* single flag button will be rendered over the image */}
      <div className="relative w-full max-w-xl md:max-w-2xl lg:max-w-4xl flex-1 flex flex-col min-h-0 bg-[#FFE9C7] overflow-hidden">
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
        <img
          src={heroImage}
          alt="הזמנה לחתונה"
          className="block w-full h-full min-h-0 object-contain rounded-sm shadow-soft-lg animate-fade-in flex-1"
        />
        <div className="absolute left-1/2 bottom-4 transform -translate-x-1/2 w-full px-4 border-0">
          <Countdown embedded lang={lang} />
        </div>
      </div>
    </header>
  )
}
