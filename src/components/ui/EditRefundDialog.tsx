import { forwardRef, useState } from 'react';
import { Button } from '../lib-ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../lib-ui/dialog';
import { Input } from '../lib-ui/input';
import { Label } from '../lib-ui/label';
import { faker } from '@faker-js/faker';

const inputs: { name: string; label: string; type: string }[] = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'tel',
  },
  {
    name: 'addressLine1',
    label: 'Address Line 1',
    type: 'text',
  },
  {
    name: 'addressLine2',
    label: 'Address Line 2',
    type: 'text',
  },
  {
    name: 'city',
    label: 'City',
    type: 'text',
  },
  {
    name: 'state',
    label: 'State',
    type: 'text',
  },
  {
    name: 'zipCode',
    label: 'Zip',
    type: 'text',
  },
];

const EditRefundDialog = forwardRef(({ children, refund }: any, ref: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValues, setInputValues] = useState({
    firstName: refund.firstName,
    lastName: refund.lastName,
    email: refund.email,
    phone: refund.phone,
    addressLine1: refund.addressLine1,
    addressLine2: refund.addressLine2,
    city: refund.city,
    state: refund.state,
    zipCode: refund.zipCode,
  } as any);
  const onInputChange = (e: any) => {
    const { name, value } = e.target;
    setInputValues((prev: any) => ({ ...prev, [name]: value }));
  };
  return (
    <span ref={ref}>
      <Dialog
        open={isModalOpen}
        onOpenChange={(open) =>
          open !== isModalOpen ? setIsModalOpen(open) : null
        }>
        <DialogTrigger onClick={() => setIsModalOpen(true)} asChild>
          {children}
        </DialogTrigger>
        <DialogContent className='sm:max-w-[60vw]'>
          <form>
            <DialogHeader>
              <DialogTitle>Edit Refund</DialogTitle>
              <DialogDescription>
                Make changes to the refund here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className='grid grid-cols-2 gap-4 py-4'>
              {inputs.map((input) => (
                <InputWithLabel
                  key={input.name}
                  name={input.name}
                  label={input.label}
                  type={input.type}
                  value={inputValues[input.name] ?? ''}
                  onInputChange={onInputChange}
                />
              ))}
            </div>
            <DialogFooter>
              <Button onClick={() => setIsModalOpen(false)}>
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </span>
  );
});

export default EditRefundDialog;

const InputWithLabel = ({
  name,
  label,
  type = 'text',
  value,
  onInputChange,
}: any) => (
  <div key={name} className='grid grid-cols-1 items-start justify-start gap-4'>
    <Label htmlFor='name' className='text-left'>
      {label}
    </Label>
    <Input
      name={name}
      type={type}
      value={value}
      onChange={onInputChange}
      className='w-full'
    />
  </div>
);
