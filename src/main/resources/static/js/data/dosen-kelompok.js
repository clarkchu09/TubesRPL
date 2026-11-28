export const lecturerStudents = [
  "Roy Dilon (NPM 6182101083)",
  "Thomas Wilbert Alfontra (NPM 6182101055)",
  "Bobi G (NPM 6182101087)",
  "Bibii M (NPM 6182101056)",
  "Rudi D (NPM 6182101089)",
  "Riri S (NPM 6182101023)",
  "Jonathan (NPM 6182101071)",
  "Kevin (NPM 6182101072)",
];

export const lecturerRows = [1, 2, 3].map((group, index) => ({
  course: "Presentasi Tugas Besar Manajemen Proyek Kelas A",
  room: "R. Kuliah 09.00.0035 SB Gd.9",
  group: `Kelompok 0${group}`,
  date: "Kamis, 19 Des 2026",
  time: `${13 + index}.30 - ${14 + index}.30 WIB (60 Menit)`,
}));
