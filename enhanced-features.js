// Enhanced Portfolio Features
(function() {
    'use strict';

    // ==================== DARK/LIGHT MODE TOGGLE ====================
    class ThemeToggle {
        constructor() {
            this.currentTheme = localStorage.getItem('theme') || 'dark';
            this.init();
        }

        init() {
            this.createToggleButton();
            this.applyTheme(this.currentTheme);
            this.attachEventListeners();
        }

        createToggleButton() {
            const toggle = document.createElement('div');
            toggle.className = 'theme-toggle';
            toggle.innerHTML = `
                <button id="theme-toggle-btn" aria-label="Toggle theme">
                    <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="5"/>
                        <line x1="12" y1="1" x2="12" y2="3"/>
                        <line x1="12" y1="21" x2="12" y2="23"/>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                        <line x1="1" y1="12" x2="3" y2="12"/>
                        <line x1="21" y1="12" x2="23" y2="12"/>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                    </svg>
                    <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                    </svg>
                </button>
            `;
            document.body.appendChild(toggle);
        }

        applyTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            this.currentTheme = theme;
            localStorage.setItem('theme', theme);
            
            const toggle = document.getElementById('theme-toggle-btn');
            if (toggle) {
                toggle.setAttribute('data-theme', theme);
            }
        }

        attachEventListeners() {
            const btn = document.getElementById('theme-toggle-btn');
            if (btn) {
                btn.addEventListener('click', () => {
                    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
                    this.applyTheme(newTheme);
                    
                    // Add ripple effect
                    this.createRipple(btn);
                });
            }
        }

        createRipple(button) {
            const ripple = document.createElement('span');
            ripple.className = 'theme-ripple';
            button.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        }
    }

    // ==================== ANIMATED NAVBAR INDICATOR ====================
    class NavbarIndicator {
        constructor() {
            this.sections = [];
            this.navLinks = [];
            this.indicator = null;
            this.init();
        }

        init() {
            this.createIndicator();
            this.setupSections();
            this.attachScrollListener();
        }

        createIndicator() {
            const nav = document.querySelector('nav') || document.querySelector('[role="navigation"]');
            if (!nav) return;

            this.indicator = document.createElement('div');
            this.indicator.className = 'nav-indicator';
            nav.appendChild(this.indicator);
        }

        setupSections() {
            const nav = document.querySelector('nav') || document.querySelector('[role="navigation"]');
            if (!nav) return;

            this.navLinks = Array.from(nav.querySelectorAll('a[href^="#"]'));
            this.sections = this.navLinks.map(link => {
                const id = link.getAttribute('href').slice(1);
                return document.getElementById(id);
            }).filter(Boolean);

            // Set initial position
            if (this.navLinks.length > 0) {
                this.updateIndicator(this.navLinks[0]);
            }
        }

        attachScrollListener() {
            let ticking = false;
            
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        this.updateActiveSection();
                        ticking = false;
                    });
                    ticking = true;
                }
            });

            // Click handlers for smooth indicator movement
            this.navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    this.updateIndicator(link);
                });
            });
        }

        updateActiveSection() {
            const scrollPos = window.scrollY + 100;
            
            for (let i = this.sections.length - 1; i >= 0; i--) {
                const section = this.sections[i];
                if (section && section.offsetTop <= scrollPos) {
                    this.updateIndicator(this.navLinks[i]);
                    break;
                }
            }
        }

        updateIndicator(activeLink) {
            if (!this.indicator || !activeLink) return;

            const linkRect = activeLink.getBoundingClientRect();
            const navRect = activeLink.parentElement.getBoundingClientRect();

            this.indicator.style.width = linkRect.width + 'px';
            this.indicator.style.left = (linkRect.left - navRect.left) + 'px';

            // Update active state
            this.navLinks.forEach(link => link.classList.remove('nav-active'));
            activeLink.classList.add('nav-active');
        }
    }

    // ==================== SKILL IMPACT BADGES ====================
    class SkillBadges {
        constructor() {
            this.skillsData = {
                'Data Analytics': { projects: 5, certifications: 2, experience: '2+ years' },
                'Machine Learning': { projects: 4, certifications: 3, experience: '1+ years' },
                'Python': { projects: 8, certifications: 2, experience: '3+ years' },
                'SQL': { projects: 6, certifications: 1, experience: '2+ years' },
                'Excel': { projects: 7, certifications: 2, experience: '3+ years' },
                'Power BI': { projects: 3, certifications: 1, experience: '1+ years' },
                'Data Visualization': { projects: 5, certifications: 1, experience: '2+ years' },
                'Deep Learning': { projects: 3, certifications: 2, experience: '1+ years' }
            };
            this.init();
        }

        init() {
            setTimeout(() => this.addBadgesToSkills(), 1000);
        }

        addBadgesToSkills() {
            const skillCards = document.querySelectorAll('[class*="skill"]');
            
            skillCards.forEach(card => {
                const skillName = card.textContent.trim();
                const data = this.skillsData[skillName];
                
                if (data && !card.querySelector('.skill-badges')) {
                    const badges = document.createElement('div');
                    badges.className = 'skill-badges';
                    badges.innerHTML = `
                        <div class="skill-badge" data-tooltip="Projects">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                <line x1="9" y1="3" x2="9" y2="21"/>
                            </svg>
                            <span>${data.projects}</span>
                        </div>
                        <div class="skill-badge" data-tooltip="Certifications">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                <polyline points="22 4 12 14.01 9 11.01"/>
                            </svg>
                            <span>${data.certifications}</span>
                        </div>
                        <div class="skill-badge" data-tooltip="Experience">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12 6 12 12 16 14"/>
                            </svg>
                            <span>${data.experience}</span>
                        </div>
                    `;
                    card.appendChild(badges);
                }
            });
        }
    }

    // ==================== MICRO-ANIMATIONS ====================
    class MicroAnimations {
        constructor() {
            this.init();
        }

        init() {
            this.setupHoverEffects();
            this.setupPulseGlows();
            this.setupIconAnimations();
            this.setupCardAnimations();
        }

        setupHoverEffects() {
            // Add hover effects to buttons
            document.querySelectorAll('button, a[href]').forEach(element => {
                if (!element.classList.contains('no-hover')) {
                    element.classList.add('micro-hover');
                }
            });
        }

        setupPulseGlows() {
            // Add pulse glow to important elements
            const glowElements = document.querySelectorAll('.primary, [class*="primary"], .accent');
            glowElements.forEach(el => {
                if (!el.classList.contains('no-pulse')) {
                    el.classList.add('pulse-glow');
                }
            });
        }

        setupIconAnimations() {
            // Rotate icons on hover
            document.querySelectorAll('svg, i, [class*="icon"]').forEach(icon => {
                if (!icon.closest('button')) {
                    icon.classList.add('icon-rotate');
                }
            });
        }

        setupCardAnimations() {
            // Add lift effect to cards
            const cards = document.querySelectorAll('[class*="card"], [class*="project"], [class*="skill"]');
            cards.forEach(card => {
                card.classList.add('card-lift');
            });
        }
    }

    // ==================== SCROLL REVEAL ANIMATIONS ====================
    class ScrollReveal {
        constructor() {
            this.elements = [];
            this.init();
        }

        init() {
            this.setupObserver();
            this.observeElements();
        }

        setupObserver() {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
        }

        observeElements() {
            const elements = document.querySelectorAll('section, [class*="card"], [class*="project"], [class*="skill"]');
            elements.forEach(el => {
                el.classList.add('reveal-element');
                this.observer.observe(el);
            });
        }
    }

    // ==================== INITIALIZATION ====================
    function initializeFeatures() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeFeatures);
            return;
        }

        // Initialize all features
        // new ThemeToggle(); // Removed
        new NavbarIndicator();
        new SkillBadges();
        new MicroAnimations();
        new ScrollReveal();

        console.log('✨ Enhanced features initialized!');
    }

    // Start
    initializeFeatures();
})();
