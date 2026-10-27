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


        // Close mobile navigation after selecting a link
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


        // Close navigation with Escape
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


        // Reset navigation when returning to desktop width
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


    /* =====================================================
       CONTACT FORM
       ===================================================== */

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        const submitButton =
            contactForm.querySelector(".contact-submit");

        const submitArea =
            contactForm.querySelector(".form-submit-area");


        /* -------------------------------------------------
           STATUS MESSAGE AREA
           ------------------------------------------------- */

        const formStatus = document.createElement("div");

        formStatus.className = "form-status";

        formStatus.setAttribute(
            "role",
            "status"
        );

        formStatus.setAttribute(
            "aria-live",
            "polite"
        );

        submitArea.appendChild(formStatus);


        /* -------------------------------------------------
           FORM SUBMISSION
           ------------------------------------------------- */

        contactForm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();


                /* -----------------------------------------
                   BROWSER VALIDATION
                   ----------------------------------------- */

                if (!contactForm.checkValidity()) {

                    contactForm.reportValidity();

                    return;

                }


                /* -----------------------------------------
                   COLLECT FORM VALUES
                   ----------------------------------------- */

                const formData =
                    new FormData(contactForm);

                const turnstileToken =
                    formData.get("cf-turnstile-response") || "";

                const payload = {

                    name:
                        (formData.get("name") || "").trim(),

                    business:
                        (formData.get("business") || "").trim(),

                    email:
                        (formData.get("email") || "").trim(),

                    phone:
                        (formData.get("phone") || "").trim(),

                    businessType:
                        (formData.get("businessType") || "").trim(),

                    service:
                        (formData.get("service") || "").trim(),

                    message:
                        (formData.get("message") || "").trim(),

                    contactPreference:
                        (
                            formData.get("contactPreference")
                            || "email"
                        ).trim(),

                    companyWebsite:
                        (formData.get("companyWebsite") || "").trim(),

                    turnstileToken:
                        turnstileToken.trim(),

                };

                if (!turnstileToken.trim()) {

                    formStatus.className =
                        "form-status form-status-error";

                    formStatus.innerHTML = `
                        <strong>
                            Security verification required.
                        </strong>

                        <span>
                            Please complete the security check
                            before sending your request.
                        </span>
                    `;

                    return;

                }
                /* -----------------------------------------
                   SUBMITTING STATE
                   ----------------------------------------- */

                const originalButtonHTML =
                    submitButton.innerHTML;

                submitButton.disabled = true;

                submitButton.classList.add(
                    "is-loading"
                );

                submitButton.innerHTML = `
                    Sending Request
                    <span
                        class="submit-spinner"
                        aria-hidden="true"
                    ></span>
                `;

                formStatus.className =
                    "form-status";

                formStatus.textContent =
                    "";


                try {

                    /* -------------------------------------
                       SEND REQUEST TO FLASK API
                       ------------------------------------- */

                    const response =
                        await fetch(
                            "/api/contact",
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json",

                                    "Accept":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(payload)
                            }
                        );


                    /*
                     * Flask returns JSON for successful
                     * requests and validation errors.
                     */
                    const result =
                        await response.json();


                    /* -------------------------------------
                       HANDLE API ERROR
                       ------------------------------------- */

                    if (!response.ok) {

                        throw new Error(
                            result.message ||
                            "We couldn't submit your request. Please check your information and try again."
                        );

                    }


                    /* -------------------------------------
                       SUCCESS
                       ------------------------------------- */

                    formStatus.className =
                        "form-status form-status-success";

                    formStatus.innerHTML = `
                        <strong>
                            Request received!
                        </strong>

                        <span>
                            Thanks for reaching out.
                            Your consultation request
                            was submitted successfully.
                        </span>
                    `;


                    // Clear form after successful submission
                    contactForm.reset();


                    // Bring confirmation into view on mobile
                    formStatus.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest"
                    });

                }
                catch (error) {

                    /* -------------------------------------
                       ERROR
                       ------------------------------------- */

                    console.error(
                        "Contact form submission error:",
                        error
                    );

                    formStatus.className =
                        "form-status form-status-error";

                    formStatus.innerHTML = `
                        <strong>
                            We couldn't send your request.
                        </strong>

                        <span>
                            ${
                                error.message ||
                                "Please try again in a moment."
                            }
                        </span>
                    `;

                }
                finally {

                    /* -------------------------------------
                       RESTORE BUTTON
                       ------------------------------------- */

                    submitButton.disabled =
                        false;

                    submitButton.classList.remove(
                        "is-loading"
                    );

                    submitButton.innerHTML =
                        originalButtonHTML;

                }

            }
        );

    }

});