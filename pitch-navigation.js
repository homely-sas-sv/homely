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
    .pitch-menu, .pitch-controls { position: fixed; z-index: 100; box-shadow: 0 10px 28px rgba(52, 47, 41, .18); }
    .pitch-menu { display: none; top: 1rem; left: 1rem; width: 2.75rem; height: 2.75rem; border: 0; border-radius: .75rem; background: #fff; color: #745741; align-items: center; justify-content: center; }
    .pitch-controls { right: 1rem; bottom: 1rem; display: flex; align-items: center; gap: .25rem; padding: .25rem; border-radius: .85rem; background: #fff; color: #745741; }
    .pitch-controls button { display: grid; place-items: center; width: 2.5rem; height: 2.5rem; border: 0; border-radius: .6rem; background: transparent; color: inherit; cursor: pointer; }
    .pitch-controls button:hover, .pitch-menu:hover { background: #f2ebe5; }
    .pitch-controls button:disabled { opacity: .35; cursor: default; }
    @media (max-width: 767px) {
      .pitch-menu { display: flex; }
      nav.pitch-nav { display: flex !important; transform: translateX(-105%); transition: transform .25s ease; width: min(20rem, 86vw) !important; z-index: 99 !important; }
      nav.pitch-nav.is-open { transform: translateX(0); }
    }
    @media print { .pitch-menu, .pitch-controls { display: none !important; } body { padding-bottom: 0; } }
  `;
  document.head.append(style);

  document.querySelectorAll('header').forEach(header => header.classList.add('pitch-header'));
  const nav = document.querySelector('nav');
  if (nav) {
    nav.classList.add('pitch-nav');
    // Las vistas nuevas usan un contenedor vacío. Solo ahí construimos el menú;
    // las vistas existentes conservan intacta su barra lateral original.
    const menuContainer = nav.querySelector('ul.flex-1, div.flex-1');
    if (menuContainer && !nav.querySelector('a')) {
      sections.forEach(([name, path], index) => {
        const link = document.createElement('a');
        link.href = resolve(path);
        link.className = `flex items-center gap-sm px-sm py-sm rounded-lg transition-colors duration-200 ${index === currentIndex ? 'text-primary font-bold border-r-4 border-primary bg-secondary-container/50' : 'text-on-surface-variant hover:text-primary hover:bg-secondary-container'}`;
        link.setAttribute('aria-current', index === currentIndex ? 'page' : 'false');
        link.innerHTML = `${icon(sectionIcons[index])}<span class="font-label-md text-label-md">${name}</span>`;
        if (menuContainer.tagName === 'UL') {
          const item = document.createElement('li');
          item.append(link);
          menuContainer.append(item);
        } else menuContainer.append(link);
      });
    }
    nav.querySelectorAll('a, button').forEach(item => {
      const label = item.textContent.trim().replace(/\s+/g, ' ');
      if (/Contact Support|Ajustes|Cerrar Sesión/.test(label)) item.remove();
    });
    nav.querySelectorAll('a').forEach(link => {
      const label = link.textContent.trim().replace(/\s+/g, ' ');
      const index = sections.findIndex(([name]) => label.endsWith(name));
      if (index < 0) return;
      link.href = resolve(sections[index][1]);
      link.classList.toggle('pitch-active', index === currentIndex);
      link.setAttribute('aria-current', index === currentIndex ? 'page' : 'false');
    });
    Array.from(nav.querySelectorAll('div, ul, li')).reverse().forEach(item => {
      if (!item.textContent.trim() && !item.querySelector('img, svg')) item.remove();
    });
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
