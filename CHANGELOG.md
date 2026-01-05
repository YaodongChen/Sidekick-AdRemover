# Changelog

All notable changes to Sidekick AdRemover will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-04

### Added
- Initial release of Sidekick AdRemover
- Automatic sidebar ad blocking
- Support for Dealmoon.com and StackOverflow.com
- Generic ad blocking (Google AdSense, DoubleClick, etc.)
- Per-domain toggle (enable/disable per website)
- Chrome storage sync for preferences
- MutationObserver for dynamic ad detection
- Ultra-lightweight build (~4 KB)
- Privacy-first design (no external requests)
- Zero-configuration setup

### Performance
- Initial ad scan: <50ms
- Dynamic ad detection: <200ms
- MutationObserver debounce: 100ms
- Memory footprint: <5 MB

### Technical
- TypeScript with strict mode
- Vite build system
- Manifest V3 compliance
- @crxjs/vite-plugin for bundling

---

## [Unreleased]

### Planned Features
- Support for more websites
- User-defined custom selectors (optional)
- Statistics dashboard (optional)
- Export/import settings (optional)

---

## Version Guidelines

- **MAJOR** version for incompatible API changes or major rewrites
- **MINOR** version for new features in a backward-compatible manner
- **PATCH** version for backward-compatible bug fixes

---

**Legend:**
- `Added` - New features
- `Changed` - Changes in existing functionality
- `Deprecated` - Soon-to-be removed features
- `Removed` - Removed features
- `Fixed` - Bug fixes
- `Security` - Security fixes
