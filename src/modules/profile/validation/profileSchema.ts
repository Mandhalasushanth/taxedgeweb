import { z } from 'zod'
import { REGEX } from '@shared/constants'

// Date of birth validator (DD-MM-YYYY or YYYY-MM-DD)
const dobRegex = /^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-(19\d\d|20\d\d)$/

export const profileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, 'Full name is required')
    .min(3, 'Full name must be at least 3 characters'),

  email: z
    .string()
    .trim()
    .min(1, 'Email address is required')
    .email('Enter a valid email address'),

  dob: z
    .string()
    .trim()
    .min(1, 'Date of birth is required')
    .refine((val) => {
      // Allow DD-MM-YYYY or standard date format
      if (dobRegex.test(val)) return true
      const parsed = Date.parse(val)
      return !Number.isNaN(parsed)
    }, 'Enter date of birth in DD-MM-YYYY format'),

  pan: z
    .string()
    .trim()
    .transform((val) => val.toUpperCase())
    .pipe(
      z
        .string()
        .min(1, 'PAN is required')
        .regex(REGEX.pan, 'Enter a valid 10-character PAN (e.g. ABCDE1234F)'),
    ),

  aadhaar: z
    .string()
    .trim()
    .transform((val) => val.replace(/\s+/g, ''))
    .pipe(
      z
        .string()
        .min(1, 'Aadhaar number is required')
        .regex(/^\d{12}$/, 'Enter a valid 12-digit Aadhaar number'),
    ),

  mobile: z
    .string()
    .trim()
    .transform((val) => val.replace(/^\+91\s*/, '').replace(/\s+/g, ''))
    .refine((val) => !val || REGEX.mobile.test(val), 'Enter a valid 10-digit mobile number')
    .optional()
    .or(z.literal('')),

  address: z
    .string()
    .trim()
    .min(1, 'Address is required')
    .min(5, 'Enter your complete address (at least 5 characters)'),
})

export type ProfileFormValues = {
  fullName: string
  email: string
  dob: string
  pan: string
  aadhaar: string
  mobile?: string
  address: string
}

export type ProfileInput = z.infer<typeof profileSchema>
