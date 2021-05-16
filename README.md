`htmlviewer` is a tool that generates html viewer from images directories. `htmlviewer-gui` is simple wrapper which uses `zenity` as the GUI.

It's main advantage is that it only uses one and the same key to scroll and go to the next page (space by default), the behavior of which changes according to 3 reading modes:

- normal mode: Go to the next image when the scroll is at the bottom.
- double page mode: The first time the scroll is at the bottom, it goes up. The second time goes to the next image.
- single page mode: Displays all images one under the other.

It also has about ten commands which can be associated with shortcuts.

# Basic usage:

```
htmlviewer ${directories} > view.html
```

The default shortcuts are displayed with `htmlviewer -p`.

Read `htmlviewer -h` for more options.
