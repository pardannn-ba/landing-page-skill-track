/* ============================================
   SkillTrack — Interaksi JavaScript Vanilla
   - Toggle hamburger menu (mobile)
   - Tutup menu saat link diklik / resize ke desktop
   ============================================ */

(function () {
  "use strict";

  const toggleBtn = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const iconOpen = document.getElementById("icon-open");
  const iconClose = document.getElementById("icon-close");

  if (!toggleBtn || !mobileMenu || !iconOpen || !iconClose) return;

  let isOpen = false;

  function setMenu(open) {
    isOpen = open;

    // Animasi tinggi menu: max-h-0 <-> max-h-96
    if (open) {
      mobileMenu.classList.remove("invisible", "max-h-0");
      mobileMenu.classList.add("max-h-96");
    } else {
      mobileMenu.classList.add("invisible", "max-h-0");
      mobileMenu.classList.remove("max-h-96");
    }

    // Ganti ikon hamburger <-> close
    iconOpen.classList.toggle("hidden", open);
    iconClose.classList.toggle("hidden", !open);

    // Aksesibilitas
    toggleBtn.setAttribute("aria-expanded", String(open));
    toggleBtn.setAttribute("aria-label", open ? "Tutup menu navigasi" : "Buka menu navigasi");
  }

  toggleBtn.addEventListener("click", function () {
    setMenu(!isOpen);
  });

  // Tutup menu ketika salah satu link di dalam menu diklik
  mobileMenu.querySelectorAll(".mobile-link").forEach(function (link) {
    link.addEventListener("click", function () {
      setMenu(false);
    });
  });

  // Tutup menu jika viewport diperbesar ke breakpoint desktop
  window.addEventListener("resize", function () {
    if (isOpen && window.innerWidth >= 768) {
      setMenu(false);
    }
  });

  // Tutup menu dengan tombol Escape
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && isOpen) {
      setMenu(false);
      toggleBtn.focus();
    }
  });
})();

/* ============================================
   Features Section — fade-in saat section mulai terlihat
   (IntersectionObserver; fallback: elemen langsung tampil)
   ============================================ */
(function () {
  "use strict";

  // Tandai bahwa JS aktif (dipakai CSS sebagai fallback no-JS)
  document.documentElement.classList.add("js");

  var featEls = Array.prototype.slice.call(document.querySelectorAll(".feat-fade"));
  if (!featEls.length) return;

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Tampilkan langsung jika browser tidak mendukung IntersectionObserver
  // atau pengguna mengurangi animasi
  if (!("IntersectionObserver" in window) || reduceMotion) {
    featEls.forEach(function (el) {
      el.classList.add("feat-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("feat-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  featEls.forEach(function (el) {
    observer.observe(el);
  });
})();
