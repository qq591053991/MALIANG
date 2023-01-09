export function binarySearchRemain<T extends Record<string, number>>(
  target: number,
  arr: Array<T>,
  attribute: keyof T,
  indent: number,
): null | [T, number] {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = parseInt(start + (end - start) / 2 + '');
    if (
      target === arr[mid][attribute] ||
      Math.abs(target - arr[mid][attribute]) < indent
    ) {
      return [arr[mid], Math.abs(target - arr[mid][attribute])];
    } else if (target > arr[mid][attribute]) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return null;
}

export function angleToRadian(angle: number) {
  return (angle * Math.PI) / 180;
}
