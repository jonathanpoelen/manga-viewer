`htmlviewer` is a tool that generates html viewer from image directories. The generated file be can opened with any web browser. `htmlviewer-gui` is simple wrapper which uses `zenity` as GUI.

It's main advantage is that it uses one and the same key to scroll and go to the next image (space by default), the behavior of which changes according to 3 reading modes:

- Normal mode (`k` key): Go to the next image when the scroll is at the bottom.
- Double page mode (`j` key): The first time the scroll is at the bottom, it goes up. The second time goes to the next image.
- Weebton page mode (`h` key): Displays all images one under the other by chapter.
- Single page mode: Displays all images one under the other.

`htmlviewer` has several commands that can be associated with shortcuts.


# Basic usage:

```
htmlviewer ${directories} > view.html
```

The default shortcuts are displayed with `htmlviewer -p`.

Read `htmlviewer -h` for more options.
