/**
 * Script inline que se ejecuta ANTES de la hidratación
 * Previene el flash de tema incorrecto (FOUC)
 * Debe insertarse en el <head> del documento
 */

export function ThemeScript() {
  const themeScript = `
    (function() {
      try {
        const storageKey = 'brunomars-theme';
        const theme = localStorage.getItem(storageKey);

        if (theme === 'dark' || theme === 'light') {
          document.documentElement.classList.add(theme);
        } else {
          // System preference
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          document.documentElement.classList.add(systemTheme);
        }
      } catch (e) {
        // Fallback to light theme if localStorage is not available
        document.documentElement.classList.add('light');
      }
    })();
  `

  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeScript }}
      suppressHydrationWarning
    />
  )
}
