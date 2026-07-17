import clinics from '../data/clinics.json';
import { guides } from '../data/guides.js';
const BASE = 'https://wicclinics.com';
export function GET() {
  const r = ['/', '/find/', '/about/', '/contact/', '/privacy/'];
  for (const g of guides) r.push(`/${g.slug}/`);
  const st = new Set(), ci = new Set();
  for (const c of clinics) {
    r.push(`/clinic/${c.slug}/`);
    st.add(c.stateSlug);
    ci.add(`${c.stateSlug}/${c.citySlug}`);
  }
  for (const s of st) r.push(`/${s}/`);
  for (const c2 of ci) r.push(`/${c2}/`);
  const u = [...new Set(r)];
  const today = new Date().toISOString().split('T')[0];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    u.map(x => `<url><loc>${BASE}${x}</loc><lastmod>${today}</lastmod></url>`).join('\n') + `\n</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
