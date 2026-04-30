'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { studentApi } from '@/lib/api/students';
import { academicApi } from '@/lib/api/academic';
import api from '@/lib/api/axios';
import type { AcademicClass } from '@/lib/types';

export default function AddStudentPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [classes, setClasses] = useState<AcademicClass[]>([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [isLoadingClasses, setIsLoadingClasses] = useState(true);
  const sections = classes.find((cls) => cls.id === selectedClassId)?.sections ?? [];

  // Fetch master classes on component mount
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setIsLoadingClasses(true);
        const data = await academicApi.getMasterClasses();
        setClasses(data);
      } catch (error) {
        console.error('Failed to fetch classes:', error);
        toast.error('Failed to load classes');
      } finally {
        setIsLoadingClasses(false);
      }
    };

    fetchClasses();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      // 1. Register User Check
      const loginEmail = formData.get('loginEmail') as string;
      const loginPassword = formData.get('loginPassword') as string;
      const fullName = formData.get('fullName') as string;
      const [firstName, ...lastNameParts] = fullName.trim().split(/\s+/);

      if (!loginEmail || !loginPassword) {
         toast.error("Please provide login details (email and password)");
         setIsLoading(false);
         return;
      }

      // Register the student as a user via API
      const authData = {
        email: loginEmail,
        password: loginPassword,
        firstName,
        lastName: lastNameParts.join(' '),
        role: 'STUDENT',
        phone: formData.get('phone') as string,
      };
      const authRes = await api.post('/auth/register', authData).catch((err) => {
         throw new Error(err.response?.data?.message || 'Failed to register student user account');
      });

      const userId = authRes.data?.user?.id || authRes.data?.id;

      if (!userId) {
         throw new Error("Did not receive userId after registration.");
      }

      // 2. Prepare Admission payload
      const payload = {
        userId,
        academicInfo: {
          year: formData.get('academicYear') as string,
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
             name: formData.get('guardianName') as string,
             phone: formData.get('guardianPhone') as string,
             occupation: formData.get('guardianOccupation') as string,
             email: formData.get('guardianEmail') as string,
             address: formData.get('guardianAddress') as string,
             relation: formData.get('guardian') as string,
          }
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

      await studentApi.createStudent(payload);
      
      toast.success('Student admission created successfully!');
      router.push('/students');

    } catch (error: unknown) {
      console.error(error);
      const resMsg =
        typeof error === 'object' && error !== null && 'response' in error
          ? (error as { response?: { data?: { message?: string | string[] } } }).response?.data?.message
          : undefined;
      if (Array.isArray(resMsg)) {
        resMsg.forEach((msg: string) => toast.error(msg));
      } else {
        toast.error(
          (error instanceof Error ? error.message : undefined) ||
            resMsg ||
            'An error occurred during admission.',
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto pb-12">
      <div className="mb-6">
        <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Add New Student</h1>
        <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
          <Link href="/" className="hover:text-[#25a194] transition-colors">Dashboard</Link>
          <span>/</span>
          <Link href="/students" className="hover:text-[#25a194] transition-colors">Student</Link>
          <span>/</span>
          <span className="text-gray-400">Add New Student</span>
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
                <select name="academicYear" required className="w-full h-10 border border-gray-200 rounded-md bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#25a194] text-gray-600">
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
                <Label className="text-sm font-semibold text-gray-700">Roll Number</Label>
                <Input name="rollNumber" placeholder="Enter your rollNumber" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Admission No <span className="text-red-500">*</span></Label>
                <Input name="admissionNumber" required placeholder="Enter admission number" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Full Name <span className="text-red-500">*</span></Label>
                <Input name="fullName" required placeholder="Enter your Full Name" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Category <span className="text-red-500">*</span></Label>
                <select name="category" required className="w-full h-10 border border-gray-200 rounded-md bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#25a194] text-gray-600">
                  <option value="">Select a Category</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Gender</Label>
                <select name="gender" className="w-full h-10 border border-gray-200 rounded-md bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#25a194] text-gray-600">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2 relative">
                <Label className="text-sm font-semibold text-gray-700">Date Of Birth <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Input name="dateOfBirth" required type="date" placeholder="yyyy-mm-dd" className="h-10 border-gray-200 focus-visible:ring-[#25a194] pr-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Phone <span className="text-red-500">*</span></Label>
                <Input name="phone" required placeholder="Enter Your Phone Number" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Email <span className="text-red-500">*</span></Label>
                <Input name="email" required type="email" placeholder="Enter Your Email" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Student Photo</Label>
                <div className="border border-dashed border-gray-200 rounded-md h-10 flex items-center justify-center text-sm text-gray-500 cursor-pointer hover:bg-gray-50 bg-white">
                  Drag & drop a file here or click
                </div>
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
                <Input name="fatherName" placeholder="Enter Father Name" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Phone Number</Label>
                <Input name="fatherPhone" placeholder="Enter Father Number" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Father Occupation</Label>
                <Input name="fatherOccupation" placeholder="Enter Father Occupation" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Father Photo</Label>
                <div className="border border-dashed border-gray-200 rounded-md h-10 flex items-center justify-center text-sm text-gray-500 cursor-pointer hover:bg-gray-50 bg-white">
                  Drag & drop a file here or click
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Mothers Name</Label>
                <Input name="motherName" placeholder="Enter Mother Name" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Phone Number</Label>
                <Input name="motherPhone" placeholder="Enter Mother Number" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Mother Occupation</Label>
                <Input name="motherOccupation" placeholder="Enter Mother Occupation" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Mother Photo</Label>
                <div className="border border-dashed border-gray-200 rounded-md h-10 flex items-center justify-center text-sm text-gray-500 cursor-pointer hover:bg-gray-50 bg-white">
                  Drag & drop a file here or click
                </div>
              </div>
            </div>

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
                <Input name="guardianName" placeholder="Enter Gaurdian Name" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Guardian Email</Label>
                <Input name="guardianEmail" type="email" placeholder="Enter Gaurdian Email" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Guardian Phone</Label>
                <Input name="guardianPhone" placeholder="Enter Gaurdian Number" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Guardian Occupation</Label>
                <Input name="guardianOccupation" placeholder="Enter Gaurdian Occupation" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2 md:col-span-3">
                <Label className="text-sm font-semibold text-gray-700">Guardian Address</Label>
                <Input name="guardianAddress" placeholder="Enter Gaurdian Address" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Guardian Photo</Label>
                <div className="border border-dashed border-gray-200 rounded-md h-10 flex items-center justify-center text-sm text-gray-500 cursor-pointer hover:bg-gray-50 bg-white">
                  Drag & drop a file here or click
                </div>
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
                <select name="bloodGroup" className="w-full h-10 border border-gray-200 rounded-md bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#25a194] text-gray-600">
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
                <Input name="height" placeholder="Enter height" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Weight (kg)</Label>
                <Input name="weight" placeholder="Enter Weight" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
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
                <Input name="accountNumber" placeholder="Enter bank account number" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Bank Name</Label>
                <Input name="bankName" placeholder="Enter bank name" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">IFSC Code</Label>
                <Input name="ifscCode" placeholder="Enter IFSC Code" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">National Identification Number</Label>
                <Input name="nationalId" placeholder="Enter national identification nu" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
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
                  <Input name="schoolName" placeholder="Enter School Name" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Address</Label>
                  <Input name="schoolAddress" placeholder="Enter Address" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
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
                  <Input name="currentAddress" placeholder="Enter Current Address" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Permanent Address</Label>
                  <Input name="permanentAddress" placeholder="Enter Permanent Address" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
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
                  <Input name="hostelName" placeholder="Enter Hostel" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Room No</Label>
                  <Input name="roomNumber" placeholder="Enter Room No" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
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
                  <Input name="documentName" placeholder="Enter Doc Name" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
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
              <Textarea name="additionalDetails" placeholder="Enter details" className="min-h-[120px] resize-y border-gray-200 focus-visible:ring-[#25a194]" />
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
                <Input name="loginEmail" required placeholder="Enter Email" type="email" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2 relative">
                <Label className="text-sm font-semibold text-gray-700">Login Password <span className="text-red-500">*</span></Label>
                <Input name="loginPassword" required placeholder="Enter your password" type="password" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="pt-6 flex items-center justify-center gap-4">
          <Button type="button" onClick={() => router.back()} variant="outline" className="border-red-400 text-red-500 hover:bg-red-50 h-11 px-8 min-w-[120px]" disabled={isLoading}>
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
