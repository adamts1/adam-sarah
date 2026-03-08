/**
 * מחיצה עדינה בין סעיפים – קו אלגנטי עם נקודה במרכז.
 * minimalOnMobile: מסתיר את הקווים במובייל (למניעת קו ליד השעון).
 */

export default function SectionDivider({ minimalOnMobile }) {
  const lineClass = minimalOnMobile ? 'hidden md:block flex-1 max-w-[200px] md:max-w-[300px] h-px bg-black' : 'flex-1 max-w-[200px] md:max-w-[300px] h-px bg-black'
  return (
    <div className="flex items-center justify-center gap-3 py-6 md:py-8 px-4" aria-hidden="true">
      <span className={lineClass} />
    </div>
  )
}
