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
      className="min-h-screen-dvh md:min-h-screen bg-[#FFE9CF]"
      dir={isFr ? 'ltr' : 'rtl'}
      lang={isFr ? 'fr' : 'he'}
    >
      {/* Language button: fixed, outside header */}
      <div className="fixed z-[9999] safe-area-inset">
        <button
          type="button"
          onClick={() => setLang(lang === 'heb' ? 'fr' : 'heb')}
          aria-label={lang === 'heb' ? 'Switch to Français' : 'Switch to עברית'}
          className="flex items-center justify-center text-2xl bg-transparent border-0 p-0 cursor-pointer"
        >
          {lang === 'heb' ? '🇫🇷' : '🇮🇱'}
        </button>
      </div>
      <div key={lang} className="animate-page-enter opacity-0">
        <Hero lang={lang} />
      <SectionDivider />
      <InvitationDetails lang={lang} />
      <SectionDivider />
      <RSVP lang={lang} />
      <div
        className="w-full h-[48px] md:h-[64px]"
        style={{
          background: 'radial-gradient(ellipse 50% 100% at 50% 100%, #E8853A 99%, transparent 100%)',
          backgroundSize: '95px 100%',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'center',
        }}
        aria-hidden="true"
      />
      </div>
    </div>
  )
}
