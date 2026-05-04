/**
 * Face Recognition Dashboard - Main JavaScript
 * تطبيق لوحة التحكم الرئيسية للنظام
 */

class DashboardController {
    constructor() {
        this.initObserver();
        this.initInteractions();
        this.initAnimations();
    }

    /**
     * تهيئة مراقب الـ Intersection للعناصر المتحركة
     */
    initObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.feature-card, .stat-box').forEach((el) => {
            el.style.animationPlayState = 'paused';
            observer.observe(el);
        });
    }

    /**
     * تهيئة التفاعلات مع المستخدم
     */
    initInteractions() {
        this.setupButtonInteractions();
        this.setupCameraInteractions();
        this.setupCardInteractions();
        this.setupSmoothScroll();
    }

    /**
     * إضافة تأثيرات hover على الأزرار
     */
    setupButtonInteractions() {
        document.querySelectorAll('.btn').forEach((btn) => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'scale(1.02)';
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'scale(1)';
            });

            btn.addEventListener('click', (e) => {
                this.showClickFeedback(e.target);
            });
        });
    }

    /**
     * تأثيرات تفاعلية على شاشة الكاميرا
     */
    setupCameraInteractions() {
        const cameraScreen = document.querySelector('.camera-screen');
        if (!cameraScreen) return;

        cameraScreen.addEventListener('mouseenter', () => {
            cameraScreen.style.boxShadow = 'inset 0 0 20px rgba(0, 0, 0, 0.5), 0 0 30px rgba(96, 165, 250, 0.3)';
        });

        cameraScreen.addEventListener('mouseleave', () => {
            cameraScreen.style.boxShadow = 'inset 0 0 20px rgba(0, 0, 0, 0.5)';
        });
    }

    /**
     * تأثيرات على البطاقات
     */
    setupCardInteractions() {
        document.querySelectorAll('.feature-card').forEach((card) => {
            card.addEventListener('mouseenter', () => {
                card.style.filter = 'brightness(1.1)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.filter = 'brightness(1)';
            });
        });
    }

    /**
     * تفعيل الانتقال السلس بين الأقسام
     */
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((link) => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });
    }

    /**
     * عرض رد فعل عند النقر على الزر
     */
    showClickFeedback(element) {
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';

        const rect = element.getBoundingClientRect();
        ripple.style.left = (event.clientX - rect.left - 10) + 'px';
        ripple.style.top = (event.clientY - rect.top - 10) + 'px';

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }

    /**
     * تهيئة الرسوميات والحركات
     */
    initAnimations() {
        this.animateStatistics();
        this.startLiveIndicator();
    }

    /**
     * تحريك الإحصائيات
     */
    animateStatistics() {
        const stats = [
            { selector: '.stat-box:nth-child(1) .stat-number', value: 24 },
            { selector: '.stat-box:nth-child(2) .stat-number', value: 128 },
            { selector: '.stat-box:nth-child(3) .stat-number', value: 76 },
            { selector: '.stat-box:nth-child(4) .stat-number', value: 99 }
        ];

        stats.forEach((stat) => {
            const element = document.querySelector(stat.selector);
            if (element) {
                this.animateCounter(element, stat.value);
            }
        });
    }

    /**
     * تحريك العداد
     */
    animateCounter(element, target) {
        let current = 0;
        const increment = target / 30;
        const isPercentage = element.parentElement.querySelector('.stat-label').textContent.includes('%');

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (isPercentage ? '%' : '');
        }, 30);
    }

    /**
     * تشغيل مؤشر البث المباشر
     */
    startLiveIndicator() {
        const liveBadge = document.querySelector('.live-badge');
        if (liveBadge) {
            setInterval(() => {
                liveBadge.style.opacity = liveBadge.style.opacity === '0.5' ? '1' : '0.5';
            }, 1000);
        }
    }
}

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    new DashboardController();
    console.log('✓ Dashboard Controller initialized successfully');
});
