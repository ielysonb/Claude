/* =============================================
   IADNME - JavaScript Principal
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* --- Navbar scroll shadow --- */
  const nav = document.getElementById('mainNav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  /* --- Active nav link --- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* --- Scroll to Top button --- */
  const scrollBtn = document.getElementById('scrollTop');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('visible', window.scrollY > 400);
    });
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* --- Intersection Observer: fade-in sections --- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  /* --- Counter animation --- */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current).toLocaleString('pt-BR') + (el.dataset.suffix || '');
      if (current >= target) clearInterval(timer);
    }, 16);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

  /* --- Modal Entrega de Vida --- */
  const formJesus = document.getElementById('formJesus');
  if (formJesus) {
    formJesus.addEventListener('submit', function (e) {
      e.preventDefault();
      const nome = document.getElementById('jesusNome').value.trim();
      const modal = bootstrap.Modal.getInstance(document.getElementById('modalJesus'));
      if (modal) modal.hide();
      showToast(`Obrigado, ${nome}! Entraremos em contato em breve. Que Deus te abençoe!`, 'success');
      formJesus.reset();
    });
  }

  /* --- Formulário Contato --- */
  const formContato = document.getElementById('formContato');
  if (formContato) {
    formContato.addEventListener('submit', function (e) {
      e.preventDefault();
      showToast('Mensagem enviada com sucesso! Retornaremos em breve.', 'success');
      formContato.reset();
    });
  }

  /* --- Toast notification --- */
  function showToast(message, type = 'success') {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.style.cssText = 'position:fixed;top:1.5rem;right:1.5rem;z-index:9999;display:flex;flex-direction:column;gap:0.5rem;';
      document.body.appendChild(container);
    }

    const colors = {
      success: '#28a745',
      error: '#dc3545',
      info: '#001F3F'
    };

    const toast = document.createElement('div');
    toast.style.cssText = `background:${colors[type]};color:#fff;padding:1rem 1.5rem;border-radius:10px;
      box-shadow:0 4px 20px rgba(0,0,0,0.2);max-width:360px;font-size:0.9rem;line-height:1.4;
      opacity:0;transform:translateX(30px);transition:all 0.4s;`;
    toast.innerHTML = `<div style="display:flex;align-items:center;gap:0.75rem;">
      <i class="bi bi-check-circle-fill" style="font-size:1.2rem;flex-shrink:0;"></i>
      <span>${message}</span></div>`;
    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(30px)';
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  /* --- Tooltips Bootstrap --- */
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
    new bootstrap.Tooltip(el);
  });

  /* --- Add fade-in class to major sections --- */
  const style = document.createElement('style');
  style.textContent = `
    .fade-in { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .fade-in.visible { opacity: 1; transform: translateY(0); }
  `;
  document.head.appendChild(style);

  document.querySelectorAll('section > .container, section > .container-fluid').forEach(el => {
    el.classList.add('fade-in');
  });

  /* Re-observe after adding class */
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

});
