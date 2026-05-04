import * as React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { academicApi } from '@/lib/api/academic';
import api from '@/lib/api/axios';
import { studentApi, type StudentAdmissionData } from '@/lib/api/students';
import type { AcademicClass } from '@/lib/types';

interface RegisterResponse {
  id?: string;
  user?: {
    id?: string;
  };
}

const getResponseMessage = (error: unknown) => {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    return (error as { response?: { data?: { message?: string | string[] } } }).response?.data?.message;
  }

  return undefined;
};

const getFormValue = (formData: FormData, key: string) => formData.get(key) as string;

const buildStudentPayload = (formData: FormData, userId: string): StudentAdmissionData => ({
  userId,
  academicInfo: {
    year: getFormValue(formData, 'academicYear'),
    class: getFormValue(formData, 'class'),
    section: getFormValue(formData, 'section'),
    rollNumber: getFormValue(formData, 'rollNumber'),
    admissionNumber: getFormValue(formData, 'admissionNumber'),
  },
  personalInfo: {
    fullName: getFormValue(formData, 'fullName'),
    category: getFormValue(formData, 'category'),
    gender: getFormValue(formData, 'gender'),
    dateOfBirth: getFormValue(formData, 'dateOfBirth'),
    phone: getFormValue(formData, 'phone'),
    email: getFormValue(formData, 'email'),
  },
  parentGuardianInfo: {
    father: {
      name: getFormValue(formData, 'fatherName'),
      phone: getFormValue(formData, 'fatherPhone'),
      occupation: getFormValue(formData, 'fatherOccupation'),
    },
    mother: {
      name: getFormValue(formData, 'motherName'),
      phone: getFormValue(formData, 'motherPhone'),
      occupation: getFormValue(formData, 'motherOccupation'),
    },
    guardian: {
      name: getFormValue(formData, 'guardianName'),
      phone: getFormValue(formData, 'guardianPhone'),
      occupation: getFormValue(formData, 'guardianOccupation'),
      email: getFormValue(formData, 'guardianEmail'),
      address: getFormValue(formData, 'guardianAddress'),
      relation: getFormValue(formData, 'guardian'),
    },
  },
  medicalDetails: {
    bloodGroup: getFormValue(formData, 'bloodGroup'),
    height: getFormValue(formData, 'height'),
    weight: getFormValue(formData, 'weight'),
  },
  bankDetails: {
    accountNumber: getFormValue(formData, 'accountNumber'),
    bankName: getFormValue(formData, 'bankName'),
    bankBranch: getFormValue(formData, 'bankBranch'),
    ifscCode: getFormValue(formData, 'ifscCode'),
  },
  previousSchoolDetails: {
    schoolName: getFormValue(formData, 'schoolName'),
    address: getFormValue(formData, 'schoolAddress'),
  },
  address: {
    currentAddress: getFormValue(formData, 'currentAddress'),
    permanentAddress: getFormValue(formData, 'permanentAddress'),
  },
  hostelDetails: {
    hostelName: getFormValue(formData, 'hostelName'),
    roomNumber: getFormValue(formData, 'roomNumber'),
  },
  additionalDetails: getFormValue(formData, 'additionalDetails'),
});

export function useAddStudentPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [classes, setClasses] = React.useState<AcademicClass[]>([]);
  const [selectedClassId, setSelectedClassId] = React.useState('');
  const [isLoadingClasses, setIsLoadingClasses] = React.useState(true);

  const sections = React.useMemo(
    () => classes.find((cls) => cls.id === selectedClassId)?.sections ?? [],
    [classes, selectedClassId],
  );

  React.useEffect(() => {
    const fetchClasses = async () => {
      try {
        setIsLoadingClasses(true);
        const data = await academicApi.getMasterClasses();
        setClasses(data);
      } catch (error) {
        console.error('Failed to fetch classes:', error);
        toast.error('Failed to load classes');
      } finally {
        setIsLoadingClasses(false);
      }
    };

    fetchClasses();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const loginEmail = getFormValue(formData, 'loginEmail');
      const loginPassword = getFormValue(formData, 'loginPassword');
      const fullName = getFormValue(formData, 'fullName');
      const [firstName, ...lastNameParts] = fullName.trim().split(/\s+/);

      if (!loginEmail || !loginPassword) {
        toast.error('Please provide login details (email and password)');
        setIsLoading(false);
        return;
      }

      const authData = {
        email: loginEmail,
        password: loginPassword,
        firstName,
        lastName: lastNameParts.join(' '),
        role: 'STUDENT',
        phone: getFormValue(formData, 'phone'),
      };

      const authRes = await api.post<RegisterResponse>('/auth/register', authData).catch((err) => {
        const resMsg = getResponseMessage(err);
        throw new Error(
          (Array.isArray(resMsg) ? resMsg.join(', ') : resMsg) || 'Failed to register student user account',
        );
      });

      const userId = authRes.data.user?.id || authRes.data.id;

      if (!userId) {
        throw new Error('Did not receive userId after registration.');
      }

      await studentApi.createStudent(buildStudentPayload(formData, userId));

      toast.success('Student admission created successfully!');
      router.push('/students');
    } catch (error: unknown) {
      console.error(error);
      const resMsg = getResponseMessage(error);

      if (Array.isArray(resMsg)) {
        resMsg.forEach((msg) => toast.error(msg));
      } else {
        toast.error((error instanceof Error ? error.message : undefined) || resMsg || 'An error occurred during admission.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    classes,
    sections,
    selectedClassId,
    setSelectedClassId,
    isLoading,
    isLoadingClasses,
    handleSubmit,
    handleCancel: router.back,
  };
}
