/* FyreWay SDK Docs — Shared JS */
(function(){
  /* ---------- Theme ---------- */
  const saved = localStorage.getItem('fw-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme:dark)').matches;
  const initial = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initial);

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('themeToggle');
    const btnMobile = document.getElementById('themeToggleMobile');
    function setTheme(t){
      document.documentElement.setAttribute('data-theme', t);
      localStorage.setItem('fw-theme', t);
      const icon = t === 'dark' ? '☀️' : '🌙';
      if(btn) btn.textContent = icon;
      if(btnMobile) btnMobile.textContent = icon;
    }
    function toggle(){
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    }
    setTheme(initial);
    if(btn) btn.addEventListener('click', toggle);
    if(btnMobile) btnMobile.addEventListener('click', toggle);

    /* ---------- Mobile sidebar ---------- */
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    function openSidebar(){ sidebar?.classList.add('open'); overlay?.classList.add('open'); }
    function closeSidebar(){ sidebar?.classList.remove('open'); overlay?.classList.remove('open'); }
    hamburger?.addEventListener('click', openSidebar);
    overlay?.addEventListener('click', closeSidebar);

    /* ---------- Copy buttons ---------- */
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const pre = btn.closest('.code-header')?.nextElementSibling;
        if(!pre) return;
        navigator.clipboard.writeText(pre.textContent).then(() => {
          btn.textContent = 'Copied!';
          setTimeout(() => btn.textContent = 'Copy', 1500);
        });
      });
    });

    /* ---------- Active sidebar link ---------- */
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.sidebar-link').forEach(link => {
      const href = link.getAttribute('href');
      if(href === currentPage || (currentPage === '' && href === 'index.html')){
        link.classList.add('active');
      }
    });

    /* ---------- Image lightbox ---------- */
    const imgBtn     = document.getElementById('imgPreviewBtn');
    const lightbox   = document.getElementById('lightbox');
    const lbClose    = document.getElementById('lightboxClose');

    function openLightbox(){
      lightbox?.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox(){
      lightbox?.classList.remove('open');
      document.body.style.overflow = '';
    }

    imgBtn?.addEventListener('click', openLightbox);
    lbClose?.addEventListener('click', e => { e.stopPropagation(); closeLightbox(); });
    lightbox?.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', e => {
      if(e.key === 'Escape') closeLightbox();
    });
  });
})();

