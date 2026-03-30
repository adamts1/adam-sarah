/**
 * Hero – ראש הדף: תמונת ההזמנה.
 */

import headHeb from '../../assets/heb.png'
import headFr from '../../assets/fr.png'

const heroImages = { heb: headHeb, fr: headFr }

export default function Hero({ lang = 'heb' }) {
  const heroImage = heroImages[lang] ?? headHeb

  return (
    <header className="relative w-full min-h-[100dvh] max-md:min-h-[100dvh] md:min-h-screen md:h-auto flex flex-col justify-center px-0 py-0 md:px-2 md:py-6 bg-[#FFE9CF]">
      <span className="absolute top-2 right-3 md:top-4 md:right-5 z-10 text-sm md:text-base font-bold text-gray-800" dir="rtl">בס״ד</span>
      <div className="relative w-full flex-1 md:flex-none flex flex-col min-h-0 min-w-0 bg-[#FFE9CF] max-md:px-0 md:max-w-3xl lg:max-w-3xl md:mx-auto md:w-full md:justify-center md:items-center md:py-4">
        <img
          src={heroImage}
          alt="הזמנה לחתונה"
          className="block w-full h-full object-contain rounded-sm animate-fade-in flex-1 max-md:min-h-[92dvh] max-md:object-contain md:h-auto md:w-[72%] md:max-w-full md:shrink-0 md:mx-auto md:flex-none md:max-h-none md:self-center"
        />
      </div>
    </header>
  )
}
