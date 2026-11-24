// =====================================================================
// DATA DUMMY: modul Mahasiswa
// Pemilik: Nanti diganti fetch("/api/...") ke backend.
// =====================================================================

export const schedules = [
  {
    group: "Kelompok 01",
    course: "AIF6767 • Manajemen Proyek",
    title: "Presentasi Tugas Besar Manajemen Proyek Kelas A",
    date: "Kamis, 19 Des 2026",
    time: "13.30 - 14.30 WIB (60 Menit)",
    room: "R. Kuliah 09.00.0035 SB Gd.9",
    lecturer: "Veronica Sri Moertini",
    members: [
      "Bibii Andiani (6182401088)",
      "Roy Dilon (6182401083)",
      "Thomas Wilbert Alfontra(6182401055)",
    ],
  },
  {
    group: "Kelompok 03",
    course: "AIF7777 • Rekayasa Perangkat Lunak",
    title: "Presentasi Tugas Besar Rekayasa Perangkat Lunak Kelas B",
    date: "Selasa, 24 Des 2026",
    time: "10.00 - 11.00 WIB (60 Menit)",
    room: "R. Kuliah 09.00.0034 SB Gd.9",
    lecturer: "Pascal Alfadian Nugroho",
    members: [
      "Bibii Andiani (6182401088)",
      "Roy Dilon (6182401083)",
      "Thomas Wilbert (6182401055)",
    ],
  },
];

export const semesterCourses = {
  1: [
    ["AIF1101", "Dasar Pemrograman", "Rizky Pradana", "Kelas A"],
    ["AIF1101", "Dasar Pemrograman", "Rizky Pradana", "Kelas B"],
  ],
  2: [
    ["AIF2202", "Struktur Data", "Maria Christina", "Kelas A"],
    ["AIF2203", "Basis Data", "Daniel Saputra", "Kelas A"],
  ],
  3: [
    ["AIF3301", "Pemrograman Web", "Yulius Harjono", "Kelas A"],
    ["AIF3302", "Jaringan Komputer", "Bambang Riyanto", "Kelas B"],
  ],
  4: [
    ["AIF4401", "Kecerdasan Buatan", "Nathanael Wirawan", "Kelas A"],
    ["AIF4402", "Interaksi Manusia Komputer", "Clara Wijaya", "Kelas A"],
  ],
  5: [
    ["AIF6767", "Manajemen Proyek", "Veronica Sri Moertini", "Kelas A"],
    ["AIF6767", "Manajemen Proyek", "Veronica Sri Moertini", "Kelas B"],
    ["AIF7777", "Rekayasa Perangkat Lunak", "Pascal Alfadian Nugroho", "Kelas A"],
    ["AIF7777", "Rekayasa Perangkat Lunak", "Pascal Alfadian Nugroho", "Kelas B"],
  ],
};

export const taskOptions = [
  "Presentasi Tugas Besar Manajemen Proyek Kelas A",
  "Presentasi Tugas Besar Rekayasa Perangkat Lunak Kelas B",
];

export const groupMembers = [
  ["Roy Dilon (6182401083)", "Thomas Wilbert Alfontra (6182401055)"],
  ["Clark (6182401077)", "Bryan (6182401044)"],
  ["Ignatius Vilbert (6182401024)", "Mikael Graffias (6182401001)"],
];

export const availableStudents = [
  "Bibii Andiani (6182401088)",
  "Angela Putri (6182401017)",
  "Kevin Jonathan (6182401029)",
  "Nadia Maharani (6182401066)",
];
