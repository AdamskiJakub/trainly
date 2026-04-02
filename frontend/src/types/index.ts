// User types
export enum UserRole {
  CLIENT = 'CLIENT',
  INSTRUCTOR = 'INSTRUCTOR',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
}

// Instructor Profile types
export interface InstructorProfile {
  id: string;
  userId: string;
  user?: User;
  bio: string | null;
  specializations: string[];
  location: string | null;
  city: string | null;
  hourlyRate: number | null;
  photoUrl: string | null;
  verified: boolean;
  yearsExperience: number | null;
  createdAt: string;
  updatedAt: string;
  averageRating?: number;
  reviewCount?: number;
}

// Extended instructor type for listings with computed fields
export interface InstructorListing extends InstructorProfile {
  username: string; // for URL: /instructors/[username]
  fullName: string; // firstName + lastName
  tagline: string | null; // short bio for card
  availability: 'online' | 'in-person' | 'both';
  primarySpecialization: string; // main category ID
  subcategories: string[]; // subcategory IDs
  languages: string[]; // e.g., ['pl', 'en']
  gallery: string[]; // array of image URLs
  videoUrl: string | null; // optional promo video
}

// Service types
export interface Service {
  id: string;
  instructorId: string;
  instructor?: InstructorProfile;
  name: string;
  description: string | null;
  price: number;
  duration: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Booking types
export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface Booking {
  id: string;
  clientId: string;
  client?: User;
  instructorId: string;
  instructor?: InstructorProfile;
  serviceId: string;
  service?: Service;
  date: string;
  status: BookingStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  review?: Review;
}

// Review types
export interface Review {
  id: string;
  bookingId: string;
  booking?: Booking;
  userId: string;
  user?: User;
  rating: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
}

// Auth types
export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}
