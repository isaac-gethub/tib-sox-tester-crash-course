/* Deep links: ?open=<file name>&n=<item number>&back=1 opens that item after sign-in, with a Back button to the Contents Directory. */
(function(){
'use strict';
/* Always fetch the newest copy of a document: a signed link is a new address each time, so the browser and CDN cannot serve an old upload. */
try{var _gb=window.getBlob;if(typeof _gb==='function'){window.getBlob=async function(f){
  try{var u=await sb.storage.from(BUCKET).createSignedUrl(f.name,300);
    if(u&&u.data&&u.data.signedUrl){var r=await fetch(u.data.signedUrl,{cache:'no-store'});if(r.ok)return await r.blob()}}catch(e){}
  return _gb(f)}}}catch(e){}
var DIR='TIB_SOX_Crash_Course_App_Contents_Directory.docx';
var back=false,pending=null,tries=0,spot=null;
function parse(q){
  var p=new URLSearchParams(q||'');var o=p.get('open');if(!o)return null;
  return {name:o,n:p.get('n')||'',back:p.get('back')==='1'};
}
function find(name,n){
  if(typeof FILES==='undefined')return null;var f=null,i;
  for(i=0;i<FILES.length;i++)if(FILES[i].name===name&&(!n||FILES[i].num===n)){f=FILES[i];break}
  if(!f)for(i=0;i<FILES.length;i++)if(FILES[i].name===name){f=FILES[i];break}
  if(!f&&n)for(i=0;i<FILES.length;i++)if(FILES[i].num===n){f=FILES[i];break}
  return f;
}
function ready(){return typeof S!=='undefined'&&S.email&&typeof FILES!=='undefined'&&typeof renderAll==='function'&&typeof select==='function'&&document.querySelector('#tree .tnode, #tree .rnode')}
function show(f){
  try{S.f.q='';var q=document.getElementById('q');if(q)q.value='';
    var h=document.getElementById('homeBar');if(h&&typeof hideHome==='function')hideHome();
    S.sec=f.sec;renderAll();S.userPick=true;select(S.view.indexOf(f));
    var hm=document.getElementById('home');if(hm)hm.hidden=true;
    document.body.classList.remove('tree-open');return true}catch(e){return false}
}
function bar(on,fromWord){
  var b=document.getElementById('dlBack'),mode=fromWord?'word':'app';
  if(!on){if(b)b.remove();return}
  if(b&&b.dataset.mode===mode)return;
  if(b)b.remove();
  b=document.createElement('div');b.id='dlBack';b.dataset.mode=mode;
  b.innerHTML=fromWord?'<button type="button" data-dl="word">✕ Done: close this tab and return to Word</button>':'<button type="button" data-dl="back">← Back to the Contents Directory</button>';
  var tb=document.querySelector('header .toolbar');
  if(tb){tb.appendChild(b);return}
  document.body.appendChild(b);
}
function open(name,n,wantBack,fromWord){
  var f=find(name,n);if(!f)return false;
  if(f.type==='link'){window.open(f.name,'_blank','noopener');return true}
  if(!show(f))return false;
  back=!!wantBack&&f.name!==DIR;bar(back,back&&!!fromWord);return true;
}
function scroller(el){
  var n=el.parentElement;
  while(n&&n!==document.body){var o=getComputedStyle(n).overflowY;if((o==='auto'||o==='scroll')&&n.scrollHeight>n.clientHeight)return n.scrollTop;n=n.parentElement}
  return window.pageYOffset||0;
}
function restore(){
  if(!spot)return;var sp=spot,k=0;
  (function go(){
    var pv=document.getElementById('preview'),a=null;
    if(pv){var L=pv.querySelectorAll('a[href*="open="]');for(var i=0;i<L.length;i++)if(L[i].getAttribute('href')===sp.href){a=L[i];break}}
    if(a){a.scrollIntoView({block:'center'});a.classList.add('dlspot');setTimeout(function(){a.classList.remove('dlspot')},2500);return}
    if(++k<40)setTimeout(go,250);
  })();
}
function css(){
  if(document.getElementById('dlCss'))return;
  var s=document.createElement('style');s.id='dlCss';
  s.textContent='#dlBack{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-left:8px}'
  +'#dlBack button{background:#fff;color:#d00000;border:2px solid #d00000;border-radius:20px;padding:7px 14px;font-weight:800;cursor:pointer;white-space:nowrap;box-shadow:0 0 0 2px rgba(255,255,255,.55)}'
  +'#dlBack button:hover{background:#d00000;color:#fff}'
  +'.dlspot{outline:3px solid #d00000;outline-offset:3px;border-radius:4px;transition:outline-color 2s}'
  +'body>#dlBack{position:fixed;top:96px;left:50%;transform:translateX(-50%);z-index:9997;background:#10243f;padding:6px 10px;border-radius:22px}'
  +'@media (max-width:600px){#dlBack{flex-basis:100%;margin:6px 0 0}#dlBack button{padding:7px 11px;font-size:13px;white-space:normal}}';
  document.head.appendChild(s);
}
function tick(){
  if(!pending)return;
  if(++tries>600){pending=null;return}
  if(ready()){var p=pending;pending=null;if(!open(p.name,p.n,p.back,true)){pending=p;setTimeout(tick,500)}return}
  setTimeout(tick,500);
}
function init(){
  css();
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href*="open="]');
    if(a&&a.closest('#preview')){var p=parse(a.search);if(p){e.preventDefault();e.stopPropagation();spot={href:a.getAttribute('href'),top:scroller(a)};open(p.name,p.n,true);return}}
    var b=e.target.closest&&e.target.closest('[data-dl]');if(!b)return;
    if(b.dataset.dl==='back'){open(DIR,'',false);bar(false);back=false;restore()}
    else if(b.dataset.dl==='word'){try{window.close()}catch(x){}
      setTimeout(function(){var w=document.querySelector('#dlBack button');if(w)w.textContent='Press Ctrl+W to close this tab and return to Word'},400)}
    else bar(false);
  },true);
  pending=parse(location.search);
  if(pending)tick();
}
if(document.body)init();else document.addEventListener('DOMContentLoaded',init);
})();
