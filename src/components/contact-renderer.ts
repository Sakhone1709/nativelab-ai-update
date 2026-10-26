import type { createHomeNeuralRenderer } from './home-neural-renderer';
type Frame=Parameters<ReturnType<typeof createHomeNeuralRenderer>['draw']>[0];
const TAU=Math.PI*2;
export function createContactRenderer(){
 const nodes=Array.from({length:340},(_,i)=>{const y=1-i/339*2,r=Math.sqrt(1-y*y),a=i*2.399963;return {x:Math.cos(a)*r,y,z:Math.sin(a)*r};});
 const links:number[][]=[];for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){const a=nodes[i],b=nodes[j];if((a.x-b.x)**2+(a.y-b.y)**2+(a.z-b.z)**2<.065)links.push([i,j]);}
 function draw(f:Frame){
  const {ctx,mobile}=f,t=f.reduced?0:f.time,s=f.size*(mobile?.9:.82)*.85,cx=f.centerX-(mobile?0:f.size*.82*.1),cy=f.centerY-(mobile?0:8);
  const a=t*.07+f.rotationX,co=Math.cos(a),si=Math.sin(a);
  type P={x:number;y:number;z:number};
  const project=(x:number,y:number,z:number):P=>{const rx=x*co-z*si,rz=x*si+z*co;return {x:cx+rx*s,y:cy+(y+f.rotationY*rz)*s,z:rz};};
  const line=(ps:P[],color:string,w=.6)=>{ctx.beginPath();ps.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.strokeStyle=color;ctx.lineWidth=w;ctx.stroke();};
  const flare=(p:P,r:number,alpha=1)=>{const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,r);g.addColorStop(0,`rgba(226,255,186,${alpha})`);g.addColorStop(.13,`rgba(118,185,0,${alpha*.8})`);g.addColorStop(1,'#76b90000');ctx.fillStyle=g;ctx.fillRect(p.x-r,p.y-r,r*2,r*2);};
  ctx.save();ctx.globalAlpha=f.reduced?1:Math.min(1,f.time/1.4);
  const halo=ctx.createRadialGradient(cx,cy,0,cx,cy,s*1.65);halo.addColorStop(0,'#76b90024');halo.addColorStop(.6,'#76b9000c');halo.addColorStop(1,'#76b90000');ctx.fillStyle=halo;ctx.fillRect(0,0,f.width,f.height);
  // Perspective floor and illuminated concentric landing platform.
  const baseY=cy+s*1.08;
  for(let i=-9;i<=9;i++){line([{x:cx+i*s*.13,y:baseY,z:0},{x:cx+i*s*.55,y:f.height,z:0}],'#76b90025');}
  for(let i=0;i<8;i++){const y=baseY+(i/7)**2*(f.height-baseY);line([{x:0,y,z:0},{x:f.width,y,z:0}],'#76b90022');}
  ctx.save();ctx.shadowColor='#76b900';ctx.shadowBlur=9;
  for(let k=7;k>=0;k--){ctx.beginPath();ctx.ellipse(cx,baseY+k*2,s*(.32+k*.13),s*(.045+k*.014),0,0,TAU);ctx.fillStyle=k===6?'#071009e8':'#10251b12';ctx.fill();ctx.strokeStyle=k%3?'#76b90066':'#d5ff9fcc';ctx.lineWidth=k%3?.65:1.6;ctx.stroke();}ctx.restore();flare({x:cx,y:baseY,z:0},48,.65);
  // Curved incoming streams narrow into the globe's near hemisphere.
  for(let j=0;j<(mobile?12:30);j++){const ps=[];for(let i=0;i<=90;i++){const u=i/90;ps.push({x:cx-s*3.8+u*s*3.2,y:cy+(Math.sin(u*5+j*.1+t*.15)*s*.3+(j-15)*s*.035)*(1-u*.7),z:0});}line(ps,'#76b9003d',.55);const u=(t*.13+j*.13)%1;if(j%4===0)flare(ps[Math.floor(u*90)],4,.7);}
  const ps=nodes.map(n=>project(n.x,n.y,n.z));
  for(const [i,j]of links){const p=ps[i],q=ps[j],front=p.z<0;line([p,q],front?'#b5ff786f':'#76b90029',front?.65:.4);}
  ctx.save();ctx.beginPath();for(const [i,j]of links){const p=ps[i],q=ps[j];if(p.z>0)continue;ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);}ctx.shadowColor='#76b900';ctx.shadowBlur=5;ctx.strokeStyle='#c5ff8b66';ctx.lineWidth=.7;ctx.stroke();ctx.restore();
  for(let i=0;i<ps.length;i+=mobile?2:1){const p=ps[i],front=p.z<0;ctx.fillStyle=front?'#cbff94':'#76b90088';ctx.beginPath();ctx.arc(p.x,p.y,front?1.15:.7,0,TAU);ctx.fill();if(i%11===0)flare(p,front?10:5,front?.9:.4);}
  // Dense rim points maintain the luminous silhouette without a solid ball.
  for(let i=0;i<(mobile?400:1200);i++){const y=1-i/(mobile?399:1199)*2,r=Math.sqrt(1-y*y),a=i*2.399963,p=project(Math.cos(a)*r,y,Math.sin(a)*r);ctx.fillStyle=p.z<0?'#76b90099':'#76b90044';ctx.fillRect(p.x,p.y,.7,.7);}
  for(let k=0;k<4;k++){const orbit=[];for(let i=0;i<=160;i++){const a=i/160*TAU,r=1.13+k*.06;orbit.push(project(Math.cos(a)*r,Math.sin(a)*(.15+k*.17),Math.sin(a)*r));}line(orbit,k%2?'#d4ff9888':'#76b90066',.75);flare(orbit[Math.floor((t*.045+k*.23)%1*160)],8,.9);}
  for(let k=0;k<(mobile?8:20);k++){const pair=links[(k*59)%links.length],p=ps[pair[0]],q=ps[pair[1]],u=(t*.2+k*.13)%1;flare({x:p.x+(q.x-p.x)*u,y:p.y+(q.y-p.y)*u,z:0},7,.85);}
  ctx.restore();
 }
 return {draw,dispose:()=>{}};
}
