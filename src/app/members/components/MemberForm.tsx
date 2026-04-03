'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import type { MemberUser, RoleMaster, CreateMemberDto, UpdateMemberDto, UserStatus } from '@/lib/types';
import { useMemberForm } from '../hooks/useMemberForm';

interface MemberFormProps {
  initial?: MemberUser | null;
  roles: RoleMaster[];
  isFetchingRoles: boolean;
  onRolesOpen: () => void;
  isSubmitting: boolean;
  onSubmit: (dto: CreateMemberDto | UpdateMemberDto) => void;
  onCancel: () => void;
  submitLabel: string;
  isEdit?: boolean;
}

export function MemberForm({
  initial,
  roles,
  isFetchingRoles,
  onRolesOpen,
  isSubmitting,
  onSubmit,
  onCancel,
  submitLabel,
  isEdit,
}: MemberFormProps) {
  const { fields, setters, handleSubmit } = useMemberForm({ initial, isEdit, onSubmit });
  const { firstName, lastName, email, password, phone, coarseRole, roleId, status } = fields;
  const { setFirstName, setLastName, setEmail, setPassword, setPhone, setCoarseRole, setRoleId, setStatus } = setters;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-sm font-semibold text-gray-700">First Name <span className="text-red-500">*</span></Label>
          <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John" required disabled={isSubmitting} className="focus-visible:ring-[#25a194]" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm font-semibold text-gray-700">Last Name <span className="text-red-500">*</span></Label>
          <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe" required disabled={isSubmitting} className="focus-visible:ring-[#25a194]" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-sm font-semibold text-gray-700">Email <span className="text-red-500">*</span></Label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@verdant.local" required disabled={isSubmitting} className="focus-visible:ring-[#25a194]" />
      </div>

      {!isEdit && (
        <div className="space-y-1.5">
          <Label className="text-sm font-semibold text-gray-700">Password <span className="text-red-500">*</span></Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 8 characters" required minLength={8} disabled={isSubmitting} className="focus-visible:ring-[#25a194]" />
        </div>
      )}

      <div className="space-y-1.5">
        <Label className="text-sm font-semibold text-gray-700">Phone</Label>
        <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 234 567 890" disabled={isSubmitting} className="focus-visible:ring-[#25a194]" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-sm font-semibold text-gray-700">System Role <span className="text-red-500">*</span></Label>
          <Select
            value={coarseRole}
            onValueChange={(v) => setCoarseRole(v ?? '')}
            onOpenChange={(open) => { if (open) onRolesOpen(); }}
            disabled={isSubmitting}
          >
            <SelectTrigger className="focus:ring-[#25a194]">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {isFetchingRoles ? (
                <div className="flex items-center justify-center py-2">
                  <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                </div>
              ) : (
                roles.map((r) => (
                  <SelectItem key={r.id} value={r.role}>{r.role}</SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-sm font-semibold text-gray-700">Fine-grained Role</Label>
          <Select
            value={roleId || '__none__'}
            onValueChange={(v) => setRoleId(!v || v === '__none__' ? '' : v)}
            onOpenChange={(open) => { if (open) onRolesOpen(); }}
            disabled={isSubmitting}
          >
            <SelectTrigger className="focus:ring-[#25a194]">
              <SelectValue placeholder="None" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__none__">None</SelectItem>
              {isFetchingRoles ? (
                <div className="flex items-center justify-center py-2">
                  <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                </div>
              ) : (
                roles.map((r) => (
                  <SelectItem key={r.id} value={r.id}>{r.role}</SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isEdit && (
        <div className="space-y-1.5">
          <Label className="text-sm font-semibold text-gray-700">Status</Label>
          <Select value={status} onValueChange={(v) => setStatus(v as UserStatus)} disabled={isSubmitting}>
            <SelectTrigger className="focus:ring-[#25a194]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
              <SelectItem value="SUSPENDED">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>Cancel</Button>
        <Button type="submit" className="bg-[#25a194] hover:bg-[#208b80] text-white" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
