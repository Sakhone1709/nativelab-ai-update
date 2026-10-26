import type { createHomeNeuralRenderer } from './home-neural-renderer';
type Frame=Parameters<ReturnType<typeof createHomeNeuralRenderer>['draw']>[0];

/** Deterministic points and bounded geometry keep motion calm and inexpensive. */
export function createAmbientNetworkRenderer(kind:'technology'|'contact') {
 const random=(n:number)=>{const v=Math.sin(n*127.1+311.7)*43758.5453;return v-Math.floor(v);};
 const nodes=Array.from({length:145},(_,i)=>({x:random(i*3+1),y:random(i*3+2),phase:random(i*3+3)*Math.PI*2}));
 const links: [number,number][]=[];
 nodes.forEach((p,i)=>{
  const nearest=nodes.map((q,j)=>({j,d:Math.hypot((p.x-q.x)*1.4,p.y-q.y)})).filter(q=>q.j!==i&&q.d<.19).sort((a,b)=>a.d-b.d).slice(0,3);
  nearest.forEach(({j})=>{if(!links.some(([a,b])=>a===j&&b===i))links.push([i,j]);});
 });
 function draw(f:Frame) {
  const {ctx,width:w,height:h,mobile}=f,t=f.reduced?0:f.time;
  const left=mobile?w*.04:w*.3,fieldWidth=mobile?w*.92:w*.74;
  const top=mobile?Math.max(h*.38,f.centerY-150):h*.1;
  const fieldHeight=mobile?Math.min(310,h*.42):h*.76;
  ctx.save();
  const glow=ctx.createLinearGradient(0,0,w,0);glow.addColorStop(0,'#06100500');glow.addColorStop(.5,'#31550018');glow.addColorStop(1,'#46700038');ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);
  const dot=(x:number,y:number,r:number,alpha:number)=>{
   const light=ctx.createRadialGradient(x,y,0,x,y,r*5);light.addColorStop(0,`rgba(177,232,66,${alpha})`);light.addColorStop(.25,`rgba(160,218,42,${alpha*.45})`);light.addColorStop(1,'#76b90000');ctx.fillStyle=light;ctx.fillRect(x-r*5,y-r*5,r*10,r*10);
   ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=`rgba(188,235,96,${alpha*.85})`;ctx.fill();
  };
  if(kind==='technology') {
   const count=mobile?80:nodes.length;
   const positions=nodes.slice(0,count).map(p=>({x:left+p.x*fieldWidth+Math.sin(t*.12+p.phase)*9,y:top+p.y*fieldHeight+Math.cos(t*.1+p.phase)*10}));
   for(const [i,j] of links){if(i>=count||j>=count)continue;const p=positions[i],q=positions[j];ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle='rgba(128,177,22,.2)';ctx.lineWidth=.65;ctx.stroke();}
   positions.forEach((p,i)=>dot(p.x,p.y,i%7===0?1.6:.9,.28+(Math.sin(t*.25+nodes[i].phase)+1)*.1));
  } else {
   const count=mobile?24:40;
   const point=(u:number,j:number)=>({x:w*(-.06+u*1.13),y:top+fieldHeight*(.8-u*.57+Math.sin(u*5.5+j*.025+t*.055)*.13)+(j-count/2)*fieldHeight*.013*(.35+u)});
   for(let j=0;j<count;j++) {
    ctx.beginPath();for(let k=0;k<=70;k++){const p=point(k/70,j);if(k===0)ctx.moveTo(p.x,p.y);else ctx.lineTo(p.x,p.y);}ctx.strokeStyle='rgba(124,168,22,.13)';ctx.lineWidth=.55;ctx.stroke();
    // Short trailing strokes represent light travelling along the same curve.
    for(let packet=0;packet<(mobile?1:2);packet++) {
     const u=(t*.037+j*.031+packet*.47)%1;
     ctx.beginPath();for(let k=0;k<=10;k++){const p=point(Math.max(0,u-.075+k*.0075),j);if(k===0)ctx.moveTo(p.x,p.y);else ctx.lineTo(p.x,p.y);}ctx.strokeStyle=`rgba(172,216,54,${.2+(j%4)*.065})`;ctx.lineWidth=j%4?.8:1.1;ctx.stroke();
     const p=point(u,j);dot(p.x,p.y,.9,.4);
    }
   }
  }
  ctx.restore();
 }
 return {draw,dispose:()=>{}};
}
