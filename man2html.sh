#!/usr/bin/env bash
echo -n '<html><head><title>htmlviewer -h</title><meta charset="Utf-8"/><style>
html{color:#c5c8c6;background:#070a13;}
.o{color:#ec4d62;text-decoration:none}
.v{color:#80e68a}
.l{color:#6ab9fa}
.d{color:#999999}
</style></head><body>
<p>(options and commands (in red) are clickable links)</p>
<pre>'

sed -E '
  s/&/\&amp;/g
  s/</\&lt;/g
  s~^(  +)\x1b\[31m([^\x1b]+)\x1b\[m~\1<a class="o" id="\2" href="#\2">\2</a>~g
  s~\x1b\[31m([^\x1b]+)\x1b\[m~<a class="o" href="#\1">\1</a>~g
  s/\x1b\[32m/<span class="v">/g
  s/\x1b\[34m/<span class="l">/g
  s/\x1b\[37m/<span class="d">/g
  s/\x1b\[m/<\/span>/g
'

echo '</body></html>'
