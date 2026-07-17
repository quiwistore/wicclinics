#!/bin/bash
# Cierre WIC: correr cuando capturar.log diga FIN
set -e
cd "$(dirname "$0")/.."
echo "=== dataset final:"
python3 scripts/procesar.py
echo "=== clave IndexNow:"
KEY=$(uuidgen | tr -d '-' | tr 'A-Z' 'a-z')
echo -n "$KEY" > site/public/$KEY.txt
echo "clave: $KEY"
echo "=== build:"
cd site && NODE_ENV=development npm run build 2>&1 | tail -1 && cd ..
echo "=== payload:"
python3 -c "
import re, json, glob
key = open([f for f in glob.glob('site/public/*.txt') if 'robots' not in f][0]).read().strip()
urls = re.findall(r'<loc>([^<]+)</loc>', open('dist/sitemap.xml').read())
json.dump({'host':'wicclinics.com','key':key,'keyLocation':f'https://wicclinics.com/{key}.txt','urlList':urls}, open('data/indexnow-payload.json','w'))
print(len(urls), 'URLs')
"
cat > scripts/indexnow.sh << 'SH2'
#!/bin/bash
cd "$(dirname "$0")/.."
KEY=$(python3 -c "import json; print(json.load(open('data/indexnow-payload.json'))['key'])")
CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://wicclinics.com/$KEY.txt")
echo "clave live: $CODE"
if [ "$CODE" != "200" ]; then echo "ABORTADO: clave no live"; exit 1; fi
curl -s -X POST "https://api.indexnow.org/indexnow" -H "Content-Type: application/json; charset=utf-8" --data @data/indexnow-payload.json -w "\nIndexNow: HTTP %{http_code}\n"
SH2
chmod +x scripts/indexnow.sh
echo "CIERRE_LISTO — falta: git init/commit/push + DNS/Runcloud de Agus"
