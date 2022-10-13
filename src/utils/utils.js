export function convertMinsToHrsMins (mins) {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  m = m < 10 ? '0' + m : m;
  return h + 'ч' + m + 'м';
}
