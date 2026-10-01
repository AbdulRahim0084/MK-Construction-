/* =====================================================
   MK CONSTRUCTION - script.js
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    // ==========================================
    // MOBILE MENU
    // ==========================================

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            navMenu.classList.toggle("active");
            menuToggle.classList.toggle("active");

            const isOpen =
                navMenu.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        });


        // Mobile menu link click के बाद menu बंद
        navMenu.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("active");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    // ==========================================
    // SMOOTH SCROLL
    // ==========================================

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    // ==========================================
    // HEADER SCROLL EFFECT
    // ==========================================

    const header =
        document.querySelector(".header");

    function handleHeaderScroll() {

        if (!header) {
            return;
        }

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );

    handleHeaderScroll();


    // ==========================================
    // ACTIVE NAVIGATION
    // ==========================================

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".nav-menu a");

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 160;

            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(function (link) {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (href === "#" + currentSection) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );


    // ==========================================
    // SCROLL REVEAL
    // ==========================================

    const revealElements =
        document.querySelectorAll(
            ".service-card, " +
            ".project-card, " +
            ".payment-card, " +
            ".compliance-card, " +
            ".stat-card, " +
            ".timeline-card, " +
            ".why-item"
        );


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "show"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(function (element) {

            element.classList.add("reveal");

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(function (element) {

            element.classList.add("show");

        });

    }


    // ==========================================
    // CONTACT FORM → WHATSAPP
    // ==========================================

    const contactForm =
        document.querySelector("#contactForm");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document.querySelector("#name")
                    ?.value.trim();


                const phone =
                    document.querySelector("#phone")
                    ?.value.trim();


                const project =
                    document.querySelector("#project")
                    ?.value.trim();


                const projectType =
                    document.querySelector("#projectType")
                    ?.value.trim();


                const message =
                    document.querySelector("#message")
                    ?.value.trim();


                // Basic validation
                if (!name || !phone || !message) {

                    alert(
                        "कृपया Name, Mobile Number और Project Details भरें।"
                    );

                    return;

                }


                // Phone validation
                const cleanPhone =
                    phone.replace(/\D/g, "");


                if (cleanPhone.length < 10) {

                    alert(
                        "कृपया सही Mobile Number दर्ज करें।"
                    );

                    return;

                }


                // ==================================
                // WHATSAPP NUMBER
                // ==================================

                const whatsappNumber =
                    "919828574802";


                // ==================================
                // WHATSAPP MESSAGE
                // ==================================

                const whatsappMessage =
                    "नमस्ते MK Construction,%0A%0A" +

                    "मुझे construction project के बारे में जानकारी चाहिए।%0A%0A" +

                    "नाम: " +
                    encodeURIComponent(name) +
                    "%0A" +

                    "मोबाइल: " +
                    encodeURIComponent(phone) +
                    "%0A" +

                    "Project Type: " +
                    encodeURIComponent(
                        projectType || "Not Specified"
                    ) +
                    "%0A" +

                    "Project Location: " +
                    encodeURIComponent(
                        project || "Not Specified"
                    ) +
                    "%0A" +

                    "Project Details: " +
                    encodeURIComponent(message) +
                    "%0A%0A" +

                    "कृपया project और quotation के बारे में जानकारी दें।";


                const whatsappURL =
                    "https://wa.me/" +
                    whatsappNumber +
                    "?text=" +
                    whatsappMessage;


                // WhatsApp open
                window.open(
                    whatsappURL,
                    "_blank",
                    "noopener"
                );


                // Form reset
                contactForm.reset();


                // Project message भी clear करें
                const projectMessage =
                    document.querySelector(
                        "#projectMessage"
                    );

                if (projectMessage) {
                    projectMessage.textContent = "";
                }

            }
        );

    }


    // ==========================================
    // PROJECT TYPE MESSAGE
    // ==========================================

    const projectType =
        document.querySelector("#projectType");

    const projectMessage =
        document.querySelector("#projectMessage");


    if (projectType && projectMessage) {

        projectType.addEventListener(
            "change",
            function () {

                if (this.value === "large") {

                    projectMessage.textContent =
                        "बड़े projects की सामान्य planning लगभग 6–7 महीने हो सकती है।";

                }

                else if (this.value === "small") {

                    projectMessage.textContent =
                        "छोटे projects की सामान्य planning लगभग 2–3 महीने हो सकती है।";

                }

                else {

                    projectMessage.textContent = "";

                }

            }
        );

    }


    // ==========================================
    // CURRENT YEAR
    // ==========================================

    const currentYear =
        document.querySelector("#currentYear");


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    // ==========================================
    // BACK TO TOP
    // ==========================================

    const backToTop =
        document.querySelector("#backToTop");


    if (backToTop) {

        window.addEventListener(
            "scroll",
            function () {

                if (window.scrollY > 500) {

                    backToTop.classList.add("show");

                } else {

                    backToTop.classList.remove("show");

                }

            },
            { passive: true }
        );


        backToTop.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    // ==========================================
    // ESC KEY
    // ==========================================

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                if (navMenu) {

                    navMenu.classList.remove(
                        "active"
                    );

                }


                if (menuToggle) {

                    menuToggle.classList.remove(
                        "active"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }
    );


    // ==========================================
    // CONSOLE
    // ==========================================

    console.log(
        "MK Construction Website Loaded Successfully."
    );

});