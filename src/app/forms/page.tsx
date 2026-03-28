'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function FormsElementPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Left Column */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-gray-800">Basic Inputs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <Input placeholder="Basic Input" className="h-12 border-gray-200" />
              <Input placeholder="Input with Value" defaultValue="Input with Value" className="h-12 border-gray-200" />
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-gray-800">Textarea</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <Textarea placeholder="Type something here..." className="min-h-32 border-gray-200 resize-none" />
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-gray-800">Input Size</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <Input placeholder="Extra Large Input" className="h-14 text-lg border-gray-200" />
              <Input placeholder="Large Input" className="h-12 text-base border-gray-200" />
              <Input placeholder="Default Input" className="h-10 border-gray-200" />
              <Input placeholder="Small Input" className="h-8 text-sm border-gray-200" />
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-gray-800">Vertical Form</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-600 font-medium">Username</Label>
                <Input placeholder="Enter your username" className="h-12 border-gray-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-600 font-medium">Password</Label>
                <Input type="password" placeholder="Enter your password" className="h-12 border-gray-200" />
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="remember" className="border-gray-300 data-[state=checked]:bg-[#208b80]" />
                <label htmlFor="remember" className="text-sm font-medium leading-none text-gray-600">
                  Remember me
                </label>
              </div>
              <Button className="bg-[#208b80] hover:bg-[#197067] text-white font-semibold h-11 px-8 rounded">Sign In</Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-gray-800">Checkboxes</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="chk1" className="border-gray-300 rounded-sm" />
                <label htmlFor="chk1" className="text-sm font-medium text-gray-600">Checkbox 1</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="chk2" checked className="border-gray-300 data-[state=checked]:bg-green-500 rounded-sm" />
                <label htmlFor="chk2" className="text-sm font-medium text-gray-600">Checkbox 2</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="chk3" className="border-gray-300 data-[state=checked]:bg-red-500 rounded-sm" checked />
                <label htmlFor="chk3" className="text-sm font-medium text-gray-600">Checkbox 3</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="chk4" className="border-gray-300 data-[state=checked]:bg-yellow-500 rounded-sm" checked />
                <label htmlFor="chk4" className="text-sm font-medium text-gray-600">Checkbox 4</label>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-sm rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-gray-800">Radio Group</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <RadioGroup defaultValue="r1" className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="r1" id="r1" className="border-gray-300 text-[#25a194]" />
                  <Label htmlFor="r1" className="font-medium text-gray-600">Radio 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="r2" id="r2" className="border-gray-300 text-green-500 border-green-500" />
                  <Label htmlFor="r2" className="font-medium text-gray-600">Radio 2</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="r3" id="r3" className="border-gray-300 text-red-500 border-red-500" />
                  <Label htmlFor="r3" className="font-medium text-gray-600">Radio 3</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-gray-800">Select List</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-600 font-medium">Basic Select</Label>
                <Select>
                  <SelectTrigger className="w-full h-12 border-gray-200">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="opt1">Option 1</SelectItem>
                    <SelectItem value="opt2">Option 2</SelectItem>
                    <SelectItem value="opt3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-gray-800">Horizontal Form</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-gray-600 font-medium text-right">Email</Label>
                <div className="col-span-3">
                  <Input placeholder="Enter email" className="h-12 border-gray-200 w-full" />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-gray-600 font-medium text-right">Password</Label>
                <div className="col-span-3">
                  <Input type="password" placeholder="Enter password" className="h-12 border-gray-200 w-full" />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4 pt-2">
                <div className="col-start-2 col-span-3">
                  <Button className="bg-[#208b80] hover:bg-[#197067] text-white font-semibold h-11 px-8 rounded">Sign In</Button>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
