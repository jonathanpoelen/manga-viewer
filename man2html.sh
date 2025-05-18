#!/usr/bin/env bash
set -e

s=$(<${1:-/dev/stdin})  # <&0 doesn't work here with bash

echo -n '<!DOCTYPE html>
<html><head><title>htmlviewer -h</title><meta charset="utf-8"/><style>
.t{text-decoration:underline}
.o{text-decoration:none}

html{color:#c5c8c6;background:#070a13}
.t{color:#c5c8c6}
.t:hover{color:#f5f8f6}
.o{color:#ec4d62}
.v{color:#80e68a}
.l{color:#6ab9fa}
.d{color:#999}

@media (prefers-color-scheme: light) {
  html{color:#000;background:#d5d8d6}
  .t{color:#000}
  .t:hover{color:#444}
  .o{color:#c31d27}
  .v{color:#1ba12c}
  .l{color:#2a59ba}
  .d{color:#777}
}
</style></head><body>
<p>(options and commands (in <span class="o">red</span>) are clickable links)</p>
<p>Quick links: '

# extract title and writes a table of contents
sed -nE '
  /^  [^ \x1b]/{
    /^  htmlviewer/!{
      H
      # convert invalid id character to -
      y/ ./--/
      H
    }
  }
  ${
    g
    s|  ([^\n]+)\n--([^\n]+)|<a class="t" href="#ch-\2">\1</a>, |g
    s|\n||g
    s|, $||
    p
  }
' <<<"$s"

echo '</p>
<hr>
<pre>'

sed -E '
  # convert xml character to entity
  s/&/\&amp;/g
  s/</\&lt;/g

  # add link and id to titles
  /^  [^ \x1b]/{
    /^  htmlviewer/!{
      h
      # convert invalid id character to -
      y/ ./--/
      G
      s|^--([^ ]+)\n  (.*)|  <a class="t" id="ch-\1" href="#ch-\1">\2</a>|
      t
    }
  }

  # convert color and add link

  # command name
  s~^      \x1b\[31m([^\x1b]+)\x1b\[m~      <a class="o" id="cmd-\1" href="#cmd-\1">\1</a>~
  # cli option name
  s~^  \x1b\[31m([^\x1b]+)\x1b\[m~  <a class="o" id="opt\1" href="#opt\1">\1</a>~g
  # cli option name in description
  s~\x1b\[31m-([^\x1b]+)\x1b\[m~<a class="o" href="#opt-\1">-\1</a>~g
  # command name in description
  s~\x1b\[31m([^\x1b]+)\x1b\[m~<a class="o" href="#cmd-\1">\1</a>~g
  # parameter name
  s~\x1b\[32m~<span class="v">~g
  # list of parameter values
  s~\x1b\[34m~<span class="l">~g
  # default value
  s~\x1b\[37m~<span class="d">~g
  # reset
  s~\x1b\[m~</span>~g

  # convert home path to $HOME
  s~/home/[^/]+~$HOME~g
' <<< "$s"

echo '</pre></body></html>'
