import { lecturerRows, lecturerStudents } from "../data/dosen-kelompok.js";
import { ctx, esc, option, pad2, isEn, lecturerHeader } from "./shared.js";

export function lecturerDashboard() {
  const L = ctx.local;
  L.page ??= 1;
  const pageSize = 3;
  const totalPages = Math.max(1, Math.ceil(lecturerRows.length / pageSize));
  const rows = lecturerRows.slice((L.page - 1) * pageSize, L.page * pageSize);
  const first = lecturerRows.length === 0 ? 0 : (L.page - 1) * pageSize + 1;
  const last = Math.min(L.page * pageSize, lecturerRows.length);
  return `
  <main class="dashboard-page lecturer-page">
    ${lecturerHeader("dashboard")}
    <div class="lecturer-content">
      <section class="profile-banner">
        <div class="profile-glow" aria-hidden="true"></div>
        <div class="avatar lecturer-avatar">BA</div>
        <div class="profile-copy lecturer-profile">
          <h1>Veronica Sri Moertini</h1>
          <p>Program Studi Sarjana Informatika (2024)</p>
          <p>Universitas Katolik Parahyangan</p>
        </div>
      </section>
      <h2 class="lecturer-section-title">Jadwal Presentasi</h2>
      <div class="lecturer-table">
        <div class="lecturer-table-head">
          <span>Mata kuliah</span><span>Ruangan</span><span>Kelompok</span><span>Waktu &amp; Durasi</span>
        </div>
        ${rows.map((r) => `
          <div class="lecturer-row">
            <span>${esc(r.course)}</span><span>${esc(r.room)}</span><span>${esc(r.group)}</span>
            <span><strong>${esc(r.date)}</strong><small>${esc(r.time)}</small></span>
          </div>`).join("")}
        <div class="lecturer-table-fill"></div>
      </div>
      <div class="pagination-footer">
        <p class="pagination-summary">Menampilkan <strong>${first} - ${last}</strong> dari ${lecturerRows.length} Data</p>
        <div class="pagination" aria-label="Pagination">
          ${totalPages > 1 ? `<button aria-label="Halaman sebelumnya" ${L.page === 1 ? "disabled" : ""} data-action="page-prev" type="button"><img alt="" src="/assets/features/lecturer_dashboard/4ef17.svg"></button>` : ""}
          ${Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => `
            <button ${p === L.page ? 'aria-current="page"' : ""} class="${p === L.page ? "pagination-active" : ""}"
              data-action="page-go" data-page="${p}" type="button">${p}</button>`).join("")}
          ${totalPages > 1 ? `<button aria-label="Halaman berikutnya" ${L.page === totalPages ? "disabled" : ""} data-action="page-next" type="button"><img alt="" src="/assets/features/lecturer_dashboard/1c753.svg"></button>` : ""}
        </div>
      </div>
    </div>
  </main>`;
}

export function manageGroupsPage() {
  const L = ctx.local;
  L.course ??= "Manajemen Proyek";
  L.groups ??= [
    { id: 1, members: lecturerStudents.slice(0, 2), quota: 4 },
    { id: 2, members: lecturerStudents.slice(2, 4), quota: 4 },
    { id: 3, members: lecturerStudents.slice(4, 6), quota: 4 },
  ];
  const en = isEn();
  return `
  <main class="dashboard-page lecturer-feature-page">
    ${lecturerHeader("groups", "manage_groups")}
    <section class="manage-content">
      <div class="manage-topline">
        <h1>Kelola Kelompok</h1>
        <label class="filter-card manage-course-filter">
          <span>Nama Mata kuliah</span>
          <select data-change="manage-course" data-key="manage-course">
            ${["Manajemen Proyek", "Rekayasa Perangkat Lunak"].map((c) => option(c, c, c === L.course)).join("")}
          </select>
        </label>
      </div>
      <div class="manage-table-head">
        <span>Kelompok</span><span>Daftar Mahasiswa (Terdaftar)</span><span>Kuota Anggota</span><span></span>
      </div>
      <div class="managed-groups">
        ${L.groups.map((g) => `
        <article class="managed-group">
          <div class="managed-group-name">
            <strong><i></i>Kelompok ${pad2(g.id)}</strong>
            <span>${g.members.length} / ${g.quota} ${en ? "Members Filled" : "Anggota Terisi"}</span>
          </div>
          <div class="managed-members">
            ${g.members.map((m, i) => `
              <div>
                <img alt="" src="/assets/features/manage_groups/c7d85.svg">
                <span>${esc(m)}</span>
                <button aria-label="Hapus ${esc(m)}" data-action="remove-group-member" data-id="${g.id}" data-index="${i}" type="button">
                  <img alt="" src="/assets/features/manage_groups/49b2d.svg">
                </button>
              </div>`).join("")}
            <select aria-label="Tambah anggota Kelompok ${g.id}" data-change="group-add" data-id="${g.id}" data-key="group-add-${g.id}">
              <option value="" selected>+ Cari &amp; Tambah Mahasiswa</option>
              ${lecturerStudents
                .filter((s) => !L.groups.some((cg) => cg.members.includes(s)))
                .map((s) => option(s, s)).join("")}
            </select>
          </div>
          <label class="quota-control">
            <select aria-label="Kuota Kelompok ${g.id}" data-change="group-quota" data-id="${g.id}" data-key="group-quota-${g.id}">
              ${[2, 3, 4, 5, 6].map((q) => option(q, `${q} ${en ? "People" : "Orang"}`, q === g.quota)).join("")}
            </select>
          </label>
          <button class="managed-save" data-action="save-group" data-id="${g.id}" type="button">${g.saved ? "Tersimpan" : "Simpan"}</button>
        </article>`).join("")}
      </div>
      <button class="add-group-slot" data-action="add-group-slot" type="button">
        <img alt="" src="/assets/features/manage_groups/eee2d.svg">Buat Slot Kelompok
      </button>
    </section>
  </main>`;
}

// Daftar route milik file ini (didaftarkan ke tabel routes)
export const routes = {
  "/dashboard/dosen": lecturerDashboard,
  "/dosen/kelola-kelompok": manageGroupsPage,
};
