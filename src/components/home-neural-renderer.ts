import { visualText, type VisualCopy } from '@/lib/visual-copy';
// Home artwork only. Visibility, pointer interpolation and the single frame loop
// are owned by IntelligenceScene.
type SphereFrame = {
  ctx: CanvasRenderingContext2D;
  width: number; height: number; centerX: number; centerY: number; size: number;
  time: number; rotationX: number; rotationY: number; presence: number;
  scroll: number; mobile: boolean; reduced: boolean;
};
type Point = { x: number; y: number };
const GREEN = "#76b900";
export function createHomeNeuralRenderer(copy: VisualCopy = {}, fontFamily = "Arial, sans-serif") {
  function draw(f: SphereFrame) {
    const {ctx, mobile} = f;
    const t = f.reduced ? 8 : f.time;
    const motion = f.reduced ? 0 : t;
    const reveal = f.reduced ? 1 : Math.min(1,t / 1.6);
    const s = f.size * (mobile ? .93 : .9);
    const cx = f.centerX - (mobile ? 0 : s * .18);
    const cy = f.centerY + s * .03;
    const yaw = -.66 + f.rotationX * .45 + Math.sin(motion * .09) * .025;
    const co = Math.cos(yaw), si = Math.sin(yaw);
    const project = (x:number,y:number,z:number):Point => {
      const rx=x*co-z*si, rz=x*si+z*co;
      return {x:cx+rx*s,y:cy+(rz*.43-y*.94)*s+f.rotationY*rx*s*.25};
    };
    const path = (points:Point[],close=false) => {
      ctx.beginPath(); points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y)); if(close)ctx.closePath();
    };
    const line = (a:Point,b:Point,color: string | CanvasGradient=GREEN,width=.7) => {path([a,b]);ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke();};
    const dot = (p:Point,r=1.6,alpha=1) => {
      const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,r*6);
      g.addColorStop(0,`rgba(190,255,130,${alpha})`);g.addColorStop(.17,`rgba(118,185,0,${alpha*.8})`);g.addColorStop(1,"#76b90000");
      ctx.fillStyle=g;ctx.fillRect(p.x-r*6,p.y-r*6,r*12,r*12);
      ctx.fillStyle=GREEN;ctx.beginPath();ctx.arc(p.x,p.y,r*.55,0,Math.PI*2);ctx.fill();
    };
    const face = (points:Point[],fill:string,edge:string) => {path(points,true);ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle=edge;ctx.lineWidth=1;ctx.stroke();};
    const box = (r:number,bottom:number,top:number,bright=false) => {
      const a=project(-r,top,-r),b=project(r,top,-r),c=project(r,top,r),d=project(-r,top,r);
      const aa=project(-r,bottom,-r),bb=project(r,bottom,-r),cc=project(r,bottom,r),dd=project(-r,bottom,r);
      face([d,c,cc,dd],bright?"#10251bd9":"#050807eb",bright?"#76b900ba":"#76b90055");
      face([b,c,cc,bb],bright?"#17370cd9":"#0b160feb",bright?"#76b900c9":"#76b90070");
      face([a,b,c,d],bright?"#76b90018":"#10251bad",bright?"#c5ff8fe6":"#76b90088");
      return {a,b,c,d,aa,bb,cc,dd};
    };
    ctx.save();ctx.globalAlpha=reveal;ctx.lineJoin="round";
    const halo=ctx.createRadialGradient(cx,cy,0,cx,cy,s*1.5);
    halo.addColorStop(0,"#76b90029");halo.addColorStop(1,"#76b90000");ctx.fillStyle=halo;ctx.fillRect(0,0,f.width,f.height);
    // Perspective circuit floor: bounded, connected paths rather than a random field.
    for(let i=-8;i<=8;i++){
      const q=i*.24;
      line(project(q,-.7,-1.7),project(q,-.7,1.7),"#76b90026",.6);
      line(project(-1.7,-.7,q),project(1.7,-.7,q),"#76b90026",.6);
    }
    for(let i=0;i<(mobile?12:28);i++){
      const x=Math.sin(i*7.12)*1.5,z=Math.cos(i*3.7)*1.5;
      const a=project(x,-.69,z),b=project(x+.22,-.69,z),c=project(x+.22,-.69,z+.34);
      path([a,b,c]);ctx.strokeStyle=i%4?"#76b90048":"#76b90099";ctx.lineWidth=.8;ctx.stroke();
      const u=(motion*.15+i*.19)%1;dot({x:a.x+(c.x-a.x)*u,y:a.y+(c.y-a.y)*u},i%4?1:1.7,.65);
    }
    box(.91,-.76,-.56);box(.83,-.55,-.43);box(.94,-.42,-.38);box(.73,-.37,-.23);
    // Illuminated edges on stacked processor plates.
    for(const y of [-.55,-.39,-.25]){
      const r=y===-.39?.94:.8;
      path([project(-r,y,r),project(r,y,r),project(r,y,-r)]);ctx.strokeStyle="#76b90028";ctx.lineWidth=9;ctx.stroke();ctx.strokeStyle=GREEN;ctx.lineWidth=1.3;ctx.stroke();
    }
    // Transparent cage and upward columns around the core.
    for(let i=0;i<(mobile?12:30);i++){
      const x=Math.sin(i*13.1)*.66,z=Math.cos(i*5.4)*.66;
      const a=project(x,-.2,z),b=project(x,1.22+(i%5)*.09,z);
      const g=ctx.createLinearGradient(a.x,a.y,b.x,b.y);g.addColorStop(0,"#76b9003d");g.addColorStop(1,"#76b90000");line(a,b,g,i%5?1:6);
      const u=(motion*.16+i*.113)%1;dot(project(x,-.1+u*1.45,z),.8,.6);
    }
    for(const y of [-.2,.22,.66,1.08]){
      const r=.53;path([project(-r,y,-r),project(r,y,-r),project(r,y,r),project(-r,y,r)],true);ctx.strokeStyle="#76b90042";ctx.lineWidth=.6;ctx.stroke();
    }
    const cube=box(.35,.06,.78,true);
    // Fine digital grain sits on the visible cube faces.
    ctx.fillStyle="#76b900";
    for(let i=0;i<(mobile?180:560);i++){
      const u=(Math.sin(i*127.1)*43758.5)%1;const v=(Math.sin(i*311.7)*19642.3)%1;
      const p=i%2?project(Math.abs(u)*.7-.35,.06+Math.abs(v)*.72,.352):project(.352,.06+Math.abs(v)*.72,Math.abs(u)*.7-.35);
      ctx.globalAlpha=reveal*(.07+(i%7)*.035);ctx.fillRect(p.x,p.y,i%13?1:2,i%13?1:2);
    }
    ctx.globalAlpha=reveal;
    // Brand glyph on front face, transformed onto its plane.
    const origin=project(-.35,.78,.354),right=project(.35,.78,.354),down=project(-.35,.06,.354);
    ctx.save();ctx.transform((right.x-origin.x)/100,(right.y-origin.y)/100,(down.x-origin.x)/100,(down.y-origin.y)/100,origin.x,origin.y);
    ctx.font="700 65px Arial, sans-serif";ctx.textAlign="center";ctx.fillStyle="#d4ff98";ctx.shadowColor=GREEN;ctx.shadowBlur=15;ctx.fillText("N",50,73);ctx.restore();
    [cube.a,cube.b,cube.c,cube.d,cube.cc,cube.dd].forEach(p=>dot(p,2,.9));
    // Orbiting data paths connect the core to status panels.
    for(let ring=0;ring<2;ring++){
      const points=[];for(let i=0;i<=100;i++){const a=i/100*Math.PI*2;points.push(project(Math.cos(a)*(1.12+ring*.18),.1+Math.sin(a)*.14,Math.sin(a)*(.88+ring*.18)));}
      path(points);ctx.strokeStyle="#76b90055";ctx.lineWidth=.8;ctx.stroke();
      const a=motion*.23+ring*2.6;dot(project(Math.cos(a)*(1.12+ring*.18),.1+Math.sin(a)*.14,Math.sin(a)*(.88+ring*.18)),2,.9);
    }
    const panel=(x:number,y:number,label:string,score:string,warn=false)=>{
      const w=s*(mobile?.56:.65),h=w*.59;
      const text = (value: string, x: number, y: number, maxWidth: number) => {
        const font = ctx.font;
        const pixels = Number.parseFloat(font);
        const width = ctx.measureText(value).width;
        if (width > maxWidth && Number.isFinite(pixels)) ctx.font = font.replace(/^[\d.]+px/, `${Math.max(7, pixels * maxWidth / width)}px`);
        ctx.fillText(value, x, y);
        ctx.font = font;
      };
      const target=project(x>cx?.4:-.4,.42,0);
      path([{x:x+w/2,y:y+h}, {x:x+w/2,y:y+h+12},target]);ctx.strokeStyle="#76b90065";ctx.lineWidth=.7;ctx.stroke();dot(target,1.6);
      ctx.save();ctx.translate(x,y);ctx.transform(1,x>cx?.12:-.045,0,1,0,0);
      ctx.beginPath();ctx.roundRect(0,0,w,h,7);ctx.fillStyle="#050d09eb";ctx.fill();ctx.strokeStyle="#76b90088";ctx.lineWidth=.8;ctx.stroke();
      ctx.strokeStyle="#76b90088";ctx.strokeRect(11,12,23,26);ctx.font=`${Math.max(9,w*.075)}px ${fontFamily}`;ctx.fillStyle="#deebda";text(visualText(copy,label as Parameters<typeof visualText>[1]) || label,43,29,w-92);ctx.textAlign="right";ctx.fillText(score,w-18,28);
      ctx.fillStyle=warn?"#e9da57":GREEN;ctx.font=`${Math.max(7,w*.055)}px ${fontFamily}`;ctx.fillText(visualText(copy,warn?"WARN":"PASS") || (warn?"WARN":"PASS"),w-13,43);ctx.textAlign="left";
      ctx.fillStyle="#9eafa1";ctx.font=`${Math.max(7,w*.056)}px ${fontFamily}`;text(visualText(copy,label==='Retrieval'?'Connects to your':label==='Eval'?'Tests real-world':'Takes action'),12,h*.65,w*.56);text(visualText(copy,label==='Retrieval'?' data, securely.':label==='Eval'?'performance.':'inside your tools.'),12,h*.8,w*.56);
      for(let i=0;i<11;i++){const bar=8+Math.sin(i*.8+motion*.6)**2*17;ctx.fillStyle=i%3?"#76b900":"#76b900";ctx.fillRect(w*.65+i*w*.024,h-12-bar,w*.012,bar);}
      // Small system symbol.
      ctx.strokeStyle=GREEN;ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(22,21,6,3,0,0,Math.PI*2);ctx.moveTo(16,21);ctx.lineTo(16,31);ctx.ellipse(22,31,6,3,0,0,Math.PI);ctx.lineTo(28,21);ctx.stroke();ctx.restore();
    };
    panel(cx-s*1.17,cy-s*.8,"Retrieval","0.94");
    panel(cx+s*.58,cy-s*.94,"Eval","0.97");
    if(!mobile)panel(cx+s*.8,cy-s*.27,"Agent","0.83",true);
    ctx.restore();
  }
  return {draw,dispose:()=>{ /* No external resources or additional frame loop. */ }};
}


