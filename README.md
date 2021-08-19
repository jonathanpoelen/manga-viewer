`htmlviewer` is a tool that generates html file from image directories. The generated file be can opened with any web browser. `htmlviewer-gui` is simple wrapper which uses `zenity` as GUI.

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

The default shortcuts are displayed with `htmlviewer -p`.

Read `htmlviewer -h` for more options.

# Default input.conf

```py
# default input.conf
space pgdown_or_next
shift+space pgup_or_prev

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

h mode webtoon
j mode double
k mode normal

d info
o info

t toggle_auto_scroll
u add_interval -25
i add_interval 25

# Mouse shortcuts

left_click pgdown_or_next
shift+left_click pgup_or_prev

ctrl+left_click next_chap
shift+ctrl+left_click next_chap -1

@ mouse_assistance
```
