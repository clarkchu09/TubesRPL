// =====================================================================
// ENTRY POINT (VERSI AWAL / tahap 1): router sederhana + penanganan event
// Pemilik: Bryan
// Baru halaman LOGIN yang aktif. Halaman lain ditambahkan oleh Jamie, Roy,
// Clark, dan Alfon; penyambungannya dikerjakan di tahap akhir
// (versi lengkap: tahap-akhir/.../js/app.js).
// =====================================================================
import { state } from "./data.js";
import { translateVisibleDocument } from "./i18n.js";
import { ctx } from "./pages/shared.js";
import { loginPage } from "./pages/login.js";
import { clickActions as bahasaClick } from "./actions/bahasa.js";
import { routes as mahasiswaRoutes } from "./pages/mahasiswa.js";
import { routes as dosenJadwalRoutes } from "./pages/dosen-jadwal.js";
import { clickActions as mahasiswaClick, changeHandlers as mahasiswaChange } from "./actions/mahasiswa.js";
import { routes as dosenKelompokRoutes } from "./pages/dosen-kelompok.js";
import { clickActions as dosenKelompokClick, changeHandlers as dosenKelompokChange } from "./actions/dosen-kelompok.js";

import {
  clickActions as dosenJadwalClick,
  changeHandlers as dosenJadwalChange,
  updateScheduleField,
} from "./actions/dosen-jadwal.js";


// Tabel route: alamat URL -> fungsi yang menghasilkan HTML halaman.
// Sementara KOSONG, jadi semua alamat menampilkan halaman login.
// [TAHAP AKHIR] diganti dengan:  import { routes } from "./routes.js";
const routes = { ...mahasiswaRoutes, ...dosenJadwalRoutes, ...dosenKelompokRoutes };

// Kumpulan aksi untuk elemen ber-atribut data-action="..."
// [TAHAP AKHIR] ditambah aksi dari modul Jamie, Roy, Clark, dan Alfon.
const actions = { ...bahasaClick, ...mahasiswaClick, ...dosenJadwalClick, ...dosenKelompokClick };

// Kumpulan handler untuk elemen ber-atribut data-change="..."
// [TAHAP AKHIR] diisi handler dari modul lain.
const changeHandlers = { ...mahasiswaChange, ...dosenJadwalChange, ...dosenKelompokChange };

const app = document.getElementById("app");

// ---------- render ----------
function render() {
  const focusKey = document.activeElement?.dataset?.key;
  const pageFn = routes[window.location.pathname];
  const html = pageFn ? pageFn() : loginPage(window.location.pathname);
  app.innerHTML = `<div class="language-root">${html}</div>`;
  translateVisibleDocument(state.language, app);
  if (focusKey) app.querySelector(`[data-key="${CSS.escape(focusKey)}"]`)?.focus();
}

function navigate(url) {
  window.history.pushState({}, "", url);
  ctx.local = {};
  render();
  window.scrollTo({ top: 0, behavior: "instant" });
}

ctx.rerender = render;
ctx.navigate = navigate;
window.addEventListener("popstate", () => {
  ctx.local = {};
  render();
});

// ---------- aksi klik ----------
document.addEventListener("click", (event) => {
  const nav = event.target.closest("[data-nav]");
  if (nav) {
    navigate(nav.dataset.nav);
    return;
  }
  const el = event.target.closest("[data-action]");
  if (el && el.tagName !== "INPUT" && actions[el.dataset.action]) actions[el.dataset.action](el, event);
});

// ---------- aksi change ----------
document.addEventListener("change", (event) => {
  const el = event.target;
  const handler = changeHandlers[el.dataset?.change];
  if (handler) handler(el);
});

// ---------- input form penjadwalan (elemen ber-atribut data-field) ----------
for (const type of ["input", "change"]) {
  document.addEventListener(type, (event) => {
    const el = event.target;
    if (el.dataset?.field) updateScheduleField(el);
  });
}

// ---------- submit login ----------
document.addEventListener("submit", (event) => {
  const form = event.target;
  if (form.dataset.form !== "login") return;
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  // TODO: autentikasi ke backend (POST /api/login) setelah PostgreSQL terpasang
  const role = form.dataset.role;
  navigate(role === "student" ? "/dashboard/mahasiswa" : role === "lecturer" ? "/dashboard/dosen" : "/admin/data");
});

render();
