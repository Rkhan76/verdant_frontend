import api from './axios';
import type {
  AcademicClass,
  AcademicSection,
  CreateAcademicClassDto,
  CreateAcademicSectionDto,
  PaginatedResponse,
  UpdateAcademicClassDto,
  UpdateAcademicSectionDto,
} from '@/lib/types';

export interface ListAcademicParams {
  page?: number;
  limit?: number;
  search?: string;
  classId?: string;
}

export const academicApi = {
  getClasses: async (
    params: ListAcademicParams = {},
  ): Promise<PaginatedResponse<AcademicClass>> => {
    const res = await api.get('/academic/classes', { params });
    return res.data;
  },

  getClassById: async (id: string): Promise<AcademicClass> => {
    const res = await api.get(`/academic/classes/${id}`);
    return res.data;
  },

  createClass: async (dto: CreateAcademicClassDto): Promise<AcademicClass> => {
    const res = await api.post('/academic/classes', dto);
    return res.data;
  },

  updateClass: async (
    id: string,
    dto: UpdateAcademicClassDto,
  ): Promise<AcademicClass> => {
    const res = await api.patch(`/academic/classes/${id}`, dto);
    return res.data;
  },

  removeClass: async (id: string): Promise<void> => {
    await api.delete(`/academic/classes/${id}`);
  },

  getSections: async (
    params: ListAcademicParams = {},
  ): Promise<PaginatedResponse<AcademicSection>> => {
    const res = await api.get('/academic/sections', { params });
    return res.data;
  },

  getSectionsByClass: async (classId: string): Promise<AcademicSection[]> => {
    const res = await api.get(`/academic/classes/${classId}/sections`);
    return res.data;
  },

  getSectionById: async (id: string): Promise<AcademicSection> => {
    const res = await api.get(`/academic/sections/${id}`);
    return res.data;
  },

  createSection: async (
    dto: CreateAcademicSectionDto,
  ): Promise<AcademicSection> => {
    const res = await api.post('/academic/sections', dto);
    return res.data;
  },

  updateSection: async (
    id: string,
    dto: UpdateAcademicSectionDto,
  ): Promise<AcademicSection> => {
    const res = await api.patch(`/academic/sections/${id}`, dto);
    return res.data;
  },

  removeSection: async (id: string): Promise<void> => {
    await api.delete(`/academic/sections/${id}`);
  },
};
