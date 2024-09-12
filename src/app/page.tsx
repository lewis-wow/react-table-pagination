'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { pageSize, Person, ResponseData } from './api/users/route';
import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import Table from './components/Table';
import { useQueryState, parseAsInteger } from 'nuqs';

export default function Home() {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(0));

  const paginationState = { pageIndex: page, pageSize: pageSize };

  const peronsQuery = useQuery<ResponseData>({
    queryKey: ['users', page],
    queryFn: () => fetch(`http://localhost:3000/api/users?page=${page}`).then((response) => response.json()),
    placeholderData: keepPreviousData,
  });

  const columns: ColumnDef<Person>[] = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: () => <span>ID</span>,
      },
      {
        accessorKey: 'firstName',
        header: () => <span>First Name</span>,
      },
      {
        accessorKey: 'lastName',
        header: () => <span>Last Name</span>,
      },
      {
        accessorKey: 'age',
        header: () => 'Age',
      },
    ],
    []
  );

  if (peronsQuery.isLoading) return <p>Loading...</p>;
  if (peronsQuery.error) return <p>Error...</p>;

  return (
    <Table
      columns={columns}
      data={peronsQuery.data!.data}
      pagination={paginationState}
      paginationOptions={{
        rowCount: peronsQuery.data!.rowCount,
        onPaginationChange: (pagination) => {
          const nextPaginationState = typeof pagination === 'function' ? pagination(paginationState) : pagination;

          setPage(nextPaginationState.pageIndex);
        },
      }}
    />
  );
}
