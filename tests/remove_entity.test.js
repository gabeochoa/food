const fs=require('fs'),vm=require('vm'); const ctx={console,createVector:(x,y)=>({x,y}),color:()=>({})}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(__dirname+'/../ec.js','utf8'),ctx);
vm.runInContext(`entities={}; const e1=new Entity(0,0,[CT.CircleRenderer,CT.IsItem]); entities[e1.id]=e1; const k=new Entity(1,1,[CT.CircleRenderer]); entities[k.id]=k; remove_entity(e1.id); if(entities[e1.id]) throw new Error('not deleted'); if(EC.CircleRenderer.includes(e1.id)) throw new Error('EC lists removed'); if(!EC.CircleRenderer.includes(k.id)) throw new Error('kept lost');`,ctx);
console.log('remove_entity ok');
