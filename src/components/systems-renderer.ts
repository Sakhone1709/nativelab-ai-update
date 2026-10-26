import type { createHomeNeuralRenderer } from './home-neural-renderer';
type Frame = Parameters<ReturnType<typeof createHomeNeuralRenderer>['draw']>[0];
export function createSystemsRenderer(kind:'capabilities'|'technology') {
 const points=Array.from({length:1100},(_,i)=>{const y=1-i/1099*2,a=i*2.399963,r=Math.sqrt(1-y*y);return {x:Math.cos(a)*r,y,z:Math.sin(a)*r};});
 function draw(f:Frame){
  const {ctx,mobile}=f,t=f.reduced?0:f.time,s=f.size*(mobile?.88:kind==='technology'?.98:.85)*(kind==='technology'?.85:1),cx=f.centerX-(kind==='technology'&&!mobile?f.size*.98*.38:0),cy=f.centerY;
  const a=t*.045+f.rotationX,co=Math.cos(a),si=Math.sin(a);
  type P={x:number;y:number;z:number};
  const globe=(x:number,y:number,z:number):P=>{const rx=x*co-z*si,rz=x*si+z*co;return {x:cx+rx*s,y:cy+(y+f.rotationY*rz)*s,z:rz};};
  const iso=(x:number,y:number,z:number):P=>({x:cx+(x*.8-z*.6)*s,y:cy+(x*.17+z*.23-y)*s,z});
  const path=(p:P[],color:string,w=.6,close=false)=>{ctx.beginPath();p.forEach((q,i)=>i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y));if(close)ctx.closePath();ctx.strokeStyle=color;ctx.lineWidth=w;ctx.stroke();};
  const dot=(p:P,r=1)=>{ctx.fillStyle='#c5ff8b';ctx.beginPath();ctx.arc(p.x,p.y,r,0,Math.PI*2);ctx.fill();};
  ctx.save();ctx.globalAlpha=f.reduced?1:Math.min(1,f.time/1.4);
  const halo=ctx.createRadialGradient(cx,cy,0,cx,cy,s*1.6);halo.addColorStop(0,'#76b90030');halo.addColorStop(1,'#76b90000');ctx.fillStyle=halo;ctx.fillRect(0,0,f.width,f.height);
  // Flowing connected data streams fade before the text and CTA region.
  for(let j=0;j<(mobile?12:30);j++){const ps=[];for(let i=0;i<=90;i++){const u=i/90,x=cx-s*3.8+u*s*(kind==='capabilities'?4.1:5.6),y=cy+(Math.sin(u*8+t*.12+j*.09)*s*(kind==='capabilities'?.36:.2)+(j-15)*s*.022)*(kind==='capabilities'?1-u*.8:1);ps.push({x,y,z:0});}const g=ctx.createLinearGradient(ps[0].x,0,cx,0);g.addColorStop(0,'#76b90000');g.addColorStop(.55,'#76b90044');g.addColorStop(1,'#76b90088');ctx.beginPath();ps.forEach((q,i)=>i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y));ctx.strokeStyle=g;ctx.lineWidth=.5;ctx.stroke();if(j%3===0)dot(ps[Math.floor((t*.08+j*.17)%1*90)],1.1);}
  if(kind==='capabilities'){
   for(let layer=0;layer<3;layer++){
    const y=(layer-1)*.36,r=.72,ps=[iso(-r,y,-r),iso(r,y,-r),iso(r,y,r),iso(-r,y,r)];
    ctx.beginPath();ps.forEach((q,i)=>i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y));ctx.closePath();
    const surface=ctx.createLinearGradient(ps[0].x,ps[0].y,ps[2].x,ps[2].y);surface.addColorStop(0,'#76b90018');surface.addColorStop(.65,'#76b90030');surface.addColorStop(1,'#d5ff8d44');ctx.fillStyle=surface;ctx.fill();
    path(ps,'#76b90016',22,true);path(ps,'#76b90036',7,true);path(ps,'#d0ff91e6',1.3,true);
    for(let j=1;j<8;j++){const q=-r+j*r/4;path([iso(q,y,-r),iso(q,y,r)],'#76b90040');path([iso(-r,y,q),iso(r,y,q)],'#76b90040');}
    ps.forEach(p=>dot(p,2));
    for(let i=0;i<(mobile?35:95);i++){
     const x=Math.sin(i*127.1+layer)*r,z=Math.cos(i*311.7+layer)*r;
     const q=iso(x,y,z);dot(q,i%9?.6:1.5);
     if(i%15===0){const g=ctx.createRadialGradient(q.x,q.y,0,q.x,q.y,15);g.addColorStop(0,'#cfff9266');g.addColorStop(1,'#76b90000');ctx.fillStyle=g;ctx.fillRect(q.x-15,q.y-15,30,30);}
    }
   }
   for(let i=0;i<(mobile?35:90);i++){const x=Math.sin(i*127.1)*.92,z=Math.cos(i*311.7)*.92;path([iso(x,-.9,z),iso(x,1.15,z)],'#76b90030');dot(iso(x,-.9+((t*.12+i*.19)%1)*2,z),i%9? .7:1.6);}
  }else{
   // Illuminated latitude/longitude mesh and a transparent outer shell.
   ctx.save();ctx.shadowColor='#76b900';ctx.shadowBlur=7;
   ctx.beginPath();ctx.arc(cx,cy,s*1.035,0,Math.PI*2);ctx.strokeStyle='#76b90055';ctx.lineWidth=1;ctx.stroke();
   for(let k=0;k<12;k++){
    const ps=[];for(let j=0;j<=80;j++){const b=j/80*Math.PI*2,l=k/12*Math.PI;ps.push(globe(Math.cos(b)*Math.sin(l),Math.sin(b),Math.cos(b)*Math.cos(l)));}path(ps,'#76b90044',.55);
   }
   for(let k=-3;k<=3;k++){const y=k*.23,r=Math.sqrt(1-y*y),ps=[];for(let j=0;j<=100;j++){const a=j/100*Math.PI*2;ps.push(globe(Math.cos(a)*r,y,Math.sin(a)*r));}path(ps,'#76b90055',.6);}
   ctx.restore();
   // Coarse geographic silhouettes give the network globe a readable identity.
   const continents = [
    [[-168,65],[-135,70],[-105,52],[-82,50],[-60,30],[-83,9],[-100,22],[-125,48]],
    [[-81,12],[-50,7],[-35,-8],[-53,-33],[-70,-55],[-78,-15]],
    [[-17,35],[10,37],[35,30],[50,10],[35,-30],[18,-35],[3,-5],[-15,10]],
    [[-10,36],[-8,58],[25,70],[55,58],[90,75],[170,60],[140,35],[110,5],[80,8],[60,30],[35,40]],
    [[112,-12],[135,-10],[153,-28],[135,-40],[115,-32]],
   ];
   for(const polygon of continents){
    const ps=polygon.map(([lon,lat])=>{const l=lon*Math.PI/180+.7,b=lat*Math.PI/180;return globe(Math.cos(b)*Math.sin(l),-Math.sin(b),-Math.cos(b)*Math.cos(l));});
    if(ps.filter(p=>p.z<.25).length<ps.length*.6)continue;
    ctx.beginPath();ps.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();ctx.fillStyle='#76b90030';ctx.fill();ctx.strokeStyle='#76b90099';ctx.lineWidth=.8;ctx.stroke();
   }
   ctx.beginPath();ctx.arc(cx,cy,s,0,Math.PI*2);ctx.strokeStyle='#76b90055';ctx.lineWidth=.8;ctx.stroke();
   // Rotating point shell, local mesh and procedural continent silhouettes.
   const projected=points.map(q=>globe(q.x,q.y,q.z));
   for(let i=0;i<points.length;i+=mobile?3:1){const q=points[i],p=projected[i];ctx.globalAlpha=(f.reduced?1:Math.min(1,f.time/1.4))*(p.z>0?.23:.65);dot(p,.6);
    if(i%3===0&&i+34<points.length)path([p,projected[i+34]],'#76b90055',.5);
    const longitude=Math.atan2(q.z,q.x),latitude=Math.asin(q.y);
    const land=Math.sin(longitude*3+latitude*2)+Math.cos(latitude*7-longitude*2)*.6+Math.sin(longitude*7+latitude*5)*.25;
    if(land>.56&&Math.abs(latitude)<1.15){ctx.fillStyle=p.z>0?'#76b90033':'#76b90099';ctx.fillRect(p.x,p.y,mobile?1.5:2.4,mobile?1.5:2.4);}
   }
   ctx.globalAlpha=f.reduced?1:Math.min(1,f.time/1.4);
   ctx.save();ctx.shadowColor="#76b900";ctx.shadowBlur=10;for(let ring=0;ring<5;ring++){const ps=[];for(let i=0;i<=150;i++){const a=i/150*Math.PI*2,r=1.05+ring*.075;ps.push(globe(Math.cos(a)*r,Math.sin(a)*Math.cos(ring*.55)*.6,Math.sin(a)*Math.sin(ring*.55)*r));}path(ps,ring%2?'#d4ff98ee':'#76b900aa',1.1);dot(ps[Math.floor((t*.05+ring*.19)%1*150)],2.4);}ctx.restore();
  }
  ctx.restore();
 }
 return {draw,dispose:()=>{}};
}



