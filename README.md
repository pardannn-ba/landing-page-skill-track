# SkillTrack — Official Website (Tahap 01–03: Navbar, Hero, Features, About)

Website resmi SkillTrack, dibangun bertahap. Sejauh ini selesai: **Navbar**, **Hero Section**, **Features Section**, dan **About Section** dengan pendekatan **Mobile-First Responsive Design**.

## Struktur Folder

```
skilltrack-website/
├── index.html            → Halaman utama (Navbar + Hero)
├── assets/
│   ├── images/
│   │   └── logo.svg      → Logo SkillTrack (juga dipakai sebagai favicon)
│   └── icons/            → Rencananya untuk ikon tambahan tahap berikutnya
├── src/
│   ├── input.css         → Custom CSS (animasi fade-in, glow tombol, scroll indicator)
│   └── script.js         → Vanilla JS (hamburger menu & aksesibilitas)
└── README.md
```

## Teknologi

- **HTML5** — struktur halaman (`index.html`)
- **Tailwind CSS** — utilitarian styling (Play CDN), konfigurasi tema (warna, font) inline di `index.html`
- **Custom CSS** — `src/input.css` (termasuk modifier khusus Features: `.feat-fade`, `.feat-card`, `.feat-icon-box`; dan About: `.abt-card-main`, `.abt-card-float`, `.abt-orbit`)
- **Vanilla JavaScript** — `src/script.js` (hamburger menu + fade-on-scroll section via IntersectionObserver — dipakai Features dan About)
- **Ikon** — SVG inline (gaya Lucide), tanpa dependensi eksternal

Tidak menggunakan React, Vue, atau framework frontend lain.

## Menjalankan Website Secara Lokal

Cara termudah — buka langsung:

1. Buka file `index.html` di browser, **atau**

Agar lebih rapi (URL bersih, tersedia bagi yang pakai server lokal):

```bash
# dari folder skilltrack-website, pilih salah satu:
npx serve .          # Node
python -m http.server 8080  # Python
```

Lalu kunjungi `http://localhost:8080` (atau port yang ditampilkan terminal).

> Menpackage Tailwind Play CDN cukup untuk tahap ini. Jika nanti proyek di-build lebih serius, migrasi ke **Tailwind CLI** (`npx tailwindcss`) dengan `src/input.css` sebagai file entry agar CSS di-bundling (tidak ada CDN di produksi).

## Warna Identitas (dari aplikasi mobile)

| Token    | Hex                                                  | Penggunaan             |
| -------- | ---------------------------------------------------- | ---------------------- |
| `navy`   | `#071627`                                            | Background halaman     |
| `primary`| `#2955F5`                                            | Electric blue aksen    |
| `card`   | `#152A40`                                            | Background kartu       |
| `ink`    | `#E7EFFB`                                            | Teks utama             |
| `muted`  | `#8FA4BD`                                            | Teks sekunder          |

## Responsif

- **< 768px** → Hamburger menu, layout vertikal, headline pakai `clamp()` sehingga tidak terpotong.
- **≥ 768px (tablet & desktop)** → Navbar horizontal, hero centered besar seperti gambar referensi.
- Tidak diperlukan `overflow-x` karena semua section menjamin lebar konten pas viewport.

## Interaksi

- **Hamburger menu** — klik ikon hamburger: membuka/menutup panel menu dengan animasi; ikon otomatis berganti hamburger ↔ close; otomatis menutup saat link diklik, viewport membesar ke desktop, atau tombol `Escape` ditekan.
- **Tombol & menu** — semua punya efek hover halus serta `focus-visible` ring untuk navigasi keyboard.
- **Scroll indicator** — chevron kecil di bawah hero, mengarah ke `#next-section` (placeholder; section tersebut dibuat di tahap berikutnya).
- **Penghormatan `prefers-reduced-motion`** — animasi fade dan bounce dimatikan jika diatur demikian di sistem pengguna.

## Catatan (Placeholder)

- Tombol **Download for Android** masih menunjuk ke anchor `#download` (placeholder). Ketika APK sudah tersedia, ubah `href` di `index.html`, misalnya:

  ```html
  <a id="download" href="assets/apk/skilltrack-v1.0.apk" download>
  ```

- Section **FAQ / Download** sengaja belum dibuat (menu & anchor sudah disiapkan: Features dan About telah tersedia di `#features` dan `#about`).

## Pengembangan Selanjutnya (Tahap 04+)

1. Section FAQ dan Download.
2. Migrasi Tailwind Play CDN → Tailwind CLI untuk build produksi.
3. Optimasi aset gambar & ikon.
