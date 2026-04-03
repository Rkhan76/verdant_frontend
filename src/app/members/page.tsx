'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Modal } from '@/components/ui/modal';
import { DataTable } from '@/components/ui/data-table';
import { Search, Download, Filter, MoreHorizontal, UserPlus, Loader2, AlertCircle, Users } from 'lucide-react';
import { MemberForm } from './components/MemberForm';
import { useMembersPage } from './hooks/useMembersPage';

export default function MembersPage() {
  const {
    members,
    filtered,
    columns,
    isLoading,
    error,
    rolesMaster,
    isFetchingMaster,
    fetchRolesMaster,
    search,
    setSearch,
    roleFilter,
    setRoleFilter,
    createOpen,
    setCreateOpen,
    editTarget,
    setEditTarget,
    deleteTarget,
    setDeleteTarget,
    isSubmitting,
    handleCreate,
    handleUpdate,
    handleDelete,
  } = useMembersPage();

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
          roles={rolesMaster}
          isFetchingRoles={isFetchingMaster}
          onRolesOpen={fetchRolesMaster}
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
            roles={rolesMaster}
            isFetchingRoles={isFetchingMaster}
            onRolesOpen={fetchRolesMaster}
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
