'use client';

import * as React from 'react';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Search, Download, Edit, Trash2, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Modal } from '@/components/ui/modal';
import { usePermissionsStore } from '@/store/permissionsStore';
import type { Permission, CreatePermissionDto, UpdatePermissionDto } from '@/lib/types';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

// ── Column definitions (pure UI, no logic) ──────────────────────────────

function buildColumns(
  onEdit: (p: Permission) => void,
  onDelete: (p: Permission) => void,
): ColumnDef<Permission>[] {
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
      accessorKey: 'code',
      header: 'Code',
      cell: ({ row }) => (
        <span className="font-mono text-xs font-semibold bg-[#25a194]/10 text-[#25a194] px-2 py-1 rounded-md">
          {row.getValue('code')}
        </span>
      ),
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => (
        <span className="text-gray-600">{row.getValue('description')}</span>
      ),
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

// ── Permission Form (shared for create & edit) ──────────────────────────

interface PermissionFormProps {
  initial?: Partial<CreatePermissionDto>;
  isSubmitting: boolean;
  onSubmit: (dto: CreatePermissionDto) => void;
  onCancel: () => void;
  submitLabel: string;
}

function PermissionForm({ initial, isSubmitting, onSubmit, onCancel, submitLabel }: PermissionFormProps) {
  const [code, setCode] = React.useState(initial?.code ?? '');
  const [description, setDescription] = React.useState(initial?.description ?? '');

  const handleSubmit = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    onSubmit({ code: code.trim(), description: description.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label className="text-sm font-semibold text-gray-700">
          Permission Code <span className="text-red-500">*</span>
        </Label>
        <Input
          placeholder="e.g. student:create"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="font-mono focus-visible:ring-[#25a194]"
          required
          disabled={isSubmitting}
        />
        <p className="text-xs text-gray-400">Format: <code className="bg-gray-100 px-1 rounded">resource:action</code></p>
      </div>
      <div className="space-y-1.5">
        <Label className="text-sm font-semibold text-gray-700">
          Description <span className="text-red-500">*</span>
        </Label>
        <Input
          placeholder="What does this permission allow?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="focus-visible:ring-[#25a194]"
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-[#25a194] hover:bg-[#208b80] text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────

export default function PermissionsPage() {
  const { permissions, isLoading, error, fetchPermissions, createPermission, updatePermission, deletePermission } =
    usePermissionsStore();

  const [search, setSearch] = React.useState('');
  const [createOpen, setCreateOpen] = React.useState(false);
  const [editTarget, setEditTarget] = React.useState<Permission | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<Permission | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    fetchPermissions();
  }, [fetchPermissions]);

  const filtered = React.useMemo(
    () =>
      permissions.filter(
        (p) =>
          p.code.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase()),
      ),
    [permissions, search],
  );

  const handleCreate = async (dto: CreatePermissionDto) => {
    setIsSubmitting(true);
    try {
      await createPermission(dto);
      toast.success('Permission created');
      setCreateOpen(false);
    } catch (err) {
      const msg = (err as AxiosError<{ message: string }>).response?.data?.message ?? 'Failed to create';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (dto: UpdatePermissionDto) => {
    if (!editTarget) return;
    setIsSubmitting(true);
    try {
      await updatePermission(editTarget.id, dto);
      toast.success('Permission updated');
      setEditTarget(null);
    } catch (err) {
      const msg = (err as AxiosError<{ message: string }>).response?.data?.message ?? 'Failed to update';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsSubmitting(true);
    try {
      await deletePermission(deleteTarget.id);
      toast.success('Permission deleted');
      setDeleteTarget(null);
    } catch {
      toast.error('Failed to delete permission');
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = React.useMemo(
    () => buildColumns((p) => setEditTarget(p), (p) => setDeleteTarget(p)),
    [],
  );

  return (
    <div className="w-full h-full flex flex-col space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Permissions & Access Control</h1>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <Link href="/" className="hover:text-[#25a194] transition-colors font-medium">Dashboard</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-400">Permissions</span>
          </p>
        </div>
        <Button
          onClick={() => setCreateOpen(true)}
          className="bg-[#25a194] hover:bg-[#208b80] text-white px-6 h-11 rounded-lg font-semibold shadow-md active:scale-95 transition-all"
        >
          + Add New Permission
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
                placeholder="Search by code or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-10 border-gray-200 shadow-sm rounded-lg text-sm focus-visible:ring-[#25a194]"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <ShieldCheck className="h-4 w-4 text-[#25a194]" />
            <span>{permissions.length} permission{permissions.length !== 1 ? 's' : ''} total</span>
          </div>
        </div>

        {/* Table */}
        <div className="p-1">
          {isLoading ? (
            <div className="flex items-center justify-center h-40 gap-3 text-gray-400">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Loading permissions...</span>
            </div>
          ) : (
            <DataTable columns={columns} data={filtered} />
          )}
        </div>
      </div>

      {/* Create Modal */}
      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Create Permission">
        <PermissionForm
          isSubmitting={isSubmitting}
          onSubmit={handleCreate}
          onCancel={() => setCreateOpen(false)}
          submitLabel="Create Permission"
        />
      </Modal>

      {/* Edit Modal */}
      <Modal open={!!editTarget} onClose={() => setEditTarget(null)} title="Edit Permission">
        {editTarget && (
          <PermissionForm
            initial={{ code: editTarget.code, description: editTarget.description }}
            isSubmitting={isSubmitting}
            onSubmit={handleUpdate}
            onCancel={() => setEditTarget(null)}
            submitLabel="Save Changes"
          />
        )}
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Permission" width="max-w-sm">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Are you sure you want to delete{' '}
            <span className="font-mono font-semibold text-gray-900">{deleteTarget?.code}</span>?
            This will also remove it from all roles.
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
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
