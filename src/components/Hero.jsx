/**
 * Hero – ראש הדף: תמונת ההזמנה.
 */

import headHeb from '../../assets/heb.png'
import headFr from '../../assets/fr.png'

const heroImages = { heb: headHeb, fr: headFr }

export default function Hero({ lang = 'heb' }) {
  const heroImage = heroImages[lang] ?? headHeb

  return (
    <header className="w-full min-h-[80vh] flex flex-col items-center justify-center px-2 py-4 md:px-4 bg-[#FFE9CF]">
      <div className="relative w-full max-w-4xl md:max-w-4xl lg:max-w-6xl flex-1 flex flex-col min-h-0 bg-[#FFE9CF] overflow-hidden">
        <img
          src={heroImage}
          alt="הזמנה לחתונה"
          className="block w-full h-full min-h-0 object-contain rounded-sm animate-fade-in flex-1 max-md:scale-110"
        />
      </div>
    </header>
  )
}
