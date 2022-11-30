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
  [mode(CASE | ACCENT), {str:'abcabc', index: -1}, 'A', -1],
  [mode(CASE | ACCENT), {str:'abcabc', index: -1}, 'a', 0],
  [mode(CASE | ACCENT), {str:'abcabc', index: -1}, 'b', 1],
  [mode(CASE | ACCENT), {str:'abcabc', index: -1}, 'd', -1],
  [mode(CASE | ACCENT), {str:'abcabc', index: 0}, 'a', 3],
  [mode(CASE | ACCENT), {str:'abcabc', index: 0}, 'b', 1],
  [mode(CASE | ACCENT), {str:'abcabc', index: 0}, 'd', -1],
  [mode(CASE | ACCENT), {str:'abcabc', index: 1}, 'b', 4],
  [mode(CASE | ACCENT), {str:'abcabc', index: 3}, 'a', -1],

  [mode(ICASE | ACCENT), {upperStr:'ABCABC', index: -1}, 'A', 0],
  [mode(ICASE | ACCENT), {upperStr:'ABCABC', index: -1}, 'a', 0],
  [mode(ICASE | ACCENT), {upperStr:'ABCABC', index: -1}, 'd', -1],
  [mode(ICASE | ACCENT), {upperStr:'ABCABC', index: 0}, 'A', 3],
  [mode(ICASE | ACCENT), {upperStr:'ABCABC', index: 0}, 'a', 3],
  [mode(ICASE | ACCENT), {upperStr:'ABCABC', index: 0}, 'd', -1],
  [mode(ICASE | ACCENT), {upperStr:'é', index: 0}, 'e', -1],

  [mode(CASE | IACCENT), {unaccentedStr:'aeb', index: -1}, 'e', 1],
  [mode(CASE | IACCENT), {unaccentedStr:'aeb', index: -1}, 'é', 1],
  [mode(CASE | IACCENT), {unaccentedStr:'aEb', index: -1}, 'é', -1],

  [mode(ICASE | IACCENT), {unaccentedUpperStr:'AEB', index: -1}, 'e', 1],
  [mode(ICASE | IACCENT), {unaccentedUpperStr:'AEB', index: -1}, 'é', 1],
  [mode(ICASE | IACCENT), {unaccentedUpperStr:'AEB', index: -1}, 'E', 1],
  [mode(ICASE | IACCENT), {unaccentedUpperStr:'AEB', index: -1}, 'É', 1],
  [mode(ICASE | IACCENT), {unaccentedUpperStr:'AEB', index: -1}, 'd', -1],

  [mode(CASE | UPACCENT), {unaccentedStr:'aeb', index: -1}, 'e', 1],
  [mode(CASE | UPACCENT), {unaccentedStr:'aEb', index: -1}, 'e', -1],
  [mode(CASE | UPACCENT), {unaccentedStr:'aeb', index: -1}, 'E', -1],
  [mode(CASE | UPACCENT), {unaccentedStr:'aEb', index: -1}, 'E', 1],

  [mode(CASE | UPACCENT), {str:'aeb', index: -1}, 'é', -1],
  [mode(CASE | UPACCENT), {str:'aéb', index: -1}, 'é', 1],
  [mode(CASE | UPACCENT), {str:'AEB', index: -1}, 'é', -1],
  [mode(CASE | UPACCENT), {str:'AÉB', index: -1}, 'é', -1],

  [mode(CASE | UPACCENT), {str:'aeb', index: -1}, 'É', -1],
  [mode(CASE | UPACCENT), {str:'aéb', index: -1}, 'É', -1],
  [mode(CASE | UPACCENT), {str:'AEB', index: -1}, 'É', -1],
  [mode(CASE | UPACCENT), {str:'AÉB', index: -1}, 'É', 1],

  [mode(UPCASE | ACCENT), {upperStr:'AEB', index: -1}, 'e', 1],
  [mode(UPCASE | ACCENT), {upperStr:'AÉB', index: -1}, 'e', -1],
  [mode(UPCASE | ACCENT), {upperStr:'AEB', index: -1}, 'é', -1],
  [mode(UPCASE | ACCENT), {upperStr:'AÉB', index: -1}, 'é', 1],

  [mode(UPCASE | ACCENT), {str:'aeb', index: -1}, 'E', -1],
  [mode(UPCASE | ACCENT), {str:'aéb', index: -1}, 'E', -1],
  [mode(UPCASE | ACCENT), {str:'AEB', index: -1}, 'E', 1],
  [mode(UPCASE | ACCENT), {str:'AÉB', index: -1}, 'E', -1],

  [mode(UPCASE | ACCENT), {str:'aeb', index: -1}, 'É', -1],
  [mode(UPCASE | ACCENT), {str:'aéb', index: -1}, 'É', -1],
  [mode(UPCASE | ACCENT), {str:'AEB', index: -1}, 'É', -1],
  [mode(UPCASE | ACCENT), {str:'AÉB', index: -1}, 'É', 1],

  [mode(UPCASE | UPACCENT), {unaccentedUpperStr:'AEB', index: -1}, 'e', 1],

  [mode(UPCASE | UPACCENT), {unaccentedStr:'aeb', index: -1}, 'E', -1],
  [mode(UPCASE | UPACCENT), {unaccentedStr:'AEB', index: -1}, 'E', 1],

  [mode(UPCASE | UPACCENT), {upperStr:'AEB', index: -1}, 'é', -1],
  [mode(UPCASE | UPACCENT), {upperStr:'AÉB', index: -1}, 'é', 1],

  [mode(UPCASE | UPACCENT), {str:'aeb', index: -1}, 'É', -1],
  [mode(UPCASE | UPACCENT), {str:'AEB', index: -1}, 'É', -1],
  [mode(UPCASE | UPACCENT), {str:'aéb', index: -1}, 'É', -1],
  [mode(UPCASE | UPACCENT), {str:'AÉB', index: -1}, 'É', 1],

])("fuzzy(mode='%s', %s, c='%s') = %i", (mode, si, c, expectedIndex) => {
  expect(searcher.createFuzzySearcher(mode.options, c)(si)).toBe(expectedIndex);
});


// plainText
test.each([
  [mode(CASE | ACCENT), {str:'abcabc', index:0, length:0}, 'A', false, -1, 1],
  [mode(CASE | ACCENT), {str:'abcabc', index:0, length:0}, 'a', false, 0, 1],
  [mode(CASE | ACCENT), {str:'abcabc', index:0, length:0}, 'b', false, 1, 1],
  [mode(CASE | ACCENT), {str:'abcabc', index:0, length:0}, 'ab', false, 0, 2],
  [mode(CASE | ACCENT), {str:'abcabc', index:0, length:0}, 'd', false, -1, 1],

  [mode(ICASE | ACCENT), {upperStr:'ABCABC', index:0, length:0}, 'A', false, 0, 1],
  [mode(ICASE | ACCENT), {upperStr:'ABCABC', index:0, length:0}, 'a', false, 0, 1],
  [mode(ICASE | ACCENT), {upperStr:'ABCABC', index:0, length:0}, 'd', false, -1, 1],

  [mode(CASE | IACCENT), {unaccentedStr:'xaeb', index:0, length:0}, 'e', false, 2, 1],
  [mode(CASE | IACCENT), {unaccentedStr:'xaeb', index:0, length:0}, 'é', false, 2, 1],
  [mode(CASE | IACCENT), {unaccentedStr:'xaEb', index:0, length:0}, 'é', false, -1, 1],

  [mode(ICASE | IACCENT), {unaccentedUpperStr:'xAEB', index:0, length:0}, 'e', false, 2, 1],
  [mode(ICASE | IACCENT), {unaccentedUpperStr:'xAEB', index:0, length:0}, 'é', false, 2, 1],
  [mode(ICASE | IACCENT), {unaccentedUpperStr:'xAEB', index:0, length:0}, 'E', false, 2, 1],
  [mode(ICASE | IACCENT), {unaccentedUpperStr:'xAEB', index:0, length:0}, 'É', false, 2, 1],
  [mode(ICASE | IACCENT), {unaccentedUpperStr:'xAEB', index:0, length:0}, 'd', false, -1, 1],

  [mode(CASE | UPACCENT), {nfdStr:nfd('xaeb'), index:0, length:0}, 'e', false, 2, 1],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xaEb'), index:0, length:0}, 'e', false, -1, 0],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xaeb'), index:0, length:0}, 'E', false, -1, 0],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xaEb'), index:0, length:0}, 'E', false, 2, 1],

  [mode(CASE | UPACCENT), {nfdStr:nfd('caeb'), index:0, length:0}, 'é', false, -1, 0],
  [mode(CASE | UPACCENT), {nfdStr:nfd('caéb'), index:0, length:0}, 'é', false, 2, 2],
  [mode(CASE | UPACCENT), {nfdStr:nfd('caéb'), index:0, length:0}, 'éb', false, 2, 3],
  [mode(CASE | UPACCENT), {nfdStr:nfd('cAEB'), index:0, length:0}, 'é', false, -1, 0],
  [mode(CASE | UPACCENT), {nfdStr:nfd('cAÉB'), index:0, length:0}, 'é', false, -1, 0],

  [mode(CASE | UPACCENT), {nfdStr:nfd('xaeb'), index:0, length:0}, 'É', false, -1, 0],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xaéb'), index:0, length:0}, 'É', false, -1, 0],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xAEB'), index:0, length:0}, 'É', false, -1, 0],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xAÉB'), index:0, length:0}, 'É', false, 2, 2],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xAÉB'), index:0, length:0}, 'ÉB', false, 2, 3],

  [mode(UPCASE | ACCENT), {str:'xAEB', index:0, length:0}, 'e', false, 2, 1],
  [mode(UPCASE | ACCENT), {str:'xAÉB', index:0, length:0}, 'e', false, -1, 0],
  [mode(UPCASE | ACCENT), {str:'xAEB', index:0, length:0}, 'é', false, -1, 0],
  [mode(UPCASE | ACCENT), {str:'xAÉB', index:0, length:0}, 'é', false, 2, 1],

  [mode(UPCASE | ACCENT), {str:'xaeb', index:0, length:0}, 'E', false, -1, 0],
  [mode(UPCASE | ACCENT), {str:'xaéb', index:0, length:0}, 'E', false, -1, 0],
  [mode(UPCASE | ACCENT), {str:'xAEB', index:0, length:0}, 'E', false, 2, 1],
  [mode(UPCASE | ACCENT), {str:'xAÉB', index:0, length:0}, 'E', false, -1, 0],

  [mode(UPCASE | ACCENT), {str:'xaeb', index:0, length:0}, 'É', false, -1, 0],
  [mode(UPCASE | ACCENT), {str:'xaéb', index:0, length:0}, 'É', false, -1, 0],
  [mode(UPCASE | ACCENT), {str:'xAEB', index:0, length:0}, 'É', false, -1, 0],
  [mode(UPCASE | ACCENT), {str:'xAÉB', index:0, length:0}, 'É', false, 2, 1],

  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xAEB'), index:0, length:0}, 'e', false, 2, 1],

  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xaeb'), index:0, length:0}, 'E', false, -1, 0],
  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xAEB'), index:0, length:0}, 'E', false, 2, 1],

  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xAEB'), index:0, length:0}, 'é', false, -1, 0],
  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xAÉB'), index:0, length:0}, 'é', false, 2, 2],
  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xAÉB'), index:0, length:0}, 'éB', false, 2, 3],

  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xaeb'), index:0, length:0}, 'É', false, -1, 0],
  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xAEB'), index:0, length:0}, 'É', false, -1, 0],
  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xaéb'), index:0, length:0}, 'É', false, -1, 0],
  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xAÉB'), index:0, length:0}, 'É', false, 2, 2],
  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xAÉB'), index:0, length:0}, 'ÉB', false, 2, 3],

  [mode(CASE | ACCENT), {str:'abcabc', index:1, length:2}, 'A', true, -1, 1],
  [mode(CASE | ACCENT), {str:'abcabc', index:1, length:2}, 'a', true, 3, 1],
  [mode(CASE | ACCENT), {str:'abcabc', index:1, length:2}, 'b', true, 4, 1],
  [mode(CASE | ACCENT), {str:'abcabc', index:1, length:2}, 'ab', true, 3, 2],

  [mode(ICASE | ACCENT), {upperStr:'ABCABC', index:1, length:2}, 'A', true, 3, 1],
  [mode(ICASE | ACCENT), {upperStr:'ABCABC', index:1, length:2}, 'a', true, 3, 1],
  [mode(ICASE | ACCENT), {upperStr:'ABCABC', index:1, length:2}, 'd', true, -1, 1],

  [mode(CASE | IACCENT), {unaccentedStr:'abcabc', index:1, length:2}, 'a', true, 3, 1],

  [mode(CASE | IACCENT), {unaccentedStr:'xxaeb', index:1, length:2}, 'e', true, 3, 1],
  [mode(CASE | IACCENT), {unaccentedStr:'xxaeb', index:1, length:2}, 'é', true, 3, 1],
  [mode(CASE | IACCENT), {unaccentedStr:'xxaEb', index:1, length:2}, 'é', true, -1, 1],

  [mode(ICASE | IACCENT), {unaccentedUpperStr:'xxAEB', index:1, length:2}, 'e', true, 3, 1],
  [mode(ICASE | IACCENT), {unaccentedUpperStr:'xxAEB', index:1, length:2}, 'é', true, 3, 1],
  [mode(ICASE | IACCENT), {unaccentedUpperStr:'xxAEB', index:1, length:2}, 'E', true, 3, 1],
  [mode(ICASE | IACCENT), {unaccentedUpperStr:'xxAEB', index:1, length:2}, 'É', true, 3, 1],
  [mode(ICASE | IACCENT), {unaccentedUpperStr:'xxAEB', index:1, length:2}, 'd', true, -1, 1],

  [mode(CASE | UPACCENT), {nfdStr:nfd('abcabc'), index:1, length:2}, 'a', true, 3, 1],

  [mode(CASE | UPACCENT), {nfdStr:nfd('xxaeb'), index:1, length:2}, 'e', true, 3, 1],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xxaEb'), index:1, length:2}, 'e', true, -1, 0],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xxaeb'), index:1, length:2}, 'E', true, -1, 0],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xxaEb'), index:1, length:2}, 'E', true, 3, 1],

  [mode(CASE | UPACCENT), {nfdStr:nfd('xcaeb'), index:1, length:2}, 'é', true, -1, 0],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xcaéb'), index:1, length:2}, 'é', true, 3, 2],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xcaéb'), index:1, length:2}, 'éb', true, 3, 3],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xcaéb'), index:1, length:2}, 'éB', true, -1, 0],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xcAEB'), index:1, length:2}, 'é', true, -1, 0],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xcAÉB'), index:1, length:2}, 'é', true, -1, 0],

  [mode(CASE | UPACCENT), {nfdStr:nfd('xxaeb'), index:1, length:2}, 'É', true, -1, 0],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xxaéb'), index:1, length:2}, 'É', true, -1, 0],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xxAEB'), index:1, length:2}, 'É', true, -1, 0],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xxAÉB'), index:1, length:2}, 'É', true, 3, 2],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xxAÉB'), index:1, length:2}, 'ÉB', true, 3, 3],
  [mode(CASE | UPACCENT), {nfdStr:nfd('xxAÉB'), index:1, length:2}, 'Éb', true, -1, 0],

  [mode(UPCASE | ACCENT), {str:'abcabc', index:1, length:2}, 'a', true, 3, 1],

  [mode(UPCASE | ACCENT), {str:'xxAEB', index:1, length:2}, 'e', true, 3, 1],
  [mode(UPCASE | ACCENT), {str:'xxAÉB', index:1, length:2}, 'e', true, -1, 0],
  [mode(UPCASE | ACCENT), {str:'xxAEB', index:1, length:2}, 'é', true, -1, 0],
  [mode(UPCASE | ACCENT), {str:'xxAÉB', index:1, length:2}, 'é', true, 3, 1],

  [mode(UPCASE | ACCENT), {str:'xxaeb', index:1, length:2}, 'E', true, -1, 0],
  [mode(UPCASE | ACCENT), {str:'xxaéb', index:1, length:2}, 'E', true, -1, 0],
  [mode(UPCASE | ACCENT), {str:'xxAEB', index:1, length:2}, 'E', true, 3, 1],
  [mode(UPCASE | ACCENT), {str:'xxAÉB', index:1, length:2}, 'E', true, -1, 0],

  [mode(UPCASE | ACCENT), {str:'xxaeb', index:1, length:2}, 'É', true, -1, 0],
  [mode(UPCASE | ACCENT), {str:'xxaéb', index:1, length:2}, 'É', true, -1, 0],
  [mode(UPCASE | ACCENT), {str:'xxAEB', index:1, length:2}, 'É', true, -1, 0],
  [mode(UPCASE | ACCENT), {str:'xxAÉB', index:1, length:2}, 'É', true, 3, 1],

  [mode(UPCASE | UPACCENT), {nfdStr:nfd('abcabc'), index:1, length:2}, 'a', true, 3, 1],

  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xxAEB'), index:1, length:2}, 'e', true, 3, 1],

  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xxaeb'), index:1, length:2}, 'E', true, -1, 0],
  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xxAEB'), index:1, length:2}, 'E', true, 3, 1],

  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xxAEB'), index:1, length:2}, 'é', true, -1, 0],
  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xxAÉB'), index:1, length:2}, 'é', true, 3, 2],
  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xxAÉB'), index:1, length:2}, 'éb', true, 3, 3],
  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xxAÉB'), index:1, length:2}, 'éB', true, 3, 3],

  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xxaeb'), index:1, length:2}, 'É', true, -1, 0],
  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xxAEB'), index:1, length:2}, 'É', true, -1, 0],
  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xxaéb'), index:1, length:2}, 'É', true, -1, 0],
  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xxAÉB'), index:1, length:2}, 'É', true, 3, 2],
  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xxAÉB'), index:1, length:2}, 'Éb', true, 3, 3],
  [mode(UPCASE | UPACCENT), {nfdStr:nfd('xxAÉB'), index:1, length:2}, 'ÉB', true, 3, 3],

])("plainText(mode='%s', %s, s='%s', afterLast=%d) = {index:%i, length:%i}", (mode, si, pattern, afterLastIndex, expectedIndex, expectedLen) => {
  expect(searcher.createTextSearcher(mode.options, pattern, afterLastIndex)(si)).toBe(expectedIndex);
  if (expectedIndex !== -1) {
    expect(si.length).toBe(expectedLen);
  }
});


// regex
test.each([
  [mode(CASE | ACCENT), {str:'abcabc', index: -1}, 'A', -1, undefined],
  [mode(CASE | ACCENT), {str:'abcabc', index: -1}, 'a', 0, 1],
  [mode(CASE | ACCENT), {str:'abcabc', index: -1}, 'b', 1, 1],
  [mode(CASE | ACCENT), {str:'abcabc', index: -1}, 'b.?a', 1, 3],
  [mode(CASE | ACCENT), {str:'abcabc', index: -1}, 'd', -1, undefined],

  [mode(ICASE | ACCENT), {str:'abcabc', index: -1}, 'Ab', 0, 2],
  [mode(ICASE | ACCENT), {str:'ABCABC', index: -1}, 'Ab', 0, 2],
  [mode(ICASE | ACCENT), {str:'abcabc', index: -1}, 'aB', 0, 2],
  [mode(ICASE | ACCENT), {str:'ABCABC', index: -1}, 'aB', 0, 2],
  [mode(ICASE | ACCENT), {str:'ABCABC', index: -1}, 'd', -1, undefined],

  [mode(CASE | IACCENT), {unaccentedStr:'aeb', index: -1}, 'e', 1, 1],
  [mode(CASE | IACCENT), {unaccentedStr:'aeb', index: -1}, 'é', 1, 1],
  [mode(CASE | IACCENT), {unaccentedStr:'aEb', index: -1}, 'é', -1, undefined],

  [mode(ICASE | IACCENT), {unaccentedStr:'AEB', index: -1}, 'e', 1, 1],
  [mode(ICASE | IACCENT), {unaccentedStr:'AEB', index: -1}, 'é', 1, 1],
  [mode(ICASE | IACCENT), {unaccentedStr:'AEB', index: -1}, 'E', 1, 1],
  [mode(ICASE | IACCENT), {unaccentedStr:'AEB', index: -1}, 'É', 1, 1],
  [mode(ICASE | IACCENT), {unaccentedStr:'AEB', index: -1}, 'd', -1, undefined],

])("regex(mode='%s', %s, s='%s') = {index:%i, length:%i}", (mode, si, str, expectedIndex, expectedLen) => {
  expect(searcher.createRegexSearcher(mode.options, str)(si)).toBe(expectedIndex);
  expect(si.length).toBe(expectedLen);
});

test('filter()', () => {
  const datas = [
    {str:'ab', index: -1, length: 0, fragments:[]},
    {str:'aaaa', index: -1, length: 0, fragments:[]},
    {str:'aabbb', index: -1, length: 0, fragments:[]},
    {str:'aaaaaaaaaa', index: -1, length: 0, fragments:[]},
    {str:'ababab', index: -1, length: 0, fragments:[]},
    {str:'aaaaaaab', index: -1, length: 0, fragments:[]},
  ];
  const filter = searcher.createFuzzySearcher(CASE | ACCENT, 'b')
  searcher.filter(datas, filter);
  expect(datas).toStrictEqual([
    {str:'ab', index: 1, length: 1, fragments:[{index: 1, length: 1}]},
    {str:'aabbb', index: 2, length: 1, fragments:[{index: 2, length: 1}]},
    {str:'ababab', index: 1, length: 1, fragments:[{index: 1, length: 1}]},
    {str:'aaaaaaab', index: 7, length: 1, fragments:[{index: 7, length: 1}]},
  ]);
});
