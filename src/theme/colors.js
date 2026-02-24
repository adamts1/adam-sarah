/**
 * Wedding invitation color palette.
 * Change these values to update colors across the entire app.
 * Tailwind uses these in tailwind.config.js; use class names like bg-peach, text-coral-dark, etc.
 */

export const palette = {
  // Backgrounds
  peach: {
    DEFAULT: '#FFE9CF',
    light: '#FBF0E8',
    dark: '#EDD5C4',
  },
  imageBg: '#FFE9CF',

  // Accent / coral
  coral: {
    DEFAULT: '#E7624F',
    light: '#EE8A7C',
    dark: '#D04A38',
  },
}

/**
 * Tailwind theme colors object (spread into theme.extend.colors).
 */
export const tailwindColors = {
  peach: {
    DEFAULT: palette.peach.DEFAULT,
    light: palette.peach.light,
    dark: palette.peach.dark,
  },
  'image-bg': palette.imageBg,
  coral: {
    DEFAULT: palette.coral.DEFAULT,
    light: palette.coral.light,
    dark: palette.coral.dark,
  },
}

export default palette
