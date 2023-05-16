import { ColumnDef } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../lib-ui/dropdown-menu';
import { Button } from '../../lib-ui/button';
import { ArrowUpDown, Edit, MoreHorizontal, Plus } from 'lucide-react';
import { Checkbox } from '../../lib-ui/checkbox';
import { Refund, Status } from '../Transactions';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../lib-ui/tooltip';
import { useToast } from '../../lib-ui/use-toast';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Refund>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'refundDate',
    enableGlobalFilter: true,
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Refund Date <br />
          Claimed Date
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },

    cell: ({ row }) => {
      return (
        <div>
          <p className='font-bold'>
            {row.original.refundDate.format('MM/DD/YYYY')}
          </p>
          <p>{row.original.claimedDate.format('MM/DD/YYYY')}</p>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    enableGlobalFilter: true,
  },
  {
    accessorKey: 'email',
    enableGlobalFilter: true,
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Customer
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },

    cell: ({ row }) => {
      const email = row.getValue('email') as string;
      const fullName = ((row.original.firstName as string) +
        ' ' +
        (row.original.lastName as string)) as string;
      return (
        <div>
          <p className='font-bold'>
            {fullName}{' '}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='outline'
                    className='w-6 h-6 rounded-full p-0'>
                    <Edit className='h-3 w-3' />
                    <span className='sr-only'>Edit</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to library</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </p>
          <p>({email})</p>
        </div>
      );
    },
  },
  {
    accessorKey: 'refundAmount',
    enableGlobalFilter: true,

    header: ({ column }) => {
      return (
        <div className='flex justify-center'>
          <Button
            variant='ghost'
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === 'asc')
            }>
            Amount
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('refundAmount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return <div className='text-center font-medium'>{formatted}</div>;
    },
  },
  {
    accessorKey: 'refundMethod',
    enableGlobalFilter: true,
    header: ({ column }) => {
      return (
        <div className='flex justify-center'>
          <Button
            variant='ghost'
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === 'asc')
            }>
            Refund Method
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className='text-center font-medium'>
          {row.getValue('refundMethod')}
        </div>
      );
    },
  },
  {
    id: 'actions',
    enableSorting: false,

    cell: ({ row }) => {
      const payment = row.original;
      return (
        <div className='flex justify-center'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <Toast payment={payment} />
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

function Toast({ payment }: { payment: Refund }) {
  // const { toast } = useToast();
  return (
    <DropdownMenuItem
      onClick={(e) => {
        //stop bubbling up to the parent
        e.stopPropagation();
        navigator.clipboard.writeText(payment.id);
        // toast({
        //   title: 'Scheduled: Catch up ',
        //   description: 'Friday, February 10, 2023 at 5:57 PM',
        // });
      }}>
      Copy Refund Link
    </DropdownMenuItem>
  );
}
