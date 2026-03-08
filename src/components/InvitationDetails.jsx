/**
 * Section 2 – פרטי ההזמנה: הורים, שמות הזוג, תאריך, מקום, כפתורי ניווט.
 * תמיכה בעברית וצרפתית.
 */

import Countdown from './Countdown'

const WAZE_URL = 'https://waze.com/ul?q=meitav%2013%20tel-aviv'

const texts = {
  heb: {
    parentsBride: 'הורי הכלה',
    parentsGroom: 'הורי החתן',
    brideNames: "מר וגברת ג'יל וסופי אלוש",
    groomNames: 'מר וגברת נעים ומישל ציטיאט',
    intro: "בשמחה רבה ובהודיה אינסופית לה' אנו שמחים להזמינכם לחגוג עמנו את נישואי ילדינו",
    date: '25 במאי 2026',
    houppa: 'החופה תתקיים בשעה שש בדיוק',
    venue: 'EAST-TLV',
    afterCeremony: 'מיטב 13 תל אביב',
    shuttle1: 'תצא הסעה מאורגנת מירושלים.',
    shuttle2: 'עדכון לגבי נקודת המפגש ושעת היציאה יישלח אליכם בהמשך.',
    footer: 'בליבנו זיכרון סבינו וסבתותינו שאינם עמנו עוד, אך שמחתנו מהדהדת גם עבורם',
    ariaWaze: 'ווייז',
  },
  fr: {
    parentsBride: 'Les parents de la mariée',
    parentsGroom: 'Les parents du marié',
    brideNames: 'M. & Mme Gilles et Sophie Allouche',
    groomNames: 'M. & Mme Naïm et Michelle Tsityat',
    intro: "Ont la joie de vous inviter au mariage de",
    date: '25 mai 2026',
    houppa: 'La Houppa aura lieu à 18:00 précise',
    venue: 'EAST-TLV',
    afterCeremony: 'Meitav 13 Tel-Aviv',
    shuttle1: 'Une navette organisée sera mise à votre disposition au départ de Jérusalem.',
    shuttle2: 'Les détails concernant le lieu de rendez-vous et l\'heure de départ vous seront communiqués prochainement.',
    footer: 'Dans nos cœurs, le souvenir de nos grands-parents qui ne sont plus avec nous, mais notre joie résonne aussi pour eux.',
    ariaWaze: 'Waze',
  },
}

export default function InvitationDetails({ lang = 'heb' }) {
  const t = texts[lang] || texts.heb

  return (
    <section className="min-h-screen-dvh md:min-h-screen flex flex-col justify-center pt-16 md:pt-24 pb-8 md:pb-16 px-6 md:px-10 lg:px-16 bg-[#FFE9CF] text-black">
      <div className="w-full max-w-3xl mx-auto flex flex-row justify-between items-start gap-2 md:gap-12 mb-10 md:mb-14 min-w-0 overflow-hidden">
        <div className="flex flex-col text-center min-w-0 flex-1 overflow-hidden">
          <p className="text-[10px] md:text-xs uppercase tracking-widest text-black/70 mb-1 md:mb-2">{lang === 'fr' ? t.parentsBride : t.parentsGroom}</p>
          <p className="font-sans text-base md:text-xl lg:text-2xl break-words">{lang === 'fr' ? t.brideNames : t.groomNames}</p>
        </div>
        <div className="flex flex-col text-center min-w-0 flex-1 overflow-hidden">
          <p className="text-[10px] md:text-xs uppercase tracking-widest text-black/70 mb-1 md:mb-2">{lang === 'fr' ? t.parentsGroom : t.parentsBride}</p>
          <p className="font-sans text-base md:text-xl lg:text-2xl break-words">{lang === 'fr' ? t.groomNames : t.brideNames}</p>
        </div>
      </div>

      <div className="max-w-2xl lg:max-w-3xl mx-auto">
        <p className="text-center font-sans text-base md:text-lg lg:text-xl text-black/90 leading-relaxed mb-8 md:mb-12 max-w-xl lg:max-w-2xl mx-auto">
          {t.intro}
        </p>

        <div className="text-center mb-6 md:mb-10">
          <h2 className="font-opensans text-4xl md:text-5xl lg:text-7xl text-black tracking-wide">
            {lang === 'fr' ? 'Sarah & Adam' : 'שרה & אדם'}
          </h2>
        </div>

        <p className="text-center font-sans text-xl md:text-2xl lg:text-3xl text-black mb-2">
          {t.date}
        </p>
        <div className="flex justify-center mb-4">
          <Countdown embedded lang={lang} />
        </div>

        <p className="text-center font-sans text-base md:text-lg lg:text-xl text-black/90 mt-4 md:mt-6 mb-2">
          {t.houppa}
        </p>

        <p className="text-center font-sans text-lg md:text-xl lg:text-2xl text-black mb-1 mt-8 md:mt-12">
          {t.venue}
        </p>
        <p className="text-center font-sans text-base md:text-lg text-black/80 mb-4">
          {t.afterCeremony}
        </p>

        <div className="flex justify-center gap-4 mb-10">
          <a
            href={WAZE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.ariaWaze}
            className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-black/40 text-black hover:bg-black/10 transition-colors"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2L4.5 20.29l1.35.71L12 18l6.15 3 1.35-.71L12 2z" />
            </svg>
          </a>
        </div>

        <div className="text-center font-sans text-sm md:text-base text-black/80 max-w-md mx-auto leading-relaxed">
          <p>{t.shuttle1}</p>
          <p>{t.shuttle2}</p>
        </div>

        {lang === 'fr' && (
          <a
            href="https://israel-entry.piba.gov.il/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center font-sans text-sm text-black underline hover:opacity-70 transition-opacity mt-6"
          >
            Formulaire d'entrée en Israël
          </a>
        )}

        <p className="text-center font-sans text-sm text-black/70 mt-8 max-w-md mx-auto leading-relaxed">
          {t.footer}
        </p>
      </div>
    </section>
  )
}
