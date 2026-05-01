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
  Eye,
  Edit,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Building,
  CreditCard,
  Activity,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Modal } from '@/components/ui/modal';
import { academicApi } from '@/lib/api/academic';
import {
  admissionApi,
  type AdmissionResponse,
  type AdmissionStatus,
  type AdmissionUpdateData,
} from '@/lib/api/admissions';
import { cn } from '@/lib/utils';
import type { AcademicClass } from '@/lib/types';

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
  const [selectedAdmissionDetail, setSelectedAdmissionDetail] =
    React.useState<AdmissionResponse | null>(null);
  const [modalMode, setModalMode] = React.useState<
    'approve' | 'reject' | 'view' | 'edit' | null
  >(null);
  const [isExistingStudent, setIsExistingStudent] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [classes, setClasses] = React.useState<AcademicClass[]>([]);
  const [isLoadingClasses, setIsLoadingClasses] = React.useState(false);
  const [selectedClassId, setSelectedClassId] = React.useState<string>('');

  React.useEffect(() => {
    const fetchClasses = async () => {
      try {
        setIsLoadingClasses(true);
        const data = await academicApi.getMasterClasses();
        setClasses(data);
      } catch (error) {
        console.error('Failed to fetch classes:', error);
      } finally {
        setIsLoadingClasses(false);
      }
    };
    fetchClasses();
  }, []);

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
    setModalMode(null);
    setSelectedAdmissionDetail(null);
    setIsExistingStudent(false);
    setSelectedClassId('');
  };

  const handleApprove = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedAdmission) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData(event.currentTarget);
      const isAlreadyExist = formData.get('isAlreadyExist') === 'true';
      await admissionApi.approveAdmission(selectedAdmission.id, {
        id: selectedAdmission.id,
        isAlreadyExist,
        studentId: isAlreadyExist
          ? (formData.get('studentId') as string)
          : undefined,
        password: isAlreadyExist
          ? undefined
          : (formData.get('password') as string),
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

  const openDetailModal = async (id: string, mode: 'view' | 'edit') => {
    try {
      const data = await admissionApi.getAdmissionById(id);
      setSelectedAdmissionDetail(data);
      setModalMode(mode);
      if (mode === 'edit') {
        setSelectedClassId(data.classId || '');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch admission details');
    }
  };

  const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedAdmissionDetail) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData(event.currentTarget);

      const payload: AdmissionUpdateData = {
        academicInfo: {
          year: formData.get('year') as string,
          class: formData.get('class') as string,
          section: formData.get('section') as string,
          rollNumber: formData.get('rollNumber') as string,
          admissionNumber: formData.get('admissionNumber') as string,
        },
        personalInfo: {
          fullName: formData.get('fullName') as string,
          category: formData.get('category') as string,
          gender: formData.get('gender') as string,
          dateOfBirth: formData.get('dateOfBirth') as string,
          phone: formData.get('phone') as string,
          email: formData.get('email') as string,
        },
        parentGuardianInfo: {
          father: {
            name: formData.get('fatherName') as string,
            phone: formData.get('fatherPhone') as string,
            occupation: formData.get('fatherOccupation') as string,
          },
          mother: {
            name: formData.get('motherName') as string,
            phone: formData.get('motherPhone') as string,
            occupation: formData.get('motherOccupation') as string,
          },
          guardian: {
            relation: formData.get('guardianRelation') as string,
            name: formData.get('guardianName') as string,
            email: formData.get('guardianEmail') as string,
            phone: formData.get('guardianPhone') as string,
            occupation: formData.get('guardianOccupation') as string,
            address: formData.get('guardianAddress') as string,
          },
        },
        medicalDetails: {
          bloodGroup: formData.get('bloodGroup') as string,
          height: formData.get('height') as string,
          weight: formData.get('weight') as string,
        },
        bankDetails: {
          accountNumber: formData.get('accountNumber') as string,
          bankName: formData.get('bankName') as string,
          ifscCode: formData.get('ifscCode') as string,
          nationalId: formData.get('nationalId') as string,
        },
        previousSchoolDetails: {
          schoolName: formData.get('schoolName') as string,
          address: formData.get('schoolAddress') as string,
        },
        address: {
          currentAddress: formData.get('currentAddress') as string,
          permanentAddress: formData.get('permanentAddress') as string,
        },
        hostelDetails: {
          hostelName: formData.get('hostelName') as string,
          roomNumber: formData.get('roomNumber') as string,
        },
        additionalDetails: formData.get('additionalDetails') as string,
      };

      await admissionApi.updateAdmission(selectedAdmissionDetail.id, payload);
      toast.success('Admission updated successfully');
      closeModal();
      fetchAdmissions();
    } catch (error) {
      console.error(error);
      const responseMessage = getResponseMessage(error);
      toast.error(responseMessage || 'Failed to update admission');
    } finally {
      setIsSubmitting(false);
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
                        <button
                          type="button"
                          onClick={() => openDetailModal(admission.id, 'view')}
                          className="h-8 w-8 rounded text-gray-400 hover:text-blue-500 hover:bg-blue-50 flex items-center justify-center transition-colors"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => openDetailModal(admission.id, 'edit')}
                          className="h-8 w-8 rounded text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 flex items-center justify-center transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
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
          <div className="rounded-md border border-gray-100 bg-gray-50 p-3">
            <p className="text-sm font-semibold text-gray-800">
              {selectedAdmission?.fullName || 'Admission applicant'}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              {selectedAdmission?.email || selectedAdmission?.phone || 'No contact saved'}
            </p>
          </div>

          <div className="space-y-2">
            <Label>Student Record</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-200 p-3 text-sm text-gray-600">
                <input
                  type="radio"
                  name="isAlreadyExist"
                  value="false"
                  checked={!isExistingStudent}
                  onChange={() => setIsExistingStudent(false)}
                  className="accent-[#25a194]"
                />
                New student
              </label>
              <label className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-200 p-3 text-sm text-gray-600">
                <input
                  type="radio"
                  name="isAlreadyExist"
                  value="true"
                  checked={isExistingStudent}
                  onChange={() => setIsExistingStudent(true)}
                  className="accent-[#25a194]"
                />
                Existing inactive student
              </label>
            </div>
          </div>

          {isExistingStudent ? (
            <div className="space-y-2">
              <Label>Existing Student ID</Label>
              <Input
                name="studentId"
                required={isExistingStudent}
                placeholder="Existing student UUID"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label>Initial Password</Label>
              <Input
                name="password"
                required={!isExistingStudent}
                minLength={8}
                type="password"
                placeholder="Minimum 8 characters"
              />
            </div>
          )}

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

      <Modal
        open={(modalMode === 'view' || modalMode === 'edit') && !!selectedAdmissionDetail}
        onClose={closeModal}
        title={modalMode === 'edit' ? `Edit Admission - ${selectedAdmissionDetail?.applicationNumber}` : `Admission Details - ${selectedAdmissionDetail?.applicationNumber}`}
        width="max-w-4xl"
      >
        <div className="w-full">
          {selectedAdmissionDetail && modalMode === 'view' && (
            <div className="space-y-8 pb-4">
              {/* Profile Overview Card */}
              <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-gradient-to-br from-white to-gray-50/50 p-6 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="relative">
                    <div className="h-20 w-20 flex shrink-0 items-center justify-center rounded-2xl bg-[#25a194] text-white text-2xl font-bold shadow-lg shadow-[#25a194]/20">
                      {selectedAdmissionDetail.fullName?.charAt(0) || 'A'}
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-2 border-white bg-green-500 shadow-sm" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-bold text-gray-900">{selectedAdmissionDetail.fullName}</h2>
                      <span className={cn('px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full', statusClassName[selectedAdmissionDetail.status])}>
                        {selectedAdmissionDetail.status}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <Mail className="h-3.5 w-3.5" />
                        <span className="text-sm">{selectedAdmissionDetail.email || 'No email'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <Phone className="h-3.5 w-3.5" />
                        <span className="text-sm">{selectedAdmissionDetail.phone || 'No phone'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <Calendar className="h-3.5 w-3.5" />
                        <span className="text-sm">Applied {new Date(selectedAdmissionDetail.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Academic Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#25a194]">
                    <GraduationCap className="h-5 w-5" />
                    <h3 className="text-sm font-bold uppercase tracking-tight">Academic</h3>
                  </div>
                  <div className="space-y-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Academic Year</p>
                      <p className="text-sm font-medium text-gray-800">{selectedAdmissionDetail.year || '—'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Class & Section</p>
                      <p className="text-sm font-medium text-gray-800">
                        {selectedAdmissionDetail.classId ? `Class ${selectedAdmissionDetail.classId.substring(0,8)}` : '—'} 
                        {selectedAdmissionDetail.sectionId ? ` (${selectedAdmissionDetail.sectionId.substring(0,8)})` : ''}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Admission Number</p>
                      <p className="text-sm font-medium text-gray-800">{selectedAdmissionDetail.admissionNumber || '—'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Roll Number</p>
                      <p className="text-sm font-medium text-gray-800">{selectedAdmissionDetail.rollNumber || '—'}</p>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#25a194]">
                    <User className="h-5 w-5" />
                    <h3 className="text-sm font-bold uppercase tracking-tight">Personal</h3>
                  </div>
                  <div className="space-y-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Gender</p>
                      <p className="text-sm font-medium text-gray-800 capitalize">{selectedAdmissionDetail.gender || '—'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Category</p>
                      <p className="text-sm font-medium text-gray-800">{selectedAdmissionDetail.category || '—'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Date of Birth</p>
                      <p className="text-sm font-medium text-gray-800">
                        {selectedAdmissionDetail.dateOfBirth ? new Date(selectedAdmissionDetail.dateOfBirth).toLocaleDateString(undefined, { dateStyle: 'medium' }) : '—'}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Blood Group</p>
                      <div className="flex items-center gap-1.5">
                        <Activity className="h-3 w-3 text-red-500" />
                        <p className="text-sm font-medium text-gray-800">{(selectedAdmissionDetail.medicalDetails as any)?.bloodGroup || '—'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Logistics Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#25a194]">
                    <Building className="h-5 w-5" />
                    <h3 className="text-sm font-bold uppercase tracking-tight">Logistics</h3>
                  </div>
                  <div className="space-y-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Hostel Name</p>
                      <p className="text-sm font-medium text-gray-800">{selectedAdmissionDetail.hostelName || 'Not Assigned'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Room Number</p>
                      <p className="text-sm font-medium text-gray-800">{selectedAdmissionDetail.roomNumber || '—'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Previous School</p>
                      <p className="text-sm font-medium text-gray-800 truncate" title={selectedAdmissionDetail.previousSchoolName || ''}>
                        {selectedAdmissionDetail.previousSchoolName || '—'}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Bank Account</p>
                      <div className="flex items-center gap-1.5">
                        <CreditCard className="h-3 w-3 text-gray-400" />
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {(selectedAdmissionDetail.bankDetails as any)?.accountNumber || '—'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Family & Contact Section */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-[#25a194]">
                  <User className="h-5 w-5" />
                  <h3 className="text-sm font-bold uppercase tracking-tight">Family & Contact</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Father Info */}
                  <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[10px] font-black text-gray-400 uppercase">Father</span>
                      <Briefcase className="h-3 w-3 text-gray-300" />
                    </div>
                    <p className="text-sm font-bold text-gray-800">{(selectedAdmissionDetail.fatherInfo as any)?.name || '—'}</p>
                    <p className="mt-1 text-xs text-gray-500">{(selectedAdmissionDetail.fatherInfo as any)?.occupation || '—'}</p>
                    <p className="mt-2 text-xs font-medium text-[#25a194]">{(selectedAdmissionDetail.fatherInfo as any)?.phone || ''}</p>
                  </div>

                  {/* Mother Info */}
                  <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[10px] font-black text-gray-400 uppercase">Mother</span>
                      <Briefcase className="h-3 w-3 text-gray-300" />
                    </div>
                    <p className="text-sm font-bold text-gray-800">{(selectedAdmissionDetail.motherInfo as any)?.name || '—'}</p>
                    <p className="mt-1 text-xs text-gray-500">{(selectedAdmissionDetail.motherInfo as any)?.occupation || '—'}</p>
                    <p className="mt-2 text-xs font-medium text-[#25a194]">{(selectedAdmissionDetail.motherInfo as any)?.phone || ''}</p>
                  </div>

                  {/* Guardian Info */}
                  <div className="rounded-xl border border-blue-100 bg-blue-50/30 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[10px] font-black text-blue-400 uppercase">Guardian</span>
                      <User className="h-3 w-3 text-blue-300" />
                    </div>
                    <p className="text-sm font-bold text-gray-800">{(selectedAdmissionDetail.guardianInfo as any)?.name || '—'}</p>
                    <p className="mt-1 text-xs text-gray-500">{(selectedAdmissionDetail.guardianInfo as any)?.relation || 'Guardian'}</p>
                    <div className="mt-3 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <Phone className="h-3 w-3 text-gray-400" />
                        {(selectedAdmissionDetail.guardianInfo as any)?.phone || '—'}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <Mail className="h-3 w-3 text-gray-400" />
                        <span className="truncate">{(selectedAdmissionDetail.guardianInfo as any)?.email || '—'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-[#25a194]">
                  <MapPin className="h-5 w-5" />
                  <h3 className="text-sm font-bold uppercase tracking-tight">Addresses</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                    <p className="mb-2 text-[10px] font-bold text-gray-400 uppercase">Current Address</p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {(selectedAdmissionDetail.addressInfo as any)?.currentAddress || '—'}
                    </p>
                  </div>
                  <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                    <p className="mb-2 text-[10px] font-bold text-gray-400 uppercase">Permanent Address</p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {(selectedAdmissionDetail.addressInfo as any)?.permanentAddress || '—'}
                    </p>
                  </div>
                </div>
              </div>

              {selectedAdmissionDetail.additionalDetails && (
                <div className="rounded-xl border border-amber-100 bg-amber-50/30 p-4">
                  <h3 className="mb-2 text-[10px] font-bold text-amber-600 uppercase">Additional Remarks</h3>
                  <p className="text-sm text-amber-800/80 leading-relaxed italic">
                    "{selectedAdmissionDetail.additionalDetails}"
                  </p>
                </div>
              )}
            </div>
          )}

          {selectedAdmissionDetail && modalMode === 'edit' && (
            <form onSubmit={handleEditSubmit} className="space-y-6 pb-4 px-1">
              <div className="space-y-2">
                <Label className="text-sm font-bold text-gray-700">Application Number</Label>
                <div className="h-10 rounded-md border border-gray-200 bg-gray-50 px-3 text-sm text-gray-600 flex items-center">
                  {selectedAdmissionDetail.applicationNumber}
                </div>
              </div>

              {/* Academic Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#25a194] uppercase border-b pb-2">Academic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Academic Year</Label>
                    <select 
                      name="year" 
                      defaultValue={selectedAdmissionDetail.year || ''}
                      className="w-full h-10 border border-gray-200 rounded-md bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#25a194]"
                    >
                      <option value="2024-2025">2024-2025</option>
                      <option value="2025-2026">2025-2026</option>
                      <option value="2026-2027">2026-2027</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Class</Label>
                    <select 
                      name="class" 
                      defaultValue={selectedAdmissionDetail.classId || ''}
                      onChange={(e) => setSelectedClassId(e.target.value)}
                      className="w-full h-10 border border-gray-200 rounded-md bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#25a194]"
                    >
                      <option value="">Select Class</option>
                      {classes.map((cls) => (
                        <option key={cls.id} value={cls.id}>{cls.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Section</Label>
                    <select 
                      name="section" 
                      defaultValue={selectedAdmissionDetail.sectionId || ''}
                      className="w-full h-10 border border-gray-200 rounded-md bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#25a194]"
                    >
                      <option value="">Select Section</option>
                      {classes
                        .find((c) => c.id === selectedClassId)
                        ?.sections?.map((sec) => (
                          <option key={sec.id} value={sec.id}>{sec.name}</option>
                        ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Roll Number</Label>
                    <Input name="rollNumber" defaultValue={selectedAdmissionDetail.rollNumber || ''} />
                  </div>
                  <div className="space-y-2">
                    <Label>Admission Number</Label>
                    <Input name="admissionNumber" defaultValue={selectedAdmissionDetail.admissionNumber || ''} />
                  </div>
                </div>
              </div>

              {/* Personal Info */}
              <div className="space-y-4 pt-2">
                <h3 className="text-sm font-bold text-[#25a194] uppercase border-b pb-2">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input name="fullName" defaultValue={selectedAdmissionDetail.fullName || ''} />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <select 
                      name="category" 
                      defaultValue={selectedAdmissionDetail.category || ''}
                      className="w-full h-10 border border-gray-200 rounded-md bg-white px-3 text-sm"
                    >
                      <option value="General">General</option>
                      <option value="OBC">OBC</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <select 
                      name="gender" 
                      defaultValue={selectedAdmissionDetail.gender || ''}
                      className="w-full h-10 border border-gray-200 rounded-md bg-white px-3 text-sm"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Date of Birth</Label>
                    <Input type="date" name="dateOfBirth" defaultValue={selectedAdmissionDetail.dateOfBirth ? selectedAdmissionDetail.dateOfBirth.split('T')[0] : ''} />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input name="phone" defaultValue={selectedAdmissionDetail.phone || ''} />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" name="email" defaultValue={selectedAdmissionDetail.email || ''} />
                  </div>
                </div>
              </div>

              {/* Parent Guardian Info */}
              <div className="space-y-4 pt-2">
                <h3 className="text-sm font-bold text-[#25a194] uppercase border-b pb-2">Parent & Guardian Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div className="space-y-4">
                    <p className="text-xs font-bold text-gray-500 uppercase">Father Info</p>
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input name="fatherName" defaultValue={(selectedAdmissionDetail.fatherInfo as any)?.name || ''} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input name="fatherPhone" defaultValue={(selectedAdmissionDetail.fatherInfo as any)?.phone || ''} />
                      </div>
                      <div className="space-y-2">
                        <Label>Occupation</Label>
                        <Input name="fatherOccupation" defaultValue={(selectedAdmissionDetail.fatherInfo as any)?.occupation || ''} />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-xs font-bold text-gray-500 uppercase">Mother Info</p>
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input name="motherName" defaultValue={(selectedAdmissionDetail.motherInfo as any)?.name || ''} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input name="motherPhone" defaultValue={(selectedAdmissionDetail.motherInfo as any)?.phone || ''} />
                      </div>
                      <div className="space-y-2">
                        <Label>Occupation</Label>
                        <Input name="motherOccupation" defaultValue={(selectedAdmissionDetail.motherInfo as any)?.occupation || ''} />
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-4">
                    <p className="text-xs font-bold text-gray-500 uppercase">Guardian Info</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Relation</Label>
                        <Input name="guardianRelation" defaultValue={(selectedAdmissionDetail.guardianInfo as any)?.relation || ''} />
                      </div>
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input name="guardianName" defaultValue={(selectedAdmissionDetail.guardianInfo as any)?.name || ''} />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input name="guardianEmail" defaultValue={(selectedAdmissionDetail.guardianInfo as any)?.email || ''} />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input name="guardianPhone" defaultValue={(selectedAdmissionDetail.guardianInfo as any)?.phone || ''} />
                      </div>
                      <div className="space-y-2">
                        <Label>Occupation</Label>
                        <Input name="guardianOccupation" defaultValue={(selectedAdmissionDetail.guardianInfo as any)?.occupation || ''} />
                      </div>
                      <div className="space-y-2">
                        <Label>Address</Label>
                        <Input name="guardianAddress" defaultValue={(selectedAdmissionDetail.guardianInfo as any)?.address || ''} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-[#25a194] uppercase border-b pb-2">Medical & Bank</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Blood Group</Label>
                      <Input name="bloodGroup" defaultValue={(selectedAdmissionDetail.medicalDetails as any)?.bloodGroup || ''} />
                    </div>
                    <div className="space-y-2">
                      <Label>Height (cm)</Label>
                      <Input name="height" defaultValue={(selectedAdmissionDetail.medicalDetails as any)?.height || ''} />
                    </div>
                    <div className="space-y-2">
                      <Label>Weight (kg)</Label>
                      <Input name="weight" defaultValue={(selectedAdmissionDetail.medicalDetails as any)?.weight || ''} />
                    </div>
                    <div className="space-y-2">
                      <Label>A/C Number</Label>
                      <Input name="accountNumber" defaultValue={(selectedAdmissionDetail.bankDetails as any)?.accountNumber || ''} />
                    </div>
                    <div className="space-y-2">
                      <Label>Bank Name</Label>
                      <Input name="bankName" defaultValue={(selectedAdmissionDetail.bankDetails as any)?.bankName || ''} />
                    </div>
                    <div className="space-y-2">
                      <Label>IFSC Code</Label>
                      <Input name="ifscCode" defaultValue={(selectedAdmissionDetail.bankDetails as any)?.ifscCode || ''} />
                    </div>
                    <div className="space-y-2">
                      <Label>National ID</Label>
                      <Input name="nationalId" defaultValue={(selectedAdmissionDetail.bankDetails as any)?.nationalId || ''} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-[#25a194] uppercase border-b pb-2">Logistics & School</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Hostel Name</Label>
                        <Input name="hostelName" defaultValue={selectedAdmissionDetail.hostelName || ''} />
                      </div>
                      <div className="space-y-2">
                        <Label>Room Number</Label>
                        <Input name="roomNumber" defaultValue={selectedAdmissionDetail.roomNumber || ''} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Previous School Name</Label>
                      <Input name="schoolName" defaultValue={selectedAdmissionDetail.previousSchoolName || ''} />
                    </div>
                    <div className="space-y-2">
                      <Label>Previous School Address</Label>
                      <Input name="schoolAddress" defaultValue={selectedAdmissionDetail.previousSchoolAddress || ''} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-4 pt-2">
                <h3 className="text-sm font-bold text-[#25a194] uppercase border-b pb-2">Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Current Address</Label>
                    <Textarea name="currentAddress" defaultValue={(selectedAdmissionDetail.addressInfo as any)?.currentAddress || ''} />
                  </div>
                  <div className="space-y-2">
                    <Label>Permanent Address</Label>
                    <Textarea name="permanentAddress" defaultValue={(selectedAdmissionDetail.addressInfo as any)?.permanentAddress || ''} />
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="space-y-2 pt-2">
                <Label>Additional Details</Label>
                <Textarea name="additionalDetails" defaultValue={selectedAdmissionDetail.additionalDetails || ''} />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={closeModal}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="bg-[#25a194] hover:bg-[#208b80] text-white">
                  {isSubmitting ? 'Updating...' : 'Update Admission'}
                </Button>
              </div>
            </form>
          )}
        </div>
        {modalMode === 'view' && (
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <Button type="button" variant="outline" onClick={closeModal}>
              Close
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
