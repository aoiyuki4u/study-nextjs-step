import Form from '@/app/ui/learn/invoices/create-form';
import Breadcrumbs from '@/app/ui/learn/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/learn/data';
 
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/learn/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/learn/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}