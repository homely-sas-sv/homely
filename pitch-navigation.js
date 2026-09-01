(() => {
  const sections = [
    ['Portada', 'index.html'],
    ['Justificación S.A.S.', 'views/justificacion.html'],
    ['Perfil de socios', 'views/perfilSocios.html'],
    ['Proyección de inversión', 'views/proyeccionInversion.html'],
    ['Mercado meta', 'views/mercadoMeta.html'],
    ['Fundamento legal', 'views/fundamentoLegal.html'],
    ['Gobierno Corporativo', 'views/estructura.html'],
    ['Capital Social', 'views/capital.html'],
    ['Modelo de Negocio', 'views/modeloNegocio.html'],
    ['Viabilidad', 'views/viavilidadEco.html'],
    ['Roadmap', 'views/viavilidadTecno.html'],
    ['Blindaje Legal', 'views/viavilidadJuridica.html'],
    ['Protección Datos', 'views/seguridad.html'],
    ['Conclusión', 'views/analisis.html']
  ];

  const currentPath = location.pathname;
  const currentIndex = Math.max(0, sections.findIndex(([, path]) => currentPath.endsWith(path)));
  const resolve = (path) => location.pathname.includes('/views/') ? `../${path}` : path;
  const icon = (name) => `<span class="material-symbols-outlined" aria-hidden="true">${name}</span>`;
  const sectionIcons = ['view_in_ar_new', 'history_edu', 'groups', 'monitoring', 'target', 'gavel', 'account_balance', 'payments', 'business_center', 'analytics', 'timeline', 'gavel', 'security', 'verified'];

  const style = document.createElement('style');
  style.textContent = `
    html { scroll-behavior: smooth; }
    body { padding-bottom: 5rem; transition: opacity .18s ease; }
    body.pitch-leaving { opacity: 0; }
    .pitch-header { display: none !important; }
    .pitch-sidebar { position: fixed; inset: 0 auto 0 0; z-index: 90; display: flex; flex-direction: column; box-sizing: border-box; width: 20rem; overflow-y: auto; padding: 1.5rem 1rem; background: #fdebdc; border-right: 1px solid #dcc1b5; box-shadow: 0 2px 10px rgba(74, 63, 53, .08); color: #231a11; font-family: 'Plus Jakarta Sans', sans-serif; }
    .pitch-sidebar__brand { padding: .25rem .5rem 1.25rem; }
    .pitch-sidebar__brand h1 { margin: 0; color: #9b4509; font-size: 1.5rem; font-weight: 800; letter-spacing: -.03em; }
    .pitch-sidebar__brand p { margin: .25rem 0 0; color: #554339; font-size: .75rem; }
    .pitch-sidebar__links { display: flex; flex: 1; flex-direction: column; gap: .18rem; margin: 0; padding: 0; list-style: none; }
    .pitch-sidebar__links a { display: flex; align-items: center; gap: .75rem; min-height: 2.55rem; box-sizing: border-box; padding: .55rem .75rem; border-radius: .5rem; color: #554339; font-size: .8125rem; font-weight: 600; line-height: 1.15; text-decoration: none; transition: background .18s ease, color .18s ease; }
    .pitch-sidebar__links a:hover { background: #ebe1d6; color: #9b4509; }
    .pitch-sidebar__links a[aria-current='page'] { padding-right: .5rem; border-right: 4px solid #9b4509; background: rgba(235, 225, 214, .75); color: #9b4509; font-weight: 800; }
    .pitch-sidebar__links .material-symbols-outlined { flex: 0 0 1.25rem; font-size: 1.2rem; }
    .pitch-menu, .pitch-controls { position: fixed; z-index: 100; box-shadow: 0 10px 28px rgba(52, 47, 41, .18); }
    .pitch-menu { display: none; top: 1rem; left: 1rem; width: 2.75rem; height: 2.75rem; border: 0; border-radius: .75rem; background: #fff; color: #745741; align-items: center; justify-content: center; }
    .pitch-controls { right: 1rem; bottom: 1rem; display: flex; align-items: center; gap: .25rem; padding: .25rem; border-radius: .85rem; background: #fff; color: #745741; }
    .pitch-controls button { display: grid; place-items: center; width: 2.5rem; height: 2.5rem; border: 0; border-radius: .6rem; background: transparent; color: inherit; cursor: pointer; }
    .pitch-controls button:hover, .pitch-menu:hover { background: #f2ebe5; }
    .pitch-controls button:disabled { opacity: .35; cursor: default; }
    @media (max-width: 767px) {
      .pitch-menu { display: flex; }
      .pitch-sidebar { display: flex !important; transform: translateX(-105%); transition: transform .25s ease; width: min(20rem, 86vw); z-index: 99; }
      .pitch-sidebar.is-open { transform: translateX(0); }
    }
    @media print { .pitch-menu, .pitch-controls { display: none !important; } body { padding-bottom: 0; } }
  `;
  document.head.append(style);

  document.querySelectorAll('header').forEach(header => header.classList.add('pitch-header'));
  // Las plantillas tienen sidebars con estructuras distintas (nav o aside).
  // Las ocultamos y montamos una única versión para todo el pitch.
  document.querySelectorAll('body > nav, body > aside').forEach(candidate => {
    const classes = candidate.className || '';
    if (/fixed/.test(classes) && /left-0/.test(classes) && /(w-80|h-screen)/.test(classes)) candidate.style.display = 'none';
  });
  const nav = document.createElement('nav');
  nav.className = 'pitch-sidebar pitch-nav';
  nav.setAttribute('aria-label', 'Navegación de la presentación');
  nav.innerHTML = `<div class="pitch-sidebar__brand"><h1>HOMELY S.A.S.</h1><p>Executive Pitch 2026</p></div><ul class="pitch-sidebar__links">${sections.map(([name, path], index) => `<li><a href="${resolve(path)}"${index === currentIndex ? ' aria-current="page"' : ''}>${icon(sectionIcons[index])}<span>${name}</span></a></li>`).join('')}</ul>`;
  document.body.prepend(nav);

  const newViewTitles = {
    'views/perfilSocios.html': 'Perfil de socios',
    'views/proyeccionInversion.html': 'Proyección de inversión',
    'views/mercadoMeta.html': 'Mercado meta',
    'views/fundamentoLegal.html': 'Fundamento legal'
  };
  const visibleTitle = Object.entries(newViewTitles).find(([, path]) => currentPath.endsWith(path))?.[1];
  if (visibleTitle) {
    const heading = document.querySelector('main h2');
    if (heading) heading.textContent = visibleTitle;
  }

  const menu = document.createElement('button');
  menu.className = 'pitch-menu';
  menu.type = 'button';
  menu.setAttribute('aria-label', 'Abrir navegación');
  menu.innerHTML = icon('menu');
  menu.addEventListener('click', () => nav?.classList.toggle('is-open'));
  document.body.append(menu);

  const controls = document.createElement('div');
  controls.className = 'pitch-controls';
  controls.innerHTML = `<button type="button" data-action="previous" aria-label="Sección anterior">${icon('arrow_back')}</button><button type="button" data-action="next" aria-label="Sección siguiente">${icon('arrow_forward')}</button><button type="button" data-action="print" aria-label="Imprimir presentación">${icon('print')}</button><button type="button" data-action="present" aria-label="Pantalla completa">${icon('fullscreen')}</button>`;
  const navigate = target => {
    document.body.classList.add('pitch-leaving');
    window.setTimeout(() => { location.href = target; }, 180);
  };
  nav?.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      navigate(link.href);
    });
  });
  const go = direction => {
    const target = currentIndex + direction;
    if (target >= 0 && target < sections.length) navigate(resolve(sections[target][1]));
  };
  controls.querySelector('[data-action="previous"]').disabled = currentIndex === 0;
  controls.querySelector('[data-action="next"]').disabled = currentIndex === sections.length - 1;
  controls.addEventListener('click', event => {
    const action = event.target.closest('button')?.dataset.action;
    if (action === 'previous') go(-1);
    if (action === 'next') go(1);
    if (action === 'print') window.print();
    if (action === 'present') {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen?.();
    }
  });
  document.body.append(controls);

  document.addEventListener('keydown', event => {
    if (/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName)) return;
    if (event.key === 'ArrowLeft') go(-1);
    if (event.key === 'ArrowRight') go(1);
    if (event.key === 'Escape') nav?.classList.remove('is-open');
  });
  document.addEventListener('click', event => {
    if (nav?.classList.contains('is-open') && !nav.contains(event.target) && !menu.contains(event.target)) nav.classList.remove('is-open');
  });
})();
