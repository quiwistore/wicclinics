import re, json, subprocess, time
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/126.0.0.0 Safari/537.36"
d = json.load(open('state-agencies.json'))
for s, v in d.items():
    try:
        r = subprocess.run(['curl', '-s', '-L', '--max-time', '25', '-A', UA, v['source']], capture_output=True, text=True, timeout=40)
        txt = re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', re.sub(r'<script.*?</script>', '', r.stdout, flags=re.DOTALL)))
        m = re.search(r'How to Apply\s+(.{15,160}?)(?:General Contact|Program Contacts|Phone)', txt)
        v['apply'] = re.sub(r'\s+', ' ', m.group(1)).strip() if m else ''
        v['online'] = 'online' in v['apply'].lower()
    except Exception as e:
        v['apply'] = ''; v['online'] = False
    time.sleep(1.2)
json.dump(d, open('state-agencies.json', 'w'), ensure_ascii=False, indent=0)
onl = [k for k, v in d.items() if v.get('online')]
print(f"apply capturado: {sum(1 for v in d.values() if v['apply'])}/{len(d)} | online: {len(onl)} -> {', '.join(onl)}")
