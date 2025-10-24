// === FUNGSI UNTUK MEMUAT KOMPONEN DARI FILE HTML ===
async function loadComponent(id, file) {
  const el = document.getElementById(id);
  if (!el) return;

  try {
    const res = await fetch(file);
    const html = await res.text();
    el.innerHTML = html;

    // 🔥 Setelah konten dimasukkan, refresh AOS agar mendeteksi elemen baru
    if (window.AOS) {
      AOS.refreshHard();
    }
  } catch (err) {
    console.error(`Gagal memuat ${file}:`, err);
  }
}

// === MUAT SEMUA KOMPONEN ===
(async () => {
  await Promise.all([
    loadComponent("navbar", "components/navbar.html"),
    loadComponent("hero", "components/hero.html"),
    loadComponent("about", "components/about.html"),
    loadComponent("projects", "components/projects.html"),
    loadComponent("contact", "components/contact.html"),
    loadComponent("footer", "components/footer.html"),
  ]);

  // 🔥 Jalankan AOS setelah semua komponen selesai dimuat
  AOS.init({
    duration: 800,
    once: false,
    easing: "ease-in-out",
  });
})();

// === TOGGLE MENU MOBILE ===
document.addEventListener("click", (e) => {
  const menuBtn = document.getElementById("menu-btn");
  const menu = document.getElementById("mobile-menu");

  if (menuBtn && (e.target === menuBtn || menuBtn.contains(e.target))) {
    menu.classList.toggle("hidden");
  } else if (menu && !menu.contains(e.target) && !menuBtn.contains(e.target)) {
    menu.classList.add("hidden");
  }
});

// === SCROLL EFFECT UNTUK NAVBAR ===
window.addEventListener("scroll", function () {
  const wrapper = document.getElementById("navbar");
  if (!wrapper) return;

  const navbar = wrapper.querySelector("header");
  if (!navbar) return;

  if (window.scrollY > 50) {
    navbar.classList.add("top-0", "left-0", "w-full", "rounded-none", "px-10");
    navbar.classList.remove("-translate-x-1/2", "rounded-full", "left-1/2");
  } else {
    navbar.classList.remove("top-0", "left-0", "w-full", "rounded-none", "px-10");
    navbar.classList.add("-translate-x-1/2", "rounded-full", "left-1/2");
  }
});
