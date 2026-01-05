# CleanRead Constitution
<!--
Sync Impact Report:
Version change: 1.0.0 → 2.0.0
Modified principles:
  - Performance-First: threshold changed from <100ms to <50ms (stricter requirement)
  - Removed: Cross-Browser Compatibility (narrowed to Chrome 120+ only)
  - Added: Explicit Vite + @crxjs/vite-plugin build tooling requirement
  - Browser target: narrowed from multi-browser to Chrome 120+ exclusively
Sections added: Build Tooling Standards (under Technical Standards)
Sections removed: Cross-Browser Compatibility principle
Templates requiring updates:
  ✅ constitution.md (this file)
  ✅ .specify/templates/plan-template.md (updated Technical Context, Constitution Check, and Project Structure)
  ✅ .specify/templates/spec-template.md (no changes required - technology-agnostic)
  ✅ .specify/templates/tasks-template.md (updated Path Conventions, test file extensions, performance requirements)
Follow-up TODOs: None - all templates updated
-->

## Core Principles

### I. TypeScript-First with Strict Mode
All JavaScript code MUST be written in TypeScript with strict mode enabled. No plain JavaScript files are permitted in the codebase.

**Rationale**: Strict mode catches more errors at compile time, eliminates implicit any types, enforces null/undefined checks, and ensures the highest level of type safety, reducing runtime errors and improving code maintainability.

### II. Manifest V3 Only
The browser extension MUST use Manifest V3 exclusively. Manifest V2 is explicitly forbidden.

**Rationale**: Manifest V3 is the current standard for browser extensions, offering better security, performance, and future compatibility. Manifest V2 is deprecated and will be phased out by Chrome.

### III. Performance-First (NON-NEGOTIABLE)
Content filters MUST apply in under 50ms. Any feature that degrades filter performance below this threshold is rejected.

**Rationale**: User experience depends on instantaneous content filtering. The 50ms threshold ensures imperceptible latency, maintaining the core value proposition of real-time content cleanup. This is a strict, non-negotiable requirement.

### IV. Privacy by Design
The extension MUST NOT make any external network requests. All functionality must work completely offline.

**Rationale**: User privacy is paramount. No data should leave the user's device, ensuring complete privacy and eliminating potential data leak vectors. This aligns with modern privacy-first extension standards.

### V. Minimal Dependencies
Minimize third-party dependencies. Each dependency must be explicitly justified for security, bundle size, and maintenance burden.

**Rationale**: Fewer dependencies reduce attack surface, decrease bundle size, simplify maintenance, and improve security audit capabilities. Every dependency adds risk and maintenance overhead.

### VI. Chrome 120+ Target
The extension targets Chrome 120 and later versions exclusively. No compatibility shims for older browsers are required.

**Rationale**: Focusing on modern Chrome versions allows use of latest web platform features, eliminates legacy workarounds, reduces code complexity, and ensures optimal performance. Chrome 120+ provides stable Manifest V3 support and modern JavaScript features.

### VII. Clean Code Standards
Code MUST pass ESLint and Prettier checks. No exceptions without documented justification.

**Rationale**: Consistent code style improves readability, reduces cognitive load, and prevents style-related merge conflicts. Automated enforcement ensures consistency across all contributors.

## Technical Standards

### Browser Extension Architecture
- Manifest V3 service workers for background processing
- Content scripts for DOM manipulation and filtering
- Popup UI for user controls and settings
- Storage API for user preferences (local only, no sync to respect privacy)

### Build Tooling Standards
- **Build System**: Vite 5.x with HMR for fast development iteration
- **Extension Plugin**: @crxjs/vite-plugin for Manifest V3 bundling and hot reload
- **TypeScript**: Strict mode compilation with tsconfig strict flags enabled
- **Output**: Tree-shaking and minification for production builds
- **Development**: Source maps enabled for debugging (development only, excluded from production)

**Rationale**: Vite provides the fastest development experience with instant HMR, while @crxjs/vite-plugin seamlessly handles Manifest V3 bundling complexities. This toolchain minimizes build times and maximizes developer productivity.

### Performance Requirements
- Initial filter application: <50ms (NON-NEGOTIABLE)
- Settings changes propagation: <50ms
- Memory footprint: <50MB for typical usage
- No blocking operations on the main thread
- Use requestIdleCallback for non-critical operations

### Build and Deployment
- TypeScript compilation with strict mode enabled
- Tree-shaking and minification for production builds
- Source maps for debugging (development only)
- Automated build process with CI validation

## Code Quality

### Linting and Formatting
- ESLint configuration enforcing TypeScript best practices
- Prettier for consistent code formatting
- Pre-commit hooks to validate code quality
- No commits allowed that fail linting or formatting checks

### Testing Requirements
- Unit tests for core filtering logic
- Integration tests for content script injection
- Performance benchmarks for filter application (<50ms validation)
- Manual testing on Chrome 120+ before releases

### Code Review Standards
- All changes require code review
- Performance implications must be documented and benchmarked
- Breaking changes require migration documentation
- Security-sensitive changes require additional scrutiny

## Governance

### Amendment Process
Constitution changes require:
1. Documented rationale for the change
2. Impact analysis on existing codebase
3. Version bump following semantic versioning
4. Update of all dependent templates and documentation

### Compliance Verification
- All pull requests must demonstrate constitutional compliance
- Performance requirements verified through automated benchmarks (<50ms threshold)
- Privacy guarantees validated through network traffic inspection (zero external requests)
- Code quality enforced through automated tooling (ESLint, Prettier, TypeScript strict)

### Version Control
- MAJOR: Backward-incompatible principle changes or removals
- MINOR: New principles added or material expansions to guidance
- PATCH: Clarifications, wording improvements, non-semantic refinements

**Version**: 2.0.0 | **Ratified**: 2026-01-03 | **Last Amended**: 2026-01-03
