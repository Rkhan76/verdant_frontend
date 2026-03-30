'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MoreVertical, Paperclip, Image as ImageIcon, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const contacts = [
  { id: 1, name: 'Kathryn Murphy', msg: 'Hey! there I\'m...', time: '12:30 PM', unread: 8, seed: 'Kathryn' },
  { id: 2, name: 'James Michael', msg: 'Hey! there I\'m...', time: '12:30 PM', unread: 6, seed: 'James' },
  { id: 3, name: 'Russell Lucas', msg: 'Hey! there I\'m...', time: '12:30 PM', unread: 0, seed: 'Russell' },
  { id: 4, name: 'Caleb Bradley', msg: 'Hey! there I\'m...', time: '12:30 PM', unread: 0, seed: 'Caleb' },
  { id: 5, name: 'Bobby Roy', msg: 'Hey! there I\'m...', time: '12:30 PM', unread: 2, seed: 'Bobby' },
  { id: 6, name: 'Vincent Liam', msg: 'Hey! there I\'m...', time: '12:30 PM', unread: 0, seed: 'Vincent' },
  { id: 7, name: 'Albert Wayne', msg: 'Hey! there I\'m...', time: '12:30 PM', unread: 0, seed: 'Albert' },
  { id: 8, name: 'Elijah Willie', msg: 'Hey! there I\'m...', time: '12:30 PM', unread: 1, seed: 'Elijah' },
];

export default function MessagePage() {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Message</h1>
        <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
          <Link href="/" className="hover:text-[#25a194] transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="text-gray-400">Message</span>
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)] min-h-[600px]">
        {/* Left Sidebar - Contact List */}
        <div className="w-full lg:w-[320px] bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col overflow-hidden shrink-0">
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search" 
                className="pl-9 h-10 bg-white border-gray-200 rounded-md text-sm w-full focus-visible:ring-[#25a194] shadow-none"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300">
            {contacts.map((contact, idx) => (
              <div 
                key={contact.id} 
                className={`p-4 flex items-center justify-between cursor-pointer border-b border-gray-50 ${idx === 0 ? 'bg-gray-50/70 border-l-[3px] border-l-[#25a194]' : 'hover:bg-gray-50/50 border-l-[3px] border-l-transparent'} transition-colors`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10 border border-gray-100">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.seed}`} />
                      <AvatarFallback className="bg-orange-100 text-orange-600 text-xs font-semibold">{contact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {idx === 0 && (
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-[#10b981] border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  <div>
                    <h3 className={`text-sm font-medium ${idx === 0 ? 'text-gray-900' : 'text-gray-700'}`}>{contact.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{contact.msg}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="text-[11px] text-gray-400">{contact.time}</span>
                  {contact.unread > 0 && (
                    <span className="h-4 min-w-[16px] px-1 rounded-full bg-orange-400 flex items-center justify-center text-[10px] font-bold text-white leading-none">
                      {contact.unread}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Area - Chat Room */}
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col overflow-hidden hidden md:flex">
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                 <Avatar className="h-10 w-10 border border-gray-100">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kathryn" />
                  <AvatarFallback className="bg-orange-100 text-orange-600">K</AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-[#10b981] border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h2 className="text-[15px] font-semibold text-gray-800">Kathryn Murphy</h2>
                <p className="text-[12px] text-[#10b981] font-medium mt-0.5">Available</p>
              </div>
            </div>
            <button className="h-8 w-8 rounded text-gray-500 hover:text-gray-800 hover:bg-gray-100 flex items-center justify-center transition-colors">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">
            {/* Incoming Message */}
            <div className="flex items-end gap-3 max-w-[80%]">
              <Avatar className="h-8 w-8 shrink-0 mb-1 border border-gray-100 shadow-sm">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kathryn" />
              </Avatar>
              <div className="flex flex-col gap-1">
                <div className="bg-gray-100 text-gray-700 px-5 py-3.5 rounded-2xl rounded-bl-sm text-[14px] leading-relaxed relative border border-gray-200">
                  <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                </div>
                <span className="text-[11px] text-gray-400 pl-1 inline-block w-full text-right">6:30 pm</span>
              </div>
            </div>

            {/* Outgoing Message */}
            <div className="flex items-end gap-3 max-w-[80%] ml-auto justify-end">
              <div className="flex flex-col gap-1 items-end">
                <div className="bg-[#25a194] text-white px-5 py-3.5 rounded-2xl rounded-br-sm text-[14px] leading-relaxed shadow-sm">
                  <p>The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.</p>
                </div>
                <span className="text-[11px] text-[#25a194] pr-1 font-medium">6:32 pm</span>
              </div>
            </div>

            {/* Incoming Message 2 */}
            <div className="flex items-end gap-3 max-w-[80%]">
              <Avatar className="h-8 w-8 shrink-0 mb-1 border border-gray-100 shadow-sm">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kathryn" />
              </Avatar>
              <div className="flex flex-col gap-1">
                <div className="bg-gray-100 text-gray-700 px-5 py-3.5 rounded-2xl rounded-bl-sm text-[14px] leading-relaxed relative border border-gray-200">
                  <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.</p>
                </div>
                <span className="text-[11px] text-gray-400 pl-1 inline-block w-full text-right">6:35 pm</span>
              </div>
            </div>
          </div>

          {/* Chat Footer */}
          <div className="p-4 border-t border-gray-100 bg-white flex items-center gap-3">
            <Input 
              placeholder="Write message" 
              className="flex-1 h-12 bg-transparent border-0 focus-visible:ring-0 shadow-none px-2 text-[14px] placeholder:text-gray-400"
            />
            <div className="flex items-center gap-2 pr-1">
              <button className="h-10 w-10 text-gray-400 hover:text-gray-600 flex items-center justify-center transition-colors rounded-full hover:bg-gray-50">
                <Paperclip className="h-5 w-5" />
              </button>
              <button className="h-10 w-10 text-gray-400 hover:text-gray-600 flex items-center justify-center transition-colors rounded-full hover:bg-gray-50">
                <ImageIcon className="h-5 w-5" />
              </button>
              <Button className="bg-[#25a194] hover:bg-[#208b80] text-white h-10 px-5 rounded ml-1 font-medium flex items-center gap-2 shadow-sm transition-all">
                Send
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
