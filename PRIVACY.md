# Privacy Policy for Sidekick AdRemover

**Effective Date:** January 4, 2026
**Last Updated:** January 4, 2026

## Overview

Sidekick AdRemover ("the Extension", "we", "our") is committed to protecting your privacy. This Privacy Policy explains our data practices and your privacy rights when using our Chrome browser extension.

**TL;DR:** We don't collect, store, or transmit any of your data. Everything runs locally on your device.

---

## 1. Information We Collect

**We collect ZERO data.**

The Extension does not:
- Collect personal information
- Track your browsing history
- Monitor which websites you visit
- Record your clicks or interactions
- Gather usage statistics or analytics
- Access your passwords or form data
- Read your emails or private messages
- Store any identifiable information

## 2. How We Use Your Information

Since we don't collect any information, we don't use, store, analyze, or share any of your data.

All ad-detection and filtering operations are performed **entirely on your local device**. No data ever leaves your browser.

## 3. Data Storage

The Extension uses Chrome's built-in storage API (`chrome.storage.sync`) solely to remember your preferences for specific websites (whether the extension is enabled or disabled for that site).

**What is stored:**
- Domain-specific preferences (e.g., `{"example.com": true}`)
- Stored locally in your browser
- Synced across your Chrome devices via Google's infrastructure (if you're signed into Chrome)
- We do not have access to this data

**Example storage:**
```json
{
  "dealmoon.com": true,
  "example.com": false
}
```

This simply means the extension is enabled on dealmoon.com and disabled on example.com.

## 4. Third-Party Services

The Extension does not:
- Make any external network requests
- Connect to remote servers
- Use third-party analytics (no Google Analytics, no Mixpanel, etc.)
- Integrate with advertising networks
- Share data with any third parties

**The Extension is 100% self-contained and offline-capable.**

## 5. Permissions Explanation

The Extension requests the following Chrome permissions:

### `storage`
**Why we need it:** To save your per-website preferences (whether the extension is enabled or disabled).

**What we DON'T do:** We don't store browsing history, personal data, or track your behavior.

### `activeTab`
**Why we need it:** To access the current webpage's DOM (Document Object Model) to detect and hide sidebar advertisements.

**What we DON'T do:** We don't read sensitive information, access other tabs, or monitor your browsing across websites.

## 6. Data Security

Since we don't collect or transmit data, there's no data to secure on our end. All operations happen locally within your browser's secure environment.

## 7. Children's Privacy

The Extension does not collect any data from anyone, including children under 13. We comply with the Children's Online Privacy Protection Act (COPPA).

## 8. Changes to This Privacy Policy

If we ever change our data practices (which we have no plans to do), we will:
- Update this Privacy Policy
- Update the "Last Updated" date
- Notify users via the Chrome Web Store update notes

Continued use of the Extension after changes constitutes acceptance of the updated policy.

## 9. Open Source Transparency

The Extension's source code is publicly available on GitHub. You can verify our privacy claims by reviewing the code yourself:

**GitHub Repository:** [https://github.com/YaodongChen/sidekick-adremover](https://github.com/YaodongChen/sidekick-adremover)

## 10. Your Rights

Since we don't collect data, there's no data to:
- Request access to
- Request deletion of
- Request correction of
- Request portability of

You have complete control over the Extension's storage through Chrome's built-in tools:
1. Right-click the Extension icon
2. Select "Options" or use the popup toggle
3. Or remove the Extension entirely to clear all local preferences

## 11. Contact Information

If you have questions or concerns about this Privacy Policy:

- **GitHub Issues:** [https://github.com/YaodongChen/sidekick-adremover/issues](https://github.com/YaodongChen/sidekick-adremover/issues)
- **Email:** cicastudio2026@gmail.com

## 12. Compliance

This Extension complies with:
- General Data Protection Regulation (GDPR)
- California Consumer Privacy Act (CCPA)
- Chrome Web Store Developer Program Policies
- Children's Online Privacy Protection Act (COPPA)

Since we collect no data, we are inherently compliant with all major privacy regulations.

---

## Summary

**What we collect:** Nothing
**What we share:** Nothing
**What we sell:** Nothing
**Where your data goes:** Nowhere—it stays on your device

**Your privacy is not our business model. Ad-free browsing is.**

---

*This privacy policy was written in plain language to be as transparent as possible. If you have questions, please don't hesitate to reach out.*
