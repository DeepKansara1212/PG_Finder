import { z } from 'zod';

// Login form validation schema
export const loginSchema = z.object({
  email: z.string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),
  password: z.string()
    .min(6, { message: 'Password must be at least 6 characters' })
});

// Registration form validation schema
export const registerSchema = z.object({
  name: z.string()
    .min(1, { message: 'Name is required' })
    .max(50, { message: 'Name must be less than 50 characters' }),
  email: z.string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),
  phone: z.string()
    .min(10, { message: 'Phone number must be at least 10 digits' })
    .max(15, { message: 'Phone number must be less than 15 digits' })
    .refine((val) => /^[0-9+\s-]+$/.test(val), {
      message: 'Phone number can only contain digits, spaces, plus, and hyphen'
    }),
  password: z.string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(50, { message: 'Password must be less than 50 characters' }),
  confirmPassword: z.string()
    .min(1, { message: 'Please confirm your password' })
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
});

// Profile update validation schema
export const profileSchema = z.object({
  name: z.string()
    .min(1, { message: 'Name is required' })
    .max(50, { message: 'Name must be less than 50 characters' }),
  email: z.string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),
  phone: z.string()
    .min(10, { message: 'Phone number must be at least 10 digits' })
    .max(15, { message: 'Phone number must be less than 15 digits' })
    .refine((val) => /^[0-9+\s-]+$/.test(val), {
      message: 'Phone number can only contain digits, spaces, plus, and hyphen'
    }),
  bio: z.string().max(200, { message: 'Bio must be less than 200 characters' }).optional(),
  location: z.string().max(100, { message: 'Location must be less than 100 characters' }).optional()
});

// Password change validation schema
export const passwordSchema = z.object({
  currentPassword: z.string()
    .min(1, { message: 'Current password is required' }),
  newPassword: z.string()
    .min(6, { message: 'New password must be at least 6 characters' })
    .max(50, { message: 'New password must be less than 50 characters' }),
  confirmPassword: z.string()
    .min(1, { message: 'Please confirm your new password' })
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
});

// Search form validation schema
export const searchSchema = z.object({
  location: z.string().optional(),
  minPrice: z.number().int().positive().optional(),
  maxPrice: z.number().int().positive().optional(),
  occupancy: z.string().optional(),
  amenities: z.array(z.string()).optional()
}).refine((data) => {
  if (data.minPrice && data.maxPrice) {
    return data.minPrice <= data.maxPrice;
  }
  return true;
}, {
  message: 'Minimum price must be less than or equal to maximum price',
  path: ['minPrice']
});

// Booking form validation schema
export const bookingSchema = z.object({
  checkInDate: z.date({
    required_error: 'Check-in date is required',
    invalid_type_error: 'Check-in date must be a valid date'
  }),
  duration: z.number()
    .int()
    .positive({ message: 'Duration must be a positive number' }),
  occupants: z.number()
    .int()
    .positive({ message: 'Number of occupants must be positive' }),
  specialRequests: z.string().max(500, { message: 'Special requests must be less than 500 characters' }).optional()
});

// Message form validation schema
export const messageSchema = z.object({
  subject: z.string()
    .min(1, { message: 'Subject is required' })
    .max(100, { message: 'Subject must be less than 100 characters' }),
  message: z.string()
    .min(1, { message: 'Message is required' })
    .max(1000, { message: 'Message must be less than 1000 characters' })
});

// Utility function to validate form data against schema
export const validateForm = (schema, data) => {
  try {
    schema.parse(data);
    return { success: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = {};
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        errors[path] = err.message;
      });
      return { success: false, errors };
    }
    return { success: false, errors: { _form: 'An unexpected error occurred' } };
  }
};