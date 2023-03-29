// ==UserScript==
// @name         Upwork Job Filter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://www.upwork.com/nx/find-work*
// @match        *://www.upwork.com/nx/jobs/search*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=upwork.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

        const banned = ['India', 'Pakistan', 'Bangladesh','Kenya','Nigeria','Australia',
                        'Congo','Jamaica','Vietnam','Indonesia','United Arab Emirates','Malaysia',
                       'Egypt','New Zealand','Turkey','Saudi Arabia','Thailand', 'Singapore',
                        'South Korea','South Africa','Philippines','Hong Kong','China'

                       ];

    function removeSections() {
        const sections = document.getElementsByTagName('section');
        for (let i = 0; i < sections.length; i++) {
            const sec = sections[i];
            const html = sec.innerHTML;
            let done = false;
            for (let j = 0; j < banned.length; j++) {
                if (!done && html.includes(banned[j])) {
                    sec.style.display = 'none';
                    done = true;
                }
            }
        }
    }

    function addLoadMoreListener() {
        const loadMoreButton = document.querySelector('[data-test="load-more-button"]');
        if (loadMoreButton) {
            loadMoreButton.addEventListener('click', () => {
                setTimeout(() => {
                    removeSections();
                    addLoadMoreListener();
                }, 2000);
            });
        }
    }

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length > 0) {
                removeSections();
                addLoadMoreListener();
            }
        });
    });

    const targetNode = document.querySelector('body');
    observer.observe(targetNode, { childList: true, subtree: true });
})();
