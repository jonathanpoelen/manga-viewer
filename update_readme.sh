#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
readme="$(sed '/^```py/,/^```/d' README.md)"
echo "$readme

\`\`\`py
$(./htmlviewer -p)
\`\`\`" > README.md
