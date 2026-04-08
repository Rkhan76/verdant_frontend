'use client';

import * as React from 'react';
import Link from 'next/link';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import { AxiosError } from 'axios';
import { Search, Download, Eye, Edit, Trash2, Loader2, AlertCircle, RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';
import { academicApi } from '@/lib/api/academic';
import type { AcademicClass, CreateAcademicClassDto, PaginatedResponse, UpdateAcademicClassDto } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Modal } from '@/components/ui/modal';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/ui/data-table';
import { Textarea } from '@/components/ui/textarea';

function getErrorMessage(error: unknown, fallback: string) {
  const axiosError = error as AxiosError<{ message?: string | string[] }>;
  const message = axiosError.response?.data?.message;
  return Array.isArray(message) ? message.join(', ') : message || fallback;
}

function buildColumns(
  onView: (item: AcademicClass) => void,
  onEdit: (item: AcademicClass) => void,
  onDelete: (item: AcademicClass) => void,
): ColumnDef<AcademicClass>[] {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={(table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')) as boolean}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: 'serial',
      header: 'S.L',
      cell: ({ row, table }) => {
        const pagination = table.getState().pagination;
        return pagination.pageIndex * pagination.pageSize + row.index + 1;
      },
    },
    {
      accessorKey: 'name',
      header: 'Class',
      cell: ({ row }) => <span className="font-semibold text-gray-800">{row.original.name}</span>,
    },
    {
      accessorKey: 'grade',
      header: 'Grade',
      cell: ({ row }) => row.original.grade || '-',
    },
    {
      id: 'sections',
      header: 'Sections',
      cell: ({ row }) => {
        const sections = row.original.sections ?? [];
        if (sections.length === 0) {
          return <span className="text-gray-400">No sections</span>;
        }

        return (
          <div className="flex flex-wrap gap-1">
            {sections.map((section) => (
              <span
                key={section.id}
                className="rounded-md bg-[#25a194]/10 px-2 py-1 text-xs font-medium text-[#25a194]"
              >
                {section.name}
              </span>
            ))}
          </div>
        );
      },
    },
    {
      id: 'sectionCount',
      header: 'Count',
      cell: ({ row }) => (
        <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
          {(row.original.sections ?? []).length}
        </span>
      ),
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => (
        <span className="block max-w-[240px] truncate text-gray-500">
          {row.original.description || '-'}
        </span>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Created',
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      id: 'actions',
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() => onView(row.original)}
            className="flex h-8 w-8 items-center justify-center rounded text-gray-400 transition-colors hover:bg-[#25a194]/10 hover:text-[#25a194]"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => onEdit(row.original)}
            className="flex h-8 w-8 items-center justify-center rounded text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(row.original)}
            className="flex h-8 w-8 items-center justify-center rounded text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];
}

interface ClassFormProps {
  initial?: Partial<CreateAcademicClassDto>;
  isSubmitting: boolean;
  onSubmit: (dto: CreateAcademicClassDto | UpdateAcademicClassDto) => void;
  onCancel: () => void;
  submitLabel: string;
}

function ClassForm({ initial, isSubmitting, onSubmit, onCancel, submitLabel }: ClassFormProps) {
  const [name, setName] = React.useState(initial?.name ?? '');
  const [grade, setGrade] = React.useState(initial?.grade ?? '');
  const [description, setDescription] = React.useState(initial?.description ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: name.trim(),
      grade: grade.trim() || undefined,
      description: description.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label>Class Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Class 1" required disabled={isSubmitting} />
      </div>
      <div className="space-y-1.5">
        <Label>Grade</Label>
        <Input value={grade} onChange={(e) => setGrade(e.target.value)} placeholder="1" disabled={isSubmitting} />
      </div>
      <div className="space-y-1.5">
        <Label>Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Primary level class"
          disabled={isSubmitting}
        />
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" className="bg-[#25a194] text-white hover:bg-[#208b80]" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

export default function ClassesPage() {
  const [result, setResult] = React.useState<PaginatedResponse<AcademicClass>>({
    data: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [search, setSearch] = React.useState('');
  const deferredSearch = React.useDeferredValue(search);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [createOpen, setCreateOpen] = React.useState(false);
  const [viewTarget, setViewTarget] = React.useState<AcademicClass | null>(null);
  const [editTarget, setEditTarget] = React.useState<AcademicClass | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<AcademicClass | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const fetchClasses = React.useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await academicApi.getClasses({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        search: deferredSearch.trim() || undefined,
      });
      setResult(response);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to fetch classes'));
    } finally {
      setIsLoading(false);
    }
  }, [deferredSearch, pagination.pageIndex, pagination.pageSize]);

  React.useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  React.useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [deferredSearch]);

  const handleCreate = async (dto: CreateAcademicClassDto | UpdateAcademicClassDto) => {
    setIsSubmitting(true);
    try {
      await academicApi.createClass(dto as CreateAcademicClassDto);
      toast.success('Class created successfully');
      setCreateOpen(false);
      await fetchClasses();
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to create class'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (dto: CreateAcademicClassDto | UpdateAcademicClassDto) => {
    if (!editTarget) return;
    setIsSubmitting(true);
    try {
      await academicApi.updateClass(editTarget.id, dto as UpdateAcademicClassDto);
      toast.success('Class updated successfully');
      setEditTarget(null);
      await fetchClasses();
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to update class'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsSubmitting(true);
    try {
      await academicApi.removeClass(deleteTarget.id);
      toast.success('Class deleted successfully');
      setDeleteTarget(null);
      if (result.data.length === 1 && pagination.pageIndex > 0) {
        setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex - 1 }));
      } else {
        await fetchClasses();
      }
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to delete class'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = React.useMemo(
    () => buildColumns(setViewTarget, setEditTarget, setDeleteTarget),
    [],
  );

  return (
    <div className="w-full h-full flex flex-col space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Classes</h1>
          <p className="mt-1 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="transition-colors hover:text-[#25a194]">Dashboard</Link>
            <span>/</span>
            <Link href="/classes" className="transition-colors hover:text-[#25a194]">Classes</Link>
            <span>/</span>
            <span className="text-gray-400">Classes List</span>
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)} className="bg-[#25a194] text-white hover:bg-[#208b80]">
          + Add Class
        </Button>
      </div>

      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <Select defaultValue="export">
              <SelectTrigger className="h-10 w-[110px] border-gray-200 bg-white text-gray-600">
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="export">Export</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative w-full sm:w-[280px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by class, grade or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 border-gray-200 pl-9"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={fetchClasses}
              disabled={isLoading}
              className="border-gray-200 text-gray-600"
            >
              <RefreshCcw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <span className="text-sm text-gray-500">Rows per page:</span>
            <Select
              value={String(pagination.pageSize)}
              onValueChange={(value) =>
                setPagination({
                  pageIndex: 0,
                  pageSize: Number(value),
                })
              }
            >
              <SelectTrigger className="h-10 w-[80px] border-gray-200 bg-white text-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="p-2">
          <DataTable
            columns={columns}
            data={result.data}
            isLoading={isLoading}
            emptyMessage="No classes found."
            pagination={{
              pageIndex: pagination.pageIndex,
              pageSize: pagination.pageSize,
              pageCount: result.totalPages,
              rowCount: result.total,
              onPaginationChange: setPagination,
            }}
          />
        </div>
      </div>

      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Add Class">
        <ClassForm
          isSubmitting={isSubmitting}
          onSubmit={handleCreate}
          onCancel={() => setCreateOpen(false)}
          submitLabel="Create Class"
        />
      </Modal>

      <Modal open={!!editTarget} onClose={() => setEditTarget(null)} title="Edit Class">
        {editTarget && (
          <ClassForm
            initial={{
              name: editTarget.name,
              grade: editTarget.grade ?? undefined,
              description: editTarget.description ?? undefined,
            }}
            isSubmitting={isSubmitting}
            onSubmit={handleUpdate}
            onCancel={() => setEditTarget(null)}
            submitLabel="Save Changes"
          />
        )}
      </Modal>

      <Modal open={!!viewTarget} onClose={() => setViewTarget(null)} title="Class Details">
        {viewTarget && (
          <div className="space-y-4 text-sm text-gray-600">
            <div>
              <p className="text-xs font-semibold uppercase text-gray-400">Class</p>
              <p className="mt-1 text-base font-semibold text-gray-900">{viewTarget.name}</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase text-gray-400">Grade</p>
                <p className="mt-1">{viewTarget.grade || '-'}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-gray-400">Sections</p>
                <p className="mt-1">{(viewTarget.sections ?? []).length}</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-gray-400">Description</p>
              <p className="mt-1">{viewTarget.description || 'No description provided.'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-gray-400">Section Names</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {(viewTarget.sections ?? []).length > 0 ? (
                  viewTarget.sections?.map((section) => (
                    <span key={section.id} className="rounded-md bg-[#25a194]/10 px-2 py-1 text-xs font-medium text-[#25a194]">
                      {section.name}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400">No sections assigned.</span>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Class" width="max-w-sm">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Delete <span className="font-semibold text-gray-900">{deleteTarget?.name}</span>? This cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeleteTarget(null)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleDelete} className="bg-red-500 text-white hover:bg-red-600" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
