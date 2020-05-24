# active-svg
JavaScript library for enhancing SVG images

The library provides extra functionality to SVG images by defining four types of shapes and adding associated behaviours:

* display[TSML] - define rectangular boundaries to be fit within the view depending on the size of the SVG container size i.e. Thumb, Small, Medium and Large

* popup     - shapes that are hidden and show upon clicking a popuplink

* popuplink - shapes that show pupups

* pagelink  - link to another SVG. It will load another SVG to replace the current one within the same container

To use enhanced SVG files, need a repository of SVG file. The SVG files are identified by file name (svg id). The SVG will be loaded by the script within a container (DIV tag) and modified on-fly.

To use the library, need to add the folowing code within a page:

...<link rel="stylesheet" type="text/css" href="./dist_css/boundle.production.min.css">

...<script> var ASVG_CONF={ repository:"./maps/" };</script>

...<script src="./dist_js/boundle.production.min.js"></script>

Then, within the page can include enhanced SVG via the following code:

...< div data-asvg='svg id' ... >

The different types of shapes within a SVG shall have the following attributes:

...< g data-asvg-display ='SMLT size' ... >

...< g data-asvg-popupid ='popup id' onclick="" ... >

...< g data-asvg-popuplink='popup id' onclick="handlePopupLinkClick(this);" ... >

...< g data-asvg-maplink ='map id' onclick="handleMapLinkClick(this);" ... >
