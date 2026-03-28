export type UserRole = 'SUPERADMIN' | 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
export type AdmissionStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'ENROLLED';
export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
export type NotificationType = 'INFO' | 'WARNING' | 'ALERT' | 'REMINDER';

export interface UserEntity {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  roleId: string | null;
  status: UserStatus;
  phone: string | null;
  isEmailVerified: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface AdmissionEntity {
  id: string;
  academicYear: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string | null;
  address: string | null;
  classId: string;
  status: AdmissionStatus;
  rejectionReason: string | null;
  studentId: string | null;
  admittedBy: string | null;
  admittedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
