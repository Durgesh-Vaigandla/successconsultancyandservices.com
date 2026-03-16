(() => {
  const host = document.getElementById("siteHeader");
  if (!host) {
    return;
  }

  const page = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();

  const navItems = [
    { href: "index.html", label: "Home", active: page === "index.html" || page === "" },
    {
      href: "services.html",
      label: "Services",
      active: page === "services.html" || page.startsWith("services-"),
      children: [
        { href: "services-training.html", label: "Training Programs", active: page === "services-training.html" },
        { href: "services-placement.html", label: "Placement Assistance", active: page === "services-placement.html" },
        { href: "services-guidance.html", label: "Career Guidance", active: page === "services-guidance.html" }
      ]
    },
    {
      href: "courses.html",
      label: "Courses",
      active: page === "courses.html" || page.startsWith("course-"),
      children: [
        { href: "course-programming.html", label: "Programming Languages", active: page === "course-programming.html" },
        { href: "course-web.html", label: "Web Development", active: page === "course-web.html" },
        { href: "course-fullstack.html", label: "Full Stack Development", active: page === "course-fullstack.html" },
        { href: "course-data.html", label: "Data Science & AI", active: page === "course-data.html" },
        { href: "course-cloud.html", label: "Cloud Computing", active: page === "course-cloud.html" },
        { href: "course-security.html", label: "Cyber Security", active: page === "course-security.html" },
        { href: "course-testing.html", label: "Software Testing", active: page === "course-testing.html" }
      ]
    },
    { href: "about.html", label: "About", active: page === "about.html" },
    { href: "contact.html", label: "Contact", active: page === "contact.html" }
  ];

  const renderDesktopItem = (item) => {
    const linkClass = item.active
      ? "bg-red-700 text-white shadow-sm"
      : "text-slate-700 hover:bg-red-50 hover:text-red-700";

    if (!item.children) {
      return `<li><a class="inline-flex rounded-full px-4 py-2 text-sm font-semibold transition ${linkClass}" href="${item.href}">${item.label}</a></li>`;
    }

    const children = item.children
      .map((child) => {
        const childClass = child.active
          ? "bg-red-50 text-red-700"
          : "text-slate-700 hover:bg-red-50 hover:text-red-700";
        return `<a class="block rounded-xl px-4 py-3 text-sm font-semibold transition ${childClass}" href="${child.href}">${child.label}</a>`;
      })
      .join("");

    const iconClass = item.active ? "text-white/90" : "text-slate-500 group-hover:text-red-700";

    return `
      <li class="group relative">
        <a class="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${linkClass}" href="${item.href}">
          <span>${item.label}</span>
          <i aria-hidden="true" class="fa-solid fa-angle-down text-xs transition group-hover:rotate-180 ${iconClass}"></i>
        </a>
        <div class="invisible absolute left-0 top-full z-20 pt-3 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
          <div class="min-w-[270px] rounded-2xl border border-red-100 bg-white p-3 shadow-xl">
            <p class="px-3 pb-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">${item.label}</p>
            <div class="space-y-1">${children}</div>
          </div>
        </div>
      </li>
    `;
  };

  const renderMobileItem = (item) => {
    const primaryClass = item.active
      ? "border-red-700 bg-red-700 text-white"
      : "border-red-100 bg-red-50 text-slate-900";

    if (!item.children) {
      return `
        <li>
          <a class="block rounded-2xl border px-4 py-4 text-base font-semibold transition ${primaryClass}" href="${item.href}" data-mobile-link="true">${item.label}</a>
        </li>
      `;
    }

    const children = item.children
      .map((child) => {
        const childClass = child.active
          ? "border-red-200 bg-red-50 text-red-700"
          : "border-transparent bg-white text-slate-700";
        return `
          <a class="block rounded-xl border px-4 py-3 text-sm font-semibold transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 ${childClass}" href="${child.href}" data-mobile-link="true">${child.label}</a>
        `;
      })
      .join("");

    return `
      <li class="rounded-3xl border border-red-100 bg-white p-3 shadow-sm">
        <a class="block rounded-2xl border px-4 py-4 text-base font-semibold transition ${primaryClass}" href="${item.href}" data-mobile-link="true">${item.label}</a>
        <div class="mt-3 space-y-2 border-t border-red-100 pt-3">
          ${children}
        </div>
      </li>
    `;
  };

  host.innerHTML = `
    <header class="sticky top-0 z-50 border-b border-red-200 bg-white/95 shadow-sm backdrop-blur">
      <nav class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="index.html" class="flex items-center gap-3" aria-label="Success Consultancy and Services Home">
          <img src="logo.jpg" alt="Success Consultancy and Services logo" class="h-12 w-12 rounded-md object-cover ring-2 ring-red-200" />
          <div>
            <p class="text-sm font-extrabold leading-none text-red-700 sm:text-base">Success Consultancy and Services</p>
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-600">Training and Placement</p>
          </div>
        </a>

        <button id="menuButton" class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-red-200 bg-white text-red-700 shadow-sm transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 md:hidden" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobileMenu">
          <i id="menuIcon" aria-hidden="true" class="fa-solid fa-bars text-base"></i>
        </button>

        <ul class="hidden items-center gap-2 md:flex">
          ${navItems.map(renderDesktopItem).join("")}
        </ul>
      </nav>

      <div id="mobileBackdrop" class="pointer-events-none fixed inset-0 z-40 bg-slate-900/45 opacity-0 backdrop-blur-sm transition-opacity duration-250 md:hidden"></div>
      <div id="mobileMenu" class="pointer-events-none fixed inset-0 z-50 opacity-0 transition-opacity duration-250 md:hidden">
        <div class="flex h-full flex-col bg-red-50">
          <div class="flex items-center justify-between border-b border-red-100 bg-white px-4 py-4 shadow-sm">
            <a href="index.html" class="flex items-center gap-3" aria-label="Success Consultancy and Services Home" data-mobile-link="true">
              <img src="logo.jpg" alt="Success Consultancy and Services logo" class="h-11 w-11 rounded-md object-cover ring-2 ring-red-200" />
              <div>
                <p class="text-sm font-extrabold leading-none text-red-700">Success Consultancy and Services</p>
                <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Training and Placement</p>
              </div>
            </a>
            <button id="mobileCloseButton" class="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-red-200 px-4 text-sm font-bold text-red-700 transition hover:bg-red-50" type="button" aria-label="Close navigation menu">
              <i aria-hidden="true" class="fa-solid fa-xmark"></i>
              <span>Close</span>
            </button>
          </div>

          <div class="flex-1 overflow-y-auto px-4 py-5">
            <div class="mx-auto w-full max-w-md">
              <div class="rounded-[2rem] border border-red-100 bg-white p-4 shadow-lg">
                <div class="flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-3">
                  <img src="Hand coding-rafiki.svg" alt="Coding illustration" class="h-20 w-20 flex-none" />
                  <div>
                    <p class="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Menu</p>
                    <p class="mt-1 text-sm font-bold text-slate-900">Choose a section and move fast.</p>
                  </div>
                </div>
                <ul class="space-y-3">
                  ${navItems.map(renderMobileItem).join("")}
                </ul>
              </div>
            </div>
          </div>

          <div class="border-t border-red-100 px-4 py-4">
            <div class="mx-auto grid w-full max-w-md gap-3">
              <a href="tel:9866634443" class="block rounded-2xl bg-slate-900 px-4 py-4 text-center text-sm font-bold text-white transition hover:bg-black">Call 9866634443</a>
              <a href="https://wa.me/919502504742" target="_blank" rel="noopener noreferrer" class="block rounded-2xl border border-red-200 px-4 py-4 text-center text-sm font-bold text-red-700 transition hover:bg-red-50">WhatsApp Chat</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  `;

  const menuButton = document.getElementById("menuButton");
  const menuIcon = document.getElementById("menuIcon");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileBackdrop = document.getElementById("mobileBackdrop");
  const mobileCloseButton = document.getElementById("mobileCloseButton");

  if (!menuButton || !menuIcon || !mobileMenu || !mobileBackdrop || !mobileCloseButton) {
    return;
  }

  const setMenuState = (isOpen) => {
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuIcon.classList.toggle("fa-bars", !isOpen);
    menuIcon.classList.toggle("fa-xmark", isOpen);
    document.body.classList.toggle("overflow-hidden", isOpen);

    mobileBackdrop.classList.toggle("opacity-0", !isOpen);
    mobileBackdrop.classList.toggle("pointer-events-none", !isOpen);
    mobileBackdrop.classList.toggle("opacity-100", isOpen);
    mobileBackdrop.classList.toggle("pointer-events-auto", isOpen);

    mobileMenu.classList.toggle("opacity-0", !isOpen);
    mobileMenu.classList.toggle("pointer-events-none", !isOpen);
    mobileMenu.classList.toggle("opacity-100", isOpen);
    mobileMenu.classList.toggle("pointer-events-auto", isOpen);
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });

  mobileCloseButton.addEventListener("click", () => {
    setMenuState(false);
  });

  mobileBackdrop.addEventListener("click", () => {
    setMenuState(false);
  });

  mobileMenu.querySelectorAll("[data-mobile-link='true']").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuState(false);
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      setMenuState(false);
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuState(false);
    }
  });
})();
