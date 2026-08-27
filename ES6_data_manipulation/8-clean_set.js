export default function cleanSet(set, startString) {
  const arr = [];
  if (typeof startString === 'undefined' || startString === '' || typeof startString !== 'string') {
    return '';
  }
  set.forEach((element) => {
    if (typeof element !== 'undefined') {
      if (element.startsWith(startString)) {
        arr.push(element.split(startString)[1]);
      }
    }
  });
  return arr.join('-');
}
