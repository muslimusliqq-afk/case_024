(() => {
  'use strict';
  const STORAGE='case024.v1';
  const $=id=>document.getElementById(id);
  const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let state;
  let receipt=false;
  let storageAvailable=true;
  try{state=Quest.restore(localStorage.getItem(STORAGE));}catch{state=Quest.initial();storageAvailable=false;}
  function save(){try{localStorage.setItem(STORAGE,JSON.stringify(state));}catch{storageAvailable=false;}}
  const photo='assets/evidence_01.jpg';
  const link=new URL('index.html?evidence=01',location.href).href;
  const labels=['ENTRY POINT','EVIDENCE_01','WALLET TRACE','SHARED LOCATION'];
  const names=['Точка входа','Цифровой след','Крипторасследование','Общее прошлое'];
  const icons={
    folder:'<svg viewBox="0 0 80 80" fill="none"><path d="M12 24h22l7 8h27v30H12V24Z" stroke="currentColor" stroke-width="2"/><path d="M12 32h56M28 45h24M28 51h15" stroke="currentColor" stroke-width="2"/></svg>',
    gift:'<svg viewBox="0 0 80 80" fill="none"><path d="M15 34h50v12H15zM21 46h38v21H21zM40 34v33" stroke="currentColor" stroke-width="2"/><path d="M40 34c-22 0-22-24-10-18 7 4 10 18 10 18Zm0 0c22 0 22-24 10-18-7 4-10 18-10 18Z" stroke="currentColor" stroke-width="2"/></svg>'
  };
  function trace(){
    console.log('%cCASE 024 // SYSTEM TRACE','color:#cfefb0;font-size:15px;font-weight:bold');
    console.log('Правильное направление найдено.\nСледующий объект: EVIDENCE_01\nФайл помнит больше, чем видно на изображении.');
    console.log('OPEN EVIDENCE_01 → '+link);
    console.log('Или выполни: evidence_01()');
  }
  window.evidence_01=()=>{if(state.stage===1){Quest.recoverEvidence(state);save();render();}return state.stage>=2?new URL(photo,location.href).href:'TRACE LOCKED';};
  function shellHeading(index,title,description=''){
    return `<div class="section-meta"><span>STAGE ${String(index).padStart(2,'0')} / 04</span><span class="tag">ACTIVE INVESTIGATION</span></div><h1>${title}</h1>${description?`<p class="intro">${description}</p>`:''}`;
  }
  function form(id,label,placeholder='',extra='',numeric=false){
    return `<form id="${id}" class="answer-form" autocomplete="off"><label for="answer">${label}</label>${extra?`<span class="format">${extra}</span>`:''}<div class="input-row"><input id="answer" name="answer" aria-describedby="feedback" type="text" ${numeric?'inputmode="numeric"':''} placeholder="${placeholder}" spellcheck="false" autocapitalize="off" required><button class="primary" type="submit">VERIFY <span>↗</span></button></div><p id="feedback" class="feedback" role="status" aria-live="polite"></p></form>`;
  }
  function render(){
    $('connection').textContent=storageAvailable?'LOCAL SESSION / ACTIVE':'SESSION / MEMORY ONLY';
    $('footer-status').textContent=state.stage===6?'CASE CLOSED':state.stage===0?'AWAITING AUTHORIZATION':`FRAGMENTS RECOVERED / ${state.fragments.length.toString().padStart(2,'0')}`;
    $('stages').innerHTML=labels.map((label,i)=>{
      const n=i+1;const status=state.stage>n?'complete':state.stage===n?'active':'locked';
      return `<div class="stage ${status}" ${status==='active'?'aria-current="step"':''}><span class="stage-number">${status==='complete'?'✓':`0${n}`}</span><div><b>${label}</b><span>${names[i]}</span></div><span class="stage-light"></span></div>`;
    }).join('')+`<div class="index-end ${state.stage>=5?'ready':''}"><span>↳</span> FINAL ASSEMBLY ${state.stage===6?'✓':''}</div>`;
    $('main').className=state.stage===0?'start-page':state.stage===6?'end-page':'';
    if(state.stage===0){
      $('main').innerHTML=`<div class="section-meta"><span>SUBJECT FILE / 024</span><span class="tag danger">COMPROMISED</span></div><div class="start-title"><div class="small-label">CLASSIFIED PERSONAL ARCHIVE</div><h1>Каждый след<br>что-то <em>скрывает.</em></h1></div><div class="subject-file"><div class="file-icon">${icons.folder}<span>SUBJECT_024</span></div><dl><div><dt>SUBJECT</dt><dd>FRANCESCO</dd></div><div><dt>ALIAS</dt><dd>HOGGLEET</dd></div><div><dt>AGE</dt><dd>24</dd></div><div><dt>STATUS</dt><dd class="red">COMPROMISED</dd></div></dl><div class="file-stamp">RESTRICTED<br>ACCESS</div></div><p class="intro story">Подарок существует, но доступ к нему был разделён на несколько фрагментов. Найди их. Не доверяй всему, что увидишь.</p><button id="begin" class="primary large">BEGIN INVESTIGATION <span>↗</span></button><div class="bottom-note">04 STAGES <span>·</span> 01 FINAL ACCESS KEY</div>`;
      $('begin').onclick=()=>{Quest.begin(state);save();render();trace();$('main').focus();};
    }else if(state.stage===1){
      $('main').innerHTML=shellHeading(1,'Смотри глубже.')+`<div class="terminal-object"><div class="crosshair"><span></span><span></span><span></span><span></span><div class="scan-glyph">{ <b>?</b> }</div></div><div class="small-label">NO VISIBLE EVIDENCE</div></div><p class="puzzle-text">Ты уже знаешь, где я люблю прятать вещи.</p><div class="system-line"><span class="signal"></span> SYSTEM TRACE IS RUNNING</div>`;
    }else if(state.stage===2){
      $('main').innerHTML=shellHeading(2,'Файл помнит больше.', 'Чем видно на изображении.')+`<div class="evidence"><div class="evidence-heading"><span>EVIDENCE_01</span><span>RECOVERED OBJECT / JPG</span></div><div class="photo-frame"><img id="evidence-photo" src="${photo}" alt="EVIDENCE_01 — объект расследования"><div id="photo-missing" hidden><b>EVIDENCE_01 UNAVAILABLE</b><span>Файл пока не добавлен. Свяжись с оператором.</span></div></div><div class="evidence-actions"><a href="${photo}" target="_blank" rel="noopener" id="view-photo">OPEN ORIGINAL ↗</a><a href="${photo}" download="evidence_01.jpg" id="download-photo">DOWNLOAD FILE ↓</a></div></div>`+form('timestamp','ENTER TIMESTAMP','______','HHMMSS',true);
      $('evidence-photo').onerror=()=>{$('evidence-photo').hidden=true;$('photo-missing').hidden=false;for(const id of ['view-photo','download-photo']){$(id).removeAttribute('href');$(id).setAttribute('aria-disabled','true');$(id).tabIndex=-1;}};
      bindAnswer('timestamp');
    }else if(state.stage===3){
      $('main').innerHTML=shellHeading(3,'Пять адресов.<br>Один след.', 'Исследуй кошельки. Не доверяй всему, что увидишь.')+`<div class="scan-toolbar"><span><span class="signal"></span> USDT / BEP20</span><span>${state.scanned.length.toString().padStart(2,'0')} / 05 SCANNED</span></div><div class="wallet-list">${state.order.map((id,i)=>{
        const w=Quest.WALLETS.find(w=>w.id===id),done=state.scanned.includes(id);
        return `<button class="wallet ${done?'scanned':''}" data-wallet="${id}" ${done?'disabled':''}><span class="wallet-icon">◈</span><span class="wallet-details"><span class="small-label">WALLET / ${String(i+1).padStart(2,'0')}</span><span class="address">${w.address}</span></span><span class="wallet-result">${done?'EMPTY':'UNEXPLORED'}</span><span class="wallet-arrow">${done?'—':'↗'}</span></button>`;
      }).join('')}</div><div class="bottom-note">05 RECORDS <span>·</span> SOURCE / PERSONAL ARCHIVE</div>`;
      document.querySelectorAll('[data-wallet]').forEach(button=>button.onclick=()=>{if(Quest.openWallet(state,button.dataset.wallet)){save();renderModal();}});
    }else if(state.stage===4){
      $('main').innerHTML=shellHeading(4,'Общее прошлое.')+`<div class="location-object" aria-hidden="true"><div class="coordinate-grid"><span class="map-point"></span></div><span class="small-label">LOCATION / UNIDENTIFIED</span></div><p class="puzzle-text">Было место, где два человека какое-то время жили вместе.</p><p class="intro">Введи номер квартиры, в которой мы жили вместе.</p>`+form('location','ENTER NUMBER','___','',true);
      bindAnswer('location');
    }else if(state.stage===5){
      $('main').innerHTML=`<div class="section-meta"><span>FINAL ASSEMBLY</span><span class="tag">ALL FRAGMENTS RECOVERED</span></div><h1>Собери всё<br>воедино.</h1><p class="intro">Собери фрагменты в порядке расследования.</p><div class="fragments">${state.fragments.map((f,i)=>`<div><span class="small-label">FRAGMENT / 0${i+1}</span><b>${escape(f)}</b></div>`).join('')}</div>`+form('final','ENTER FINAL ACCESS CODE','','DIGITS ONLY · NO SPACES',true);
      bindAnswer('final');
    }else{
      $('main').innerHTML=`<div class="section-meta"><span>ACCESS GRANTED</span><span class="tag">CASE 024 CLOSED</span></div><div class="gift-icon">${icons.gift}</div><div class="small-label">INVESTIGATION COMPLETE</div><h1>С днём рождения,<br><em>HOGGLEET.</em></h1><p class="intro">Ты дошёл до конца.</p><div class="final-key"><span class="small-label">FINAL ACCESS CODE</span><strong>${escape(state.fragments.join(''))}</strong><button id="copy-code" class="text-button">COPY CODE ↗</button><span id="copy-feedback" role="status"></span></div><p class="closing-text">Отправь его мне и получишь то, ради чего всё это было.</p><div class="closed-stamp">CASE 024 / CLOSED</div>`;
      $('copy-code').onclick=async()=>{try{await navigator.clipboard.writeText(state.fragments.join(''));$('copy-feedback').textContent='COPIED';}catch{$('copy-feedback').textContent='Выдели и скопируй код вручную.';}};
    }
    renderModal();
  }
  function bindAnswer(id){
    $(id).onsubmit=async event=>{
      event.preventDefault();const button=event.currentTarget.querySelector('button');button.disabled=true;
      try{
        if(await Quest.submit(state,$('answer').value)){save();render();$('main').focus();}
        else{$('feedback').textContent='ACCESS DENIED / TRY AGAIN';$('answer').setAttribute('aria-invalid','true');$('answer').focus();}
      }catch{$('feedback').textContent='Проверка недоступна. Открой сайт в актуальном браузере по HTTPS.';}
      finally{button.disabled=false;}
    };
  }
  function renderModal(){
    const show=receipt||(state.stage===3&&(state.active||state.corrupted));
    $('shell').inert=!!show;
    if(!show){$('modal-root').innerHTML='';document.body.classList.remove('modal-open');return;}
    document.body.classList.add('modal-open');
    let content;
    if(receipt){
      content=`<div class="small-label">IDENTITY CONFIRMED</div><h2 id="modal-title">ACCESS GRANTED</h2><p class="terminal-copy">RECOVERED FRAGMENT:<br><strong>${escape(state.fragments[1])}</strong></p><button id="continue-investigation" class="primary">CONTINUE INVESTIGATION ↗</button>`;
    }else if(state.corrupted){
      content=`<div class="modal-symbol red">⚠</div><div class="small-label red">INTEGRITY FAILURE</div><h2 id="modal-title">SESSION CORRUPTED</h2><p class="terminal-copy">WALLET SCAN HISTORY ERASED</p><p class="modal-note">Записи сканирования стёрты.<br>Адреса перемешаны.</p><button id="return-scan" class="primary danger-button">RESTART SCAN ↗</button>`;
    }else{
      const w=Quest.WALLETS.find(w=>w.id===state.active.id),step=state.active.step;
      const title=step===0?'OPEN WALLET?':w.kind==='trap'?(step===1?'ARE YOU SURE?':'FINAL CONFIRMATION. CONTINUE?'):step===2?'ACCESS GRANTED':w.kind==='real'?'WALLET DATA DETECTED':'PROVE YOUR INTENTIONS.';
      content=`<div class="small-label">USDT / BEP20 · WALLET SESSION</div><h2 id="modal-title">${title}</h2><p class="modal-address">${w.address}</p>`;
      if(step===0||w.kind==='trap')content+=`<button id="confirm-wallet" class="primary large">YES / CONTINUE <span>↗</span></button>`;
      else if(step===2)content+=`<p class="terminal-copy">WALLET EMPTY<br>NO FRAGMENT DETECTED</p><button id="return-scan" class="secondary">RETURN TO SCAN ↗</button>`;
      else if(w.kind==='real')content+=`<p class="modal-note">THIS ADDRESS HAS APPEARED BEFORE.</p><p class="modal-note owner-clue">Найди полный USDT BEP20-адрес, который KIBORGXXL уже отправлял тебе в переписке.</p>`+form('wallet-answer','ENTER USDT BEP20 ADDRESS','0x…')+`<button id="return-scan" class="text-button">RETURN TO SCAN</button>`;
      else content+=`<p class="question">${w.question}</p>`+form('wallet-answer','ENTER ANSWER','','',w.kind!=='capital');
    }
    $('modal-root').innerHTML=`<div class="modal-backdrop"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">${content}<div class="modal-foot">CASE 024 / ACTIVE SESSION</div></section></div>`;
    if($('continue-investigation'))$('continue-investigation').onclick=()=>{receipt=false;renderModal();$('main').focus();};
    if($('confirm-wallet'))$('confirm-wallet').onclick=()=>{Quest.confirmWallet(state);save();render();};
    if($('return-scan'))$('return-scan').onclick=()=>{Quest.returnToScan(state);save();render();$('main').focus();};
    if($('wallet-answer'))$('wallet-answer').onsubmit=async event=>{
      event.preventDefault();const button=event.currentTarget.querySelector('button');button.disabled=true;
      try{
        if(await Quest.answerWallet(state,$('answer').value)){if(state.stage===4)receipt=true;save();render();if(state.stage!==3&&!receipt)$('main').focus();}
        else{$('feedback').textContent='ACCESS DENIED / TRY AGAIN';$('answer').setAttribute('aria-invalid','true');$('answer').focus();}
      }catch{$('feedback').textContent='Проверка недоступна. Открой сайт по HTTPS.';}
      finally{button.disabled=false;}
    };
    const first=$('modal-root').querySelector('input,button');if(first)first.focus();
  }
  document.addEventListener('keydown',event=>{
    if(!state.active&&!state.corrupted&&!receipt)return;
    if(event.key==='Escape'){event.preventDefault();return;}
    if(event.key==='Tab'){
      const items=[...$('modal-root').querySelectorAll('button:not(:disabled),input')];
      const first=items[0],last=items[items.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    }
  });
  window.addEventListener('storage',event=>{if(event.key===STORAGE&&event.newValue){state=Quest.restore(event.newValue);render();}});
  if(new URLSearchParams(location.search).get('evidence')==='01'&&state.stage===1){Quest.recoverEvidence(state);save();try{history.replaceState(null,'',location.pathname+location.hash);}catch{}}
  render();
  if(state.stage===1)trace();
})();
