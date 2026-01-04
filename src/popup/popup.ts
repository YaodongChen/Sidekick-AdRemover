/**
 * CleanRead Popup UI
 * Per-domain toggle for enabling/disabling ad blocking
 */

const toggle = document.getElementById('enableToggle') as HTMLInputElement;

/**
 * Extract domain from URL
 */
function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (e) {
    return '';
  }
}

/**
 * Initialize popup UI
 */
async function initPopup() {
  // Get current active tab
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tabs[0]?.url) {
    return;
  }

  const domain = extractDomain(tabs[0].url);

  if (!domain) {
    return;
  }

  // Load current state for this domain
  chrome.storage.sync.get(domain, (data) => {
    // Default: enabled (true) if not explicitly set to false
    const isEnabled = data[domain] !== false;
    toggle.checked = isEnabled;
  });

  // Handle toggle change
  toggle.addEventListener('change', async () => {
    const newState = toggle.checked;

    // Save per-domain state
    await chrome.storage.sync.set({ [domain]: newState });

    // Reload the tab to apply changes
    if (tabs[0]?.id) {
      await chrome.tabs.reload(tabs[0].id);
    }
  });
}

// Initialize when popup loads
initPopup();
