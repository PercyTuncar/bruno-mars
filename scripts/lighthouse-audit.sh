#!/bin/bash

# Script de auditoría Lighthouse para todas las páginas críticas
# Uso: ./scripts/lighthouse-audit.sh

echo "🚀 Iniciando auditoría Lighthouse de brunomars.lat"
echo "=================================================="
echo ""

# Configuración
BASE_URL="http://localhost:3000"
OUTPUT_DIR="./lighthouse-reports"
CONFIG_PATH="./lighthouse-config.json"

# Crear directorio de reportes
mkdir -p $OUTPUT_DIR

# Array de páginas a auditar
declare -a PAGES=(
  "/"
  "/peru"
  "/chile"
  "/argentina"
  "/colombia"
  "/brasil"
  "/peru/entradas"
  "/chile/entradas"
  "/argentina/entradas"
  "/colombia/entradas"
  "/brasil/ingressos"
  "/peru/entradas/checkout"
  "/blog"
  "/blog/tour-announcement"
  "/404"
)

# Función para sanitizar nombres de archivo
sanitize_filename() {
  echo "$1" | sed 's/\//-/g' | sed 's/^-//'
}

# Contador
TOTAL=${#PAGES[@]}
CURRENT=0

# Auditar cada página
for page in "${PAGES[@]}"; do
  CURRENT=$((CURRENT + 1))
  FILENAME=$(sanitize_filename "$page")

  if [ "$FILENAME" == "" ]; then
    FILENAME="home"
  fi

  echo "[$CURRENT/$TOTAL] Auditando: $page"

  lighthouse "${BASE_URL}${page}" \
    --config-path=$CONFIG_PATH \
    --output=html \
    --output=json \
    --output-path="${OUTPUT_DIR}/${FILENAME}" \
    --quiet \
    --chrome-flags="--headless"

  echo "  ✓ Reporte guardado: ${OUTPUT_DIR}/${FILENAME}.html"
  echo ""
done

echo "=================================================="
echo "✅ Auditoría completada!"
echo "📊 Reportes disponibles en: $OUTPUT_DIR"
echo ""
echo "Para ver los reportes:"
echo "  open $OUTPUT_DIR/home.html"
echo ""
