import { z } from 'zod';

export interface School {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  principalName: string;
  website?: string;
  establishedYear: number;
  studentCount: number;
  teacherCount: number;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  createdAt: string;
  updatedAt: string;
}

export const createSchoolSchema = z.object({
  name: z.string().min(1, 'School name is required'),
  principalName: z.string().min(1, 'Principal name is required'),
  adminId: z.string().min(1, 'Admin ID is required'),
  address: z.string().optional(),
  contactNumber: z.string().optional(),
  isActive: z.boolean().default(true),
});

export interface CreateSchoolRequest {
  name: string;
  adminId: string;
  principalName: string;
  contactNumber: String;
  address: string;
  isActive: boolean;
}

export interface UpdateSchoolRequest extends Partial<CreateSchoolRequest> {
  id: string;
}
