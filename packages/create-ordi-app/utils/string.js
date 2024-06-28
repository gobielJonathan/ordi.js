/**
 * @param {string} str
 * @param {string} searchStr
 * @param {string} replacement
 * @returns {string}
 */
export function replaceAll(str, searchStr, replacement) {
  return str.replace(new RegExp(searchStr, 'g'), replacement);
}
