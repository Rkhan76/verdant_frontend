import * as React from 'react';
import { useMembersStore } from '@/store/membersStore';
import { useRolesStore } from '@/store/rolesStore';
import { buildColumns, displayRole } from '../components/MemberColumns';
import type { MemberUser, CreateMemberDto, UpdateMemberDto, UserStatus } from '@/lib/types';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export function useMembersPage() {
  const { members, isLoading, error, fetchMembers, createMember, updateMember, updateMemberStatus, deleteMember } =
    useMembersStore();
  const { rolesMaster, isFetchingMaster, fetchRolesMaster } = useRolesStore();

  const [search, setSearch] = React.useState('');
  const [roleFilter, setRoleFilter] = React.useState<'all' | 'SUPERADMIN' | 'ADMIN'>('all');
  const [createOpen, setCreateOpen] = React.useState(false);
  const [editTarget, setEditTarget] = React.useState<MemberUser | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<MemberUser | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const filtered = React.useMemo(() => {
    return members
      .filter((m) => roleFilter === 'all' || m.role === roleFilter)
      .filter((m) => {
        const q = search.toLowerCase();
        return (
          m.firstName.toLowerCase().includes(q) ||
          m.lastName.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q) ||
          displayRole(m).toLowerCase().includes(q)
        );
      });
  }, [members, search, roleFilter]);

  const handleCreate = async (dto: CreateMemberDto | UpdateMemberDto) => {
    setIsSubmitting(true);
    try {
      await createMember(dto as CreateMemberDto);
      toast.success('Member created');
      setCreateOpen(false);
    } catch (err) {
      toast.error((err as AxiosError<{ message: string }>).response?.data?.message ?? 'Failed to create member');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (dto: CreateMemberDto | UpdateMemberDto) => {
    if (!editTarget) return;
    setIsSubmitting(true);
    try {
      await updateMember(editTarget.id, dto as UpdateMemberDto);
      toast.success('Member updated');
      setEditTarget(null);
    } catch (err) {
      toast.error((err as AxiosError<{ message: string }>).response?.data?.message ?? 'Failed to update member');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (member: MemberUser) => {
    const next: UserStatus = member.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    try {
      await updateMemberStatus(member.id, next);
      toast.success(`Member ${next === 'ACTIVE' ? 'activated' : 'deactivated'}`);
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsSubmitting(true);
    try {
      await deleteMember(deleteTarget.id);
      toast.success('Member deleted');
      setDeleteTarget(null);
    } catch {
      toast.error('Failed to delete member');
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = React.useMemo(
    () => buildColumns((m) => setEditTarget(m), (m) => setDeleteTarget(m), handleToggleStatus),
    [members],
  );

  return {
    // table data
    members,
    filtered,
    columns,
    isLoading,
    error,
    // roles dropdown
    rolesMaster,
    isFetchingMaster,
    fetchRolesMaster,
    // toolbar
    search,
    setSearch,
    roleFilter,
    setRoleFilter,
    // modal state
    createOpen,
    setCreateOpen,
    editTarget,
    setEditTarget,
    deleteTarget,
    setDeleteTarget,
    // submission
    isSubmitting,
    // handlers
    handleCreate,
    handleUpdate,
    handleToggleStatus,
    handleDelete,
  };
}
