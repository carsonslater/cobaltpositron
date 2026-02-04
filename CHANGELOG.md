# Change Log

All notable changes to the "cobaltpositron" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.1.4]

### Changed:

- Made the following changes to the menu and other activity bars:

```
"tab.inactiveBackground": "#002240",
"tab.inactiveForeground": "#ffffff",
"tab.activeBackground": "#013664",
"tab.activeForeground": "#002240",
"editorGroupHeader.tabsBackground": "#002240",
"activityBar.background": "#002240",
"statusBar.background": "#013664",
"sideBar.background": "#002240",
"titleBar.activeBackground": "#002240"
```
- Updated the new README.md to reflect the new aesthetics.

## [0.1.5]

### Removed:

- Removed these because they were bad.

```
"tab.inactiveBackground": "#002240",
"tab.inactiveForeground": "#ffffff",
"tab.activeBackground": "#013664",
"tab.activeForeground": "#002240",
"editorGroupHeader.tabsBackground": "#002240",
"activityBar.background": "#002240",
"statusBar.background": "#013664",
"sideBar.background": "#002240",
"titleBar.activeBackground": "#002240"
```
## [0.1.6]

### Added:

A ./media/latex-dark.css file containing:

/* Making LaTeX render white in Quarto preview */
.math.inline,
.math.display,
.katex {
    color: white !important;
}

## [0.1.7]

### Removed:

A ./media/latex-dark.css file containing:

/* Making LaTeX render white in Quarto preview */
.math.inline,
.math.display,
.katex {
    color: white !important;
}

The thing I was trying to do broke the theme, so I basically reverted backt o 0.1.5.

## [0.1.8]

### Fixed:

- Fixed Quarto math preview color in dark mode (rendered white for better visibility on navy background).
- Added essential workbench colors to improve readability of math hovers and previews.
