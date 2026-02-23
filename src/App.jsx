/**
 * Wedding invitation – single page, RTL, smooth scroll.
 * Sections: Hero, InvitationDetails, ShabbatHatan, RSVP, Contact.
 */

import { useState } from 'react'
import Hero from './components/Hero'
import InvitationDetails from './components/InvitationDetails'
import ShabbatHatan from './components/ShabbatHatan'
import RSVP from './components/RSVP'
import Contact from './components/Contact'
import SectionDivider from './components/SectionDivider'

export default function App() {
  const [lang, setLang] = useState('heb')

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
      <ShabbatHatan lang={lang} />
      <SectionDivider />
      <RSVP lang={lang} />
      <SectionDivider />
      <Contact lang={lang} />
      </div>
    </div>
  )
}
