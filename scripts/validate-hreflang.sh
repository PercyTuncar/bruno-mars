#!/bin/bash

# Script de validación de Hreflang
# Verifica que todas las combinaciones de hreflang sean recíprocas y sin errores

echo "🌍 Validación de Hreflang - brunomars.lat"
echo "=========================================="
echo ""

BASE_URL="http://localhost:3000"

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Contadores
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Función para verificar hreflang en una URL
check_hreflang() {
  local url=$1
  local page_name=$2

  echo "Verificando: $page_name"
  echo "URL: $url"

  TOTAL_TESTS=$((TOTAL_TESTS + 1))

  # Obtener HTML
  html=$(curl -s "$url")

  # Extraer hreflang tags
  hreflangs=$(echo "$html" | grep -o '<link[^>]*hreflang[^>]*>' | wc -l)

  if [ "$hreflangs" -eq 0 ]; then
    echo -e "${RED}❌ FAIL: No hreflang tags found${NC}"
    FAILED_TESTS=$((FAILED_TESTS + 1))
    echo ""
    return 1
  fi

  echo "  ✓ Found $hreflangs hreflang tags"

  # Verificar x-default
  has_x_default=$(echo "$html" | grep -c 'hreflang="x-default"')
  if [ "$has_x_default" -eq 0 ]; then
    echo -e "${RED}  ❌ Missing x-default${NC}"
    FAILED_TESTS=$((FAILED_TESTS + 1))
    echo ""
    return 1
  fi
  echo "  ✓ Has x-default"

  # Verificar que tiene self-reference
  has_self=$(echo "$html" | grep -c "href=\"$url\"")
  if [ "$has_self" -eq 0 ]; then
    echo -e "${YELLOW}  ⚠️  Warning: No self-reference${NC}"
  else
    echo "  ✓ Has self-reference"
  fi

  echo -e "${GREEN}  ✅ PASS${NC}"
  PASSED_TESTS=$((PASSED_TESTS + 1))
  echo ""
}

# Función para verificar reciprocidad
check_reciprocity() {
  local url1=$1
  local url2=$2
  local name1=$3
  local name2=$4

  echo "Reciprocidad: $name1 ↔ $name2"

  TOTAL_TESTS=$((TOTAL_TESTS + 1))

  # Verificar que url1 enlaza a url2
  html1=$(curl -s "$url1")
  has_link=$(echo "$html1" | grep -c "href=\"$url2\"")

  if [ "$has_link" -eq 0 ]; then
    echo -e "${RED}❌ FAIL: $name1 no enlaza a $name2${NC}"
    FAILED_TESTS=$((FAILED_TESTS + 1))
    echo ""
    return 1
  fi

  # Verificar que url2 enlaza a url1
  html2=$(curl -s "$url2")
  has_back_link=$(echo "$html2" | grep -c "href=\"$url1\"")

  if [ "$has_back_link" -eq 0 ]; then
    echo -e "${RED}❌ FAIL: $name2 no enlaza a $name1${NC}"
    FAILED_TESTS=$((FAILED_TESTS + 1))
    echo ""
    return 1
  fi

  echo -e "${GREEN}✅ PASS: Recíproco${NC}"
  PASSED_TESTS=$((PASSED_TESTS + 1))
  echo ""
}

echo "=== Verificando Hreflang en Páginas de País ==="
echo ""

check_hreflang "$BASE_URL/peru" "Perú Landing"
check_hreflang "$BASE_URL/chile" "Chile Landing"
check_hreflang "$BASE_URL/argentina" "Argentina Landing"
check_hreflang "$BASE_URL/colombia" "Colombia Landing"
check_hreflang "$BASE_URL/brasil" "Brasil Landing"

echo "=== Verificando Hreflang en Páginas de Entradas ==="
echo ""

check_hreflang "$BASE_URL/peru/entradas" "Perú Entradas"
check_hreflang "$BASE_URL/chile/entradas" "Chile Entradas"
check_hreflang "$BASE_URL/argentina/entradas" "Argentina Entradas"
check_hreflang "$BASE_URL/colombia/entradas" "Colombia Entradas"
check_hreflang "$BASE_URL/brasil/ingressos" "Brasil Ingressos"

echo "=== Verificando Reciprocidad entre Países ==="
echo ""

check_reciprocity "$BASE_URL/peru" "$BASE_URL/chile" "Perú" "Chile"
check_reciprocity "$BASE_URL/peru" "$BASE_URL/argentina" "Perú" "Argentina"
check_reciprocity "$BASE_URL/chile" "$BASE_URL/brasil" "Chile" "Brasil"
check_reciprocity "$BASE_URL/argentina" "$BASE_URL/colombia" "Argentina" "Colombia"

echo "=========================================="
echo "RESUMEN"
echo "=========================================="
echo "Total tests: $TOTAL_TESTS"
echo -e "${GREEN}Passed: $PASSED_TESTS${NC}"
echo -e "${RED}Failed: $FAILED_TESTS${NC}"
echo ""

if [ "$FAILED_TESTS" -eq 0 ]; then
  echo -e "${GREEN}✅ Todos los tests pasaron!${NC}"
  exit 0
else
  echo -e "${RED}❌ Algunos tests fallaron. Revisar arriba.${NC}"
  exit 1
fi
