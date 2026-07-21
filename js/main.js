const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Rozbalovací nabídka "Ke stažení"
const dropdown = document.querySelector(".nav-dropdown");

if (dropdown) {
  const dropdownToggle = dropdown.querySelector(".nav-dropdown-toggle");

  const closeDropdown = () => {
    dropdown.classList.remove("is-open");
    dropdownToggle.setAttribute("aria-expanded", "false");
  };

  dropdownToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = dropdown.classList.toggle("is-open");
    dropdownToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) {
      closeDropdown();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDropdown();
    }
  });
}

// Fotogalerie na stránce „Jak to všechno začalo“
const gallery = document.querySelector("[data-gallery]");

if (gallery) {
  const mainImage = gallery.querySelector("[data-gallery-main]");
  const counter = gallery.querySelector("[data-gallery-counter]");
  const items = Array.from(gallery.querySelectorAll(".gallery-item"));
  const previous = gallery.querySelector("[data-gallery-prev]");
  const next = gallery.querySelector("[data-gallery-next]");
  let activeIndex = 0;

  const showImage = (index) => {
    activeIndex = (index + items.length) % items.length;
    const activeItem = items[activeIndex];
    mainImage.src = activeItem.dataset.src;
    mainImage.alt = `Fotografie ${activeIndex + 1} ze společných akcí STAN Šumperk`;
    counter.textContent = `${activeIndex + 1} / ${items.length}`;

    items.forEach((item, itemIndex) => {
      const isActive = itemIndex === activeIndex;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
  };

  items.forEach((item, index) => {
    item.addEventListener("click", () => showImage(index));
  });

  previous.addEventListener("click", () => showImage(activeIndex - 1));
  next.addEventListener("click", () => showImage(activeIndex + 1));

  gallery.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") showImage(activeIndex - 1);
    if (event.key === "ArrowRight") showImage(activeIndex + 1);
  });

  showImage(0);
}
