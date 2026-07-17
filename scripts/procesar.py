#!/usr/bin/env python3
import json, re, unicodedata, sys

STATES = {'AL':'Alabama','AK':'Alaska','AZ':'Arizona','AR':'Arkansas','CA':'California','CO':'Colorado','CT':'Connecticut','DE':'Delaware','FL':'Florida','GA':'Georgia','HI':'Hawaii','ID':'Idaho','IL':'Illinois','IN':'Indiana','IA':'Iowa','KS':'Kansas','KY':'Kentucky','LA':'Louisiana','ME':'Maine','MD':'Maryland','MA':'Massachusetts','MI':'Michigan','MN':'Minnesota','MS':'Mississippi','MO':'Missouri','MT':'Montana','NE':'Nebraska','NV':'Nevada','NH':'New Hampshire','NJ':'New Jersey','NM':'New Mexico','NY':'New York','NC':'North Carolina','ND':'North Dakota','OH':'Ohio','OK':'Oklahoma','OR':'Oregon','PA':'Pennsylvania','RI':'Rhode Island','SC':'South Carolina','SD':'South Dakota','TN':'Tennessee','TX':'Texas','UT':'Utah','VT':'Vermont','VA':'Virginia','WA':'Washington','WV':'West Virginia','WI':'Wisconsin','WY':'Wyoming','DC':'District of Columbia','PR':'Puerto Rico','VI':'U.S. Virgin Islands','GU':'Guam','AS':'American Samoa','MP':'Northern Mariana Islands'}

def slugify(t):
    t = unicodedata.normalize('NFKD', str(t).lower()).encode('ascii','ignore').decode()
    return re.sub(r'[^a-z0-9]+','-',t).strip('-')

def fmt_tel(t):
    c = re.sub(r'\D','',str(t))
    return f'({c[0:3]}) {c[3:6]}-{c[6:10]}' if len(c)==10 else str(t).strip()

d = json.load(open('data/capturadas.json'))
items, usados = [], {}
for v in d['clinicas'].values():
    if v['state'] not in STATES or not v['name'] or not v['city']: continue
    base = slugify(v['name'])[:55] or 'clinic'
    slug = base if base not in usados else f"{base}-{slugify(v['city'])[:20]}"
    i = 2
    while slug in usados: slug = f'{base}-{i}'; i += 1
    usados[slug] = 1
    items.append({
        'slug': slug, 'name': v['name'], 'street': v['street'],
        'city': v['city'].title() if v['city'].isupper() else v['city'],
        'state': v['state'], 'stateName': STATES[v['state']], 'zip': v['zip'],
        'phone': fmt_tel(v['phone']) if v['phone'] else '',
        'citySlug': slugify(v['city']), 'stateSlug': slugify(STATES[v['state']]),
    })

json.dump(items, open('site/src/data/clinics.json','w'), ensure_ascii=False)
ciudades = set((x['stateSlug'], x['citySlug']) for x in items)
print(f'clinics.json: {len(items)} clinicas | {len(set(x["state"] for x in items))} estados | {len(ciudades)} ciudades | tel: {sum(1 for x in items if x["phone"])}')
