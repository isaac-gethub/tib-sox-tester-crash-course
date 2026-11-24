(function(){
var norm=function(t){return String(t||'').replace(/\s+/g,' ').trim()};
function isCode(t){return /^[A-Z]{2,4}-\d{1,2}\b/.test(t)}
function heads(){var b=document.getElementById('pvBody');if(!b)return[];return [].slice.call(b.querySelectorAll('h1,h2')).filter(function(h){var t=norm(h.textContent);return h.tagName==='H1'?/^(Chapter \d|Procedure )/.test(t):(/^Chapter \d/.test(t)||isCode(t))})}
function build(){
  var bar=document.getElementById('tts');if(!bar||typeof S==='undefined'||!S.pv)return;
  var hs=heads();var procs=hs.filter(function(h){var t=norm(h.textContent);return /^Procedure /.test(t)||isCode(t)});
  var old=document.getElementById('ttsGo');
  if(procs.length<3){if(old)old.remove();return}
  var sig=S.pv.id+':'+hs.length;
  if(old&&old.dataset.sig===sig)return;
  if(old)old.remove();
  var sel=document.createElement('select');sel.id='ttsGo';sel.dataset.sig=sig;sel.title='Start reading from a chapter or test';
  sel.style.maxWidth='100%';
  var o=document.createElement('option');o.value='';o.textContent='Start from: choose a chapter or test';sel.appendChild(o);
  hs.forEach(function(h,i){var t=norm(h.textContent);var op=document.createElement('option');op.value=String(i);op.textContent=/^Chapter/.test(t)?'■ '+t:'  '+t;sel.appendChild(op)});
  sel.addEventListener('change',function(){go(sel,hs)});
  var st=document.getElementById('ttsSt');bar.insertBefore(sel,st);
}
function go(sel,hs){
  var i=sel.value;if(i==='')return;var h=hs[+i],f=S.pv;
  var segs=S.speech&&S.speech[f.id];var st=document.getElementById('ttsSt');
  if(!segs||!segs.length){if(st)st.textContent='The text is still loading. Try again in a moment.';sel.value='';return}
  var t=norm(h.textContent),idx=-1;
  for(var k=segs.length-1;k>=0;k--){if(norm(segs[k])===t){idx=k;break}}
  if(idx<0){if(st)st.textContent='Could not find that place in the text.';sel.value='';return}
  var parts=speechParts(f);if(!parts||!parts.length){sel.value='';return}
  S.speech[f.id]=segs.slice(0,idx);var n=speechParts(f).length;S.speech[f.id]=segs;
  ttsStop();TTS.parts=parts;TTS.i=Math.min(n,parts.length-1);TTS.fid=f.id;TTS.on=true;
  try{h.scrollIntoView({block:'start',behavior:'smooth'})}catch(e){}
  speakNext();
}
var mo=new MutationObserver(function(){clearTimeout(build.t);build.t=setTimeout(build,150)});
mo.observe(document.documentElement,{childList:true,subtree:true});
var css=document.createElement('style');css.textContent='#ttsGo{font:inherit;padding:6px;border-radius:6px;border:1px solid var(--bd,#8396b0);max-width:100%}';document.head.appendChild(css);
})();

/* Help panel (audio and reading guide) */
(function(){var s=document.createElement('script');s.src='help.js?v=1';document.head.appendChild(s)})();

/* Deep links to documents */
(function(){var s=document.createElement('script');s.src='deeplink.js?v=1';document.head.appendChild(s)})();


/* Trainee activity tracking */
(function(){var s=document.createElement('script');s.src='track.js?v=1';document.head.appendChild(s)})();
