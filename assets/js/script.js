/* =========================================================
   INSTITUTO FLÁVIO ROCHA
   SCRIPT.JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS GLOBAIS
       ===================================================== */

    const header =
        document.getElementById("header");

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.getElementById("mainNav");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const backToTop =
        document.getElementById("backToTop");

    const currentYear =
        document.getElementById("currentYear");

    const specialtiesCarousel =
        document.getElementById("specialtiesCarousel");

    const structureCarousel =
        document.getElementById("structureCarousel");

    const structureSlides =
        structureCarousel
            ? Array.from(
                structureCarousel.querySelectorAll(".structure-slide")
            )
            : [];

    const structurePrev =
        document.getElementById("structurePrev");

    const structureNext =
        document.getElementById("structureNext");

    const structureDots =
        document.getElementById("structureDots");

    const leadForm =
        document.getElementById("leadForm");

    const leadInterest =
        document.getElementById("leadInterest");

    const leadOrigin =
        document.getElementById("leadOrigin");

    const quickLeadButtons =
        document.querySelectorAll("[data-lead-interest]");

    const hoursToggle =
        document.getElementById("hoursToggle");

    const openingHoursExtra =
        document.getElementById("openingHoursExtra");

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
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

        header.classList.toggle(
            "scrolled",
            window.scrollY > 40
        );

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
            closeMobileMenu
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
       ROLAGEM SUAVE
       ===================================================== */

    const anchorLinks =
        document.querySelectorAll(
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
                    14;

                window.scrollTo({

                    top: targetPosition,

                    behavior:
                        prefersReducedMotion.matches
                            ? "auto"
                            : "smooth"

                });

            }
        );

    });


    /* =====================================================
       SCROLL SPY
       ===================================================== */

    const sections =
        Array.from(
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

            if (
                scrollPosition >=
                section.offsetTop
            ) {

                currentSection =
                    section.id;

            }

        });


        navLinks.forEach((link) => {

            const href =
                link.getAttribute("href");

            link.classList.remove("active");

            if (
                href ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

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
       VOLTAR AO TOPO
       ===================================================== */

    function updateBackToTop() {

        if (!backToTop) {
            return;
        }

        backToTop.classList.toggle(
            "visible",
            window.scrollY > 550
        );

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

                    behavior:
                        prefersReducedMotion.matches
                            ? "auto"
                            : "smooth"

                });

            }
        );

    }


    /* =====================================================
       CARROSSEL INFINITO DE ESPECIALIDADES
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


    if (
        prefersReducedMotion.matches &&
        specialtiesCarousel
    ) {

        specialtiesCarousel.style.animation =
            "none";

    }


    /* =====================================================
       CARROSSEL DA ESTRUTURA
       ===================================================== */

    let structureIndex = 0;
    let structureTimer = null;


    function normalizeStructureIndex(index) {

        if (!structureSlides.length) {
            return 0;
        }

        return (
            index +
            structureSlides.length
        ) % structureSlides.length;

    }


    function renderStructureCarousel() {

        if (!structureSlides.length) {
            return;
        }

        const total =
            structureSlides.length;

        const previousIndex =
            normalizeStructureIndex(
                structureIndex - 1
            );

        const nextIndex =
            normalizeStructureIndex(
                structureIndex + 1
            );


        structureSlides.forEach(
            (slide, index) => {

                slide.classList.remove(
                    "is-active",
                    "is-prev",
                    "is-next"
                );

                slide.setAttribute(
                    "aria-hidden",
                    "true"
                );

                if (index === structureIndex) {

                    slide.classList.add(
                        "is-active"
                    );

                    slide.setAttribute(
                        "aria-hidden",
                        "false"
                    );

                } else if (
                    total > 1 &&
                    index === previousIndex
                ) {

                    slide.classList.add(
                        "is-prev"
                    );

                } else if (
                    total > 1 &&
                    index === nextIndex
                ) {

                    slide.classList.add(
                        "is-next"
                    );

                }

            }
        );


        if (structureDots) {

            structureDots
                .querySelectorAll(
                    ".structure-dot"
                )
                .forEach(
                    (dot, index) => {

                        dot.classList.toggle(
                            "is-active",
                            index === structureIndex
                        );

                        dot.setAttribute(
                            "aria-current",
                            index === structureIndex
                                ? "true"
                                : "false"
                        );

                    }
                );

        }

    }


    function goToStructureSlide(index) {

        structureIndex =
            normalizeStructureIndex(index);

        renderStructureCarousel();

    }


    function startStructureAutoplay() {

        if (
            prefersReducedMotion.matches ||
            structureSlides.length < 2
        ) {
            return;
        }

        stopStructureAutoplay();

        structureTimer =
            window.setInterval(
                () => {

                    goToStructureSlide(
                        structureIndex + 1
                    );

                },
                5200
            );

    }


    function stopStructureAutoplay() {

        if (structureTimer) {

            window.clearInterval(
                structureTimer
            );

            structureTimer = null;

        }

    }


    if (
        structureCarousel &&
        structureSlides.length
    ) {

        if (structureDots) {

            structureSlides.forEach(
                (_, index) => {

                    const dot =
                        document.createElement(
                            "button"
                        );

                    dot.type = "button";

                    dot.className =
                        "structure-dot";

                    dot.setAttribute(
                        "aria-label",
                        `Ir para a foto ${index + 1}`
                    );

                    dot.addEventListener(
                        "click",
                        () => {

                            goToStructureSlide(index);

                            startStructureAutoplay();

                        }
                    );

                    structureDots.appendChild(
                        dot
                    );

                }
            );

        }


        if (structurePrev) {

            structurePrev.addEventListener(
                "click",
                () => {

                    goToStructureSlide(
                        structureIndex - 1
                    );

                    startStructureAutoplay();

                }
            );

        }


        if (structureNext) {

            structureNext.addEventListener(
                "click",
                () => {

                    goToStructureSlide(
                        structureIndex + 1
                    );

                    startStructureAutoplay();

                }
            );

        }


        structureCarousel.addEventListener(
            "mouseenter",
            stopStructureAutoplay
        );

        structureCarousel.addEventListener(
            "mouseleave",
            startStructureAutoplay
        );


        let touchStartX = 0;


        structureCarousel.addEventListener(
            "touchstart",
            (event) => {

                touchStartX =
                    event.touches[0].clientX;

                stopStructureAutoplay();

            },
            {
                passive: true
            }
        );


        structureCarousel.addEventListener(
            "touchend",
            (event) => {

                const touchEndX =
                    event.changedTouches[0].clientX;

                const distance =
                    touchEndX -
                    touchStartX;

                if (
                    Math.abs(distance) >
                    45
                ) {

                    if (distance > 0) {

                        goToStructureSlide(
                            structureIndex - 1
                        );

                    } else {

                        goToStructureSlide(
                            structureIndex + 1
                        );

                    }

                }

                startStructureAutoplay();

            },
            {
                passive: true
            }
        );


        renderStructureCarousel();
        startStructureAutoplay();

    }


    /* =====================================================
       HORÁRIOS EXPANSÍVEIS
       ===================================================== */

    if (
        hoursToggle &&
        openingHoursExtra
    ) {

        hoursToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    openingHoursExtra
                        .classList
                        .toggle("is-open");

                hoursToggle
                    .classList
                    .toggle(
                        "is-open",
                        isOpen
                    );

                hoursToggle.setAttribute(
                    "aria-expanded",
                    isOpen
                        ? "true"
                        : "false"
                );

                const label =
                    hoursToggle.querySelector(
                        "span"
                    );

                if (label) {

                    label.textContent =
                        isOpen
                            ? "Ocultar horários"
                            : "Ver todos os horários";

                }

            }
        );

    }


    /* =====================================================
       CAPTAÇÃO DE LEAD / WHATSAPP
       ===================================================== */

    const urlParams =
        new URLSearchParams(
            window.location.search
        );

    const utmSource =
        urlParams.get("utm_source") || "";

    const utmCampaign =
        urlParams.get("utm_campaign") || "";

    const utmMedium =
        urlParams.get("utm_medium") || "";


    function normalizeMarketingSource(source) {

        const normalized =
            source
                .trim()
                .toLowerCase();

        if (
            normalized.includes("google")
        ) {
            return "Google";
        }

        if (
            normalized.includes("instagram") ||
            normalized.includes("ig") ||
            normalized.includes("meta") ||
            normalized.includes("facebook")
        ) {
            return "Instagram";
        }

        return "";

    }


    if (
        leadOrigin &&
        utmSource
    ) {

        const detectedSource =
            normalizeMarketingSource(
                utmSource
            );

        if (detectedSource) {

            leadOrigin.value =
                detectedSource;

        }

    }


    quickLeadButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const value =
                        button.dataset
                            .leadInterest || "";

                    if (leadInterest) {

                        leadInterest.value =
                            value;

                    }


                    quickLeadButtons
                        .forEach(
                            (item) => {

                                item.classList.remove(
                                    "is-active"
                                );

                            }
                        );

                    button.classList.add(
                        "is-active"
                    );


                    const nameField =
                        document.getElementById(
                            "leadName"
                        );

                    if (nameField) {

                        nameField.focus({
                            preventScroll: true
                        });

                    }

                }
            );

        }
    );


    if (leadInterest) {

        leadInterest.addEventListener(
            "change",
            () => {

                quickLeadButtons
                    .forEach(
                        (button) => {

                            button.classList.toggle(
                                "is-active",
                                button.dataset.leadInterest ===
                                leadInterest.value
                            );

                        }
                    );

            }
        );

    }


    if (leadForm) {

        leadForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                if (
                    !leadForm.checkValidity()
                ) {

                    leadForm.reportValidity();

                    return;

                }


                const name =
                    document
                        .getElementById("leadName")
                        ?.value
                        .trim() || "";

                const specialty =
                    document
                        .getElementById("leadSpecialty")
                        ?.value
                        .trim() || "";

                const origin =
                    document
                        .getElementById("leadOrigin")
                        ?.value
                        .trim() || "";

                const interest =
                    document
                        .getElementById("leadInterest")
                        ?.value
                        .trim() || "";

                const message =
                    document
                        .getElementById("leadMessage")
                        ?.value
                        .trim() || "";


                const lines = [

                    "Olá! Vim pelo site do Instituto Flávio Rocha e gostaria de conversar com a equipe.",

                    "",

                    `Nome: ${name}`,

                    specialty
                        ? `Especialidade de interesse: ${specialty}`
                        : "Especialidade de interesse: ainda não sei",

                    `Motivo do contato: ${interest}`

                ];


                if (origin) {

                    lines.push(
                        `Como conheci o Instituto: ${origin}`
                    );

                }


                if (message) {

                    lines.push(
                        "",
                        `Mensagem: ${message}`
                    );

                }


                if (
                    utmSource ||
                    utmCampaign ||
                    utmMedium
                ) {

                    lines.push(
                        "",
                        "Origem da campanha:"
                    );


                    if (utmSource) {

                        lines.push(
                            `• Fonte: ${utmSource}`
                        );

                    }


                    if (utmMedium) {

                        lines.push(
                            `• Mídia: ${utmMedium}`
                        );

                    }


                    if (utmCampaign) {

                        lines.push(
                            `• Campanha: ${utmCampaign}`
                        );

                    }

                }


                const whatsappUrl =
                    "https://wa.me/5511966413868?text=" +
                    encodeURIComponent(
                        lines.join("\n")
                    );


                window.open(
                    whatsappUrl,
                    "_blank",
                    "noopener,noreferrer"
                );

            }
        );

    }


    /* =====================================================
       ANIMAÇÕES
       ===================================================== */

    if (
        prefersReducedMotion.matches ||
        typeof gsap === "undefined"
    ) {

        return;

    }


    /* =====================================================
       HERO
       ===================================================== */

    const heroTimeline =
        gsap.timeline({

            defaults: {

                ease:
                    "power3.out"

            }

        });


    heroTimeline.from(
        ".hero-welcome-content",
        {

            opacity: 0,

            y: 24,

            duration: 0.85

        }
    );


    heroTimeline.from(
        ".hero-eyebrow",
        {

            opacity: 0,

            y: 14,

            duration: 0.55

        },
        "-=0.55"
    );


    heroTimeline.from(
        ".hero-title",
        {

            opacity: 0,

            y: 20,

            duration: 0.7

        },
        "-=0.42"
    );


    heroTimeline.from(
        ".hero-description",
        {

            opacity: 0,

            y: 16,

            duration: 0.6

        },
        "-=0.45"
    );


    heroTimeline.from(
        ".hero-actions",
        {

            opacity: 0,

            y: 14,

            duration: 0.55

        },
        "-=0.40"
    );


    heroTimeline.from(
        ".hero-welcome-point",
        {

            opacity: 0,

            y: 12,

            duration: 0.5,

            stagger: 0.08

        },
        "-=0.35"
    );


    /* =====================================================
       SCROLLMAGIC
       ===================================================== */

    if (
        typeof ScrollMagic ===
        "undefined"
    ) {

        return;

    }


    const controller =
        new ScrollMagic.Controller();


    /* =====================================================
       FUNÇÃO GLOBAL DE REVELAÇÃO
       ===================================================== */

    function createRevealScene(
        trigger,
        targets,
        options = {}
    ) {

        const triggerElement =
            document.querySelector(
                trigger
            );

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

                y:
                    options.y ??
                    24

            }
        );


        new ScrollMagic.Scene({

            triggerElement:
                triggerElement,

            triggerHook:
                options.triggerHook ??
                0.82,

            reverse: false

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
                                options.duration ??
                                0.75,

                            stagger:
                                options.stagger ??
                                0.07,

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


    /* =====================================================
       INSTITUTO
       ===================================================== */

    const instituteTrigger =
        document.querySelector(
            ".institute-section"
        );

    if (instituteTrigger) {

        gsap.set(
            ".institute-images",
            {

                opacity: 0,

                x: -28

            }
        );

        gsap.set(
            ".institute-content",
            {

                opacity: 0,

                x: 28

            }
        );


        new ScrollMagic.Scene({

            triggerElement:
                instituteTrigger,

            triggerHook: 0.78,

            reverse: false

        })

            .on(
                "enter",
                () => {

                    gsap.to(
                        ".institute-images",
                        {

                            opacity: 1,

                            x: 0,

                            duration: 0.85,

                            ease:
                                "power3.out"

                        }
                    );


                    gsap.to(
                        ".institute-content",
                        {

                            opacity: 1,

                            x: 0,

                            duration: 0.85,

                            delay: 0.1,

                            ease:
                                "power3.out"

                        }
                    );

                }
            )

            .addTo(
                controller
            );

    }


    /* =====================================================
       ESPECIALIDADES
       ===================================================== */

    createRevealScene(
        ".specialties-section",
        ".specialties-section .section-heading",
        {

            y: 20,

            duration: 0.7

        }
    );


    /* =====================================================
       REABILITAÇÃO
       ===================================================== */

    const rehabilitationTrigger =
        document.querySelector(
            ".rehabilitation-section"
        );

    if (rehabilitationTrigger) {

        gsap.set(
            ".rehabilitation-content",
            {

                opacity: 0,

                x: -24

            }
        );

        gsap.set(
            ".rehabilitation-visual",
            {

                opacity: 0,

                x: 24

            }
        );


        new ScrollMagic.Scene({

            triggerElement:
                rehabilitationTrigger,

            triggerHook: 0.78,

            reverse: false

        })

            .on(
                "enter",
                () => {

                    gsap.to(
                        ".rehabilitation-content",
                        {

                            opacity: 1,

                            x: 0,

                            duration: 0.8,

                            ease:
                                "power3.out"

                        }
                    );


                    gsap.to(
                        ".rehabilitation-visual",
                        {

                            opacity: 1,

                            x: 0,

                            duration: 0.8,

                            delay: 0.08,

                            ease:
                                "power3.out"

                        }
                    );


                    gsap.from(
                        ".rehabilitation-item",
                        {

                            opacity: 0,

                            y: 12,

                            duration: 0.5,

                            stagger: 0.07,

                            delay: 0.22,

                            ease:
                                "power2.out"

                        }
                    );

                }
            )

            .addTo(
                controller
            );

    }


    /* =====================================================
       LINGUAGEM
       ===================================================== */

    createRevealScene(
        ".language-section",
        ".language-section .section-heading",
        {

            y: 20,

            duration: 0.7

        }
    );


    createRevealScene(
        ".language-grid",
        ".language-card",
        {

            y: 24,

            duration: 0.65,

            stagger: 0.08

        }
    );


    /* =====================================================
       BANNER DE CONVERSÃO
       ===================================================== */

    const conversionBanner =
        document.querySelector(
            ".conversion-banner"
        );

    if (conversionBanner) {

        gsap.set(
            conversionBanner,
            {

                opacity: 0,

                y: 24,

                scale: 0.985

            }
        );


        new ScrollMagic.Scene({

            triggerElement:
                conversionBanner,

            triggerHook: 0.86,

            reverse: false

        })

            .on(
                "enter",
                () => {

                    gsap.to(
                        conversionBanner,
                        {

                            opacity: 1,

                            y: 0,

                            scale: 1,

                            duration: 0.8,

                            ease:
                                "power3.out"

                        }
                    );


                    gsap.from(
                        conversionBanner.children,
                        {

                            opacity: 0,

                            y: 10,

                            duration: 0.55,

                            stagger: 0.08,

                            delay: 0.18,

                            ease:
                                "power2.out"

                        }
                    );

                }
            )

            .addTo(
                controller
            );

    }


    /* =====================================================
       DIFERENCIAIS
       ===================================================== */

    createRevealScene(
        ".differentials-section",
        ".differentials-section .section-heading",
        {

            y: 20,

            duration: 0.7

        }
    );


    createRevealScene(
        ".differentials-grid",
        ".differential-card",
        {

            y: 22,

            duration: 0.65,

            stagger: 0.07

        }
    );


    /* =====================================================
       ESTRUTURA
       ===================================================== */

    createRevealScene(
        ".structure-section",
        ".structure-heading",
        {

            y: 20,

            duration: 0.7

        }
    );


    createRevealScene(
        ".structure-carousel",
        ".structure-carousel",
        {

            y: 24,

            duration: 0.75

        }
    );


    /* =====================================================
       CAPTAÇÃO
       ===================================================== */

    const leadSection =
        document.querySelector(
            ".lead-section"
        );

    if (leadSection) {

        gsap.set(
            ".lead-content",
            {

                opacity: 0,

                x: -24

            }
        );

        gsap.set(
            ".lead-card",
            {

                opacity: 0,

                x: 24,

                scale: 0.99

            }
        );


        new ScrollMagic.Scene({

            triggerElement:
                leadSection,

            triggerHook: 0.78,

            reverse: false

        })

            .on(
                "enter",
                () => {

                    gsap.to(
                        ".lead-content",
                        {

                            opacity: 1,

                            x: 0,

                            duration: 0.78,

                            ease:
                                "power3.out"

                        }
                    );


                    gsap.to(
                        ".lead-card",
                        {

                            opacity: 1,

                            x: 0,

                            scale: 1,

                            duration: 0.82,

                            delay: 0.08,

                            ease:
                                "power3.out"

                        }
                    );


                    gsap.from(
                        ".lead-benefit",
                        {

                            opacity: 0,

                            y: 10,

                            duration: 0.48,

                            stagger: 0.07,

                            delay: 0.22,

                            ease:
                                "power2.out"

                        }
                    );

                }
            )

            .addTo(
                controller
            );

    }


    /* =====================================================
       CONTATO
       ===================================================== */

    createRevealScene(
        ".contact-section",
        ".contact-intro",
        {

            y: 18,

            duration: 0.7

        }
    );


    createRevealScene(
        ".contact-chips",
        ".contact-chip",
        {

            y: 16,

            duration: 0.55,

            stagger: 0.07

        }
    );


    const contactLogistics =
        document.querySelector(
            ".contact-logistics-grid"
        );

    if (contactLogistics) {

        gsap.set(
            ".map-card",
            {

                opacity: 0,

                x: -20

            }
        );

        gsap.set(
            ".hours-card",
            {

                opacity: 0,

                x: 20

            }
        );


        new ScrollMagic.Scene({

            triggerElement:
                contactLogistics,

            triggerHook: 0.84,

            reverse: false

        })

            .on(
                "enter",
                () => {

                    gsap.to(
                        ".map-card",
                        {

                            opacity: 1,

                            x: 0,

                            duration: 0.7,

                            ease:
                                "power3.out"

                        }
                    );


                    gsap.to(
                        ".hours-card",
                        {

                            opacity: 1,

                            x: 0,

                            duration: 0.7,

                            delay: 0.08,

                            ease:
                                "power3.out"

                        }
                    );

                }
            )

            .addTo(
                controller
            );

    }

});
