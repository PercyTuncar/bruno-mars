'use client'

/**
 * Botón de pago deshabilitado con tooltip explicativo
 * Fase 1: botón bloqueado, preparado para integración futura
 */

import { Lock } from 'lucide-react'
import { useState } from 'react'

interface PayButtonDisabledProps {
  language: 'es' | 'pt'
}

export function PayButtonDisabled({ language }: PayButtonDisabledProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  const buttonLabel = language === 'pt' ? 'Pagar' : 'Pagar'
  const tooltipText = language === 'pt'
    ? 'Os pagamentos serão habilitados em breve. Estamos trabalhando na integração com a plataforma de pagamento.'
    : 'Los pagos se habilitarán próximamente. Estamos trabajando en la integración con la plataforma de pago.'

  return (
    <div className="relative">
      <button
        disabled
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-full px-6 py-4 bg-muted text-muted-foreground rounded-md font-medium cursor-not-allowed flex items-center justify-center gap-2 relative"
        aria-label={tooltipText}
      >
        <Lock className="h-5 w-5" />
        {buttonLabel}
      </button>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-3 bg-popover text-popover-foreground rounded-md shadow-lg text-sm max-w-xs z-10">
          <p className="text-center">{tooltipText}</p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
            <div className="border-8 border-transparent border-t-popover"></div>
          </div>
        </div>
      )}

      {/* Mensaje adicional */}
      <p className="text-xs text-center text-muted-foreground mt-3">
        {language === 'pt'
          ? '🔜 Próximamente: Integración con pasarelas de pago'
          : '🔜 Próximamente: Integración con pasarelas de pago'}
      </p>
    </div>
  )
}
