import fs from 'node:fs';
import assert from 'node:assert/strict';
const base=process.env.SITE_URL||'http://127.0.0.1:3002';
const locales=['en','th','lo','zh-CN','vi'];
const routes=['','company','capabilities','technology','case-studies','contact'];
const catalogs=Object.fromEntries(locales.map(l=>[l,JSON.parse(fs.readFileSync(new URL(`../messages/${l}.json`,import.meta.url),'utf8'))]));
function leaves(value,prefix='',out={}){for(const[k,v]of Object.entries(value)){if(typeof v==='string')out[prefix+k]=v;else leaves(v,prefix+k+'.',out);}return out;}
const reference=leaves(catalogs.en);
const excluded=/\.(slug|href|ctaHref|email|phone|phoneHref|address|addressHref)$|\.socials\./;
const allowed=/NativeLab AI|\bAI\b|\bVPC\b|\bRAG\b|\bAPI\b/gi;
for(const locale of locales){
 const flat=leaves(catalogs[locale]);assert.deepEqual(Object.keys(flat).sort(),Object.keys(reference).sort(),`${locale}: key mismatch`);
 for(const[key,value]of Object.entries(flat)){assert(value.trim(),`${locale}.${key}: empty`);if(locale==='vi'&&!excluded.test(key)&&value.replace(allowed,'').match(/[a-z]{2,}/i)&&value!=='Email')assert.notEqual(value,reference[key],`${locale}.${key}: untranslated source`);else if(locale!=='en'&&locale!=='vi'&&!excluded.test(key))assert(!/[a-z]{2,}/i.test(value.replace(allowed,'')),`${locale}.${key}: untranslated English: ${value}`);}
 for(const route of routes){
  const path=`/${locale==='en'?'':locale+'/'}${route}`;
  const response=await fetch(base+path,{headers:{'Accept-Language':locale}}),html=await response.text();assert.equal(response.status,200,path);
  assert(html.includes(`lang="${locale}"`),`${path}: HTML language`);assert(!html.includes('MISSING_MESSAGE'),`${path}: missing message`);
  const heading=html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]*>/g,'');
  assert(heading,`${path}: no H1`);const expected=route?catalogs[locale].Profiles[route].title:catalogs[locale].Home.hero.title;
  assert.equal(heading.replace(/\s+/g,''),expected.replace(/\s+/g,''),`${path}: heading translation`);
  assert(html.includes(route==='case-studies'?'case-workflow':'intelligence-scene'),`${path}: preserved animation`);
  if(locale!=='en')assert(html.includes(`href="/${locale}/company"`),`${path}: navigation loses locale`);
 }
 console.log(`${locale}: dictionaries, complete text audit and six SSR routes passed`);
}
const legacy=await fetch(base+'/zh/technology?test=1',{redirect:'manual'});assert.equal(legacy.status,307);assert(legacy.headers.get('location').endsWith('/zh-CN/technology?test=1'));
for(const locale of locales){const r=await fetch(base+'/',{redirect:'manual',headers:{cookie:`NEXT_LOCALE=${locale}`,'Accept-Language':'en'}});if(locale==='en')assert.equal(r.status,200);else assert(r.headers.get('location')?.endsWith('/'+locale));}
const invalid=await fetch(base+'/',{redirect:'manual',headers:{cookie:'NEXT_LOCALE=invalid','Accept-Language':'en'}});assert.equal(invalid.status,200);
const zhCookie=await fetch(base+'/',{redirect:'manual',headers:{cookie:'NEXT_LOCALE=zh','Accept-Language':'en'}});assert(zhCookie.headers.get('location')?.endsWith('/zh-CN'));
console.log('30 routes, five locale cookies, invalid cookie fallback and legacy Chinese links passed.');

