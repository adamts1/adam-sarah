/**
 * Spotify background music: נשלט מהאבא (אחרי סגירת מודל) או כפתור "הפעל מוזיקה".
 * RTL-safe.
 */

import { useState } from 'react'

const EMBED_SRC = 'https://open.spotify.com/embed/track/0divWrAf5awgfmCGyWhZ3j?utm_source=generator&autoplay=1'

export default function SpotifyBackgroundMusic({ isPlaying: controlledPlaying, onStop, onStart }) {
  const [internalPlaying, setInternalPlaying] = useState(true)
  const isControlled = controlledPlaying !== undefined
  const isPlaying = isControlled ? controlledPlaying : internalPlaying

  const handleStop = () => {
    if (isControlled) onStop?.()
    else setInternalPlaying(false)
  }

  const handlePlay = () => {
    if (isControlled) onStart?.()
    else setInternalPlaying(true)
  }

  return (
    <>
      {/* כפתור הפעלת מוזיקה – מופיע בכניסה לאתר, עם אנימציה */}
      {!isPlaying && (
        <button
          type="button"
          onClick={handlePlay}
          className="fixed bottom-4 start-4 z-50 px-5 py-2.5 rounded-full bg-coral-dark/90 hover:bg-coral-dark text-white text-sm font-sans shadow-lg transition-all duration-300 hover:scale-105 opacity-0 animate-music-btn-enter"
          aria-label="הפעל מוזיקה"
        >
          ▶ הפעל מוזיקה
        </button>
      )}

      {/* Spotify bar + stop: show when playing */}
      {isPlaying && (
        <div
          className="fixed bottom-0 inset-x-0 z-40 h-[88px] flex items-center justify-end gap-2 px-2 py-1 bg-gradient-to-t from-peach/95 to-transparent pointer-events-none"
          style={{ direction: 'ltr' }}
        >
          <div className="pointer-events-auto flex-1 min-w-0 max-w-[320px] h-[80px] mx-auto opacity-85">
            <iframe
              src={EMBED_SRC}
              width="100%"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify"
              className="roundeds-sm"
            />
          </div>
          <button
            type="button"
            onClick={handleStop}
            className="pointer-events-auto shrink-0 w-9 h-9 rounded-full bg-coral-dark/90 hover:bg-coral-dark text-white flex items-center justify-center text-lg transition-colors me-2"
            aria-label="עצור מוזיקה"
          >
            &#10005;
          </button>
        </div>
      )}
    </>
  )
}
