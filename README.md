`htmlviewer` is a cli tool that generates a web page to view images from directories. `htmlviewer-gui` is simple wrapper which uses `zenity` as GUI.

A fully online version that lets you open a directory is available [here](https://jonathanpoelen.github.io/manga-viewer).

It's main advantage of the viewer is that it uses one and the same key to scroll and go to the next image (space or left click by default), the behavior of which changes according to 5 reading modes:

- Normal (`k` key): Display one image at a time.
- Double page (`j` key): The first time the scroll is at the bottom, it goes up. The second time goes to the next image.
- Normal Or Double page (`l` key): Uses the behavior of double page mode when the width of the image is greater than the height. Otherwise uses the behavior of normal mode.
- Webtoon (`h` key): Displays all images in a chapter one below the other.
- All: Displays all images one below the other.


# Basic principle

The interface is uncluttered and button-free, with only images displayed. Nevertheless, there are numerous keyboard and mouse shortcuts that trigger "commands". For example, going to the next page is a command.

Shortcuts are configured when `htmlviewer` is launched via a config file or/and directory on the command line. For more details, see `htmlviwer -h` or the [online man](https://jonathanpoelen.github.io/manga-viewer/man.html#ch-input.conf) version.

Once the file has been generated, it is no longer possible to modify the shortcuts. You'll need to generate a new file.


# Basic usage

```
htmlviewer ${directories} > view.html
```

Or a version which asks for the directory to load when opening the html file:

```
htmlviewer -a > view.html
```

`view.html` can be used [here](https://jonathanpoelen.github.io/manga-viewer) or downloaded with a right click on the link then "save link as...".

Note that using it directory from the web server is less efficient and takes more memory. For security reasons, a website does not access local disks and opening images stores them in memory in a format that takes up more space than the image itself. This is why it is best to download the file and open it from your machine.

The keyboard and mouse shortcuts are available [here](https://jonathanpoelen.github.io/manga-viewer/shortcuts.html), with `htmlviewer -p` or the `F1` keyboard shortcut.

Read `htmlviewer -h` or the [online version](https://jonathanpoelen.github.io/manga-viewer/man.html) for more options.


# HTTP(S) version limitation

Since a remote site doesn't have access to the machine's local files, and getting the file list from a page requires a user action, the web version has certain limitations:

- The `load` command (`F7`) cannot save the image list, only the current position. You need to re-open the image folder before using it.
- The command `newtab` (`y`, `Y`) will open a base64 encoded file. The file name will not be visible through the url.
- Opening search links (`F8`) in a new tab does not work.


# Default input.conf

```py
# default input.conf
space pgdown_or_next
shift+space pgup_or_prev

space restrict webtoon pgdown_or_next 98
space restrict all pgdown_or_next 98
shift+space restrict webtoon pgup_or_prev 98
shift+space restrict all pgup_or_prev 98

z next -5
x next 5
a next -12
s next 12
q next -30
w next 30
e next -100
r next 100

left prev
right next

ctrl+left  next -5
ctrl+right next 5
ctrl+up    next 12
ctrl+down  next -12

< next_chap -1
> next_chap 1

| prev
\ next
c pgup_or_prev
v prev
b pgup_or_prev 50
n pgdown_or_next 50
. prev
/ pgdown_or_next

m rotate -90
, rotate 90

g goto
^ goto 0
$ goto -1

h mode webtoon
j mode double
k mode normal
l mode normal_or_double

d info
o info

t toggle_auto_scroll
u add_interval -25
i add_interval 25

y newtab
Y newtab foreground

# Mouse shortcuts

left_click pgdown_or_next
shift+left_click pgup_or_prev

ctrl+left_click next_chap
shift+ctrl+left_click next_chap -1

alt+left_click newtab
altgr+left_click newtab

@ mouse_assistance

# extra

F1 shortcuts
F2 shortcuts
F8 search
F10 open

F6 save
F7 load
```
