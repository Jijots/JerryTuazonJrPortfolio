document.addEventListener('DOMContentLoaded', () => {
    const aboutBtn = document.getElementById('about-btn');
    const closeAboutBtn = document.getElementById('close-about-btn');
    const aboutPanel = document.getElementById('aboutPanel');

    function openAbout() {
        aboutPanel.classList.add('active');
        aboutPanel.setAttribute('aria-hidden', 'false');
    }

    function closeAbout() {
        aboutPanel.classList.remove('active');
        aboutPanel.setAttribute('aria-hidden', 'true');
    }

    if (aboutBtn) aboutBtn.addEventListener('click', openAbout);
    if (closeAboutBtn) closeAboutBtn.addEventListener('click', closeAbout);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && aboutPanel.classList.contains('active')) {
            closeAbout();
        }
    });
});