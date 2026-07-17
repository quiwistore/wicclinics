#!/usr/bin/env python3
import re, json, subprocess, time

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
STATES = ['alabama','alaska','arizona','arkansas','california','colorado','connecticut','delaware','district-of-columbia','florida','georgia','hawaii','idaho','illinois','indiana','iowa','kansas','kentucky','louisiana','maine','maryland','massachusetts','michigan','minnesota','mississippi','missouri','montana','nebraska','nevada','new-hampshire','new-jersey','new-mexico','new-york','north-carolina','north-dakota','ohio','oklahoma','oregon','pennsylvania','rhode-island','south-carolina','south-dakota','tennessee','texas','utah','vermont','virginia','washington','west-virginia','wisconsin','wyoming','puerto-rico','guam','american-samoa','virgin-islands','northern-mariana-islands']

out = {}
for s in STATES:
    url = f"https://www.fns.usda.gov/contact/wic/{s}"
    try:
        r = subprocess.run(['curl', '-s', '-L', '--max-time', '30', '-A', UA, url], capture_output=True, text=True, timeout=45)
        src = r.stdout
        if len(src) < 10000:
            print(f'{s}: vacio ({len(src)}b)', flush=True); continue
        txt = re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' | ', re.sub(r'<script.*?</script>', '', src, flags=re.DOTALL)))
        tf = re.search(r'([\d][\d\-]{9,15})\s*\|?\s*\(toll-free\)', txt)
        ph = re.search(r'([\d]{3}-[\d]{3}-[\d]{4})\s*\|?\s*\((?:phone|voc)\)', txt)
        dep = re.search(r'Department\s*\|+\s*([^|]{5,70}?)\s*\|', txt)
        apply_m = re.search(r'How to Apply\s*\|+\s*([^|]{10,140}?)\s*\|', txt)
        dirm = re.search(r'\|\s*([A-Z][a-z]+(?:\s[A-Za-z.\'-]+){0,3})\s*\|+\s*Director', txt)
        out[s] = {
            'tollFree': tf.group(1) if tf else '',
            'phone': ph.group(1) if ph else '',
            'dept': dep.group(1).replace('&amp;', '&').strip() if dep else '',
            'apply': apply_m.group(1).strip() if apply_m else '',
            'director': dirm.group(1).strip() if dirm else '',
            'source': url
        }
        print(f"{s}: tf={out[s]['tollFree'] or '-'} | {out[s]['dept'][:40]}", flush=True)
    except Exception as e:
        print(f'{s}: ERR {e}', flush=True)
    time.sleep(1.5)

json.dump(out, open('state-agencies.json', 'w'), ensure_ascii=False, indent=0)
print(f"\nGUARDADAS: {len(out)} | con toll-free: {sum(1 for v in out.values() if v['tollFree'])} | con online apply: {sum(1 for v in out.values() if 'online' in v['apply'].lower())}")
