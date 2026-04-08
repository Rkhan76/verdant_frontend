'use client';

import * as React from 'react';
import Link from 'next/link';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import { AxiosError } from 'axios';
import { Search, Download, Eye, Edit, Trash2, Loader2, AlertCircle, RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';
import { academicApi } from '@/lib/api/academic';
import type {
  AcademicClass,
  AcademicSection,
  CreateAcademicSectionDto,
  PaginatedResponse,
  UpdateAcademicSectionDto,
} from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Modal } from '@/components/ui/modal';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/ui/data-table';

function getErrorMessage(error: unknown, fallback: string) {
  const axiosError = error as AxiosError<{ message?: string | string[] }>;
  const message = axiosError.response?.data?.message;
  return Array.isArray(message) ? message.join(', ') : message || fallback;
}

function buildColumns(
  onView: (item: AcademicSection) => void,
  onEdit: (item: AcademicSection) => void,
  onDelete: (item: AcademicSection) => void,
): ColumnDef<AcademicSection>[] {
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
      header: 'Section',
      cell: ({ row }) => <span className="font-semibold text-gray-800">{row.original.name}</span>,
    },
    {
      id: 'className',
      header: 'Class',
      cell: ({ row }) => row.original.class?.name || '-',
    },
    {
      id: 'grade',
      header: 'Grade',
      cell: ({ row }) => row.original.class?.grade || '-',
    },
    {
      accessorKey: 'maxCapacity',
      header: 'Capacity',
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

interface SectionFormProps {
  classes: AcademicClass[];
  initial?: Partial<CreateAcademicSectionDto>;
  isSubmitting: boolean;
  onSubmit: (dto: CreateAcademicSectionDto | UpdateAcademicSectionDto) => void;
  onCancel: () => void;
  submitLabel: string;
}

function SectionForm({
  classes,
  initial,
  isSubmitting,
  onSubmit,
  onCancel,
  submitLabel,
}: SectionFormProps) {
  const [name, setName] = React.useState(initial?.name ?? '');
  const [classId, setClassId] = React.useState(initial?.classId ?? '');
  const [maxCapacity, setMaxCapacity] = React.useState(String(initial?.maxCapacity ?? 40));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: name.trim(),
      classId,
      maxCapacity: Number(maxCapacity),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label>Section Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="A" required disabled={isSubmitting} />
      </div>
      <div className="space-y-1.5">
        <Label>Class</Label>
        <Select value={classId} onValueChange={(value) => setClassId(value ?? '')} disabled={isSubmitting}>
          <SelectTrigger>
            <SelectValue placeholder="Select a class" />
          </SelectTrigger>
          <SelectContent>
            {classes.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}{item.grade ? ` (${item.grade})` : ''}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label>Max Capacity</Label>
        <Input
          type="number"
          min={1}
          value={maxCapacity}
          onChange={(e) => setMaxCapacity(e.target.value)}
          disabled={isSubmitting}
          required
        />
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" className="bg-[#25a194] text-white hover:bg-[#208b80]" disabled={isSubmitting || !classId}>
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

export default function SectionsPage() {
  const [result, setResult] = React.useState<PaginatedResponse<AcademicSection>>({
    data: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [classOptions, setClassOptions] = React.useState<AcademicClass[]>([]);
  const [search, setSearch] = React.useState('');
  const deferredSearch = React.useDeferredValue(search);
  const [classFilter, setClassFilter] = React.useState<string>('all');
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [createOpen, setCreateOpen] = React.useState(false);
  const [viewTarget, setViewTarget] = React.useState<AcademicSection | null>(null);
  const [editTarget, setEditTarget] = React.useState<AcademicSection | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<AcademicSection | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const fetchClassOptions = React.useCallback(async () => {
    try {
      const response = await academicApi.getClasses({ page: 1, limit: 100 });
      setClassOptions(response.data);
    } catch {
      toast.error('Failed to load class options');
    }
  }, []);

  const fetchSections = React.useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await academicApi.getSections({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        search: deferredSearch.trim() || undefined,
        classId: classFilter === 'all' ? undefined : classFilter,
      });
      setResult(response);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to fetch sections'));
    } finally {
      setIsLoading(false);
    }
  }, [classFilter, deferredSearch, pagination.pageIndex, pagination.pageSize]);

  React.useEffect(() => {
    fetchClassOptions();
  }, [fetchClassOptions]);

  React.useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  React.useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [deferredSearch, classFilter]);

  const handleCreate = async (dto: CreateAcademicSectionDto | UpdateAcademicSectionDto) => {
    setIsSubmitting(true);
    try {
      await academicApi.createSection(dto as CreateAcademicSectionDto);
      toast.success('Section created successfully');
      setCreateOpen(false);
      await fetchSections();
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to create section'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (dto: CreateAcademicSectionDto | UpdateAcademicSectionDto) => {
    if (!editTarget) return;
    setIsSubmitting(true);
    try {
      await academicApi.updateSection(editTarget.id, dto as UpdateAcademicSectionDto);
      toast.success('Section updated successfully');
      setEditTarget(null);
      await fetchSections();
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to update section'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsSubmitting(true);
    try {
      await academicApi.removeSection(deleteTarget.id);
      toast.success('Section deleted successfully');
      setDeleteTarget(null);
      if (result.data.length === 1 && pagination.pageIndex > 0) {
        setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex - 1 }));
      } else {
        await fetchSections();
      }
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to delete section'));
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
          <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Section Details</h1>
          <p className="mt-1 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="transition-colors hover:text-[#25a194]">Dashboard</Link>
            <span>/</span>
            <Link href="/classes" className="transition-colors hover:text-[#25a194]">Classes</Link>
            <span>/</span>
            <span className="text-gray-400">Section Details</span>
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)} className="bg-[#25a194] text-white hover:bg-[#208b80]">
          + Add Section
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

            <Select value={classFilter} onValueChange={(value) => setClassFilter(value ?? 'all')}>
              <SelectTrigger className="h-10 w-[180px] border-gray-200 bg-white text-gray-600">
                <SelectValue placeholder="All classes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {classOptions.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}{item.grade ? ` (${item.grade})` : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="relative w-full sm:w-[280px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by section or class..."
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
              onClick={fetchSections}
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
            emptyMessage="No sections found."
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

      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Add Section">
        <SectionForm
          classes={classOptions}
          isSubmitting={isSubmitting}
          onSubmit={handleCreate}
          onCancel={() => setCreateOpen(false)}
          submitLabel="Create Section"
        />
      </Modal>

      <Modal open={!!editTarget} onClose={() => setEditTarget(null)} title="Edit Section">
        {editTarget && (
          <SectionForm
            classes={classOptions}
            initial={editTarget}
            isSubmitting={isSubmitting}
            onSubmit={handleUpdate}
            onCancel={() => setEditTarget(null)}
            submitLabel="Save Changes"
          />
        )}
      </Modal>

      <Modal open={!!viewTarget} onClose={() => setViewTarget(null)} title="Section Details">
        {viewTarget && (
          <div className="space-y-4 text-sm text-gray-600">
            <div>
              <p className="text-xs font-semibold uppercase text-gray-400">Section</p>
              <p className="mt-1 text-base font-semibold text-gray-900">{viewTarget.name}</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase text-gray-400">Class</p>
                <p className="mt-1">{viewTarget.class?.name || '-'}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-gray-400">Grade</p>
                <p className="mt-1">{viewTarget.class?.grade || '-'}</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-gray-400">Max Capacity</p>
              <p className="mt-1">{viewTarget.maxCapacity}</p>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Section" width="max-w-sm">
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
