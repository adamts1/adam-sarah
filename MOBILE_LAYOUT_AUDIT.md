# Mobile Layout Audit

## Issues Found & Fixes Applied

### 1. **Horizontal overflow – no containment** ✅ FIXED
**Element:** `html`, `body`, `#root`  
**Problem:** No `overflow-x: hidden` – any element exceeding viewport width causes horizontal scroll.  
**Fix:** Added `overflow-x: hidden` to html/body, `overflow-x: clip` to #root in `index.css`.

### 2. **`min-h-screen` uses 100vh (not 100dvh)** ✅ FIXED
**Elements:** App root, InvitationDetails  
**Problem:** 100vh on mobile includes area behind URL bar → layout shift when browser chrome shows/hides.  
**Fix:** Added `min-h-screen-dvh` (100dvh) utility in Tailwind; App and InvitationDetails use `min-h-screen-dvh md:min-h-screen` so mobile gets dvh, desktop gets vh.

### 3. **Long text overflow** ✅ FIXED
**Elements:** InvitationDetails parent names  
**Problem:** Long names like "Monsieur et Madame Naïm et Michelle Tsityat" can overflow.  
**Fix:** Added `min-w-0 flex-1 overflow-hidden break-words` to parent columns so text wraps instead of overflowing.

### 4. **Fixed elements and safe-area** ✅ FIXED
**Element:** Language button  
**Problem:** On notched devices, fixed elements can sit under system UI.  
**Fix:** Added `viewport-fit=cover` to index.html; `.safe-area-inset` class for language button using `env(safe-area-inset-*)`.

### 5. **RSVP overflow**
**Element:** RSVP section with background image  
**Fix:** Added `overflow-hidden` to RSVP sections to contain any overflow.

### 6. **Margin collapsing**
No explicit fix – flex layout and padding generally prevent issues. Monitor if gaps appear.
