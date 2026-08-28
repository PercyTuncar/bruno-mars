#!/bin/bash

# Script de validación de JSON-LD
# Extrae y valida datos estructurados de cada página

echo "🔍 Validación de JSON-LD - brunomars.lat"
echo "=========================================="
echo ""

BASE_URL="http://localhost:3000"
OUTPUT_DIR="./jsonld-validation"

# Crear directorio de output
mkdir -p $OUTPUT_DIR

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Páginas a validar con sus schemas esperados
declare -A PAGES=(
  ["Home"]="/$Organization,ItemList"
  ["Peru"]="/peru$MusicEvent,FAQPage"
  ["Chile"]="/chile$MusicEvent,FAQPage"
  ["Argentina"]="/argentina$MusicEvent,FAQPage"
  ["Colombia"]="/colombia$MusicEvent,FAQPage"
  ["Brasil"]="/brasil$MusicEvent,FAQPage"
  ["Peru-Entradas"]="/peru/entradas$MusicEvent,Offer"
  ["Chile-Entradas"]="/chile/entradas$MusicEvent,Offer"
  ["Argentina-Entradas"]="/argentina/entradas$MusicEvent,Offer"
  ["Colombia-Entradas"]="/colombia/entradas$MusicEvent,Offer"
  ["Brasil-Entradas"]="/brasil/ingressos$MusicEvent,Offer"
  ["Blog"]="/blog$Blog,ItemList"
  ["Post-1"]="/blog/tour-announcement$BlogPosting"
  ["Post-2"]="/blog/venues-guide$BlogPosting"
  ["Post-3"]="/blog/faq-complete$BlogPosting"
)

TOTAL=0
PASSED=0
FAILED=0

# Función para extraer JSON-LD de una página
extract_jsonld() {
  local url=$1
  local name=$2
  local expected_schemas=$3

  echo "Extrayendo JSON-LD de: $name"
  echo "URL: $url"

  TOTAL=$((TOTAL + 1))

  # Obtener HTML y extraer scripts JSON-LD
  html=$(curl -s "$url")

  # Contar scripts JSON-LD
  jsonld_count=$(echo "$html" | grep -c 'type="application/ld+json"')

  if [ "$jsonld_count" -eq 0 ]; then
    echo -e "${RED}❌ FAIL: No JSON-LD found${NC}"
    FAILED=$((FAILED + 1))
    echo ""
    return 1
  fi

  echo "  ✓ Found $jsonld_count JSON-LD script(s)"

  # Guardar JSON-LD en archivo
  output_file="$OUTPUT_DIR/${name}.json"
  echo "$html" | grep -A 50 'type="application/ld+json"' | grep -v '<script' | grep -v '</script>' > "$output_file"

  # Verificar que es JSON válido
  if command -v jq &> /dev/null; then
    if jq empty "$output_file" 2>/dev/null; then
      echo "  ✓ Valid JSON"
    else
      echo -e "${RED}  ❌ Invalid JSON${NC}"
      FAILED=$((FAILED + 1))
      echo ""
      return 1
    fi

    # Verificar @type esperado
    types=$(jq -r '."@type" // ."@graph"[]."@type"' "$output_file" 2>/dev/null | paste -sd "," -)
    echo "  ✓ @type found: $types"

    # Comparar con esperado
    IFS=',' read -ra EXPECTED <<< "$expected_schemas"
    for expected in "${EXPECTED[@]}"; do
      if echo "$types" | grep -q "$expected"; then
        echo "  ✓ Has expected schema: $expected"
      else
        echo -e "${YELLOW}  ⚠️  Missing expected schema: $expected${NC}"
      fi
    done
  else
    echo "  ⚠️  jq not installed, skipping validation"
  fi

  echo -e "${GREEN}  ✅ PASS: JSON-LD extracted${NC}"
  echo "  📄 Saved to: $output_file"
  PASSED=$((PASSED + 1))
  echo ""
}

echo "=== Extrayendo y Validando JSON-LD ==="
echo ""

for page in "${!PAGES[@]}"; do
  IFS='$' read -r url schemas <<< "${PAGES[$page]}"
  extract_jsonld "${BASE_URL}${url}" "$page" "$schemas"
done

echo "=========================================="
echo "RESUMEN"
echo "=========================================="
echo "Total páginas: $TOTAL"
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"
echo ""
echo "JSON-LD files saved in: $OUTPUT_DIR"
echo ""

if [ "$FAILED" -eq 0 ]; then
  echo -e "${GREEN}✅ Todos los JSON-LD extraídos correctamente!${NC}"
  echo ""
  echo "Próximo paso:"
  echo "1. Revisar archivos en $OUTPUT_DIR"
  echo "2. Validar en: https://search.google.com/test/rich-results"
  echo "3. Validar en: https://validator.schema.org"
  exit 0
else
  echo -e "${RED}❌ Algunos JSON-LD fallaron. Revisar arriba.${NC}"
  exit 1
fi
