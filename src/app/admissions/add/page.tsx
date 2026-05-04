'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ArrowLeft, Save, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { GuardianSearch } from '@/components/guardians/guardian-search';
import { academicApi } from '@/lib/api/academic';
import { admissionApi, type AdmissionCreateData } from '@/lib/api/admissions';
import type { AcademicClass } from '@/lib/types';

const getFormValue = (formData: FormData, key: string) =>
  (formData.get(key) as string) || undefined;

const getResponseMessage = (error: unknown) => {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    return (error as { response?: { data?: { message?: string | string[] } } })
      .response?.data?.message;
  }

  return undefined;
};

export default function AddAdmissionPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [classes, setClasses] = React.useState<AcademicClass[]>([]);
  const [selectedClassId, setSelectedClassId] = React.useState('');
  const [guardianMode, setGuardianMode] = React.useState<'new' | 'existing'>(
    'new',
  );
  const [isLoadingClasses, setIsLoadingClasses] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [selectedGuardianId, setSelectedGuardianId] = React.useState('');

  const buildAdmissionPayload = (formData: FormData): AdmissionCreateData => {
    const guardianMode = getFormValue(formData, 'guardianMode') || 'new';
    const isGuardianExist = guardianMode === 'existing';

    return {
      isGuardianExist,
      guardianId: isGuardianExist ? selectedGuardianId : undefined,
      academicInfo: {
        year: getFormValue(formData, 'academicYear'),
        class: getFormValue(formData, 'class'),
        section: getFormValue(formData, 'section'),
        admissionNumber: getFormValue(formData, 'admissionNumber'),
      },
      personalInfo: {
        fullName: getFormValue(formData, 'fullName'),
        category: getFormValue(formData, 'category'),
        subcategory: getFormValue(formData, 'subcategory'),
        gender: getFormValue(formData, 'gender'),
        dateOfBirth: getFormValue(formData, 'dateOfBirth'),
        phone: getFormValue(formData, 'phone'),
        email: getFormValue(formData, 'email'),
        aadharNumber: getFormValue(formData, 'aadharNumber'),
        profileImage: getFormValue(formData, 'profileImage'),
        aadharImage: getFormValue(formData, 'aadharImage'),
        tcImage: getFormValue(formData, 'tcImage'),
        birthCertificateImage: getFormValue(formData, 'birthCertificateImage'),
      },
      parentGuardianInfo: {
        father: {
          name: getFormValue(formData, 'fatherName'),
          phone: getFormValue(formData, 'fatherPhone'),
          occupation: getFormValue(formData, 'fatherOccupation'),
        },
        mother: {
          name: getFormValue(formData, 'motherName'),
          phone: getFormValue(formData, 'motherPhone'),
          occupation: getFormValue(formData, 'motherOccupation'),
        },
        guardian: isGuardianExist
          ? undefined
          : {
              relation: getFormValue(formData, 'guardian'),
              name: getFormValue(formData, 'guardianName'),
              email: getFormValue(formData, 'guardianEmail'),
              phone: getFormValue(formData, 'guardianPhone'),
              mobileNumber: getFormValue(formData, 'guardianMobileNumber'),
              aadharNumber: getFormValue(formData, 'guardianAadharNumber'),
              occupation: getFormValue(formData, 'guardianOccupation'),
              address: getFormValue(formData, 'guardianAddress'),
              photo: getFormValue(formData, 'guardianPhoto'),
            },
      },
      medicalDetails: {
        bloodGroup: getFormValue(formData, 'bloodGroup'),
        height: getFormValue(formData, 'height'),
        weight: getFormValue(formData, 'weight'),
      },
      bankDetails: {
        accountNumber: getFormValue(formData, 'accountNumber'),
        bankName: getFormValue(formData, 'bankName'),
        bankBranch: getFormValue(formData, 'bankBranch'),
        ifscCode: getFormValue(formData, 'ifscCode'),
      },
      previousSchoolDetails: {
        schoolName: getFormValue(formData, 'schoolName'),
        address: getFormValue(formData, 'schoolAddress'),
      },
      address: {
        currentAddress: getFormValue(formData, 'currentAddress'),
        permanentAddress: getFormValue(formData, 'permanentAddress'),
      },
      hostelDetails: {
        hostelName: getFormValue(formData, 'hostelName'),
        roomNumber: getFormValue(formData, 'roomNumber'),
      },
      documents: getFormValue(formData, 'documentName')
        ? [
            {
              documentName: getFormValue(formData, 'documentName'),
              file: getFormValue(formData, 'documentFile'),
            },
          ]
        : undefined,
      additionalDetails: getFormValue(formData, 'additionalDetails'),
    };
  };

  const sections = React.useMemo(
    () => classes.find((cls) => cls.id === selectedClassId)?.sections ?? [],
    [classes, selectedClassId],
  );

  React.useEffect(() => {
    const fetchClasses = async () => {
      try {
        setIsLoadingClasses(true);
        setClasses(await academicApi.getMasterClasses());
      } catch (error) {
        console.error(error);
        toast.error('Failed to load classes');
      } finally {
        setIsLoadingClasses(false);
      }
    };

    fetchClasses();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      await admissionApi.createAdmission(buildAdmissionPayload(formData));
      toast.success('Admission application created successfully');
      router.push('/admissions');
    } catch (error) {
      console.error(error);
      const responseMessage = getResponseMessage(error);
      if (Array.isArray(responseMessage)) {
        responseMessage.forEach((message) => toast.error(message));
      } else {
        toast.error(responseMessage || 'Failed to create admission');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => router.back();

  return (
    <div className="w-full max-w-5xl mx-auto pb-12">
      <div className="mb-6">
        <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">New Admission</h1>
        <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
          <Link href="/" className="hover:text-[#25a194] transition-colors">Dashboard</Link>
          <span>/</span>
          <Link href="/admissions" className="hover:text-[#25a194] transition-colors">Admissions</Link>
          <span>/</span>
          <span className="text-gray-400">New Admission</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Info Card */}
        <Card className="shadow-sm border-gray-100 rounded-md overflow-hidden bg-white">
          <div className="px-6 py-4 border-b border-gray-100 bg-white">
            <h2 className="text-base font-semibold text-gray-800">Personal Info</h2>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Academic Year <span className="text-red-500">*</span></Label>
                <select name="academicYear" defaultValue="2024-2025" required className="w-full h-10 border border-gray-200 rounded-md bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#25a194] text-gray-600">
                  <option value="">Select an year</option>
                  <option value="2024-2025">2024-2025</option>
                  <option value="2025-2026">2025-2026</option>
                  <option value="2026-2027">2026-2027</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Class <span className="text-red-500">*</span></Label>
                <select 
                  name="class" 
                  required 
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                  disabled={isLoadingClasses}
                  className="w-full h-10 border border-gray-200 rounded-md bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#25a194] text-gray-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">{isLoadingClasses ? 'Loading classes...' : 'Select a class'}</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Section <span className="text-red-500">*</span></Label>
                <select 
                  name="section" 
                  required 
                  key={selectedClassId}
                  disabled={!selectedClassId}
                  className="w-full h-10 border border-gray-200 rounded-md bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#25a194] text-gray-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {!selectedClassId ? 'Select a class first' : 'Select section'}
                  </option>
                  {sections.map((section) => (
                    <option key={section.id} value={section.id}>
                      {section.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Admission No <span className="text-red-500">*</span></Label>
                <Input name="admissionNumber" defaultValue="ADM2024-001" required placeholder="Enter admission number" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Full Name <span className="text-red-500">*</span></Label>
                <Input name="fullName" defaultValue="John Doe" required placeholder="Enter your Full Name" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Category <span className="text-red-500">*</span></Label>
                <select name="category" defaultValue="General" required className="w-full h-10 border border-gray-200 rounded-md bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#25a194] text-gray-600">
                  <option value="">Select a Category</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Subcategory</Label>
                <Input name="subcategory" placeholder="Enter subcategory" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Gender</Label>
                <select name="gender" defaultValue="Male" className="w-full h-10 border border-gray-200 rounded-md bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#25a194] text-gray-600">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2 relative">
                <Label className="text-sm font-semibold text-gray-700">Date Of Birth <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Input name="dateOfBirth" defaultValue="2010-05-15" required type="date" placeholder="yyyy-mm-dd" className="h-10 border-gray-200 focus-visible:ring-[#25a194] pr-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Phone</Label>
                <Input name="phone" defaultValue="9876543210" placeholder="Enter Your Phone Number" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Email</Label>
                <Input name="email" defaultValue="john.doe@example.com" type="email" placeholder="Enter Your Email" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Aadhar Number</Label>
                <Input name="aadharNumber" placeholder="Enter Aadhar Number" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Profile Image URL</Label>
                <Input name="profileImage" placeholder="Enter profile image URL" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Aadhar Image URL</Label>
                <Input name="aadharImage" placeholder="Enter Aadhar image URL" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">TC Image URL</Label>
                <Input name="tcImage" placeholder="Enter TC image URL" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Birth Certificate Image URL</Label>
                <Input name="birthCertificateImage" placeholder="Enter birth certificate image URL" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Parent & Guardian Info Card */}
        <Card className="shadow-sm border-gray-100 rounded-md overflow-hidden bg-white">
          <div className="px-6 py-4 border-b border-gray-100 bg-white">
            <h2 className="text-base font-semibold text-gray-800">Parent & Guardian Info</h2>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Fathers Name</Label>
                <Input name="fatherName" defaultValue="Robert Doe" placeholder="Enter Father Name" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Phone Number</Label>
                <Input name="fatherPhone" defaultValue="9876543211" placeholder="Enter Father Number" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Father Occupation</Label>
                <Input name="fatherOccupation" defaultValue="Engineer" placeholder="Enter Father Occupation" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Father Photo</Label>
                <div className="border border-dashed border-gray-200 rounded-md h-10 flex items-center justify-center text-sm text-gray-500 cursor-pointer hover:bg-gray-50 bg-white">
                  Drag & drop a file here or click
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Mothers Name</Label>
                <Input name="motherName" defaultValue="Jane Doe" placeholder="Enter Mother Name" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Phone Number</Label>
                <Input name="motherPhone" defaultValue="9876543212" placeholder="Enter Mother Number" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Mother Occupation</Label>
                <Input name="motherOccupation" defaultValue="Teacher" placeholder="Enter Mother Occupation" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Mother Photo</Label>
                <div className="border border-dashed border-gray-200 rounded-md h-10 flex items-center justify-center text-sm text-gray-500 cursor-pointer hover:bg-gray-50 bg-white">
                  Drag & drop a file here or click
                </div>
              </div>
            </div>

            <div className="mb-6">
              <Label className="text-base font-semibold text-gray-800 mb-3 block">Guardian Source</Label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="radio"
                    value="new"
                    name="guardianMode"
                    className="w-4 h-4 text-[#25a194] focus:ring-[#25a194] accent-[#25a194]"
                    checked={guardianMode === 'new'}
                    onChange={() => setGuardianMode('new')}
                  />
                  Create New Guardian On Approve
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="radio"
                    value="existing"
                    name="guardianMode"
                    className="w-4 h-4 text-[#25a194] focus:ring-[#25a194] accent-[#25a194]"
                    checked={guardianMode === 'existing'}
                    onChange={() => setGuardianMode('existing')}
                  />
                  Link Existing Guardian
                </label>
              </div>
            </div>

            {guardianMode === 'existing' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <GuardianSearch
                  value={selectedGuardianId}
                  onChange={(guardianId) => setSelectedGuardianId(guardianId)}
                  required
                />
              </div>
            ) : null}

            <div className="mb-6">
              <Label className="text-base font-semibold text-gray-800 mb-3 block">Select a Guardian</Label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="radio" value="Father" name="guardian" className="w-4 h-4 text-[#25a194] focus:ring-[#25a194] accent-[#25a194]" defaultChecked />
                  Father
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="radio" value="Mother" name="guardian" className="w-4 h-4 text-[#25a194] focus:ring-[#25a194] accent-[#25a194]" />
                  Mother
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="radio" value="Others" name="guardian" className="w-4 h-4 text-[#25a194] focus:ring-[#25a194] accent-[#25a194]" />
                  Others
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Guardian Name</Label>
                <Input name="guardianName" disabled={guardianMode === 'existing'} defaultValue="Robert Doe" placeholder="Enter Gaurdian Name" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Guardian Email</Label>
                <Input name="guardianEmail" disabled={guardianMode === 'existing'} defaultValue="robert.doe@example.com" type="email" placeholder="Enter Gaurdian Email" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Guardian Phone</Label>
                <Input name="guardianPhone" disabled={guardianMode === 'existing'} defaultValue="9876543211" placeholder="Enter Gaurdian Number" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Guardian Mobile Number</Label>
                <Input name="guardianMobileNumber" disabled={guardianMode === 'existing'} defaultValue="9876543211" placeholder="Enter guardian mobile number" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Guardian Aadhar Number</Label>
                <Input name="guardianAadharNumber" disabled={guardianMode === 'existing'} placeholder="Enter guardian Aadhar number" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Guardian Occupation</Label>
                <Input name="guardianOccupation" disabled={guardianMode === 'existing'} defaultValue="Engineer" placeholder="Enter Gaurdian Occupation" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2 md:col-span-3">
                <Label className="text-sm font-semibold text-gray-700">Guardian Address</Label>
                <Input name="guardianAddress" disabled={guardianMode === 'existing'} defaultValue="123 Main Street, City" placeholder="Enter Gaurdian Address" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Guardian Photo Image URL</Label>
                <Input name="guardianPhoto" disabled={guardianMode === 'existing'} placeholder="Enter guardian photo image URL" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medical Details Card */}
        <Card className="shadow-sm border-gray-100 rounded-md overflow-hidden bg-white">
          <div className="px-6 py-4 border-b border-gray-100 bg-white">
            <h2 className="text-base font-semibold text-gray-800">Medical Details</h2>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Blood Group</Label>
                <select name="bloodGroup" defaultValue="O+" className="w-full h-10 border border-gray-200 rounded-md bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#25a194] text-gray-600">
                  <option value="">Select blood group</option>
                  <option value="A+">A+</option>
                  <option value="O+">O+</option>
                  <option value="B+">B+</option>
                  <option value="AB+">AB+</option>
                  <option value="A-">A-</option>
                  <option value="O-">O-</option>
                  <option value="B-">B-</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Height (cm)</Label>
                <Input name="height" defaultValue="160" placeholder="Enter height" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Weight (kg)</Label>
                <Input name="weight" defaultValue="50" placeholder="Enter Weight" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bank Details Card */}
        <Card className="shadow-sm border-gray-100 rounded-md overflow-hidden bg-white">
          <div className="px-6 py-4 border-b border-gray-100 bg-white">
            <h2 className="text-base font-semibold text-gray-800">Bank Details</h2>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Bank Account Number</Label>
                <Input name="accountNumber" defaultValue="123456789012" placeholder="Enter bank account number" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Bank Name</Label>
                <Input name="bankName" defaultValue="Test Bank" placeholder="Enter bank name" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Bank Branch</Label>
                <Input name="bankBranch" placeholder="Enter bank branch" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">IFSC Code</Label>
                <Input name="ifscCode" defaultValue="TEST0001234" placeholder="Enter IFSC Code" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Previous School Details */}
          <Card className="shadow-sm border-gray-100 rounded-md overflow-hidden bg-white">
            <div className="px-6 py-4 border-b border-gray-100 bg-white">
              <h2 className="text-base font-semibold text-gray-800">Previous School Details</h2>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">School Name</Label>
                  <Input name="schoolName" defaultValue="Previous Public School" placeholder="Enter School Name" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Address</Label>
                  <Input name="schoolAddress" defaultValue="456 Old Street, City" placeholder="Enter Address" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address */}
          <Card className="shadow-sm border-gray-100 rounded-md overflow-hidden bg-white">
            <div className="px-6 py-4 border-b border-gray-100 bg-white">
              <h2 className="text-base font-semibold text-gray-800">Address</h2>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Current Address</Label>
                  <Input name="currentAddress" defaultValue="123 Main Street, City" placeholder="Enter Current Address" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Permanent Address</Label>
                  <Input name="permanentAddress" defaultValue="123 Main Street, City" placeholder="Enter Permanent Address" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hostel Details */}
          <Card className="shadow-sm border-gray-100 rounded-md overflow-hidden bg-white">
            <div className="px-6 py-4 border-b border-gray-100 bg-white">
              <h2 className="text-base font-semibold text-gray-800">Hostel Details</h2>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Hostel</Label>
                  <Input name="hostelName" defaultValue="Boys Hostel A" placeholder="Enter Hostel" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Room No</Label>
                  <Input name="roomNumber" defaultValue="101" placeholder="Enter Room No" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upload Documents */}
          <Card className="shadow-sm border-gray-100 rounded-md overflow-hidden bg-white">
            <div className="px-6 py-4 border-b border-gray-100 bg-white">
              <h2 className="text-base font-semibold text-gray-800">Upload Documents</h2>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Doc Name</Label>
                  <Input name="documentName" defaultValue="Birth Certificate" placeholder="Enter Doc Name" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Document Photo</Label>
                  <div className="border border-dashed border-gray-200 rounded-md h-10 flex items-center justify-center text-sm text-gray-500 cursor-pointer hover:bg-gray-50 bg-white">
                    Drag & drop a file here or click
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Student Details */}
        <Card className="shadow-sm border-gray-100 rounded-md overflow-hidden bg-white">
          <div className="px-6 py-4 border-b border-gray-100 bg-white">
            <h2 className="text-base font-semibold text-gray-800">Student Details</h2>
          </div>
          <CardContent className="p-6">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">Details</Label>
              <Textarea name="additionalDetails" defaultValue="Transfer student from another city." placeholder="Enter details" className="min-h-[120px] resize-y border-gray-200 focus-visible:ring-[#25a194]" />
            </div>
          </CardContent>
        </Card>

        {/* Login Details Card */}
        <Card className="shadow-sm border-gray-100 rounded-md overflow-hidden bg-white">
          <div className="px-6 py-4 border-b border-gray-100 bg-white">
            <h2 className="text-base font-semibold text-gray-800">Login Details</h2>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Login Email <span className="text-red-500">*</span></Label>
                <Input name="loginEmail" defaultValue="john.student@example.com" required placeholder="Enter Email" type="email" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Login Password <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Input 
                    name="loginPassword" 
                    defaultValue="Password123!" 
                    required 
                    placeholder="Enter your password" 
                    type={showPassword ? 'text' : 'password'} 
                    className="h-10 border-gray-200 focus-visible:ring-[#25a194] pr-10" 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="pt-6 flex items-center justify-center gap-4">
          <Button type="button" onClick={handleCancel} variant="outline" className="border-red-400 text-red-500 hover:bg-red-50 h-11 px-8 min-w-[120px]" disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="bg-[#25a194] hover:bg-[#208b80] text-white h-11 px-8 min-w-[140px]">
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
