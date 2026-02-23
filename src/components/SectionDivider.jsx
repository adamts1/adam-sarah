/**
 * מחיצה עדינה בין סעיפים – קו אלגנטי עם נקודה עדינה במרכז.
 */

export default function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-6 md:py-8 px-4" aria-hidden="true">
      <span className="flex-1 max-w-[120px] md:max-w-[180px] h-px bg-coral-dark/20" />
      <span className="w-1 h-1 rounded-full bg-coral-dark/30" />
      <span className="flex-1 max-w-[120px] md:max-w-[180px] h-px bg-coral-dark/20" />
    </div>
  )
}
