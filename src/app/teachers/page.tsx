'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, ChevronLeft, ChevronRight, Download, Eye, Edit, Trash2, RefreshCcw } from 'lucide-react';
import { useTeachersStore } from '@/store/teachersStore';
import { toast } from 'sonner';

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

const PAGE_SIZE_OPTIONS = [10, 20, 50];

export default function TeachersPage() {
  const { teachers, isLoading, error, fetchTeachers, deleteTeacher } = useTeachersStore();
  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const filtered = teachers.filter((t) => {
    const q = search.toLowerCase();
    return (
      (t.fullName ?? '').toLowerCase().includes(q) ||
      (t.employeeCode ?? '').toLowerCase().includes(q) ||
      (t.email ?? '').toLowerCase().includes(q) ||
      (t.phone ?? '').toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete teacher "${name}"?`)) return;
    try {
      await deleteTeacher(id);
      toast.success('Teacher deleted');
    } catch {
      toast.error('Failed to delete teacher');
    }
  };

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Teacher List</h1>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <Link href="/" className="hover:text-[#25a194] transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-gray-400">Teacher</span>
            <span>/</span>
            <span className="text-gray-400">Teacher List</span>
          </p>
        </div>
        <Link href="/teachers/add">
          <Button className="bg-[#25a194] hover:bg-[#208b80] text-white px-5 h-10 rounded">
            + Add New
          </Button>
        </Link>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">

        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <Select defaultValue="export">
              <SelectTrigger className="w-[110px] h-10 bg-white border-gray-200 text-gray-600 rounded">
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

            <div className="relative w-full sm:w-[250px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="pl-9 h-10 bg-white border-gray-200 rounded text-sm w-full focus-visible:ring-[#25a194]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => fetchTeachers()}
              disabled={isLoading}
              className="border-gray-200 text-gray-600"
            >
              <RefreshCcw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <span className="text-sm text-gray-500 hidden sm:inline-block">Rows per page:</span>
            <Select value={String(pageSize)} onValueChange={(v) => { setPageSize(Number(v)); setPage(1); }}>
              <SelectTrigger className="w-[70px] h-10 bg-white border-gray-200 text-gray-600 rounded">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAGE_SIZE_OPTIONS.map((n) => (
                  <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-gray-800 bg-gray-50/50 uppercase font-semibold border-b border-gray-100">
              <tr>
                <th className="px-5 py-4 w-12 text-center">
                  <input type="checkbox" className="rounded border-gray-300 text-[#25a194] focus:ring-[#25a194] h-4 w-4" />
                </th>
                <th className="px-4 py-4 w-14">S.L</th>
                <th className="px-4 py-4 w-24">ID</th>
                <th className="px-4 py-4 min-w-[200px]">Name</th>
                <th className="px-4 py-4 min-w-[120px]">Subject</th>
                <th className="px-4 py-4 min-w-[150px]">Class</th>
                <th className="px-4 py-4 min-w-[200px]">Email</th>
                <th className="px-4 py-4 min-w-[140px]">Phone Number</th>
                <th className="px-4 py-4 min-w-[120px]">Join Date</th>
                <th className="px-4 py-4 min-w-[100px]">Status</th>
                <th className="px-4 py-4 min-w-[100px] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading && (
                <tr>
                  <td colSpan={11} className="px-4 py-8 text-center text-gray-400 text-sm">Loading...</td>
                </tr>
              )}
              {error && !isLoading && (
                <tr>
                  <td colSpan={11} className="px-4 py-8 text-center text-red-400 text-sm">{error}</td>
                </tr>
              )}
              {!isLoading && !error && paginated.length === 0 && (
                <tr>
                  <td colSpan={11} className="px-4 py-8 text-center text-gray-400 text-sm">No teachers found.</td>
                </tr>
              )}
              {!isLoading && paginated.map((teacher, idx) => (
                <tr key={teacher.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3 text-center">
                    <input type="checkbox" className="rounded border-gray-300 text-[#25a194] focus:ring-[#25a194] h-4 w-4" />
                  </td>
                  <td className="px-4 py-3 text-gray-500">{String((page - 1) * pageSize + idx + 1).padStart(2, '0')}</td>
                  <td className="px-4 py-3 font-medium text-[#25a194]">{teacher.employeeCode}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 rounded-full">
                        <AvatarImage src={teacher.profileImage ?? undefined} />
                        <AvatarFallback className="bg-[#25a194]/10 text-[#25a194] font-medium text-xs">
                          {(teacher.fullName ?? 'T').charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-800">{teacher.fullName ?? '-'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{teacher.subjectId ? teacher.subjectId.slice(0, 8) + '…' : '-'}</td>
                  <td className="px-4 py-3 text-gray-500">{teacher.classId ? teacher.classId.slice(0, 8) + '…' : '-'}</td>
                  <td className="px-4 py-3 text-gray-500">{teacher.email ?? '-'}</td>
                  <td className="px-4 py-3 text-gray-500">{teacher.phone ?? '-'}</td>
                  <td className="px-4 py-3 text-gray-500">{formatDate(teacher.joiningDate)}</td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#10b981]/10 text-[#10b981]">
                      Active
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/teachers/detail?id=${teacher.id}`}
                        className="h-8 w-8 rounded text-gray-400 hover:text-[#25a194] hover:bg-[#25a194]/10 flex items-center justify-center transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/teachers/add?id=${teacher.id}`}
                        className="h-8 w-8 rounded text-gray-400 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(teacher.id, teacher.fullName ?? teacher.employeeCode)}
                        className="h-8 w-8 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500">
            Showing {filtered.length === 0 ? 0 : (page - 1) * pageSize + 1} to {Math.min(page * pageSize, filtered.length)} of {filtered.length} entries
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex h-8 w-8 items-center justify-center rounded text-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`flex h-8 w-8 items-center justify-center rounded font-medium text-sm transition-colors ${
                  p === page ? 'bg-[#25a194] text-white' : 'bg-transparent text-gray-600 hover:bg-gray-50'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex h-8 w-8 items-center justify-center rounded text-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
