document.addEventListener("DOMContentLoaded", () => {
  // Init accessible carousels
  function initCarousels(){
    document.querySelectorAll('.carousel-fade').forEach(container => {
      const slides = Array.from(container.querySelectorAll('.carousel-slide'));
      if(!slides.length) return;

      let current = slides.findIndex(s => s.classList.contains('active')) || 0;
      const prevBtn = container.querySelector('.carousel-btn.prev');
      const nextBtn = container.querySelector('.carousel-btn.next');
      const status = container.querySelector('[aria-live]');

      // create dots
      const dots = document.createElement('div');
      dots.className = 'carousel-dots';
      dots.setAttribute('role','tablist');

      slides.forEach((slide, i) => {
        slide.setAttribute('data-index', i);
        const img = slide.querySelector('img');
        if(img) img.tabIndex = i === current ? 0 : -1;
        slide.setAttribute('aria-hidden', i === current ? 'false' : 'true');

        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'carousel-dot';
        dot.setAttribute('role','tab');
        dot.setAttribute('aria-selected', i === current ? 'true' : 'false');
        dot.setAttribute('aria-controls', container.id || '');
        dot.setAttribute('aria-label', `Go to slide ${i+1}`);
        dot.addEventListener('click', () => show(i));
        dots.appendChild(dot);
      });

      container.appendChild(dots);

      function show(index){
        const total = slides.length;
        index = ((index % total) + total) % total;
        slides.forEach((s, i) => {
          const active = i === index;
          s.classList.toggle('active', active);
          s.setAttribute('aria-hidden', active ? 'false' : 'true');
          const img = s.querySelector('img');
          if(img) img.tabIndex = active ? 0 : -1;
          const dot = dots.children[i];
          if(dot) dot.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        current = index;
        if(status){
          const caption = slides[current].querySelector('.carousel-caption')?.textContent || '';
          status.textContent = `Slide ${current+1} of ${total}: ${caption}`;
        }
      }

      if(prevBtn) prevBtn.addEventListener('click', ()=> show(current-1));
      if(nextBtn) nextBtn.addEventListener('click', ()=> show(current+1));

      // keyboard nav when container focused
      container.addEventListener('keydown', (e) => {
        if(e.key === 'ArrowLeft') { e.preventDefault(); show(current-1); }
        if(e.key === 'ArrowRight') { e.preventDefault(); show(current+1); }
      });

      show(current);
    });
  }

  initCarousels();

  // Smooth scroll for navigation buttons with hash links
  document.querySelectorAll('.section-btn[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if(!target) return;
      const offset = -20;
      window.scrollTo({ top: target.offsetTop + offset, behavior: 'smooth' });
    });
  });
});
