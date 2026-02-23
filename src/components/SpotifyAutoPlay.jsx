/**
 * Spotify: נגן נטען רק אחרי לחיצה על "הפעל מוזיקה" – אז ה-autoplay עובד (מגבלת דפדפן).
 * RTL compatible.
 */

const EMBED_SRC = 'https://open.spotify.com/embed/track/0divWrAf5awgfmCGyWhZ3j?utm_source=generator&autoplay=1'

export default function SpotifyAutoPlay({ started = false, onStart }) {
  if (!started) {
    return (
      <button
        type="button"
        onClick={() => onStart?.()}
        className="fixed bottom-3 left-3 z-50 px-2.5 py-1.5 rounded-full bg-coral-dark/90 hover:bg-coral-dark text-white text-xs font-sans shadow transition-colors"
        aria-label="הפעל מוזיקה"
      >
        ▶
      </button>
    )
  }

  return (
    <div
      className="fixed bottom-3 left-3 z-40 w-[220px] h-[80px] opacity-95"
      style={{ direction: 'ltr' }}
    >
      <iframe
        src={EMBED_SRC}
        width="220"
        height="80"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify"
        className="rounded-lg w-full h-full"
      />
    </div>
  )
}
