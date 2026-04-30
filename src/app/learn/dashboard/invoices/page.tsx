import Pagination from '@/app/ui/learn/invoices/pagination';
import Search from '@/app/ui/learn/search';
import Table from '@/app/ui/learn/invoices/table'; // InvoicesTable을 Table이라는 이름으로 가져옴
import { CreateInvoice } from '@/app/ui/learn/invoices/buttons';
import { lusitana } from '@/app/ui/learn/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/learn/skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/learn/data';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Invoices | Acme',
};
 
export default async function Page(props: {
    searchParams?: Promise<{
      query?: string;
      page?: string;
    }>;
  }) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  
  const totalPages = await fetchInvoicesPages(query);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
       <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}