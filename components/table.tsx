/* eslint-disable react-hooks/incompatible-library */
// @noReactCompiler
"use client"

import { useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { getColumns } from "./table-columns";

const mockdata: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@example.com",
    sentiment: 5
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@example.com",
    sentiment: 0
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@example.com",
    sentiment: -5
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@example.com",
    sentiment: 5
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@example.com",
    sentiment: 0
  },
]

type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string,
  sentiment: number
}

const columns = getColumns()

export default function TableComponent() {

    const [pageIndex, setPageIndex] = useState(0) // current page
    const [pageSize, setPageSize] = useState(1) // rows per page
    const [data, setData] = useState<Payment[]>(mockdata) // current page data
    const [rowCount, setRowCount] = useState(5) // total rows from server
    const [sorting, setSorting] = useState<SortingState>([])

    useEffect(() => {
  const sortedData = [...mockdata]

  if (sorting.length > 0) {
    // For simplicity, handle only first sorting column
    const { id, desc } = sorting[0]
    sortedData.sort((a, b) => {
      const aValue = a[id as keyof Payment]
      const bValue = b[id as keyof Payment]

      // handle numbers vs strings
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return desc ? bValue - aValue : aValue - bValue
      } else {
        return desc 
          ? String(bValue).localeCompare(String(aValue))
          : String(aValue).localeCompare(String(bValue))
      }
    })
  }

  // then slice for manual pagination
  const start = pageIndex * pageSize
  const end = start + pageSize
  setData(sortedData.slice(start, end))
  setRowCount(sortedData.length)
}, [pageIndex, pageSize, sorting])

    
    function handlePageSizeChange(newSize: number) {
        setPageSize(newSize)
        setPageIndex(0) // reset to first page
    }

    const table = useReactTable({
        data,
        columns,
        pageCount: Math.ceil(rowCount / pageSize), // total pages
        onPaginationChange: (updater) => {
            const newPagination = typeof updater === "function" ? updater({ pageIndex, pageSize }) : updater
            setPageIndex(newPagination.pageIndex)
            setPageSize(newPagination.pageSize)
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        manualPagination: true,
        manualSorting: true,
        state: {
            pagination: { pageIndex, pageSize },
            sorting
        }
    })
    return (
        <Card className="py-4 px-6">
            <div className="w-full">
                <div className="flex items-center py-4">
                    <Input
                        placeholder="Filter emails..."
                        value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                        onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
                        className="max-w-sm"
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto cursor-pointer">Columns <ChevronDown /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {
                                table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize cursor-pointer"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        )
                                    })
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="overflow-hidden">                    
                    <Table>
                        <TableHeader >
                            {
                                table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id} className="!bg-transparent !hover:bg-transparent">
                                        {
                                            headerGroup.headers.map((header) => {
                                                return (
                                                    <TableHead key={header.id}>
                                                        {
                                                            header.isPlaceholder
                                                            ? null
                                                            : flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext()
                                                            )
                                                        }
                                                    </TableHead>
                                                )
                                            })
                                        }
                                    </TableRow>
                                ))
                            }
                        </TableHeader>
                        <TableBody>
                            {
                                table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {
                                                row.getVisibleCells().map((cell) => (
                                                    <TableCell key={cell.id}>
                                                        {
                                                            flexRender(
                                                                cell.column.columnDef.cell,
                                                                cell.getContext()
                                                            )
                                                        }
                                                    </TableCell>
                                                ))
                                            }
                                        </TableRow>
                                    ))
                                )
                                : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-24 text-center"
                                        >
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 mt-8 mt-2">
                    <div className="text-foreground flex-1 text-sm">
                        <DropdownMenu>
                            Rows per page: 
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="ml-2 cursor-pointer">
                                    {pageSize} <ChevronDown className="ml-2 h-2 w-2" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {[1, 5, 10, 20, 50].map((size) => (
                                    <DropdownMenuItem
                                        key={size}
                                        onClick={() => handlePageSizeChange(size)}
                                        className="cursor-pointer"
                                    >
                                        {size}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="text-foreground flex-1 text-sm">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s) selected.
                    </div>
                    <div className="space-x-2 bg-transparent">
                        <span className="text-sm mr-4">Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</span>                        
                        <Button
                            variant="outline"
                            size="icon"
                            className="p-1 text-sm rounded-md text-white cursor-pointer"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <ChevronLeft className="w-3 h-3"/>
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="p-1 text-sm rounded-md text-white cursor-pointer"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <ChevronRight className="w-3 h-3"/>
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    )
}