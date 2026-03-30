/**
 * Normalizes API error responses from the backend.
 * @param err 
 * @param fallbackMessage 
 * @returns
 */
export function normalizeApiError(err: any, fallbackMessage: string): string {
  const rawMessage = err?.response?.data?.message;
  
  if (Array.isArray(rawMessage)) {
    return rawMessage.join(' ');
  } else if (typeof rawMessage === 'string') {
    return rawMessage;
  } else {
    return fallbackMessage;
  }
}
