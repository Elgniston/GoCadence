const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('menu');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    if (menu.classList.contains('open')) { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
  }));
}
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
const siteNameEl = document.getElementById('site-name');
const footerNameEl = document.getElementById('footer-name');
if (siteNameEl && footerNameEl) footerNameEl.textContent = siteNameEl.textContent;
