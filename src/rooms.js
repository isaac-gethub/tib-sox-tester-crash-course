'use strict';
/* Course rooms: a journey-ordered view over the existing documents. Original item numbers are kept on every row. */
(function(){
function rg(sec,a,b){var o=[];for(var i=a;i<=b;i++)o.push(sec+'.'+i);return o}
function ag(a,b){var o=[];for(var i=a;i<=b;i++)o.push('A'+i);return o}
var ROOMS=[
 {n:'Start here',step:'Step 1 · Open first',d:'How the app works, your 25-day map',g:[['Orientation and your map',['1.1','1.2','1.12','1.18']]]},
 {n:'Background',step:'Step 2 · Read at leisure',d:'The two project stories and the role',g:[['The stories',['2.1','2.3']],['The activity lists',['2.2','2.4']],['The role',['1.3']]]},
 {n:'Days 1 to 5',step:'Step 3 · Days 1 to 5, the first five class days',d:'The Prep Block, its gate task, study method, data tools',g:[['Prep Block: Days 1 to 5 and the gate task',rg(9,1,11)],['The study method (used from Day 6)',['1.6']],['Data extraction tools (used from Day 6)',['1.7','1.9','3.1','3.2','3.3','3.4']]]},
 {n:'Days 6 to 25',step:'Step 4 · Days 6 to 25',d:'Foundations lessons, course deck, test scripts and every lab',g:[['Foundations lessons: taught on Days 6 to 11',['1.13','1.14','1.15','1.16','1.17']],['Course deck',['4.1']],['SAP track: test scripts',['5.1','5.2','5.3','5.4']],['Extension tests',['5.5','5.6','5.7','5.8']],['Thornfield labs (Days 12 to 21)',rg(7,1,18)],['Northbridge labs: Days 22 to 24 teach 8.2, 8.3, 8.4 and 8.11; the rest are extra practice',rg(8,1,14)]]},
 {n:'Library and careers',step:'Any time',d:'Interactive test lessons, procedure manuals, read-aloud, test list, job market',g:[['Interactive test lessons (42 tests, quiz and saved progress)',['1.19']],['Procedure manuals',['1.4','1.5','1.10','1.11']],['Test reference',['1.8']],['Careers and job market',rg(6,1,8)]]},
 {n:'Instructor prep',admin:1,step:'Instructor sign-in only',d:'Guides, answer keys, coverage review, controls lab',g:[['Instructor guides',['A18','A19']],['Answer keys',ag(10,14).concat(['A17'])],['Coverage review',ag(1,9)],['Tools',['A15','A16']]]}
];
/* Contents Directory: added to section 1 here so course.js stays unchanged */
try{if(typeof COURSE!=='undefined'&&typeof FILES!=='undefined'&&!FILES.some(function(x){return x.name==='TIB_SOX_Crash_Course_App_Contents_Directory.docx'})){var DIRE=['TIB_SOX_Crash_Course_App_Contents_Directory.docx','Contents Directory: every menu and item, what it is, why do it and the benefit',48527,1];COURSE[0].f.push(DIRE);FILES.push({id:FILES.length,name:DIRE[0],title:DIRE[1],size:DIRE[2],ext:'docx',dl:true,sec:0,num:'1.'+COURSE[0].f.length,type:'doc'})}}catch(e){}
/* Interactive test lessons (item 1.19): a web page opened in a new tab, cloned from the prep page entry so it behaves the same */
try{if(typeof COURSE!=='undefined'&&typeof FILES!=='undefined'&&!FILES.some(function(x){return x.name.indexOf('/lessons.html')>=0})){var PE=FILES.filter(function(x){return x.name.indexOf('/prep.html')>=0})[0];if(PE){var LE=['https://tib-sox-tester-crash-course.vercel.app/lessons.html','Interactive Test Lessons: 42 lessons, one per test, with quiz and saved progress (opens in a new tab)',0];COURSE[0].f.push(LE);var LO={};for(var lk in PE)LO[lk]=PE[lk];LO.id=FILES.length;LO.name=LE[0];LO.title=LE[1];LO.num='1.'+COURSE[0].f.length;FILES.push(LO)}}}catch(e){}
/* Extra instructor link, added here so course.js stays unchanged */
try{if(typeof ADMIN_SEC!=='undefined'&&!ADMIN_SEC.f.some(function(x){return x[0].indexOf('tib-vercel-deployment-history')>=0}))ADMIN_SEC.f.push(['https://tib-vercel-deployment-history.vercel.app/','Vercel Deployment History (web app, opens in a new tab)',0]);if(typeof ADMIN_SEC!=='undefined'&&!ADMIN_SEC.f.some(function(x){return x[0]==='admin/Foundation_Instructor_Answer_Key.docx'}))ADMIN_SEC.f.push(['admin/Foundation_Instructor_Answer_Key.docx','Answer key: Foundations course Days 6 to 11 exercises (instructors only)',14497,1]);if(typeof ADMIN_SEC!=='undefined'&&!ADMIN_SEC.f.some(function(x){return x[0]==='admin/TIB_SOX_Crash_Course_Instructor_Self_Study_and_Training_Guide.docx'})){ADMIN_SEC.f.push(['admin/TIB_SOX_Crash_Course_Instructor_Self_Study_and_Training_Guide.docx','Instructor Self-Study and Training Guide: how to prepare for each of the 25 days (Word, 86 pages)',116232,1]);ADMIN_SEC.f.push(['admin/TIB_SOX_Crash_Course_Instructor_Delivery_Notes.docx','Instructor Delivery Notes: the day-by-day run sheet for leading the 25 days (Word, 47 pages)',57210,1])}}catch(e){}
var HOME=[['🗺️','How the app works, your 25-day map, what you will do each day'],['📖','The Thornfield and Northbridge stories, their activity lists, the job titles'],['🎓','Days 1 to 5: the Prep Block and gate task, the study method, and the data extraction tools'],['📅','Days 6 to 25: the Foundations lessons, course deck, test scripts, and every lab by day range'],['📚','Interactive test lessons, procedure manuals, read-aloud, test list, skill bank, job market'],['🔒','Self-study guide, delivery notes, answer keys, coverage review, controls lab, deployment history']];
var HELP={'Days 1 to 5':'<div class="rhelp"><b>How to use this room: Days 1 to 5, taught in class</b>These are the first five class days. Your instructor teaches each day with you.<ol><li>On Day 1, read the Prep Block plan (9.1).</li><li>On each of Days 1 to 5, open only that day\'s guide and its practice file (items 9.2 to 9.10). The guides are titled Day P1 to Day P5.</li><li>The gate task (9.11) closes Day 5.</li></ol>The study method (1.6) and the data extraction tools are listed below the Prep Block. You use them from Day 6.</div>','Days 6 to 25':'<div class="rhelp"><b>How to use this room: Days 6 to 25</b>Your instructor tells you which items to open each day. Open only those. Days 6 to 11 begin with the Foundations lessons (1.13 to 1.17), listed first.<ol><li>Open 1.13 first. It is the Foundations start page.</li><li>On each of Days 6 to 11, read that day\'s lesson in the student guide (1.14) with your instructor.</li><li>Do the exercises in the practice workbook (1.15) before you look at any answers.</li><li>Open 1.16 and 1.17 when you need help with the Excel steps.</li></ol>The labs follow in order: Thornfield on Days 11 to 21 and Northbridge on Days 22 to 24.</div>'};
ROOMS.forEach(function(r,i){r.ic=HOME[i][0];r.h=HOME[i][1]});
var GRP={},_cv,_rl;
function build(){
 var m={},used={};FILES.forEach(function(f){m[f.num]=f});
 var ai=(typeof ADMIN_SEC!=='undefined')?COURSE.indexOf(ADMIN_SEC):-1,adm=ai>=0,out=[];
 ROOMS.forEach(function(r){if(r.admin&&!adm)return;
  var gs=r.g.map(function(g){var fs=[];g[1].forEach(function(k){var num=k.charAt(0)==='A'?(ai+1)+'.'+k.slice(1):k,f=m[num];if(f){fs.push(f);used[f.num]=1}});return{h:g[0],files:fs}});
  out.push({r:r,groups:gs})});
 var rest=FILES.filter(function(f){return !used[f.num]});
 if(rest.length){var lib=out.filter(function(o){return o.r.n==='Library and careers'})[0];if(lib)lib.groups.push({h:'More',files:rest})}
 return out}
window.__rooms=build;
function ready(){try{return typeof S!=='undefined'&&typeof renderTree==='function'&&typeof computeView==='function'&&typeof renderList==='function'&&typeof FILES!=='undefined'&&document.getElementById('tree')}catch(e){return false}}
function install(){
 var css='.rnode{display:grid;grid-template-columns:1fr auto;gap:2px 8px;padding:10px 12px;border-bottom:1px solid var(--line);cursor:pointer}.rnode:hover{background:var(--soft)}.rnode.on{background:var(--sel);box-shadow:inset 5px 0 0 var(--accent)}.rnode.radm{border-left:3px dashed var(--muted)}.rstep{grid-column:1/-1;font-size:11px;color:var(--muted)}.rname{font-weight:700;font-size:15px;line-height:1.25}.rnode .tc{align-self:start;color:var(--muted);font-size:12px}.rdesc{grid-column:1/-1;font-size:12px;color:var(--muted);line-height:1.3}.grp{padding:8px 12px 5px;font-size:12px;font-weight:700;color:var(--accent);background:var(--soft);border-bottom:1px solid var(--line)}@media (max-width:600px){.rname{font-size:16px}.rnode{padding:12px}}';
 var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
 var css2='#home{position:fixed;left:0;right:0;z-index:30;background:var(--bg);overflow:auto;padding:18px 16px}#home[hidden]{display:none}#home .hw{max-width:980px;margin:0 auto;background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:20px}#home .ht{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap}#home h2{margin:0;font-size:22px}#home .hs{color:var(--muted);margin-top:2px}#home .tag{background:var(--sel);color:var(--ink);border-radius:8px;padding:5px 12px;font-size:13px;font-weight:600}#home .cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:16px}#home .card{background:var(--bg);border:1px solid var(--line);border-radius:12px;padding:14px;cursor:pointer;display:flex;flex-direction:column;gap:5px;min-height:150px}#home .card:hover{border-color:var(--accent)}#home .card.cur{border:2px solid var(--accent)}#home .card.adm{border-style:dashed}#home .cs{font-size:13px;color:var(--muted)}#home .card.cur .cs{color:var(--accent)}#home .cn{font-size:18px;font-weight:700}#home .cd{font-size:14px;color:var(--muted);flex:1}#home .cc{font-size:13px;color:var(--muted)}@media (max-width:880px){#home .cards{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (max-width:600px){#home{padding:10px}#home .hw{padding:14px}#home h2{font-size:19px}#home .cards{grid-template-columns:1fr}#home .card{min-height:0;padding:14px}}#btnHome{font-weight:700}#tree,#btnTree{display:none!important}@media (min-width:881px){main{grid-template-columns:minmax(0,27fr) minmax(0,73fr)!important}}#homeBar{display:block;width:100%;text-align:left;font-weight:700;font-size:15px;padding:10px 12px;border:0;border-bottom:2px solid #e0a82e;background:#ffc857;color:#0a2347;cursor:pointer}#homeBar:hover{filter:brightness(.96)}.rhelp{padding:10px 12px;background:#fff8e1;color:#1c2430;border-bottom:1px solid var(--line);font-size:13px;line-height:1.4}.rhelp b{display:block;margin-bottom:3px;font-size:14px}.rhelp ol{margin:4px 0;padding-left:18px}.rhelp li{margin:3px 0}';
 var st2=document.createElement('style');st2.textContent=css2;document.head.appendChild(st2);
 var home=document.createElement('div');home.id='home';home.hidden=true;document.body.appendChild(home);
 function place(){var h=document.querySelector('header').getBoundingClientRect().bottom,f=document.querySelector('footer').getBoundingClientRect().height;home.style.top=h+'px';home.style.bottom=f+'px'}
 function showHome(){var rooms=build(),adm=rooms.some(function(o){return o.r.admin});
  home.innerHTML='<div class="hw"><div class="ht"><div><h2>SOX Tester Crash Course</h2><div class="hs">Pick the room for where you are now</div></div><span class="tag">'+(adm?'Instructor view':'Trainee view')+'</span></div><div class="cards">'+rooms.map(function(o,i){var n=o.groups.reduce(function(a,g){return a+g.files.length},0),ns='';
   return '<div class="card'+(o.r.admin?' adm':'')+(S.room===i&&!S.f.q.trim()&&S.sec<0?' cur':'')+'" data-r="'+i+'"><span class="cs">'+(o.r.admin?'🔒 ':'')+esc(o.r.step)+'</span><span class="cn">'+o.r.ic+' '+esc(o.r.n)+'</span><span class="cd">'+esc(o.r.h)+'</span><span class="cc">'+ns+n+' item'+(n===1?'':'s')+'</span></div>'}).join('')+'</div></div>';
  place();document.body.classList.remove('tree-open');home.hidden=false;home.scrollTop=0}
 function hideHome(){home.hidden=true}
 window.addEventListener('resize',function(){if(!home.hidden)place()});
 home.addEventListener('click',function(e){var c=e.target.closest&&e.target.closest('.card');if(!c)return;
  S.room=+c.dataset.r;S.sec=-1;S.f.q='';$('#q').value='';S.sel=-1;hideHome();document.body.classList.remove('tree-open');renderAll();select(0)});
 var hb=document.createElement('button');hb.id='btnHome';hb.textContent='🏠 Home';hb.title='Back to the six rooms';
 var hbt=document.querySelector('.hbtns'),bg=document.getElementById('btnGuide');if(hbt)hbt.insertBefore(hb,bg||hbt.firstChild);
 hb.onclick=function(){showHome()};
 var hbar=document.createElement('button');hbar.id='homeBar';hbar.type='button';hbar.textContent='🏠 Home: back to the six rooms';hbar.onclick=showHome;var lst=document.getElementById('list');if(lst)lst.insertBefore(hbar,lst.firstChild);
 ['btnGuide','btnAdmin'].forEach(function(id){var b=document.getElementById(id);if(b)b.addEventListener('click',hideHome,true)});
 document.getElementById('q').addEventListener('input',hideHome);
 var shown=false;

 _cv=window.computeView;_rl=window.renderList;
 window.computeView=function(){
  if(S.f.q.trim()||S.sec>=0)return _cv();
  var rooms=build();if(S.room==null||S.room>=rooms.length)S.room=0;
  var v=[];GRP={};
  rooms[S.room].groups.forEach(function(g){g.files.forEach(function(f){if(S.f.type==='all'||f.type===S.f.type){v.push(f);if(!(f.id in GRP))GRP[f.id]=g.h}})});
  if(S.f.sort==='name')v=v.slice().sort(function(a,b){return a.title.localeCompare(b.title)});
  S.view=v};
 window.renderList=function(){
  if(S.f.q.trim()||S.sec>=0)return _rl();
  computeView();var rooms=build(),cur=rooms[S.room],last=null,html=[];
  $('#crumbs').textContent=cur.r.step+' · '+cur.r.n;
  $('#summary').textContent=S.view.length+' document'+(S.view.length===1?'':'s')+' · '+cur.r.d;
  S.view.forEach(function(f,i){var g=S.f.sort==='name'?null:GRP[f.id];if(g&&g!==last){html.push('<div class="grp">'+esc(g)+'</div>');last=g}
   html.push('<div class="row'+(i===S.sel?' on':'')+'" data-i="'+i+'"><span class="ic">'+ICON[f.type]+'</span><div><div class="n" title="'+esc(f.title)+'">'+f.num+' '+esc(f.title)+'</div><div class="sub">'+esc(COURSE[f.sec].s)+' · '+esc(f.name)+'</div></div><div class="sz">'+fmtSize(f.size)+'</div></div>')});
  if(HELP[cur.r.n])html.unshift(HELP[cur.r.n]);
  $('#rows').innerHTML=html.join('')||'<div class="empty">No documents match. Try fewer words.</div>'};
 window.renderTree=function(){
  var rooms=build();if(S.room==null)S.room=0;if(!shown){shown=true;showHome()}var inRoom=!S.f.q.trim()&&S.sec<0;
  $('#tree').innerHTML=rooms.map(function(o,i){var n=o.groups.reduce(function(a,g){return a+g.files.length},0);
   return '<div class="rnode'+(o.r.admin?' radm':'')+(inRoom&&S.room===i?' on':'')+'" data-r="'+i+'"><span class="rstep">'+esc(o.r.step)+'</span><span class="rname">'+esc(o.r.n)+'</span><span class="tc">'+n+'</span><span class="rdesc">'+esc(o.r.d)+'</span></div>'}).join('')};
 document.getElementById('tree').addEventListener('click',function(e){var n=e.target.closest&&e.target.closest('.rnode');if(!n)return;
  S.room=+n.dataset.r;S.sec=-1;S.f.q='';$('#q').value='';S.sel=-1;hideHome();document.body.classList.remove('tree-open');renderAll();select(0)},true);
 if(document.querySelector('#tree .tnode')||document.querySelector('#tree .rnode')){renderAll()}
}
function boot(n){if(ready())return install();if(n>200)return;setTimeout(function(){boot(n+1)},60)}
boot(0);
})();
