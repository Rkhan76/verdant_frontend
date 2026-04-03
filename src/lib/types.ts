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
  fullName?: string;
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

export interface AuthResponse {
  accessToken?: string;
  refreshToken?: string;
  deviceToken?: string;
  user?: UserEntity;
  requiresMfa?: boolean;
  mfaToken?: string;
  requiresMfaSetup?: boolean;
  setupToken?: string;
}

export interface LoginRequest {
  email: string;
  password?: string;
  deviceToken?: string;
}

export interface MfaVerifyRequest {
  mfaToken: string;
  code: string;
  trustDevice?: boolean;
}

export interface MfaSetupRequest {
  setupToken: string;
}

export interface MfaSetupResponse {
  secret: string;
  qrCodeUrl: string;
}

export interface MfaSetupConfirmRequest {
  setupToken: string;
  secret: string;
  code: string;
}

export interface MfaSetupConfirmResponse {
  success: boolean;
  backupCodes: string[];
}

// ── Members (SUPERADMIN + ADMIN staff) ───────────────────────────────────

export interface MemberUser extends UserEntity {
  roleEntity?: {
    id: string;
    name: string;
    description: string | null;
  } | null;
}

export interface CreateMemberDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'SUPERADMIN' | 'ADMIN';
  phone?: string;
  roleId?: string;
}

export interface UpdateMemberDto {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role?: 'SUPERADMIN' | 'ADMIN';
  roleId?: string | null;
  status?: UserStatus;
}

// ── Role master (lightweight list) ───────────────────────────────────────

export interface RoleMaster {
  id: string;
  role: string;
}

// ── Permissions & Roles ───────────────────────────────────────────────────

export interface Permission {
  id: string;
  code: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface RolePermission {
  id: string;
  permission: Permission;
  createdAt: string;
}

export interface Role {
  id: string;
  name: string;
  description: string | null;
  rolePermissions: RolePermission[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CreatePermissionDto {
  code: string;
  description: string;
}

export interface UpdatePermissionDto {
  code?: string;
  description?: string;
}

export interface CreateRoleDto {
  name: string;
  description?: string;
}

export interface UpdateRoleDto {
  name?: string;
  description?: string;
}

export interface AssignPermissionsDto {
  permissionIds: string[];
}

// ── Admissions ────────────────────────────────────────────────────────────

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
