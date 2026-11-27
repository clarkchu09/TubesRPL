import { ctx } from "../pages/shared.js";

const findGroup = (el) => ctx.local.groups.find((x) => x.id === Number(el.dataset.id));

export const clickActions = {
  "remove-group-member"(el) {
    const g = findGroup(el);
    g.members.splice(Number(el.dataset.index), 1);
    g.saved = false;
    ctx.rerender();
  },
  "save-group"(el) {
    // TODO: kirim ke backend (PUT /api/kelompok/{id}) setelah PostgreSQL terpasang
    findGroup(el).saved = true;
    ctx.rerender();
  },
  "add-group-slot"() {
    const groups = ctx.local.groups;
    groups.push({ id: groups.length + 1, members: [], quota: 4, saved: false });
    ctx.rerender();
  },
  "page-prev"() {
    ctx.local.page = Math.max(1, ctx.local.page - 1);
    ctx.rerender();
  },
  "page-next"() {
    ctx.local.page = ctx.local.page + 1;
    ctx.rerender();
  },
  "page-go"(el) {
    ctx.local.page = Number(el.dataset.page);
    ctx.rerender();
  },
};

export const changeHandlers = {
  "nav-select"(el) {
    ctx.navigate(el.value);
  },
  "manage-course"(el) {
    ctx.local.course = el.value;
    ctx.rerender();
  },
  "group-add"(el) {
    const g = findGroup(el);
    if (el.value && g.members.length < g.quota) {
      g.members.push(el.value);
      g.saved = false;
    }
    ctx.rerender();
  },
  "group-quota"(el) {
    const g = findGroup(el);
    g.quota = Number(el.value);
    g.saved = false;
    ctx.rerender();
  },
};
