/* macOS Tahoe interactions
 - progress bar
 - header shrink
 - dock-like nav zoom (mouse move)
 - project "open app" animation on scroll (staggered)
 - smooth anchor scroll
 - fake form submit
*/

(() => {
  // helpers
  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from((ctx || document).querySelectorAll(s));

  // progress bar
  const progress = $('#progress');
  function updateProgress(){
    const y = window.scrollY;
    const h = document.body.scrollHeight - window.innerHeight;
    const pct = h > 0 ? (y / h) * 100 : 0;
    if(progress) progress.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress);
  updateProgress();

  // header shrink toggling
  const header = $('#header');
  function onScrollHeader(){
    if(window.scrollY > 60) header.classList.add('shrink'); else header.classList.remove('shrink');
  }
  window.addEventListener('scroll', onScrollHeader);

  // Dock-like zoom effect for nav items:
  // on mousemove within header, compute distance to each nav item and scale accordingly
  const nav = $('#nav');
  const navItems = $$('.nav-item');
  if(nav){
    nav.addEventListener('mousemove', (e) => {
      const rect = nav.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      navItems.forEach((a, i) => {
        const itemRect = a.getBoundingClientRect();
        const itemCenter = (itemRect.left + itemRect.right) / 2 - rect.left;
        const dist = Math.abs(mouseX - itemCenter);
        // scale: closer -> bigger (max 1.25)
        const maxDist = 160; // influence radius
        const pct = Math.max(0, 1 - dist / maxDist);
        const scale = 1 + pct * 0.28;
        a.style.transform = `scale(${scale})`;
        a.style.zIndex = Math.round(pct * 100);
      });
    });
    nav.addEventListener('mouseleave', () => {
      navItems.forEach(a => {
        a.style.transform = '';
        a.style.zIndex = '';
      });
    });
  }

  // project "open app" animation on enter viewport (staggered)
  const projectCards = $$('.project-card');
  const projObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        // find all cards and add class with stagger based on data-index or order
        projectCards.forEach((card, idx) => {
          // only animate those not yet opened
          if(!card.classList.contains('open')){
            setTimeout(() => card.classList.add('open'), idx * 180);
          }
        });
        projObserver.disconnect();
      }
    });
  }, {threshold: 0.18});
  if(projectCards.length) projObserver.observe(projectCards[0]);

  // smooth anchor scroll
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if(href.startsWith('#')){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // fake form submit
  const form = $('#contactForm');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const notice = $('#formNotice');
      if(notice){
        notice.style.display = 'block';
        setTimeout(()=> notice.style.display = 'none', 3000);
      }
      form.reset();
    });
  }

  window.openMail = () => location.href = 'mailto:rendi@rendi.com';

  // set footer year
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

})();
