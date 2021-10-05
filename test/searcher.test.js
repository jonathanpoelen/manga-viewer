const searcher = require('htmlviewer_searcher.js')

const CASE_SENSITIVE = searcher.SEARCH_CASE_SENSITIVE;
const UPPERCASE_ONLY = searcher.SEARCH_UPPERCASE_ONLY;
const CASE_INSENSITIVE = searcher.SEARCH_CASE_INSENSITIVE;
const ACCENT_SENSITIVE = searcher.SEARCH_ACCENT_SENSITIVE;
const ACCENT_INSENSITIVE = searcher.SEARCH_ACCENT_INSENSITIVE;
const ACCENT_ONLY = searcher.SEARCH_ACCENT_ONLY;

// fuzzy
test.each([
  [CASE_SENSITIVE | ACCENT_SENSITIVE, {str:'abcabc', lastIndex: -1}, 'A', -1],
  [CASE_SENSITIVE | ACCENT_SENSITIVE, {str:'abcabc', lastIndex: -1}, 'a', 0],
  [CASE_SENSITIVE | ACCENT_SENSITIVE, {str:'abcabc', lastIndex: -1}, 'b', 1],
  [CASE_SENSITIVE | ACCENT_SENSITIVE, {str:'abcabc', lastIndex: -1}, 'd', -1],
  [CASE_SENSITIVE | ACCENT_SENSITIVE, {str:'abcabc', lastIndex: 0}, 'a', 3],
  [CASE_SENSITIVE | ACCENT_SENSITIVE, {str:'abcabc', lastIndex: 0}, 'b', 1],
  [CASE_SENSITIVE | ACCENT_SENSITIVE, {str:'abcabc', lastIndex: 0}, 'd', -1],
  [CASE_SENSITIVE | ACCENT_SENSITIVE, {str:'abcabc', lastIndex: 1}, 'b', 4],
  [CASE_SENSITIVE | ACCENT_SENSITIVE, {str:'abcabc', lastIndex: 3}, 'a', -1],

  [CASE_INSENSITIVE | ACCENT_SENSITIVE, {upperStr:'ABCABC', lastIndex: -1}, 'A', 0],
  [CASE_INSENSITIVE | ACCENT_SENSITIVE, {upperStr:'ABCABC', lastIndex: -1}, 'a', 0],
  [CASE_INSENSITIVE | ACCENT_SENSITIVE, {upperStr:'ABCABC', lastIndex: -1}, 'd', -1],
  [CASE_INSENSITIVE | ACCENT_SENSITIVE, {upperStr:'ABCABC', lastIndex: 0}, 'A', 3],
  [CASE_INSENSITIVE | ACCENT_SENSITIVE, {upperStr:'ABCABC', lastIndex: 0}, 'a', 3],
  [CASE_INSENSITIVE | ACCENT_SENSITIVE, {upperStr:'ABCABC', lastIndex: 0}, 'd', -1],
  [CASE_INSENSITIVE | ACCENT_SENSITIVE, {upperStr:'é', lastIndex: 0}, 'e', -1],

  [CASE_SENSITIVE | ACCENT_INSENSITIVE, {unaccentedStr:'aeb', lastIndex: -1}, 'e', 1],
  [CASE_SENSITIVE | ACCENT_INSENSITIVE, {unaccentedStr:'aeb', lastIndex: -1}, 'é', 1],
  [CASE_SENSITIVE | ACCENT_INSENSITIVE, {unaccentedStr:'aEb', lastIndex: -1}, 'é', -1],

  [CASE_INSENSITIVE | ACCENT_INSENSITIVE, {unaccentedUpperStr:'AEB', lastIndex: -1}, 'e', 1],
  [CASE_INSENSITIVE | ACCENT_INSENSITIVE, {unaccentedUpperStr:'AEB', lastIndex: -1}, 'é', 1],
  [CASE_INSENSITIVE | ACCENT_INSENSITIVE, {unaccentedUpperStr:'AEB', lastIndex: -1}, 'E', 1],
  [CASE_INSENSITIVE | ACCENT_INSENSITIVE, {unaccentedUpperStr:'AEB', lastIndex: -1}, 'É', 1],
  [CASE_INSENSITIVE | ACCENT_INSENSITIVE, {unaccentedUpperStr:'AEB', lastIndex: -1}, 'd', -1],

  [CASE_SENSITIVE | ACCENT_ONLY, {unaccentedStr:'aeb', lastIndex: -1}, 'e', 1],
  [CASE_SENSITIVE | ACCENT_ONLY, {unaccentedStr:'aEb', lastIndex: -1}, 'e', -1],
  [CASE_SENSITIVE | ACCENT_ONLY, {unaccentedStr:'aeb', lastIndex: -1}, 'E', -1],
  [CASE_SENSITIVE | ACCENT_ONLY, {unaccentedStr:'aEb', lastIndex: -1}, 'E', 1],

  [CASE_SENSITIVE | ACCENT_ONLY, {str:'aeb', lastIndex: -1}, 'é', -1],
  [CASE_SENSITIVE | ACCENT_ONLY, {str:'aéb', lastIndex: -1}, 'é', 1],
  [CASE_SENSITIVE | ACCENT_ONLY, {str:'AEB', lastIndex: -1}, 'é', -1],
  [CASE_SENSITIVE | ACCENT_ONLY, {str:'AÉB', lastIndex: -1}, 'é', -1],

  [CASE_SENSITIVE | ACCENT_ONLY, {str:'aeb', lastIndex: -1}, 'É', -1],
  [CASE_SENSITIVE | ACCENT_ONLY, {str:'aéb', lastIndex: -1}, 'É', -1],
  [CASE_SENSITIVE | ACCENT_ONLY, {str:'AEB', lastIndex: -1}, 'É', -1],
  [CASE_SENSITIVE | ACCENT_ONLY, {str:'AÉB', lastIndex: -1}, 'É', 1],

  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {upperStr:'AEB', lastIndex: -1}, 'e', 1],
  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {upperStr:'AÉB', lastIndex: -1}, 'e', -1],
  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {upperStr:'AEB', lastIndex: -1}, 'é', -1],
  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {upperStr:'AÉB', lastIndex: -1}, 'é', 1],

  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {str:'aeb', lastIndex: -1}, 'E', -1],
  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {str:'aéb', lastIndex: -1}, 'E', -1],
  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {str:'AEB', lastIndex: -1}, 'E', 1],
  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {str:'AÉB', lastIndex: -1}, 'E', -1],

  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {str:'aeb', lastIndex: -1}, 'É', -1],
  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {str:'aéb', lastIndex: -1}, 'É', -1],
  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {str:'AEB', lastIndex: -1}, 'É', -1],
  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {str:'AÉB', lastIndex: -1}, 'É', 1],

  [UPPERCASE_ONLY | ACCENT_ONLY, {unaccentedUpperStr:'AEB', lastIndex: -1}, 'e', 1],

  [UPPERCASE_ONLY | ACCENT_ONLY, {unaccentedStr:'aeb', lastIndex: -1}, 'E', -1],
  [UPPERCASE_ONLY | ACCENT_ONLY, {unaccentedStr:'AEB', lastIndex: -1}, 'E', 1],

  [UPPERCASE_ONLY | ACCENT_ONLY, {upperStr:'AEB', lastIndex: -1}, 'é', -1],
  [UPPERCASE_ONLY | ACCENT_ONLY, {upperStr:'AÉB', lastIndex: -1}, 'é', 1],

  [UPPERCASE_ONLY | ACCENT_ONLY, {str:'aeb', lastIndex: -1}, 'É', -1],
  [UPPERCASE_ONLY | ACCENT_ONLY, {str:'AEB', lastIndex: -1}, 'É', -1],
  [UPPERCASE_ONLY | ACCENT_ONLY, {str:'aéb', lastIndex: -1}, 'É', -1],
  [UPPERCASE_ONLY | ACCENT_ONLY, {str:'AÉB', lastIndex: -1}, 'É', 1],

])("fuzzy(mode=%i, %s, c='%s') = %i", (options, si, c, expectedIndex) => {
  expect(searcher.createFuzzySearcher(options, c)(si)).toBe(expectedIndex);
});

// plainText
test.each([
  // lastIndex = -1
  [CASE_SENSITIVE | ACCENT_SENSITIVE, {str:'abcabc', lastIndex: -1}, 'A', -1, 1],
  [CASE_SENSITIVE | ACCENT_SENSITIVE, {str:'abcabc', lastIndex: -1}, 'a', 0, 1],
  [CASE_SENSITIVE | ACCENT_SENSITIVE, {str:'abcabc', lastIndex: -1}, 'b', 1, 1],
  [CASE_SENSITIVE | ACCENT_SENSITIVE, {str:'abcabc', lastIndex: -1}, 'ab', 0, 2],
  [CASE_SENSITIVE | ACCENT_SENSITIVE, {str:'abcabc', lastIndex: -1}, 'd', -1, 1],

  [CASE_INSENSITIVE | ACCENT_SENSITIVE, {upperStr:'ABCABC', lastIndex: -1}, 'A', 0, 1],
  [CASE_INSENSITIVE | ACCENT_SENSITIVE, {upperStr:'ABCABC', lastIndex: -1}, 'a', 0, 1],
  [CASE_INSENSITIVE | ACCENT_SENSITIVE, {upperStr:'ABCABC', lastIndex: -1}, 'd', -1, 1],

  [CASE_SENSITIVE | ACCENT_INSENSITIVE, {unaccentedStr:'aeb', lastIndex: -1}, 'e', 1, 1],
  [CASE_SENSITIVE | ACCENT_INSENSITIVE, {unaccentedStr:'aeb', lastIndex: -1}, 'é', 1, 1],
  [CASE_SENSITIVE | ACCENT_INSENSITIVE, {unaccentedStr:'aEb', lastIndex: -1}, 'é', -1, 1],

  [CASE_INSENSITIVE | ACCENT_INSENSITIVE, {unaccentedUpperStr:'AEB', lastIndex: -1}, 'e', 1, 1],
  [CASE_INSENSITIVE | ACCENT_INSENSITIVE, {unaccentedUpperStr:'AEB', lastIndex: -1}, 'é', 1, 1],
  [CASE_INSENSITIVE | ACCENT_INSENSITIVE, {unaccentedUpperStr:'AEB', lastIndex: -1}, 'E', 1, 1],
  [CASE_INSENSITIVE | ACCENT_INSENSITIVE, {unaccentedUpperStr:'AEB', lastIndex: -1}, 'É', 1, 1],
  [CASE_INSENSITIVE | ACCENT_INSENSITIVE, {unaccentedUpperStr:'AEB', lastIndex: -1}, 'd', -1, 1],

  [CASE_SENSITIVE | ACCENT_ONLY, {unaccentedStr:'aeb', lastIndex: -1}, 'e', 1, 1],
  [CASE_SENSITIVE | ACCENT_ONLY, {unaccentedStr:'aEb', lastIndex: -1}, 'e', -1, 1],
  [CASE_SENSITIVE | ACCENT_ONLY, {unaccentedStr:'aeb', lastIndex: -1}, 'E', -1, 1],
  [CASE_SENSITIVE | ACCENT_ONLY, {unaccentedStr:'aEb', lastIndex: -1}, 'E', 1, 1],

  [CASE_SENSITIVE | ACCENT_ONLY, {str:'aeb', lastIndex: -1}, 'é', -1, 1],
  [CASE_SENSITIVE | ACCENT_ONLY, {str:'aéb', lastIndex: -1}, 'é', 1, 1],
  [CASE_SENSITIVE | ACCENT_ONLY, {str:'AEB', lastIndex: -1}, 'é', -1, 1],
  [CASE_SENSITIVE | ACCENT_ONLY, {str:'AÉB', lastIndex: -1}, 'é', -1, 1],

  [CASE_SENSITIVE | ACCENT_ONLY, {str:'aeb', lastIndex: -1}, 'É', -1, 1],
  [CASE_SENSITIVE | ACCENT_ONLY, {str:'aéb', lastIndex: -1}, 'É', -1, 1],
  [CASE_SENSITIVE | ACCENT_ONLY, {str:'AEB', lastIndex: -1}, 'É', -1, 1],
  [CASE_SENSITIVE | ACCENT_ONLY, {str:'AÉB', lastIndex: -1}, 'É', 1, 1],

  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {upperStr:'AEB', lastIndex: -1}, 'e', 1, 1],
  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {upperStr:'AÉB', lastIndex: -1}, 'e', -1, 1],
  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {upperStr:'AEB', lastIndex: -1}, 'é', -1, 1],
  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {upperStr:'AÉB', lastIndex: -1}, 'é', 1, 1],

  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {str:'aeb', lastIndex: -1}, 'E', -1, 1],
  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {str:'aéb', lastIndex: -1}, 'E', -1, 1],
  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {str:'AEB', lastIndex: -1}, 'E', 1, 1],
  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {str:'AÉB', lastIndex: -1}, 'E', -1, 1],

  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {str:'aeb', lastIndex: -1}, 'É', -1, 1],
  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {str:'aéb', lastIndex: -1}, 'É', -1, 1],
  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {str:'AEB', lastIndex: -1}, 'É', -1, 1],
  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {str:'AÉB', lastIndex: -1}, 'É', 1, 1],

  [UPPERCASE_ONLY | ACCENT_ONLY, {unaccentedUpperStr:'AEB', lastIndex: -1}, 'e', 1, 1],

  [UPPERCASE_ONLY | ACCENT_ONLY, {unaccentedStr:'aeb', lastIndex: -1}, 'E', -1, 1],
  [UPPERCASE_ONLY | ACCENT_ONLY, {unaccentedStr:'AEB', lastIndex: -1}, 'E', 1, 1],

  [UPPERCASE_ONLY | ACCENT_ONLY, {upperStr:'AEB', lastIndex: -1}, 'é', -1, 1],
  [UPPERCASE_ONLY | ACCENT_ONLY, {upperStr:'AÉB', lastIndex: -1}, 'é', 1, 1],

  [UPPERCASE_ONLY | ACCENT_ONLY, {str:'aeb', lastIndex: -1}, 'É', -1, 1],
  [UPPERCASE_ONLY | ACCENT_ONLY, {str:'AEB', lastIndex: -1}, 'É', -1, 1],
  [UPPERCASE_ONLY | ACCENT_ONLY, {str:'aéb', lastIndex: -1}, 'É', -1, 1],
  [UPPERCASE_ONLY | ACCENT_ONLY, {str:'AÉB', lastIndex: -1}, 'É', 1, 1],

  // lastIndex = 0, foundLength: 1
  [CASE_SENSITIVE | ACCENT_SENSITIVE, {str:'abcabc', lastIndex: 0, foundLength: 1}, 'a', -1, 2],
  [CASE_SENSITIVE | ACCENT_SENSITIVE, {str:'abcabc', lastIndex: 0, foundLength: 1}, 'b', 0, 2],
  [CASE_SENSITIVE | ACCENT_SENSITIVE, {str:'abcabc', lastIndex: 0, foundLength: 1}, 'bc', 0, 3],

  [CASE_INSENSITIVE | ACCENT_SENSITIVE, {upperStr:'ABCABC', lastIndex: 0, foundLength: 1}, 'B', 0, 2],
  [CASE_INSENSITIVE | ACCENT_SENSITIVE, {upperStr:'ABCABC', lastIndex: 0, foundLength: 1}, 'b', 0, 2],
  [CASE_INSENSITIVE | ACCENT_SENSITIVE, {upperStr:'ABCABC', lastIndex: 0, foundLength: 1}, 'd', -1, 2],

  [CASE_SENSITIVE | ACCENT_INSENSITIVE, {unaccentedStr:'aeb', lastIndex: 0, foundLength: 1}, 'e', 0, 2],
  [CASE_SENSITIVE | ACCENT_INSENSITIVE, {unaccentedStr:'aeb', lastIndex: 0, foundLength: 1}, 'é', 0, 2],
  [CASE_SENSITIVE | ACCENT_INSENSITIVE, {unaccentedStr:'aEb', lastIndex: 0, foundLength: 1}, 'é', -1, 2],

  [CASE_INSENSITIVE | ACCENT_INSENSITIVE, {unaccentedUpperStr:'AEB', lastIndex: 0, foundLength: 1}, 'e', 0, 2],
  [CASE_INSENSITIVE | ACCENT_INSENSITIVE, {unaccentedUpperStr:'AEB', lastIndex: 0, foundLength: 1}, 'é', 0, 2],
  [CASE_INSENSITIVE | ACCENT_INSENSITIVE, {unaccentedUpperStr:'AEB', lastIndex: 0, foundLength: 1}, 'E', 0, 2],
  [CASE_INSENSITIVE | ACCENT_INSENSITIVE, {unaccentedUpperStr:'AEB', lastIndex: 0, foundLength: 1}, 'É', 0, 2],
  [CASE_INSENSITIVE | ACCENT_INSENSITIVE, {unaccentedUpperStr:'AEB', lastIndex: 0, foundLength: 1}, 'd', -1, 2],

  [CASE_SENSITIVE | ACCENT_ONLY, {unaccentedStr:'aeb', lastIndex: 0, foundLength: 1}, 'e', 0, 2],
  [CASE_SENSITIVE | ACCENT_ONLY, {unaccentedStr:'aEb', lastIndex: 0, foundLength: 1}, 'e', -1, 2],
  [CASE_SENSITIVE | ACCENT_ONLY, {unaccentedStr:'aeb', lastIndex: 0, foundLength: 1}, 'E', -1, 2],
  [CASE_SENSITIVE | ACCENT_ONLY, {unaccentedStr:'aEb', lastIndex: 0, foundLength: 1}, 'E', 0, 2],

  [CASE_SENSITIVE | ACCENT_ONLY, {str:'aeb', lastIndex: 0, foundLength: 1}, 'é', -1, 2],
  [CASE_SENSITIVE | ACCENT_ONLY, {str:'aéb', lastIndex: 0, foundLength: 1}, 'é', 0, 2],
  [CASE_SENSITIVE | ACCENT_ONLY, {str:'AEB', lastIndex: 0, foundLength: 1}, 'é', -1, 2],
  [CASE_SENSITIVE | ACCENT_ONLY, {str:'AÉB', lastIndex: 0, foundLength: 1}, 'é', -1, 2],

  [CASE_SENSITIVE | ACCENT_ONLY, {str:'aeb', lastIndex: 0, foundLength: 1}, 'É', -1, 2],
  [CASE_SENSITIVE | ACCENT_ONLY, {str:'aéb', lastIndex: 0, foundLength: 1}, 'É', -1, 2],
  [CASE_SENSITIVE | ACCENT_ONLY, {str:'AEB', lastIndex: 0, foundLength: 1}, 'É', -1, 2],
  [CASE_SENSITIVE | ACCENT_ONLY, {str:'AÉB', lastIndex: 0, foundLength: 1}, 'É', 0, 2],

  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {upperStr:'AEB', lastIndex: 0, foundLength: 1}, 'e', 0, 2],
  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {upperStr:'AÉB', lastIndex: 0, foundLength: 1}, 'e', -1, 2],
  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {upperStr:'AEB', lastIndex: 0, foundLength: 1}, 'é', -1, 2],
  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {upperStr:'AÉB', lastIndex: 0, foundLength: 1}, 'é', 0, 2],

  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {str:'aeb', lastIndex: 0, foundLength: 1}, 'E', -1, 2],
  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {str:'aéb', lastIndex: 0, foundLength: 1}, 'E', -1, 2],
  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {str:'AEB', lastIndex: 0, foundLength: 1}, 'E', 0, 2],
  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {str:'AÉB', lastIndex: 0, foundLength: 1}, 'E', -1, 2],

  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {str:'aeb', lastIndex: 0, foundLength: 1}, 'É', -1, 2],
  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {str:'aéb', lastIndex: 0, foundLength: 1}, 'É', -1, 2],
  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {str:'AEB', lastIndex: 0, foundLength: 1}, 'É', -1, 2],
  [UPPERCASE_ONLY | ACCENT_SENSITIVE, {str:'AÉB', lastIndex: 0, foundLength: 1}, 'É', 0, 2],

  [UPPERCASE_ONLY | ACCENT_ONLY, {unaccentedUpperStr:'AEB', lastIndex: 0, foundLength: 1}, 'e', 0, 2],

  [UPPERCASE_ONLY | ACCENT_ONLY, {unaccentedStr:'aeb', lastIndex: 0, foundLength: 1}, 'E', -1, 2],
  [UPPERCASE_ONLY | ACCENT_ONLY, {unaccentedStr:'AEB', lastIndex: 0, foundLength: 1}, 'E', 0, 2],

  [UPPERCASE_ONLY | ACCENT_ONLY, {upperStr:'AEB', lastIndex: 0, foundLength: 1}, 'é', -1, 2],
  [UPPERCASE_ONLY | ACCENT_ONLY, {upperStr:'AÉB', lastIndex: 0, foundLength: 1}, 'é', 0, 2],

  [UPPERCASE_ONLY | ACCENT_ONLY, {str:'aeb', lastIndex: 0, foundLength: 1}, 'É', -1, 2],
  [UPPERCASE_ONLY | ACCENT_ONLY, {str:'AEB', lastIndex: 0, foundLength: 1}, 'É', -1, 2],
  [UPPERCASE_ONLY | ACCENT_ONLY, {str:'aéb', lastIndex: 0, foundLength: 1}, 'É', -1, 2],
  [UPPERCASE_ONLY | ACCENT_ONLY, {str:'AÉB', lastIndex: 0, foundLength: 1}, 'É', 0, 2],

])("plainText(mode=%i, %s, s='%s') = {index:%i, length:%i}", (options, si, str, expectedIndex, expectedLen) => {
  expect(searcher.createTextSearcher(options, str, si.lastIndex !== -1)(si)).toBe(expectedIndex);
  expect(si.foundLength).toBe(expectedLen);
});


// regex
test.each([
  [CASE_SENSITIVE | ACCENT_SENSITIVE, {str:'abcabc', lastIndex: -1}, 'A', -1, undefined],
  [CASE_SENSITIVE | ACCENT_SENSITIVE, {str:'abcabc', lastIndex: -1}, 'a', 0, 1],
  [CASE_SENSITIVE | ACCENT_SENSITIVE, {str:'abcabc', lastIndex: -1}, 'b', 1, 1],
  [CASE_SENSITIVE | ACCENT_SENSITIVE, {str:'abcabc', lastIndex: -1}, 'b.?a', 1, 3],
  [CASE_SENSITIVE | ACCENT_SENSITIVE, {str:'abcabc', lastIndex: -1}, 'd', -1, undefined],

  [CASE_INSENSITIVE | ACCENT_SENSITIVE, {str:'abcabc', lastIndex: -1}, 'Ab', 0, 2],
  [CASE_INSENSITIVE | ACCENT_SENSITIVE, {str:'ABCABC', lastIndex: -1}, 'Ab', 0, 2],
  [CASE_INSENSITIVE | ACCENT_SENSITIVE, {str:'abcabc', lastIndex: -1}, 'aB', 0, 2],
  [CASE_INSENSITIVE | ACCENT_SENSITIVE, {str:'ABCABC', lastIndex: -1}, 'aB', 0, 2],
  [CASE_INSENSITIVE | ACCENT_SENSITIVE, {str:'ABCABC', lastIndex: -1}, 'd', -1, undefined],

  [CASE_SENSITIVE | ACCENT_INSENSITIVE, {unaccentedStr:'aeb', lastIndex: -1}, 'e', 1, 1],
  [CASE_SENSITIVE | ACCENT_INSENSITIVE, {unaccentedStr:'aeb', lastIndex: -1}, 'é', 1, 1],
  [CASE_SENSITIVE | ACCENT_INSENSITIVE, {unaccentedStr:'aEb', lastIndex: -1}, 'é', -1, undefined],

  [CASE_INSENSITIVE | ACCENT_INSENSITIVE, {unaccentedStr:'AEB', lastIndex: -1}, 'e', 1, 1],
  [CASE_INSENSITIVE | ACCENT_INSENSITIVE, {unaccentedStr:'AEB', lastIndex: -1}, 'é', 1, 1],
  [CASE_INSENSITIVE | ACCENT_INSENSITIVE, {unaccentedStr:'AEB', lastIndex: -1}, 'E', 1, 1],
  [CASE_INSENSITIVE | ACCENT_INSENSITIVE, {unaccentedStr:'AEB', lastIndex: -1}, 'É', 1, 1],
  [CASE_INSENSITIVE | ACCENT_INSENSITIVE, {unaccentedStr:'AEB', lastIndex: -1}, 'd', -1, undefined],

])("regex(mode=%i, %s, s='%s') = {index:%i, length:%i}", (options, si, str, expectedIndex, expectedLen) => {
  expect(searcher.createRegexSearcher(options, str)(si)).toBe(expectedIndex);
  expect(si.foundLength).toBe(expectedLen);
});

test('filter()', () => {
  const datas = [
    {str:'ab', lastIndex: -1, indexes:[]},
    {str:'aaaa', lastIndex: -1, indexes:[]},
    {str:'aabbb', lastIndex: -1, indexes:[]},
    {str:'aaaaaaaaaa', lastIndex: -1, indexes:[]},
    {str:'ababab', lastIndex: -1, indexes:[]},
    {str:'aaaaaaab', lastIndex: -1, indexes:[]},
  ];
  const filter = searcher.createFuzzySearcher(CASE_SENSITIVE | ACCENT_SENSITIVE, 'ab')
  searcher.filter(datas, filter);
  expect(datas).toStrictEqual([
    {str:'ab', lastIndex: 0, indexes:[0]},
    {str:'aabbb', lastIndex: 1, indexes:[1]},
    {str:'ababab', lastIndex: 0, indexes:[0]},
    {str:'aaaaaaab', lastIndex: 6, indexes:[6]},
  ]);
});
