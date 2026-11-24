// =====================================================================
// HELPER BERSAMA untuk semua halaman (dipakai Jamie, Roy, Clark, Alfon)
// Pemilik: Bryan. Isi diambil dari pages.js asli (baris 12-41 + lecturerHeader).
// Mengekspor: ctx, esc, pad2, option, isEn, languageToggle, navButton, lecturerHeader
// =====================================================================
import { state } from "../data.js";

export const ctx = {
  local: {}, // di-reset setiap pindah halaman
  rerender() {},
  navigate() {},
  refreshPartial() {},
};

export const esc = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export const pad2 = (n) => String(n).padStart(2, "0");
export const option = (value, label, selected) =>
  `<option value="${esc(value)}"${selected ? " selected" : ""}>${esc(label)}</option>`;

export const isEn = () => state.language === "en";

export function languageToggle(src, className = "") {
  const en = isEn();
  return `<button aria-label="${en ? "Ganti ke Bahasa Indonesia" : "Switch to English"}"
    class="language-toggle ${className}" data-action="toggle-lang"
    title="${en ? "Bahasa Indonesia" : "English"}" type="button">
    <img alt="" class="language-icon" src="${src}"><span>${en ? "ID" : "EN"}</span></button>`;
}

export function navButton(active, label, path, extra = "") {
  return `<button ${active ? 'aria-current="page"' : ""} class="nav-link${active ? " nav-link--active" : ""}"
    data-nav="${path}" type="button">${label}</button>`;
}


export function lecturerHeader(active, assetSet = "lecturer_dashboard") {
  const items = [
    ["dashboard", "Dashboard Dosen", "/dashboard/dosen"],
    ["groups", "Kelola Kelompok", "/dosen/kelola-kelompok"],
    ["matrix", "Matriks Ketersediaan Waktu", "/dosen/matriks"],
    ["schedule", "Penjadwalan Presentasi", "/dosen/penjadwalan"],
  ];
  const prefix = `/assets/features/${assetSet}`;
  const current = items.find(([id]) => id === active)?.[2];
  return `
  <header class="dashboard-header lecturer-header">
    <button class="brand brand-button" data-nav="/dashboard/dosen" type="button">
      <img alt="" src="${prefix}/7f1dc.svg"><span>APJTPB</span>
    </button>
    <nav aria-label="Navigasi dosen">
      ${languageToggle(`${prefix}/e1c1f.svg`)}
      <select aria-label="Navigasi dosen mobile" class="mobile-lecturer-nav" data-change="nav-select">
        ${items.map(([, label, path]) => option(path, label, path === current)).join("")}
      </select>
      ${items.map(([id, label, path]) => navButton(active === id, label, path)).join("")}
    </nav>
  </header>`;
}
