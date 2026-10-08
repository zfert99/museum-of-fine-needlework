// Reads every puzzle grid from ../index.html and reports how many solutions each has (stops counting at 2).
// Usage: node tools/check-unique.js
const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
const P={};for(const part of html.split('{w:').slice(1)){const id=(part.match(/id:'(\w+)'/)||[])[1],g=part.match(/g:(\[[^\]]*\])/);if(id&&g&&!/gone:true/.test(part.split('g:')[0]))P[id]=JSON.parse(g[1]);}
const clue=a=>{const r=[];let n=0;for(const v of a){if(v)n++;else if(n){r.push(n);n=0}}if(n)r.push(n);return r};
function count(g){const N=10,rows=g.map(r=>clue([...r].map(c=>c!='.'))),cols=[...Array(N)].map((_,c)=>clue(g.map(r=>r[c]!='.')));
 const opts=cl=>{const out=[];(function rec(i,pos,a){if(i==cl.length){out.push(a.concat(Array(N-a.length).fill(0)));return}
  const rest=cl.slice(i+1).reduce((s,x)=>s+x+1,0);for(let p=pos;p+cl[i]+rest<=N;p++){rec(i+1,p+cl[i]+1,a.concat(Array(p-a.length).fill(0),Array(cl[i]).fill(1)).concat(i<cl.length-1?[0]:[]).slice(0,N))}})(0,0,[]);return out};
 const ro=rows.map(opts);let n=0;const grid=[];
 (function rec(r){if(n>1)return;if(r==N){for(let c=0;c<N;c++)if(clue(grid.map(x=>x[c])).join()!=cols[c].join())return;n++;return}
  for(const o of ro[r]){grid[r]=o;let ok=true;for(let c=0;c<N&&ok;c++){const pc=clue(grid.slice(0,r+1).map(x=>x[c]));const t=cols[c];
   if(pc.length>t.length)ok=false;else for(let i=0;i<pc.length-1;i++)if(pc[i]!=t[i])ok=false; if(ok&&pc.length&&pc[pc.length-1]>t[pc.length-1])ok=false}
   if(ok)rec(r+1)}grid.length=r})(0);return n}
for(const k in P)console.log(k,count(P[k]));
