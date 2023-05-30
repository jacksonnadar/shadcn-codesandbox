import { faker } from '@faker-js/faker';
import { columns } from './dataTable/column';
import { DataTable } from './dataTable/data-table';
import moment, { Moment } from 'moment';

export type Status =
  | 'Pending'
  | 'Pending-sent'
  | 'ACH-sent'
  | 'Completed'
  | 'Ach-returned';

export type RefundMethod = 'ACH' | 'Check' | 'GiftCard' | 'Donation';

export interface Refund {
  id: string;
  status: Status;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  state: string;
  city: string;
  zipCode: string;
  refundMethod: RefundMethod;
  refundAmount: number;
  refundDate: Moment;
  claimedDate: Moment;
}
const statuses: Status[] = [
  'Pending',
  'Pending-sent',
  'ACH-sent',
  'Completed',
  'Ach-returned',
];

const refundMethods: RefundMethod[] = ['ACH', 'Check', 'GiftCard', 'Donation'];

const data: Refund[] = [];

for (let i = 0; i < 10; i++) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email(firstName, lastName);

  data.push({
    id: faker.string.uuid(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    email,
    firstName,
    lastName,
    phone: faker.phone.number(),
    addressLine1: faker.location.streetAddress(),
    addressLine2: faker.location.secondaryAddress(),
    state: faker.location.state(),
    city: faker.location.city(),
    zipCode: faker.location.zipCode(),
    refundMethod:
      refundMethods[Math.floor(Math.random() * refundMethods.length)],
    refundAmount: +faker.finance.amount(),
    refundDate: moment(faker.date.past()),
    claimedDate: moment(faker.date.past()),
  });
}

export default function Transactions() {
  return (
    <div className='container mx-auto py-10 min-w-full'>
      <DataTable columns={columns as any} data={data} />
    </div>
  );
}
