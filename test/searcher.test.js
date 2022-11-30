const searcher = require('htmlviewer_searcher.js')

const CASE = searcher.SEARCH_CASE_SENSITIVE;
const ICASE = searcher.SEARCH_CASE_INSENSITIVE;
const UPCASE = searcher.SEARCH_UPPERCASE_ONLY;
const ACCENT = searcher.SEARCH_ACCENT_SENSITIVE;
const IACCENT = searcher.SEARCH_ACCENT_INSENSITIVE;
const UPACCENT = searcher.SEARCH_ACCENT_ONLY;

const modeToString = function() {
  return [
    (this.options & ICASE) ? 'icase|' : '',
    (this.options & UPCASE) ? 'upperonly|' : '',
    (this.options & IACCENT) ? 'iaccent|' : '',
    (this.options & UPACCENT) ? 'accentonly|' : '',
  ].join('').replace(/\|$/, '');
};
const mode = function(options) {
  return {options: options, toString: modeToString};
}

const nfd = (str) => str.normalize('NFD')

// fuzzy
test.each([
  [mode(CASE | ACCENT), {str:'abcabc', lastIndex: -1}, 'A', -1],
  [mode(CASE | ACCENT), {str:'abcabc', lastIndex: -1}, 'a', 0],
  [mode(CASE | ACCENT), {str:'abcabc', lastIndex: -1}, 'b', 1],
  [mode(CASE | ACCENT), {str:'abcabc', lastIndex: -1}, 'd', -1],
  [mode(CASE | ACCENT), {str:'abcabc', lastIndex: 0}, 'a', 3],
  [mode(CASE | ACCENT), {str:'abcabc', lastIndex: 0}, 'b', 1],
  [mode(CASE | ACCENT), {str:'abcabc', lastIndex: 0}, 'd', -1],
  [mode(CASE | ACCENT), {str:'abcabc', lastIndex: 1}, 'b', 4],
  [mode(CASE | ACCENT), {str:'abcabc', lastIndex: 3}, 'a', -1],

  [mode(ICASE | ACCENT), {upperStr:'ABCABC', lastIndex: -1}, 'A', 0],
  [mode(ICASE | ACCENT), {upperStr:'ABCABC', lastIndex: -1}, 'a', 0],
  [mode(ICASE | ACCENT), {upperStr:'ABCABC', lastIndex: -1}, 'd', -1],
  [mode(ICASE | ACCENT), {upperStr:'ABCABC', lastIndex: 0}, 'A', 3],
  [mode(ICASE | ACCENT), {upperStr:'ABCABC', lastIndex: 0}, 'a', 3],
  [mode(ICASE | ACCENT), {upperStr:'ABCABC', lastIndex: 0}, 'd', -1],
  [mode(ICASE | ACCENT), {upperStr:'é', lastIndex: 0}, 'e', -1],

  [mode(CASE | IACCENT), {unaccentedStr:'aeb', lastIndex: -1}, 'e', 1],
  [mode(CASE | IACCENT), {unaccentedStr:'aeb', lastIndex: -1}, 'é', 1],
  [mode(CASE | IACCENT), {unaccentedStr:'aEb', lastIndex: -1}, 'é', -1],

  [mode(ICASE | IACCENT), {unaccentedUpperStr:'AEB', lastIndex: -1}, 'e', 1],
  [mode(ICASE | IACCENT), {unaccentedUpperStr:'AEB', lastIndex: -1}, 'é', 1],
  [mode(ICASE | IACCENT), {unaccentedUpperStr:'AEB', lastIndex: -1}, 'E', 1],
  [mode(ICASE | IACCENT), {unaccentedUpperStr:'AEB', lastIndex: -1}, 'É', 1],
  [mode(ICASE | IACCENT), {unaccentedUpperStr:'AEB', lastIndex: -1}, 'd', -1],

  [mode(CASE | UPACCENT), {unaccentedStr:'aeb', lastIndex: -1}, 'e', 1],
  [mode(CASE | UPACCENT), {unaccentedStr:'aEb', lastIndex: -1}, 'e', -1],
  [mode(CASE | UPACCENT), {unaccentedStr:'aeb', lastIndex: -1}, 'E', -1],
  [mode(CASE | UPACCENT), {unaccentedStr:'aEb', lastIndex: -1}, 'E', 1],

  [mode(CASE | UPACCENT), {str:'aeb', lastIndex: -1}, 'é', -1],
  [mode(CASE | UPACCENT), {str:'aéb', lastIndex: -1}, 'é', 1],
  [mode(CASE | UPACCENT), {str:'AEB', lastIndex: -1}, 'é', -1],
  [mode(CASE | UPACCENT), {str:'AÉB', lastIndex: -1}, 'é', -1],

  [mode(CASE | UPACCENT), {str:'aeb', lastIndex: -1}, 'É', -1],
  [mode(CASE | UPACCENT), {str:'aéb', lastIndex: -1}, 'É', -1],
  [mode(CASE | UPACCENT), {str:'AEB', lastIndex: -1}, 'É', -1],
  [mode(CASE | UPACCENT), {str:'AÉB', lastIndex: -1}, 'É', 1],

  [mode(UPCASE | ACCENT), {upperStr:'AEB', lastIndex: -1}, 'e', 1],
  [mode(UPCASE | ACCENT), {upperStr:'AÉB', lastIndex: -1}, 'e', -1],
  [mode(UPCASE | ACCENT), {upperStr:'AEB', lastIndex: -1}, 'é', -1],
  [mode(UPCASE | ACCENT), {upperStr:'AÉB', lastIndex: -1}, 'é', 1],

  [mode(UPCASE | ACCENT), {str:'aeb', lastIndex: -1}, 'E', -1],
  [mode(UPCASE | ACCENT), {str:'aéb', lastIndex: -1}, 'E', -1],
  [mode(UPCASE | ACCENT), {str:'AEB', lastIndex: -1}, 'E', 1],
  [mode(UPCASE | ACCENT), {str:'AÉB', lastIndex: -1}, 'E', -1],

  [mode(UPCASE | ACCENT), {str:'aeb', lastIndex: -1}, 'É', -1],
  [mode(UPCASE | ACCENT), {str:'aéb', lastIndex: -1}, 'É', -1],
  [mode(UPCASE | ACCENT), {str:'AEB', lastIndex: -1}, 'É', -1],
  [mode(UPCASE | ACCENT), {str:'AÉB', lastIndex: -1}, 'É', 1],

  [mode(UPCASE | UPACCENT), {unaccentedUpperStr:'AEB', lastIndex: -1}, 'e', 1],

  [mode(UPCASE | UPACCENT), {unaccentedStr:'aeb', lastIndex: -1}, 'E', -1],
  [mode(UPCASE | UPACCENT), {unaccentedStr:'AEB', lastIndex: -1}, 'E', 1],

  [mode(UPCASE | UPACCENT), {upperStr:'AEB', lastIndex: -1}, 'é', -1],
  [mode(UPCASE | UPACCENT), {upperStr:'AÉB', lastIndex: -1}, 'é', 1],

  [mode(UPCASE | UPACCENT), {str:'aeb', lastIndex: -1}, 'É', -1],
  [mode(UPCASE | UPACCENT), {str:'AEB', lastIndex: -1}, 'É', -1],
  [mode(UPCASE | UPACCENT), {str:'aéb', lastIndex: -1}, 'É', -1],
  [mode(UPCASE | UPACCENT), {str:'AÉB', lastIndex: -1}, 'É', 1],

])("fuzzy(mode='%s', %s, c='%s') = %i", (mode, si, c, expectedIndex) => {
  expect(searcher.createFuzzySearcher(mode.options, c)(si)).toBe(expectedIndex);
});


// plainText
test.each([
  [mode(CASE | ACCENT), {str:'abcabc', lastIndex:0, lengthFound:0}, 'A', false, -1, 1],
  [mode(CASE | ACCENT), {str:'abcabc', lastIndex:0, lengthFound:0}, 'a', false, 0, 1],
  [mode(CASE | ACCENT), {str:'abcabc', lastIndex:0, lengthFound:0}, 'b', false, 1, 1],
  [mode(CASE | ACCENT), {str:'abcabc', lastIndex:0, lengthFound:0}, 'ab', false, 0, 2],
  [mode(CASE | ACCENT), {str:'abcabc', lastIndex:0, lengthFound:0}, 'd', false, -1, 1],

  [mode(ICASE | ACCENT), {upperStr:'ABCABC', lastIndex:0, lengthFound:0}, 'A', false, 0, 1],
  [mode(ICASE | ACCENT), {upperStr:'ABCABC', lastIndex:0, lengthFound:0}, 'a', false, 0, 1],
  [mode(ICASE | ACCENT), {upperStr:'ABCABC', lastIndex:0, lengthFound:0}, 'd', false, -1, 1],

  [mode(CASE | IACCENT), {unaccentedStr:'xaeb', lastIndex:0, lengthFound:0}, 'e', false, 2, 1],
  [mode(CASE | IACCENT), {unaccentedStr:'xaeb', lastIndex:0, lengthFound:0}, 'é', false, 2, 1],
  [mode(CASE | IACCENT), {unaccentedStr:'xaEb', lastIndex:0, lengthFound:0}, 'é', false, -1, 1],

  [mode(ICASE | IACCENT), {unaccentedUpperStr:'xAEB', lastIndex:0, lengthFound:0}, 'e', false, 2, 1],
  [mode(ICASE | IACCENT), {unaccentedUpperStr:'xAEB', lastIndex:0, lengthFound:0}, 'é', false, 2, 1],
  [mode(ICASE | IACCENT), {unaccentedUpperStr:'xAEB', lastIndex:0, lengthFound:0}, 'E', false, 2, 1],
  [mode(ICASE | IACCENT), {unaccentedUpperStr:'xAEB', lastIndex:0, lengthFound:0}, 'É', false, 2, 1],
  [mode(ICASE | IACCENT), {unaccentedUpperStr:'xAEB', lastIndex:0, lengthFound:0}, 'd', false, -1, 1],

  [mode(CASE | UPACCENT), {nfdStr:nfd('xaeb'), lastIndex:0, lengthFound:0}, 'e', false, 2, 1],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xaEb'), lastIndex:0, lengthFound:0}, 'e', false, -1, 0],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xaeb'), lastIndex:0, lengthFound:0}, 'E', false, -1, 0],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xaEb'), lastIndex:0, lengthFound:0}, 'E', false, 2, 1],

  [mode(CASE | UPACCENT), {nfdStr:nfd('caeb'), lastIndex:0, lengthFound:0}, 'é', false, -1, 0],
  [mode(CASE | UPACCENT), {nfdStr:nfd('caéb'), lastIndex:0, lengthFound:0}, 'é', false, 2, 2],
  [mode(CASE | UPACCENT), {nfdStr:nfd('caéb'), lastIndex:0, lengthFound:0}, 'éb', false, 2, 3],
  [mode(CASE | UPACCENT), {nfdStr:nfd('cAEB'), lastIndex:0, lengthFound:0}, 'é', false, -1, 0],
  [mode(CASE | UPACCENT), {nfdStr:nfd('cAÉB'), lastIndex:0, lengthFound:0}, 'é', false, -1, 0],

  [mode(CASE | UPACCENT), {nfdStr:nfd('xaeb'), lastIndex:0, lengthFound:0}, 'É', false, -1, 0],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xaéb'), lastIndex:0, lengthFound:0}, 'É', false, -1, 0],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xAEB'), lastIndex:0, lengthFound:0}, 'É', false, -1, 0],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xAÉB'), lastIndex:0, lengthFound:0}, 'É', false, 2, 2],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xAÉB'), lastIndex:0, lengthFound:0}, 'ÉB', false, 2, 3],

  [mode(UPCASE | ACCENT), {str:'xAEB', lastIndex:0, lengthFound:0}, 'e', false, 2, 1],
  [mode(UPCASE | ACCENT), {str:'xAÉB', lastIndex:0, lengthFound:0}, 'e', false, -1, 0],
  [mode(UPCASE | ACCENT), {str:'xAEB', lastIndex:0, lengthFound:0}, 'é', false, -1, 0],
  [mode(UPCASE | ACCENT), {str:'xAÉB', lastIndex:0, lengthFound:0}, 'é', false, 2, 1],

  [mode(UPCASE | ACCENT), {str:'xaeb', lastIndex:0, lengthFound:0}, 'E', false, -1, 0],
  [mode(UPCASE | ACCENT), {str:'xaéb', lastIndex:0, lengthFound:0}, 'E', false, -1, 0],
  [mode(UPCASE | ACCENT), {str:'xAEB', lastIndex:0, lengthFound:0}, 'E', false, 2, 1],
  [mode(UPCASE | ACCENT), {str:'xAÉB', lastIndex:0, lengthFound:0}, 'E', false, -1, 0],

  [mode(UPCASE | ACCENT), {str:'xaeb', lastIndex:0, lengthFound:0}, 'É', false, -1, 0],
  [mode(UPCASE | ACCENT), {str:'xaéb', lastIndex:0, lengthFound:0}, 'É', false, -1, 0],
  [mode(UPCASE | ACCENT), {str:'xAEB', lastIndex:0, lengthFound:0}, 'É', false, -1, 0],
  [mode(UPCASE | ACCENT), {str:'xAÉB', lastIndex:0, lengthFound:0}, 'É', false, 2, 1],

  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xAEB'), lastIndex:0, lengthFound:0}, 'e', false, 2, 1],

  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xaeb'), lastIndex:0, lengthFound:0}, 'E', false, -1, 0],
  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xAEB'), lastIndex:0, lengthFound:0}, 'E', false, 2, 1],

  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xAEB'), lastIndex:0, lengthFound:0}, 'é', false, -1, 0],
  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xAÉB'), lastIndex:0, lengthFound:0}, 'é', false, 2, 2],
  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xAÉB'), lastIndex:0, lengthFound:0}, 'éB', false, 2, 3],

  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xaeb'), lastIndex:0, lengthFound:0}, 'É', false, -1, 0],
  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xAEB'), lastIndex:0, lengthFound:0}, 'É', false, -1, 0],
  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xaéb'), lastIndex:0, lengthFound:0}, 'É', false, -1, 0],
  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xAÉB'), lastIndex:0, lengthFound:0}, 'É', false, 2, 2],
  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xAÉB'), lastIndex:0, lengthFound:0}, 'ÉB', false, 2, 3],

  [mode(CASE | ACCENT), {str:'abcabc', lastIndex:1, lengthFound:2}, 'A', true, -1, 1],
  [mode(CASE | ACCENT), {str:'abcabc', lastIndex:1, lengthFound:2}, 'a', true, 3, 1],
  [mode(CASE | ACCENT), {str:'abcabc', lastIndex:1, lengthFound:2}, 'b', true, 4, 1],
  [mode(CASE | ACCENT), {str:'abcabc', lastIndex:1, lengthFound:2}, 'ab', true, 3, 2],

  [mode(ICASE | ACCENT), {upperStr:'ABCABC', lastIndex:1, lengthFound:2}, 'A', true, 3, 1],
  [mode(ICASE | ACCENT), {upperStr:'ABCABC', lastIndex:1, lengthFound:2}, 'a', true, 3, 1],
  [mode(ICASE | ACCENT), {upperStr:'ABCABC', lastIndex:1, lengthFound:2}, 'd', true, -1, 1],

  [mode(CASE | IACCENT), {unaccentedStr:'abcabc', lastIndex:1, lengthFound:2}, 'a', true, 3, 1],

  [mode(CASE | IACCENT), {unaccentedStr:'xxaeb', lastIndex:1, lengthFound:2}, 'e', true, 3, 1],
  [mode(CASE | IACCENT), {unaccentedStr:'xxaeb', lastIndex:1, lengthFound:2}, 'é', true, 3, 1],
  [mode(CASE | IACCENT), {unaccentedStr:'xxaEb', lastIndex:1, lengthFound:2}, 'é', true, -1, 1],

  [mode(ICASE | IACCENT), {unaccentedUpperStr:'xxAEB', lastIndex:1, lengthFound:2}, 'e', true, 3, 1],
  [mode(ICASE | IACCENT), {unaccentedUpperStr:'xxAEB', lastIndex:1, lengthFound:2}, 'é', true, 3, 1],
  [mode(ICASE | IACCENT), {unaccentedUpperStr:'xxAEB', lastIndex:1, lengthFound:2}, 'E', true, 3, 1],
  [mode(ICASE | IACCENT), {unaccentedUpperStr:'xxAEB', lastIndex:1, lengthFound:2}, 'É', true, 3, 1],
  [mode(ICASE | IACCENT), {unaccentedUpperStr:'xxAEB', lastIndex:1, lengthFound:2}, 'd', true, -1, 1],

  [mode(CASE | UPACCENT), {nfdStr:nfd('abcabc'), lastIndex:1, lengthFound:2}, 'a', true, 3, 1],

  [mode(CASE | UPACCENT), {nfdStr:nfd('xxaeb'), lastIndex:1, lengthFound:2}, 'e', true, 3, 1],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xxaEb'), lastIndex:1, lengthFound:2}, 'e', true, -1, 0],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xxaeb'), lastIndex:1, lengthFound:2}, 'E', true, -1, 0],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xxaEb'), lastIndex:1, lengthFound:2}, 'E', true, 3, 1],

  [mode(CASE | UPACCENT), {nfdStr:nfd('xcaeb'), lastIndex:1, lengthFound:2}, 'é', true, -1, 0],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xcaéb'), lastIndex:1, lengthFound:2}, 'é', true, 3, 2],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xcaéb'), lastIndex:1, lengthFound:2}, 'éb', true, 3, 3],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xcaéb'), lastIndex:1, lengthFound:2}, 'éB', true, -1, 0],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xcAEB'), lastIndex:1, lengthFound:2}, 'é', true, -1, 0],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xcAÉB'), lastIndex:1, lengthFound:2}, 'é', true, -1, 0],

  [mode(CASE | UPACCENT), {nfdStr:nfd('xxaeb'), lastIndex:1, lengthFound:2}, 'É', true, -1, 0],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xxaéb'), lastIndex:1, lengthFound:2}, 'É', true, -1, 0],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xxAEB'), lastIndex:1, lengthFound:2}, 'É', true, -1, 0],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xxAÉB'), lastIndex:1, lengthFound:2}, 'É', true, 3, 2],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xxAÉB'), lastIndex:1, lengthFound:2}, 'ÉB', true, 3, 3],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xxAÉB'), lastIndex:1, lengthFound:2}, 'Éb', true, -1, 0],

  [mode(UPCASE | ACCENT), {str:'abcabc', lastIndex:1, lengthFound:2}, 'a', true, 3, 1],

  [mode(UPCASE | ACCENT), {str:'xxAEB', lastIndex:1, lengthFound:2}, 'e', true, 3, 1],
  [mode(UPCASE | ACCENT), {str:'xxAÉB', lastIndex:1, lengthFound:2}, 'e', true, -1, 0],
  [mode(UPCASE | ACCENT), {str:'xxAEB', lastIndex:1, lengthFound:2}, 'é', true, -1, 0],
  [mode(UPCASE | ACCENT), {str:'xxAÉB', lastIndex:1, lengthFound:2}, 'é', true, 3, 1],

  [mode(UPCASE | ACCENT), {str:'xxaeb', lastIndex:1, lengthFound:2}, 'E', true, -1, 0],
  [mode(UPCASE | ACCENT), {str:'xxaéb', lastIndex:1, lengthFound:2}, 'E', true, -1, 0],
  [mode(UPCASE | ACCENT), {str:'xxAEB', lastIndex:1, lengthFound:2}, 'E', true, 3, 1],
  [mode(UPCASE | ACCENT), {str:'xxAÉB', lastIndex:1, lengthFound:2}, 'E', true, -1, 0],

  [mode(UPCASE | ACCENT), {str:'xxaeb', lastIndex:1, lengthFound:2}, 'É', true, -1, 0],
  [mode(UPCASE | ACCENT), {str:'xxaéb', lastIndex:1, lengthFound:2}, 'É', true, -1, 0],
  [mode(UPCASE | ACCENT), {str:'xxAEB', lastIndex:1, lengthFound:2}, 'É', true, -1, 0],
  [mode(UPCASE | ACCENT), {str:'xxAÉB', lastIndex:1, lengthFound:2}, 'É', true, 3, 1],

  [mode(UPCASE | UPACCENT), {nfdStr:nfd('abcabc'), lastIndex:1, lengthFound:2}, 'a', true, 3, 1],

  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xxAEB'), lastIndex:1, lengthFound:2}, 'e', true, 3, 1],

  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xxaeb'), lastIndex:1, lengthFound:2}, 'E', true, -1, 0],
  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xxAEB'), lastIndex:1, lengthFound:2}, 'E', true, 3, 1],

  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xxAEB'), lastIndex:1, lengthFound:2}, 'é', true, -1, 0],
  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xxAÉB'), lastIndex:1, lengthFound:2}, 'é', true, 3, 2],
  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xxAÉB'), lastIndex:1, lengthFound:2}, 'éb', true, 3, 3],
  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xxAÉB'), lastIndex:1, lengthFound:2}, 'éB', true, 3, 3],

  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xxaeb'), lastIndex:1, lengthFound:2}, 'É', true, -1, 0],
  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xxAEB'), lastIndex:1, lengthFound:2}, 'É', true, -1, 0],
  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xxaéb'), lastIndex:1, lengthFound:2}, 'É', true, -1, 0],
  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xxAÉB'), lastIndex:1, lengthFound:2}, 'É', true, 3, 2],
  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xxAÉB'), lastIndex:1, lengthFound:2}, 'Éb', true, 3, 3],
  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xxAÉB'), lastIndex:1, lengthFound:2}, 'ÉB', true, 3, 3],

])("plainText(mode='%s', %s, s='%s', afterLast=%d) = {index:%i, length:%i}", (mode, si, pattern, afterLastIndex, expectedIndex, expectedLen) => {
  expect(searcher.createTextSearcher(mode.options, pattern, afterLastIndex)(si)).toBe(expectedIndex);
  if (expectedIndex !== -1) {
    expect(si.lengthFound).toBe(expectedLen);
  }
});


// regex
test.each([
  [mode(CASE | ACCENT), {str:'abcabc', lastIndex: -1}, 'A', -1, undefined],
  [mode(CASE | ACCENT), {str:'abcabc', lastIndex: -1}, 'a', 0, 1],
  [mode(CASE | ACCENT), {str:'abcabc', lastIndex: -1}, 'b', 1, 1],
  [mode(CASE | ACCENT), {str:'abcabc', lastIndex: -1}, 'b.?a', 1, 3],
  [mode(CASE | ACCENT), {str:'abcabc', lastIndex: -1}, 'd', -1, undefined],

  [mode(ICASE | ACCENT), {str:'abcabc', lastIndex: -1}, 'Ab', 0, 2],
  [mode(ICASE | ACCENT), {str:'ABCABC', lastIndex: -1}, 'Ab', 0, 2],
  [mode(ICASE | ACCENT), {str:'abcabc', lastIndex: -1}, 'aB', 0, 2],
  [mode(ICASE | ACCENT), {str:'ABCABC', lastIndex: -1}, 'aB', 0, 2],
  [mode(ICASE | ACCENT), {str:'ABCABC', lastIndex: -1}, 'd', -1, undefined],

  [mode(CASE | IACCENT), {unaccentedStr:'aeb', lastIndex: -1}, 'e', 1, 1],
  [mode(CASE | IACCENT), {unaccentedStr:'aeb', lastIndex: -1}, 'é', 1, 1],
  [mode(CASE | IACCENT), {unaccentedStr:'aEb', lastIndex: -1}, 'é', -1, undefined],

  [mode(ICASE | IACCENT), {unaccentedStr:'AEB', lastIndex: -1}, 'e', 1, 1],
  [mode(ICASE | IACCENT), {unaccentedStr:'AEB', lastIndex: -1}, 'é', 1, 1],
  [mode(ICASE | IACCENT), {unaccentedStr:'AEB', lastIndex: -1}, 'E', 1, 1],
  [mode(ICASE | IACCENT), {unaccentedStr:'AEB', lastIndex: -1}, 'É', 1, 1],
  [mode(ICASE | IACCENT), {unaccentedStr:'AEB', lastIndex: -1}, 'd', -1, undefined],

])("regex(mode='%s', %s, s='%s') = {index:%i, length:%i}", (mode, si, str, expectedIndex, expectedLen) => {
  expect(searcher.createRegexSearcher(mode.options, str)(si)).toBe(expectedIndex);
  expect(si.lengthFound).toBe(expectedLen);
});

test('filter()', () => {
  const datas = [
    {str:'ab', lastIndex: -1, lengthFound: 0, fragments:[]},
    {str:'aaaa', lastIndex: -1, lengthFound: 0, fragments:[]},
    {str:'aabbb', lastIndex: -1, lengthFound: 0, fragments:[]},
    {str:'aaaaaaaaaa', lastIndex: -1, lengthFound: 0, fragments:[]},
    {str:'ababab', lastIndex: -1, lengthFound: 0, fragments:[]},
    {str:'aaaaaaab', lastIndex: -1, lengthFound: 0, fragments:[]},
  ];
  const filter = searcher.createFuzzySearcher(CASE | ACCENT, 'b')
  searcher.filter(datas, filter);
  expect(datas).toStrictEqual([
    {str:'ab', lastIndex: 1, lengthFound: 1, fragments:[{index: 1, lengthFound: 1}]},
    {str:'aabbb', lastIndex: 2, lengthFound: 1, fragments:[{index: 2, lengthFound: 1}]},
    {str:'ababab', lastIndex: 1, lengthFound: 1, fragments:[{index: 1, lengthFound: 1}]},
    {str:'aaaaaaab', lastIndex: 7, lengthFound: 1, fragments:[{index: 7, lengthFound: 1}]},
  ]);
});
