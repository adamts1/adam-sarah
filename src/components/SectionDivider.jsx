/**
 * מחיצה עדינה בין סעיפים – קו אלגנטי עם נקודה במרכז.
 * minimalOnMobile: מסתיר את הקווים במובייל (למניעת קו ליד השעון).
 */

export default function SectionDivider({ minimalOnMobile }) {
  const lineClass = minimalOnMobile ? 'hidden md:block flex-1 max-w-[120px] md:max-w-[180px] h-px bg-black' : 'flex-1 max-w-[120px] md:max-w-[180px] h-px bg-black'
  return (
    <div className="flex items-center justify-center gap-3 py-6 md:py-8 px-4" aria-hidden="true">
      <span className={lineClass} />
      <span className="w-1 h-1 rounded-full bg-black" />
      <span className={lineClass} />
    </div>
  )
}
