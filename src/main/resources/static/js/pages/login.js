// =====================================================================
// HALAMAN LOGIN (pilih peran Mahasiswa / Dosen / Admin lalu isi email + password)
// Pemilik: Bryan
// Dulu bagian dari pages.js; sekarang dipisah jadi file sendiri.
// =====================================================================
import { roles } from "../data.js";               // daftar peran (data.js)
import { languageToggle } from "./shared.js";      // tombol ganti bahasa (shared.js)

export function roleFromPath(pathname) {
  if (pathname === "/login/mahasiswa") return "student";
  if (pathname === "/login/dosen") return "lecturer";
  return "admin";
}

export function loginPage(pathname) {
  const role = roleFromPath(pathname);
  return `
  <main class="login-page">
    <div class="ambient-glow ambient-glow--top" aria-hidden="true"></div>
    <div class="ambient-glow ambient-glow--bottom" aria-hidden="true"></div>
    ${languageToggle("/assets/dashboard/e1c1f.svg", "language-toggle--login")}
    <section class="login-card" aria-labelledby="login-title">
      <header class="login-header">
        <h1 id="login-title">Login ke Akun Anda</h1>
        <p>Aplikasi Pengaturan Jadwal Presentasi Tugas Besar</p>
      </header>
      <form class="login-form" data-form="login" data-role="${role}">
        <fieldset class="role-picker">
          <legend>Pilih peran Anda</legend>
          <div class="role-options">
            ${roles.map((r) => `
              <button aria-pressed="${role === r.id}" class="role-option${role === r.id ? " role-option--active" : ""}"
                data-nav="${r.path}" type="button">
                <img alt="" class="role-icon ${r.iconClass}" src="${r.icon}"><span>${r.label}</span>
              </button>`).join("")}
          </div>
        </fieldset>
        <div class="credentials">
          <label class="field">
            <span>Email</span>
            <span class="input-shell">
              <img alt="" src="/assets/c6d15.svg">
              <input autocomplete="email" name="email" placeholder="Contoh@email.com" required type="email">
            </span>
          </label>
          <label class="field">
            <span>Password</span>
            <span class="input-shell">
              <img alt="" src="/assets/f5daa.svg">
              <input autocomplete="current-password" name="password" placeholder="Password" required type="password">
            </span>
          </label>
        </div>
        <div class="form-footer">
          <p aria-live="polite" class="form-message"></p>
          <button class="submit-button" type="submit">
            <span>Masuk ke Aplikasi</span>
            <img alt="" src="/assets/77060.svg">
          </button>
        </div>
      </form>
    </section>
  </main>`;
}
