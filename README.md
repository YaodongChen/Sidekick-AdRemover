# Sidekick AdRemover

> Free sidebar ad blocker. No setup required - just install and browse.

A lightweight, privacy-first Chrome extension that automatically removes **sidebar ads** to reduce visual noise and provide a cleaner, more focused reading experience.

**Note:** This extension specifically targets **sidebar advertising** to minimize distractions while reading. It does not block banner ads, header ads, or in-content advertising. We respect the advertising industry's role in supporting free content—our goal is simply to enhance reading comfort by reducing peripheral visual clutter.

[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green.svg)](https://chrome.google.com/webstore)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## ✨ Features

- **🚀 Zero Setup** - Works immediately after installation, no configuration needed
- **💯 Completely Free** - No premium features, no paywalls, no subscriptions
- **🔒 Privacy-First** - No tracking, no data collection, no external requests
- **⚡ Ultra-Lightweight** - Just ~4 KB total size, won't slow down your browser
- **📖 Clean Reading Experience** - Reduces visual noise by removing sidebar distractions
- **🎯 Sidebar-Focused Blocking** - Automatically detects and removes:
  - Sidebar advertisements
  - Right-panel promotional content
  - Google AdSense in sidebars
  - iframe ads in sidebar areas
  - Common sidebar ad networks
- **🎮 Simple Controls** - Toggle on/off per website with one click
- **🔄 Automatic Sync** - Your preferences sync across all your Chrome devices

**What it doesn't block:** Banner ads, header ads, in-content ads, or video ads. This extension is designed specifically for sidebar ad removal to maintain a balanced browsing experience.

## 📦 Installation

### For Users

1. Download the latest release from the [Chrome Web Store](https://chrome.google.com/webstore) *(coming soon)*
2. Or install manually:
   - Download the latest release ZIP
   - Extract to a folder
   - Open Chrome and go to `chrome://extensions`
   - Enable "Developer mode" (top right)
   - Click "Load unpacked"
   - Select the extracted folder

### For Developers

```bash
# Clone the repository
git clone https://github.com/yourusername/sidekick-adremover.git
cd sidekick-adremover

# Install dependencies
npm install

# Build the extension
npm run build

# Load the extension in Chrome
# 1. Open chrome://extensions
# 2. Enable "Developer mode"
# 3. Click "Load unpacked"
# 4. Select the dist/ folder
```

## 🎯 Usage

### Basic Usage

1. **Install** the extension
2. **Browse normally** - ads are removed automatically
3. **Click the icon** to toggle on/off for specific sites

That's it! No configuration needed.

### Toggle Per Website

- Click the Sidekick extension icon in your toolbar
- Use the toggle switch to enable/disable for the current website
- The page will reload automatically with your preference saved

## 🛠️ Development

### Prerequisites

- Node.js 16+ and npm
- Chrome browser

### Development Setup

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev

# Build for production
npm run build

# TypeScript type checking
npm run tsc
```

### Development Workflow

1. Make changes to source files in `src/`
2. Run `npm run dev` for development with hot reload
3. Load `dist/` folder in Chrome (`chrome://extensions`)
4. Changes auto-reload in the extension
5. Test on websites with ads

### Project Structure

```
CleanRead/
├── public/
│   ├── icon.png              # Extension icon (128x128)
│   └── icon.svg              # SVG source
│
├── src/
│   ├── content/
│   │   └── content.ts        # Content script (ad detection & removal)
│   │
│   ├── popup/
│   │   ├── popup.html        # Popup UI
│   │   ├── popup.ts          # Popup logic
│   │   └── popup.css         # Popup styles
│   │
│   └── types/
│       └── index.ts          # TypeScript type definitions
│
├── manifest.json             # Chrome Extension manifest
├── vite.config.ts            # Vite build configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## 🔧 Technical Details

### Built With

- **TypeScript** (strict mode)
- **Vite** - Fast build tool
- **@crxjs/vite-plugin** - Chrome extension bundler
- **Manifest V3** - Latest Chrome extension standard

### Performance

- **Initial scan**: <50ms (non-negotiable requirement)
- **Dynamic detection**: <200ms
- **Bundle size**: ~4 KB
- **Memory footprint**: <5 MB

### Ad Detection

The extension uses hardcoded CSS selectors to target common ad patterns:

```typescript
// Sidebar ads
'.area_right iframe'
'.area_right ins.adsbygoogle'

// Generic ads
'iframe[src*="doubleclick"]'
'div[id^="google_ads"]'
'ins.adsbygoogle'
```

Uses `MutationObserver` with 100ms debouncing to catch dynamically loaded ads.

### Storage

- Uses `chrome.storage.sync` for per-domain preferences
- Format: `{ "example.com": true }` (true = enabled, false = disabled)
- Default state: enabled for all domains
- Syncs automatically across Chrome devices

## 🎨 Customization

### Adding Custom Selectors

Edit `src/content/content.ts`:

```typescript
const CUSTOM_SELECTORS = [
  '.your-ad-class',
  '#your-ad-id'
];
```

### Changing Performance Thresholds

Edit performance requirements in `src/content/content.ts`:

```typescript
const debouncedScan = debounce(scanAndClean, 100); // Change debounce time
```

## 📝 Build Scripts

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build

# TypeScript compilation only
npm run tsc
```

## 🔒 Privacy

- **No tracking** - We don't track what you browse
- **No data collection** - Zero telemetry or analytics
- **No external requests** - Everything runs locally
- **No account required** - Anonymous usage
- **Open source** - Verify the code yourself

## 💡 Our Philosophy

We recognize that advertising supports the free web and content creators. Sidekick AdRemover is not designed to harm publishers or the advertising ecosystem. Instead, it focuses on a specific pain point: **sidebar visual clutter** that can distract from the main content.

**Why sidebar ads specifically?**
- Sidebars are peripheral to the reading experience
- They often contain animated or eye-catching elements that draw attention away from content
- Removing them reduces visual noise without impacting the publisher's primary ad placements
- This creates a more focused, comfortable reading environment while maintaining a balanced approach to ad blocking

**We encourage users to:**
- Support their favorite websites through other means (subscriptions, donations, Patreon)
- Disable Sidekick on sites where sidebar ads are non-intrusive
- Understand that content creation requires sustainable revenue models

## 🌐 Browser Support

- **Chrome**: 120+ (recommended)
- **Edge**: Chromium-based versions
- **Brave**: Chromium-based versions
- **Opera**: Chromium-based versions

*Note: Currently optimized for Chrome. Other Chromium browsers may work but are untested.*

## 🐛 Troubleshooting

### Ads Still Showing?

1. Try toggling the extension off and on for that website
2. Hard refresh the page (`Cmd+Shift+R` on Mac, `Ctrl+Shift+F5` on Windows)
3. Check if the extension is enabled in `chrome://extensions`

### Extension Not Working?

1. Verify you loaded the `dist/` folder, not the root folder
2. Check for errors in Chrome DevTools console
3. Try removing and re-adding the extension
4. Make sure you're running Chrome 120+

### Performance Issues?

The extension is designed to be ultra-lightweight. If you experience issues:

1. Check Chrome Task Manager (`Shift+Esc`) to verify memory usage
2. Disable other extensions to identify conflicts
3. Report the issue with details about your setup

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript strict mode
- Maintain <50ms performance for ad scanning
- No external API calls (privacy requirement)
- Add comments for complex logic
- Test on multiple websites

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Bundled with [@crxjs/vite-plugin](https://crxjs.dev/vite-plugin)
- Icons designed with care for clarity

## 📧 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/sidekick-adremover/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/sidekick-adremover/discussions)

---

**Made with ❤️ for a cleaner web**

*Big protection, tiny footprint.*
