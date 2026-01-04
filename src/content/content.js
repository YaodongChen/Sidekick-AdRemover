"use strict";
/**
 * CleanRead: Automatic Sidebar Ad Blocker
 * Detects and hides sidebar ads on Dealmoon.com and StackOverflow.com
 */
// Ad selectors - targeting only actual ads, not all sidebar content
const DEALMOON_SELECTORS = [
    '.area_right iframe', // iframe ads in right sidebar
    '.area_right ins.adsbygoogle', // Google AdSense
    '.area_right [class*="ad-"]', // Elements with 'ad-' in class name
    '.area_right [id*="google_ads"]' // Google ads by ID
];
const STACKOVERFLOW_SELECTORS = [
    '#sidebar .everyonelovesstackoverflow',
    '#sidebar .s-sidebarwidget--yellow'
];
const GENERIC_SELECTORS = [
    'iframe[src*="doubleclick"]',
    'div[id^="google_ads"]',
    'ins.adsbygoogle'
];
const AD_SELECTORS = [
    ...DEALMOON_SELECTORS,
    ...STACKOVERFLOW_SELECTORS,
    ...GENERIC_SELECTORS
];
/**
 * Get the current domain from window.location
 */
function getCurrentDomain() {
    return window.location.hostname;
}
/**
 * Scan DOM and hide all matching ad elements
 * Performance requirement: <50ms
 */
function scanAndClean() {
    AD_SELECTORS.forEach(selector => {
        try {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.style.display = 'none';
            });
        }
        catch (e) {
            // Invalid selector - skip silently
        }
    });
}
/**
 * Debounce helper to throttle MutationObserver callbacks
 * @param fn Function to debounce
 * @param delay Delay in milliseconds (100ms per spec)
 */
function debounce(fn, delay) {
    let timeoutId;
    return () => {
        if (timeoutId !== undefined) {
            clearTimeout(timeoutId);
        }
        timeoutId = window.setTimeout(() => fn(), delay);
    };
}
/**
 * Initialize CleanRead on page load
 */
(async () => {
    const domain = getCurrentDomain();
    // Check if CleanRead is enabled for this domain
    chrome.storage.sync.get(domain, (data) => {
        const isEnabled = data[domain] !== false; // Default: ON (true)
        if (!isEnabled) {
            return;
        }
        // Initial scan on page load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', scanAndClean);
        }
        else {
            scanAndClean();
        }
        // Watch for dynamically inserted ads
        // Debounced to 100ms per performance requirements
        const debouncedScan = debounce(scanAndClean, 100);
        const observer = new MutationObserver(debouncedScan);
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        // Cleanup on page unload to prevent memory leaks
        window.addEventListener('beforeunload', () => {
            observer.disconnect();
        });
    });
})();
//# sourceMappingURL=content.js.map