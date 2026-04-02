'use client';

import * as React from 'react';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Modal } from '@/components/ui/modal';
import { DataTable } from '@/components/ui/data-table';
import {
  Search, Download, Edit, Trash2, Filter, MoreHorizontal,
  UserPlus, Loader2, AlertCircle, Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMembersStore } from '@/store/membersStore';
import { useRolesStore } from '@/store/rolesStore';
import type { MemberUser, CreateMemberDto, UpdateMemberDto, UserStatus } from '@/lib/types';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

// ── Helpers ───────────────────────────────────────────────────────────────

function getInitials(firstName: string, lastName: string) {
  return `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();
}

function displayRole(member: MemberUser): string {
  return member.roleEntity?.name ?? member.role;
}

const STATUS_STYLES: Record<UserStatus, string> = {
  ACTIVE: 'bg-green-50 text-green-600',
  INACTIVE: 'bg-red-50 text-red-600',
  SUSPENDED: 'bg-orange-50 text-orange-600',
};

// ── Column definitions ────────────────────────────────────────────────────

function buildColumns(
  onEdit: (m: MemberUser) => void,
  onDelete: (m: MemberUser) => void,
  onToggleStatus: (m: MemberUser) => void,
): ColumnDef<MemberUser>[] {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={(table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')) as boolean}
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: 'name',
      header: 'Name',
      cell: ({ row }) => {
        const m = row.original;
        const initials = getInitials(m.firstName, m.lastName);
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 border border-gray-100 ring-2 ring-transparent">
              <AvatarFallback className="bg-gray-50 text-gray-600 text-xs font-semibold">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900">{m.firstName} {m.lastName}</span>
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                MEMBER-{m.id.slice(0, 8).toUpperCase()}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => <span className="text-gray-600 font-medium">{row.getValue('email')}</span>,
    },
    {
      id: 'role',
      header: 'Role',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-[#25a194]" />
          <span className="text-gray-600 font-medium">{displayRole(row.original)}</span>
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as UserStatus;
        return (
          <button onClick={() => onToggleStatus(row.original)} className="cursor-pointer">
            <Badge className={cn('rounded-full px-2.5 py-0.5 text-[11px] font-bold border-0 shadow-none', STATUS_STYLES[status])}>
              {status.charAt(0) + status.slice(1).toLowerCase()}
            </Badge>
          </button>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }) => (
        <span className="text-gray-500 italic font-medium">
          {new Date(row.getValue('createdAt')).toLocaleDateString()}
        </span>
      ),
    },
    {
      id: 'actions',
      header: () => <div className="text-center">Actions</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() => onEdit(row.original)}
            className="h-8 w-8 rounded text-gray-400 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-all border border-transparent hover:border-blue-200"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(row.original)}
            className="h-8 w-8 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-all border border-transparent hover:border-red-200"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];
}

// ── Member Form ───────────────────────────────────────────────────────────

interface MemberFormProps {
  initial?: MemberUser | null;
  roles: { id: string; name: string }[];
  isSubmitting: boolean;
  onSubmit: (dto: CreateMemberDto | UpdateMemberDto) => void;
  onCancel: () => void;
  submitLabel: string;
  isEdit?: boolean;
}

function MemberForm({ initial, roles, isSubmitting, onSubmit, onCancel, submitLabel, isEdit }: MemberFormProps) {
  const [firstName, setFirstName] = React.useState(initial?.firstName ?? '');
  const [lastName, setLastName] = React.useState(initial?.lastName ?? '');
  const [email, setEmail] = React.useState(initial?.email ?? '');
  const [password, setPassword] = React.useState('');
  const [phone, setPhone] = React.useState(initial?.phone ?? '');
  const [coarseRole, setCoarseRole] = React.useState<'SUPERADMIN' | 'ADMIN'>(
    (initial?.role as 'SUPERADMIN' | 'ADMIN') ?? 'ADMIN',
  );
  const [roleId, setRoleId] = React.useState<string>(initial?.roleId != null ? initial.roleId : '');
  const [status, setStatus] = React.useState<UserStatus>(initial?.status ?? 'ACTIVE');

  const handleSubmit = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    if (isEdit) {
      const dto: UpdateMemberDto = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        role: coarseRole,
        roleId: roleId || null,
        status,
      };
      onSubmit(dto);
    } else {
      const dto: CreateMemberDto = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password,
        phone: phone.trim() || undefined,
        role: coarseRole,
        roleId: roleId || undefined,
      };
      onSubmit(dto);
    }
  };

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
          <Select value={coarseRole} onValueChange={(v) => setCoarseRole(v as 'SUPERADMIN' | 'ADMIN')} disabled={isSubmitting}>
            <SelectTrigger className="focus:ring-[#25a194]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SUPERADMIN">Super Admin</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-sm font-semibold text-gray-700">Fine-grained Role</Label>
          <Select value={roleId || '__none__'} onValueChange={(v) => setRoleId(v === '__none__' ? '' : v)} disabled={isSubmitting}>
            <SelectTrigger className="focus:ring-[#25a194]">
              <SelectValue placeholder="None" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__none__">None</SelectItem>
              {roles.map((r) => (
                <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
              ))}
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

// ── Page ─────────────────────────────────────────────────────────────────

export default function MembersPage() {
  const { members, isLoading, error, fetchMembers, createMember, updateMember, updateMemberStatus, deleteMember } =
    useMembersStore();
  const { roles, fetchAllPermissions } = useRolesStore();

  const [search, setSearch] = React.useState('');
  const [roleFilter, setRoleFilter] = React.useState<'all' | 'SUPERADMIN' | 'ADMIN'>('all');
  const [createOpen, setCreateOpen] = React.useState(false);
  const [editTarget, setEditTarget] = React.useState<MemberUser | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<MemberUser | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    fetchMembers();
    fetchAllPermissions(); // loads roles list for the form picker
  }, [fetchMembers, fetchAllPermissions]);

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

  return (
    <div className="w-full h-full flex flex-col space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Members Directory</h1>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <Link href="/" className="hover:text-[#25a194] transition-colors font-medium">Dashboard</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-400 font-medium">Members</span>
          </p>
        </div>
        <Button
          onClick={() => setCreateOpen(true)}
          className="bg-[#25a194] hover:bg-[#208b80] text-white px-6 h-11 rounded-xl font-semibold shadow-lg shadow-[#25a194]/10 transition-all active:scale-95 flex items-center gap-2"
        >
          <UserPlus className="h-4 w-4" />
          <span>Add New Member</span>
        </Button>
      </div>

      {/* Error banner */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-100 flex flex-col lg:flex-row justify-between items-center gap-4 bg-gray-50/30">
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            <Select defaultValue="export">
              <SelectTrigger className="w-[125px] h-11 bg-white border-gray-200 text-gray-600 rounded-xl shadow-sm focus:ring-[#25a194]">
                <div className="flex items-center gap-2 font-semibold">
                  <Download className="h-4 w-4 text-[#25a194]" />
                  <span>Export</span>
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                <SelectItem value="export">Export All</SelectItem>
                <SelectItem value="csv">CSV (Excel)</SelectItem>
                <SelectItem value="pdf">PDF Document</SelectItem>
              </SelectContent>
            </Select>

            <Select value={roleFilter} onValueChange={(v) => setRoleFilter(v as typeof roleFilter)}>
              <SelectTrigger className="w-[140px] h-11 bg-white border-gray-200 text-gray-600 rounded-xl shadow-sm focus:ring-[#25a194]">
                <div className="flex items-center gap-2 font-semibold">
                  <Filter className="h-4 w-4 text-[#25a194]" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="SUPERADMIN">Super Admin</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative w-full lg:w-[350px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#25a194]" />
              <Input
                placeholder="Search by name, email, or role..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 h-11 bg-white border-gray-200 shadow-sm rounded-xl text-sm focus-visible:ring-[#25a194]"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto justify-end">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Users className="h-4 w-4 text-[#25a194]" />
              <span>{members.length} member{members.length !== 1 ? 's' : ''}</span>
            </div>
            <Button variant="outline" className="h-11 w-11 p-0 rounded-xl border-gray-200 text-gray-400 hover:text-[#25a194]">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="p-2">
          {isLoading ? (
            <div className="flex items-center justify-center h-40 gap-3 text-gray-400">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Loading members...</span>
            </div>
          ) : (
            <DataTable columns={columns} data={filtered} />
          )}
        </div>
      </div>

      {/* Create Modal */}
      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Add New Member" width="max-w-xl">
        <MemberForm
          roles={roles}
          isSubmitting={isSubmitting}
          onSubmit={handleCreate}
          onCancel={() => setCreateOpen(false)}
          submitLabel="Create Member"
        />
      </Modal>

      {/* Edit Modal */}
      <Modal open={!!editTarget} onClose={() => setEditTarget(null)} title="Edit Member" width="max-w-xl">
        {editTarget && (
          <MemberForm
            initial={editTarget}
            roles={roles}
            isEdit
            isSubmitting={isSubmitting}
            onSubmit={handleUpdate}
            onCancel={() => setEditTarget(null)}
            submitLabel="Save Changes"
          />
        )}
      </Modal>

      {/* Delete Confirm */}
      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Member" width="max-w-sm">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-gray-900">
              {deleteTarget?.firstName} {deleteTarget?.lastName}
            </span>?
            This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeleteTarget(null)} disabled={isSubmitting}>Cancel</Button>
            <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
