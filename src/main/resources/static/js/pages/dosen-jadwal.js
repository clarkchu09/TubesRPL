// =====================================================================
// HALAMAN DOSEN: Matriks Ketersediaan Waktu + Buat Jadwal
// Pemilik: Clark
// Route: /dosen/matriks  dan  /dosen/penjadwalan
// =====================================================================
import { matrixDays, matrixTimes, matrixSlots } from "../data/dosen-jadwal.js";
import { ctx, esc, option, isEn, lecturerHeader } from "./shared.js";

export function availabilityMatrixPage() {
  const L = ctx.local;
  L.group ??= "Kelompok 01 (Jonathan, Kevin, Siti)";
  const labels = { free: "", student: "Kuliah Mhs Bentrok", exam: "Jadwal Ujian Bentrok", teach: "Mengajar Dosen", guard: "Dosen Mengawas" };
  const groups = ["Kelompok 01 (Jonathan, Kevin, Siti)", "Kelompok 02 (Roy, Thomas)", "Kelompok 03 (Bobi, Bibii)"];
  return `
  <main class="dashboard-page lecturer-feature-page">
    ${lecturerHeader("matrix", "matrix")}
    <section class="matrix-content">
      <div class="matrix-intro">
        <div>
          <h1><img alt="" src="/assets/features/matrix/bfdbb.svg">Matriks Pemetaan Ketersediaan Waktu (Heatmap Slot Availability)</h1>
          <p>Analisis instan komputasi irisan slot waktu luang<br>antara anggota kelompok terpilih dan dosen pengampu.</p>
        </div>
        <label>
          <span>Analisis Kelompok:</span>
          <select data-change="matrix-group" data-key="matrix-group">
            ${groups.map((g) => option(g, g, g === L.group)).join("")}
          </select>
        </label>
      </div>
      <div class="matrix-legend">
        <strong>Legenda Matriks:</strong>
        <span class="legend-student">Kuliah Mahasiswa Bentrok</span>
        <span class="legend-exam">Jadwal Ujian / Dosen Mengawas</span>
        <span class="legend-teach">Jadwal Mengajar Dosen</span>
      </div>
      <div class="matrix-scroll">
        <div class="availability-matrix">
          <div class="matrix-corner">Waktu (WIB)</div>
          ${matrixDays.map((day, i) => `
            <div class="${i === 3 ? "matrix-day matrix-day--focus" : "matrix-day"}">
              <strong>${day}</strong><small>${16 + i} Des</small>
            </div>`).join("")}
          ${matrixTimes.map((time, row) => `
            <div class="matrix-row">
              <div class="matrix-time">${time}</div>
              ${matrixSlots[row].map((type) => `<div class="matrix-cell matrix-cell--${type}">${labels[type]}</div>`).join("")}
            </div>`).join("")}
        </div>
      </div>
    </section>
  </main>`;
}

// Ringkasan jadwal dipisah supaya bisa diperbarui tanpa merender ulang form
// (agar kursor/fokus pada input waktu tidak hilang saat mengetik).
export function scheduleSummaryHtml() {
  const L = ctx.local;
  const locale = isEn() ? "en-US" : "id-ID";
  const d = new Date(`${L.date}T00:00:00`);
  const minutes =
    Number(L.end.slice(0, 2)) * 60 + Number(L.end.slice(3, 5)) -
    (Number(L.start.slice(0, 2)) * 60 + Number(L.start.slice(3, 5)));
  const valid = !Number.isNaN(d.getTime());
  const month = valid ? d.toLocaleDateString(locale, { month: "short" }).replace(".", "").toUpperCase() : "";
  const longDate = valid ? d.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "short" }) : "";
  const [groupNo, groupMembersText] = L.group.split(" - ");
  return `
    <h2>Ringkasan jadwal</h2>
    <div class="summary-time">
      <div><small>${month}</small><strong>${valid ? d.getDate() : ""}</strong></div>
      <span>${longDate}<strong>${L.start.replace(":", ".")}–${L.end.replace(":", ".")} WIB</strong></span>
    </div>
    <dl>
      <dt>Kelompok</dt><dd>Kelompok ${groupNo.padStart(2, "0")}</dd>
      <dt>Anggota</dt><dd>${esc(groupMembersText)}</dd>
      <dt>Mata Kuliah</dt><dd>${esc(L.course)}</dd>
      <dt>Durasi presentasi</dt><dd>${Math.max(minutes || 0, 0)} Menit</dd>
      <dt>Ruangan</dt><dd>${esc(L.room)}</dd>
    </dl>
    <p><img alt="" src="/assets/features/create_schedule/d4b94.svg">Dipilih dari matriks ketersediaan waktu.</p>`;
}

export function createSchedulePage() {
  const L = ctx.local;
  L.date ??= "2026-12-19";
  L.start ??= "13:30";
  L.end ??= "14:00";
  L.course ??= "Rekayasa Perangkat Lunak";
  L.group ??= "1 - Jonathan, Kevin, Siti";
  L.room ??= "AG2U.06.05-06";
  return `
  <main class="dashboard-page lecturer-feature-page">
    ${lecturerHeader("schedule", "create_schedule")}
    <section class="create-schedule-content">
      <h1>Buat Jadwal</h1>
      <div class="schedule-builder">
        <div class="schedule-form">
          <label class="schedule-field">
            <span>Tanggal</span>
            <div>
              <input aria-label="Tanggal presentasi" data-action="show-picker" data-field="date" type="date" value="${L.date}">
              <img alt="" src="/assets/features/create_schedule/af45a.svg">
            </div>
          </label>
          <div class="time-fields">
            <label>
              <span>Waktu Mulai</span>
              <div><img alt="" src="/assets/features/create_schedule/0e851.svg"><input data-field="start" type="time" value="${L.start}"></div>
            </label>
            <label>
              <span>Waktu Selesai</span>
              <div><img alt="" src="/assets/features/create_schedule/0e851.svg"><input data-field="end" type="time" value="${L.end}"></div>
            </label>
          </div>
          <label class="schedule-field">
            <span>Mata Kuliah Tugas Besar</span>
            <select data-field="course">
              ${["Rekayasa Perangkat Lunak", "Manajemen Proyek"].map((c) => option(c, c, c === L.course)).join("")}
            </select>
          </label>
          <label class="schedule-field">
            <span>Kelompok</span>
            <select data-field="group">
              ${["1 - Jonathan, Kevin, Siti", "2 - Roy, Thomas", "3 - Bobi, Bibii"].map((g) => option(g, g, g === L.group)).join("")}
            </select>
          </label>
          <label class="schedule-field">
            <span>Ruangan</span>
            <select data-field="room">
              ${["AG2U.06.05-06", "R. Kuliah 09.00.0035 SB Gd.9", "Laboratorium Informatika"].map((r) => option(r, r, r === L.room)).join("")}
            </select>
          </label>
        </div>
        <aside class="schedule-summary" data-summary>${scheduleSummaryHtml()}</aside>
      </div>
      <button class="create-schedule-button" data-action="create-schedule" type="button">
        Buat Jadwal<img alt="" src="/assets/features/create_schedule/3f7ee.svg">
      </button>
    </section>
  </main>`;
}

// Daftar route milik file ini (didaftarkan ke tabel routes di pages.js / app.js)
export const routes = {
  "/dosen/matriks": availabilityMatrixPage,
  "/dosen/penjadwalan": createSchedulePage,
};
