/**
 * Parshat Hashavua – פרשת שבוע
 * Centered title, paragraph, decorative divider above.
 */

const PLACEHOLDER_TEXT = 'פרשת השבוע שבה נישאים היא מקור לברכה ולמשמעות. אנו מזמינים אתכם לחשוב על הפרשה יחד עמנו ביום השמחה.'

export default function ParshatHashavua({ title = 'פרשת שבוע', content = PLACEHOLDER_TEXT }) {
  return (
    <section id="parshat-hashavua" className="py-16 md:py-24 px-4 bg-[#FFE9CF]">
      {/* Decorative divider */}
      <div className="max-w-2xl mx-auto mb-12 flex items-center justify-center gap-4">
        <span className="h-px flex-1 max-w-[80px] bg-coral/40" aria-hidden="true" />
        <span className="text-black/60 text-xl">◆</span>
        <span className="h-px flex-1 max-w-[80px] bg-coral/40" aria-hidden="true" />
      </div>

      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-4xl text-black mb-6">
          {title}
        </h2>
        <p className="font-sans text-lg text-black/85 leading-relaxed font-light">
          {content}
        </p>
      </div>
    </section>
  )
}
