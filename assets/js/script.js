/* =========================================================
   INSTITUTO FLÁVIO ROCHA
   SCRIPT.JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS GLOBAIS
       ===================================================== */

    const header = document.getElementById("header");
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    const navLinks = document.querySelectorAll(".nav-link");
    const backToTop = document.getElementById("backToTop");
    const currentYear = document.getElementById("currentYear");

    const bookingButton = document.querySelector(
        "[data-booking-placeholder]"
    );

    const specialtiesCarousel = document.getElementById(
        "specialtiesCarousel"
    );


    /* =====================================================
       ANO AUTOMÁTICO
       ===================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       HEADER AO ROLAR
       ===================================================== */

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    /* =====================================================
       MENU MOBILE
       ===================================================== */

    function openMobileMenu() {

        if (!menuToggle || !mainNav) {
            return;
        }

        menuToggle.classList.add("active");
        mainNav.classList.add("active");

        document.body.classList.add("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Fechar menu"
        );

    }


    function closeMobileMenu() {

        if (!menuToggle || !mainNav) {
            return;
        }

        menuToggle.classList.remove("active");
        mainNav.classList.remove("active");

        document.body.classList.remove("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Abrir menu"
        );

    }


    if (menuToggle && mainNav) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    mainNav.classList.contains("active");

                if (isOpen) {

                    closeMobileMenu();

                } else {

                    openMobileMenu();

                }

            }
        );

    }


    navLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                closeMobileMenu();

            }
        );

    });


    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                closeMobileMenu();

            }

        }
    );


    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 980) {

                closeMobileMenu();

            }

        }
    );


    /* =====================================================
       ROLAGEM SUAVE DAS ÂNCORAS
       ===================================================== */

    const anchorLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    anchorLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const href =
                    link.getAttribute("href");

                if (
                    !href ||
                    href === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(href);

                if (!target) {
                    return;
                }

                event.preventDefault();

                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight -
                    15;

                window.scrollTo({

                    top: targetPosition,
                    behavior: "smooth"

                });

            }
        );

    });


    /* =====================================================
       LINK ATIVO NO MENU
       SCROLL SPY
       ===================================================== */

    const sections = Array.from(
        document.querySelectorAll(
            "main section[id]"
        )
    );


    function updateActiveNavigation() {

        if (!sections.length) {
            return;
        }

        const scrollPosition =
            window.scrollY + 180;

        let currentSection =
            "inicio";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop;

            if (
                scrollPosition >= sectionTop
            ) {

                currentSection =
                    section.id;

            }

        });


        navLinks.forEach((link) => {

            const href =
                link.getAttribute("href");

            link.classList.remove(
                "active"
            );

            if (
                href === `#${currentSection}`
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }

    updateActiveNavigation();

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        {
            passive: true
        }
    );


    /* =====================================================
       BOTÃO VOLTAR AO TOPO
       ===================================================== */

    function updateBackToTop() {

        if (!backToTop) {
            return;
        }

        if (window.scrollY > 550) {

            backToTop.classList.add(
                "visible"
            );

        } else {

            backToTop.classList.remove(
                "visible"
            );

        }

    }

    updateBackToTop();

    window.addEventListener(
        "scroll",
        updateBackToTop,
        {
            passive: true
        }
    );


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top: 0,
                    behavior: "smooth"

                });

            }
        );

    }


    /* =====================================================
       AGENDAMENTO
       AINDA SEM INTEGRAÇÃO REAL
       ===================================================== */

    if (bookingButton) {

        bookingButton.setAttribute(
            "aria-disabled",
            "true"
        );

        bookingButton.setAttribute(
            "title",
            "Agendamento online em implantação"
        );

        bookingButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

            }
        );

    }


    /* =====================================================
       CARROSSEL INFINITO DE ESPECIALIDADES
       DUPLICAÇÃO AUTOMÁTICA DOS CARDS
       ===================================================== */

    if (
        specialtiesCarousel &&
        !specialtiesCarousel.dataset.cloned
    ) {

        const originalCards =
            Array.from(
                specialtiesCarousel.children
            );

        originalCards.forEach((card) => {

            const clone =
                card.cloneNode(true);

            clone.setAttribute(
                "aria-hidden",
                "true"
            );

            specialtiesCarousel.appendChild(
                clone
            );

        });

        specialtiesCarousel.dataset.cloned =
            "true";

    }


    /* =====================================================
       ANIMAÇÃO INICIAL DO HERO
       GSAP
       ===================================================== */

    if (typeof gsap !== "undefined") {

        const heroTimeline =
            gsap.timeline({

                defaults: {

                    ease: "power3.out"

                }

            });


        heroTimeline.from(
            ".hero-eyebrow",
            {

                opacity: 0,
                y: 20,
                duration: 0.7

            }
        );


        heroTimeline.from(
            ".hero-title",
            {

                opacity: 0,
                y: 30,
                duration: 0.9

            },
            "-=0.45"
        );


        heroTimeline.from(
            ".hero-description",
            {

                opacity: 0,
                y: 24,
                duration: 0.75

            },
            "-=0.55"
        );


        heroTimeline.from(
            ".hero-actions",
            {

                opacity: 0,
                y: 18,
                duration: 0.7

            },
            "-=0.5"
        );


        heroTimeline.from(
            ".hero-highlight",
            {

                opacity: 0,
                y: 18,
                duration: 0.55,
                stagger: 0.12

            },
            "-=0.4"
        );


        heroTimeline.from(
            ".hero-image-main",
            {

                opacity: 0,
                x: 35,
                scale: 0.97,
                duration: 1.05

            },
            "-=1"
        );


        heroTimeline.from(
            ".hero-floating-card",
            {

                opacity: 0,
                y: 22,
                duration: 0.75

            },
            "-=0.6"
        );


        heroTimeline.from(
            ".hero-detail-card",
            {

                opacity: 0,
                scale: 0.88,
                duration: 0.7

            },
            "-=0.65"
        );

    }


    /* =====================================================
       SCROLLMAGIC + GSAP
       ANIMAÇÕES LEVES DURANTE A ROLAGEM
       ===================================================== */

    if (
        typeof ScrollMagic !== "undefined" &&
        typeof gsap !== "undefined"
    ) {

        const controller =
            new ScrollMagic.Controller();


        /* -------------------------------------------------
           FUNÇÃO GLOBAL DE REVELAÇÃO
           ------------------------------------------------- */

        function createRevealScene(
            trigger,
            targets,
            options = {}
        ) {

            const triggerElement =
                document.querySelector(trigger);

            const targetElements =
                document.querySelectorAll(
                    targets
                );

            if (
                !triggerElement ||
                !targetElements.length
            ) {
                return;
            }


            gsap.set(
                targetElements,
                {

                    opacity: 0,
                    y: options.y ?? 28

                }
            );


            new ScrollMagic.Scene({

                triggerElement:
                    triggerElement,

                triggerHook:
                    options.triggerHook ?? 0.82,

                reverse:
                    false

            })

                .on(
                    "enter",
                    () => {

                        gsap.to(
                            targetElements,
                            {

                                opacity: 1,
                                y: 0,

                                duration:
                                    options.duration ?? 0.8,

                                stagger:
                                    options.stagger ?? 0.08,

                                ease:
                                    options.ease ??
                                    "power3.out",

                                clearProps:
                                    "transform"

                            }
                        );

                    }
                )

                .addTo(
                    controller
                );

        }


        /* -------------------------------------------------
           SOBRE O INSTITUTO
           ------------------------------------------------- */

        const instituteTrigger =
            document.querySelector(
                ".institute-section"
            );

        if (instituteTrigger) {

            gsap.set(
                ".institute-images",
                {

                    opacity: 0,
                    x: -35

                }
            );

            gsap.set(
                ".institute-content",
                {

                    opacity: 0,
                    x: 35

                }
            );


            new ScrollMagic.Scene({

                triggerElement:
                    instituteTrigger,

                triggerHook:
                    0.78,

                reverse:
                    false

            })

                .on(
                    "enter",
                    () => {

                        gsap.to(
                            ".institute-images",
                            {

                                opacity: 1,
                                x: 0,
                                duration: 0.9,
                                ease: "power3.out"

                            }
                        );


                        gsap.to(
                            ".institute-content",
                            {

                                opacity: 1,
                                x: 0,
                                duration: 0.9,
                                delay: 0.12,
                                ease: "power3.out"

                            }
                        );

                    }
                )

                .addTo(
                    controller
                );

        }


        /* -------------------------------------------------
           ESPECIALIDADES
           ------------------------------------------------- */

        createRevealScene(
            ".specialties-section",
            ".specialties-section .section-heading",
            {

                y: 24,
                duration: 0.8

            }
        );


        /* -------------------------------------------------
           REABILITAÇÃO
           ------------------------------------------------- */

        const rehabilitationTrigger =
            document.querySelector(
                ".rehabilitation-section"
            );

        if (rehabilitationTrigger) {

            gsap.set(
                ".rehabilitation-content",
                {

                    opacity: 0,
                    x: -28

                }
            );

            gsap.set(
                ".rehabilitation-visual",
                {

                    opacity: 0,
                    x: 28

                }
            );


            new ScrollMagic.Scene({

                triggerElement:
                    rehabilitationTrigger,

                triggerHook:
                    0.78,

                reverse:
                    false

            })

                .on(
                    "enter",
                    () => {

                        gsap.to(
                            ".rehabilitation-content",
                            {

                                opacity: 1,
                                x: 0,
                                duration: 0.85,
                                ease: "power3.out"

                            }
                        );


                        gsap.to(
                            ".rehabilitation-visual",
                            {

                                opacity: 1,
                                x: 0,
                                duration: 0.85,
                                delay: 0.1,
                                ease: "power3.out"

                            }
                        );


                        gsap.from(
                            ".rehabilitation-item",
                            {

                                opacity: 0,
                                y: 16,
                                duration: 0.6,
                                stagger: 0.09,
                                delay: 0.25,
                                ease: "power2.out"

                            }
                        );

                    }
                )

                .addTo(
                    controller
                );

        }


        /* -------------------------------------------------
           LINGUAGEM
           ------------------------------------------------- */

        createRevealScene(
            ".language-section",
            ".language-section .section-heading",
            {

                y: 24,
                duration: 0.75

            }
        );


        createRevealScene(
            ".language-grid",
            ".language-card",
            {

                y: 28,
                duration: 0.7,
                stagger: 0.09

            }
        );


        /* -------------------------------------------------
           DIFERENCIAIS
           ------------------------------------------------- */

        createRevealScene(
            ".differentials-section",
            ".differentials-section .section-heading",
            {

                y: 22,
                duration: 0.75

            }
        );


        createRevealScene(
            ".differentials-grid",
            ".differential-card",
            {

                y: 26,
                duration: 0.7,
                stagger: 0.08

            }
        );


        /* -------------------------------------------------
           ESTRUTURA
           ------------------------------------------------- */

        createRevealScene(
            ".structure-section",
            ".structure-heading",
            {

                y: 22,
                duration: 0.75

            }
        );


        createRevealScene(
            ".structure-gallery",
            ".structure-item",
            {

                y: 28,
                duration: 0.8,
                stagger: 0.1

            }
        );


        /* -------------------------------------------------
           AGENDAMENTO
           ------------------------------------------------- */

        const bookingTrigger =
            document.querySelector(
                ".booking-section"
            );

        if (bookingTrigger) {

            gsap.set(
                ".booking-content",
                {

                    opacity: 0,
                    x: -30

                }
            );

            gsap.set(
                ".booking-preview",
                {

                    opacity: 0,
                    x: 30,
                    scale: 0.98

                }
            );


            new ScrollMagic.Scene({

                triggerElement:
                    bookingTrigger,

                triggerHook:
                    0.76,

                reverse:
                    false

            })

                .on(
                    "enter",
                    () => {

                        gsap.to(
                            ".booking-content",
                            {

                                opacity: 1,
                                x: 0,
                                duration: 0.85,
                                ease: "power3.out"

                            }
                        );


                        gsap.to(
                            ".booking-preview",
                            {

                                opacity: 1,
                                x: 0,
                                scale: 1,
                                duration: 0.9,
                                delay: 0.1,
                                ease: "power3.out"

                            }
                        );


                        gsap.from(
                            ".booking-step",
                            {

                                opacity: 0,
                                y: 14,
                                duration: 0.55,
                                stagger: 0.1,
                                delay: 0.25,
                                ease: "power2.out"

                            }
                        );

                    }
                )

                .addTo(
                    controller
                );

        }


        /* -------------------------------------------------
           CONTATO
           ------------------------------------------------- */

        const contactTrigger =
            document.querySelector(
                ".contact-section"
            );

        if (contactTrigger) {

            gsap.set(
                ".contact-content",
                {

                    opacity: 0,
                    x: -28

                }
            );

            gsap.set(
                ".contact-card",
                {

                    opacity: 0,
                    x: 28

                }
            );


            new ScrollMagic.Scene({

                triggerElement:
                    contactTrigger,

                triggerHook:
                    0.78,

                reverse:
                    false

            })

                .on(
                    "enter",
                    () => {

                        gsap.to(
                            ".contact-content",
                            {

                                opacity: 1,
                                x: 0,
                                duration: 0.8,
                                ease: "power3.out"

                            }
                        );


                        gsap.to(
                            ".contact-card",
                            {

                                opacity: 1,
                                x: 0,
                                duration: 0.8,
                                delay: 0.1,
                                ease: "power3.out"

                            }
                        );


                        gsap.from(
                            ".contact-item",
                            {

                                opacity: 0,
                                y: 15,
                                duration: 0.55,
                                stagger: 0.07,
                                delay: 0.2,
                                ease: "power2.out"

                            }
                        );

                    }
                )

                .addTo(
                    controller
                );

        }


        /* -------------------------------------------------
           CTA FINAL
           ------------------------------------------------- */

        createRevealScene(
            ".final-cta",
            ".final-cta-container > *",
            {

                y: 18,
                duration: 0.7,
                stagger: 0.12

            }
        );

    }


    /* =====================================================
       EFEITO SUAVE NAS FOTOS DA ESTRUTURA
       ===================================================== */

    if (
        typeof gsap !== "undefined" &&
        window.matchMedia(
            "(min-width: 981px)"
        ).matches
    ) {

        const structureImages =
            document.querySelectorAll(
                ".structure-item img"
            );

        structureImages.forEach(
            (image) => {

                const parent =
                    image.closest(
                        ".structure-item"
                    );

                if (!parent) {
                    return;
                }


                parent.addEventListener(
                    "mousemove",
                    (event) => {

                        const rect =
                            parent.getBoundingClientRect();

                        const mouseX =
                            event.clientX -
                            rect.left;

                        const mouseY =
                            event.clientY -
                            rect.top;

                        const xPercent =
                            (
                                mouseX /
                                rect.width -
                                0.5
                            ) * 5;

                        const yPercent =
                            (
                                mouseY /
                                rect.height -
                                0.5
                            ) * 5;


                        gsap.to(
                            image,
                            {

                                x: xPercent,
                                y: yPercent,
                                scale: 1.045,

                                duration: 0.55,
                                ease: "power2.out"

                            }
                        );

                    }
                );


                parent.addEventListener(
                    "mouseleave",
                    () => {

                        gsap.to(
                            image,
                            {

                                x: 0,
                                y: 0,
                                scale: 1,

                                duration: 0.6,
                                ease: "power2.out"

                            }
                        );

                    }
                );

            }
        );

    }


    /* =====================================================
       REDUZIR ANIMAÇÕES CASO O USUÁRIO PREFIRA
       ===================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    if (
        prefersReducedMotion.matches &&
        specialtiesCarousel
    ) {

        specialtiesCarousel.style.animation =
            "none";

    }

});