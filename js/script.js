// ===== PORTFOLIO JAVASCRIPT =====

// DOM Elements
const navbar = document.querySelector(".navbar");
const navMenu = document.querySelector(".nav-menu");
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelectorAll(".nav-link");
const contactForm = document.querySelector(".contact-form");

// ===== MOBILE NAVIGATION =====
function initMobileNavigation() {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
}

// ===== SMOOTH SCROLLING & ACTIVE NAVIGATION =====
function initSmoothScrolling() {
  // Handle navigation clicks
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 100; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Update active navigation on scroll
  window.addEventListener("scroll", updateActiveNavigation);
}

function updateActiveNavigation() {
  const sections = document.querySelectorAll("section[id]");
  const scrollPosition = window.scrollY + 150; // Offset for navbar

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");
    const correspondingNavLink = document.querySelector(
      `.nav-link[href="#${sectionId}"]`
    );

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      // Remove active class from all nav links
      navLinks.forEach((link) => link.classList.remove("active"));
      // Add active class to current section's nav link
      if (correspondingNavLink) {
        correspondingNavLink.classList.add("active");
      }
    }
  });
}

// ===== NAVBAR BACKGROUND ON SCROLL =====
function initNavbarScroll() {
  window.addEventListener("scroll", () => {
    const navContainer = document.querySelector(".nav-container");
    if (window.scrollY > 100) {
      navContainer.style.background = "rgba(0, 0, 0, 0.95)";
    } else {
      navContainer.style.background = "rgba(0, 0, 0, 0.8)";
    }
  });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".service-card, .project-card, .skill-item, .contact-item"
  );
  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(element);
  });
}

// ===== CONTACT FORM =====
function initContactForm() {
  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // Basic validation
    if (!name || !email || !subject || !message) {
      showNotification("Please fill in all fields", "error");
      return;
    }

    if (!isValidEmail(email)) {
      showNotification("Please enter a valid email address", "error");
      return;
    }

    // Simulate form submission
    showNotification(
      "Message sent successfully! I'll get back to you soon.",
      "success"
    );
    contactForm.reset();
  });
}

// ===== EMAIL VALIDATION =====
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    z-index: 10000;
    background: ${
      type === "success" ? "rgba(34, 197, 94, 0.9)" : "rgba(239, 68, 68, 0.9)"
    };
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    backdrop-filter: blur(10px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
  `;

  notification.querySelector(".notification-content").style.cssText = `
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  `;

  notification.querySelector(".notification-close").style.cssText = `
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 1rem;
  `;

  // Add to DOM and animate in
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// ===== FLOATING ELEMENTS ANIMATION =====
function initFloatingElements() {
  const floatingElements = document.querySelectorAll(
    ".floating-element, .floating-shape"
  );

  floatingElements.forEach((element, index) => {
    // Add random animation delays and durations for more natural movement
    const delay = Math.random() * 2;
    const duration = 3 + Math.random() * 2;

    element.style.animationDelay = `${delay}s`;
    element.style.animationDuration = `${duration}s`;
  });
}

// ===== PARALLAX SCROLLING =====
function initParallaxEffects() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const heroElements = document.querySelectorAll(".floating-element");

    heroElements.forEach((element, index) => {
      const speed = 0.5 + index * 0.1;
      const yPos = -(scrolled * speed);
      element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
  });
}


// ===== PERFORMANCE OPTIMIZATION =====
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ===== THEME SWITCHER (Optional) =====
function initThemeToggle() {
  // This could be extended to include a light/dark theme toggle
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  // Respect user's system preference
  if (prefersDarkScheme.matches) {
    document.body.classList.add("dark-theme");
  }
}

// ===== LOADING ANIMATION =====
function initLoadingAnimation() {
  window.addEventListener("load", () => {
    // Hide loading screen if it exists
    const loader = document.querySelector(".loader");
    if (loader) {
      loader.style.opacity = "0";
      setTimeout(() => loader.remove(), 500);
    }

    // Animate hero elements
    const heroText = document.querySelector(".hero-text");
    const heroVisual = document.querySelector(".hero-visual");

    if (heroText) {
      heroText.style.animation = "fadeInUp 1s ease-out";
    }
    if (heroVisual) {
      heroVisual.style.animation = "fadeInUp 1s ease-out 0.3s both";
    }
  });
}

// ===== KEYBOARD NAVIGATION =====
function initKeyboardNavigation() {
  document.addEventListener("keydown", (e) => {
    // Close mobile menu with Escape key
    if (e.key === "Escape" && navMenu.classList.contains("active")) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });
}

// ===== RESIZE HANDLER =====
function initResizeHandler() {
  const debouncedResize = debounce(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  }, 250);

  window.addEventListener("resize", debouncedResize);
}

// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initMobileNavigation();
  initSmoothScrolling();
  initNavbarScroll();
  initScrollAnimations();
  initContactForm();
  initFloatingElements();
  initParallaxEffects();
  // initCursorEffects(); // Disabled cursor following effect
  initThemeToggle();
  initLoadingAnimation();
  initKeyboardNavigation();
  initResizeHandler();

  console.log("Portfolio website initialized successfully! 🚀");
});

// ===== SERVICE WORKER REGISTRATION (Optional) =====
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

// ===== ANALYTICS (Optional) =====
function trackEvent(eventName, eventData = {}) {
  // This could be connected to Google Analytics or other tracking services
  console.log(`Event tracked: ${eventName}`, eventData);
}

// Track button clicks
document.addEventListener("click", (e) => {
  if (e.target.matches(".btn-primary")) {
    trackEvent("primary_button_click", { button_text: e.target.textContent });
  }
  if (e.target.matches(".project-link")) {
    trackEvent("project_link_click", {
      project: e.target.closest(".project-card").querySelector(".project-title")
        .textContent,
    });
  }
});

// ===== EXPORT FOR TESTING =====
window.PortfolioApp = {
  showNotification,
  isValidEmail,
  trackEvent,
};
