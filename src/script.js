/* ============================================
   SkillTrack — Interaksi JavaScript Vanilla
   - Konfigurasi link sosial media (Footer)
   - Toggle hamburger menu (mobile)
   - Tutup menu saat link diklik / resize ke desktop
   ============================================ */

/* ============================================
   KONFIGURASI SOSIAL MEDIA — cukup edit di sini
   Dipakai oleh ikon Instagram & WhatsApp di Footer.
   Ganti username / nomor WhatsApp / pesan otomatis
   di objek di bawah, tidak perlu menyentuh HTML.
   ============================================ */
const SOCIAL_LINKS = {
  instagram: "https://instagram.com/username_dummy",
  whatsapp: "6281234567890",
  whatsappMessage:
    "Halo, saya ingin bertanya mengenai aplikasi SkillTrack.\n\nBoleh minta informasi lebih lanjut mengenai fitur dan cara menggunakan aplikasi SkillTrack? Terima kasih!",
};

/* Pasang link sosial media ke ikon Footer */
(function () {
  "use strict";

  const instagramLink = document.getElementById("social-instagram");
  const whatsappLink = document.getElementById("social-whatsapp");

  if (instagramLink) {
    instagramLink.href = SOCIAL_LINKS.instagram;
  }

  if (whatsappLink) {
    // encodeURIComponent agar spasi, baris baru, dan karakter khusus aman di URL
    const whatsappURL = `https://wa.me/${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent(
      SOCIAL_LINKS.whatsappMessage
    )}`;
    whatsappLink.href = whatsappURL;
  }
})();

/* ============================================
   Navbar — hamburger menu mobile
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

    // Animasi tinggi menu: max-h-0 <-> max-h-[28rem]
    // (dinaikkan dari 24rem agar 7 menu + tombol Download tidak terpotong)
    if (open) {
      mobileMenu.classList.remove("invisible", "max-h-0");
      mobileMenu.classList.add("max-h-[28rem]");
    } else {
      mobileMenu.classList.add("invisible", "max-h-0");
      mobileMenu.classList.remove("max-h-[28rem]");
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

/* ============================================
   FAQ Section — accordion
   - Hanya satu pertanyaan yang terbuka pada satu waktu
   - Default: pertanyaan pertama terbuka (class .open di HTML)
   - Animasi buka/tutup via CSS (grid-template-rows)
   ============================================ */
(function () {
  "use strict";

  var faqItems = Array.prototype.slice.call(document.querySelectorAll(".faq-item"));
  if (!faqItems.length) return;

  function setOpen(item, open) {
    item.classList.toggle("open", open);
    var trigger = item.querySelector(".faq-trigger");
    if (trigger) trigger.setAttribute("aria-expanded", String(open));
  }

  faqItems.forEach(function (item) {
    var trigger = item.querySelector(".faq-trigger");
    if (!trigger) return;

    trigger.addEventListener("click", function () {
      var wasOpen = item.classList.contains("open");

      // Tutup semua item agar hanya satu yang terbuka
      faqItems.forEach(function (other) {
        setOpen(other, false);
      });

      // Buka item yang diklik (klik pada item terbuka menutupnya)
      if (!wasOpen) {
        setOpen(item, true);
      }
    });
  });
})();
