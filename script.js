// Wait until the page is ready before looking for elements to update.
document.addEventListener("DOMContentLoaded", () => {
  // Insert the current year in every footer without editing each page annually.
  document.querySelectorAll("[data-year]").forEach((yearElement) => {
    yearElement.textContent = new Date().getFullYear();
  });

  // Highlight the navigation link that matches the page currently open.
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-nav .nav-link").forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  // Reveal sections as they enter the screen; show them immediately if unsupported.
  const revealItems = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  // This demo form validates required fields and displays a local confirmation.
  // Connect a form service or server to actually deliver messages.
  const contactForm = document.querySelector("#contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const feedback = document.querySelector("#formFeedback");
      if (!contactForm.checkValidity()) {
        contactForm.classList.add("was-validated");
        feedback.textContent = "Please complete each field with a valid email address.";
        contactForm.reportValidity();
        return;
      }
      feedback.textContent = "Thanks for your note! This demo does not send messages yet.";
      contactForm.reset();
      contactForm.classList.remove("was-validated");
    });
  }
});
