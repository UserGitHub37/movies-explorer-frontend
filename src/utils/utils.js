export function convertMinsToHrsMins(mins) {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  m = m < 10 ? "0" + m : m;
  return h + "ч" + m + "м";
}

export function checkArrayfulness(array) {
  return Array.isArray(array) && array.length;
}

export function filterMovies(movies, searchText, isShortMovies) {
  if (checkArrayfulness(movies)) {
    return movies.filter(
      (card) => {
        if (searchText === '') {
          return isShortMovies ? card.duration < 40 : true;
        }
        return (card.nameRU.toLowerCase().includes(searchText.toLowerCase()) &&
        (isShortMovies ? card.duration < 40 : true));
      }
    );
  }
  return [];
}
