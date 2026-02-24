/**
 * יצירת קשר – תמיכה בעברית וצרפתית.
 */

import footerBg from '../../assets/footer.png'

const texts = {
  heb: {
    title: 'יצירת קשר',
    adam: 'אדם',
    sarah: 'שרה',
  },
  fr: {
    title: 'Nous contacter',
    adam: 'Adam',
    sarah: 'Sarah',
  },
}

export default function Contact({ lang = 'heb' }) {
  const t = texts[lang] || texts.heb

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center py-12 md:py-16 px-6 md:px-10 text-coral-dark bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${footerBg})` }}
    >
      <div className="max-w-lg mx-auto text-center">
        <h2 className="font-display text-2xl md:text-3xl text-coral-dark mb-6">
          {t.title}
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-10 font-sans">
          <a
            href="tel:+972525600493"
            className="text-coral-dark hover:text-coral transition-colors"
          >
            {t.adam}: 972 52-5600493+
          </a>
          <a
            href="tel:+972553161876"
            className="text-coral-dark hover:text-coral transition-colors"
          >
            {t.sarah}: 972 55-3161876+
          </a>
        </div>
      </div>
    </section>
  )
}
