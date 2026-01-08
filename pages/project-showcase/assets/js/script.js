document.addEventListener("DOMContentLoaded", () => {
  
  // Carousel Logic
  function initCarousels(){
    document.querySelectorAll('.carousel-fade').forEach(container => {
      const slides = Array.from(container.querySelectorAll('.carousel-slide'));
      if(!slides.length) return;

      let current = slides.findIndex(s => s.classList.contains('active')) || 0;
      const prevBtn = container.querySelector('.carousel-btn.prev');
      const nextBtn = container.querySelector('.carousel-btn.next');

      function show(index){
        const total = slides.length;
        index = ((index % total) + total) % total;
        
        slides.forEach((s, i) => {
          const active = i === index;
          s.classList.toggle('active', active);
        });
        current = index;
      }

      if(prevBtn) prevBtn.addEventListener('click', ()=> show(current-1));
      if(nextBtn) nextBtn.addEventListener('click', ()=> show(current+1));

      // Arrow Key Support
      container.addEventListener('keydown', (e) => {
        if(e.key === 'ArrowLeft') { e.preventDefault(); show(current-1); }
        if(e.key === 'ArrowRight') { e.preventDefault(); show(current+1); }
      });
    });
  }
  initCarousels();

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if(target) {
         window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
      }
    });
  });

  // Contact Pop-up Logic
  const contactBtn = document.getElementById('trigger-contact-btn');
  const closeContactBtn = document.getElementById('close-contact-btn');
  const contactPanel = document.getElementById('contactPanel');

  function openContact() {
      if(contactPanel) {
          contactPanel.classList.add('active');
          contactPanel.setAttribute('aria-hidden', 'false');
      }
  }

  function closeContact() {
      if(contactPanel) {
          contactPanel.classList.remove('active');
          contactPanel.setAttribute('aria-hidden', 'true');
      }
  }

  if(contactBtn) contactBtn.addEventListener('click', openContact);
  if(closeContactBtn) closeContactBtn.addEventListener('click', closeContact);

  // Close on Escape Key
  document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && contactPanel && contactPanel.classList.contains('active')) {
          closeContact();
      }
  });

  // Close on Background Click
  if (contactPanel) {
      contactPanel.addEventListener('click', (e) => {
          if (e.target === contactPanel) {
              closeContact();
          }
      });
  }
});