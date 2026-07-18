#!/usr/bin/env python3
import json, re, subprocess, time, os, sys, html as H

W = sys.argv[1]
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
CFG = 'aa80b5be5c6eabecf87c52e442ae7f2e7d979b3599dfd9e1de90cd9d6b064bfe%7B%22id%22%3A%22component-flefbi%22%2C%22siteId%22%3A1%2C%22template%22%3A%2202_components%5C%2F_clinic-finder%22%2C%22variables%22%3A%7B%22siteIsSpanish%22%3A%22%22%7D%7D'
OUT = f'v2-{W}.json'
LINEA = re.compile(r'^(.+?),\s*([A-Z]{2})\s+(\d{4,5})(?:-\d{4})?$')

def parse(bloque):
    nm = re.search(r'clinic__heading">([^<]+)<', bloque)
    ad = re.search(r'<span>Address: </span>(.*?)</p>', bloque, re.DOTALL)
    if not (nm and ad): return None
    partes = [re.sub(r'\s+', ' ', H.unescape(p)).strip() for p in re.split(r'<br\s*/?>', ad.group(1))]
    partes = [p for p in partes if p]
    ciudad = st = zc = ''
    idx = -1
    for i, p in enumerate(partes):          # buscar la linea "Ciudad, ST ZIP" en CUALQUIER posicion
        m = LINEA.match(p)
        if m:
            ciudad, st, zc = m.group(1).strip(), m.group(2), m.group(3).zfill(5)   # zip: reponer el cero inicial
            idx = i
            break
    if not st: return None
    calle = partes[0]
    extra = ' '.join(partes[1:idx]) if idx > 1 else ''    # piso/suite intermedios
    tel = re.search(r'href="tel:\+?1?-?([\d-]+)"', bloque)
    return {'name': nm.group(1).strip(), 'street': calle, 'extra': extra, 'city': ciudad,
            'state': st, 'zip': zc, 'phone': tel.group(1) if tel else '', 'lineas': partes}

objetivo = json.load(open(f'markers-chunk{W}.json'))
clinicas, hechos = {}, set()
if os.path.exists(OUT):
    d = json.load(open(OUT))
    clinicas = d.get('c', {}); hechos = set(d.get('hechos', []))

print(f'worker {W}: {len(objetivo)} markers ({len(hechos)} hechos)', flush=True)
for n, m in enumerate(objetivo):
    if m['id'] in hechos: continue
    url = f"https://signupwic.com/index.php?p=actions/sprig-core/components/render&visitorLat=39&visitorLng=-95&location={m['lat']},{m['lng']}&range=2&sprig:config={CFG}"
    try:
        r = subprocess.run(['curl', '-s', '--max-time', '40', '-A', UA, '-e', 'https://signupwic.com/find-a-clinic', '-H', 'HX-Request: true', url], capture_output=True, text=True, timeout=55)
        for b in r.stdout.split('clinics__clinic')[1:6]:
            c = parse(b)
            if not c: continue
            k = f"{c['name'].lower()}||{c['street'].lower()}||{c['zip']}"
            if k not in clinicas: clinicas[k] = c
        hechos.add(m['id'])
    except Exception:
        pass
    if n % 50 == 0:
        json.dump({'c': clinicas, 'hechos': list(hechos)}, open(OUT, 'w'), ensure_ascii=False)
        print(f'[{n}/{len(objetivo)}] clinicas: {len(clinicas)}', flush=True)
    time.sleep(2)

json.dump({'c': clinicas, 'hechos': list(hechos)}, open(OUT, 'w'), ensure_ascii=False)
print(f'FIN worker {W}: {len(clinicas)} clinicas', flush=True)
