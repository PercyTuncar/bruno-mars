'use client'

/**
 * Formulario de datos del comprador
 * Validaciones básicas sin integración de pago real
 */

import { useState } from 'react'
import { User, Mail, Phone, CreditCard } from 'lucide-react'

interface BuyerFormProps {
  language: 'es' | 'pt'
}

export function BuyerForm({ language }: BuyerFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    documentNumber: '',
  })

  const labels = language === 'pt' ? {
    fullName: 'Nome Completo',
    email: 'E-mail',
    phone: 'Telefone',
    documentNumber: 'CPF/RG',
    fullNamePlaceholder: 'Seu nome completo',
    emailPlaceholder: 'seu@email.com',
    phonePlaceholder: '+55 11 99999-9999',
    documentPlaceholder: '000.000.000-00',
  } : {
    fullName: 'Nombre Completo',
    email: 'Correo Electrónico',
    phone: 'Teléfono',
    documentNumber: 'Documento de Identidad',
    fullNamePlaceholder: 'Tu nombre completo',
    emailPlaceholder: 'tu@email.com',
    phonePlaceholder: '+51 999 999 999',
    documentPlaceholder: '12345678',
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="matte p-6 rounded-lg">
      <form className="space-y-6">
        {/* Nombre completo */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium mb-2">
            {labels.fullName} <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder={labels.fullNamePlaceholder}
              required
              className="w-full pl-10 pr-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            {labels.email} <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={labels.emailPlaceholder}
              required
              className="w-full pl-10 pr-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {language === 'pt'
              ? 'Seus ingressos serão enviados para este e-mail'
              : 'Tus entradas serán enviadas a este email'}
          </p>
        </div>

        {/* Teléfono */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            {labels.phone} <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={labels.phonePlaceholder}
              required
              className="w-full pl-10 pr-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </div>
        </div>

        {/* Documento */}
        <div>
          <label htmlFor="documentNumber" className="block text-sm font-medium mb-2">
            {labels.documentNumber} <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              id="documentNumber"
              name="documentNumber"
              value={formData.documentNumber}
              onChange={handleChange}
              placeholder={labels.documentPlaceholder}
              required
              className="w-full pl-10 pr-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {language === 'pt'
              ? 'Necessário para validar a entrada no evento'
              : 'Necesario para validar la entrada en el evento'}
          </p>
        </div>
      </form>
    </div>
  )
}
