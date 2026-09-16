const loader = document.getElementById('loader');
window.addEventListener('load', () => setTimeout(() => loader?.classList.add('hide'), 500));

const menu = document.getElementById('menu');
const nav = document.getElementById('nav');
menu?.addEventListener('click', () => nav?.classList.toggle('open'));

// Navigation: force reliable in-page scrolling, including PROJETS.
document.querySelectorAll('#nav a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const id = link.getAttribute('href');
    const target = id ? document.querySelector(id) : null;
    if (!target) return;
    event.preventDefault();
    nav?.classList.remove('open');
    const top = target.getBoundingClientRect().top + window.scrollY - 82;
    window.scrollTo({ top, behavior: 'smooth' });
    history.replaceState(null, '', id);
  });
});

document.querySelectorAll('.buttons a[href^="#"], footer a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const id = link.getAttribute('href');
    const target = id ? document.querySelector(id) : null;
    if (!target) return;
    event.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 82;
    window.scrollTo({ top, behavior: 'smooth' });
    history.replaceState(null, '', id);
  });
});

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('#nav a[href^="#"]')];
window.addEventListener('scroll', () => {
  let current = 'home';
  sections.forEach((section) => {
    if (window.scrollY + 180 >= section.offsetTop) current = section.id;
  });
  navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
}, { passive: true });

const clubPreview = `
  <div class="modal-club-ui">
    <div class="club-nav"><b>📖 Club de Lecture</b><span>SIMULATION</span></div>
    <div class="club-layout">
      <aside>
        <button type="button" class="sim-tab active" data-sim-tab="dashboard">Tableau de bord</button>
        <button type="button" class="sim-tab" data-sim-tab="books">Lectures</button>
        <button type="button" class="sim-tab" data-sim-tab="sessions">Sessions</button>
        <button type="button" class="sim-tab" data-sim-tab="members">Membres</button>
      </aside>
      <div class="club-content" id="clubSimContent"></div>
    </div>
  </div>`;

const clubViews = {
  dashboard: `
    <small>TABLEAU DE BORD</small><h4>Bonjour, Administrateur 👋</h4>
    <div class="club-stats"><div><b>12</b><span>Lectures</span></div><div><b>24</b><span>Membres</span></div><div><b>38</b><span>Avis</span></div><div><b>8</b><span>Sessions</span></div></div>
    <div class="club-cols"><div class="club-panel"><strong>Lectures récentes</strong><div class="club-book"><i>📕</i><span><b>Le Petit Prince</b><small>Antoine de Saint-Exupéry</small></span><em>4.7</em></div><div class="club-book"><i>📗</i><span><b>1984</b><small>George Orwell</small></span><em>4.5</em></div></div><div class="club-panel"><strong>Ma progression</strong><div class="mini-progress"><span>Le Petit Prince</span><b>72%</b><i><u style="width:72%"></u></i></div><div class="mini-progress"><span>1984</span><b>45%</b><i><u style="width:45%"></u></i></div></div></div>`,
  books: `<small>CATALOGUE</small><h4>Mes lectures</h4><div class="club-cols"><div class="club-panel"><strong>Le Petit Prince</strong><p>Antoine de Saint-Exupéry</p><div class="mini-progress"><span>Progression</span><b>72%</b><i><u style="width:72%"></u></i></div></div><div class="club-panel"><strong>1984</strong><p>George Orwell</p><div class="mini-progress"><span>Progression</span><b>45%</b><i><u style="width:45%"></u></i></div></div></div>`,
  sessions: `<small>SESSIONS</small><h4>Historique de lecture</h4><div class="club-panel session-sim"><div><b>Session #08</b><span>1984 · 45 min</span><em>Aujourd'hui</em></div><div><b>Session #07</b><span>Le Petit Prince · 30 min</span><em>Hier</em></div><div><b>Session #06</b><span>1984 · 25 min</span><em>12/09</em></div></div>`,
  members: `<small>MEMBRES</small><h4>Utilisateurs du club</h4><div class="club-panel member-sim"><div><b>Alex Martin</b><span>Administrateur</span></div><div><b>Sarah Dubois</b><span>Modérateur</span></div><div><b>Thomas Leroy</b><span>Membre</span></div></div>`
};

const projectData = {
  club: {
    kicker: '01 · WEB / DATABASE',
    title: 'Club lecture',
    summary: "Application web PHP/MySQL réalisée dans le cadre de ma formation pour référencer et gérer les lectures d’un club.",
    tags: ['PHP 8', 'MySQL / PDO', 'HTML5 / CSS3', 'JavaScript', 'MVC', 'SQL'],
    details: "Le projet comprend un espace d’authentification, un tableau de bord, un catalogue de livres et leur fiche détaillée. Les livres sont stockés dans une base MySQL avec titre, auteur, description, couverture et dates de lecture. J’ai également intégré la gestion des avis et notes, le suivi de progression, les sessions de lecture et l’accès à des documents PDF. La structure MVC sépare modèles, contrôleurs et vues. Plusieurs rôles sont gérés : administrateur, modérateur et membre, avec des contrôles CSRF, des requêtes préparées PDO et une validation des uploads.",
    visual: clubPreview,
    download: 'club-lecture/download.html'
  },
  network: {
    kicker: '02 · INFRASTRUCTURE',
    title: 'Infrastructure réseau',
    summary: 'Projet pratique autour de la conception et de la configuration d’une infrastructure réseau.',
    tags: ['RÉSEAU', 'ADRESSAGE IP', 'ROUTAGE', 'DHCP', 'DNS', 'PACKET TRACER'],
    details: "Mise en pratique des notions vues en BTS SIO SISR autour de l’adressage, du routage et des services réseau afin de construire une architecture cohérente."
  },
  portfolio: {
    kicker: '03 · PERSONAL / WEB',
    title: 'Portfolio 2026',
    summary: 'Conception et développement de mon portfolio pour présenter mon profil, mon expérience et mes projets IT.',
    tags: ['HTML', 'CSS', 'JAVASCRIPT', 'UI / UX', 'GITHUB'],
    details: "Conception d’une interface responsive orientée recrutement, avec une direction artistique premium, une navigation par sections et des fiches projet interactives."
  }
};

const modal = document.getElementById('projectModal');
const closeBtn = document.getElementById('modalClose');
const kicker = document.getElementById('modalKicker');
const title = document.getElementById('modalTitle');
const summary = document.getElementById('modalSummary');
const tags = document.getElementById('modalTags');
const details = document.getElementById('modalDetails');
const visual = document.getElementById('modalVisual');

function initClubSimulation() {
  const root = visual?.querySelector('.modal-club-ui');
  const content = root?.querySelector('#clubSimContent');
  if (!root || !content) return;
  const render = (view) => {
    content.innerHTML = clubViews[view] || clubViews.dashboard;
    root.querySelectorAll('.sim-tab').forEach((tab) => tab.classList.toggle('active', tab.dataset.simTab === view));
  };
  root.querySelectorAll('.sim-tab').forEach((tab) => tab.addEventListener('click', () => render(tab.dataset.simTab)));
  render('dashboard');
}

function addModalActions(project) {
  const box = modal?.querySelector('.project-modal-box');
  if (!box) return;
  let actions = document.getElementById('modalActions');
  if (!actions) {
    actions = document.createElement('div');
    actions.id = 'modalActions';
    actions.className = 'modal-actions';
    const grid = box.querySelector('.modal-grid');
    (grid || box).after(actions);
  }
  actions.innerHTML = project.download
    ? `<a class="btn primary" href="${project.download}" download>↓ Télécharger le projet ZIP</a><span class="modal-demo-note">Démo interactive simulée · données fictives</span>`
    : '';
}

function openProject(id) {
  const project = projectData[id];
  if (!project || !modal) return;
  kicker.textContent = project.kicker;
  title.textContent = project.title;
  summary.textContent = project.summary;
  tags.innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join('');
  details.textContent = project.details;
  if (visual) visual.innerHTML = project.visual || '';
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  addModalActions(project);
  if (id === 'club') initClubSimulation();
}

function closeProject() {
  modal?.classList.remove('open');
  modal?.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('.project-card[data-project]').forEach((card) => {
  card.addEventListener('click', () => openProject(card.dataset.project));
});
closeBtn?.addEventListener('click', closeProject);
modal?.addEventListener('click', (event) => { if (event.target.matches('[data-close]')) closeProject(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeProject(); });

// Premium custom cursor.
(() => {
  if (!window.matchMedia('(pointer:fine)').matches || window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  const dot = document.createElement('div');
  const ring = document.createElement('div');
  dot.className = 'mc-cursor-dot';
  ring.className = 'mc-cursor-ring';
  document.body.append(dot, ring);
  let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;
  window.addEventListener('mousemove', (event) => { x = event.clientX; y = event.clientY; dot.style.left = `${x}px`; dot.style.top = `${y}px`; });
  const moveRing = () => { rx += (x - rx) * 0.14; ry += (y - ry) * 0.14; ring.style.left = `${rx}px`; ring.style.top = `${ry}px`; requestAnimationFrame(moveRing); };
  moveRing();
  document.querySelectorAll('a,button,.project-card,[role="button"]').forEach((element) => {
    element.addEventListener('mouseenter', () => { ring.classList.add('is-hover'); dot.classList.add('is-hover'); });
    element.addEventListener('mouseleave', () => { ring.classList.remove('is-hover'); dot.classList.remove('is-hover'); });
  });
  window.addEventListener('mousedown', () => ring.classList.add('is-down'));
  window.addEventListener('mouseup', () => ring.classList.remove('is-down'));
})();
