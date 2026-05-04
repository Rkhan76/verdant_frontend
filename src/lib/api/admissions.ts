import api from './axios';
import type { Document, StudentAdmissionData } from './students';
import type { PaginatedResponse } from '@/lib/types';

export type AdmissionStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'cancelled'
  | 'enrolled';

export type AdmissionCreateData = Omit<StudentAdmissionData, 'userId'> & {
  userId?: string;
  isGuardianExist?: boolean;
  isGaurdianExist?: boolean;
  guardianId?: string;
};

export type AdmissionUpdateData = Partial<AdmissionCreateData>;

export interface AdmissionResponse {
  id: string;
  applicationNumber: string;
  status: AdmissionStatus;
  studentId: string | null;
  userId: string | null;
  admissionNumber?: string | null;
  rollNumber?: string | null;
  year?: string | null;
  classId?: string | null;
  class?: {
    id: string;
    name: string;
    grade?: string | null;
  } | null;
  sectionId?: string | null;
  section?: {
    id: string;
    name: string;
    classId?: string;
  } | null;
  isGuardianExist?: boolean;
  guardianId?: string | null;
  guardian?: {
    id: string;
    name: string;
    relation?: string | null;
    email?: string | null;
    phone?: string | null;
    occupation?: string | null;
    address?: string | null;
    photo?: string | null;
  } | null;
  fullName?: string | null;
  category?: string | null;
  subcategory?: string | null;
  gender?: string | null;
  dateOfBirth?: string | null;
  phone?: string | null;
  email?: string | null;
  aadharNumber?: string | null;
  profileImage?: string | null;
  aadharImage?: string | null;
  tcImage?: string | null;
  birthCertificateImage?: string | null;
  fatherInfo?: Record<string, unknown> | null;
  motherInfo?: Record<string, unknown> | null;
  guardianInfo?: Record<string, unknown> | null;
  medicalDetails?: Record<string, unknown> | null;
  bankDetails?: Record<string, unknown> | null;
  previousSchoolName?: string | null;
  previousSchoolAddress?: string | null;
  addressInfo?: Record<string, unknown> | null;
  hostelName?: string | null;
  roomNumber?: string | null;
  documents?: Document[] | null;
  additionalDetails?: string | null;
  approvedBy?: string | null;
  approvedAt?: string | null;
  rejectedBy?: string | null;
  rejectedAt?: string | null;
  rejectionReason?: string | null;
  cancelledBy?: string | null;
  cancelledAt?: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ApproveAdmissionData {
  id: string;
  isAlreadyExist: boolean;
  studentId?: string;
  password?: string;
}

export interface RejectAdmissionData {
  reason: string;
  rejectedBy?: string;
}

export interface CancelAdmissionData {
  cancelledBy?: string;
}

export interface ListAdmissionsParams {
  page?: number;
  limit?: number;
  status?: AdmissionStatus;
  search?: string;
}

export const admissionApi = {
  createAdmission: async (
    data: AdmissionCreateData,
  ): Promise<AdmissionResponse> => {
    const response = await api.post('/admissions', data);
    return response.data;
  },

  getAllAdmissions: async (
    params: ListAdmissionsParams = {},
  ): Promise<PaginatedResponse<AdmissionResponse>> => {
    const response = await api.get('/admissions', { params });
    return response.data;
  },

  getAdmissionById: async (id: string): Promise<AdmissionResponse> => {
    const response = await api.get(`/admissions/${id}`);
    return response.data;
  },

  updateAdmission: async (
    id: string,
    data: AdmissionUpdateData,
  ): Promise<AdmissionResponse> => {
    const response = await api.patch(`/admissions/${id}`, data);
    return response.data;
  },

  approveAdmission: async (
    id: string,
    data: ApproveAdmissionData,
  ): Promise<AdmissionResponse> => {
    const response = await api.patch(`/admissions/${id}/approve`, data);
    return response.data;
  },

  rejectAdmission: async (
    id: string,
    data: RejectAdmissionData,
  ): Promise<AdmissionResponse> => {
    const response = await api.patch(`/admissions/${id}/reject`, data);
    return response.data;
  },

  cancelAdmission: async (
    id: string,
    data: CancelAdmissionData = {},
  ): Promise<AdmissionResponse> => {
    const response = await api.patch(`/admissions/${id}/cancel`, data);
    return response.data;
  },

  deleteAdmission: async (id: string): Promise<void> => {
    await api.delete(`/admissions/${id}`);
  },
};
