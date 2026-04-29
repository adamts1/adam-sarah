/**
 * Wedding invitation – single page, RTL, smooth scroll.
 * URLs: / (heb), /fr (French).
 */

import { useLocation, useNavigate } from 'react-router-dom'
import Hero from './components/Hero'
import InvitationDetails from './components/InvitationDetails'
import RSVP from './components/RSVP'
import SectionDivider from './components/SectionDivider'

export default function App() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const lang = pathname === '/fr' ? 'fr' : 'heb'

  const setLang = (nextLang) => {
    navigate(nextLang === 'fr' ? '/fr' : '/')
  }

  const isFr = lang === 'fr'
  return (
    <div
      className="h-[100dvh] w-full bg-[#FFE9CF] overflow-hidden flex flex-col"
      dir={isFr ? 'ltr' : 'rtl'}
      lang={isFr ? 'fr' : 'he'}
    >
      <header className="sticky top-0 z-50 relative safe-area-padding bg-[#FFE9CF] min-h-12">
        <div className="absolute safe-area-inset z-[60]">
          <button
            type="button"
            onClick={() => setLang(lang === 'heb' ? 'fr' : 'heb')}
            aria-label={lang === 'heb' ? 'Switch to Français' : 'Switch to עברית'}
            className="flex items-center justify-center text-2xl bg-transparent border-0 p-0 cursor-pointer select-none"
          >
            {lang === 'heb' ? '🇫🇷' : '🇮🇱'}
          </button>
        </div>
      </header>

      <main className="flex-1 app-scroll ">
        <div key={lang} className="animate-page-enter opacity-0">
          <Hero lang={lang} />
          <SectionDivider />
          <InvitationDetails lang={lang} />
          <SectionDivider />
          <RSVP lang={lang} />
          <div
            className="relative w-full h-[48px] md:h-[64px]"
            style={{
              background:
                'radial-gradient(57% 116% at 50% 116%, rgb(232, 133, 58) 98%, transparent 99%) center center / 95px 103% repeat-x',
            }}
          >
            <p className="absolute inset-0 flex items-end justify-center pb-0 text-[10px] font-bold text-gray-700">
              &copy; TSITYAT - AI Agency
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
