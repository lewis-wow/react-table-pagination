import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationOptions,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';

export type TableProps<TDataPiece extends Record<string, string | number>> = {
  data: TDataPiece[];
  columns: ColumnDef<TDataPiece>[];
  pagination: PaginationState;
  paginationOptions: Pick<PaginationOptions, 'onPaginationChange' | 'rowCount'>;
};

export default function Table<TDataPiece extends Record<string, string | number>>({
  data,
  columns,
  pagination,
  paginationOptions,
}: TableProps<TDataPiece>) {
  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    ...paginationOptions,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center gap-2 my-2">
        <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
          {'<<'}
        </button>
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          {'<'}
        </button>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          {'>'}
        </button>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>
      </div>
    </div>
  );
}
