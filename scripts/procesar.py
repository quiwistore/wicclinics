#!/usr/bin/env python3
import json, re, unicodedata, sys, html as H

STATES = {'AL':'Alabama','AK':'Alaska','AZ':'Arizona','AR':'Arkansas','CA':'California','CO':'Colorado','CT':'Connecticut','DE':'Delaware','FL':'Florida','GA':'Georgia','HI':'Hawaii','ID':'Idaho','IL':'Illinois','IN':'Indiana','IA':'Iowa','KS':'Kansas','KY':'Kentucky','LA':'Louisiana','ME':'Maine','MD':'Maryland','MA':'Massachusetts','MI':'Michigan','MN':'Minnesota','MS':'Mississippi','MO':'Missouri','MT':'Montana','NE':'Nebraska','NV':'Nevada','NH':'New Hampshire','NJ':'New Jersey','NM':'New Mexico','NY':'New York','NC':'North Carolina','ND':'North Dakota','OH':'Ohio','OK':'Oklahoma','OR':'Oregon','PA':'Pennsylvania','RI':'Rhode Island','SC':'South Carolina','SD':'South Dakota','TN':'Tennessee','TX':'Texas','UT':'Utah','VT':'Vermont','VA':'Virginia','WA':'Washington','WV':'West Virginia','WI':'Wisconsin','WY':'Wyoming','DC':'District of Columbia','PR':'Puerto Rico','VI':'U.S. Virgin Islands','GU':'Guam','AS':'American Samoa','MP':'Northern Mariana Islands'}

def slugify(t):
    t = unicodedata.normalize('NFKD', str(t).lower()).encode('ascii','ignore').decode()
    return re.sub(r'[^a-z0-9]+','-',t).strip('-')

MINUS = {'of','the','and','on','de','la','del','y'}
def titlecase(t):
    t = str(t).strip()
    if not t: return t
    out = []
    for i, w in enumerate(re.split(r'(\s+|-|/)', t)):
        if not w.strip() or w in ('-', '/'):
            out.append(w); continue
        lw = w.lower()
        if i > 0 and lw in MINUS:
            out.append(lw); continue
        if lw.startswith('mc') and len(lw) > 3:
            out.append('Mc' + lw[2].upper() + lw[3:])
        elif lw.startswith('mac') and len(lw) > 4 and lw not in ('mackay','macon','macomb'):
            out.append('Mac' + lw[3].upper() + lw[4:])
        elif lw.startswith("o'") and len(lw) > 2:
            out.append("O'" + lw[2].upper() + lw[3:])
        elif lw in ('st','ste'):
            out.append(lw.capitalize() + '.')
        elif lw in ('ft',):
            out.append('Ft.')
        elif lw in ('us','ne','nw','se','sw','ii','iii','dc','nyc'):
            out.append(lw.upper())
        else:
            out.append(lw.capitalize())
    return ''.join(out)

def fmt_tel(t):
    c = re.sub(r'\D','',str(t))
    return f'({c[0:3]}) {c[3:6]}-{c[6:10]}' if len(c)==10 else str(t).strip()

ABREV = {'st':'street','str':'street','rd':'road','ave':'avenue','av':'avenue','blvd':'boulevard','hwy':'highway','dr':'drive','ln':'lane','ct':'court','pl':'place','pkwy':'parkway','cir':'circle','tpke':'turnpike','ste':'suite','n':'north','s':'south','e':'east','w':'west','ne':'northeast','nw':'northwest','se':'southeast','sw':'southwest'}
def desescape(s):
    t = str(s)
    for _ in range(3):
        n = H.unescape(t)
        if n == t: break
        t = n
    t = t.replace('\u2019', "'").replace('\t', ' ')
    # posesivo: Mary'S -> Mary's ; O'brien -> O'Brien lo maneja titlecase
    t = re.sub(r"(?<=[a-z])'S\b", "'s", t)
    return re.sub(r'\s+', ' ', t).strip()

def limpiar_calle(s, city, st):
    s = str(s).strip()
    s = re.sub(r',\s*(USA|United States)\s*$', '', s, flags=re.I)
    s = re.sub(r',\s*' + re.escape(str(st)) + r'\s*(\d{5})?\s*$', '', s, flags=re.I)
    s = re.sub(r',\s*' + re.escape(str(city)) + r'\s*$', '', s, flags=re.I)
    return s.strip().rstrip(',').strip()

def norm_calle(s):
    s = re.sub(r',.*$', '', str(s).lower())
    s = re.sub(r'[^a-z0-9 ]', ' ', s)
    return ' '.join(ABREV.get(w, w) for w in s.split())

d = json.load(open('data/capturadas.json'))
fuentes = list(d['clinicas'].values())
try:
    densos = json.load(open('data/capturadas-densos.json'))
    fuentes += list(densos.values())
    print(f'  (+ {len(densos)} del pase denso)')
except Exception:
    pass
items, usados, vistos = [], {}, {}
for v in fuentes:
    if v['state'] not in STATES or not v['name'] or not v['city']: continue
    # dedupe real: mismo nombre + misma calle normalizada + mismo zip = misma clinica cargada 2 veces
    v['name'] = desescape(v['name']); v['street'] = desescape(v['street']); v['city'] = desescape(v['city'])
    ident = (v['name'].strip().lower(), norm_calle(v['street']), v['zip'])
    if ident in vistos:
        # conservar la version con la calle mas descriptiva (mas larga)
        prev = vistos[ident]
        if len(v['street']) > len(prev['streetRaw']):
            prev['street'] = titlecase(v['street']) if v['street'].isupper() else v['street']
            prev['streetRaw'] = v['street']
        if not prev['phone'] and v['phone']: prev['phone'] = fmt_tel(v['phone'])
        continue
    base = slugify(v['name'])[:55] or 'clinic'
    slug = base if base not in usados else f"{base}-{slugify(v['city'])[:20]}"
    i = 2
    while slug in usados: slug = f'{base}-{i}'; i += 1
    usados[slug] = 1
    reg = {
        'slug': slug, 'name': desescape(titlecase(v['name']).replace('Wic', 'WIC') if v['name'].isupper() else v['name'].replace(' Wic', ' WIC')), 'street': limpiar_calle(titlecase(v['street']) if v['street'].isupper() else v['street'], v['city'], v['state']),
        'city': titlecase(v['city']),
        'state': v['state'], 'stateName': STATES[v['state']], 'zip': v['zip'],
        'phone': fmt_tel(v['phone']) if v['phone'] else '',
        'citySlug': slugify(v['city']), 'stateSlug': slugify(STATES[v['state']]),
        'streetRaw': v['street'],
    }
    vistos[ident] = reg
    items.append(reg)

for x in items: x.pop('streetRaw', None)
json.dump(items, open('site/src/data/clinics.json','w'), ensure_ascii=False)
ciudades = set((x['stateSlug'], x['citySlug']) for x in items)
print(f'clinics.json: {len(items)} clinicas | {len(set(x["state"] for x in items))} estados | {len(ciudades)} ciudades | tel: {sum(1 for x in items if x["phone"])}')
