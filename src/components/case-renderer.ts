import type { createHomeNeuralRenderer } from './home-neural-renderer';
type Frame=Parameters<ReturnType<typeof createHomeNeuralRenderer>['draw']>[0];
export function createCaseRenderer(){
 function draw(f:Frame){
  const {ctx,mobile}=f,t=f.reduced?0:f.time,s=f.size*(mobile?.9:1.03)*.85,cx=f.centerX-f.size*(mobile?.9:1.03)*.12,cy=f.centerY;
  const yaw=-.25+f.rotationX+t*.035,co=Math.cos(yaw),si=Math.sin(yaw);
  type P={x:number;y:number;z:number};
  const project=(x:number,y:number,z:number):P=>{const rx=x*co-z*si,rz=x*si+z*co;return {x:cx+rx*s,y:cy+(y*.8+rz*.32+f.rotationY*rx)*s,z:rz};};
  const point=(u:number,phase:number,offset=0)=>{const a=u*Math.PI*2.6+phase+t*.08,r=.2+u*.78,y=Math.sin(a)*r*.78;return project(Math.cos(a)*r,y+offset,Math.sin(a*1.5)*.3);};
  const stroke=(ps:P[],color:string,width=.6)=>{ctx.beginPath();ps.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke();};
  const dot=(p:P,r=1)=>{ctx.fillStyle='#c5ff8b';ctx.beginPath();ctx.arc(p.x,p.y,r,0,Math.PI*2);ctx.fill();};
  const flare=(p:P,r=10)=>{const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,r);g.addColorStop(0,'#d8ffac');g.addColorStop(.12,'#76b900aa');g.addColorStop(1,'#76b90000');ctx.fillStyle=g;ctx.fillRect(p.x-r,p.y-r,r*2,r*2);};
  ctx.save();ctx.globalAlpha=f.reduced?1:Math.min(1,f.time/1.4);
  const halo=ctx.createRadialGradient(cx,cy,0,cx,cy,s*1.5);halo.addColorStop(0,'#76b9002a');halo.addColorStop(1,'#76b90000');ctx.fillStyle=halo;ctx.fillRect(0,0,f.width,f.height);
  for(let j=0;j<(mobile?12:30);j++){const ps=[];for(let i=0;i<=80;i++){const u=i/80;ps.push({x:cx-s*3.5+u*s*5.5,y:cy+Math.sin(u*7+j*.1+t*.1)*s*.25+(j-15)*s*.027,z:0});}stroke(ps,'#76b90030',.5);if(j%4===0)dot(ps[Math.floor((t*.07+j*.17)%1*80)],1.1);}
  for(let layer=0;layer<3;layer++){
   for(let filament=0;filament<(mobile?6:16);filament++){
    const ps=[];for(let i=0;i<=180;i++)ps.push(point(i/180,layer*Math.PI*2/3,(filament-8)*.006));
    if(filament===8){stroke(ps,'#76b90020',12);stroke(ps,'#76b90050',4);}
    stroke(ps,filament%4?'#76b90055':'#d5ff9fbb',filament%4?.45:1);
   }
  }
  for(let i=0;i<(mobile?300:1000);i++){
   const u=(i*.618033988+t*.008)%1,phase=i%3*Math.PI*2/3,p=point(u,phase,Math.sin(i*17.3)*.075);dot(p,i%13?.55:1.4);if(i%87===0)flare(p,9);
  }
  for(let i=0;i<(mobile?35:90);i++){const x=Math.sin(i*7.3)*1.05,z=Math.cos(i*11.2)*1.05;stroke([project(x,-1.1,z),project(x,1.1,z)],'#76b90026',.5);dot(project(x,-1.1+((t*.12+i*.13)%1)*2.2,z),.9);}
  for(let k=0;k<4;k++){const ps=[];for(let i=0;i<=120;i++){const a=i/120*Math.PI*2;ps.push(project(Math.cos(a)*(1.15+k*.08),Math.sin(a)*.2+(k-1.5)*.15,Math.sin(a)*(1+k*.05)));}stroke(ps,'#76b90055',.6);flare(ps[Math.floor((t*.04+k*.22)%1*120)],9);}
  ctx.restore();
 }
 return {draw,dispose:()=>{}};
}


