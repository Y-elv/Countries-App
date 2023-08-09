export default function pagination(array, numPerPage) {
  const pages = [];
  for (let i = 0; i < array.length; i += numPerPage) {
    const smallArr = array.slice(i, i + numPerPage);
    if (smallArr !== []) pages.push(smallArr);
  }
  return pages;
}
