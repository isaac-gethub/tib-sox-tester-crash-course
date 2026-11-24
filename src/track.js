/* TIB trainee activity log: records which document a signed-in trainee opens in the course app. */
(function(){
'use strict';
var APP='course-app',last='',lastT=0,opened=false;
function ss(k,v){try{if(v===undefined)return sessionStorage.getItem(k);sessionStorage.setItem(k,v)}catch(e){return null}}
function send(ev,page){
  try{if(typeof sb==='undefined'||!sb.auth)return;
    sb.auth.getSession().then(function(r){if(!r||!r.data||!r.data.session)return;
      sb.from('app_visit_log').insert({app:APP,page:page||'',event:ev}).then(function(){},function(){})}).catch(function(){})}catch(e){}}
function tick(){
  var f;try{f=S&&S.pv}catch(e){return}
  var name=f?(f.name||String(f.id||'')):'';
  var now=Date.now();
  if(!opened&&!ss('trk_open_c')){opened=true;ss('trk_open_c','1');send('open',name||'home')}
  if(!name)return;
  if(name!==last||now-lastT>300000){last=name;lastT=now;send('view',name)}
}
setInterval(tick,3000);
})();
