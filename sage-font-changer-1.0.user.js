// ==UserScript==
// @name         SAGE Font Changer
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adjusts font size and family in SAGE
// @author       Quindar
// @match        https://*.based.staratlas.com/
// @grant        none
// ==/UserScript==

/*
    This script is provided as-is without any warranties. Use at your own risk.
    The authors are not responsible for any damages or issues that may arise from using this script.
*/

(function() {
    'use strict';

    // --------------------------------------------------------------------------------------------------------------
    // Configuration
    // --------------------------------------------------------------------------------------------------------------
    const configMode = 'normal';                     // normal:      Only replace font in input fields
                                                     // aggressive:  Replace all fonts between aggressiveMinFontSize
                                                     //                and aggressiveMaxFontSize

    const aggressiveMinFontSize = 10;                // Minimum font size for aggressive mode
    const aggressiveMaxFontSize = 14;                // Maximum font size for aggressive mode

    const newFontSize = 13;                          // The font size to use when replacing

    // const newFontFamily = 'original';             // Keep the original SAGE font (Industry, sans-serif)
    // const newFontFamily = 'Arial, sans-serif';    // Use Arial font
    // const newFontFamily = 'Consolas, monospace';  // Use Consolas font
    const newFontFamily = 'Tahoma, sans-serif';      // Use Tahoma font (default)
    // const newFontFamily = 'Verdana, sans-serif';  // Use Verdana font
    // --------------------------------------------------------------------------------------------------------------

    // Function to apply new styles to elements
    function applyFontStyle() {
        const elements = document.querySelectorAll('*');
        elements.forEach(function(element) {
            const computedStyle = window.getComputedStyle(element);
            const fontSize = parseFloat(computedStyle.fontSize);

            // Always change font for input fields
            if (element.tagName.toLowerCase() === 'input') {
                element.style.fontFamily = newFontFamily;
            }

            // Apply font changes in aggressive mode
            if (configMode === 'aggressive' && fontSize >= aggressiveMinFontSize && fontSize <= aggressiveMaxFontSize) {
                element.style.fontSize = newFontSize + 'px';
                element.style.fontFamily = newFontFamily;
            }
        });
    }

    // Apply styles initially
    applyFontStyle();

    // Observe the document and apply styles to new elements that get added dynamically
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function() {
            applyFontStyle();
        });
    });

    // Start observing for changes in the document
    observer.observe(document.body, { childList: true, subtree: true });
})();
