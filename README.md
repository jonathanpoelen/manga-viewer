`htmlviewer` is a tool that generates html file from image directories. The generated file be can opened with any web browser. `htmlviewer-gui` is simple wrapper which uses `zenity` as GUI. A standalone html file is available [here](https://jonathanpoelen.github.io/manga-viewer).

It's main advantage is that it uses one and the same key to scroll and go to the next image (space or left click by default), the behavior of which changes according to 4 reading modes:

- Normal (`k` key): Display one image at a time.
- Double page (`j` key): The first time the scroll is at the bottom, it goes up. The second time goes to the next image.
- Webtoon (`h` key): Displays all images in a chapter one below the other.
- All: Displays all images one below the other.

`htmlviewer` has several commands that can be associated with shortcuts.


# Basic usage:

```
htmlviewer ${directories} > view.html
```

Or a version which asks for the files to load when opening the html file:

```
htmlviewer -a > view.html
```

`view.html` can be directly downloaded [here](https://jonathanpoelen.github.io/manga-viewer) (right click -> save link as...).

Note that using it directly from the web server is less efficient and takes more memory. For security reasons, a website does not access local disks and opening images stores them in memory in a format that takes up more space than the image itself. This is why it is best to download the file and open it from your machine.

The default shortcuts are displayed with `htmlviewer -p` or `F1`.

Read `htmlviewer -h` for more options.


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
c pgup_or_prev
v prev
b pgup_or_prev
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
F8 search
F10 open

F6 save
F7 load
```
