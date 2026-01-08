document.addEventListener('DOMContentLoaded', () => {
    
    // Panel Elements
    const panels = {
        about: {
            btn: document.getElementById('about-btn'),
            close: document.getElementById('close-about-btn'),
            panel: document.getElementById('aboutPanel')
        },
        contact: {
            btn: document.getElementById('contact-btn'),
            close: document.getElementById('close-contact-btn'),
            panel: document.getElementById('contactPanel')
        },
        projects: {
            btn: document.getElementById('projects-btn'),
            close: document.getElementById('close-projects-btn'),
            panel: document.getElementById('projectsPanel')
        }
    };

    // Open Panel Logic
    function openPanel(targetPanel) {
        // Close others first
        Object.values(panels).forEach(p => {
            if(p.panel) {
                p.panel.classList.remove('active');
                p.panel.setAttribute('aria-hidden', 'true');
            }
        });
        
        // Open target
        if (targetPanel) {
            targetPanel.classList.add('active');
            targetPanel.setAttribute('aria-hidden', 'false');
        }
    }

    // Close Panel Logic
    function closePanel(targetPanel) {
        if (targetPanel) {
            targetPanel.classList.remove('active');
            targetPanel.setAttribute('aria-hidden', 'true');
        }
    }

    // Event Listeners
    Object.values(panels).forEach(p => {
        if(p.btn) p.btn.addEventListener('click', () => openPanel(p.panel));
        if(p.close) p.close.addEventListener('click', () => closePanel(p.panel));
        
        // Close on background click
        if(p.panel) {
            p.panel.addEventListener('click', (e) => {
                if (e.target === p.panel) closePanel(p.panel);
            });
        }
    });

    // Escape Key Support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const active = document.querySelector('.slide-panel.active');
            if (active) {
                active.classList.remove('active');
                active.setAttribute('aria-hidden', 'true');
            }
        }
    });
});