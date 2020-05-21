# active-svg
JavaScript library for enhancing SVG images

The library provides extra functionality to SVG images by setting four types of shapes and adding associated behaviours:

displayX - define rectangular boundaries depending on the size of the SVG container size i.e. Thumb, Small, Medium and Large
popup - shapes that are outside of the displays and move under a popuplink on click events
popuplink - shapes that link to pupups
maplink - link to another map. This link will load another map to replace the current within the same container.

The different types of shapes have the following attributes:

< g data-asvg-display ='SMLT size' ... >

< g data-asvg-popupid ='popup id' onclick="" ... >

< g data-asvg-popuplink='popup id' onclick="handlePopupLinkClick(this);" ... >

< g data-asvg-maplink ='map id' onclick="handleMapLinkClick(this);" ... >

To include an active SVG inside a page, the following markup shall be used:

< div data-asvg='svg id' ... >
