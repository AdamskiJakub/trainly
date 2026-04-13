/**
 * Generates a valid username from an email address.
 * Enforces backend constraints:
 * - 3-30 characters
 * - Only lowercase letters, numbers, and hyphens
 * - Must start and end with alphanumeric character
 * 
 * @param email - User's email address
 * @returns Generated username that complies with backend validation
 */
export function generateUsernameFromEmail(email: string): string {
  // Extract local part (before @)
  const localPart = email.split('@')[0].toLowerCase();
  
  // Replace non-alphanumeric characters with hyphens
  let username = localPart.replace(/[^a-z0-9]/g, '-');
  
  // Remove leading/trailing hyphens
  username = username.replace(/^-+|-+$/g, '');
  
  // Final cleanup: ensure no consecutive hyphens
  username = username.replace(/-{2,}/g, '-');
  
  // If username is too short after cleanup, pad with a suffix
  if (username.length < 3) {
    // Use first part of domain as fallback
    const domain = email.split('@')[1]?.split('.')[0] || 'user';
    username = `${username}-${domain}`.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    
    // Re-clean after appending domain
    username = username.replace(/^-+|-+$/g, '');
    username = username.replace(/-{2,}/g, '-');
  }
  
  // Ensure it still meets minimum length after all cleanup
  if (username.length < 3) {
    // Use crypto for better collision resistance
    const randomSuffix = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID().substring(0, 6)
      : Math.random().toString(36).substring(2, 8);
    username = `user-${randomSuffix}`;
  }
  
  // Enforce max length (30 chars)
  if (username.length > 30) {
    username = username.substring(0, 30).replace(/-+$/, '');
  }
  
  return username;
}

/**
 * Validates if a username meets backend requirements.
 * 
 * @param username - Username to validate
 * @returns Object with isValid flag and optional error message
 */
export function validateUsername(username: string): { isValid: boolean; error?: string } {
  if (username.length < 3 || username.length > 30) {
    return { isValid: false, error: 'Username must be between 3 and 30 characters' };
  }
  
  if (!/^[a-z0-9-]+$/.test(username)) {
    return { isValid: false, error: 'Username can only contain lowercase letters, numbers, and hyphens' };
  }
  
  if (!/^[a-z0-9]/.test(username) || !/[a-z0-9]$/.test(username)) {
    return { isValid: false, error: 'Username must start and end with a letter or number' };
  }
  
  return { isValid: true };
}
