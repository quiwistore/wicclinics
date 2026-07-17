#!/bin/bash
# IndexNow wicclinics.com — lotes de max 10.000 URLs
cd "$(dirname "$0")/.."
KEY=$(python3 -c "import json; print(json.load(open('data/indexnow-payload.json'))['key'])")
CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://wicclinics.com/$KEY.txt")
echo "clave live: $CODE"
if [ "$CODE" != "200" ]; then echo "ABORTADO: clave no live"; exit 1; fi
for L in data/indexnow-lote*.json; do
  curl -s -X POST "https://api.indexnow.org/indexnow" -H "Content-Type: application/json; charset=utf-8" --data @"$L" -w "\n$(basename $L): HTTP %{http_code}\n"
  sleep 2
done
