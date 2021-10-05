#!/usr/bin/env sh

set -e

jsdir="${TMPDIR:-/tmp}"
jsfile="$jsdir"/htmlviewer_searcher.js
echo "temporary file: $jsfile"

cd "$(dirname "$0")"

# extract source
sed '/^const SEARCH_/p
/^  \/\/ Testable searcher/,/^  \/\/ @}/p
d
' ../htmlviewer > "$jsfile"

exports=$(sed -E '/^ ? ?const/!d;s/^ ? ?const ([a-zA-Z0-9_]+).*/module.exports.\1 = \1;/' "$jsfile")
echo "$exports" >> "$jsfile"

# run tests
NODE_PATH="$jsdir":$NODE_PATH ./node_modules/jest/bin/jest.js "$@" searcher.test.js
