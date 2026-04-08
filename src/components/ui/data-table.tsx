'use client';

import * as React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  PaginationState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: {
    pageIndex: number;
    pageSize: number;
    pageCount: number;
    rowCount: number;
    onPaginationChange: (pagination: PaginationState) => void;
  };
  isLoading?: boolean;
  emptyMessage?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  isLoading = false,
  emptyMessage = 'No results.',
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    manualPagination: !!pagination,
    pageCount: pagination?.pageCount,
    rowCount: pagination?.rowCount,
    onPaginationChange: pagination
      ? (updater) => {
          const nextPagination =
            typeof updater === 'function'
              ? updater({
                  pageIndex: pagination.pageIndex,
                  pageSize: pagination.pageSize,
                })
              : updater;
          pagination.onPaginationChange(nextPagination);
        }
      : undefined,
    state: pagination
      ? {
          pagination: {
            pageIndex: pagination.pageIndex,
            pageSize: pagination.pageSize,
          },
        }
      : undefined,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const currentPagination = table.getState().pagination;
  const rowCount = pagination?.rowCount ?? table.getFilteredRowModel().rows.length;
  const startRow = rowCount === 0 ? 0 : currentPagination.pageIndex * currentPagination.pageSize + 1;
  const endRow = rowCount === 0
    ? 0
    : Math.min((currentPagination.pageIndex + 1) * currentPagination.pageSize, rowCount);

  return (
    <div className="w-full">
      <div className="rounded-md border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-xs font-semibold text-gray-800 uppercase px-4 py-4">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-b-0"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-3 text-sm text-gray-600">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2 py-4">
        <div className="text-sm text-gray-500">
          Showing {startRow} to {endRow} of {rowCount} entries
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1">
             {table.getPageOptions().map((pageIndex) => (
                    <Button
                        key={pageIndex}
                        variant={table.getState().pagination.pageIndex === pageIndex ? 'default' : 'ghost'}
                        className={`h-8 w-8 p-0 text-xs ${table.getState().pagination.pageIndex === pageIndex ? 'bg-[#25a194] hover:bg-[#208b80] text-white font-medium' : 'text-gray-600 font-medium hover:bg-gray-50'}`}
                        onClick={() => table.setPageIndex(pageIndex)}
                    >
                        {pageIndex + 1}
                    </Button>
                ))}
          </div>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
