export default function appendToEachArrayValue(array, appendString) {
  const arr = [];
  for (let idx of array) {
    idx = appendString + idx;
    arr.push(idx);
  }

  return arr;
}
