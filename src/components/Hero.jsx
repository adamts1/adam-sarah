/**
 * Hero – ראש הדף: תמונת ההזמנה.
 */

import headHeb from '../../assets/heb.png'
import headFr from '../../assets/fr.png'

const heroImages = { heb: headHeb, fr: headFr }

export default function Hero({ lang = 'heb' }) {
  const heroImage = heroImages[lang] ?? headHeb

  return (
    <header className="w-full min-h-[80vh] flex flex-col items-center justify-center px-4 py-4 bg-[#FFE9CF]">
      <div className="relative w-full max-w-xl md:max-w-2xl lg:max-w-4xl flex-1 flex flex-col min-h-0 bg-[#FFE9CF] overflow-hidden">
        <img
          src={heroImage}
          alt="הזמנה לחתונה"
          className="block w-full h-full min-h-0 object-contain rounded-sm shadow-soft-lg animate-fade-in flex-1"
        />
      </div>
    </header>
  )
}
