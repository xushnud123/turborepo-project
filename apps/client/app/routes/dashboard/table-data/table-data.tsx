"use client";

import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, type ColDef } from "ag-grid-community";
import { trpc } from "utils/trpc";

const modules = [AllCommunityModule];

type Product = {
  id: string;
  createdAt: Date;
  title: string;
  description: string | null;
  price: number;
  updatedAt: Date;
  userId: string;
};

export default function ProductsTablePage() {
  const { data = [] } = trpc.products.getAll.useQuery();

  const columnDefs = useMemo<ColDef<Product>[]>(
    () => [
      { field: "title", headerName: "Title", minWidth: 180 },
      { field: "description", headerName: "Description", minWidth: 220 },
      { field: "price", headerName: "Price", minWidth: 140 },
      { field: "userId", headerName: "User ID", minWidth: 240 },
      {
        field: "createdAt",
        headerName: "Created At",
        minWidth: 190,
        valueFormatter: (p) => new Date(p.value).toLocaleString("uz-UZ"),
      },
      {
        field: "updatedAt",
        headerName: "Updated At",
        minWidth: 190,
        valueFormatter: (p) => new Date(p.value).toLocaleString("uz-UZ"),
      },
      {
        field: "id",
        headerName: "Action",
        minWidth: 140,
        sortable: false,
        filter: false,
        cellRenderer: () => (
          <button className="rounded-lg bg-red-600 px-3 text-white">
            Delete
          </button>
        ),
      },
    ],
    [],
  );

  return (
    <div className="ag-theme-quartz h-140 w-full rounded-xl ">
      <AgGridReact<Product>
        modules={modules}
        rowData={data as []}
        columnDefs={columnDefs}
        pagination
        paginationPageSize={10}
      />
    </div>
  );
}
