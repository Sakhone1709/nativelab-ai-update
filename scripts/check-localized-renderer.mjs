import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import ts from 'typescript';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const cache=new Map();
let operations=[];
class Path {rect(...args){operations.push(['rect',...args]);}}
const gradient={addColorStop(...args){operations.push(['stop',...args]);}};
const context=new Proxy({}, {get:(target,key)=>target[key]??((...args)=>{operations.push([key,...args]);return key==='measureText'?{width:String(args[0]).length*8}:key.startsWith('create')?gradient:undefined;}),set:(target,key,value)=>{operations.push([key,value]);target[key]=value;return true;}});
function load(file){file=path.resolve(file);if(cache.has(file))return cache.get(file);const result={exports:{}};cache.set(file,result.exports);const source=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX}}).outputText;vm.runInNewContext(source,{exports:result.exports,require:id=>id.startsWith('@/')?load('src/'+id.slice(2)+'.ts'):require(id),performance:{now:()=>0},Path2D:Path,document:{createElement:()=>({getContext:()=>context})},Intl});return result.exports;}
const {BrandHeading}=load('src/components/brand-heading.tsx');
const {renderToStaticMarkup}=require('react-dom/server');
let headings=0;
for(const locale of ['en','th','lo','zh-CN','vi']){const m=JSON.parse(fs.readFileSync(`messages/${locale}.json`));for(const title of [m.Home.hero.title,...Object.values(m.Profiles).map(p=>p.title)]){
 const html=renderToStaticMarkup(BrandHeading({text:title}));const spans=[...html.matchAll(/<span[^>]*>(.*?)<\/span>/gs)].map(m=>m[1].replaceAll('&amp;','&').replaceAll('&#x27;',"'").replaceAll('&quot;','"').replaceAll('&lt;','<').replaceAll('&gt;','>'));
 assert.equal(spans.join('').replace(/\s+/g,' '),title.replace(/\s+/g,' '),'Heading must preserve all translated text');
 const boundaries=new Set([...new Intl.Segmenter(locale,{granularity:'grapheme'}).segment(title)].map(p=>p.index));boundaries.add(title.length);let end=0;for(const span of spans){end+=span.length;assert(boundaries.has(end),`${locale}: split grapheme`);}headings++;
}}
for(const [file,exportName,args]of [
 ['home-neural-renderer','createHomeNeuralRenderer',[JSON.parse(fs.readFileSync('messages/th.json')).Visual,'Noto Sans Thai']],
 ['company-renderer','createCompanyRenderer',[]],['ambient-network-renderer','createAmbientNetworkRenderer',['technology']],['systems-renderer','createSystemsRenderer',['capabilities']],['case-renderer','createCaseRenderer',[]],['ambient-network-renderer','createAmbientNetworkRenderer',['contact']]
]){
 const renderer=load(`src/components/${file}.ts`)[exportName](...args);
 const frame={ctx:context,width:1440,height:780,centerX:1094,centerY:367,size:250,time:0,rotationX:0,rotationY:0,presence:0,scroll:0,mobile:false,reduced:true};
 function hash(time,reduced){operations=[];renderer.draw({...frame,time,reduced});return crypto.createHash('sha256').update(JSON.stringify(operations)).digest('hex');}
 hash(0,true);assert.equal(hash(0,true),hash(100,true),`${file}: reduced motion must be static`);assert.notEqual(hash(4,false),hash(6,false),`${file}: normal animation must advance`);renderer.dispose();
}
console.log(`${headings} headings preserve Unicode and grapheme boundaries; all six hero scenes keep static reduced motion and animated normal motion.`);

