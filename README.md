`htmlviewer` is a tool that generates html viewer from image directories. The generated file be can opened with any web browser. `htmlviewer-gui` is simple wrapper which uses `zenity` as GUI.

It's main advantage is that it uses one and the same key to scroll and go to the next image (space by default), the behavior of which changes according to 4 reading modes:

- Normal (`k` key): Display one image at a time.
- Double page (`j` key): The first time the scroll is at the bottom, it goes up. The second time goes to the next image.
- Weebton (`h` key): Displays all images in a chapter one below the other.
- All: Displays all images one below the other.

`htmlviewer` has several commands that can be associated with shortcuts.


# Basic usage:

```
htmlviewer ${directories} > view.html
```

The default shortcuts are displayed with `htmlviewer -p`.

Read `htmlviewer -h` for more options.
