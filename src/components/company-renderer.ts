import type { createHomeNeuralRenderer } from './home-neural-renderer';
type Frame = Parameters<ReturnType<typeof createHomeNeuralRenderer>['draw']>[0];

// Procedural office tower. Input, visibility and timing belong to the host scene.
export function createCompanyRenderer() {
  function draw(f: Frame) {
    const {ctx,mobile}=f,s=f.size*(mobile?.82:.76)*.85,cx=f.centerX-f.size*(mobile?.82:.76)*.08,cy=f.centerY+f.size*(mobile?.82:.76)*.22;
    const t=f.reduced?0:f.time,alpha=f.reduced?1:Math.min(1,f.time/1.4);
    const angle=-.64+f.rotationX*.25+Math.sin(t*.08)*.014;
    const p=(x:number,y:number,z:number)=>({x:cx+(x*Math.cos(angle)-z*Math.sin(angle))*s,y:cy+((x*Math.sin(angle)+z*Math.cos(angle))*.43-y)*s});
    type P=ReturnType<typeof p>;
    const line=(ps:P[],color:string,w=.7,close=false)=>{ctx.beginPath();ps.forEach((q,i)=>i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y));if(close)ctx.closePath();ctx.strokeStyle=color;ctx.lineWidth=w;ctx.stroke();};
    const face=(ps:P[],fill:string,edge='#76b90055')=>{ctx.beginPath();ps.forEach((q,i)=>i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y));ctx.closePath();ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle=edge;ctx.lineWidth=.65;ctx.stroke();};
    const dot=(q:P,r=1.3)=>{const g=ctx.createRadialGradient(q.x,q.y,0,q.x,q.y,r*7);g.addColorStop(0,'#deffa9');g.addColorStop(.2,'#76b90099');g.addColorStop(1,'#76b90000');ctx.fillStyle=g;ctx.fillRect(q.x-r*7,q.y-r*7,r*14,r*14);};
    const perimeter=(r:number,y:number,color:string,w=.7)=>line([p(-r,y,-r),p(r,y,-r),p(r,y,r),p(-r,y,r)],color,w,true);
    ctx.save();ctx.globalAlpha=alpha;
    const glow=ctx.createRadialGradient(cx,cy,0,cx,cy,s*1.8);glow.addColorStop(0,'#76b90028');glow.addColorStop(1,'#76b90000');ctx.fillStyle=glow;ctx.fillRect(0,0,f.width,f.height);
    for(let i=-8;i<=8;i++){line([p(i*.22,-.86,-1.7),p(i*.22,-.86,1.7)],'#76b90020');line([p(-1.7,-.86,i*.22),p(1.7,-.86,i*.22)],'#76b90020');}
    for(let j=0;j<(mobile?10:24);j++){const ps=[];for(let i=0;i<=65;i++){const x=(i/65-.5)*5;ps.push(p(x,-.8+Math.sin(x*1.4+t*.14+j*.08)*.08,(j-12)*.045));}line(ps,j%5?'#76b90026':'#76b90055',.5);if(j%4===0)dot(ps[Math.floor((t*.08+j*.17)%1*65)],1);}

    const building=(r:number,bottom:number,top:number,floors:number,columns:number)=>{
      const a=p(-r,top,-r),b=p(r,top,-r),c=p(r,top,r),d=p(-r,top,r),aa=p(-r,bottom,-r),cc=p(r,bottom,r),dd=p(-r,bottom,r);
      face([d,c,cc,dd],'#08130fee');face([a,d,dd,aa],'#10251bf2');
      // Architectural floor slabs and recessed glass bays, drawn on both facades.
      const floorHeight=(top-bottom)/floors,bay=2*r/columns;
      for(let level=0;level<floors;level++){
        const y=bottom+level*floorHeight;
        line([p(-r,y,-r),p(-r,y,r),p(r,y,r)],level%4===0?'#91d74988':'#36533caa',level%4===0?1:.55);
        for(let col=0;col<columns;col++){
          const x=-r+col*bay+bay*.17,x2=x+bay*.65,y1=y+floorHeight*.21,y2=y+floorHeight*.76;
          for(let side=0;side<2;side++){
            const seed=level*37+col*11+side*19;
            const lit=Math.sin(seed*12.9898)>-.14;
            const pulse=f.reduced?1:.83+Math.sin(t*.55+seed)*.17;
            const fill=lit?`rgba(118,185,0,${(.19+(seed%4)*.075)*pulse})`:'#142a20';
            const ps=side?[p(-r-.001,y1,x),p(-r-.001,y1,x2),p(-r-.001,y2,x2),p(-r-.001,y2,x)]:[p(x,y1,r+.001),p(x2,y1,r+.001),p(x2,y2,r+.001),p(x,y2,r+.001)];
            face(ps,fill,'#54894b44');
          }
        }
      }
      for(let column=0;column<=columns;column++){
        const x=-r+column*bay;
        line([p(x,bottom,r+.003),p(x,top,r+.003)],'#75ab6255',.6);
        line([p(-r-.003,bottom,x),p(-r-.003,top,x)],'#75ab6255',.6);
      }
      // Corner columns, roof terrace and a thin illuminated parapet.
      line([aa,a,d,dd],'#9ee86a99',1);line([cc,c],'#76b900aa',1);
      face([a,b,c,d],'#1a331de8','#b7ed7aaa');
      perimeter(r,top,'#76b90028',7);perimeter(r,top,'#b8ef85cc',1.1);
      perimeter(r*.96,top+.035,'#76b90055',.6);
      for(let i=1;i<5;i++){const x=-r+i*r*.4;line([p(x,top,-r),p(x,top,r)],'#76b90033');line([p(-r,top,x),p(r,top,x)],'#76b90033');}
      [a,c,d].forEach(q=>dot(q,1.1));
    };
    // A stepped commercial tower: lobby podium, office wings, tower and crown.
    building(.88,-.85,-.73,1,mobile?6:12);
    building(.77,-.73,-.32,4,mobile?7:14);
    building(.6,-.29,.26,5,mobile?6:11);
    building(.35,.3,1.02,7,mobile?5:8);
    building(.23,1.055,1.17,1,4);
    // Lobby doors and canopy make the structure read as a building rather than blocks.
    face([p(-.22,-.73,.772),p(.22,-.73,.772),p(.22,-.49,.772),p(-.22,-.49,.772)],'#83c65b55','#76b900aa');
    line([p(0,-.73,.775),p(0,-.49,.775)],'#d5f5bd',.8);
    face([p(-.29,-.48,.77),p(.29,-.48,.77),p(.29,-.48,.98),p(-.29,-.48,.98)],'#254629','#76b90088');
    for(let k=0;k<3;k++)line([p(-.25,-.76-k*.025,.81+k*.065),p(.25,-.76-k*.025,.81+k*.065)],'#76b90077',1);
    // Roof antenna and mechanical equipment, with a slow warning beacon.
    line([p(0,1.17,0),p(0,1.49,0)],'#a3b8a8aa',1);
    line([p(-.07,1.35,0),p(.07,1.35,0)],'#a3b8a888',.7);
    dot(p(0,1.49,0),f.reduced?1.5:1.15+Math.sin(t*1.5)*.35);
    for(let k=0;k<3;k++){const x=-.12+k*.1;line([p(x,1.18,.1),p(x,1.23,.1),p(x+.055,1.23,.1),p(x+.055,1.18,.1)],'#9bd06c88',1);}
    // Restrained signals rise through the tower's structural core.
    for(let i=0;i<(mobile?8:18);i++){const x=Math.sin(i*5.3)*.27,z=Math.cos(i*7.1)*.27;dot(p(x,-.7+((t*.1+i*.17)%1)*1.8,z),.7);}
    ctx.restore();
  }
  return {draw,dispose:()=>{}};
}
