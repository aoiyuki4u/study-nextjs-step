import Form from '@/app/ui/learn/invoices/edit-form';
import Breadcrumbs from '@/app/ui/learn/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/learn/data';
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/learn/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/learn/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}