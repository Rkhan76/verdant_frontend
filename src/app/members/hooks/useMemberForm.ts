import * as React from 'react';
import type { MemberUser, CreateMemberDto, UpdateMemberDto, UserStatus } from '@/lib/types';

interface Options {
  initial?: MemberUser | null;
  isEdit?: boolean;
  onSubmit: (dto: CreateMemberDto | UpdateMemberDto) => void;
}

export function useMemberForm({ initial, isEdit, onSubmit }: Options) {
  const [firstName, setFirstName] = React.useState(initial?.firstName ?? '');
  const [lastName, setLastName] = React.useState(initial?.lastName ?? '');
  const [email, setEmail] = React.useState(initial?.email ?? '');
  const [password, setPassword] = React.useState('');
  const [phone, setPhone] = React.useState(initial?.phone ?? '');
  const [coarseRole, setCoarseRole] = React.useState<string>(initial?.role ?? '');
  const [roleId, setRoleId] = React.useState<string>(initial?.roleId ?? '');
  const [status, setStatus] = React.useState<UserStatus>(initial?.status ?? 'ACTIVE');

  const handleSubmit = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    if (isEdit) {
      onSubmit({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        role: coarseRole as 'SUPERADMIN' | 'ADMIN',
        roleId: roleId || null,
        status,
      } satisfies UpdateMemberDto);
    } else {
      onSubmit({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password,
        phone: phone.trim() || undefined,
        role: coarseRole as 'SUPERADMIN' | 'ADMIN',
        roleId: roleId || undefined,
      } satisfies CreateMemberDto);
    }
  };

  return {
    fields: { firstName, lastName, email, password, phone, coarseRole, roleId, status },
    setters: { setFirstName, setLastName, setEmail, setPassword, setPhone, setCoarseRole, setRoleId, setStatus },
    handleSubmit,
  };
}
