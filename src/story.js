/* Story page: orientation guide and phase navigator above each project story (injected so index.html stays unchanged) */
(function(){
var css='#storyGuide{display:none;position:fixed;z-index:1000;left:50%;top:60px;transform:translateX(-50%);width:min(780px,94vw);max-height:82vh;overflow:auto;background:var(--soft);border:2px solid var(--accent);border-radius:10px;padding:12px 14px;box-shadow:0 14px 44px rgba(0,0,0,.4)}#storyGuide.show{display:block}#storyGuide .sgh{display:flex;justify-content:space-between;align-items:center;gap:10px;color:var(--accent);font-size:15px}#storyGuide .sg{margin-top:10px;display:grid;gap:10px;grid-template-columns:1fr}#storyGuide .sgc{background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:10px 12px}#storyGuide .sgc h4{margin:0 0 4px;font-size:14px;color:var(--accent)}#storyGuide .sgc p,#storyGuide .sgc ul{margin:0;font-size:13.5px;line-height:1.5}#storyGuide .sgc ul{padding-left:18px}#storyGuide .sgmeta{margin:8px 0 0;font-size:13px;color:var(--muted)}'+
'#storyStick{position:sticky;top:-12px;z-index:4;background:var(--panel);padding:4px 0 6px;margin:0 0 8px;border-bottom:1px solid var(--line)}#phaseNav{margin:0 0 4px;padding:0}#phaseNav .pl{display:flex;flex-wrap:nowrap;gap:5px;overflow-x:auto;padding:2px 0 4px;scrollbar-width:thin}#phaseNav button{flex:0 0 auto;font-size:12px;padding:3px 8px;white-space:nowrap}#phaseNav button.on{background:var(--accent);color:var(--accent-ink);border-color:var(--accent)}#phaseNav .pt{opacity:.75;margin-left:5px;font-size:11px}#storyStick #nowRead{margin:0;height:clamp(64px,20vh,170px);overflow:auto;font-size:18px;line-height:1.5;padding:10px 16px;font-weight:500}#storyStick #nowRead b,#storyStick #nowRead .nrl{font-size:12px}'+
'.aud{display:flex;flex-wrap:wrap;align-items:center;gap:6px;padding:4px 6px!important;margin-top:6px}.aud>b,.aud>.hint{display:none}.aud audio{flex:1 1 230px;width:auto;margin:0!important;height:34px}.aud .row2{flex:0 1 auto;gap:4px}.aud .row2 button{padding:3px 8px;font-size:12px}#pvHead:has(#aud) .pvmeta{display:none}#pvHead:has(#aud){padding-top:6px;padding-bottom:6px}'+
'#q{height:26px;padding:2px 10px;font-size:13px}@media(min-width:701px){.toolbar .grow{flex:0 0 auto;min-width:0}}'+
'body.sfocus header,body.sfocus footer,body.sfocus #tree,body.sfocus #list{display:none}body.sfocus main{grid-template-columns:minmax(0,1fr);padding:4px;gap:0}'+
'#pvHead:has(#aud){display:flex;flex-wrap:wrap;align-items:center;gap:4px 10px}#pvHead:has(#aud) .pvname{flex:1 1 240px;min-width:0;margin:0}#pvHead:has(#aud) .pvname span:last-child{font-size:15px;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#pvHead:has(#aud) .pvnav{flex:0 0 auto;margin:0;gap:4px}#pvHead:has(#aud) .pvnav button{padding:3px 8px;font-size:12px}#pvHead:has(#aud) #aud{flex:1 1 100%;margin-top:2px}'+
'.acthead{margin-bottom:4px}.acthead .st{display:none}.act{display:grid;grid-template-columns:60px minmax(0,1fr) auto 86px minmax(110px,190px);gap:0 8px;align-items:center;padding:2px 6px;position:relative}.act .arow,.act .ctl{display:contents}.act .ref{grid-column:1;padding:0;min-width:0}.act .atx{grid-column:2;padding-top:0;padding-bottom:0}.act .meta{grid-column:3;margin:0;max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.act .ctl select{grid-column:4;margin:0;height:24px;padding:0 2px}.act .ctl textarea{grid-column:5;min-width:0!important;height:24px;min-height:24px!important;padding:2px 6px;margin:0;resize:none;overflow:hidden}.act .ctl textarea:focus{height:58px;position:relative;z-index:3}.act .saved{position:absolute;right:2px;top:0;font-size:10px}.act.l0{padding:4px 8px;margin-top:6px}'+
'@media(max-width:700px){.act{grid-template-columns:48px minmax(0,1fr) 84px}.act .meta{grid-column:2;grid-row:2;max-width:none;white-space:normal}.act .ctl select{grid-column:3;grid-row:1}.act .ctl textarea{grid-column:2/4;grid-row:3}}'+
'@media(min-width:880px){#storyGuide .sg{grid-template-columns:1fr 1fr}}@media (max-width:600px){#storyGuide{top:40px;padding:8px 10px}#storyGuide .sgc{padding:8px 10px}.aud audio{flex:1 1 100%}#storyStick #nowRead{height:clamp(60px,16vh,120px);font-size:16px}}';
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
var LEN={thornfield:'about 2 hours 12 minutes',northbridge:'about 34 minutes'};
function tm(s){s=Math.floor(s||0);var h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60;return(h?h+':'+(m<10?'0':'')+m:m)+':'+(x<10?'0':'')+x}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function story(){try{var f=S.view&&S.view[S.sel];return(f&&ACTS[f.name])||null}catch(e){return null}}
function guideHtml(sk){
 var other=sk==='thornfield'?'Northbridge':'Thornfield';
 return '<div class="sgh"><b>ℹ How to use this story page</b><button type="button" id="sgX">✕ Close</button></div>'+
 '<p class="sgmeta">This story runs '+(LEN[sk]||'')+'. You are the tester. Listen to how a real engagement is run, then repeat the work yourself from the Activity list.</p>'+
 '<div class="sg">'+
 '<div class="sgc"><h4>1. Play and listen</h4><ul><li>Press play on the audio bar. It keeps playing with the screen locked or in another app.</li><li>⏸ in the player pauses and keeps your place. ⏹ Stop goes back to the start.</li><li>⏪ 30s and 30s ⏩ skip back or forward. ⏮ Start over restarts.</li><li>Your place is remembered on this device, so you can stop and come back.</li></ul></div>'+
 '<div class="sgc"><h4>2. Set the speed</h4><p>Use the speed box (0.8× to 1.5×). Start at 1×. Once you know the names, 1.15× or 1.3× saves time. Slow down for the parts about evidence and exceptions.</p></div>'+
 '<div class="sgc"><h4>3. Watch the story follow the audio</h4><ul><li>The yellow NOW READING box shows the sentence being read.</li><li>On the 📋 Activity list tab, keep 🎯 Follow the audio ticked: the list scrolls and outlines the task being narrated.</li><li>Tap ▶ on any task to play the story from that point. Use the phase buttons above the story to jump to a phase.</li></ul></div>'+
 '<div class="sgc"><h4>4. Work as you listen</h4><ul><li>Listen in sittings of 20 to 30 minutes.</li><li>At the end of a phase, pause. Open the matching test or lab, do it, then tick Done? on the task and add a note.</li><li>Listen first for the shape of the engagement; the second time through, listen for what the tester did and what evidence was saved.</li></ul></div>'+
 '<div class="sgc"><h4>5. Why it matters</h4><p>In interviews you will be asked to walk through how you tested a control. These stories, and the tasks you tick off, give you that story from your own experience. When you can retell a phase in your own words, you have learned it.</p></div>'+
 '<div class="sgc"><h4>6. The other story</h4><p>The '+other+' story is a second, different engagement. Hear both. You can open it from the course menu at any time.</p></div>'+
 '</div>';
}
function phases(sk){
 var d=null;try{d=ACT.data[sk]}catch(e){}
 if(!d||!d.rows)return null;
 var rows=d.rows,out=[];
 for(var i=0;i<rows.length;i++){var r=rows[i];
  if(r.l===0&&r.a){var s=r.s;if(s==null){for(var j=i+1;j<rows.length&&rows[j].l!==0;j++){if(rows[j].s!=null){s=rows[j].s;break}}}
   if(s!=null)out.push({s:+s,a:r.a,r:r.r})}}
 return out.length?out:null;
}
function navHtml(ph){
 return '<div class="pl" title="Tap a phase to start the audio there">'+ph.map(function(p,i){return '<button type="button" data-ps="'+p.s+'" data-i="'+i+'">'+esc(p.a)+'<span class="pt">'+tm(p.s)+'</span></button>'}).join('')+'</div>';
}
var lastBest=null;
function mark(box,t){
 var bs=box.querySelectorAll('button[data-ps]'),best=null;
 bs.forEach(function(b){if(+b.dataset.ps<=t+0.5)best=b;b.classList.remove('on')});
 if(best){best.classList.add('on');if(best!==lastBest){lastBest=best;var pl=box.querySelector('.pl');if(pl)pl.scrollLeft=Math.max(0,best.offsetLeft-pl.clientWidth/2+best.offsetWidth/2)}}
}
function guide(sk){
 var g=document.getElementById('storyGuide');
 if(!g){g=document.createElement('div');g.id='storyGuide';document.body.appendChild(g)}
 if(g.dataset.sk!==sk){g.dataset.sk=sk;g.innerHTML=guideHtml(sk)}
 return g;
}
function sizeSearch(){
 try{var q=document.getElementById('q'),l=document.getElementById('list');if(!q||!l)return;
  var qr=q.getBoundingClientRect(),lr=l.getBoundingClientRect();var w=Math.round(lr.right-qr.left);
  if(w>180&&window.innerWidth>700)q.style.width=w+'px';else q.style.width=''}catch(e){}
}
sizeSearch();addEventListener('resize',sizeSearch);setTimeout(sizeSearch,800);setTimeout(sizeSearch,2500);
document.addEventListener('click',function(e){
 var g=document.getElementById('storyGuide');if(!g)return;
 if(e.target.closest&&e.target.closest('#sgBtn')){g.classList.toggle('show');return}
 if(e.target.closest&&e.target.closest('#sgX')){g.classList.remove('show');return}
 if(g.classList.contains('show')&&!(e.target.closest&&e.target.closest('#storyGuide')))g.classList.remove('show');
});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){var g=document.getElementById('storyGuide');if(g)g.classList.remove('show')}});
var FK='tibcc-focus';
function fpref(){try{return localStorage.getItem(FK)!=='off'}catch(e){return true}}
function fset(on){try{document.body.classList.toggle('sfocus',on)}catch(e){}}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('#sfBtn');if(!b)return;try{localStorage.setItem(FK,fpref()?'off':'on')}catch(x){}ensure()});
var busy=false;
function ensure(){
 if(busy)return;busy=true;
 try{
  var sk=story(),nr=document.getElementById('nowRead'),g0=document.getElementById('storyGuide');
  fset(!!sk&&fpref());
  if(sk){var pn0=document.querySelector('#pvHead .pvnav');if(pn0){var fb=document.getElementById('sfBtn');if(!fb){fb=document.createElement('button');fb.type='button';fb.id='sfBtn';pn0.appendChild(fb)}fb.textContent=fpref()?'☰ Menu & search':'⛶ Focus reading';fb.title=fpref()?'Show the course menu, file list and search':'Hide the menu so the story fills the window'}}
  if(!sk||!nr){if(g0)g0.classList.remove('show');return}
  guide(sk);
  var rw=document.querySelector('#aud .row2');
  if(rw&&!document.getElementById('sgBtn')){var b=document.createElement('button');b.type='button';b.id='sgBtn';b.textContent='❓ Help';b.title='How to use this story page';rw.appendChild(b)}
  var stick=document.getElementById('storyStick');
  if(!stick||!stick.contains(nr)){
   stick=document.getElementById('storyStick')||document.createElement('div');stick.id='storyStick';
   if(!stick.parentNode)nr.parentNode.insertBefore(stick,nr);
   var pn=document.getElementById('phaseNav');
   if(!pn){pn=document.createElement('div');pn.id='phaseNav';pn.hidden=true;
    pn.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('button[data-ps]');if(!b)return;
     try{var el=AU.el||document.getElementById('audEl');if(!el)return;el.currentTime=+b.dataset.ps;var p=el.play();if(p&&p.catch)p.catch(function(){})}catch(x){}});}
   stick.appendChild(pn);stick.appendChild(nr);
  }
  var nav=document.getElementById('phaseNav');
  if(nav&&nav.hidden){var ph=phases(sk);if(ph){nav.innerHTML=navHtml(ph);nav.hidden=false}}
  var el=document.getElementById('audEl');
  if(el&&!el.dataset.pn){el.dataset.pn='1';el.addEventListener('timeupdate',function(){var n=document.getElementById('phaseNav');if(n&&!n.hidden)mark(n,el.currentTime)})}
 }catch(e){}finally{busy=false}
}
var pend=false;
var mo=new MutationObserver(function(){if(pend)return;pend=true;setTimeout(function(){pend=false;ensure()},150)});
function arm(){var p=document.getElementById('preview');if(p)mo.observe(p,{childList:true,subtree:true});else setTimeout(arm,300)}
arm();
setInterval(function(){if(story())ensure();else fset(false)},1500);
var ls=document.createElement('style');ls.textContent='#actGrid .act,#actGrid .act.l0,#actGrid .act.now,#actGrid .act.past,#actGrid .act.nxt{background:transparent!important;box-shadow:none!important;opacity:1!important;outline:0!important;color:inherit!important}#actGrid .act.l0 *{color:inherit!important}#actGrid .act.l0 .atx,#actGrid .act.l1 .atx{font-weight:700}#actGrid .act:hover{background:rgba(255,190,60,.38)!important}#pvBody:has(#pvActs:not([hidden])) #phaseNav{display:none}#pvBody .stabs{margin:0 0 2px;padding:0}#pvActs .acthead{margin:0 0 3px;padding:0;font-size:12px}#storyStick{padding:2px 0 3px;margin:0 0 3px}';document.head.appendChild(ls);
var _sv=Element.prototype.scrollIntoView;
Element.prototype.scrollIntoView=function(){
 try{if(this.classList&&this.classList.contains('act')&&this.classList.contains('now')&&story()){var b=document.getElementById('pvBody'),k=document.getElementById('storyStick');if(b){var top=k?k.getBoundingClientRect().bottom:b.getBoundingClientRect().top;b.scrollBy({top:this.getBoundingClientRect().top-top-6,behavior:'smooth'});return}}}catch(e){}
 return _sv.apply(this,arguments)};
var lastNow=null;
setInterval(function(){try{var now=document.querySelector('#pvActs .act.now');if(now===lastNow)return;lastNow=now;
 var seen=false,k=0;document.querySelectorAll('#pvActs .act').forEach(function(r){r.classList.remove('past','nxt');if(r===now){seen=true;return}
  if(!seen&&now)r.classList.add('past');else if(seen&&k<5&&!r.classList.contains('l0')){r.classList.add('nxt');k++}})}catch(e){}},500);
var gcss='#actGrid{overflow:auto;border:1px solid var(--bd);border-radius:6px;background:var(--panel);font-size:13px;overscroll-behavior:contain}#actGrid .actcols{display:grid;grid-template-columns:var(--cols);width:max-content;min-width:100%;position:sticky;top:0;z-index:5;background:#1F3864;color:#fff;font-weight:700;font-size:12px}#actGrid .actcols span{padding:5px 6px;border-right:1px solid #4a5f8f}#actGrid .act{display:grid;grid-template-columns:var(--cols);width:max-content;min-width:100%;gap:0;padding:0;margin:0;align-items:stretch;border-bottom:1px solid var(--line)}#actGrid .act.l0{padding:0;margin:0}#actGrid .act .arow,#actGrid .act .ctl{display:contents}#actGrid .act .ref,#actGrid .act .atx,#actGrid .act .gc{grid-column:auto!important;grid-row:auto!important;padding:3px 6px;margin:0;border-right:1px solid var(--line);min-width:0;overflow:hidden;overflow-wrap:anywhere;font-size:13px;white-space:normal;max-width:none}#actGrid .act .gc{font-size:12px}#actGrid .act .meta{display:none}#actGrid .act .atx small{display:none}#actGrid:not(.hc-w) .act .atx small{display:none}#actGrid .act .ctl select{grid-column:auto!important;grid-row:auto!important;margin:2px;height:24px;align-self:center;max-width:none}#actGrid .act .ctl textarea{grid-column:auto!important;grid-row:auto!important;width:calc(100% - 4px);margin:2px;align-self:center}#actGrid.hc-w [data-c=w],#actGrid.hc-t [data-c=t],#actGrid.hc-e [data-c=e],#actGrid.hc-s [data-c=s]{display:none}.acthead .colt{display:inline-flex;gap:8px;align-items:center;font-size:12px;margin-left:8px}.acthead .colt label{display:inline-flex;gap:3px;align-items:center;cursor:pointer}';
var gs=document.createElement('style');gs.textContent=gcss;document.head.appendChild(gs);
var GC=[['w','Detail','200px'],['t','Tool','170px'],['e','Evidence','230px'],['s','Start','64px']];
function colPref(){try{return JSON.parse(localStorage.getItem('tibcc-cols'))||{}}catch(e){return{}}}
function applyCols(g){var p=colPref(),t=['84px','520px'];GC.forEach(function(c){if(p[c[0]]===false)g.classList.add('hc-'+c[0]);else{g.classList.remove('hc-'+c[0]);t.push(c[2])}});t.push('110px','300px');g.style.setProperty('--cols',t.join(' '))}
function sizeGrid(){try{var g=document.getElementById('actGrid');if(!g||g.offsetParent===null)return;var b=document.getElementById('pvBody');var bot=b?b.getBoundingClientRect().bottom:innerHeight;var h=bot-g.getBoundingClientRect().top-8;g.style.height=Math.max(170,Math.round(h))+'px'}catch(e){}}
function gridify(){
 try{var host=document.getElementById('pvActs');if(!host||!host.dataset.story||host.querySelector('#actGrid'))return;
 var d=ACT.data[host.dataset.story];if(!d)return;var m={};d.rows.forEach(function(r){m[r.r]=r});
 var rows=host.querySelectorAll('.act');if(!rows.length)return;
 var g=document.createElement('div');g.id='actGrid';
 var hd=document.createElement('div');hd.className='actcols';hd.innerHTML='<span>Ref</span><span>Activity</span><span data-c=w>Detail</span><span data-c=t>Tool</span><span data-c=e>Evidence</span><span data-c=s>Start</span><span>Done?</span><span>Notes</span>';
 g.appendChild(hd);
 rows.forEach(function(row){var r=m[row.dataset.ref]||{},ar=row.querySelector('.arow');
  if(ar){var fr=document.createDocumentFragment();[['w',r.w],['t',r.t],['e',r.e],['s',r.s!=null?tm(r.s):'']].forEach(function(c){var s=document.createElement('span');s.className='gc';s.dataset.c=c[0];s.textContent=c[1]||'';fr.appendChild(s)});ar.after(fr)}
  var ctl=row.querySelector('.ctl');if(ctl&&!ctl.querySelector('select')){var ph=document.createElement('span');ph.className='gc';ctl.insertBefore(ph,ctl.firstChild)}
  g.appendChild(row)});
 host.appendChild(g);
 var ah=host.querySelector('.acthead');if(ah&&!ah.querySelector('.colt')){var t=document.createElement('span');t.className='colt';var p=colPref();t.innerHTML='Columns: '+GC.map(function(c){return '<label><input type=checkbox data-col='+c[0]+(p[c[0]]===false?'':' checked')+'> '+c[1]+'</label>'}).join('');ah.appendChild(t)}
 applyCols(g);sizeGrid()}catch(e){}
}
document.addEventListener('change',function(e){var c=e.target&&e.target.dataset&&e.target.dataset.col;if(!c)return;var p=colPref();p[c]=e.target.checked;try{localStorage.setItem('tibcc-cols',JSON.stringify(p))}catch(x){}var g=document.getElementById('actGrid');if(g)applyCols(g)});
var _sv2=Element.prototype.scrollIntoView;
Element.prototype.scrollIntoView=function(){
 try{var g=this.closest&&this.closest('#actGrid');if(g){var h=g.querySelector('.actcols');g.scrollBy({top:this.getBoundingClientRect().top-g.getBoundingClientRect().top-(h?h.offsetHeight:0)-2,behavior:'smooth'});return}}catch(e){}
 return _sv2.apply(this,arguments)};
addEventListener('resize',sizeGrid);
setInterval(function(){gridify();sizeGrid()},600);
})();
