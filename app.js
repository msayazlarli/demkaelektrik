const body = document.body;
const intro = document.getElementById('introScene');
const skipIntro = document.getElementById('skipIntro');
const header = document.getElementById('siteHeader');

body.classList.add('intro-running');

let introFinished = false;
function finishIntro() {
  if (introFinished) return;
  introFinished = true;
  intro.classList.add('is-lit');
  window.setTimeout(() => {
    intro.classList.add('is-leaving');
    body.classList.remove('intro-running');
  }, 1550);
}

window.setTimeout(finishIntro, 1650);
skipIntro.addEventListener('click', finishIntro);

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 26);
}, { passive: true });

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuToggle.addEventListener('click', () => {
  const isOpen = header.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', isOpen);
  menuToggle.setAttribute('aria-label', isOpen ? 'Menüyü kapat' : 'Menüyü aç');
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  header.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal, .reveal-up').forEach((item) => observer.observe(item));

const dialog = document.getElementById('productDialog');
const dialogTitle = document.getElementById('dialogTitle');
const dialogDetail = document.getElementById('dialogDetail');
document.querySelectorAll('.catalog-card').forEach((card) => {
  card.addEventListener('click', () => {
    dialogTitle.textContent = card.dataset.product;
    dialogDetail.textContent = card.dataset.detail;
    dialog.showModal();
  });
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
document.querySelector('.dialog-contact').addEventListener('click', () => dialog.close());

document.getElementById('year').textContent = new Date().getFullYear();
