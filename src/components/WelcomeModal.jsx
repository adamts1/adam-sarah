/**
 * מודל ברוך הבא בכניסה לאתר – אישור הגעה לחתונה.
 * כפתור X וכפתור אישור – בלחיצה על אחד מהם נסגר המודל ומתאפשרת הפעלת המוזיקה.
 */

const texts = {
  heb: {
    title: 'אישור הגעה לחתונה',
    subtitle: 'שרה ואדם',
    confirm: 'אישור',
  },
  fr: {
    title: 'Confirmation de présence',
    subtitle: 'Sarah et Adam',
    confirm: 'Confirmer',
  },
}

export default function WelcomeModal({ lang = 'heb', onClose }) {
  const t = texts[lang] || texts.heb

  const handleClose = () => {
    onClose?.()
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-coral-dark/20 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-modal-title"
    >
      <div className="relative w-full max-w-md rounded-2xl bg-peach-light shadow-soft-lg border border-coral/20 p-8 text-coral-dark">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 end-4 w-10 h-10 rounded-full flex items-center justify-center text-coral-dark/70 hover:bg-coral/15 hover:text-coral-dark transition-colors"
          aria-label="סגור"
        >
          &#10005;
        </button>

        <div className="text-center pt-2">
          <h2
            id="welcome-modal-title"
            className="font-display text-2xl md:text-3xl text-coral-dark mb-1"
          >
            {t.title}
          </h2>
          <p className="font-sans text-lg text-coral-dark/90 mb-8">
            {t.subtitle}
          </p>

          <button
            type="button"
            onClick={handleClose}
            className="px-8 py-3 rounded-xl bg-coral hover:bg-coral-dark text-white font-sans font-medium shadow-soft transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-0.5"
          >
            {t.confirm}
          </button>
        </div>
      </div>
    </div>
  )
}
