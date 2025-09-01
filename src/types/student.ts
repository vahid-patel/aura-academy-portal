import { z } from 'zod';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum Divisions {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G',
  H = 'H',
  I = 'I',
}

export interface Student {
  _id: string;
  studentId: string;
  registerNumber: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string; // ISO string
  birthPlace: string;
  gender: Gender;
  rollNumber: number;
  fatherName: string;
  motherName: string;
  adhaar: string;
  cast: string;
  religion: string;
  nationality: string;
  grade: number; // 1–12
  division: Divisions;
  contactNumber: string;
  address: string;
  previousSchoolName?: string;
  admissionDate: string; // ISO string
  customFields?: { key: string; value: string }[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export const createStudentSchema = z.object({
  studentId: z.string().min(1, 'Student ID is required'),
  registerNumber: z.string().min(1, 'Register Number is required'),
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
  birthPlace: z.string().min(1, 'Birth place is required'),
  gender: z.enum(['male', 'female', 'other']),
  rollNumber: z.number().min(1, 'Roll number is required'),
  fatherName: z.string().min(1, 'Father name is required'),
  motherName: z.string().min(1, 'Mother name is required'),
  adhaar: z
    .string()
    .regex(/^[2-9][0-9]{11}$/, 'Aadhaar must be 12 digits and not start with 0 or 1'),
  cast: z.string().min(1, 'Cast is required'),
  religion: z.string().min(1, 'Religion is required'),
  nationality: z.string().min(1, 'Nationality is required'),
  grade: z.number().min(1).max(12),
  division: z.enum(['A','B','C','D','E','F','G','H','I']).default('A'),
  contactNumber: z.string().min(5, 'Contact number is required'),
  address: z.string().min(1, 'Address is required'),
  previousSchoolName: z.string().optional(),
  admissionDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
  customFields: z.array(z.object({ key: z.string(), value: z.string() })).optional(),
  schoolId: z.string().min(1, 'School ID is required'),
});

export interface CreateStudentRequest extends z.infer<typeof createStudentSchema> {}

export interface UpdateStudentRequest extends Partial<CreateStudentRequest> {
  id: string;
}
