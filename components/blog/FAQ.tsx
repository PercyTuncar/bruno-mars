'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  items?: FAQItem[]
}

const defaultItems: FAQItem[] = [
  {
    question: '¿Los países ya están confirmados?',
    answer: 'Sí. Los 5 países están oficialmente confirmados: Chile, Perú, Argentina, Brasil y Colombia. Bruno Mars se presentará en estos países durante 2027.'
  },
  {
    question: '¿Cuándo se anunciarán las fechas exactas?',
    answer: 'Las fechas exactas aún no han sido anunciadas oficialmente. Las fechas mostradas en este artículo (Agosto-Diciembre 2027) son estimaciones probables basadas en la logística del tour. Cuando se confirmen las fechas oficiales, lo anunciaremos días antes aquí en brunomars.lat.'
  },
  {
    question: '¿Las fechas probables son confiables?',
    answer: 'Las fechas probables se basan en análisis de la industria, disponibilidad de venues y patrones de tours similares. Sin embargo, solo las fechas anunciadas oficialmente por las productoras deben considerarse definitivas. Te recomendamos visitar brunomars.lat regularmente para actualizaciones.'
  },
  {
    question: '¿Los precios y zonas ya están confirmados?',
    answer: 'No. Los precios y zonas mostrados son estimaciones basadas en tours previos de artistas similares en la región. Los precios oficiales se conocerán cuando cada ticketera local lance la venta. Cada país tendrá su estructura de precios en moneda local.'
  },
  {
    question: '¿Cómo me entero cuando se confirmen las fechas?',
    answer: 'Visita brunomars.lat regularmente. Cuando se confirmen las fechas oficiales, lo anunciaremos días antes del comunicado oficial para que puedas prepararte con tiempo. No enviaremos el tráfico a otros sitios - toda la información estará aquí primero.'
  },
  {
    question: '¿Dónde se comprarán las entradas?',
    answer: 'Las entradas se venderán a través de las ticketeras oficiales de cada país (Puntoticket en Chile, Teleticket en Perú, Ticketek en Argentina, Eventim en Brasil, TuBoleta en Colombia). Los canales exactos se anunciarán junto con las fechas.'
  },
  {
    question: '¿Habrá preventas exclusivas?',
    answer: 'Es muy probable que cada país tenga preventas exclusivas para clientes de bancos aliados o portadores de tarjetas específicas. Esta información se confirmará con el anuncio oficial de fechas. Las preventas típicamente ocurren 24-48 horas antes de la venta general.'
  },
  {
    question: '¿Qué debo hacer para estar preparado?',
    answer: 'Regístrate ahora en la ticketera oficial de tu país, valida tus datos de pago, y ahorra basándote en las estimaciones de precios. Lo más importante: visita brunomars.lat regularmente - te avisaremos días antes del anuncio oficial.'
  },
  {
    question: '¿Puedo comprar entradas para otro país?',
    answer: 'Sí, generalmente puedes comprar para cualquier país. Sin embargo, cada ticketera puede tener restricciones de pago (tarjetas locales) y las entradas suelen ser nominales. Verifica las políticas específicas cuando se abra la venta.'
  },
  {
    question: '¿Cuándo se actualizará esta información?',
    answer: 'Este artículo se actualizará inmediatamente cuando se anuncien las fechas oficiales. Marcador brunomars.lat en tus favoritos y visítanos regularmente para las últimas actualizaciones. Serás el primero en enterarte aquí.'
  }
]

export function FAQ({ items = defaultItems }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-4 my-12">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05, duration: 0.4 }}
          className="relative overflow-hidden rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-white/[0.02] border border-white/20 hover:border-purple-500/30 transition-all duration-300"
        >
          {/* Subtle gradient on hover */}
          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full filter blur-2xl" />
          </div>

          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="relative z-10 w-full px-6 py-5 flex items-center justify-between gap-4 text-left group"
            aria-expanded={openIndex === index}
          >
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors pr-4">
              {item.question}
            </h3>

            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="flex-shrink-0"
            >
              <ChevronDown className="w-5 h-5 text-primary" />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 pt-0">
                  <p className="text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}
