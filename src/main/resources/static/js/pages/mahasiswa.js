// =====================================================================
// HALAMAN MAHASISWA: Dashboard, Isi Jadwal, Isi Tugas Besar, Edit Kelompok
// Route: /dashboard/mahasiswa, /jadwal/mahasiswa, /tugas-besar/mahasiswa, /tugas-besar/edit
// =====================================================================
import { state } from "../data.js";
import { schedules, semesterCourses, taskOptions, groupMembers, availableStudents } from "../data/mahasiswa.js";
import { ctx, esc, option, pad2, languageToggle, navButton } from "./shared.js";

export function studentHeader(active, assetSet = "dashboard") {
  const prefix = assetSet === "dashboard" ? "/assets/dashboard" : `/assets/features/${assetSet}`;
  return `
  <header class="dashboard-header">
    <button class="brand brand-button" data-nav="/dashboard/mahasiswa" type="button">
      <img alt="" src="${prefix}/7f1dc.svg"><span>APJTPB</span>
    </button>
    <nav aria-label="Navigasi mahasiswa">
      ${languageToggle(`${prefix}/e1c1f.svg`)}
      ${navButton(active === "dashboard", "Dashboard<br>Mahasiswa", "/dashboard/mahasiswa")}
      ${navButton(active === "schedule", "Isi Jadwal<br>Mahasiswa", "/jadwal/mahasiswa")}
      ${navButton(active === "tasks", "Isi<br>Tugas Besar", "/tugas-besar/mahasiswa")}
    </nav>
  </header>`;
}

function metric(icon, label, primary, secondary) {
  return `
  <div class="schedule-metric">
    <img alt="" src="${icon}">
    <div>
      <span>${label}</span>
      <strong>${esc(primary)}</strong>
      ${secondary ? `<small>${esc(secondary)}</small>` : ""}
    </div>
  </div>`;
}

function scheduleCard(s) {
  return `
  <article class="schedule-card">
    <div class="schedule-heading">
      <div class="schedule-meta"><span>${esc(s.group)}</span><small>${esc(s.course)}</small></div>
      <h3>${esc(s.title)}</h3>
    </div>
    <div class="schedule-metrics">
      ${metric("/assets/dashboard/798be.svg", "Waktu &amp; Durasi", s.date, s.time)}
      ${metric("/assets/dashboard/dfad7.svg", "Ruangan", s.room)}
      ${metric("/assets/dashboard/1a291.svg", "Dosen", s.lecturer)}
    </div>
    <div class="members">
      <span>Anggota Tim Pengembang:</span>
      <div>${s.members.map((m) => `<small>${esc(m)}</small>`).join("")}</div>
    </div>
  </article>`;
}

export function studentDashboard() {
  return `
  <main class="dashboard-page">
    ${studentHeader("dashboard")}
    <div class="dashboard-content">
      <section class="profile-banner" aria-label="Profil mahasiswa">
        <div class="profile-glow" aria-hidden="true"></div>
        <div class="avatar">BA</div>
        <div class="profile-copy">
          <h1>Bibii Andiani</h1>
          <p>NPM: <strong>6182101088</strong></p>
          <p>Universitas Katolik Parahyangan</p>
        </div>
      </section>
      <section class="schedule-section" aria-labelledby="schedule-title">
        <h2 id="schedule-title"><img alt="" src="/assets/dashboard/f88ab.svg">Jadwal Presentasi Hari Ini &amp; Mendatang</h2>
        <div class="schedule-list">${schedules.map(scheduleCard).join("")}</div>
      </section>
    </div>
  </main>`;
}

export function courseSchedulePage() {
  const L = ctx.local;
  L.semester ??= "5";
  L.draft ??= new Set(state.selectedCourses);
  return `
  <main class="dashboard-page feature-page">
    ${studentHeader("schedule", "schedule")}
    <section class="feature-content">
      <h1 class="feature-title">Pilih mata kuliah</h1>
      <div class="feature-controls feature-controls--schedule">
        <label class="filter-card">
          <span>Semester</span>
          <select aria-label="Semester" data-change="semester" data-key="semester">
            ${[1, 2, 3, 4, 5].map((v) => option(v, `Semester ${v}`, String(v) === L.semester)).join("")}
          </select>
        </label>
        <button class="feature-primary-button" data-action="save-courses" type="button">Simpan Jadwal</button>
      </div>
      <p class="section-label">Mata kuliah yang dibuka pada semester ini</p>
      <div class="course-table" role="table">
        <div class="course-table-head" role="row">
          <span>Kode &amp; Mata Kuliah</span><span>Dosen Pengampu</span><span>Kelas</span>
          <span class="sr-only">Pilih</span>
        </div>
        ${semesterCourses[L.semester].map(([code, course, lecturer, className]) => {
          const key = `${L.semester}-${code}-${className}`;
          return `
          <label class="course-row" role="row">
            <span><strong>${code}</strong>${esc(course)}</span>
            <span>${esc(lecturer)}</span>
            <span>${className}</span>
            <input ${L.draft.has(key) ? "checked" : ""} data-change="course-check" data-course="${key}" type="checkbox">
          </label>`;
        }).join("")}
      </div>
    </section>
  </main>`;
}

export function taskGroupsPage() {
  const L = ctx.local;
  L.task ??= taskOptions[0];
  const joined = state.joinedGroups[L.task] ?? null;
  return `
  <main class="dashboard-page feature-page">
    ${studentHeader("tasks", "tasks")}
    <section class="feature-content">
      <h1 class="feature-title">Pilih Tugas besar</h1>
      <label class="filter-card task-filter">
        <span>Nama Tugas Besar</span>
        <select aria-label="Nama Tugas Besar" data-change="task" data-key="task">
          ${taskOptions.map((t) => option(t, t, t === L.task)).join("")}
        </select>
      </label>
      <div class="groups-divider"><img alt="" src="/assets/features/tasks/48d39.svg"></div>
      <p class="section-label">Kelompok yang tersedia</p>
      <div class="group-grid">
        ${groupMembers.map((members, index) => {
          const n = index + 1;
          const isJoined = joined === n;
          const isDisabled = joined !== null && !isJoined;
          return `
          <article class="group-card${isDisabled ? " group-card--disabled" : ""}">
            <h2>Kelompok ${pad2(n)}</h2>
            ${members.map((m) => `<span>${esc(m)}</span>`).join("")}
            <button class="group-button${isJoined ? " group-button--edit" : ""}" ${isDisabled ? "disabled" : ""}
              data-action="join-group" data-n="${n}" type="button">${isJoined ? "EDIT" : "JOIN"}</button>
          </article>`;
        }).join("")}
      </div>
    </section>
  </main>`;
}

export function editGroupPage() {
  const L = ctx.local;
  const params = new URLSearchParams(window.location.search);
  const task = taskOptions[Number(params.get("task") ?? 0)] ?? taskOptions[0];
  L.draftMembers ??= [...state.members];
  return `
  <main class="dashboard-page feature-page">
    ${studentHeader("tasks", "edit")}
    <section class="edit-content">
      <article class="edit-summary">
        <small>AIF6767 • Manajemen Proyek</small>
        <h1>${esc(task)}</h1>
      </article>
      <h2 class="edit-title">Edit kelompok</h2>
      <section class="member-editor">
        <h3>Tambah anggota</h3>
        <label>
          <span>Nama</span>
          <select aria-label="Cari dan tambah mahasiswa" data-change="edit-add" data-key="edit-add">
            <option value="" selected>+ Cari &amp; tambah Mahasiswa</option>
            ${availableStudents.filter((s) => !L.draftMembers.includes(s)).map((s) => option(s, s)).join("")}
          </select>
        </label>
        <div class="member-list">
          ${L.draftMembers.map((m, i) => `
            <div class="member-row">
              <img alt="" src="/assets/features/edit/fd43c.svg">
              <span>${esc(m)}</span>
              <button aria-label="Hapus ${esc(m)}" data-action="remove-edit-member" data-index="${i}" type="button">
                <img alt="" src="/assets/features/edit/49b2d.svg">
              </button>
            </div>`).join("")}
        </div>
      </section>
      <button class="save-changes" data-action="save-edit" type="button">Simpan perubahan</button>
    </section>
  </main>`;
}

// Daftar route milik file ini (didaftarkan ke tabel routes)
export const routes = {
  "/dashboard/mahasiswa": studentDashboard,
  "/jadwal/mahasiswa": courseSchedulePage,
  "/tugas-besar/mahasiswa": taskGroupsPage,
  "/tugas-besar/edit": editGroupPage,
};
