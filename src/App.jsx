/**
 * Wedding invitation – single page, RTL, smooth scroll.
 * URLs: / (heb), /fr (French).
 */

import { useLocation, useNavigate } from 'react-router-dom'
import Hero from './components/Hero'
import InvitationDetails from './components/InvitationDetails'
import RSVP from './components/RSVP'
import Contact from './components/Contact'
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
      className="min-h-screen bg-peach"
      dir={isFr ? 'ltr' : 'rtl'}
      lang={isFr ? 'fr' : 'he'}
    >
      <div className="animate-page-enter opacity-0">
        <Hero lang={lang} onLangChange={setLang} />
      <SectionDivider />
      <InvitationDetails lang={lang} />
      <SectionDivider />
      <RSVP lang={lang} />
      <SectionDivider />
      <Contact lang={lang} />
      </div>
    </div>
  )
}
