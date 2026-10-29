const loader=document.getElementById('loader');window.addEventListener('load',()=>setTimeout(()=>loader?.classList.add('hide'),500));
const menu=document.getElementById('menu'),nav=document.getElementById('nav');
const setMenu=open=>{nav?.classList.toggle('open',open);menu?.setAttribute('aria-expanded',String(open))};
menu?.addEventListener('click',()=>setMenu(!nav?.classList.contains('open')));
const sections=[...document.querySelectorAll('main section[id]:not([hidden])')],links=[...document.querySelectorAll('nav a')];
window.addEventListener('scroll',()=>{let current='home';sections.forEach(s=>{if(scrollY+180>=s.offsetTop)current=s.id});links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current))},{passive:true});
/* Reliable in-page navigation */
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href');if(!id||id==='#')return;const target=document.getElementById(id.slice(1));if(!target)return;e.preventDefault();const top=target.getBoundingClientRect().top+window.scrollY-92;window.scrollTo({top:Math.max(0,top),behavior:'smooth'});history.replaceState(null,'',id);setMenu(false)}));

/* Réalisations : données issues de realisations.js */
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const byId=Object.fromEntries(REALISATIONS.map(r=>[r.id,r]));
const compByKey=Object.fromEntries(E5_COMPETENCES.map(c=>[c.key,c]));
const inTable=REALISATIONS.filter(r=>r.inTable!==false&&r.group);
const compBadges=r=>r.competences.map(k=>`<span title="${esc(compByKey[k].name)}">${esc(compByKey[k].short)}</span>`).join('');

/* Statistiques de l'accueil */
const covered=E5_COMPETENCES.filter(c=>inTable.some(r=>r.competences.includes(c.key))).length;
document.querySelectorAll('[data-stat="realisations"]').forEach(el=>el.textContent=String(inTable.length).padStart(2,'0'));
document.querySelectorAll('[data-stat="coverage"]').forEach(el=>el.textContent=`${covered}/${E5_COMPETENCES.length}`);

/* Tableau de synthèse E5 */
(()=>{const comps=document.getElementById('e5Comps'),table=document.getElementById('e5Table');if(!comps||!table)return;
comps.innerHTML=E5_COMPETENCES.map((c,i)=>{const n=inTable.filter(r=>r.competences.includes(c.key)).length;return `<article><small>${String(i+1).padStart(2,'0')} · ${n} RÉALISATION${n>1?'S':''}</small><h3>${esc(c.name)}</h3><ul>${c.items.map(it=>`<li>${esc(it)}</li>`).join('')}</ul></article>`}).join('');
const head=`<thead><tr><th scope="col">Réalisation</th><th scope="col">Période</th>${E5_COMPETENCES.map(c=>`<th scope="col" title="${esc(c.name)}"><span>${esc(c.short)}</span></th>`).join('')}</tr></thead>`;
const body=E5_GROUPS.map(g=>{const rows=inTable.filter(r=>r.group===g.key);if(!rows.length)return'';return `<tbody><tr class="e5-group"><th colspan="${E5_COMPETENCES.length+2}" scope="colgroup">${esc(g.label)}</th></tr>${rows.map(r=>`<tr data-open="${r.id}" tabindex="0" aria-label="Ouvrir la fiche ${esc(r.title+' '+r.titleEm)}"><th scope="row">${esc(r.title)} ${esc(r.titleEm)}<small>${esc(r.place)}</small></th><td class="e5-period">${esc(r.period)}</td>${E5_COMPETENCES.map(c=>r.competences.includes(c.key)?`<td class="on" aria-label="${esc(c.name)}">●</td>`:'<td aria-label="non mobilisée"></td>').join('')}</tr>`).join('')}</tbody>`}).join('');
const foot=`<tfoot><tr><th scope="row" colspan="2">Couverture des compétences</th>${E5_COMPETENCES.map(c=>`<td>${inTable.filter(r=>r.competences.includes(c.key)).length}</td>`).join('')}</tr></tfoot>`;
table.insertAdjacentHTML('beforeend',head+body+foot)})();

/* Cartes compactes des réalisations sans visuel dédié */
(()=>{const grid=document.getElementById('realGrid');if(!grid)return;const featured=new Set([...document.querySelectorAll('.project-card[data-project]')].map(c=>c.dataset.project));
grid.innerHTML=REALISATIONS.filter(r=>!featured.has(r.id)).map(r=>`<article class="project-card real-card" data-project="${r.id}" data-track="${r.track}"><small>${r.track==='entreprise'?'EN ENTREPRISE':'EN FORMATION'} · ${esc(r.period)}</small><h3>${esc(r.title)} <em>${esc(r.titleEm)}</em></h3><p>${esc(r.summary)}</p><span class="real-place">${esc(r.place)}</span><div class="card-comps">${compBadges(r)}</div><b class="real-open">Voir la fiche →</b></article>`).join('');
document.querySelectorAll('.card-comps[data-comps]').forEach(el=>{const r=byId[el.dataset.comps];if(r)el.innerHTML=compBadges(r)})})();

const clubPreview="<div class=\"club-browser\"><div class=\"club-browserbar\"><span></span><span></span><span></span><small>club-lecture · application web</small></div><div class=\"club-app\"><div class=\"club-app-top\"><b>📖 Club Lecture</b><div class=\"club-search\">Rechercher un livre…</div><span>Administrateur</span></div><div class=\"club-app-body\"><aside><b>⌂ Tableau de bord</b><span>▤ Bibliothèque</span><span>◷ Sessions</span><span>★ Avis</span><span>♙ Membres</span></aside><main><div class=\"club-hero-line\"><div><small>TABLEAU DE BORD</small><h4>Bonjour, Administrateur 👋</h4><p>Suivez vos lectures, vos sessions et vos recommandations.</p></div><span class=\"club-demo-badge\">DEMO</span></div><div class=\"club-stats\"><div><b>12</b><span>Lectures</span></div><div><b>24</b><span>Membres</span></div><div><b>38</b><span>Avis</span></div><div><b>8</b><span>Sessions</span></div></div><div class=\"club-preview-grid\"><div class=\"club-panel\"><strong>Lectures récentes</strong><div class=\"club-book\"><i>📕</i><span><b>Le Petit Prince</b><small>Antoine de Saint-Exupéry</small></span><em>4.7 ★</em></div><div class=\"club-book\"><i>📗</i><span><b>1984</b><small>George Orwell</small></span><em>4.5 ★</em></div></div><div class=\"club-panel\"><strong>Progression</strong><div class=\"mini-progress\"><span>Le Petit Prince</span><b>72%</b><i><u style=\"width:72%\"></u></i></div><div class=\"mini-progress\"><span>1984</span><b>45%</b><i><u style=\"width:45%\"></u></i></div></div></div></main></div></div></div>";
const visuals={club:clubPreview};

/* Fiche détaillée */
const modal=document.getElementById('projectModal'),closeBtn=document.getElementById('modalClose'),kicker=document.getElementById('modalKicker'),title=document.getElementById('modalTitle'),summary=document.getElementById('modalSummary'),tags=document.getElementById('modalTags'),details=document.getElementById('modalDetails'),detailsBox=document.getElementById('modalDetailsBox'),visual=document.getElementById('modalVisual'),brief=document.getElementById('modalBrief'),modalComps=document.getElementById('modalComps'),actions=document.getElementById('projectActions');
let lastFocus=null;
function openProject(id){const p=byId[id];if(!p||!modal)return;lastFocus=document.activeElement;
kicker.textContent=[p.track==='entreprise'?'EN ENTREPRISE':'EN FORMATION',p.place,p.period].filter(Boolean).join(' · ').toUpperCase();
title.innerHTML=`${esc(p.title)} <em>${esc(p.titleEm)}</em>`;summary.textContent=p.summary;
visual.innerHTML=visuals[p.visual]||'';
modalComps.innerHTML=p.competences.length?`<small>COMPÉTENCES DU TABLEAU DE SYNTHÈSE</small><div>${p.competences.map(k=>`<span>${esc(compByKey[k].name)}</span>`).join('')}</div>`:'';
brief.innerHTML=[['CONTEXTE',p.context],['OBJECTIFS',p.why],['MISE EN ŒUVRE',p.steps],['CE QUE J’AI APPRIS',p.learned]].filter(([,v])=>v).map(([h,v])=>`<article class="modal-brief-card"><small>${h}</small><p>${esc(v)}</p></article>`).join('');
tags.innerHTML=(p.tags||[]).map(t=>`<span>${esc(t)}</span>`).join('');
details.textContent=p.details||'';detailsBox.hidden=!p.details;
actions.innerHTML=[...(p.proofs||[]).map(d=>`<a class="btn" href="${esc(d.href)}" target="_blank" rel="noopener">${esc(d.label)} <span>↗</span></a>`),p.link?`<a class="btn primary" href="${esc(p.link)}" target="_blank" rel="noopener">Voir le code sur GitHub <span>↗</span></a>`:''].join('');
modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');closeBtn?.focus()}
function closeProject(){if(!modal?.classList.contains('open'))return;modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');lastFocus?.focus?.()}
document.querySelectorAll('.project-card[data-project],[data-open]').forEach(el=>{const id=el.dataset.project||el.dataset.open;if(!el.hasAttribute('tabindex'))el.tabIndex=0;if(el.matches('.project-card'))el.setAttribute('role','button');el.addEventListener('click',()=>openProject(id));el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openProject(id)}})});

/* Filtres : « Toutes » n'affiche que les réalisations terminées */
const applyFilter=filter=>document.querySelectorAll('.project-card[data-track]').forEach(card=>card.classList.toggle('is-hidden',filter==='all'?card.classList.contains('project-placeholder'):card.dataset.track!==filter));
document.querySelectorAll('.project-tab').forEach(tab=>tab.addEventListener('click',()=>{document.querySelectorAll('.project-tab').forEach(t=>{t.classList.toggle('active',t===tab);t.setAttribute('aria-selected',String(t===tab))});applyFilter(tab.dataset.filter)}));
applyFilter('all');
closeBtn?.addEventListener('click',closeProject);modal?.addEventListener('click',e=>{if(e.target.matches('[data-close]'))closeProject()});document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeProject();setMenu(false)}});

/* Veille : les descriptions RSS contiennent du HTML, seul le texte est conservé */
const plainText=html=>(new DOMParser().parseFromString(html||'','text/html').body.textContent||'').replace(/\s+/g,' ').trim();
(async()=>{const box=document.getElementById('veilleFeed'),updated=document.getElementById('veilleUpdated');if(!box)return;try{const r=await fetch('veille.json?'+Date.now());const data=await r.json();updated.textContent=data.updated_at?new Date(data.updated_at).toLocaleString('fr-FR',{dateStyle:'medium',timeStyle:'short'}):'—';box.innerHTML='';(data.articles||[]).slice(0,9).forEach(item=>{const card=document.createElement('article');card.className='veille-card';const source=document.createElement('small');const date=item.date?new Date(item.date):null;source.textContent=[item.source||'VEILLE',date&&!isNaN(date)?date.toLocaleDateString('fr-FR'):''].filter(Boolean).join(' · ');const h=document.createElement('h3');h.textContent=item.title||'Article';const p=document.createElement('p');const text=plainText(item.description);p.textContent=text?(text.length>180?text.slice(0,180).replace(/\s\S*$/,'')+'…':text):'Actualité technologique à consulter.';const a=document.createElement('a');a.href=item.link;a.target='_blank';a.rel='noopener';a.textContent='Lire la source ↗';card.append(source,h,p,a);box.appendChild(card)});if(!data.articles?.length)box.innerHTML='<div class="veille-empty">La première synchronisation automatique est en cours.</div>';}catch(e){box.innerHTML='<div class="veille-empty">La veille n’est pas disponible pour le moment.</div>';updated.textContent='Erreur de chargement';}})();
/* Premium custom cursor */
(()=>{if(!window.matchMedia('(pointer:fine)').matches||window.matchMedia('(prefers-reduced-motion:reduce)').matches)return;const dot=document.createElement('div'),ring=document.createElement('div');dot.className='mc-cursor-dot';ring.className='mc-cursor-ring';document.body.append(dot,ring);let x=innerWidth/2,y=innerHeight/2,rx=x,ry=y;window.addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;dot.style.left=`${x}px`;dot.style.top=`${y}px`});const moveRing=()=>{rx+=(x-rx)*.14;ry+=(y-ry)*.14;ring.style.left=`${rx}px`;ring.style.top=`${ry}px`;requestAnimationFrame(moveRing)};moveRing();document.querySelectorAll('a,button,.project-card,[data-open],[role="button"]').forEach(el=>{el.addEventListener('mouseenter',()=>{ring.classList.add('is-hover');dot.classList.add('is-hover')});el.addEventListener('mouseleave',()=>{ring.classList.remove('is-hover');dot.classList.remove('is-hover')})});window.addEventListener('mousedown',()=>ring.classList.add('is-down'));window.addEventListener('mouseup',()=>ring.classList.remove('is-down'))})();
