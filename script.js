// fix later: Enquiry button
// document.querySelectorAll(".enquiry-button").forEach((btn) => {
//   btn.addEventListener("click", () => {
//     let targetEmail = "enquiry@punkfrog.se";

//     // Celebes Catering button uses its own address
//     if (btn.classList.contains("catering-enquiry-button")) {
//       targetEmail = "celebes@punkfrog.se";
//     }

//     try {
//       sessionStorage.setItem("pf_enquiry_email", targetEmail);
//     } catch (e) {}

//     window.location.href = "./enquiry-form.html";
//   });
// });

// document.getElementById("close-enquiry-form")?.addEventListener("click", () => {
//   window.location.href = "./index.html";
// });

// fix later: Enquiry form submission
// document.querySelector(".enquiry-form")?.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const form = e.target;
//   const name = (form.querySelector("#name")?.value || "").trim();
//   const email = (form.querySelector("#email")?.value || "").trim();
//   const subject = (form.querySelector("#subject")?.value || "").trim();
//   const message = (form.querySelector("#message")?.value || "").trim();

//   const subjectLine = subject || "Enquiry from Punkfrog website";
//   const body =
//     (name ? `Name: ${name}\n` : "") +
//     (email ? `Email: ${email}\n\n` : "") +
//     (message ? message : "");

//   let toAddress = "enquiry@punkfrog.se";
//   try {
//     const stored = sessionStorage.getItem("pf_enquiry_email");
//     if (stored) {
//       toAddress = stored;
//     }
//   } catch (e) {}

//   const mailto =
//     "mailto:" +
//     encodeURIComponent(toAddress) +
//     "?subject=" +
//     encodeURIComponent(subjectLine) +
//     "&body=" +
//     encodeURIComponent(body);

//   window.location.href = mailto;
// });

// Business Consulting panel function
(function () {
  const section = document.getElementById("business-consulting-section");
  const layout = document.querySelector(".business-consulting-layout");
  const panel = document.getElementById("consulting-detail-panel");
  const panelTitle = document.getElementById("consulting-panel-title");
  const panelList = document.getElementById("consulting-panel-list");
  const items = document.querySelectorAll(".consulting-item");

  if (!panel || !panelTitle || !panelList || !layout) return;

  function closeConsultingPanel() {
    panel.classList.remove("is-visible");
    panel.setAttribute("aria-hidden", "true");
    if (section) section.classList.remove("layout-panel-active");
  }

  items.forEach((item) => {
    item.addEventListener("click", () => {
      const title = item.dataset.panelTitle || "";
      const raw = item.dataset.panelItems || "";
      const separator = raw.includes("|") ? "|" : ",";
      const entries = raw
        .split(separator)
        .map((s) => s.trim())
        .filter(Boolean);
      panelTitle.textContent = title;
      panelList.innerHTML = entries.map((text) => `<li>${text}</li>`).join("");
      panel.classList.add("is-visible");
      panel.setAttribute("aria-hidden", "false");
      if (section) section.classList.add("layout-panel-active");
      setTimeout(() => {
        panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 370);
    });
  });

  document
    .getElementById("consulting-panel-close")
    ?.addEventListener("click", closeConsultingPanel);
})();

// Production panel function
(function () {
  const section = document.getElementById("production-section");
  const layout = document.querySelector(".production-layout");
  const panel = document.getElementById("production-detail-panel");
  const panelImg = document.getElementById("production-panel-img");
  const panelTitle = document.getElementById("production-panel-title");
  const panelDescription = document.getElementById(
    "production-panel-description",
  );
  const panelLinkWrap = document.getElementById("production-panel-link-wrap");
  const panelLink = document.getElementById("production-panel-link");
  const items = document.querySelectorAll(".production-item");

  const container = document.querySelector(".production-content-container");
  const allCards = container ? container.querySelectorAll("li") : [];

  function closeProductionPanel() {
    panel.classList.remove("is-visible");
    panel.setAttribute("aria-hidden", "true");
    if (section) section.classList.remove("layout-panel-active");
    allCards.forEach((el) => el.classList.remove("is-selected"));
  }

  items.forEach((item) => {
    item.addEventListener("click", () => {
      const li = item.closest("li");
      if (!li) return;

      allCards.forEach((el) => el.classList.remove("is-selected"));
      li.classList.add("is-selected");

      const img = item.querySelector("img");
      const title = item.dataset.productionTitle || "";
      const subtitle = (item.dataset.productionSubtitle || "").trim();
      const description = item.dataset.productionDescription || "";
      const linkUrl = (item.dataset.productionLink || "").trim();
      const linkLabel = (item.dataset.productionLinkLabel || "").trim();

      const panelSubtitle = document.getElementById(
        "production-panel-subtitle",
      );
      if (panelSubtitle) {
        panelSubtitle.textContent = subtitle;
        panelSubtitle.hidden = !subtitle;
        panelSubtitle.setAttribute("aria-hidden", subtitle ? "false" : "true");
      }

      if (panelImg) {
        panelImg.src = img ? img.src : "";
        panelImg.alt = img ? img.alt : "";

        if (item.classList.contains("production-content--jan")) {
          panelImg.classList.add("production-panel-img--jan");
        } else {
          panelImg.classList.remove("production-panel-img--jan");
        }
      }
      panelTitle.textContent = title;
      panelDescription.textContent = description;

      if (linkUrl && panelLinkWrap && panelLink) {
        panelLink.href = linkUrl;
        panelLink.textContent = linkLabel
          ? `${linkLabel}\n${linkUrl}`
          : linkUrl;
        panelLinkWrap.style.display = "";
      } else if (panelLinkWrap) {
        panelLinkWrap.style.display = "none";
      }

      panel.classList.add("is-visible");
      panel.setAttribute("aria-hidden", "false");
      if (section) section.classList.add("layout-panel-active");
    });
  });

  document
    .getElementById("production-panel-close")
    ?.addEventListener("click", closeProductionPanel);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panel.classList.contains("is-visible")) {
      closeProductionPanel();
    }
  });

  document.addEventListener("click", (e) => {
    if (
      panel.classList.contains("is-visible") &&
      !panel.contains(e.target) &&
      !e.target.closest(".production-item")
    ) {
      closeProductionPanel();
    }
  });
})();

// Frameworks button function
(function () {
  const wrapper = document.getElementById("frameworks-wrapper");
  const trigger = document.getElementById("frameworks-trigger");
  const content = document.getElementById("frameworks-content");
  const triggerText = document.querySelector(".frameworks-trigger-text");

  if (!wrapper || !trigger || !content) return;

  trigger.addEventListener("click", () => {
    const isExpanded = wrapper.classList.toggle("is-expanded");
    trigger.setAttribute("aria-expanded", String(isExpanded));
    trigger.setAttribute(
      "aria-label",
      isExpanded ? "Hide frameworks and tools" : "Show frameworks and tools",
    );
    content.setAttribute("aria-hidden", String(!isExpanded));
    if (triggerText)
      triggerText.textContent = isExpanded
        ? "Hide Frameworks & Tools"
        : "Frameworks & Tools";
  });
})();

// Back to top
(function () {
  const btn = document.getElementById("back-to-top-button");
  if (!btn) return;

  const viewportHeightsThreshold = 1;

  function updateVisibility() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const threshold = window.innerHeight * viewportHeightsThreshold;
    if (scrollY >= threshold) {
      btn.classList.add("is-visible");
      btn.setAttribute("aria-hidden", "false");
    } else {
      btn.classList.remove("is-visible");
      btn.setAttribute("aria-hidden", "true");
    }
  }

  window.addEventListener("scroll", updateVisibility, { passive: true });
  updateVisibility();
})();

// Hamburger menu
(function () {
  const button = document.getElementById("hamburger-button");
  const panel = document.getElementById("hamburger-menu-panel");
  if (!button || !panel) return;

  function openMenu() {
    document.body.classList.add("nav-menu-open");
    button.setAttribute("aria-expanded", "true");
    button.setAttribute("aria-label", "Close menu");
    panel.setAttribute("aria-hidden", "false");
  }

  function closeMenu() {
    document.body.classList.remove("nav-menu-open");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Open menu");
    panel.setAttribute("aria-hidden", "true");
  }

  function toggleMenu() {
    if (document.body.classList.contains("nav-menu-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  button.addEventListener("click", toggleMenu);

  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      document.body.classList.contains("nav-menu-open")
    ) {
      closeMenu();
    }
  });
})();

// Food carousel: pause auto-scroll when user scrolls
(function () {
  const PAUSE_RESUME_DELAY_MS = 3000;
  const tracks = document.querySelectorAll(".food-carousel-track");
  const timeouts = new Map();

  function getTranslateX(el) {
    const style = getComputedStyle(el);
    const t = style.transform;
    if (!t || t === "none") return 0;
    const m = t.match(/matrix\(([^)]+)\)/);
    if (!m) return 0;
    const parts = m[1].split(",").map((s) => parseFloat(s.trim()));
    return parts.length >= 6 ? parts[4] : parts.length >= 5 ? parts[4] : 0;
  }

  tracks.forEach((track) => {
    const inner = track.querySelector(".food-carousel-track-inner");
    if (!inner) return;

    function pauseAndSyncScroll() {
      const alreadyPaused = inner.classList.contains(
        "food-carousel-track-inner--user-scrolling",
      );
      if (!alreadyPaused) {
        const tx = getTranslateX(inner);
        inner.classList.add("food-carousel-track-inner--user-scrolling");
        track.scrollLeft = track.scrollLeft + tx;
        inner.style.transform = "none";
      }

      if (timeouts.has(inner)) clearTimeout(timeouts.get(inner));
      timeouts.set(
        inner,
        setTimeout(() => {
          track.scrollLeft = 0;
          inner.style.transform = "";
          inner.classList.remove("food-carousel-track-inner--user-scrolling");
          timeouts.delete(inner);
        }, PAUSE_RESUME_DELAY_MS),
      );
    }

    track.addEventListener("scroll", pauseAndSyncScroll, { passive: true });
    track.addEventListener("wheel", pauseAndSyncScroll, { passive: true });
  });
})();

(function () {
  document.querySelectorAll(".food-carousel-item").forEach((item) => {
    const img = item.querySelector("img");
    const caption = item.querySelector(".food-carousel-caption");

    if (img && caption && caption.children.length === 0)
      caption.textContent = img.alt || "";
  });
})();
