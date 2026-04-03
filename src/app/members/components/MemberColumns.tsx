'use client';

import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Edit, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { MemberUser, UserStatus } from '@/lib/types';

export function getInitials(firstName: string, lastName: string) {
  return `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();
}

export function displayRole(member: MemberUser): string {
  return member.roleEntity?.name ?? member.role;
}

export const STATUS_STYLES: Record<UserStatus, string> = {
  ACTIVE: 'bg-green-50 text-green-600',
  INACTIVE: 'bg-red-50 text-red-600',
  SUSPENDED: 'bg-orange-50 text-orange-600',
};

export function buildColumns(
  onEdit: (m: MemberUser) => void,
  onDelete: (m: MemberUser) => void,
  onToggleStatus: (m: MemberUser) => void,
): ColumnDef<MemberUser>[] {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={(table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')) as boolean}
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: 'name',
      header: 'Name',
      cell: ({ row }) => {
        const m = row.original;
        const initials = getInitials(m.firstName, m.lastName);
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 border border-gray-100 ring-2 ring-transparent">
              <AvatarFallback className="bg-gray-50 text-gray-600 text-xs font-semibold">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900">{m.firstName} {m.lastName}</span>
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                MEMBER-{m.id.slice(0, 8).toUpperCase()}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => <span className="text-gray-600 font-medium">{row.getValue('email')}</span>,
    },
    {
      id: 'role',
      header: 'Role',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-[#25a194]" />
          <span className="text-gray-600 font-medium">{displayRole(row.original)}</span>
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as UserStatus;
        return (
          <button onClick={() => onToggleStatus(row.original)} className="cursor-pointer">
            <Badge className={cn('rounded-full px-2.5 py-0.5 text-[11px] font-bold border-0 shadow-none', STATUS_STYLES[status])}>
              {status.charAt(0) + status.slice(1).toLowerCase()}
            </Badge>
          </button>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }) => (
        <span className="text-gray-500 italic font-medium">
          {new Date(row.getValue('createdAt')).toLocaleDateString()}
        </span>
      ),
    },
    {
      id: 'actions',
      header: () => <div className="text-center">Actions</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() => onEdit(row.original)}
            className="h-8 w-8 rounded text-gray-400 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-all border border-transparent hover:border-blue-200"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(row.original)}
            className="h-8 w-8 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-all border border-transparent hover:border-red-200"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];
}
