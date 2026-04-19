/**
 * Media utilities for handling image and video URLs
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

/**
 * Convert relative upload paths to full URLs
 * @param url - The URL to convert (can be relative like /uploads/... or absolute)
 * @returns Full URL or undefined if no URL provided
 */
export function getMediaUrl(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  
  // Already a full URL or blob URL
  if (url.startsWith('blob:') || url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Relative path - prepend API base URL
  return `${API_BASE_URL}${url}`;
}

/**
 * Check if a file is a video based on URL
 */
export function isVideoUrl(url: string): boolean {
  return url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.mov');
}

/**
 * Check if a file is an image based on URL
 */
export function isImageUrl(url: string): boolean {
  return url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png') || url.endsWith('.webp');
}
