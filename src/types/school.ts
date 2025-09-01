import { StringValidation } from "zod";

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
