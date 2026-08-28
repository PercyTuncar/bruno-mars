/**
 * Formatea precios según la moneda y locale del país
 * Usa Intl.NumberFormat para formateo nativo y correcto por locale
 */
export function formatCurrency(
  amount: number,
  currency: 'PEN' | 'CLP' | 'ARS' | 'COP' | 'BRL',
  locale?: string
): string {
  // Map currency to locale if not provided
  const localeMap: Record<string, string> = {
    PEN: 'es-PE',
    CLP: 'es-CL',
    ARS: 'es-AR',
    COP: 'es-CO',
    BRL: 'pt-BR',
  }

  const targetLocale = locale || localeMap[currency] || 'es-PE'

  return new Intl.NumberFormat(targetLocale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Formatea solo el número sin símbolo de moneda (para casos especiales)
 */
export function formatPrice(
  amount: number,
  locale: string = 'es-PE'
): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}
