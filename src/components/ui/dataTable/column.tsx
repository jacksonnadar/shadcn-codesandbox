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
import EditRefundDialog from '../EditRefundDialog';
import { forwardRef, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '../../lib-ui/sheet';
import { Card, CardContent } from '../../lib-ui/card';
import { Input } from '../../lib-ui/input';
import { Textarea } from '../../lib-ui/textarea';
import { Label } from '../../lib-ui/label';

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

    cell: ({ row, renderValue }) => {
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
                  <EditRefundDialog refund={row.original}>
                    <Button
                      variant='outline'
                      className='w-6 h-6 rounded-full p-0'>
                      <Edit className='h-3 w-3' />
                      <span className='sr-only'>Edit</span>
                    </Button>
                  </EditRefundDialog>
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
    enableColumnFilter: true,
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
      return <ActionButtonWithSheet payment={payment} />;
    },
  },
];

function ActionButtonWithSheet({ payment }: { payment: Refund }) {
  const [open, setOpen] = useState(false);

  return (
    <div className='flex justify-center'>
      <Sheet open={open} onOpenChange={setOpen}>
        {/* <SheetTrigger asChild>
<Button variant="outline">Open</Button>
</SheetTrigger> */}
        <SheetContent className='overflow-auto' position='right' size='lg'>
          <SheetHeader>
            <SheetTitle>User Info Change History</SheetTitle>
            <SheetDescription>
              View all changes made to this user's information.
            </SheetDescription>
          </SheetHeader>
          <div className='px-7 mt-5 relative border-l-2'>
            <div className='absolute -ml-7 rounded-full w-7 h-7 flex justify-center translate-x-[-50%] bg-muted'>
              <p>1</p>
            </div>
            <div className=''>
              <h4>Update By Jackson at 10/12/2023</h4>
              <Card className='bg-background mt-3'>
                <CardContent className='grid grid-cols-2 gap-2 p-4'>
                  <div>
                    <Label htmlFor='name' className='text-left text-primary'>
                      First Name
                    </Label>
                    <Input
                      className='text-primary'
                      placeholder='First Name'
                      defaultValue={payment.firstName}
                      disabled={true}
                    />
                  </div>

                  <div>
                    <Label htmlFor='name' className='text-left text-primary'>
                      Last Name
                    </Label>
                    <Input
                      className='text-primary'
                      placeholder='Last Name'
                      defaultValue={payment.lastName}
                      disabled={true}
                    />
                  </div>

                  <div>
                    <Label htmlFor='name' className='text-left text-primary'>
                      Email
                    </Label>
                    <Input
                      className='text-primary'
                      placeholder='Email'
                      defaultValue={payment.email}
                      disabled={true}
                    />
                  </div>

                  <div>
                    <Label htmlFor='name' className='text-left text-primary'>
                      Phone
                    </Label>
                    <Input
                      className='text-primary'
                      placeholder='Phone'
                      defaultValue={payment.phone}
                      disabled={true}
                    />
                  </div>

                  <div>
                    <Label htmlFor='name' className='text-left text-primary'>
                      Address Line 1
                    </Label>
                    <Input
                      className='text-primary'
                      placeholder='Address'
                      defaultValue={payment.addressLine1}
                      disabled={true}
                    />
                  </div>

                  <div>
                    <Label htmlFor='name' className='text-left text-primary'>
                      Address Line 2
                    </Label>
                    <Input
                      className='text-primary'
                      placeholder='Address'
                      defaultValue={payment.addressLine2}
                      disabled={true}
                    />
                  </div>

                  <div>
                    <Label htmlFor='name' className='text-left text-primary'>
                      City
                    </Label>
                    <Input
                      className='text-primary'
                      placeholder='City'
                      defaultValue={payment.city}
                      disabled={true}
                    />
                  </div>

                  <div>
                    <Label htmlFor='name' className='text-left text-primary'>
                      State
                    </Label>
                    <Input
                      className='text-primary'
                      placeholder='State'
                      defaultValue={payment.state}
                      disabled={true}
                    />
                  </div>

                  <div>
                    <Label htmlFor='name' className='text-left text-primary'>
                      Zip
                    </Label>
                    <Input
                      className='text-primary'
                      placeholder='Zip'
                      defaultValue={payment.zipCode}
                      disabled={true}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className='px-7 pt-5 relative border-l-2'>
            <div className='absolute -ml-7 rounded-full w-7 h-7 flex justify-center translate-x-[-50%] bg-muted'>
              <p>2</p>
            </div>
            <div className=''>
              <h4>Update By Jackson at 10/12/2023</h4>
              <Card className='bg-background mt-3'>
                <CardContent className='grid grid-cols-2 gap-2 p-4'>
                  <div>
                    <Label htmlFor='name' className='text-left text-primary'>
                      First Name
                    </Label>
                    <Input
                      className='text-primary'
                      placeholder='First Name'
                      defaultValue={payment.firstName}
                      disabled={true}
                    />
                  </div>

                  <div>
                    <Label htmlFor='name' className='text-left text-primary'>
                      Last Name
                    </Label>
                    <Input
                      className='text-primary'
                      placeholder='Last Name'
                      defaultValue={payment.lastName}
                      disabled={true}
                    />
                  </div>

                  <div>
                    <Label htmlFor='name' className='text-left text-primary'>
                      Email
                    </Label>
                    <Input
                      className='text-primary'
                      placeholder='Email'
                      defaultValue={payment.email}
                      disabled={true}
                    />
                  </div>

                  <div>
                    <Label htmlFor='name' className='text-left text-primary'>
                      Phone
                    </Label>
                    <Input
                      className='text-primary'
                      placeholder='Phone'
                      defaultValue={payment.phone}
                      disabled={true}
                    />
                  </div>

                  <div>
                    <Label htmlFor='name' className='text-left text-primary'>
                      Address Line 1
                    </Label>
                    <Input
                      className='text-primary'
                      placeholder='Address'
                      defaultValue={payment.addressLine1}
                      disabled={true}
                    />
                  </div>

                  <div>
                    <Label htmlFor='name' className='text-left text-primary'>
                      Address Line 2
                    </Label>
                    <Input
                      className='text-primary'
                      placeholder='Address'
                      defaultValue={payment.addressLine2}
                      disabled={true}
                    />
                  </div>

                  <div>
                    <Label htmlFor='name' className='text-left text-primary'>
                      City
                    </Label>
                    <Input
                      className='text-primary'
                      placeholder='City'
                      defaultValue={payment.city}
                      disabled={true}
                    />
                  </div>

                  <div>
                    <Label htmlFor='name' className='text-left text-primary'>
                      State
                    </Label>
                    <Input
                      className='text-primary'
                      placeholder='State'
                      defaultValue={payment.state}
                      disabled={true}
                    />
                  </div>

                  <div>
                    <Label htmlFor='name' className='text-left text-primary'>
                      Zip
                    </Label>
                    <Input
                      className='text-primary'
                      placeholder='Zip'
                      defaultValue={payment.zipCode}
                      disabled={true}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* <SheetFooter>
            <Button type='submit'>Save changes</Button>
          </SheetFooter> */}
        </SheetContent>
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Info History
          </DropdownMenuItem>
          <DropDownMenuWithToast
            payment={payment}
            title='Copied To Clipboard'
            value='Copy Refund Link'
          />
          <DropdownMenuSeparator />

          <DropDownMenuWithToast
            payment={payment}
            title='Email Sent'
            value='Resend Email'
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function DropDownMenuWithToast({
  payment,
  variant,
  description,
  title,
  value,
}: {
  payment: Refund;
  variant?: 'default' | 'destructive' | null | undefined;
  description?: string;
  title: string;
  value: string;
}) {
  const { toast } = useToast();
  return (
    <DropdownMenuItem
      onClick={(e) => {
        //stop bubbling up to the parent
        e.stopPropagation();
        navigator.clipboard.writeText(payment.id);
        toast({
          variant,
          title,
          description,
        });
      }}>
      {value}
    </DropdownMenuItem>
  );
}
