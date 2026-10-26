"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { FileSearch, Network, ShieldCheck, UserCheck, CircuitBoard, Check, Clock3 } from "lucide-react";

const words = {
  en: {demo:"Illustrative workflow · not live system status",boundary:"Private knowledge boundary",review:"Human review",approval:"Illustrative approval",trail:"Source → coordination → checks → approval → action",rest:"Traceability preserved",pending:"Pending",done:"Complete",values:["Retrieve relevant sources within a controlled boundary.","Coordinate parallel tasks and combine their outputs.","Check the output before it advances.","Pause for a person to review and approve the action.","Execute only after validation and illustrative approval."]},
  th: {demo:"ตัวอย่างขั้นตอน · ไม่ใช่สถานะระบบจริง",boundary:"ขอบเขตความรู้ส่วนตัว",review:"การตรวจโดยมนุษย์",approval:"ตัวอย่างการอนุมัติ",trail:"แหล่งข้อมูล → ประสานงาน → ตรวจสอบ → อนุมัติ → ทำงาน",rest:"เก็บเส้นทางตรวจสอบย้อนกลับ",pending:"รอดำเนินการ",done:"เสร็จสิ้น",values:["ค้นแหล่งข้อมูลที่เกี่ยวข้องภายในขอบเขตที่ควบคุม","แบ่งงานและรวมผลลัพธ์จากหลายขั้นตอน","ตรวจผลลัพธ์ก่อนส่งต่อ","หยุดให้บุคคลตรวจและอนุมัติก่อนดำเนินการ","ทำงานหลังผ่านการตรวจสอบและการอนุมัติตัวอย่างเท่านั้น"]},
  lo: {demo:"ຕົວຢ່າງຂັ້ນຕອນ · ບໍ່ແມ່ນສະຖານະລະບົບຈິງ",boundary:"ຂອບເຂດຄວາມຮູ້ສ່ວນຕົວ",review:"ການກວດໂດຍມະນຸດ",approval:"ຕົວຢ່າງການອະນຸມັດ",trail:"ແຫຼ່ງຂໍ້ມູນ → ປະສານງານ → ກວດສອບ → ອະນຸມັດ → ປະຕິບັດ",rest:"ເກັບເສັ້ນທາງກວດສອບຄືນ",pending:"ລໍຖ້າ",done:"ສຳເລັດ",values:["ຄົ້ນແຫຼ່ງຂໍ້ມູນໃນຂອບເຂດທີ່ຄວບຄຸມ","ແບ່ງວຽກແລະລວມຜົນໄດ້ຮັບ","ກວດຜົນໄດ້ຮັບກ່ອນສົ່ງຕໍ່","ຢຸດໃຫ້ຄົນກວດແລະອະນຸມັດ","ປະຕິບັດຫຼັງການກວດແລະອະນຸມັດຕົວຢ່າງ"]},
  vi: {demo:"Quy trình minh họa · không phải trạng thái trực tiếp",boundary:"Ranh giới tri thức riêng tư",review:"Con người rà soát",approval:"Phê duyệt minh họa",trail:"Nguồn → điều phối → đánh giá → phê duyệt → hành động",rest:"Giữ lại dấu vết truy nguồn",pending:"Đang chờ",done:"Hoàn tất",values:["Truy xuất nguồn liên quan trong ranh giới được kiểm soát.","Điều phối nhiệm vụ song song và hợp nhất kết quả.","Kiểm tra đầu ra trước khi chuyển tiếp.","Tạm dừng để con người rà soát và phê duyệt.","Chỉ thực hiện sau khi đánh giá và phê duyệt minh họa."]},
  "zh-CN": {demo:"流程演示 · 非实时系统状态",boundary:"私有知识边界",review:"人工审核",approval:"模拟审批",trail:"来源 → 协调 → 验证 → 审批 → 执行",rest:"保留可追溯路径",pending:"待处理",done:"完成",values:["在受控边界内检索相关信息。","协调并行任务并汇总结果。","在进入下一步前验证输出。","暂停以供人工审核和批准。","仅在验证与模拟审批后执行。"]},
};
const paths = ["M190 100 H222", "M222 100 L270 65 L320 100 H410 M222 100 H320 M222 100 L270 135 L320 100", "M500 150 V205 H100 V250", "M190 300 H225 V345 H250", "M350 345 H380 V300 H410"];
const icons = [FileSearch, Network, ShieldCheck, UserCheck, CircuitBoard];

export function CaseWorkflow({cards}:{cards:{title:string;description:string}[]}) {
  const locale=useLocale();
  const w=words[locale as keyof typeof words] ?? words.en;
  const root=useRef<HTMLDivElement>(null);
  const [phase,setPhase]=useState(0);
  const [selected,setSelected]=useState<number|null>(null);
  const [staticMode,setStaticMode]=useState(false);
  useEffect(()=>{
    const el=root.current;
    if(!el)return;
    const media=matchMedia('(prefers-reduced-motion: reduce)');
    let frame=0,last=0,elapsed=0,visible=false,previous=-1;
    const render=(now:number)=>{
      frame=0;
      if(!visible || document.hidden || media.matches)return;
      elapsed+=last?Math.min(now-last,80):0; last=now;
      const t=elapsed/1000%15;
      const stage=t<2?0:t<5?1:t<7?2:t<9.5?3:t<11.5?4:5;
      if(stage!==previous){setPhase(stage);previous=stage;}
      const bounds=[0,2,5,7,9.5,11.5,15];
      const progress=(t-bounds[stage])/(bounds[stage+1]-bounds[stage]);
      el.style.setProperty('--flow-progress',String((1-Math.cos(progress*Math.PI))/2));
      frame=requestAnimationFrame(render);
    };
    const sync=()=>{
      cancelAnimationFrame(frame);last=0;
      setStaticMode(media.matches);
      if(media.matches){setPhase(5);return;}
      if(visible&&!document.hidden)frame=requestAnimationFrame(render);
    };
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();},{threshold:.05});
    observer.observe(el); document.addEventListener('visibilitychange',sync);media.addEventListener('change',sync);sync();
    return()=>{cancelAnimationFrame(frame);observer.disconnect();document.removeEventListener('visibilitychange',sync);media.removeEventListener('change',sync);};
  },[]);
  const stages=[cards[0],cards[1],cards[2],{title:w.review,description:w.approval},cards[3]];
  return <div ref={root} className="case-workflow" data-phase={phase} data-selected={selected ?? ''} data-static={staticMode} role="group" aria-label={w.trail}>
    <p className="workflow-demo">{w.demo}</p>
    <p className="workflow-order">{w.trail}</p>
    <div className="workflow-diagram">
      <svg className="workflow-paths" viewBox="0 0 600 410" preserveAspectRatio="none" aria-hidden="true">
        <rect x="6" y="20" width="382" height="155" rx="14" className="workflow-boundary" />
        {paths.map((d,i)=><g key={d} className={`workflow-edge edge-${i}`} data-active={phase===i||selected===i}>
          <path d={d} className="workflow-track"/>
          {i===1 ? [65,100,135].map((y,index)=><path key={y} d={`M222 100 L270 ${y} L320 100 H410`} pathLength="1" className={`workflow-signal branch-${index}`}/>) : <path d={d} pathLength="1" className="workflow-signal"/>}
        </g>)}
        {[65,100,135].map((y,i)=><g key={y} className="workflow-processor"><rect x="262" y={y-8} width="16" height="16" rx="3"/><text x="270" y={y+3} textAnchor="middle">{i+1}</text></g>)}
        {[0,1,2,3].map(i=><g key={i} className={`workflow-document document-${i}`}><rect x="0" y="-6" width="9" height="12" rx="1"/><path d="M2 -2 H7 M2 1 H6"/></g>)}
      </svg>
      <span className="workflow-boundary-label">{w.boundary}</span>
      <ol className="workflow-stages">
        {stages.map((stage,i)=>{const Icon=icons[i];return <li key={i} className={`workflow-stage stage-${i}`} data-active={phase===i||selected===i}>
          <button type="button" onMouseEnter={()=>setSelected(i)} onMouseLeave={()=>setSelected(null)} onFocus={()=>setSelected(i)} onBlur={()=>setSelected(null)} aria-describedby="workflow-explanation">
            <span className="workflow-stage-top"><Icon size={21} aria-hidden="true"/><strong>{stage.title}</strong><span className="workflow-number">{i+1}</span></span>
            <span className="workflow-description">{stage.description}</span>
            {i===2&&<Check className="workflow-check" size={15} aria-hidden="true"/>}
            {i===3&&<span className="workflow-state">{phase>=4||staticMode?<Check size={13}/>:<Clock3 size={13}/>} {w.approval}</span>}
            {i===4&&<span className="workflow-state">{phase>=5||staticMode?<Check size={13}/>:<Clock3 size={13}/>} {phase>=5||staticMode?w.done:w.pending}</span>}
          </button>
        </li>;})}
      </ol>
    </div>
    <div className="workflow-explanation" id="workflow-explanation"><span aria-hidden="true">{selected===null?(phase===5?'↳':`${phase+1} / 5`):`${selected+1} / 5`}</span><p>{selected!==null?w.values[selected]:phase===5?w.rest:w.values[phase]}</p></div>
  </div>;
}
