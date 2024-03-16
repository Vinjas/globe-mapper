/**
 *  Check if an object is empty
 *
 * @param  obj - The object to check
 * @returns - True if the object is empty, false otherwise
 */
export function isEmpty(obj: object | undefined | Array<any>): boolean {
  if (obj === undefined) {
    return true;
  }

  if (Array.isArray(obj)) {
    return obj.length === 0;
  }

  return Object.keys(obj).length === 0;
}
