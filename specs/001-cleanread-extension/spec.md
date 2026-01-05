# Feature Specification: CleanRead - Automatic Sidebar Ad Blocker

**Feature Branch**: `001-cleanread-extension`
**Created**: 2026-01-03
**Status**: Draft
**Input**: User description: "Automatic sidebar ad blocker for Dealmoon.com and StackOverflow.com"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Automatic Ad Blocking on Page Load (Priority: P1)

A user visits Dealmoon.com or StackOverflow.com and is immediately presented with a clean reading experience without sidebar ads. The ads are removed silently without any user interaction required.

**Why this priority**: This is the core value proposition of CleanRead. Users expect an immediate, zero-configuration solution that removes distractions the moment they visit supported websites. This delivers instant value and requires no learning curve.

**Independent Test**: Can be fully tested by installing the extension, navigating to dealmoon.com or stackoverflow.com, and verifying that sidebar ads are hidden within 100ms of page load. This story alone creates a complete, usable product.

**Acceptance Scenarios**:

1. **Given** a user visits dealmoon.com with CleanRead installed, **When** the page loads, **Then** all elements matching `.area_right`, `.ad-container`, and `[class*="ad-"]` are hidden within 100ms
2. **Given** a user visits stackoverflow.com with CleanRead installed, **When** the page loads, **Then** all elements matching `#sidebar .s-sidebarwidget--yellow` and `.everyonelovesstackoverflow` are hidden within 100ms
3. **Given** a page contains generic ad iframes, **When** the page loads, **Then** elements matching `iframe[src*="doubleclick"]` and `div[id^="google_ads"]` are hidden
4. **Given** the extension is installed and enabled, **When** a user navigates between pages on supported sites, **Then** ads are consistently hidden on every page load
5. **Given** CleanRead is disabled for a site, **When** the page loads, **Then** no ad blocking occurs and all content remains visible

---

### User Story 2 - Dynamic Ad Detection (Priority: P2)

A user is browsing a single-page application or a site with infinite scroll where ads are inserted dynamically after the initial page load. The extension detects and hides these ads automatically as they appear.

**Why this priority**: Modern websites frequently load ads dynamically to bypass traditional ad blockers. This capability ensures CleanRead works reliably on sites using lazy loading, infinite scroll, or JavaScript-based ad insertion. It depends on the initial ad blocking (P1) being implemented first.

**Independent Test**: Can be tested by visiting a site with dynamic content loading (e.g., scrolling on StackOverflow to trigger lazy-loaded widgets), and verifying that dynamically inserted ads matching the selectors are hidden within 200ms of appearing in the DOM.

**Acceptance Scenarios**:

1. **Given** a user is on a page with existing filters applied, **When** new ad elements are inserted into the DOM via JavaScript, **Then** those elements are detected and hidden within 200ms
2. **Given** a single-page application navigates to a new view, **When** the new content includes ad elements matching the selectors, **Then** those ads are automatically hidden
3. **Given** a user scrolls on an infinite-scroll page, **When** new content with ads is loaded, **Then** the ads are hidden before becoming visible to the user
4. **Given** the MutationObserver detects DOM changes, **When** multiple changes occur rapidly, **Then** the observer is throttled with 100ms debounce to prevent performance degradation

---

### User Story 3 - Simple On/Off Control (Priority: P3)

A user wants to temporarily disable CleanRead on a specific website to see the original content, including ads. They can toggle the extension off for that domain and reload the page to restore all content.

**Why this priority**: Some users may occasionally want to see the full page content or verify that CleanRead is working correctly. This provides essential control without adding complexity. It's an enhancement to the core filtering functionality.

**Independent Test**: Can be tested by visiting a supported site, opening the extension popup, toggling "Enable CleanRead on this site" to OFF, and verifying that the page reloads with all ads visible. Then toggle back to ON and verify ads are hidden again.

**Acceptance Scenarios**:

1. **Given** a user is on dealmoon.com with CleanRead enabled, **When** they open the popup and toggle the extension OFF for this site, **Then** the page reloads and all ads become visible
2. **Given** CleanRead is disabled for a domain, **When** the user toggles it back ON, **Then** the page reloads and ads are hidden again
3. **Given** a user opens the extension popup, **When** they view the toggle, **Then** it correctly reflects the current state (ON/OFF) for the current domain
4. **Given** a user disables CleanRead on one domain, **When** they navigate to a different supported domain, **Then** CleanRead remains enabled on the new domain (per-domain state is independent)
5. **Given** the popup is displayed, **When** the user toggles the state, **Then** the new state is persisted immediately in chrome.storage.sync

---

### Edge Cases

- What happens when a website updates its HTML structure and the CSS selectors no longer match?
  - Ads may reappear until selectors are updated in a new extension version
  - Users can report issues or submit updated selectors for future releases

- How does the system handle CSS selector conflicts with legitimate page content?
  - Hardcoded selectors are designed to target known ad containers
  - If legitimate content is hidden, users can disable CleanRead for that domain

- What happens when MutationObserver triggers on very dynamic pages with frequent DOM changes?
  - Observer is throttled with 100ms debounce to prevent performance issues
  - Performance budget ensures observer callbacks complete within 50ms

- How does the extension perform on pages with thousands of DOM elements?
  - CSS selector queries are optimized and run once on load plus debounced on mutations
  - Performance testing validates <50ms initial scan time

- What happens when a user has CleanRead installed but visits an unsupported website?
  - Extension remains dormant with no performance impact
  - No ads are hidden, but generic selectors (doubleclick, google_ads) may still match

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST scan DOM on page load for hardcoded ad selectors
- **FR-002**: System MUST apply `display: none` to all matching ad elements within 50ms of page load
- **FR-003**: System MUST use MutationObserver to detect dynamically inserted ad elements
- **FR-004**: System MUST hide dynamically detected ads within 200ms of their insertion
- **FR-005**: System MUST throttle MutationObserver callbacks with 100ms debounce to prevent performance issues
- **FR-006**: System MUST target Dealmoon.com selectors: `.area_right`, `.ad-container`, `[class*="ad-"]`
- **FR-007**: System MUST target StackOverflow.com selectors: `#sidebar .s-sidebarwidget--yellow`, `.everyonelovesstackoverflow`
- **FR-008**: System MUST target generic ad selectors: `iframe[src*="doubleclick"]`, `div[id^="google_ads"]`
- **FR-009**: System MUST provide a popup UI with a single toggle: "Enable CleanRead on this site"
- **FR-010**: System MUST default the toggle to ON for all domains
- **FR-011**: System MUST reload the current tab when the toggle state changes
- **FR-012**: System MUST store per-domain enable/disable state in chrome.storage.sync
- **FR-013**: System MUST persist state in the format: `{ "dealmoon.com": true, "stackoverflow.com": true }`
- **FR-014**: System MUST check domain state before running ad detection on page load
- **FR-015**: System MUST NOT run ad detection when CleanRead is disabled for the current domain
- **FR-016**: System MUST function entirely offline without external API calls
- **FR-017**: System MUST NOT leak memory or accumulate observers on single-page application navigation
- **FR-018**: System MUST produce no console errors on target sites (dealmoon.com, stackoverflow.com)

### Key Entities

- **Ad Selector**: Hardcoded CSS selector targeting known ad elements
  - Domain-specific selectors for Dealmoon and StackOverflow
  - Generic selectors for common ad networks (doubleclick, google_ads)
  - Applied via `querySelectorAll()` and hidden with `display: none`

- **Domain State**: Per-domain enable/disable configuration
  - Stored in chrome.storage.sync as boolean value
  - Key format: domain name (e.g., "dealmoon.com")
  - Default value: true (enabled)
  - Controls whether ad detection runs on that domain

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Ads are hidden within 100ms of page load on dealmoon.com and stackoverflow.com (measured from DOMContentLoaded event)
- **SC-002**: Dynamically inserted ads are caught and hidden within 200ms of their DOM insertion
- **SC-003**: Popup toggle changes state instantly and reloads the tab within 100ms
- **SC-004**: No console errors occur when browsing dealmoon.com and stackoverflow.com with CleanRead enabled
- **SC-005**: Initial DOM scan completes in under 50ms even on pages with 1000+ elements
- **SC-006**: MutationObserver callbacks are debounced to run at most once per 100ms
- **SC-007**: Extension memory footprint remains under 5MB during normal operation
- **SC-008**: Domain state persists across browser sessions with 100% reliability
- **SC-009**: Extension bundle size remains under 50KB (packaged)

## Assumptions

1. **Browser Compatibility**: Extension targets Chrome 120+ with full Manifest V3 support
2. **CSS Selector Stability**: Target websites maintain reasonably stable selectors; if sites restructure, extension updates may be required
3. **No AI Detection**: Ad detection relies on hardcoded selectors, not machine learning or heuristics
4. **Privacy-First**: All functionality runs locally; no data leaves the browser
5. **Limited Site Support**: v1 targets only dealmoon.com and stackoverflow.com plus generic ad selectors
6. **Performance Budget**: 50ms initial scan time assumes typical webpage with <5000 DOM elements
7. **User Tolerance**: Users understand that some ads may not be caught if they use non-standard selectors
8. **Single-User Scope**: No team sharing or cloud backup beyond Chrome sync
9. **No Manual Selection**: Users cannot add custom selectors; must rely on hardcoded rules
10. **Reload on Toggle**: Toggle changes require a page reload; no live enable/disable without refresh

## Dependencies

- Chrome Extension API (Manifest V3) for browser integration
- Chrome Storage Sync API for cross-device domain state persistence
- Content Scripts API for DOM manipulation and ad hiding
- MutationObserver API for dynamic content detection
- Vite + @crxjs/vite-plugin for development and bundling

## Out of Scope (v1)

- Manual element selection or custom CSS selector input
- Blur mode (only hide mode via `display: none`)
- AI-powered ad detection
- Settings page for managing selectors or advanced configuration
- Whitelist management beyond per-domain toggle
- Import/export of configurations
- Support for additional websites beyond Dealmoon and StackOverflow
- Visual rule editor or selector builder
- Hover-to-preview functionality
- Undo/redo for toggle changes
- Analytics or usage statistics
- Support for browsers other than Chrome
- Regex or advanced pattern matching for selectors
- Automatic selector updates or cloud-based selector database
