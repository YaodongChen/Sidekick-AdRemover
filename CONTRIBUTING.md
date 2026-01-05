# Contributing to Sidekick AdRemover

Thank you for your interest in contributing to Sidekick AdRemover! This document provides guidelines and instructions for contributing.

## 🚀 Quick Start

1. **Fork the repository**
2. **Clone your fork:**
   ```bash
   git clone https://github.com/yourusername/sidekick-adremover.git
   cd sidekick-adremover
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Create a branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```
5. **Make your changes**
6. **Test thoroughly**
7. **Commit and push:**
   ```bash
   git commit -m "Add: your feature description"
   git push origin feature/your-feature-name
   ```
8. **Open a Pull Request**

## 📋 Development Guidelines

### Code Style

- **TypeScript strict mode** - All code must pass strict type checking
- **ESLint** - Follow the project's ESLint configuration
- **Prettier** - Code will be formatted automatically
- **Comments** - Add comments for complex logic, keep them in English

### Performance Requirements

- **Critical**: Ad scanning MUST complete in <50ms
- **Dynamic detection**: <200ms
- **Memory**: Keep footprint under 5MB
- **Bundle size**: Aim to keep total size under 10KB

### Testing

Before submitting a PR:

1. **Test on multiple websites:**
   - Dealmoon.com
   - StackOverflow.com
   - News sites (CNN, BBC, etc.)
   - Blogs with ads

2. **Test toggle functionality:**
   - Enable/disable per domain
   - Verify state persistence
   - Check page reload behavior

3. **Performance check:**
   - Open DevTools Console
   - Verify no errors
   - Check memory usage in Chrome Task Manager

4. **Browser testing:**
   - Chrome 120+
   - Test in incognito mode

### Commit Messages

Use clear, descriptive commit messages:

```
Add: New feature description
Fix: Bug description
Update: What was updated
Remove: What was removed
Refactor: Code improvement description
Docs: Documentation changes
```

Examples:
```
Add: Support for Facebook sidebar ads
Fix: Memory leak in MutationObserver
Update: Improve ad detection performance by 20%
Docs: Add installation instructions for Edge
```

## 🎯 What to Contribute

### High Priority

- **New ad selectors** for popular websites
- **Performance improvements**
- **Bug fixes**
- **Documentation improvements**

### Welcome Contributions

- **Browser compatibility** improvements
- **UI/UX enhancements**
- **Accessibility features**
- **Test coverage**

### Please Avoid

- ❌ Adding external dependencies (keep it lightweight!)
- ❌ Making network requests (privacy requirement)
- ❌ Complex configuration systems (keep it simple)
- ❌ Breaking changes without discussion

## 🔍 Adding New Ad Selectors

If you want to add support for a new website:

1. **Test the selectors manually** in DevTools:
   ```javascript
   // In the browser console
   document.querySelectorAll('.your-selector')
   ```

2. **Add to `src/content/content.ts`:**
   ```typescript
   const YOURSITE_SELECTORS = [
     '.ad-class',
     '#ad-id',
     'div[data-ad]'
   ];
   ```

3. **Add to main selector array:**
   ```typescript
   const AD_SELECTORS = [
     ...DEALMOON_SELECTORS,
     ...STACKOVERFLOW_SELECTORS,
     ...YOURSITE_SELECTORS,  // Add here
     ...GENERIC_SELECTORS
   ];
   ```

4. **Test thoroughly** on the target website

## 🐛 Reporting Bugs

When reporting bugs, please include:

1. **Chrome version**
2. **Extension version**
3. **Website URL** where the issue occurs
4. **Steps to reproduce**
5. **Expected behavior**
6. **Actual behavior**
7. **Screenshots** (if applicable)
8. **Console errors** (if any)

### Bug Report Template

```markdown
**Chrome Version:** 120.0.6099.109
**Extension Version:** 1.0.0
**Website:** https://example.com

**Steps to Reproduce:**
1. Go to example.com
2. Scroll to sidebar
3. Observe ads still visible

**Expected:** Sidebar ads should be hidden
**Actual:** Ads are still visible

**Console Errors:**
[Paste any console errors here]

**Screenshots:**
[Attach screenshot]
```

## 💡 Feature Requests

Before requesting a feature:

1. **Check existing issues** to avoid duplicates
2. **Consider if it aligns** with the project goals:
   - Lightweight
   - Privacy-first
   - Simple to use
   - No setup required

3. **Provide details:**
   - What problem does it solve?
   - How would it work?
   - Are there examples in other extensions?

## 📝 Documentation

Documentation improvements are always welcome:

- Fix typos and grammar
- Improve clarity
- Add examples
- Translate (if multi-language support is added)
- Add screenshots/GIFs

## ⚖️ License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🤝 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Assume good intentions

## ❓ Questions?

- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For questions and general discussion

---

**Thank you for contributing!** 🎉
