// =====================================================================
// AKSI: Ganti bahasa ID/EN (tombol di semua header + halaman login)
// Pemilik: Alfon (bersama i18n.js)
// =====================================================================
import { state } from "../data.js";
import { ctx } from "../pages/shared.js";

export const clickActions = {
  "toggle-lang"() {
    state.language = state.language === "id" ? "en" : "id";
    localStorage.setItem("app-language", state.language);
    ctx.rerender();
  },
};
