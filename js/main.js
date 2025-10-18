// Main JavaScript File for Template Functionality

// Mobile Menu Toggle Functionality
document.addEventListener("DOMContentLoaded", function () {
  const toggleMenu = document.querySelector(".toggle-menu");
  const nav = document.querySelector("header nav ul");

  // Toggle menu function
  function toggleMobileMenu() {
    if (nav.classList.contains("show")) {
      // Hide menu with fade out
      nav.classList.remove("show");
    } else {
      // Show menu with fade in
      nav.style.display = "flex";
      // Force reflow to ensure display change is applied before transition
      nav.offsetHeight;
      nav.classList.add("show");
    }
  }

  // Add click event listener to toggle button
  if (toggleMenu) {
    toggleMenu.addEventListener("click", function (e) {
      e.preventDefault();
      toggleMobileMenu();
    });
  }

  // Close menu when clicking on a menu item (optional)
  const menuLinks = document.querySelectorAll("header nav ul li a");
  menuLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 767.9) {
        nav.classList.remove("show");
      }
    });
  });

  // Close menu when clicking outside (optional)
  document.addEventListener("click", function (e) {
    if (
      window.innerWidth <= 767.9 &&
      nav &&
      nav.classList.contains("show") &&
      !nav.contains(e.target) &&
      !toggleMenu.contains(e.target)
    ) {
      nav.classList.remove("show");
    }
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    if (nav && window.innerWidth > 767.9) {
      nav.classList.remove("show");
      nav.style.display = "";
    }
  });
});

// ========================================
// Search Functionality
// ========================================

document.addEventListener("DOMContentLoaded", function () {
  const searchIcon = document.querySelector(".search-icon");
  const searchForm = document.querySelector("header nav .form");
  const searchInput = document.querySelector(".search-input");
  const closeSearch = document.querySelector(".close-search");

  // All searchable content elements
  let searchableElements = [];

  // Initialize searchable content
  function initializeSearchContent() {
    // Get all text content from major sections
    const sections = document.querySelectorAll(
      "section, .landing, .services, .design, .portfolio, .about, .stats, .skills, .quote, .pricing, .contact"
    );

    searchableElements = [];

    sections.forEach((section) => {
      const textElements = section.querySelectorAll(
        "h1, h2, h3, h4, h5, h6, p, span, a, li"
      );
      textElements.forEach((element) => {
        const text = element.textContent.trim();
        if (text.length > 2) {
          // Only include meaningful text
          searchableElements.push({
            element: element,
            text: text.toLowerCase(),
            section: section,
          });
        }
      });
    });
  }

  // Open search bar
  function openSearch() {
    searchForm.classList.add("active");
    setTimeout(() => {
      searchInput.focus();
    }, 300);
  }

  // Close search bar
  function closeSearchBar() {
    searchForm.classList.remove("active");
    searchInput.value = "";
    clearSearchResults();
    searchInput.blur();
  }

  // Clear previous search results highlighting
  function clearSearchResults() {
    document.querySelectorAll(".search-highlight").forEach((element) => {
      const parent = element.parentNode;
      parent.replaceChild(
        document.createTextNode(element.textContent),
        element
      );
      parent.normalize();
    });
  }

  // Highlight search results
  function highlightText(element, searchTerm) {
    const text = element.textContent;
    const regex = new RegExp(`(${searchTerm})`, "gi");

    if (regex.test(text)) {
      const highlightedText = text.replace(
        regex,
        '<span class="search-highlight">$1</span>'
      );
      element.innerHTML = highlightedText;
      return true;
    }
    return false;
  }

  // Perform search
  function performSearch(searchTerm) {
    clearSearchResults();

    if (searchTerm.length < 2) return;

    const results = [];
    const searchTermLower = searchTerm.toLowerCase();

    searchableElements.forEach((item) => {
      if (item.text.includes(searchTermLower)) {
        results.push(item);
        highlightText(item.element, searchTerm);
      }
    });

    // Scroll to first result if found
    if (results.length > 0) {
      const firstResult = results[0];
      const headerHeight = document.querySelector("header").offsetHeight;
      const targetPosition = firstResult.section.offsetTop - headerHeight;

      setTimeout(() => {
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }, 100);
    }

    console.log(`Found ${results.length} results for "${searchTerm}"`);
  }

  // Event listeners
  if (searchIcon) {
    searchIcon.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      openSearch();
    });
  }

  if (closeSearch) {
    closeSearch.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      closeSearchBar();
    });
  }

  if (searchInput) {
    // Handle Enter key for search only
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        const searchTerm = this.value.trim();
        if (searchTerm.length >= 2) {
          performSearch(searchTerm);
        }
      }

      // Handle Escape key
      if (e.key === "Escape") {
        closeSearchBar();
      }
    });

    // Clear search results when input is cleared
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.trim();
      if (searchTerm.length === 0) {
        clearSearchResults();
      }
    });
  }

  // Close search when clicking outside
  document.addEventListener("click", function (e) {
    if (
      searchForm &&
      searchForm.classList.contains("active") &&
      !searchForm.contains(e.target) &&
      searchIcon &&
      !searchIcon.contains(e.target)
    ) {
      closeSearchBar();
    }
  });

  // Initialize search content after page loads
  setTimeout(initializeSearchContent, 1000);
});

// ========================================
// Additional Template Functions
// ========================================

// Smooth Scrolling for Navigation Links
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll('header nav ul li a[href^="#"]');

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});

// Landing Slider Functionality (for future implementation)
document.addEventListener("DOMContentLoaded", function () {
  // Placeholder for landing slider functionality
  // This can be expanded later as needed
  console.log("Landing slider ready for implementation");
});

// Portfolio Filter Functionality
document.addEventListener("DOMContentLoaded", function () {
  const filterContainer = document.querySelector(
    ".portfolio .container .filter"
  );
  const filterPills = document.querySelectorAll(
    ".portfolio .container .filter p"
  );
  const items = document.querySelectorAll(".portfolio .imgs-container .box");

  if (!filterContainer || filterPills.length === 0 || items.length === 0) {
    return;
  }

  // Get category from item caption paragraph
  function getItemCategory(item) {
    const catEl = item.querySelector(".caption p");
    return (catEl?.textContent || "").trim().toLowerCase();
  }

  // Apply a filter by label (e.g., 'All', 'Web Design')
  function applyFilter(label) {
    const target = (label || "").trim().toLowerCase();

    items.forEach((item) => {
      const itemCat = getItemCategory(item);
      const match = target === "all" || itemCat === target;
      // Use inline styles for compatibility, could also use a CSS class
      item.style.display = match ? "block" : "none";
    });
  }

  // Click handling for pills
  filterPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      // Active UI state
      filterPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      // Filter
      applyFilter(pill.textContent);
    });
  });

  // Initialize based on pre-marked active pill or default to first
  const activePill =
    document.querySelector(".portfolio .container .filter p.active") ||
    filterPills[0];
  if (activePill) {
    applyFilter(activePill.textContent);
  }

  // Reset filter when clicking "View All Projects"
  const viewAllLink = document.querySelector(".portfolio .more");
  if (viewAllLink) {
    viewAllLink.addEventListener("click", (e) => {
      e.preventDefault();
      // Set 'All' pill active and apply filter
      filterPills.forEach((p) => p.classList.remove("active"));
      const allPill =
        Array.from(filterPills).find(
          (p) => p.textContent.trim().toLowerCase() === "all"
        ) || filterPills[0];
      if (allPill) allPill.classList.add("active");
      applyFilter("All");
    });
  }
});

// ========================================
// Toast Notifications Utility + Form Wiring
// ========================================
document.addEventListener("DOMContentLoaded", function () {
  // Create container lazily
  function getToastContainer() {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }
    return container;
  }

  // Show a toast message
  function showToast(message, options = {}) {
    const { type = "success", duration = 3000 } = options;
    const container = getToastContainer();

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    // Use Font Awesome if available for icon
    const icon = document.createElement("span");
    icon.className = "toast-icon";
    icon.innerHTML =
      type === "success"
        ? '<i class="fas fa-check-circle" aria-hidden="true"></i>'
        : type === "error"
        ? '<i class="fas fa-exclamation-circle" aria-hidden="true"></i>'
        : '<i class="fas fa-info-circle" aria-hidden="true"></i>';

    const msg = document.createElement("div");
    msg.className = "toast-message";
    msg.textContent = message;

    const closeBtn = document.createElement("button");
    closeBtn.className = "toast-close";
    closeBtn.setAttribute("aria-label", "Close notification");
    closeBtn.innerHTML = "&times;";
    closeBtn.addEventListener("click", () => dismiss());

    toast.appendChild(icon);
    toast.appendChild(msg);
    toast.appendChild(closeBtn);
    container.appendChild(toast);

    let hideTimeout = setTimeout(() => dismiss(), duration);

    function dismiss() {
      clearTimeout(hideTimeout);
      toast.classList.add("hide");
      toast.addEventListener("animationend", () => toast.remove(), {
        once: true,
      });
    }

    return dismiss;
  }

  // Subscribe form handler
  const subscribeForm = document.querySelector(".subscribe form");
  if (subscribeForm) {
    subscribeForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = subscribeForm.querySelector('input[type="email"]');
      const email = emailInput ? emailInput.value.trim() : "";

      // Basic validation
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      // Reset error class
      if (emailInput) emailInput.classList.remove("input-error");

      if (!emailValid) {
        if (emailInput) emailInput.classList.add("input-error");
        showToast("Please enter a valid email address.", {
          type: "error",
          duration: 3500,
        });
        return;
      }

      // Fake success message
      showToast("You have successfully subscribed to Kasber latest news.", {
        type: "success",
        duration: 3500,
      });

      // Clear input
      if (emailInput) emailInput.value = "";
    });
  }

  // Contact form handler
  const contactForm = document.querySelector(".contact form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nameInput = contactForm.querySelector('input[type="text"]');
      const emailInput = contactForm.querySelector('input[type="email"]');
      const messageInput = contactForm.querySelector("textarea");

      const name = nameInput ? nameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const message = messageInput ? messageInput.value.trim() : "";

      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      // Reset previous error styles
      [nameInput, emailInput, messageInput].forEach(
        (el) => el && el.classList.remove("input-error")
      );

      const errors = [];
      if (!name) {
        errors.push("Name is required.");
        if (nameInput) nameInput.classList.add("input-error");
      }
      if (!emailValid) {
        errors.push("A valid email is required.");
        if (emailInput) emailInput.classList.add("input-error");
      }
      if (!message) {
        errors.push("Message cannot be empty.");
        if (messageInput) messageInput.classList.add("input-error");
      }

      if (errors.length > 0) {
        showToast(errors[0], { type: "error", duration: 4000 });
        return;
      }

      showToast("Message sent successfully.", {
        type: "success",
        duration: 3500,
      });

      // Clear inputs
      const fields = contactForm.querySelectorAll("input, textarea");
      fields.forEach((el) => {
        if (el.type !== "submit" && el.type !== "button") el.value = "";
      });
    });
  }
});

// Contact Form Handling (for future implementation)
document.addEventListener("DOMContentLoaded", function () {
  // Placeholder for contact form functionality
  // This can be expanded later as needed
  console.log("Contact form ready for implementation");
});

// Scroll Animation Effects
document.addEventListener("DOMContentLoaded", function () {
  // Function to animate progress bars
  function animateProgressBar(progHolder) {
    const progressSpan = progHolder.querySelector(".prog span");
    if (!progressSpan) return;

    // Check if animation has already been started
    if (progressSpan.getAttribute("data-animated") === "true") return;
    progressSpan.setAttribute("data-animated", "true");

    const targetWidth = progressSpan.getAttribute("data-target-width");
    const targetValue = parseInt(
      progressSpan.getAttribute("data-target-value")
    );

    if (!targetWidth || !targetValue) return;

    let currentValue = 0;
    const duration = 1600; // 1.6 seconds animation
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      currentValue = easeOutQuart * targetValue;

      // Only animate the width, tooltip stays in fixed position
      progressSpan.style.width = Math.round(currentValue) + "%";

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        progressSpan.style.width = targetWidth;
      }
    };

    // Start animation with a small delay for better visual effect
    setTimeout(() => {
      requestAnimationFrame(animate);
    }, 200);
  }

  // Function to animate count-up numbers (stats)
  function animateCountUp(element, options = {}) {
    if (!element || element.getAttribute("data-animated") === "true") return;

    // Parse target value from current text (supports commas)
    const rawText = (
      element.getAttribute("data-target") ||
      element.textContent ||
      ""
    ).trim();
    const numeric = parseFloat(rawText.replace(/[^\d.\-]/g, ""));
    if (isNaN(numeric)) return;

    const duration = options.duration || 1600; // ms
    const decimals =
      options.decimals ??
      (rawText.includes(".") ? (rawText.split(".")[1] || "").length : 0);

    element.setAttribute("data-animated", "true");

    const startTime = performance.now();
    const startVal = 0;
    const endVal = numeric;

    const format = (val) => {
      const factor = Math.pow(10, decimals);
      const rounded = Math.round(val * factor) / factor;
      // Use locale formatting with thousands separators
      return decimals > 0
        ? rounded.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        : Math.round(rounded).toLocaleString();
    };

    // Do not modify initial text until animation starts
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out for smooth end
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = startVal + (endVal - startVal) * eased;
      element.textContent = format(current);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.textContent = format(endVal);
      }
    };

    // Start from visible 0 for clearer effect
    element.textContent = format(0);
    requestAnimationFrame(animate);
  }

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Animate progress bars when skills section becomes visible
        if (
          entry.target.classList.contains("fade-in-right") &&
          entry.target.closest(".our-skills") &&
          entry.target.querySelector(".prog span")
        ) {
          animateProgressBar(entry.target);
        }

        // Trigger stats count-up once when stats section first becomes visible
        if (entry.target.classList.contains("stats")) {
          const statsSection = entry.target;
          if (statsSection.getAttribute("data-counted") !== "true") {
            statsSection.setAttribute("data-counted", "true");
            const numbers = statsSection.querySelectorAll(".number");
            numbers.forEach((numEl) => animateCountUp(numEl));
          }
        }
      }
    });
  }, observerOptions);

  // Add animation classes to elements and observe them
  function initScrollAnimations() {
    // Main sections with fade-in-section
    const sections = document.querySelectorAll(
      ".services, .design, .portfolio, .about, .stats, .our-skills, .quote, .pricing, .subscribe, .contact"
    );
    sections.forEach((section) => {
      section.classList.add("fade-in-section");
      observer.observe(section);
    });

    // Service boxes with staggered animation
    const serviceBoxes = document.querySelectorAll(".services .srv-box");
    serviceBoxes.forEach((box) => {
      box.classList.add("fade-in-stagger");
      observer.observe(box);
    });

    // Portfolio items with staggered animation
    const portfolioItems = document.querySelectorAll(
      ".portfolio .imgs-container .box"
    );
    portfolioItems.forEach((item) => {
      item.classList.add("fade-in-stagger");
      observer.observe(item);
    });

    // Stats boxes with scale animation
    const statsBoxes = document.querySelectorAll(".stats .box");
    statsBoxes.forEach((box) => {
      box.classList.add("fade-in-scale");
      observer.observe(box);
    });

    // Observe the stats section itself to trigger counting once
    const statsSection = document.querySelector(".stats");
    if (statsSection) {
      statsSection.classList.add("fade-in-section");
      observer.observe(statsSection);
    }

    // Skills progress bars with fade-in-right and animation
    const skillsBars = document.querySelectorAll(".our-skills .prog-holder");
    skillsBars.forEach((bar) => {
      bar.classList.add("fade-in-right");
      observer.observe(bar);

      // Store original width and reset to 0 for animation
      const progressSpan = bar.querySelector(".prog span");
      if (progressSpan) {
        const originalWidth = progressSpan.style.width;
        const targetValue = parseInt(originalWidth);

        // Store the target values as data attributes
        progressSpan.setAttribute("data-target-width", originalWidth);
        progressSpan.setAttribute("data-target-value", targetValue.toString());

        // Reset width to 0% for animation, but keep data-progress for static tooltip
        progressSpan.style.width = "0%";
      }
    });

    // Testimonials with fade-in-left
    const testimonials = document.querySelectorAll(
      ".our-skills .testimonials .content"
    );
    testimonials.forEach((testimonial) => {
      testimonial.classList.add("fade-in-left");
      observer.observe(testimonial);
    });

    // Pricing plans with staggered animation
    const pricingPlans = document.querySelectorAll(".pricing .plan");
    pricingPlans.forEach((plan) => {
      plan.classList.add("fade-in-stagger");
      observer.observe(plan);
    });

    // Main headings with fade-in-up
    const headings = document.querySelectorAll(".main-heading");
    headings.forEach((heading) => {
      heading.classList.add("fade-in-up");
      observer.observe(heading);
    });

    // Video text with fade-in-scale
    const videoText = document.querySelector(".video .text");
    if (videoText) {
      videoText.classList.add("fade-in-scale");
      observer.observe(videoText);
    }

    // Design text with fade-in-right
    const designText = document.querySelector(".design .text");
    if (designText) {
      designText.classList.add("fade-in-right");
      observer.observe(designText);
    }

    // About image with fade-in-up
    const aboutImage = document.querySelector(".about img");
    if (aboutImage) {
      aboutImage.classList.add("fade-in-up");
      observer.observe(aboutImage);
    }

    // Contact form with fade-in-left
    const contactForm = document.querySelector(".contact form");
    if (contactForm) {
      contactForm.classList.add("fade-in-left");
      observer.observe(contactForm);
    }

    // Contact info with fade-in-right
    const contactInfo = document.querySelector(".contact .info");
    if (contactInfo) {
      contactInfo.classList.add("fade-in-right");
      observer.observe(contactInfo);
    }

    // Footer with fade-in-up
    const footer = document.querySelector(".footer");
    if (footer) {
      footer.classList.add("fade-in-up");
      observer.observe(footer);
    }
  }

  // Initialize scroll animations
  initScrollAnimations();

  // Re-initialize if content is dynamically added
  window.refreshScrollAnimations = initScrollAnimations;

  console.log("Scroll animations initialized");
});
