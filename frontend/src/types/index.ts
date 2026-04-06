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

export interface InstructorListing extends InstructorProfile {
  username: string;
  fullName: string;
  tagline: string | null;
  availability: 'online' | 'in-person' | 'both';
  primarySpecialization: string;
  tags?: string[];
  goals?: string[];
  languages: string[];
  gallery: string[];
  videoUrl: string | null;
}

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
