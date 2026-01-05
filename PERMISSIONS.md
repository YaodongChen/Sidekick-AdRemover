# Permission Justification for Sidekick AdRemover

This document explains why Sidekick AdRemover requires certain permissions.

## Why We Need "Access your data for all websites"

### Technical Requirement
Sidekick AdRemover is an **automatic ad blocker** that removes sidebar advertisements from web pages. To function properly, the extension must:

1. **Detect ad elements** on any website the user visits
2. **Hide ads automatically** without requiring user interaction
3. **Monitor dynamic content** for ads loaded after page load (AJAX, lazy-loading)

### Specific Use Cases

#### 1. Content Script Injection
```json
"content_scripts": [{
  "matches": ["<all_urls>"],
  "js": ["src/content/content.ts"]
}]
```

The content script needs to run on all websites because:
- Users expect ad blocking to work automatically on **any** website they visit
- We cannot predict which websites users will visit
- Specifying individual domains would severely limit functionality

#### 2. What We Actually Do

Our extension ONLY:
- ✅ Scans DOM for ad elements using CSS selectors
- ✅ Hides matching elements by setting `display: none`
- ✅ Monitors for dynamically inserted ads
- ✅ Stores enable/disable preferences locally

We DO NOT:
- ❌ Send any data to external servers
- ❌ Track user browsing history
- ❌ Modify page content beyond hiding ads
- ❌ Inject scripts or ads
- ❌ Access sensitive user data

### Code Transparency

The core functionality is minimal and transparent:

```typescript
// All we do is hide elements matching ad selectors
function scanAndClean(): void {
  AD_SELECTORS.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      (el as HTMLElement).style.display = 'none';
    });
  });
}
```

### Alternative Approaches Considered

1. **activeTab**: Would require users to click the extension icon on every page - defeats the purpose of automatic ad blocking
2. **Specific domains**: Would limit the extension to only a few websites (e.g., only Dealmoon.com)
3. **optional_host_permissions**: Would require users to manually grant permission for each website

None of these alternatives provide the seamless, automatic experience users expect from an ad blocker.

## Other Permissions

### storage
**Why needed**: To remember user preferences (enable/disable per domain)
**What we store**: Only domain enable/disable state (e.g., `{"example.com": false}`)

### activeTab
**Why needed**: To detect current tab's domain for enable/disable toggle
**What we access**: Only the current domain name, no page content

## Privacy Commitment

- **No network requests**: The extension works 100% offline
- **No data collection**: We don't collect, transmit, or sell any user data
- **No analytics**: No tracking, no telemetry
- **Open source**: All code is publicly available for inspection

## Questions?

If you have concerns about permissions, please:
1. Review our [Privacy Policy](PRIVACY.md)
2. Inspect the source code on [GitHub](https://github.com/yourusername/sidekick-adremover)
3. Open an issue for questions
