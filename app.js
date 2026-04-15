// ===== DATA =====
const PROV={
  sa:["الرياض","جدة","مكة المكرمة","المدينة المنورة","الدمام","الخبر","تبوك","أبها","نجران","جازان","حائل","القصيم","الطائف","ينبع"],
  kw:["العاصمة","حولي","الفروانية","مبارك الكبير","الأحمدي","الجهراء"],
  ae:["أبوظبي","دبي","الشارقة","عجمان","رأس الخيمة","الفجيرة","أم القيوين"],
  eg:["القاهرة","الجيزة","الإسكندرية","الدقهلية","البحيرة","الشرقية","القليوبية","المنوفية","الغربية","كفر الشيخ","دمياط","المنيا","أسيوط","سوهاج","قنا","أسوان","الأقصر","الفيوم","بني سويف","الإسماعيلية","بورسعيد","السويس","مطروح","شمال سيناء","جنوب سيناء","الوادي الجديد","البحر الأحمر"]
};
const GR={
  sa:["الصف الأول الابتدائي","الصف الثاني الابتدائي","الصف الثالث الابتدائي","الصف الرابع الابتدائي","الصف الخامس الابتدائي","الصف السادس الابتدائي","الصف السابع (متوسط 1)","الصف الثامن (متوسط 2)","الصف التاسع (متوسط 3)"],
  kw:["الصف الأول الابتدائي","الصف الثاني الابتدائي","الصف الثالث الابتدائي","الصف الرابع الابتدائي","الصف الخامس الابتدائي","الصف السادس (متوسط 1)","الصف السابع (متوسط 2)","الصف الثامن (متوسط 3)"],
  ae:["KG1","KG2","الصف الأول","الصف الثاني","الصف الثالث","الصف الرابع","الصف الخامس","الصف السادس","الصف السابع (إعدادي 1)","الصف الثامن (إعدادي 2)","الصف التاسع (إعدادي 3)"],
  eg:["الصف الأول الابتدائي","الصف الثاني الابتدائي","الصف الثالث الابتدائي","الصف الرابع الابتدائي","الصف الخامس الابتدائي","الصف السادس الابتدائي","الصف الأول الإعدادي","الصف الثاني الإعدادي","الصف الثالث الإعدادي"]
};
const SB={
  dp:["رياضيات","علوم","لغة عربية","لغة إنجليزية","تربية إسلامية","دراسات اجتماعية"],
  dm:["رياضيات","فيزياء","كيمياء","أحياء","لغة عربية","لغة إنجليزية","تربية إسلامية","تاريخ وجغرافيا"],
  ep:["رياضيات","علوم","لغة عربية","لغة إنجليزية","تربية إسلامية","دراسات اجتماعية","تربية وطنية"],
  em:["رياضيات","علوم","لغة عربية","لغة إنجليزية","تاريخ","جغرافيا","تربية إسلامية"]
};
const CR={
  sa:[{i:"📐",n:"رياضيات"},{i:"⚗️",n:"علوم"},{i:"📝",n:"لغة عربية"},{i:"🌍",n:"لغة إنجليزية"}],
  ae:[{i:"📐",n:"رياضيات"},{i:"🔬",n:"علوم"},{i:"🎯",n:"EmSAT تحضير"},{i:"📝",n:"لغة عربية"},{i:"🌍",n:"لغة إنجليزية"}],
  kw:[{i:"📐",n:"رياضيات"},{i:"⚗️",n:"علوم"},{i:"📝",n:"لغة عربية"},{i:"🌍",n:"لغة إنجليزية"}],
  eg:[{i:"📐",n:"رياضيات"},{i:"⚗️",n:"علوم"},{i:"📝",n:"لغة عربية"},{i:"🌍",n:"لغة إنجليزية"}]
};
const PC={sa:"+966",kw:"+965",ae:"+971",eg:"+20"};
const FL={sa:"🇸🇦",kw:"🇰🇼",ae:"🇦🇪",eg:"🇪🇬"};
const CN={sa:"🇸🇦 السعودية",kw:"🇰🇼 الكويت",ae:"🇦🇪 الإمارات",eg:"🇪🇬 مصر"};
const ICONS={رياضيات:"📐",علوم:"⚗️","لغة عربية":"📝","لغة إنجليزية":"🌍","تربية إسلامية":"☪️","دراسات اجتماعية":"🗺️","تربية وطنية":"🏛️",تاريخ:"📜",جغرافيا:"🗺️","تاريخ وجغرافيا":"🗺️",فيزياء:"⚡",كيمياء:"🧪",أحياء:"🌿"};

// ===== HELPERS =====
function getSubs(c,g){
  if(c==="eg") return (g&&g.includes("إعدادي"))?SB.em:SB.ep;
  if(c==="ae"){const m=g&&(g.includes("إعدادي")||g.includes("سابع")||g.includes("ثامن")||g.includes("تاسع"));return m?SB.dm:SB.dp;}
  const m=g&&(g.includes("سابع")||g.includes("ثامن")||g.includes("متوسط"));
  return m?SB.dm:SB.dp;
}
function $(id){return document.getElementById(id);}

// ===== STATE =====
let sts  = JSON.parse(localStorage.getItem("tl_s")||"[]");
let lecs = JSON.parse(localStorage.getItem("tl_l")||"[]");
let qzs  = JSON.parse(localStorage.getItem("tl_q")||"[]");
let CU   = JSON.parse(localStorage.getItem("tl_u")||"null");
let rDat={}, selSubs=[], rStep=1, panelId=null, curQZ=null, qzAns={}, qzQs=[], curTab="sa";

// ===== NAVIGATION =====
function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  $('page-'+id).classList.add('active');
  window.scrollTo(0,0);
}
function go(id){
  closeNav();
  if(id==='dashboard') loadDash();
  if(id==='admin') loadAdmin();
  showPage(id);
}
function toggleNav(){$('navMenu').classList.toggle('open');$('overlay').classList.toggle('show');}
function closeNav(){$('navMenu').classList.remove('open');$('overlay').classList.remove('show');}
function toggleTheme(){document.body.classList.toggle('light');$('themeBtn').textContent=document.body.classList.contains('light')?'🌙':'☀️';}

function updNav(){
  const li=!!CU, isA=CU&&CU.role==="admin";
  $('n-reg').style.display   = li?'none':'flex';
  $('n-login').style.display = li?'none':'flex';
  $('n-dash').style.display  = (li&&!isA)?'flex':'none';
  $('n-admin').style.display = isA?'flex':'none';
  $('n-out').style.display   = li?'flex':'none';
  if(CU){
    const m=encodeURIComponent("مرحباً، أنا "+(CU.name||"")+" - "+(CU.phone||""));
    $('wa-b').href="https://wa.me/201101631329?text="+m;
  }
}

// ===== REGISTER =====
function showRS(n){
  rStep=n;
  document.querySelectorAll('.sc').forEach(s=>s.classList.remove('active'));
  $('rs'+n).classList.add('active');
  [1,2,3].forEach(i=>{
    const d=$('sd'+i);
    d.className='sd'+(i<n?' done':i===n?' active':'');
  });
  $('reg-err').classList.remove('show');
}
function rErr(m){const e=$('reg-err');e.textContent=m;e.classList.add('show');}

function onCC(){
  const c=$('r-country').value;
  $('r-code').value=PC[c]||"+966";
  $('r-pcode').value=PC[c]||"+966";
  if(!c){$('prov-g').style.display='none';return;}
  $('prov-g').style.display='block';
  $('r-prov').innerHTML=(PROV[c]||[]).map(p=>`<option>${p}</option>`).join('');
  $('r-grade').innerHTML='<option value="">-- اختر --</option>'+(GR[c]||[]).map(g=>`<option>${g}</option>`).join('');
  $('subs-w').style.display='none';
  selSubs=[];
}
function onGC(){
  const c=$('r-country').value, g=$('r-grade').value;
  $('subs-w').style.display=g?'block':'none';
  selSubs=[];
  $('subs-g').innerHTML=getSubs(c,g).map(s=>
    `<div class="chip" onclick="tSub(this,'${s}')"><div class="dot"></div><span>${s}</span></div>`
  ).join('');
}
function tSub(el,n){
  el.classList.toggle('sel');
  if(el.classList.contains('sel')) selSubs.push(n);
  else selSubs=selSubs.filter(x=>x!==n);
}
function rn1(){
  const name=$('r-name').value.trim(), phone=$('r-phone').value.trim(),
        parent=$('r-parent').value.trim(), c=$('r-country').value;
  if(!name)  return rErr("أدخل اسم الطالب");
  if(!phone) return rErr("أدخل رقم هاتف الطالب");
  if(!parent)return rErr("أدخل رقم ولي الأمر");
  if(!c)     return rErr("اختر الدولة");
  rDat={name, phone:$('r-code').value+phone, parentPhone:$('r-pcode').value+parent, country:c, province:$('r-prov').value};
  showRS(2);
}
function rb1(){showRS(1);}
function rn2(){
  const g=$('r-grade').value;
  if(!g)             return rErr("اختر السنة الدراسية");
  if(!selSubs.length)return rErr("اختر مادة واحدة على الأقل");
  rDat.grade=g; rDat.subjects=[...selSubs];
  showRS(3);
}
function rb2(){showRS(2);}
function doReg(){
  const p=$('r-pass').value, p2=$('r-pass2').value;
  if(p.length<6) return rErr("كلمة المرور 6 أحرف على الأقل");
  if(p!==p2)     return rErr("كلمة المرور غير متطابقة");
  if(sts.find(s=>s.phone===rDat.phone)) return rErr("هذا الرقم مسجل مسبقاً");
  const st={...rDat, pass:p, id:Date.now(), role:"student", activeSubs:[], freeLink:""};
  sts.push(st);
  localStorage.setItem("tl_s",JSON.stringify(sts));
  CU=st; localStorage.setItem("tl_u",JSON.stringify(CU));
  // رسالة واتساب تلقائية للمشرف
  const msg=encodeURIComponent(
    "🎓 طالب جديد سجل في To Learn\n\n"+
    "👤 الاسم: "+st.name+"\n"+
    "📱 هاتف الطالب: "+st.phone+"\n"+
    "👨‍👩‍👧 هاتف ولي الأمر: "+st.parentPhone+"\n"+
    "🌍 الدولة: "+(CN[st.country]||st.country)+"\n"+
    "🏙️ المحافظة: "+(st.province||"")+"\n"+
    "📚 المرحلة: "+(st.grade||"")+"\n"+
    "📖 المواد: "+(st.subjects||[]).join("، ")
  );
  window.open("https://wa.me/201101631329?text="+msg,"_blank");
  updNav(); loadDash(); showPage('dashboard');
}

// ===== LOGIN =====
function doLogin(){
  const code=$('l-code').value, phone=$('l-phone').value.trim(), pass=$('l-pass').value.trim();
  const err=$('login-err');
  // دخول المشرف - مخفي
  if(phone==="admin"&&pass==="admin#6012"){
    CU={name:"المشرف",role:"admin",phone:"admin"};
    localStorage.setItem("tl_u",JSON.stringify(CU));
    updNav(); loadAdmin(); showPage('admin'); return;
  }
  const full=code+phone, found=sts.find(s=>s.phone===full&&s.pass===pass);
  if(!found){err.textContent="رقم الهاتف أو كلمة المرور غير صحيحة";err.classList.add('show');return;}
  CU=found; localStorage.setItem("tl_u",JSON.stringify(CU));
  updNav(); loadDash(); showPage('dashboard');
}
function doLogout(){CU=null;localStorage.removeItem("tl_u");updNav();showPage('home');}

// ===== DASHBOARD =====
function loadDash(){
  if(!CU)return;
  $('d-name').textContent=CU.name;
  $('d-info').textContent=(CU.grade||'')+" · "+(CU.province||'');
  $('d-subs').textContent="المواد: "+((CU.subjects||[]).join("، ")||'—');
  $('d-flag').textContent=FL[CU.country]||'🎓';
  $('d-grade').textContent=CU.grade||'';
  $('fi-name').textContent=CU.name;
  $('fi-phone').textContent=CU.phone;
  $('fi-subs').textContent=(CU.subjects||[]).join(" · ")||'—';
  // زر الحصة المجانية
  const flb=$('fl-btn');
  if(CU.freeLink){
    flb.innerHTML=`<a href="${CU.freeLink}" target="_blank" class="sl" style="background:linear-gradient(135deg,#00c9b1,#008f7a)">🔗 ادخل الحصة المجانية الآن</a>`;
  } else {
    const m=encodeURIComponent("مرحباً، أنا "+CU.name+" - "+CU.phone+" - "+(CU.grade||"")+" - المواد: "+(CU.subjects||[]).join("، ")+" - أريد حجز الحصة التجريبية المجانية");
    flb.innerHTML=`<a href="https://wa.me/201101631329?text=${m}" target="_blank" class="sl">💬 احجز الآن عبر واتساب</a>`;
  }
  curTab=CU.country||'sa';
  document.querySelectorAll('.ctab').forEach(t=>t.classList.toggle('active',t.dataset.k===curTab));
  renderCG(); renderMC();
}
function swTab(k){
  curTab=k;
  document.querySelectorAll('.ctab').forEach(t=>t.classList.toggle('active',t.dataset.k===k));
  renderCG();
}
function renderCG(){
  if(!CU)return;
  const subs=CU.subjects||[], act=CU.activeSubs||[];
  $('cg').innerHTML=(CR[curTab]||[]).map(c=>{
    const sel=subs.includes(c.n), active=act.includes(c.n);
    const lec=lecs.find(l=>l.country===curTab&&l.subject===c.n);
    if(!sel) return `
      <div class="cc locked">
        <div class="lk-ov"><div style="font-size:26px">🔒</div><div style="font-size:11px;color:#999">غير مشترك</div></div>
        <div style="font-size:28px;margin-bottom:8px">${c.i}</div>
        <h4 style="font-size:14px;font-weight:700">${c.n}</h4>
      </div>`;
    if(!active){
      const m=encodeURIComponent("مرحباً، أنا "+CU.name+" - "+CU.phone+" - أريد الاشتراك في "+c.n+" - "+(CU.grade||""));
      return `
      <div class="cc pending">
        <div style="font-size:28px;margin-bottom:8px">${c.i}</div>
        <h4 style="font-size:14px;font-weight:700;margin-bottom:6px">${c.n}</h4>
        <div style="font-size:11px;color:var(--muted);margin-bottom:8px">في انتظار التفعيل</div>
        <a href="https://wa.me/201101631329?text=${m}" target="_blank" style="display:block;background:linear-gradient(135deg,var(--gold),var(--gold2));color:#fff;padding:7px;border-radius:10px;font-size:12px;font-weight:700;text-align:center">💬 اشترك الآن</a>
      </div>`;}
    const qlist=qzs.filter(q=>q.subject===c.n);
    return `
      <div class="cc">
        <div style="font-size:28px;margin-bottom:8px">${c.i}</div>
        <h4 style="font-size:14px;font-weight:700;margin-bottom:6px">${c.n}</h4>
        <span class="cb act">مفعل ✅</span>
        ${lec?`<div style="margin-top:8px"><a href="${lec.link}" target="_blank" style="color:var(--gold);font-size:12px">📎 رابط المحاضرة</a></div>`:''}
        ${qlist.map(q=>`<button onclick="openQM(${q.id})" style="display:block;width:100%;margin-top:6px;background:rgba(0,201,177,0.1);border:1px solid var(--gold);color:var(--gold);padding:6px;border-radius:8px;cursor:pointer;font-family:'Cairo',sans-serif;font-size:12px;font-weight:700">📝 ${q.title}</button>`).join('')}
      </div>`;
  }).join('');
}
function renderMC(){
  if(!CU)return;
  $('mc').innerHTML=(CU.subjects||[]).map(s=>`
    <div class="cc">
      <div style="font-size:26px;margin-bottom:8px">${ICONS[s]||'📚'}</div>
      <h4 style="font-size:13px;font-weight:700;margin-bottom:6px">${s}</h4>
      <span class="cb act">مشترك ✅</span>
    </div>`).join('');
}

// ===== QUIZ =====
function openQM(id){
  curQZ=qzs.find(q=>q.id===id);
  if(!curQZ)return;
  qzAns={};
  $('qm-title').textContent='📝 '+curQZ.title;
  renderQMB();
  $('qmodal').classList.add('open');
}
function closeQM(){$('qmodal').classList.remove('open');curQZ=null;}
function renderQMB(){
  $('qm-body').innerHTML=curQZ.questions.map((q,i)=>`
    <div style="margin-bottom:16px;padding:14px;background:var(--bg);border-radius:12px;border:1px solid var(--border)">
      <div style="font-weight:700;margin-bottom:10px;font-size:14px">${i+1}. ${q.q}</div>
      ${q.opts.map((o,j)=>`<div class="qopt${qzAns[i]===j?' sel':''}" onclick="selA(${i},${j})">${o}</div>`).join('')}
    </div>`).join('')+`<button class="btn-f" onclick="subQZ()">✅ تسليم الإجابات</button>`;
}
function selA(i,j){qzAns[i]=j;renderQMB();}
function subQZ(){
  let sc=0;
  curQZ.questions.forEach((q,i)=>{if(qzAns[i]===q.correct)sc++;});
  const pct=Math.round(sc/curQZ.questions.length*100);
  $('qm-body').innerHTML=`
    <div style="text-align:center;padding:20px">
      <div style="font-size:60px;margin-bottom:12px">${pct>=60?'🎉':'💪'}</div>
      <div style="font-size:32px;font-weight:900;color:${pct>=60?'var(--success)':'var(--danger)'}">${pct}%</div>
      <div style="font-size:16px;color:var(--muted);margin:8px 0">أجبت ${sc} من ${curQZ.questions.length} صح</div>
      <button class="btn-f" style="width:auto;padding:10px 24px;margin-top:16px" onclick="qzAns={};renderQMB()">إعادة المحاولة</button>
    </div>`;
}

// ===== ADMIN =====
function loadAdmin(){
  sts  = JSON.parse(localStorage.getItem("tl_s")||"[]");
  lecs = JSON.parse(localStorage.getItem("tl_l")||"[]");
  qzs  = JSON.parse(localStorage.getItem("tl_q")||"[]");
  $('st-s').textContent=sts.length;
  $('st-l').textContent=lecs.length;
  $('st-q').textContent=qzs.length;
  renderST(); renderLL(); updLG();
}
function saveS(){localStorage.setItem("tl_s",JSON.stringify(sts));}
function renderST(){
  const b=$('st-body');
  if(!sts.length){b.innerHTML='<tr><td colspan="6" style="text-align:center;color:var(--muted);padding:20px">لا يوجد طلاب بعد</td></tr>';return;}
  b.innerHTML=sts.map(s=>`
    <tr>
      <td><strong>${s.name}</strong></td>
      <td style="color:var(--muted);font-size:12px">${s.phone}</td>
      <td>${FL[s.country]||''} ${s.province||''}</td>
      <td style="font-size:12px">${s.grade||''}</td>
      <td style="font-size:11px;color:var(--muted)">${(s.subjects||[]).join("، ")}</td>
      <td><button class="mb" onclick="openP(${s.id})">${panelId===s.id?'إغلاق':'⚙️ إدارة'}</button></td>
    </tr>`).join('');
}
function openP(id){
  const p=$('st-panel');
  if(panelId===id){panelId=null;p.classList.remove('open');renderST();return;}
  panelId=id;
  const s=sts.find(x=>x.id===id);
  if(!s)return;
  p.classList.add('open');
  $('p-title').textContent='⚙️ إدارة اشتراك: '+s.name;
  $('p-subs').textContent=(s.subjects||[]).join(" · ")||'—';
  $('p-info').innerHTML=[
    ['👤 الاسم',s.name],['📱 الطالب',s.phone],
    ['👨‍👩‍👧 ولي الأمر',s.parentPhone||'—'],['🌍 الدولة',CN[s.country]||s.country],
    ['🏙️ المحافظة',s.province||'—'],['📚 المرحلة',s.grade||'—']
  ].map(([l,v])=>`<div class="ib"><div class="lb">${l}</div><div class="vl">${v}</div></div>`).join('');
  $('fl-inp').value=s.freeLink||'';
  const ft=$('fl-test'), fa=$('fl-a');
  if(s.freeLink){ft.style.display='block';fa.href=s.freeLink;} else ft.style.display='none';
  $('p-tog').innerHTML=(s.subjects||[]).map(sub=>{
    const a=(s.activeSubs||[]).includes(sub);
    return `<div class="st${a?' act':''}" onclick="togSub(${id},'${sub}')">${a?'✅':'🔒'} ${sub}</div>`;
  }).join('')||'<p style="color:var(--muted);font-size:13px">لم يختر مواد بعد</p>';
  renderST();
}
function togSub(sid,sub){
  const i=sts.findIndex(s=>s.id===sid);
  if(i<0)return;
  const cur=sts[i].activeSubs||[];
  sts[i].activeSubs=cur.includes(sub)?cur.filter(x=>x!==sub):[...cur,sub];
  saveS();
  if(CU&&CU.id===sid){CU=sts[i];localStorage.setItem("tl_u",JSON.stringify(CU));}
  openP(sid);
}
function saveFL(){
  const v=$('fl-inp').value.trim(), i=sts.findIndex(s=>s.id===panelId);
  if(i<0)return;
  sts[i].freeLink=v; saveS();
  const ft=$('fl-test'), fa=$('fl-a');
  if(v){ft.style.display='block';fa.href=v;} else ft.style.display='none';
  if(CU&&CU.id===panelId){CU=sts[i];localStorage.setItem("tl_u",JSON.stringify(CU));}
}
function updLG(){
  const c=$('lec-c').value;
  $('lec-g').innerHTML=(GR[c]||[]).map(g=>`<option>${g}</option>`).join('');
}
function saveLec(){
  const t=$('lec-t').value.trim(), l=$('lec-l').value.trim();
  if(!t||!l)return alert("أدخل العنوان والرابط");
  lecs.push({id:Date.now(),title:t,subject:$('lec-s').value,country:$('lec-c').value,grade:$('lec-g').value,link:l});
  localStorage.setItem("tl_l",JSON.stringify(lecs));
  $('lec-t').value=''; $('lec-l').value='';
  const ok=$('lok');ok.classList.add('show');setTimeout(()=>ok.classList.remove('show'),3000);
  $('st-l').textContent=lecs.length;
  renderLL();
}
function renderLL(){
  $('lec-list').innerHTML=lecs.map(l=>`
    <div class="lec-r">
      <div><strong>${l.title}</strong><div style="font-size:12px;color:var(--muted)">${FL[l.country]||''} ${l.subject} · ${l.grade}</div></div>
      <a href="${l.link}" target="_blank" style="color:var(--gold);font-size:13px">🔗 فتح</a>
    </div>`).join('');
}
function addQ(){
  const i=qzQs.length;
  qzQs.push({q:'',opts:['','','',''],correct:0});
  const d=document.createElement('div');
  d.style.cssText='background:var(--bg);border:1px solid var(--border);border-radius:12px;padding:14px;margin-bottom:10px';
  d.innerHTML=`
    <div style="color:var(--gold);font-weight:700;margin-bottom:8px">السؤال ${i+1}</div>
    <input placeholder="نص السؤال" style="width:100%;margin-bottom:8px;padding:10px 12px;background:var(--card);border:1px solid var(--border);border-radius:10px;color:var(--txt);font-family:'Cairo',sans-serif;outline:none" onchange="qzQs[${i}].q=this.value">
    ${[0,1,2,3].map(j=>`
      <div style="display:flex;gap:8px;margin-bottom:6px;align-items:center">
        <input type="radio" name="c${i}" value="${j}" ${j===0?'checked':''} onchange="qzQs[${i}].correct=${j}">
        <input placeholder="الخيار ${j+1}" style="flex:1;padding:8px 12px;background:var(--card);border:1px solid var(--border);border-radius:8px;color:var(--txt);font-family:'Cairo',sans-serif;outline:none" onchange="qzQs[${i}].opts[${j}]=this.value">
      </div>`).join('')}`;
  $('qz-qs').appendChild(d);
}
function saveQz(){
  const t=$('qz-t').value.trim();
  if(!t||!qzQs.length)return alert("أدخل العنوان وأضف أسئلة");
  qzs.push({id:Date.now(),title:t,subject:$('qz-s').value,questions:[...qzQs]});
  localStorage.setItem("tl_q",JSON.stringify(qzs));
  $('qz-t').value=''; $('qz-qs').innerHTML=''; qzQs=[];
  const ok=$('qok');ok.classList.add('show');setTimeout(()=>ok.classList.remove('show'),3000);
  $('st-q').textContent=qzs.length;
}

// ===== INIT =====
updNav();
if(CU){
  if(CU.role==='admin'){loadAdmin();showPage('admin');}
  else{loadDash();showPage('dashboard');}
}
