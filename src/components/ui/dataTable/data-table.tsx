import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/lib-ui/table';
import { Button } from '../../lib-ui/button';
import { useState } from 'react';
import { Input } from '../../lib-ui/input';
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '../../lib-ui/popover';
import { cn } from '../../../lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../../lib-ui/calendar';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../lib-ui/select';
import { RefundMethod, Status } from '../Transactions';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
const statuses: Status[] = [
  'Pending',
  'Pending-sent',
  'ACH-sent',
  'Completed',
  'Ach-returned',
];

const refundMethods: RefundMethod[] = ['ACH', 'Check', 'GiftCard', 'Donation'];

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const [search, setSearch] = useState('');
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setSearch,
    onRowSelectionChange: setRowSelection,

    enableFilters: true,
    state: {
      sorting,
      globalFilter: search,
      rowSelection,
      columnFilters,
    },
  });

  const [selectedStatus, setSelectedStatus] = useState<Status | undefined>();
  const [selectedRefundMethod, setSelectedRefundMethod] = useState<
    RefundMethod | undefined
  >();

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2023, 0, 20),
    to: addDays(new Date(2023, 0, 20), 3),
  });

  return (
    <div className='rounded-md border py-10 px-7'>
      <h3>Transactions</h3>
      <div className='flex items-center pt-4 justify-between'>
        <div className='w-3/4 flex justify-start gap-3'>
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id='date'
                  variant={'outline'}
                  className={cn(
                    'w-[300px] justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}>
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, 'LLL dd, y')} -{' '}
                        {format(date.to, 'LLL dd, y')}
                      </>
                    ) : (
                      format(date.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                  initialFocus
                  mode='range'
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Select
              value={selectedStatus}
              onValueChange={(value) => {
                setSelectedStatus((value as Status) || undefined);

                table.getColumn('status')?.setFilterValue(value);
              }}>
              <SelectTrigger className='w-[200px]'>
                <SelectValue placeholder='Refund Status' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Refund Status</SelectLabel>
                  <SelectItem value={''}>All</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select
              value={selectedRefundMethod}
              onValueChange={(value) => {
                setSelectedRefundMethod((value as RefundMethod) || undefined);
                table.getColumn('refundMethod')?.setFilterValue(value);
              }}>
              <SelectTrigger className='w-[200px]'>
                <SelectValue placeholder='Payment Method' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Refund Method</SelectLabel>
                  <SelectItem value={''}>All</SelectItem>
                  {refundMethods.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='w-1/4'>
          <Input
            placeholder='Search...'
            value={search}
            onChange={(event) => {
              table.setGlobalFilter(event.currentTarget.value);
            }}
          />
        </div>
      </div>
      <div className='flex items-center py-4 justify-between'>
        <div className='w-3/4 flex justify-start gap-3'>
          <div>
            <Select
              value={selectedStatus}
              onValueChange={(value) => {
                setSelectedStatus((value as Status) || undefined);

                table.getColumn('status')?.setFilterValue(value);
              }}>
              <SelectTrigger className='w-[250px]'>
                <SelectValue placeholder='Update Refund Status' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Refund Status</SelectLabel>
                  <SelectItem value={''}>All</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select
              value={selectedRefundMethod}
              onValueChange={(value) => {
                setSelectedRefundMethod((value as RefundMethod) || undefined);
                table.getColumn('refundMethod')?.setFilterValue(value);
              }}>
              <SelectTrigger className='w-[250px]'>
                <SelectValue placeholder='Update Payment Method' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Refund Method</SelectLabel>
                  <SelectItem value={''}>All</SelectItem>
                  {refundMethods.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='w-1/4 flex gap-3'>
          <Button variant={'outline'}>Download</Button>
          <Button variant={'default'}>Update</Button>
        </div>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  className={
                    index % 2 !== 0
                      ? 'bg-muted hover:bg-muted/70'
                      : 'hover:bg-muted/70'
                  }
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 pt-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        <div>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
