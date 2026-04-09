import api from './axios';

export interface TeacherDocument {
  documentName?: string;
  file?: string;
}

export interface TeacherCreateData {
  userId: string;
  employeeCode: string;
  personalInfo?: {
    fullName?: string;
    subjectId?: string;
    classId?: string;
    gender?: string;
    dateOfBirth?: string;
    fathersName?: string;
    mothersName?: string;
    maritalStatus?: string;
    contractType?: string;
    shift?: string;
    workLocation?: string;
    joiningDate?: string;
    phone?: string;
    email?: string;
    experience?: string;
    qualification?: string;
    profileImage?: string;
  };
  medicalDetails?: {
    bloodGroup?: string;
    height?: string;
    weight?: string;
  };
  bankDetails?: {
    accountNumber?: string;
    bankName?: string;
    ifscCode?: string;
    nationalId?: string;
  };
  documents?: TeacherDocument[];
  previousSchoolDetails?: {
    schoolName?: string;
    address?: string;
  };
  address?: {
    currentAddress?: string;
    permanentAddress?: string;
  };
  additionalDetails?: string;
  socialLinks?: {
    facebook?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
  };
}

export interface TeacherResponse {
  id: string;
  userId: string;
  employeeCode: string;
  fullName: string | null;
  subjectId: string | null;
  classId: string | null;
  gender: string | null;
  dateOfBirth: string | null;
  fathersName: string | null;
  mothersName: string | null;
  maritalStatus: string | null;
  contractType: string | null;
  shift: string | null;
  workLocation: string | null;
  joiningDate: string | null;
  phone: string | null;
  email: string | null;
  experience: string | null;
  qualification: string | null;
  profileImage: string | null;
  medicalDetails: { bloodGroup?: string; height?: string; weight?: string } | null;
  bankDetails: { accountNumber?: string; bankName?: string; ifscCode?: string; nationalId?: string } | null;
  documents: TeacherDocument[] | null;
  previousSchoolName: string | null;
  previousSchoolAddress: string | null;
  addressInfo: { currentAddress?: string; permanentAddress?: string } | null;
  additionalDetails: string | null;
  socialLinks: { facebook?: string; linkedin?: string; instagram?: string; youtube?: string } | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export type TeacherUpdateData = Partial<Omit<TeacherCreateData, 'userId'>>;

export const teacherApi = {
  createTeacher: async (data: TeacherCreateData): Promise<TeacherResponse> => {
    const response = await api.post('/teachers', data);
    return response.data;
  },

  getAllTeachers: async (): Promise<TeacherResponse[]> => {
    const response = await api.get('/teachers');
    return response.data;
  },

  getTeacherById: async (id: string): Promise<TeacherResponse> => {
    const response = await api.get(`/teachers/${id}`);
    return response.data;
  },

  updateTeacher: async (id: string, data: TeacherUpdateData): Promise<TeacherResponse> => {
    const response = await api.patch(`/teachers/${id}`, data);
    return response.data;
  },

  deleteTeacher: async (id: string): Promise<void> => {
    await api.delete(`/teachers/${id}`);
  },
};
