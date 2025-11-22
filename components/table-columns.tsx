"use client"

import { ArrowDown, ArrowUp, ArrowUpDown, Frown, Meh, MoreHorizontal, Smile } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"

type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

    export const sentiments = [
      {
        label: "Positive",
        value: 5,
        icon: Smile,
        color: "hsl(var(--chart-positive))"
      },
      {
        label: "Neutral",
        value: 0,
        icon: Meh,
        color: "hsl(var(--chart-neutral))"
      },
      {
        label: "Negative",
        value: -5,
        icon: Frown,
        color: "hsl(var(--chart-negative))"
      }
    ]

export function getColumns(): ColumnDef<Payment>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
          aria-label="Select all"
          className="cursor-pointer"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
          aria-label="Select row"
          className="cursor-pointer"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <div className="capitalize">{row.getValue("status")}</div>,
    },

    {
      accessorKey: "email",
      header: ({ column }) => {
        const sort = column.getIsSorted()
        return (
          <Button
            variant={null}
            onClick={() => column.toggleSorting(sort === "asc")}
            className="cursor-pointer"
          >
            Email
            {sort === "asc" && <ArrowUp className="ml-1 w-3 h-3" />}
            {sort === "desc" && <ArrowDown className="ml-1 w-3 h-3" />}
            {!sort && <ArrowUpDown className="ml-1 w-3 h-3" />}
          </Button>
        )
      },
      cell: ({ row }) => <div className="ml-2 lowercase">{row.getValue("email")}</div>
    },
    {
      accessorKey: "amount",
      header: ({ column }) => {
        const sort = column.getIsSorted()
        return (
          <Button
            variant={null}
            onClick={() => column.toggleSorting(sort === "asc")}
            className="cursor-pointer"
          >
            Amount
            {sort === "asc" && <ArrowUp className="ml-1 w-3 h-3" />}
            {sort === "desc" && <ArrowDown className="ml-1 w-3 h-3" />}
            {!sort && <ArrowUpDown className="ml-1 w-3 h-3" />}
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)

        return <div className="ml-2 font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "sentiment",
      header: ({ column }) => {
        const sort = column.getIsSorted()
        return (
          <Button
            variant={null}
            onClick={() => column.toggleSorting(sort === "asc")}
            className="cursor-pointer"
          >
            Sentiment
            {sort === "asc" && <ArrowUp className="ml-1 w-3 h-3" />}
            {sort === "desc" && <ArrowDown className="ml-1 w-3 h-3" />}
            {!sort && <ArrowUpDown className="ml-1 w-3 h-3" />}
          </Button>
        )
      },
      cell: ({ row }) => {
        const sentiment = sentiments.find((sentiment) => sentiment.value === row.getValue("sentiment"))
        if (!sentiment) {return null}
        return (
          <div className="flex items-center">
            {
              sentiment.icon && (
                <sentiment.icon className={`mr-2 h-4 w-4 text-muted-foreground`} style={{ color: sentiment.color }}/>
              )
            }
          </div>
        )
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy payment ID
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}
