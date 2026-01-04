/**
 * Generates a unique CSS selector for a given HTMLElement.
 * Refined to avoid overly broad selectors like 'body' or 'html'.
 */
export function getUniqueSelector(el) {
    // 1. Prioritize stable IDs that don't look like auto-generated hashes (e.g., avoid "dm-123")
    if (el.id && !/\d/.test(el.id)) {
        return `#${CSS.escape(el.id)}`;
    }
    // 2. Look for specific ad-related classes
    const adKeywords = ['ad', 'promo', 'banner', 'sidebar', 'widget', 'sponsor'];
    for (const className of Array.from(el.classList)) {
        if (adKeywords.some(key => className.toLowerCase().includes(key))) {
            return `.${CSS.escape(className)}`;
        }
    }
    const path = [];
    let current = el;
    // 3. Traverse up the DOM tree but stop before reaching body/html
    while (current && current.tagName !== 'BODY' && current.tagName !== 'HTML') {
        let selector = current.tagName.toLowerCase();
        // Fix: Explicitly type parent to avoid 'implicitly has any type' error
        const parent = current.parentElement;
        if (parent) {
            // Find index among siblings with the same tag
            const siblings = Array.from(parent.children).filter((child) => child.tagName === current?.tagName);
            if (siblings.length > 1) {
                const index = siblings.indexOf(current) + 1;
                selector += `:nth-of-type(${index})`;
            }
        }
        path.unshift(selector);
        current = parent;
        // Break early if we found a reasonably unique ID higher up
        if (current?.id && !/\d/.test(current.id)) {
            path.unshift(`#${CSS.escape(current.id)}`);
            break;
        }
        // Prevent selectors that are too deep and unstable
        if (path.length > 5)
            break;
    }
    return path.join(' > ');
}
//# sourceMappingURL=selector.js.map