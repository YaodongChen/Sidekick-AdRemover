# Debug Mode - Highlight Ads Instead of Hiding

To debug which elements are being targeted, temporarily change the `scanAndClean()` function:

## In src/content/content.ts

Replace this:
```typescript
(el as HTMLElement).style.display = 'none';
```

With this (highlight in red border):
```typescript
(el as HTMLElement).style.border = '3px solid red';
(el as HTMLElement).style.boxSizing = 'border-box';
```

Or use a red overlay:
```typescript
const overlay = document.createElement('div');
overlay.style.cssText = `
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 0, 0, 0.3);
  pointer-events: none;
  z-index: 9999;
`;
(el as HTMLElement).style.position = 'relative';
(el as HTMLElement).appendChild(overlay);
```

Then rebuild and reload the extension. You'll see red borders/overlays on elements that would be hidden.

## Find the Right Selector

1. Right-click the highlighted element in the browser
2. Choose "Inspect"
3. Look at the element's classes, IDs, and structure
4. Update AD_SELECTORS in content.ts with more specific selectors
5. Rebuild: `npm run build`
6. Reload extension in chrome://extensions

## Useful DevTools Commands

In the browser console:
```javascript
// See all .area_right children
document.querySelectorAll('.area_right > *')

// Check if element matches selector
document.querySelector('.area_right iframe')

// Get element info
const el = document.querySelector('YOUR_SELECTOR');
console.log({
  tag: el.tagName,
  classes: el.className,
  id: el.id,
  html: el.outerHTML
});
```
