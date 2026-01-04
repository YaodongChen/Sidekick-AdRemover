/**
 * TypeScript type definitions for CleanRead
 */

/**
 * Per-domain state storage
 * Key: domain name (e.g., "dealmoon.com")
 * Value: boolean (true = enabled, false = disabled)
 */
export interface DomainState {
  [domain: string]: boolean;
}
