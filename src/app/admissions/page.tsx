'use client';

import * as React from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import {
  CheckCircle2,
  Download,
  FilePlus2,
  Filter,
  MoreVertical,
  RefreshCw,
  Search,
  Trash2,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Modal } from '@/components/ui/modal';
import {
  admissionApi,
  type AdmissionResponse,
  type AdmissionStatus,
} from '@/lib/api/admissions';
import { cn } from '@/lib/utils';

const statusOptions: Array<{ label: string; value: AdmissionStatus | 'all' }> =
  [
    { label: 'All', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Enrolled', value: 'enrolled' },
    { label: 'Rejected', value: 'rejected' },
    { label: 'Cancelled', value: 'cancelled' },
  ];

const statusClassName: Record<AdmissionStatus, string> = {
  pending: 'bg-amber-100 text-amber-700',
  approved: 'bg-blue-100 text-blue-700',
  rejected: 'bg-red-100 text-red-700',
  cancelled: 'bg-gray-100 text-gray-600',
  enrolled: 'bg-green-100 text-green-700',
};

const getResponseMessage = (error: unknown) => {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    return (error as { response?: { data?: { message?: string | string[] } } })
      .response?.data?.message;
  }

  return undefined;
};

export default function AdmissionsPage() {
  const [admissions, setAdmissions] = React.useState<AdmissionResponse[]>([]);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [status, setStatus] = React.useState<AdmissionStatus | 'all'>('all');
  const [search, setSearch] = React.useState('');
  const [selectedAdmission, setSelectedAdmission] =
    React.useState<AdmissionResponse | null>(null);
  const [modalMode, setModalMode] = React.useState<
    'approve' | 'reject' | null
  >(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const fetchAdmissions = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await admissionApi.getAllAdmissions(
        {
          page,
          limit: 20,
          status: status === 'all' ? undefined : status,
          search: search.trim() || undefined,
        },
      );
      setAdmissions(data.data);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
      const responseMessage = getResponseMessage(error);
      toast.error(responseMessage || 'Failed to fetch admissions');
    } finally {
      setIsLoading(false);
    }
  }, [page, search, status]);

  React.useEffect(() => {
    fetchAdmissions();
  }, [fetchAdmissions]);

  const closeModal = () => {
    setSelectedAdmission(null);
    setModalMode(null);
  };

  const handleApprove = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedAdmission) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData(event.currentTarget);
      await admissionApi.approveAdmission(selectedAdmission.id, {
        userId: formData.get('userId') as string,
        admissionNumber:
          (formData.get('admissionNumber') as string) ||
          selectedAdmission.admissionNumber ||
          selectedAdmission.applicationNumber,
        rollNumber:
          (formData.get('rollNumber') as string) ||
          selectedAdmission.rollNumber ||
          undefined,
        approvedBy: (formData.get('approvedBy') as string) || undefined,
      });
      toast.success('Admission approved and student created');
      closeModal();
      fetchAdmissions();
    } catch (error) {
      console.error(error);
      const responseMessage = getResponseMessage(error);
      toast.error(responseMessage || 'Failed to approve admission');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedAdmission) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData(event.currentTarget);
      await admissionApi.rejectAdmission(selectedAdmission.id, {
        reason: formData.get('reason') as string,
        rejectedBy: (formData.get('rejectedBy') as string) || undefined,
      });
      toast.success('Admission rejected');
      closeModal();
      fetchAdmissions();
    } catch (error) {
      console.error(error);
      const responseMessage = getResponseMessage(error);
      toast.error(responseMessage || 'Failed to reject admission');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = async (admission: AdmissionResponse) => {
    if (!window.confirm('Cancel this admission application?')) return;

    try {
      await admissionApi.cancelAdmission(admission.id);
      toast.success('Admission cancelled');
      fetchAdmissions();
    } catch (error) {
      console.error(error);
      const responseMessage = getResponseMessage(error);
      toast.error(responseMessage || 'Failed to cancel admission');
    }
  };

  const handleDelete = async (admission: AdmissionResponse) => {
    if (!window.confirm('Delete this admission record?')) return;

    try {
      await admissionApi.deleteAdmission(admission.id);
      toast.success('Admission deleted');
      setAdmissions((current) =>
        current.filter((item) => item.id !== admission.id),
      );
    } catch (error) {
      console.error(error);
      const responseMessage = getResponseMessage(error);
      toast.error(responseMessage || 'Failed to delete admission');
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">
            Admissions
          </h1>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <Link href="/" className="hover:text-[#25a194] transition-colors">
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-gray-400">Admissions</span>
          </p>
        </div>
        <Link href="/admissions/add">
          <Button className="bg-[#25a194] hover:bg-[#208b80] text-white px-5 h-10 rounded">
            <FilePlus2 className="mr-2 h-4 w-4" />
            New Admission
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-md shadow-sm border border-gray-100 w-full overflow-hidden">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between p-4 border-b border-gray-100 gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-3 w-full xl:w-auto">
            <Button
              variant="outline"
              className="h-9 font-normal text-gray-600 border-gray-200"
            >
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
              value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Search applications..."
                className="w-full pl-9 pr-4 h-9 rounded-md border border-gray-200 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#25a194] focus:border-[#25a194]"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={fetchAdmissions}
              className="h-9 font-normal text-gray-600 border-gray-200"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            {statusOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setStatus(option.value);
                  setPage(1);
                }}
                className={cn(
                  'h-8 rounded-md border px-3 text-xs font-medium transition-colors',
                  status === option.value
                    ? 'border-[#25a194] bg-[#25a194] text-white'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50',
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white border-b border-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="p-4 w-12">
                  <Checkbox className="border-gray-300 data-[state=checked]:bg-[#25a194] data-[state=checked]:border-[#25a194]" />
                </th>
                <th className="p-4">Application No</th>
                <th className="p-4">Name & Contact</th>
                <th className="p-4">Class/Sec</th>
                <th className="p-4">Admission No</th>
                <th className="p-4">Status</th>
                <th className="p-4">Applied On</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-gray-500">
                    Loading admissions...
                  </td>
                </tr>
              ) : admissions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-gray-500">
                    No admissions found.
                  </td>
                </tr>
              ) : (
                admissions.map((admission) => (
                  <tr
                    key={admission.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="p-4 w-12">
                      <Checkbox className="border-gray-300 data-[state=checked]:bg-[#25a194] data-[state=checked]:border-[#25a194]" />
                    </td>
                    <td className="p-4 text-[#25a194] font-medium">
                      {admission.applicationNumber}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 flex shrink-0 items-center justify-center rounded-full bg-[#25a194] text-white font-semibold">
                          {admission.fullName?.charAt(0) || 'A'}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {admission.fullName || '-'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {admission.email || admission.phone || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">
                      <span className="block text-sm">
                        {admission.classId?.substring(0, 8) || '-'}
                      </span>
                      <span className="block text-xs text-gray-400 ml-1">
                        {admission.sectionId?.substring(0, 8) || ''}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">
                      {admission.admissionNumber || '-'}
                    </td>
                    <td className="p-4">
                      <span
                        className={cn(
                          'px-3 py-1 text-xs font-semibold rounded capitalize',
                          statusClassName[admission.status],
                        )}
                      >
                        {admission.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">
                      {new Date(admission.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {admission.status === 'pending' && (
                          <>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedAdmission(admission);
                                setModalMode('approve');
                              }}
                              className="h-8 w-8 rounded text-gray-400 hover:text-green-600 hover:bg-green-50 flex items-center justify-center transition-colors"
                              title="Approve"
                            >
                              <CheckCircle2 className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedAdmission(admission);
                                setModalMode('reject');
                              }}
                              className="h-8 w-8 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors"
                              title="Reject"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        {!admission.studentId &&
                          admission.status !== 'cancelled' && (
                            <button
                              type="button"
                              onClick={() => handleCancel(admission)}
                              className="h-8 w-8 rounded text-gray-400 hover:text-amber-600 hover:bg-amber-50 flex items-center justify-center transition-colors"
                              title="Cancel"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          )}
                        <button
                          type="button"
                          onClick={() => handleDelete(admission)}
                          className="h-8 w-8 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-white">
          <p className="text-sm text-gray-500">
            Showing {admissions.length} of {total} entries
          </p>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              className="h-9 border-gray-200"
              disabled={page <= 1 || isLoading}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-500">
              Page {page} of {totalPages || 1}
            </span>
            <Button
              type="button"
              variant="outline"
              className="h-9 border-gray-200"
              disabled={page >= totalPages || isLoading}
              onClick={() => setPage((current) => current + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      <Modal
        open={modalMode === 'approve' && !!selectedAdmission}
        onClose={closeModal}
        title="Approve Admission"
      >
        <form onSubmit={handleApprove} className="space-y-4">
          <div className="space-y-2">
            <Label>User ID</Label>
            <Input
              name="userId"
              required
              placeholder="Existing student user UUID"
              defaultValue={selectedAdmission?.userId || ''}
            />
          </div>
          <div className="space-y-2">
            <Label>Admission Number</Label>
            <Input
              name="admissionNumber"
              defaultValue={
                selectedAdmission?.admissionNumber ||
                selectedAdmission?.applicationNumber ||
                ''
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Roll Number</Label>
            <Input
              name="rollNumber"
              defaultValue={selectedAdmission?.rollNumber || ''}
            />
          </div>
          <div className="space-y-2">
            <Label>Approved By</Label>
            <Input name="approvedBy" placeholder="Approver user UUID" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#25a194] hover:bg-[#208b80] text-white"
            >
              {isSubmitting ? 'Approving...' : 'Approve'}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        open={modalMode === 'reject' && !!selectedAdmission}
        onClose={closeModal}
        title="Reject Admission"
      >
        <form onSubmit={handleReject} className="space-y-4">
          <div className="space-y-2">
            <Label>Reason</Label>
            <Input name="reason" required placeholder="Reason for rejection" />
          </div>
          <div className="space-y-2">
            <Label>Rejected By</Label>
            <Input name="rejectedBy" placeholder="Rejecting user UUID" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} variant="destructive">
              {isSubmitting ? 'Rejecting...' : 'Reject'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
