// =====================================================================
// AKSI KLIK / CHANGE: Matriks + Buat Jadwal (dosen)
// Pemilik: Clark
// Digabung ke objek `actions` dan `changeHandlers` di app.js
// =====================================================================
import { state } from "../data.js";
import { translateVisibleDocument } from "../i18n.js";
import { ctx } from "../pages/shared.js";
import { scheduleSummaryHtml } from "../pages/dosen-jadwal.js";

export const clickActions = {
  "create-schedule"() {
    // TODO: kirim ke backend (POST /api/jadwal) setelah PostgreSQL terpasang
    ctx.navigate("/dashboard/dosen");
  },
  "show-picker"(el) {
    el.showPicker?.();
  },
};

export const changeHandlers = {
  "matrix-group"(el) {
    ctx.local.group = el.value;
    ctx.rerender();
  },
};

// Dipanggil dari listener "change" dan "input" di app.js untuk input [data-field]
export function updateScheduleField(el) {
  ctx.local[el.dataset.field] = el.value;
  const summary = document.getElementById("app").querySelector("[data-summary]");
  summary.innerHTML = scheduleSummaryHtml();
  translateVisibleDocument(state.language, summary);
}
