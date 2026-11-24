/* Help panel: step-by-step "how to use" for audio and reading. Movable, minimisable and closable. */
(function(){
'use strict';
var KEY='tibcc-help-pos',panel=null,tab=null;
var TABS=[
 ['audio','🎧 Story audio',[
  ['Open the story','Go to Project Stories and click The Thornfield File or The Northbridge Manufacturing Story. The page opens with a blue box called 🎧 Audio narration at the top.'],
  ['Press play','Press the ▶ button on the audio bar in that box. Wait a few seconds. The line under the bar says Ready, or Length and the time, when the audio has loaded.'],
  ['Pick up where you stopped','The page remembers your place. Next time it says Resumes at, and it starts from there. Press ⏮ Start over to begin again.'],
  ['Use the buttons','⏪ 30s goes back 30 seconds. 30s ⏩ goes forward 30 seconds. ⏹ Stop returns to the beginning. The speed box (0.8× to 1.5×) slows down or speeds up the voice.'],
  ['Listen with the screen off','The audio keeps playing when you open another app or lock your phone. Use the lock-screen controls to pause or skip back 30 seconds.'],
  ['Follow the words','The box marked 🔊 NOW READING shows the sentence being read. Read along as you listen.']
 ]],
 ['acts','📋 Activity list',[
  ['Open the list','Above the story, click the 📋 Activity list tab. Click 📖 Story to go back.'],
  ['Watch it follow the audio','While the story plays, the line being read is highlighted and the list scrolls to it. Untick 🎯 Follow the audio if you want to scroll on your own.'],
  ['Play from any line','Click the ▶ next to a line number. The story jumps to that point and plays from there.'],
  ['Mark your progress','On each task line, open Done? and choose Yes, In progress or No. The counter at the top shows how many tasks are done.'],
  ['Write notes','Type in the My notes box on any line. Everything saves by itself. Look for Saved ✓ at the end of the line.'],
  ['Hide finished lines','In the box at the top, choose Hide lines marked Yes to see only what is left to do.']
 ]],
 ['read','🔊 Read a document aloud',[
  ['Open the document','Click any Word document or PDF in the list. A grey bar with 🔊 Listen appears above it.'],
  ['Start and pause','Press 🔊 Listen to start. Press it again to pause, and again to carry on.'],
  ['Move around','⏪ goes back a few sentences. ⏩ goes forward a few sentences. ⏹ stops. If a list called Start from appears, use it to begin at a chapter or procedure.'],
  ['Change how it sounds','The speed box sets how fast it reads. The pause box sets the gap between sentences. The voice box lets you choose another voice.'],
  ['If it does not work','Read aloud works in Chrome and Edge. If it says the text is still loading, wait a few seconds and press 🔊 Listen again.']
 ]],
 ['where','🧭 Where do I find things?',[
  ['Which day am I on?','Open the Start here menu and read How to Use the App (the Roadmap). It tells you what to open on each of the 25 days.'],
  ['What do I do today?','Open What You Will Do. It lists every lab and exercise in order, with a link to each one.'],
  ['The first five days','Days 1 to 5 are the Prep Block (Excel, getting the data, evidence). Find them in the Days 1 to 5 menu.'],
  ['Days 6 to 25','The Foundations lessons, the course deck, the labs and the capstone are in the Days 6 to 25 menu.'],
  ['Still lost?','Open the App Orientation Guide in the Start here menu. It explains every menu in the order you use them.']
 ]]
];
function css(){
  if(document.getElementById('helpCss'))return;
  var s=document.createElement('style');s.id='helpCss';
  s.textContent='#helpFab{position:fixed;right:12px;bottom:12px;z-index:9998;background:var(--accent,#0b5cad);color:var(--accent-ink,#fff);border:0;border-radius:22px;padding:10px 14px;font-weight:700;box-shadow:0 2px 8px rgba(0,0,0,.35);cursor:pointer}'
  +'.helpbtn{background:var(--accent,#0b5cad)!important;color:var(--accent-ink,#fff)!important;border-color:var(--accent,#0b5cad)!important;font-weight:700}'
  +'#helpPanel{position:fixed;z-index:9999;width:min(400px,94vw);max-height:70vh;display:flex;flex-direction:column;background:var(--panel,#fff);color:var(--ink,#1c2430);border:2px solid var(--accent,#0b5cad);border-radius:10px;box-shadow:0 6px 24px rgba(0,0,0,.4);font-size:14px;line-height:1.4}'
  +'#helpPanel[hidden]{display:none}'
  +'#helpHead{display:flex;align-items:center;gap:6px;padding:8px 10px;background:var(--accent,#0b5cad);color:var(--accent-ink,#fff);border-radius:7px 7px 0 0;cursor:move;touch-action:none;user-select:none}'
  +'#helpHead b{flex:1}'
  +'#helpHead button{background:transparent;color:inherit;border:1px solid rgba(255,255,255,.55);border-radius:6px;padding:2px 8px;cursor:pointer}'
  +'#helpTabs{display:flex;flex-wrap:wrap;gap:4px;padding:6px 8px;border-bottom:1px solid var(--line,#e3e7ee)}'
  +'#helpTabs button{padding:4px 8px;font-size:13px;border:1px solid var(--line,#e3e7ee);background:var(--panel,#fff);color:inherit;border-radius:6px;cursor:pointer}'
  +'#helpTabs button.on{background:var(--accent,#0b5cad);color:var(--accent-ink,#fff);border-color:var(--accent,#0b5cad)}'
  +'#helpBody{overflow:auto;padding:8px 12px 12px}'
  +'#helpBody ol{margin:0;padding-left:0;list-style:none;counter-reset:h}'
  +'#helpBody li{counter-increment:h;position:relative;padding:6px 0 6px 34px;border-bottom:1px solid var(--line,#e3e7ee)}'
  +'#helpBody li:before{content:counter(h);position:absolute;left:0;top:6px;width:24px;height:24px;border-radius:50%;background:var(--soft,#e8f1fc);color:var(--accent,#0b5cad);font-weight:700;text-align:center;line-height:24px}'
  +'#helpBody li b{display:block}'
  +'#helpPanel.min #helpTabs,#helpPanel.min #helpBody{display:none}'
  +'@media (max-width:600px){#helpPanel{width:94vw;max-height:60vh}#helpFab{padding:8px 12px}}';
  document.head.appendChild(s);
}
function load(){try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){return null}}
function save(){try{if(panel)localStorage.setItem(KEY,JSON.stringify({l:panel.style.left,t:panel.style.top}))}catch(e){}}
function place(){
  var p=load(),w=panel.offsetWidth||360;
  var l=p&&p.l?parseInt(p.l,10):Math.max(8,window.innerWidth-w-12),t=p&&p.t?parseInt(p.t,10):Math.max(8,window.innerHeight-panel.offsetHeight-70);
  clamp(l,t);
}
function clamp(l,t){
  var w=panel.offsetWidth,h=Math.min(panel.offsetHeight,window.innerHeight);
  l=Math.max(0,Math.min(window.innerWidth-Math.min(w,window.innerWidth),l));t=Math.max(0,Math.min(window.innerHeight-Math.min(h,60),t));
  panel.style.left=l+'px';panel.style.top=t+'px';
}
function render(){
  var sel=TABS.filter(function(x){return x[0]===tab})[0]||TABS[0];
  document.getElementById('helpTabs').innerHTML=TABS.map(function(x){return '<button data-ht="'+x[0]+'"'+(x[0]===sel[0]?' class="on"':'')+'>'+x[1]+'</button>'}).join('');
  document.getElementById('helpBody').innerHTML='<ol>'+sel[2].map(function(s){return '<li><b>'+s[0]+'</b>'+s[1]+'</li>'}).join('')+'</ol>';
}
function build(){
  css();if(panel)return;
  panel=document.createElement('div');panel.id='helpPanel';panel.hidden=true;
  panel.innerHTML='<div id="helpHead"><b>❓ How to use this page</b><button data-hx="move" title="Move to the other side of the screen">⇄ Move</button><button data-hx="min" title="Shrink to the title bar">– Shrink</button><button data-hx="close" title="Close">✕ Hide</button></div><div id="helpTabs"></div><div id="helpBody"></div>';
  document.body.appendChild(panel);
  var head=panel.querySelector('#helpHead'),drag=null;
  head.addEventListener('pointerdown',function(e){if(e.target.closest('button'))return;drag={x:e.clientX-panel.offsetLeft,y:e.clientY-panel.offsetTop};try{head.setPointerCapture(e.pointerId)}catch(x){}});
  head.addEventListener('pointermove',function(e){if(drag)clamp(e.clientX-drag.x,e.clientY-drag.y)});
  head.addEventListener('pointerup',function(){if(drag){drag=null;save()}});
  panel.addEventListener('click',function(e){
    var b=e.target.closest('button');if(!b)return;
    if(b.dataset.ht){tab=b.dataset.ht;render();return}
    var x=b.dataset.hx;
    if(x==='close')panel.hidden=true;
    else if(x==='min')panel.classList.toggle('min');
    else if(x==='move'){var left=panel.offsetLeft<window.innerWidth/2;clamp(left?window.innerWidth-panel.offsetWidth-12:12,panel.offsetTop);save()}
  });
  window.addEventListener('resize',function(){if(!panel.hidden)clamp(panel.offsetLeft,panel.offsetTop)});
}
function open(which){
  build();
  tab=which||(document.getElementById('aud')?'audio':document.getElementById('tts')?'read':'where');
  render();panel.classList.remove('min');panel.hidden=false;place();
}
function addButtons(){
  var a=document.querySelector('#aud .row2');
  if(a&&!a.querySelector('.helpbtn'))a.insertAdjacentHTML('beforeend','<button class="helpbtn" data-help="audio" title="Step-by-step guide to the audio">❓ Help</button>');
  var t=document.getElementById('tts');
  if(t&&!t.querySelector('.helpbtn'))t.insertAdjacentHTML('beforeend','<button class="helpbtn" data-help="read" title="Step-by-step guide to read aloud">❓ Help</button>');
}
function init(){
  css();
  if(!document.getElementById('helpFab')){
    var f=document.createElement('button');f.id='helpFab';f.type='button';f.textContent='❓ Help';f.title='Step-by-step guide: audio, activity list and where to find things';document.body.appendChild(f);
  }
  document.addEventListener('click',function(e){
    var h=e.target.closest('[data-help],#helpFab');if(!h)return;
    e.stopPropagation();open(h.dataset.help||null);
  },true);
  new MutationObserver(addButtons).observe(document.body,{childList:true,subtree:true});
  addButtons();
}
if(document.body)init();else document.addEventListener('DOMContentLoaded',init);
})();
