/* ---------------- REFERENCE SHEET BUILDER ---------------- */
/* Layouts follow the side-chat briefs. Rects are fractions of the area inside the margin. */
(function(){
const $=id=>document.getElementById(id);
const W=1440,H=2560,M=36,G=24;
const R=(x,y,w,h,n,hint)=>({x,y,w,h,n,hint});
const T={
 char:{title:"Character Reference Sheet",file:"1-character.png",who:"Character",
  sub:"6 views of the same person on a plain background. The two face close-ups are big because Flow uses them to recognize the person.",
  slots:[R(0,0,.25,.58,"Full body, front","Head to toe, facing the camera."),R(.25,0,.25,.58,"Full body, 3/4","Turned halfway."),R(.5,0,.25,.58,"Side profile","Full body, from the side."),R(.75,0,.25,.58,"Back view","Full body, from behind."),R(0,.58,.5,.42,"Face close-up, front","Big and sharp, looking at the camera."),R(.5,.58,.5,.42,"Face close-up, 3/4","Face turned halfway.")]},
 expr:{title:"Expression Sheet",file:"1b-character-expressions.png",who:"Character",
  sub:"Optional extra: 6 face close-ups of the same person with different expressions. It helps the face stay the same while the person talks and reacts.",
  slots:[R(0,0,.5,1/3,"Neutral","Relaxed, mouth closed."),R(.5,0,.5,1/3,"Smiling","Friendly, natural smile."),R(0,1/3,.5,1/3,"Laughing","Open, real laugh."),R(.5,1/3,.5,1/3,"Surprised","Eyebrows up, the “wow” moment."),R(0,2/3,.5,1/3,"Talking","Caught mid-sentence, mouth open."),R(.5,2/3,.5,1/3,"Thinking","Looking aside, unsure or curious.")]},
 product:{title:"Product Reference Sheet",file:"2-product.png",who:"Product",
  sub:"Your product from every side, one hand shot for size, and close-ups of the label and details. Use your real product photos only.",
  slots:[R(0,0,.5,.34,"Front","Label facing the camera."),R(.5,0,.5,.34,"Rear","The back of the product."),R(0,.34,1/3,.22,"Left side",""),R(1/3,.34,1/3,.22,"Right side",""),R(2/3,.34,1/3,.22,"Top","From above: cap, buttons or opening."),R(0,.56,.5,.44,"In hand","Held in a hand, to show the real size."),R(.5,.56,.5,.22,"Close-up 1","Logo or label text, sharp and readable."),R(.5,.78,.5,.22,"Close-up 2","Buttons, cap, texture or another key detail.")]},
 location:{title:"Location Reference Sheet",file:"3-location.png",who:"Location",
  sub:"The place only: no people, no product, no text. Take every photo in the same light and at the same time of day.",
  slots:[R(0,0,1,.36,"Main view","Where the person will stand or sit."),R(0,.36,.5,.3,"Other angle","The same spot from another side."),R(.5,.36,.5,.3,"Wide view","As much of the room as possible."),R(0,.66,1/3,.34,"Area 1","An important corner, desk, shelf or window."),R(1/3,.66,1/3,.34,"Area 2",""),R(2/3,.66,1/3,.34,"Area 3","")]}
};
const BGS=[["#e8e6e1","Light grey"],["#ffffff","White"],["#2b2a28","Dark grey"]];
const data={};let key=null,sel=0,drag=null,armed=false,raf=0;
const cv=$("rsCv"),ctx=cv.getContext("2d"),dlg=$("rs"),fin=$("rsFile");
let pick=0;

const st=()=>data[key]||(data[key]={bg:BGS[0][0],p:T[key].slots.map(()=>null)});
function px(r){
 const iw=W-2*M,ih=H-2*M;
 const x=M+r.x*iw+G/2,y=M+r.y*ih+G/2;
 return {x,y,w:r.w*iw-G,h:r.h*ih-G};
}
function geo(p,b){
 const iw=p.img.naturalWidth,ih=p.img.naturalHeight;
 const base=p.fit?Math.min(b.w/iw,b.h/ih):Math.max(b.w/iw,b.h/ih);
 const dw=iw*base*p.zoom,dh=ih*base*p.zoom;
 return {dw,dh,mx:Math.abs(dw-b.w)/2,my:Math.abs(dh-b.h)/2};
}
function clamp(p,b){const g=geo(p,b);p.ox=Math.max(-g.mx,Math.min(g.mx,p.ox));p.oy=Math.max(-g.my,Math.min(g.my,p.oy))}
function rr(c,x,y,w,h,r){c.beginPath();if(c.roundRect)c.roundRect(x,y,w,h,r);else c.rect(x,y,w,h)}
function light(hex){const n=parseInt(hex.slice(1),16);return ((n>>16)*299+((n>>8)&255)*587+(n&255)*114)/1000>140}
function draw(c,preview){
 const S=st(),t=T[key],lt=light(S.bg);
 c.fillStyle=S.bg;c.fillRect(0,0,W,H);
 t.slots.forEach((r,i)=>{
  const b=px(r),p=S.p[i];
  if(p){
   const g=geo(p,b);
   c.save();rr(c,b.x,b.y,b.w,b.h,14);c.clip();
   c.drawImage(p.img,b.x+(b.w-g.dw)/2+p.ox,b.y+(b.h-g.dh)/2+p.oy,g.dw,g.dh);
   c.restore();
  }else if(preview){
   c.save();rr(c,b.x,b.y,b.w,b.h,14);c.fillStyle=lt?"rgba(0,0,0,.05)":"rgba(255,255,255,.06)";c.fill();
   c.setLineDash([18,12]);c.lineWidth=4;c.strokeStyle=lt?"rgba(0,0,0,.28)":"rgba(255,255,255,.3)";c.stroke();c.restore();
   c.fillStyle=lt?"rgba(0,0,0,.55)":"rgba(255,255,255,.7)";c.textAlign="center";c.textBaseline="middle";
   const fs=Math.max(26,Math.min(44,b.w/9));
   c.font=`600 ${fs}px -apple-system,Segoe UI,Roboto,sans-serif`;wrap(c,r.n,b.x+b.w/2,b.y+b.h/2-fs*.7,b.w-40,fs*1.2);
   c.font=`400 ${fs*.7}px -apple-system,Segoe UI,Roboto,sans-serif`;c.fillText("+ add photo",b.x+b.w/2,b.y+b.h/2+fs*.9);
  }
  /* small panel number, the only text on the sheet */
  if(!p&&!preview)return;
  const cx=b.x+40,cy=b.y+40;
  c.beginPath();c.arc(cx,cy,24,0,Math.PI*2);c.fillStyle="rgba(20,20,20,.62)";c.fill();
  c.fillStyle="#fff";c.font="700 26px -apple-system,Segoe UI,Roboto,sans-serif";c.textAlign="center";c.textBaseline="middle";c.fillText(String(i+1),cx,cy+1);
  if(preview&&i===sel){c.save();rr(c,b.x-3,b.y-3,b.w+6,b.h+6,16);c.lineWidth=8;c.strokeStyle=getComputedStyle(document.documentElement).getPropertyValue("--accent")||"#b0501f";c.stroke();c.restore()}
 });
}
function wrap(c,txt,x,y,maxW,lh){
 const words=txt.split(" "),lines=[];let l="";
 words.forEach(w=>{const tt=l?l+" "+w:w;if(c.measureText(tt).width>maxW&&l){lines.push(l);l=w}else l=tt});lines.push(l);
 lines.forEach((ln,i)=>c.fillText(ln,x,y-(lines.length-1-i)*lh));
}
function paint(){cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>draw(ctx,true))}

function ui(){
 const S=st(),t=T[key];
 $("rsSlots").innerHTML=t.slots.map((r,i)=>{const p=S.p[i];return `<li><button type="button" data-slot="${i}" aria-current="${i===sel}"><span class="th" style="${p?`background-image:url('${p.url}')`:""}">${p?"":i+1}</span><span><span class="nm">${i+1} · ${r.n}</span>${r.hint?`<span class="hn">${r.hint}</span>`:""}</span><span class="st${p?" ok":""}">${p?"Added ✓":"Empty"}</span></button></li>`}).join("");
 const p=S.p[sel];
 $("rsTools").hidden=!p;
 if(p){$("rsWho").textContent=`Panel ${sel+1} · ${t.slots[sel].n}`;$("rsFit").textContent=p.fit?"Fill the panel":"Show whole photo";$("rsZoom").value=p.zoom}
 $("rsBg").innerHTML=BGS.map(([c,n])=>`<button type="button" data-bg="${c}" style="background:${c}" aria-label="${n}" title="${n}" aria-pressed="${S.bg===c}"></button>`).join("");
 paint();
}
function open(k){
 key=k;sel=0;armed=false;const t=T[k];
 $("rsTitle").textContent=t.title;$("rsSub").textContent=t.sub;msg("");
 const up=t.who.toUpperCase();
 if(typeof window.RS_NEXT==="function"){
  /* A page can give its own "Then" text: return {html, send, label}; send may be empty to hide the copy box. */
  const r=window.RS_NEXT(k,t);$("rsNext").innerHTML=r.html;
  $("rsSendWrap").hidden=!r.send;if(r.send){$("rsSendLbl").textContent=r.label||"Send this";$("rsSend").textContent=r.send}
 }else if(k==="expr"){
  $("rsNext").innerHTML=`Save it as <span class="kv">${t.file}</span>. This sheet is optional and has no Handoff Card. You can attach it in the character side chat together with the 6-view sheet, and upload it to Google Flow next to the Character Reference Sheet.`;
  $("rsSendWrap").hidden=true;
 }else{
  $("rsNext").innerHTML=`Save it as <span class="kv">${t.file}</span>. You still need the <b>${t.who} Handoff Card</b>: open a new chat, paste ChatGPT's ${t.who} Brief, add the message below under it, attach your PNG${k==="product"?" (and your product photos)":""} and send. Then take the sheet and the card back to the main chat as usual.`;
  $("rsSendWrap").hidden=false;$("rsSendLbl").textContent="Add under the brief in the side chat";
  $("rsSend").textContent=`I already made my ${t.title} from my own photos. It is attached. Do not generate or redraw a new sheet. Treat the attached image as the approved ${t.title}${k==="location"?" and the PRIMARY LOCATION REFERENCE":""}. Check it against the rules in this brief, then give me the ${up} HANDOFF CARD. If anything in the image breaks a rule, tell me which panel to fix.`;
 }
 ui();
 if(!dlg.open)dlg.showModal();
}
function msg(t,ok){const m=$("rsMsg");m.textContent=t;m.classList.toggle("ok",!!ok)}

function load(file){
 return new Promise(res=>{
  if(!file||!/^image\//.test(file.type)&&!/\.(jpe?g|png|webp|gif|bmp|avif|heic)$/i.test(file.name))return res(null);
  const url=URL.createObjectURL(file),img=new Image();
  img.onload=()=>res({img,url,fit:false,zoom:1,ox:0,oy:0});
  img.onerror=()=>{URL.revokeObjectURL(url);res(null)};
  img.src=url;
 });
}
async function place(files,start){
 const S=st(),n=S.p.length;files=[...files];let bad=0,i=start,first=true;
 for(const f of files){
  if(!first){let k=0;while(k<n&&S.p[i]){i=(i+1)%n;k++}if(k>=n)break}
  const p=await load(f);
  if(!p){bad++;continue}
  if(S.p[i])URL.revokeObjectURL(S.p[i].url);
  S.p[i]=p;sel=i;first=false;i=(i+1)%n;
 }
 armed=false;
 msg(bad?`${bad} file${bad>1?"s":""} could not be opened. Use JPG, PNG or WebP (on iPhone, share the photo as "Most Compatible").`:"");
 ui();
}
function hit(e){
 const b=cv.getBoundingClientRect(),x=(e.clientX-b.left)/b.width*W,y=(e.clientY-b.top)/b.height*H;
 return T[key].slots.findIndex(r=>{const q=px(r);return x>=q.x&&x<=q.x+q.w&&y>=q.y&&y<=q.y+q.h});
}
cv.addEventListener("pointerdown",e=>{
 const i=hit(e);if(i<0)return;sel=i;const p=st().p[i];
 drag={i,sx:e.clientX,sy:e.clientY,ox:p?p.ox:0,oy:p?p.oy:0,moved:false};
 cv.setPointerCapture(e.pointerId);ui();
});
cv.addEventListener("pointermove",e=>{
 if(!drag)return;const p=st().p[drag.i];const dx=e.clientX-drag.sx,dy=e.clientY-drag.sy;
 if(Math.abs(dx)+Math.abs(dy)>4)drag.moved=true;
 if(!p||!drag.moved)return;
 const k=W/cv.getBoundingClientRect().width;p.ox=drag.ox+dx*k;p.oy=drag.oy+dy*k;clamp(p,px(T[key].slots[drag.i]));paint();
});
cv.addEventListener("pointerup",()=>{if(drag&&!drag.moved&&!st().p[drag.i]){pick=drag.i;fin.click()}drag=null});
cv.addEventListener("pointercancel",()=>{drag=null});
cv.addEventListener("dragover",e=>{e.preventDefault();cv.classList.add("drop")});
cv.addEventListener("dragleave",()=>cv.classList.remove("drop"));
cv.addEventListener("drop",e=>{e.preventDefault();cv.classList.remove("drop");const i=hit(e);if(e.dataTransfer.files.length)place(e.dataTransfer.files,i<0?sel:i)});
fin.addEventListener("change",()=>{if(fin.files.length)place(fin.files,pick);fin.value=""});

dlg.addEventListener("click",e=>{
 const s=e.target.closest("[data-slot]");
 if(s){sel=+s.dataset.slot;if(!st().p[sel]){pick=sel;fin.click()}ui();return}
 const bg=e.target.closest("[data-bg]");if(bg){st().bg=bg.dataset.bg;ui();return}
 if(e.target===dlg)dlg.close();
});
document.addEventListener("click",e=>{const b=e.target.closest("[data-rs]");if(b)open(b.dataset.rs)});
$("rsClose").onclick=()=>dlg.close();
$("rsAdd").onclick=()=>{const S=st(),i=S.p.findIndex(p=>!p);pick=i<0?sel:i;fin.click()};
$("rsRep").onclick=()=>{pick=sel;fin.click()};
$("rsFit").onclick=()=>{const p=st().p[sel];p.fit=!p.fit;p.zoom=1;p.ox=p.oy=0;ui()};
$("rsReset").onclick=()=>{const p=st().p[sel];p.zoom=1;p.ox=p.oy=0;ui()};
$("rsZoom").oninput=e=>{const p=st().p[sel];if(!p)return;p.zoom=+e.target.value;clamp(p,px(T[key].slots[sel]));paint()};
$("rsDel").onclick=()=>{const S=st();URL.revokeObjectURL(S.p[sel].url);S.p[sel]=null;armed=false;ui()};
$("rsDl").onclick=()=>{
 const S=st(),empty=S.p.filter(p=>!p).length;
 if(empty===S.p.length){msg("Add at least one photo first.");return}
 if(empty&&!armed){armed=true;msg(`${empty} panel${empty>1?"s are":" is"} still empty. Click Download PNG again to save it anyway.`);return}
 armed=false;
 const out=document.createElement("canvas");out.width=W;out.height=H;draw(out.getContext("2d"),false);
 out.toBlob(b=>{
  if(!b){msg("The browser could not create the PNG. Try another browser.");return}
  const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=T[key].file;document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(a.href),4000);
  msg(`Downloaded ${T[key].file} (1440 × 2560, 9:16).`,true);
 },"image/png");
};
})();
