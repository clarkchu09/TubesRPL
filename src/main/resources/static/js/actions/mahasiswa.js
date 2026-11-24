// =====================================================================
// AKSI KLIK / CHANGE: modul Mahasiswa
// Pemilik: Jamie
// Digabung ke objek `actions` dan `changeHandlers` di app.js
// =====================================================================
import { state } from "../data.js";
import { taskOptions } from "../data/mahasiswa.js";
import { ctx } from "../pages/shared.js";

export const clickActions = {
  "save-courses"() {
    state.selectedCourses = new Set(ctx.local.draft);
    ctx.navigate("/dashboard/mahasiswa");
  },
  "join-group"(el) {
    const L = ctx.local;
    const n = Number(el.dataset.n);
    const joined = state.joinedGroups[L.task] ?? null;
    if (joined === n) {
      ctx.navigate(`/tugas-besar/edit?task=${taskOptions.indexOf(L.task)}&group=${n}`);
    } else if (joined === null) {
      state.joinedGroups = { ...state.joinedGroups, [L.task]: n };
      ctx.rerender();
    }
  },
  "remove-edit-member"(el) {
    ctx.local.draftMembers.splice(Number(el.dataset.index), 1);
    ctx.rerender();
  },
  "save-edit"() {
    state.members = [...ctx.local.draftMembers];
    ctx.navigate("/dashboard/mahasiswa");
  },
};

export const changeHandlers = {
  semester(el) {
    ctx.local.semester = el.value;
    ctx.rerender();
  },
  "course-check"(el) {
    const { draft } = ctx.local;
    const key = el.dataset.course;
    draft.has(key) ? draft.delete(key) : draft.add(key);
  },
  task(el) {
    ctx.local.task = el.value;
    ctx.rerender();
  },
  "edit-add"(el) {
    const L = ctx.local;
    if (el.value && !L.draftMembers.includes(el.value)) L.draftMembers.push(el.value);
    ctx.rerender();
  },
};
