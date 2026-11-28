// =====================================================================
// DATA DUMMY: Matriks Ketersediaan Waktu (dosen)
// Pemilik: Clark. Nanti diganti fetch("/api/matriks") ke backend.
// =====================================================================

export const matrixDays = ["Senin", "Selasa", "Rabu", "Kamis (Fokus)", "Jumat"];

export const matrixTimes = [
  "08.00 - 09.00",
  "09.00 - 10.00",
  "10.00 - 11.00",
  "11.00 - 12.00",
  "12.00 - 13.00",
  "13.00 - 14.00",
  "14.00 - 15.00",
  "15.00 - 16.00",
  "17.00 - 18.00",
];

export const matrixSlots = [
  ["free", "student", "student", "free", "free"],
  ["free", "free", "student", "exam", "free"],
  ["free", "free", "student", "exam", "free"],
  ["student", "student", "free", "free", "student"],
  ["free", "free", "student", "free", "exam"],
  ["teach", "free", "free", "teach", "free"],
  ["teach", "guard", "free", "exam", "free"],
  ["teach", "guard", "free", "exam", "free"],
  ["free", "free", "free", "free", "exam"],
];
