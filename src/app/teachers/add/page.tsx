'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useTeachersStore } from '@/store/teachersStore';
import api from '@/lib/api/axios';

export default function AddTeacherPage() {
  const router = useRouter();
  const { createTeacher } = useTeachersStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    const form = (e.currentTarget as HTMLButtonElement).closest('form') as HTMLFormElement;
    form?.reset();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      // Step 1: Register user account
      const loginEmail = formData.get('loginEmail') as string;
      const loginPassword = formData.get('loginPassword') as string;

      if (!loginEmail || !loginPassword) {
        toast.error('Please provide login email and password');
        setIsLoading(false);
        return;
      }

      const authRes = await api.post('/auth/register', {
        email: loginEmail,
        password: loginPassword,
        role: 'TEACHER',
      }).catch((err) => {
        throw new Error(err.response?.data?.message || 'Failed to register teacher account');
      });

      const userId = authRes.data?.user?.id || authRes.data?.id;
      if (!userId) throw new Error('Did not receive userId after registration');

      // Step 2: Create teacher profile
      const employeeCode = formData.get('employeeCode') as string;
      if (!employeeCode) {
        toast.error('Teacher ID is required');
        setIsLoading(false);
        return;
      }

      await createTeacher({
        userId,
        employeeCode,
        personalInfo: {
          fullName: formData.get('fullName') as string || undefined,
          gender: formData.get('gender') as string || undefined,
          dateOfBirth: formData.get('dateOfBirth') as string || undefined,
          fathersName: formData.get('fathersName') as string || undefined,
          mothersName: formData.get('mothersName') as string || undefined,
          maritalStatus: formData.get('maritalStatus') as string || undefined,
          contractType: formData.get('contractType') as string || undefined,
          shift: formData.get('shift') as string || undefined,
          workLocation: formData.get('workLocation') as string || undefined,
          joiningDate: formData.get('joiningDate') as string || undefined,
          phone: formData.get('phone') as string || undefined,
          email: formData.get('email') as string || undefined,
          experience: formData.get('experience') as string || undefined,
          qualification: formData.get('qualification') as string || undefined,
        },
        medicalDetails: {
          bloodGroup: formData.get('bloodGroup') as string || undefined,
          height: formData.get('height') as string || undefined,
          weight: formData.get('weight') as string || undefined,
        },
        bankDetails: {
          accountNumber: formData.get('accountNumber') as string || undefined,
          bankName: formData.get('bankName') as string || undefined,
          ifscCode: formData.get('ifscCode') as string || undefined,
          nationalId: formData.get('nationalId') as string || undefined,
        },
        previousSchoolDetails: {
          schoolName: formData.get('previousSchoolName') as string || undefined,
          address: formData.get('previousSchoolAddress') as string || undefined,
        },
        address: {
          currentAddress: formData.get('currentAddress') as string || undefined,
          permanentAddress: formData.get('permanentAddress') as string || undefined,
        },
        additionalDetails: formData.get('additionalDetails') as string || undefined,
        socialLinks: {
          facebook: formData.get('facebook') as string || undefined,
          linkedin: formData.get('linkedin') as string || undefined,
          instagram: formData.get('instagram') as string || undefined,
          youtube: formData.get('youtube') as string || undefined,
        },
      });

      toast.success('Teacher added successfully');
      router.push('/teachers');
    } catch (err: any) {
      toast.error(err.message || 'Failed to add teacher');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-12">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Add New Teacher</h1>
        <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
          <Link href="/" className="hover:text-[#25a194] transition-colors">Dashboard</Link>
          <span>/</span>
          <Link href="/teachers" className="hover:text-[#25a194] transition-colors">Teacher</Link>
          <span>/</span>
          <span className="text-gray-400">Add New Teacher</span>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">

          {/* Personal Info */}
          <Card className="shadow-sm border-gray-100 rounded-md overflow-hidden bg-white">
            <div className="px-6 py-4 border-b border-gray-100 bg-white">
              <h2 className="text-base font-semibold text-gray-800">Personal Info</h2>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Teacher ID <span className="text-red-500">*</span></Label>
                  <Input name="employeeCode" placeholder="Enter Teacher ID" required className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Full Name <span className="text-red-500">*</span></Label>
                  <Input name="fullName" placeholder="Enter your Full Name" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Gender</Label>
                  <select name="gender" className="w-full h-10 border border-gray-200 rounded-md bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#25a194] text-gray-600 shadow-none">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Date Of Birth <span className="text-red-500">*</span></Label>
                  <Input name="dateOfBirth" type="date" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Fathers Name</Label>
                  <Input name="fathersName" placeholder="Enter Fathers Name" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Mothers Name</Label>
                  <Input name="mothersName" placeholder="Enter Mothers Name" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Marital Status</Label>
                  <select name="maritalStatus" className="w-full h-10 border border-gray-200 rounded-md bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#25a194] text-gray-600 shadow-none">
                    <option value="">Select a Marital Status</option>
                    <option value="Married">Married</option>
                    <option value="Unmarried">Unmarried</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Contract Type</Label>
                  <select name="contractType" className="w-full h-10 border border-gray-200 rounded-md bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#25a194] text-gray-600 shadow-none">
                    <option value="">Select a Contract Type</option>
                    <option value="Permanent">Permanent</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Shift</Label>
                  <select name="shift" className="w-full h-10 border border-gray-200 rounded-md bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#25a194] text-gray-600 shadow-none">
                    <option value="">Select a shift</option>
                    <option value="Morning">Morning</option>
                    <option value="Day">Day</option>
                    <option value="Evening">Evening</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Work Location</Label>
                  <Input name="workLocation" placeholder="Enter work location" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Join Date</Label>
                  <Input name="joiningDate" type="date" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Phone Number <span className="text-red-500">*</span></Label>
                  <Input name="phone" placeholder="Enter your Phone Number" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Email <span className="text-red-500">*</span></Label>
                  <Input name="email" type="email" placeholder="Enter your Email" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Experience <span className="text-red-500">*</span></Label>
                  <Input name="experience" placeholder="Enter experience" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Qualification <span className="text-red-500">*</span></Label>
                  <Input name="qualification" placeholder="Enter Qualification" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Teacher Photo</Label>
                  <div className="border border-dashed border-gray-200 rounded-md h-10 flex items-center justify-center text-sm text-gray-500 cursor-pointer hover:bg-gray-50 bg-white">
                    Drag & drop a file here or click
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>

          {/* Medical Details */}
          <Card className="shadow-sm border-gray-100 rounded-md overflow-hidden bg-white">
            <div className="px-6 py-4 border-b border-gray-100 bg-white">
              <h2 className="text-base font-semibold text-gray-800">Medical Details</h2>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Blood Group</Label>
                  <select name="bloodGroup" className="w-full h-10 border border-gray-200 rounded-md bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#25a194] text-gray-600 shadow-none">
                    <option value="">Select blood group</option>
                    <option>A+</option><option>A-</option>
                    <option>B+</option><option>B-</option>
                    <option>AB+</option><option>AB-</option>
                    <option>O+</option><option>O-</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Height</Label>
                  <Input name="height" placeholder="Enter height" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Weight</Label>
                  <Input name="weight" placeholder="Enter Weight" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bank Details */}
          <Card className="shadow-sm border-gray-100 rounded-md overflow-hidden bg-white">
            <div className="px-6 py-4 border-b border-gray-100 bg-white">
              <h2 className="text-base font-semibold text-gray-800">Bank Details</h2>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Bank Account Number</Label>
                  <Input name="accountNumber" placeholder="Enter bank account number" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Bank Name</Label>
                  <Input name="bankName" placeholder="Enter bank name" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">IFSC Code</Label>
                  <Input name="ifscCode" placeholder="Enter IFSC Code" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">National Identification Number</Label>
                  <Input name="nationalId" placeholder="Enter national identification number" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
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
                  <Input name="docName" placeholder="Enter Doc Name" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Upload File</Label>
                  <div className="flex w-full items-center h-10 border border-gray-200 rounded-md overflow-hidden bg-white">
                    <label className="bg-gray-50 text-gray-600 px-4 py-2 border-r border-gray-200 text-sm font-medium whitespace-nowrap cursor-pointer">
                      Choose File
                      <input type="file" name="docFile" className="hidden" />
                    </label>
                    <div className="px-4 text-gray-400 text-sm w-full">No file chosen</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Previous School + Address */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-sm border-gray-100 rounded-md overflow-hidden bg-white">
              <div className="px-6 py-4 border-b border-gray-100 bg-white">
                <h2 className="text-base font-semibold text-gray-800">Previous School Details</h2>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">School Name</Label>
                    <Input name="previousSchoolName" placeholder="Enter School Name" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Address</Label>
                    <Input name="previousSchoolAddress" placeholder="Enter Address" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-gray-100 rounded-md overflow-hidden bg-white">
              <div className="px-6 py-4 border-b border-gray-100 bg-white">
                <h2 className="text-base font-semibold text-gray-800">Address</h2>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Current Address</Label>
                    <Input name="currentAddress" placeholder="Enter Current Address" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Permanent Address</Label>
                    <Input name="permanentAddress" placeholder="Enter Permanent Address" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Teacher Details */}
          <Card className="shadow-sm border-gray-100 rounded-md overflow-hidden bg-white">
            <div className="px-6 py-4 border-b border-gray-100 bg-white">
              <h2 className="text-base font-semibold text-gray-800">Teacher Details</h2>
            </div>
            <CardContent className="p-6">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Teacher Details</Label>
                <Textarea name="additionalDetails" placeholder="Enter details" className="min-h-[100px] resize-y border-gray-200 focus-visible:ring-[#25a194] shadow-none text-sm" />
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card className="shadow-sm border-gray-100 rounded-md overflow-hidden bg-white">
            <div className="px-6 py-4 border-b border-gray-100 bg-white">
              <h2 className="text-base font-semibold text-gray-800">Social Links</h2>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Facebook</Label>
                  <Input name="facebook" placeholder="Enter your facebook link" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">LinkedIn</Label>
                  <Input name="linkedin" placeholder="Enter your LinkedIn link" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Instagram</Label>
                  <Input name="instagram" placeholder="Enter your Instagram link" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">YouTube</Label>
                  <Input name="youtube" placeholder="Enter your YouTube link" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Login Details */}
          <Card className="shadow-sm border-gray-100 rounded-md overflow-hidden bg-white">
            <div className="px-6 py-4 border-b border-gray-100 bg-white">
              <h2 className="text-base font-semibold text-gray-800">Login Details</h2>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Email <span className="text-red-500">*</span></Label>
                  <Input name="loginEmail" type="email" placeholder="Enter Email" required className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Password <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <Input
                      name="loginPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      required
                      className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={isLoading}
              className="border-red-400 text-red-500 hover:bg-red-50 hover:text-red-600 h-11 px-10 min-w-[140px] font-medium bg-red-50/10"
            >
              Reset
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#25a194] hover:bg-[#208b80] text-white h-11 px-8 min-w-[150px] font-medium"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>

        </div>
      </form>
    </div>
  );
}
