/**
 * Section 3 – שבת חתן. תמיכה בעברית וצרפתית.
 */

const texts = {
  heb: {
    title: 'שבת חתן',
    date: '28 במאי 2026',
    times: 'יום שישי – כניסת שבת 18:00 · יום שבת – יציאת שבת 19:00',
    venue: 'מלון בית קטן בבקעה',
    parasha: 'פרשת אמור',
    parashaEn: 'PARASHAT EMOR',
  },
  fr: {
    title: 'Shabbat du marié',
    date: '28 mai 2026',
    times: 'Vendredi – Entrée du Shabbat 18h00 · Samedi – Sortie du Shabbat 19h00',
    venue: 'Hôtel Beit Katan, Bekaa',
    parasha: 'Parachat Emor',
    parashaEn: 'PARASHAT EMOR',
  },
}

export default function ShabbatHatan({ lang = 'heb' }) {
  const t = texts[lang] || texts.heb

  return (
    <section className="py-12 md:py-20 px-6 md:px-10 lg:px-16 bg-[#FFE9CF] text-black">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="font-sans text-xl md:text-2xl font-medium tracking-wide mb-3">
          {t.title}
        </h2>

        <p className="font-display text-3xl md:text-4xl text-black tracking-wide mb-10">
          {lang === 'fr' ? 'Sarah & Adam' : 'שרה & אדם'}
        </p>

        <p className="font-sans text-xl text-black mb-2">
          {t.date}
        </p>
        <p className="font-sans text-black/90 mb-6">
          {t.times}
        </p>

        <p className="font-sans text-lg md:text-xl text-black mb-8">
          {t.venue}
        </p>

        <div className="font-sans text-sm text-black/80">
          <p>{t.parasha}</p>
          <p className="mt-0.5 text-black/70">{t.parashaEn}</p>
        </div>
      </div>
    </section>
  )
}
