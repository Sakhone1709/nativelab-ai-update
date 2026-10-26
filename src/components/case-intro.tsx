"use client";

import { useEffect, useRef } from "react";
import { FileSearch, Network, ShieldCheck, CircuitBoard } from "lucide-react";

export function CaseIntro({labels}:{labels:string[]}) {
  const root=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const el=root.current;if(!el)return;
    let visible=false;
    const media=matchMedia('(prefers-reduced-motion: reduce)');
    const sync=()=>{el.dataset.running=String(visible&&!document.hidden&&!media.matches);};
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();});
    observer.observe(el);document.addEventListener('visibilitychange',sync);media.addEventListener('change',sync);
    return()=>{observer.disconnect();document.removeEventListener('visibilitychange',sync);media.removeEventListener('change',sync);};
  },[]);
  return <div ref={root} className="case-intro" data-running="false">
    <svg viewBox="0 0 600 310" aria-hidden="true" className="case-intro-art">
      <defs><radialGradient id="case-intro-halo"><stop stopColor="#76b900" stopOpacity=".12"/><stop offset="1" stopColor="#76b900" stopOpacity="0"/></radialGradient></defs>
      <ellipse cx="300" cy="155" rx="260" ry="150" fill="url(#case-intro-halo)"/>
      {[0,1,2].map(i=><g key={i}>
        <path d={`M40 ${120+i*35} C160 ${50+i*35},200 ${250-i*45},300 155 S440 ${60+i*50},560 ${110+i*40}`} className="case-intro-track"/>
        <path d={`M40 ${120+i*35} C160 ${50+i*35},200 ${250-i*45},300 155 S440 ${60+i*50},560 ${110+i*40}`} pathLength="1" className="case-intro-packet" style={{animationDelay:`${i*-3}s`}}/>
      </g>)}
      <path d="m300 112 43 43-43 43-43-43z" fill="#0c1c10" stroke="#76b90077"/>
      <path d="m300 130 25 25-25 25-25-25z" fill="none" stroke="#91b56988"/>
      {[[40,120],[40,190],[560,110],[560,190]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="3" fill="#94c54d"/>)}
      <circle cx="300" cy="155" r="4" fill="#76b900"/>
    </svg>
    <ul className="case-intro-labels">{labels.map((label,i)=>{const Icon=[FileSearch,Network,ShieldCheck,CircuitBoard][i];return <li key={label}><Icon size={16} aria-hidden="true"/><span>{label}</span></li>;})}</ul>
  </div>;
}
