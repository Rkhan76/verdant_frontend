import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Users, Calendar, Utensils, Printer, MoreHorizontal, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

// Note: Recharts is a client component, to avoid errors we'll mock the charts directly in standard divs for now.
// A real app would use a Client component wrapper for recharts.

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Top 4 Metrics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Students', value: '932', icon: User, color: 'bg-[#208b80]', text: 'text-white' },
          { label: 'Teachers', value: '754', icon: Users, color: 'bg-orange-500', text: 'text-white' },
          { label: 'Events', value: '40', icon: Calendar, color: 'bg-yellow-400', text: 'text-white' },
          { label: 'Foods', value: '32k', icon: Utensils, color: 'bg-indigo-900', text: 'text-white' },
        ].map((metric) => (
          <Card key={metric.label} className="flex flex-row items-center p-6 gap-4 border-none shadow-sm rounded-xl">
            <div className={`flex h-14 w-14 items-center justify-center rounded-full ${metric.color} ${metric.text}`}>
              <metric.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{metric.label}</p>
              <h3 className="text-3xl font-bold tracking-tight text-gray-800">{metric.value}</h3>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts and Sidebars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-none shadow-sm rounded-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-bold text-gray-800">School Performance</CardTitle>
                <div className="flex gap-4 text-xs font-medium">
                  <span className="flex items-center gap-1 text-[#25a194]"><span className="h-2 w-2 rounded-full bg-[#208b80]"></span>This Week<br/>1.245</span>
                  <span className="flex items-center gap-1 text-red-500"><span className="h-2 w-2 rounded-full bg-red-500"></span>Last Week<br/>1.356</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full bg-gray-50/50 rounded-lg border border-dashed border-gray-200 flex items-center justify-center text-gray-400">
                  School Performance Chart (LineChart) placeholder
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-bold text-gray-800">School Overview</CardTitle>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="bg-gray-100 hover:bg-gray-200 text-gray-600">Week</Badge>
                  <Badge variant="outline" className="border-transparent text-gray-400">Month</Badge>
                  <Badge variant="outline" className="border-transparent text-gray-400">Year</Badge>
                  <Badge variant="outline" className="border-transparent text-gray-400">All</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full bg-gray-50/50 rounded-lg border border-dashed border-gray-200 flex items-center justify-center text-gray-400">
                  School Overview Chart (BarChart) placeholder
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1 border-none shadow-sm rounded-xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800">School Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full aspect-square bg-gray-50/50 rounded-lg border border-dashed border-gray-200 flex items-center justify-center text-gray-400">
                  Calendar Component
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 border-none shadow-sm rounded-xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800">Teacher Details</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full text-sm text-left">
                  <thead className="bg-[#F4F7FC] text-gray-500">
                    <tr>
                      <th className="py-3 px-4 rounded-tl-lg font-medium">Name</th>
                      <th className="py-3 px-4 font-medium">Subject</th>
                      <th className="py-3 px-4 font-medium">Qualification</th>
                      <th className="py-3 px-4 font-medium">Fees</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Hanu', sub: 'Programming', qual: 'B.Tech', fees: '$217.70' },
                      { name: 'Hardy', sub: 'Basic Algorithm', qual: 'B.E', fees: '$17.70' },
                      { name: 'Harry', sub: 'English', qual: 'B.Tech', fees: '$219.70' },
                      { name: 'Jack Xarma', sub: 'Programming', qual: 'B.Tech', fees: '$19.2.70' }
                    ].map((row, i) => (
                      <tr key={i} className="border-b last:border-0 border-gray-100">
                        <td className="py-3 px-4 font-medium text-gray-700">{row.name}</td>
                        <td className="py-3 px-4 text-gray-500">{row.sub}</td>
                        <td className="py-3 px-4 text-gray-500">{row.qual}</td>
                        <td className="py-3 px-4 font-medium text-gray-700">{row.fees}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>

          {/* Unpaid Student Intuition Table */}
          <Card className="border-none shadow-sm rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-bold text-gray-800">Unpaid Student Intuition</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm text-left">
                <thead className="bg-[#F4F7FC] text-gray-500">
                  <tr>
                    <th className="py-3 px-4 rounded-tl-lg font-medium">Name</th>
                    <th className="py-3 px-4 font-medium">ID</th>
                    <th className="py-3 px-4 font-medium">Class</th>
                    <th className="py-3 px-4 font-medium">Fees</th>
                    <th className="py-3 px-4 font-medium">Rank</th>
                    <th className="py-3 px-4 rounded-tr-lg font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Jordan Nico', id: 'ID 123456781', cls: 'Class VII B', fees: '$ 52,036', rank: 'First' },
                    { name: 'Karen Hope', id: 'ID 123456782', cls: 'Class VII A', fees: '$ 53,036', rank: 'First' },
                    { name: 'Nadila Adja', id: 'ID 123456783', cls: 'Class VII B', fees: '$ 54,036', rank: 'First' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b last:border-0 border-gray-100 hover:bg-gray-50/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`https://i.pravatar.cc/150?u=${row.name}`} />
                            <AvatarFallback>{row.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-gray-800">{row.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#25a194] font-medium">{row.id}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">8</div>
                          <span className="text-[#25a194] font-medium">{row.cls}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-bold text-gray-800">{row.fees}</td>
                      <td className="py-3 px-4 text-gray-500">{row.rank}</td>
                      <td className="py-3 px-4 flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-[#25a194]"><Printer className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400"><MoreHorizontal className="h-4 w-4" /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar Column */}
        <div className="space-y-6">
          {/* Recent Students */}
          <Card className="border-none shadow-sm rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg font-bold text-gray-800">Recent Students</CardTitle>
                <p className="text-xs text-gray-500">You have 456 Students</p>
              </div>
              <Button size="icon" className="h-8 w-8 rounded-full bg-[#208b80] hover:bg-[#197067] text-white">+</Button>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              {[
                { name: 'Samantha William', cls: 'Class VII A' },
                { name: 'Tony Soap', cls: 'Class VII B' },
                { name: 'Karen Hope', cls: 'Class VII A' },
                { name: 'Jordan Nico', cls: 'Class VII B' },
                { name: 'Nadila Adja', cls: 'Class VII B' },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${s.name}`} />
                      <AvatarFallback>{s.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{s.name}</p>
                      <p className="text-xs text-gray-500">{s.cls}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-gray-200 text-gray-400 hover:text-[#25a194] hover:border-[#25a194]">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4 text-[#25a194] border-gray-200 hover:bg-gray-50 font-semibold rounded-full">View More</Button>
            </CardContent>
          </Card>

          {/* Messages */}
          <Card className="border-none shadow-sm rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-gray-800">Messages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              {[
                { name: 'Samantha William', time: '12:45 PM', text: 'Lorem ipsum dolor sit' },
                { name: 'Tony Soap', time: '12:45 PM', text: 'Lorem ipsum dolor sit' },
                { name: 'Jordan Nico', time: '12:45 PM', text: 'Lorem ipsum dolor sit' },
                { name: 'Nadila Adja', time: '12:45 PM', text: 'Lorem ipsum dolor sit' },
              ].map((m, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=msg_${m.name}`} />
                    <AvatarFallback>{m.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-gray-800 text-sm">{m.name}</p>
                      <span className="text-xs text-gray-400">{m.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{m.text}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4 text-[#25a194] border-gray-200 hover:bg-gray-50 font-semibold rounded-full">View More</Button>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
