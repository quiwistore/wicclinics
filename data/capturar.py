#!/usr/bin/env python3
import json, re, subprocess, time, os, html as H

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
CFG = 'aa80b5be5c6eabecf87c52e442ae7f2e7d979b3599dfd9e1de90cd9d6b064bfe%7B%22id%22%3A%22component-flefbi%22%2C%22siteId%22%3A1%2C%22template%22%3A%2202_components%5C%2F_clinic-finder%22%2C%22variables%22%3A%7B%22siteIsSpanish%22%3A%22%22%7D%7D'

zips = json.load(open('zips-objetivo.json'))
hechos = set()
clinicas = {}
if os.path.exists('capturadas.json'):
    d = json.load(open('capturadas.json'))
    hechos = set(d['zips'])
    clinicas = {tuple(k.split('||')): v for k, v in d['clinicas'].items()}

def guardar():
    json.dump({'zips': sorted(hechos), 'clinicas': {'||'.join(k): v for k, v in clinicas.items()}},
              open('capturadas.json', 'w'), ensure_ascii=False)

pendientes = [z for z in zips if z not in hechos]
print(f'pendientes: {len(pendientes)} | ya: {len(clinicas)} clinicas', flush=True)

for n, z in enumerate(pendientes):
    url = f"https://signupwic.com/index.php?p=actions/sprig-core/components/render&visitorLat=39&visitorLng=-95&location={z}&range=5&sprig:config={CFG}"
    try:
        r = subprocess.run(['curl', '-s', '--max-time', '45', '-A', UA, '-e', 'https://signupwic.com/find-a-clinic', '-H', 'HX-Request: true', url], capture_output=True, text=True, timeout=60)
        src = r.stdout
        bloques = src.split('clinics__clinic')[1:]
        for b in bloques[:6]:
            nm = re.search(r'clinic__heading\">([^<]+)<', b)
            ad = re.search(r'<span>Address: </span>(.*?)</p>', b, re.DOTALL)
            tel = re.search(r'href=\"tel:\+?1?-?([\d-]+)\"', b)
            if not (nm and ad): continue
            partes = [p.strip() for p in re.split(r'<br\s*/?>', ad.group(1))]
            calle = re.sub(r'\s+', ' ', H.unescape(partes[0])).strip()
            resto = re.sub(r'\s+', ' ', partes[1]).strip() if len(partes) > 1 else ''
            m = re.match(r'(.+?),\s*([A-Z]{2})\s+(\d{5})', resto)
            city, st, zc = (m.group(1), m.group(2), m.group(3)) if m else (resto, '', '')
            key = (nm.group(1).strip().lower(), calle.lower())
            if key not in clinicas:
                clinicas[key] = {'name': nm.group(1).strip(), 'street': calle, 'city': city, 'state': st, 'zip': zc, 'phone': tel.group(1) if tel else ''}
        hechos.add(z)
    except Exception as e:
        print(f'{z}: ERR {e}', flush=True)
    if n % 50 == 0:
        guardar()
        print(f'[{n}/{len(pendientes)}] clinicas: {len(clinicas)}', flush=True)
    time.sleep(2.5)

guardar()
print(f'FIN: {len(clinicas)} clinicas de {len(hechos)} zips', flush=True)
