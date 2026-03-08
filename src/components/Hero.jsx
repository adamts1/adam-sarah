/**
 * Hero – ראש הדף: תמונת ההזמנה.
 */

import headHeb from '../../assets/heb.png'
import headFr from '../../assets/fr.png'

const heroImages = { heb: headHeb, fr: headFr }

export default function Hero({ lang = 'heb' }) {
  const heroImage = heroImages[lang] ?? headHeb

  return (
    <header className="relative w-full min-h-[100dvh] max-md:min-h-[100dvh] md:min-h-[85vh] flex flex-col justify-center px-0 py-0 md:px-2 md:py-4 bg-[#FFE9CF]">
      <span className="absolute top-2 right-3 md:top-4 md:right-5 z-10 text-sm md:text-base font-bold text-gray-800" dir="rtl">בס״ד</span>
      <div className="relative w-full flex-1 flex flex-col min-h-0 min-w-0 bg-[#FFE9CF] max-md:px-0 md:max-w-[96vw] md:mx-auto">
        <img
          src={heroImage}
          alt="הזמנה לחתונה"
          className="block w-full h-full object-contain rounded-sm animate-fade-in flex-1 max-md:min-h-[92dvh] max-md:object-contain md:min-h-[70vh]"
        />
      </div>
    </header>
  )
}
