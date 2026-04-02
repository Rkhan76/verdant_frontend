'use client';

import * as React from 'react';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Download, Edit, Trash2, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { Modal } from '@/components/ui/modal';
import { useRolesStore } from '@/store/rolesStore';
import type { Role, CreateRoleDto } from '@/lib/types';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

// ── Column definitions ────────────────────────────────────────────────────

function buildColumns(
  onEdit: (r: Role) => void,
  onDelete: (r: Role) => void,
): ColumnDef<Role>[] {
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
      accessorKey: 'name',
      header: 'Role Name',
      cell: ({ row }) => (
        <span className="font-semibold text-gray-900">{row.getValue('name')}</span>
      ),
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => (
        <span className="text-gray-500 text-sm">{row.getValue('description') ?? '—'}</span>
      ),
    },
    {
      id: 'permissions',
      header: 'Permissions',
      cell: ({ row }) => {
        const rps = row.original.rolePermissions ?? [];
        if (rps.length === 0) return <span className="text-gray-300 text-sm italic">None</span>;
        return (
          <div className="flex flex-wrap gap-1">
            {rps.slice(0, 3).map((rp) => (
              <span
                key={rp.id}
                className="font-mono text-[11px] bg-[#25a194]/10 text-[#25a194] px-1.5 py-0.5 rounded"
              >
                {rp.permission.code}
              </span>
            ))}
            {rps.length > 3 && (
              <span className="text-xs text-gray-400">+{rps.length - 3} more</span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Created',
      cell: ({ row }) => (
        <span className="text-gray-400 text-sm">
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

// ── Role Form with permission assignment ─────────────────────────────────

interface RoleFormProps {
  initial?: Role | null;
  allPermissions: { id: string; code: string; description: string }[];
  isSubmitting: boolean;
  onSubmit: (dto: CreateRoleDto, selectedPermissionIds: string[]) => void;
  onCancel: () => void;
  submitLabel: string;
}

function RoleForm({ initial, allPermissions, isSubmitting, onSubmit, onCancel, submitLabel }: RoleFormProps) {
  const [name, setName] = React.useState(initial?.name ?? '');
  const [description, setDescription] = React.useState(initial?.description ?? '');
  const [selectedIds, setSelectedIds] = React.useState<string[]>(
    initial?.rolePermissions?.map((rp) => rp.permission.id) ?? [],
  );
  const [permSearch, setPermSearch] = React.useState('');

  const togglePermission = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const filteredPerms = allPermissions.filter(
    (p) =>
      p.code.toLowerCase().includes(permSearch.toLowerCase()) ||
      p.description.toLowerCase().includes(permSearch.toLowerCase()),
  );

  const handleSubmit = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    onSubmit({ name: name.trim(), description: description.trim() || undefined }, selectedIds);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <Label className="text-sm font-semibold text-gray-700">
          Role Name <span className="text-red-500">*</span>
        </Label>
        <Input
          placeholder="e.g. Class Teacher"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="focus-visible:ring-[#25a194]"
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-sm font-semibold text-gray-700">Description</Label>
        <Input
          placeholder="Brief description of this role"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="focus-visible:ring-[#25a194]"
          disabled={isSubmitting}
        />
      </div>

      {/* Permission picker */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-semibold text-gray-700">Assign Permissions</Label>
          <span className="text-xs text-gray-400">{selectedIds.length} selected</span>
        </div>

        {allPermissions.length === 0 ? (
          <p className="text-xs text-gray-400 italic">No permissions found. Create some first.</p>
        ) : (
          <>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <Input
                placeholder="Filter permissions..."
                value={permSearch}
                onChange={(e) => setPermSearch(e.target.value)}
                className="pl-8 h-8 text-sm focus-visible:ring-[#25a194]"
                disabled={isSubmitting}
              />
            </div>

            <div className="border border-gray-100 rounded-lg divide-y divide-gray-50 max-h-52 overflow-y-auto">
              {filteredPerms.map((p) => (
                <label
                  key={p.id}
                  className="flex items-start gap-3 px-3 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <Checkbox
                    checked={selectedIds.includes(p.id)}
                    onCheckedChange={() => togglePermission(p.id)}
                    disabled={isSubmitting}
                    className="mt-0.5 data-[state=checked]:bg-[#25a194] data-[state=checked]:border-[#25a194]"
                  />
                  <div className="min-w-0">
                    <span className="font-mono text-xs font-semibold text-[#25a194] block">{p.code}</span>
                    <span className="text-xs text-gray-500 block truncate">{p.description}</span>
                  </div>
                </label>
              ))}
              {filteredPerms.length === 0 && (
                <p className="text-xs text-gray-400 italic px-3 py-4 text-center">No matching permissions</p>
              )}
            </div>
          </>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-1">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-[#25a194] hover:bg-[#208b80] text-white"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────

export default function RolesPage() {
  const {
    roles,
    allPermissions,
    isLoading,
    error,
    fetchRoles,
    fetchAllPermissions,
    createRole,
    updateRole,
    deleteRole,
    syncPermissions,
  } = useRolesStore();

  const [search, setSearch] = React.useState('');
  const [createOpen, setCreateOpen] = React.useState(false);
  const [editTarget, setEditTarget] = React.useState<Role | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<Role | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    fetchRoles();
    fetchAllPermissions();
  }, [fetchRoles, fetchAllPermissions]);

  const filtered = React.useMemo(
    () =>
      roles.filter(
        (r) =>
          r.name.toLowerCase().includes(search.toLowerCase()) ||
          (r.description ?? '').toLowerCase().includes(search.toLowerCase()),
      ),
    [roles, search],
  );

  const handleCreate = async (dto: CreateRoleDto, selectedPermissionIds: string[]) => {
    setIsSubmitting(true);
    try {
      await createRole(dto);
      // Assign permissions to the newly created role
      const created = useRolesStore.getState().roles.at(-1);
      if (created && selectedPermissionIds.length > 0) {
        await syncPermissions(created.id, selectedPermissionIds);
      }
      toast.success('Role created');
      setCreateOpen(false);
    } catch (err) {
      const msg = (err as AxiosError<{ message: string }>).response?.data?.message ?? 'Failed to create role';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (dto: CreateRoleDto, selectedPermissionIds: string[]) => {
    if (!editTarget) return;
    setIsSubmitting(true);
    try {
      await updateRole(editTarget.id, dto);
      await syncPermissions(editTarget.id, selectedPermissionIds);
      toast.success('Role updated');
      setEditTarget(null);
    } catch (err) {
      const msg = (err as AxiosError<{ message: string }>).response?.data?.message ?? 'Failed to update role';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsSubmitting(true);
    try {
      await deleteRole(deleteTarget.id);
      toast.success('Role deleted');
      setDeleteTarget(null);
    } catch {
      toast.error('Failed to delete role');
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = React.useMemo(
    () => buildColumns((r) => setEditTarget(r), (r) => setDeleteTarget(r)),
    [],
  );

  return (
    <div className="w-full h-full flex flex-col space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Roles Management</h1>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <Link href="/" className="hover:text-[#25a194] transition-colors font-medium">Dashboard</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-400">Roles</span>
          </p>
        </div>
        <Button
          onClick={() => setCreateOpen(true)}
          className="bg-[#25a194] hover:bg-[#208b80] text-white px-6 h-11 rounded-lg font-semibold shadow-md active:scale-95 transition-all"
        >
          + Add New Role
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
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            <Select defaultValue="export">
              <SelectTrigger className="w-[120px] h-10 bg-white border-gray-200 text-gray-600 rounded-lg shadow-sm focus:ring-[#25a194]">
                <div className="flex items-center gap-2 font-medium">
                  <Download className="h-4 w-4 text-[#25a194]" />
                  <span>Export</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="export">Export All</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative w-full lg:w-[350px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#25a194]" />
              <Input
                placeholder="Search roles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-10 border-gray-200 shadow-sm rounded-lg text-sm focus-visible:ring-[#25a194]"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <ShieldCheck className="h-4 w-4 text-[#25a194]" />
            <span>{roles.length} role{roles.length !== 1 ? 's' : ''} total</span>
          </div>
        </div>

        {/* Table */}
        <div className="p-1">
          {isLoading ? (
            <div className="flex items-center justify-center h-40 gap-3 text-gray-400">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Loading roles...</span>
            </div>
          ) : (
            <DataTable columns={columns} data={filtered} />
          )}
        </div>
      </div>

      {/* Create Modal */}
      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Create Role" width="max-w-xl">
        <RoleForm
          allPermissions={allPermissions}
          isSubmitting={isSubmitting}
          onSubmit={handleCreate}
          onCancel={() => setCreateOpen(false)}
          submitLabel="Create Role"
        />
      </Modal>

      {/* Edit Modal */}
      <Modal open={!!editTarget} onClose={() => setEditTarget(null)} title="Edit Role" width="max-w-xl">
        {editTarget && (
          <RoleForm
            initial={editTarget}
            allPermissions={allPermissions}
            isSubmitting={isSubmitting}
            onSubmit={handleUpdate}
            onCancel={() => setEditTarget(null)}
            submitLabel="Save Changes"
          />
        )}
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Role" width="max-w-sm">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Are you sure you want to delete the role{' '}
            <span className="font-semibold text-gray-900">{deleteTarget?.name}</span>?
            Users assigned this role will lose their fine-grained permissions.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeleteTarget(null)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
