/**
 * Transforms comma-separated string or array values into proper arrays.
 * Used for form data conversion before sending to API.
 */
export function formatProfileFormData<T extends Record<string, any>>(data: T): any {
  const arrayFields = ['specializations', 'tags', 'goals', 'languages', 'gallery'];
  
  const formatted: any = { ...data };
  
  arrayFields.forEach((field) => {
    if (field in formatted) {
      const value = formatted[field];
      if (typeof value === 'string') {
        formatted[field] = value
          .split(',')
          .map((s: string) => s.trim())
          .filter(Boolean);
      }
    }
  });
  
  // Handle empty photoUrl
  if ('photoUrl' in formatted && !formatted.photoUrl) {
    formatted.photoUrl = undefined;
  }
  
  return formatted;
}
