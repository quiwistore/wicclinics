#!/bin/bash
# Cierre WIC: correr cuando capturar.log diga FIN
set -e
cd "$(dirname "$0")/.."
python3 scripts/procesar.py
cd site && NODE_ENV=development npm run build 2>&1 | tail -1 && cd ..
python3 -c "
import re, json, glob
key = open([f for f in glob.glob('site/public/*.txt') if 'robots' not in f][0]).read().strip()
urls = re.findall(r'<loc>([^<]+)</loc>', open('dist/sitemap.xml').read())
base = {'host':'wicclinics.com','key':key,'keyLocation':f'https://wicclinics.com/{key}.txt'}
json.dump({**base, 'urlList': urls}, open('data/indexnow-payload.json','w'))
for i in range(0, len(urls), 10000):
    json.dump({**base, 'urlList': urls[i:i+10000]}, open(f'data/indexnow-lote{i//10000+1}.json','w'))
print('payload:', len(urls), 'URLs |', (len(urls)+9999)//10000, 'lotes')
"
git add -A && git commit -q -m "dataset WIC completo" && git push -q
echo "CIERRE OK — falta: Deploy Now en Runcloud + bash scripts/indexnow.sh"
