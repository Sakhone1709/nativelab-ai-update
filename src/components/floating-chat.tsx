"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Mail, MessageCircle, Phone, X } from "lucide-react";
import { BrandMark } from "@/components/site-chrome";
import { Link } from "@/i18n/navigation";

export function FloatingChat() {
  const t=useTranslations('Chat');
  const [open,setOpen]=useState(false);
  const [tabActive,setTabActive]=useState(true);
  useEffect(()=>{
    const sync=()=>setTabActive(!document.hidden);
    sync();document.addEventListener('visibilitychange',sync);
    return()=>document.removeEventListener('visibilitychange',sync);
  },[]);
  const trigger=useRef<HTMLButtonElement>(null);
  const close=useRef<HTMLButtonElement>(null);
  const panel=useRef<HTMLElement>(null);
  const dismiss=()=>{setOpen(false);trigger.current?.focus();};
  useEffect(()=>{
    if(!open)return;
    close.current?.focus();
    const key=(e:KeyboardEvent)=>{if(e.key==='Escape'){setOpen(false);trigger.current?.focus();}};
    const outside=(e:PointerEvent)=>{if(!panel.current?.contains(e.target as Node)&&!trigger.current?.contains(e.target as Node))setOpen(false);};
    document.addEventListener('keydown',key);document.addEventListener('pointerdown',outside);
    return()=>{document.removeEventListener('keydown',key);document.removeEventListener('pointerdown',outside);};
  },[open]);
  return <div className="floating-chat" data-tab-active={tabActive}>
    {open&&<section ref={panel} className="chat-panel" id="native-chat-panel" role="dialog" aria-modal="false" aria-labelledby="chat-title">
      <div className="chat-header"><BrandMark uid="chat" className="chat-brand"/><div><h2 id="chat-title">NativeLab AI</h2><p><span aria-hidden="true"/>{t('status')}</p></div><button ref={close} type="button" onClick={dismiss} aria-label={t('close')}><X size={20}/></button></div>
      <div className="chat-body"><p className="chat-greeting">{t('greeting')}</p>
        <a className="chat-contact" href="mailto:Info@nativelab.ai"><i><Mail/></i><span><small>{t('email')}</small><strong>Info@nativelab.ai</strong></span><ArrowUpRight size={18}/></a>
        <a className="chat-contact" href="tel:+8562099661969"><i><Phone/></i><span><small>{t('phone')}</small><strong>+856 20 9966 1969</strong></span><ArrowUpRight size={18}/></a>
        <Link className="chat-contact" href="/contact" onClick={()=>setOpen(false)}><i><MessageCircle/></i><span><small>NativeLab AI</small><strong>{t('contact')}</strong></span><ArrowUpRight size={18}/></Link>
      </div>
    </section>}
    <button ref={trigger} type="button" className="chat-trigger" aria-label={open?t('close'):t('open')} aria-expanded={open} aria-controls={open?'native-chat-panel':undefined} onClick={()=>setOpen(!open)}>{open?<X size={25}/>:<MessageCircle size={27}/>}</button>
  </div>;
}
