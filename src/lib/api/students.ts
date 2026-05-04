import api from './axios';

// Types for Student Management Based on Documentation
export interface Document {
  documentName?: string;
  file?: string;
}

export interface StudentAdmissionData {
  userId: string;
  academicInfo?: {
    year?: string;
    class?: string;
    section?: string;
    rollNumber?: string;
    admissionNumber?: string;
  };
  personalInfo?: {
    fullName?: string;
    category?: string;
    subcategory?: string;
    gender?: string;
    dateOfBirth?: string;
    phone?: string;
    email?: string;
    aadharNumber?: string;
    profileImage?: string;
    aadharImage?: string;
    tcImage?: string;
    birthCertificateImage?: string;
  };
  parentGuardianInfo?: {
    father?: {
      name?: string;
      phone?: string;
      occupation?: string;
      photo?: string;
    };
    mother?: {
      name?: string;
      phone?: string;
      occupation?: string;
      photo?: string;
    };
    guardian?: {
      relation?: string;
      name?: string;
      email?: string;
      phone?: string;
      mobileNumber?: string;
      aadharNumber?: string;
      occupation?: string;
      address?: string;
      photo?: string;
    };
  };
  medicalDetails?: {
    bloodGroup?: string;
    height?: string;
    weight?: string;
  };
  bankDetails?: {
    accountNumber?: string;
    bankName?: string;
    bankBranch?: string;
    ifscCode?: string;
  };
  previousSchoolDetails?: {
    schoolName?: string;
    address?: string;
  };
  address?: {
    currentAddress?: string;
    permanentAddress?: string;
  };
  hostelDetails?: {
    hostelName?: string;
    roomNumber?: string;
  };
  documents?: Document[];
  additionalDetails?: string;
}

export interface StudentClass {
  id: string;
  name: string;
  grade: string | null;
}

export interface StudentSection {
  id: string;
  name: string;
  maxCapacity: number;
}

export interface StudentResponse {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  year?: string;
  classId?: string;
  class?: StudentClass | null;
  sectionId?: string;
  section?: StudentSection | null;
  fullName?: string;
  category?: string;
  subcategory?: string;
  gender?: string;
  dateOfBirth?: string;
  phone?: string;
  email?: string;
  aadharNumber?: string;
  profileImage?: string;
  aadharImage?: string;
  tcImage?: string;
  birthCertificateImage?: string;
  admissionNumber?: string;
  rollNumber?: string;
  fatherInfo?: any;
  motherInfo?: any;
  guardianInfo?: any;
  medicalDetails?: any;
  bankDetails?: any;
  previousSchoolName?: string;
  previousSchoolAddress?: string;
  addressInfo?: any;
  hostelName?: string;
  roomNumber?: string;
  documents?: Document[];
  additionalDetails?: string;
}

// Partial update data
export type StudentUpdateData = Partial<Omit<StudentAdmissionData, 'userId'>>;

// API Endpoints
export const studentApi = {
  // 1. Create Student Admission
  createStudent: async (data: StudentAdmissionData): Promise<StudentResponse> => {
    const response = await api.post('/students', data);
    return response.data;
  },

  // 2. Get All Students
  getAllStudents: async (): Promise<StudentResponse[]> => {
    const response = await api.get('/students');
    return response.data;
  },

  // 3. Get Student by ID
  getStudentById: async (id: string): Promise<StudentResponse> => {
    const response = await api.get(`/students/${id}`);
    return response.data;
  },

  // 4. Get Student by User ID
  getStudentByUserId: async (userId: string): Promise<StudentResponse> => {
    const response = await api.get(`/students/user/${userId}`);
    return response.data;
  },

  // 5. Get Students by Class (and optionally Section)
  getStudentsByClass: async (classId: string, sectionId?: string): Promise<StudentResponse[]> => {
    const params = sectionId ? { sectionId } : {};
    const response = await api.get(`/students/class/${classId}`, { params });
    return response.data;
  },

  // 6. Update Student
  updateStudent: async (id: string, data: StudentUpdateData): Promise<StudentResponse> => {
    const response = await api.patch(`/students/${id}`, data);
    return response.data;
  },

  // 7. Delete Student
  deleteStudent: async (id: string): Promise<void> => {
    await api.delete(`/students/${id}`);
  }
};
