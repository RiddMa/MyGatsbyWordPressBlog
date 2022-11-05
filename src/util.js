export function nullLastCompare(a, b, ascending) {
  // equal items sort equally
  if (a === b) {
    return 0
  }

  // nulls sort after anything else
  if (a === null) {
    return 1
  }
  if (b === null) {
    return -1
  }

  // otherwise, if we're ascending, lower sorts first
  if (ascending) {
    return a < b ? -1 : 1
  } else {
    // if descending, higher sorts first
    return a < b ? 1 : -1
  }
}