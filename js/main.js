document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    const currentYear = document.getElementById("currentYear");


    // Mobile navigation
    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = mainNav.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        mainNav.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    // Current footer year
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

});




/* =========================================================
   OXNARD IT SOLUTIONS
   Shared JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");


    if (menuToggle && mainNav) {

        // Open / close mobile navigation
        menuToggle.addEventListener("click", () => {

            const isOpen = mainNav.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.classList.toggle("active", isOpen);
        });


        // Close the mobile menu after selecting a link
        mainNav.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("open");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });

        });


        // Close navigation with Escape key
        document.addEventListener("keydown", (event) => {

            if (
                event.key === "Escape" &&
                mainNav.classList.contains("open")
            ) {
                mainNav.classList.remove("open");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.focus();
            }

        });


        // Reset menu when moving back to desktop width
        window.addEventListener("resize", () => {

            if (window.innerWidth > 900) {

                mainNav.classList.remove("open");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }


    /* =====================================================
       COPYRIGHT YEAR
       ===================================================== */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

});