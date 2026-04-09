import { create } from 'zustand';
import { teacherApi, TeacherResponse, TeacherCreateData, TeacherUpdateData } from '@/lib/api/teachers';

interface TeachersState {
  teachers: TeacherResponse[];
  currentTeacher: TeacherResponse | null;
  isLoading: boolean;
  error: string | null;

  fetchTeachers: () => Promise<void>;
  fetchTeacherById: (id: string) => Promise<void>;
  createTeacher: (data: TeacherCreateData) => Promise<TeacherResponse>;
  updateTeacher: (id: string, data: TeacherUpdateData) => Promise<void>;
  deleteTeacher: (id: string) => Promise<void>;
  clearCurrentTeacher: () => void;
}

export const useTeachersStore = create<TeachersState>((set) => ({
  teachers: [],
  currentTeacher: null,
  isLoading: false,
  error: null,

  fetchTeachers: async () => {
    set({ isLoading: true, error: null });
    try {
      const teachers = await teacherApi.getAllTeachers();
      set({ teachers });
    } catch {
      set({ error: 'Failed to load teachers' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTeacherById: async (id) => {
    set({ isLoading: true, error: null, currentTeacher: null });
    try {
      const teacher = await teacherApi.getTeacherById(id);
      set({ currentTeacher: teacher });
    } catch {
      set({ error: 'Failed to load teacher' });
    } finally {
      set({ isLoading: false });
    }
  },

  createTeacher: async (data) => {
    const created = await teacherApi.createTeacher(data);
    set((state) => ({ teachers: [created, ...state.teachers] }));
    return created;
  },

  updateTeacher: async (id, data) => {
    const updated = await teacherApi.updateTeacher(id, data);
    set((state) => ({
      teachers: state.teachers.map((t) => (t.id === id ? updated : t)),
      currentTeacher: state.currentTeacher?.id === id ? updated : state.currentTeacher,
    }));
  },

  deleteTeacher: async (id) => {
    await teacherApi.deleteTeacher(id);
    set((state) => ({ teachers: state.teachers.filter((t) => t.id !== id) }));
  },

  clearCurrentTeacher: () => set({ currentTeacher: null }),
}));
