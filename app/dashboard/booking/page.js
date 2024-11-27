"use client"

import { useState } from "react"
import { CalendarDays, Clock, Pencil, Trash2, CheckCircle, Scissors, Brush, Fingerprint, ChevronDown, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table"
import { Phone, Mail, Paperclip,Plus } from 'lucide-react'
import Link from "next/link"
const initialBookings = [
  {
    id: 1,
    clientName: "Alice Johnson",
    service: "Haircut",
    dateTime: "2023-06-15T10:00",
    status: "Pending",
    phoneNumber: "+1(555)123-4567",
    email: "alice@example.com",
  },
  {
    id: 2,
    clientName: "Bob Smith",
    service: "Nail Manicure",
    dateTime: "2023-06-15T11:30",
    status: "Pending",
    phoneNumber: "+1 (555) 234-5678",
    email: "bob@example.com",
  },
  {
    id: 3,
    clientName: "Carol Williams",
    service: "Hair Braiding",
    dateTime: "2023-06-15T14:00",
    status: "Completed",
    phoneNumber: "+1 (555) 345-6789",
    email: "carol@example.com",
  },
  {
    id: 4,
    clientName: "David Brown",
    service: "Haircut",
    dateTime: "2023-06-16T09:30",
    status: "Pending",
    phoneNumber: "+1 (555) 456-7890",
    email: "david@example.com",
  },
  {
    id: 5,
    clientName: "Eva Davis",
    service: "Nail Pedicure",
    dateTime: "2023-06-16T13:00",
    status: "Pending",
    phoneNumber: "+1 (555) 567-8901",
    email: "eva@example.com",
  },
]


const getServiceIcon = (service) => {
  switch (service.toLowerCase()) {
    case 'haircut':
    case 'hair braiding':
      return <Scissors className="mr-2 h-4 w-4" />
    case 'nail manicure':
    case 'nail pedicure':
      return <Fingerprint className="mr-2 h-4 w-4" />
    default:
      return <Brush className="mr-2 h-4 w-4" />
  }
}

export default function BookingTable() {
  const [bookings, setBookings] = useState(initialBookings)
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "clientName",
      header: "Client Name",
      cell: ({ row }) => <div className="font-medium">{row.getValue("clientName")}</div>,
    },
    {
      accessorKey: "service",
      header: "Service",
      cell: ({ row }) => (
        <div className="flex items-center">
          {getServiceIcon(row.getValue("service"))}
          <span>{row.getValue("service")}</span>
        </div>
      ),
    },
    {
      accessorKey: "dateTime",
      header: "Date & Time",
      cell: ({ row }) => {
        const date = new Date(row.getValue("dateTime"))
        return (
          <div className="flex flex-col">
            <div className="flex items-center text-sm text-muted-foreground" suppressHydrationWarning>
              <CalendarDays className="mr-2 h-4 w-4" />
              {date.toLocaleDateString()}
            </div>
            <div className="flex items-center text-sm text-muted-foreground mt-1" suppressHydrationWarning>
              <Clock className="mr-2 h-4 w-4" />
              {date.toLocaleTimeString()}
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
      cell: ({ row }) => (
        <div className="flex items-center">
          <Phone className="mr-2 h-4 w-4" />
          <span>{row.getValue("phoneNumber")}</span>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="flex items-center">
          <Mail className="mr-2 h-4 w-4" />
          <span>{row.getValue("email")}</span>
        </div>
      ),
    },  
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant={row.getValue("status") === "Completed" ? "default" : "secondary"}
          className={
            row.getValue("status") === "Completed"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }
        >
          {row.getValue("status")}
        </Badge>
      ),
    }, 
    {
      id: "actions",
      cell: ({ row }) => {
        const booking = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => handleComplete(booking.id)}
                disabled={booking.status === "Completed"}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark as Completed
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleUpdate(booking.id)}>
                <Pencil className="mr-2 h-4 w-4" />
                <Link href={"/dashboard/booking/test/edit"}>
                  Update Booking
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleDelete(booking.id)}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Booking
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    }, 
  ]

  const table = useReactTable({
    data: bookings,
    columns,
    state: {
      rowSelection,
      globalFilter,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
  })

  const handleComplete = (id) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status: "Completed" } : booking
      )
    )
  }

  const handleDelete = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id))
  }

  const handleUpdate = (id) => {
    console.log(`Update booking ${id}`)
  }

  const handleDeleteSelected = () => {
    const selectedIds = Object.keys(rowSelection).map(Number)
    setBookings(bookings.filter((booking) => !selectedIds.includes(booking.id)))
    setRowSelection({})
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Latest Booked Sessions</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search bookings..."
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="pl-8"
            />
          </div>
          <Button
            onClick={handleDeleteSelected}
            disabled={Object.keys(rowSelection).length === 0}
            variant="destructive"
            size="sm"
          >
            Delete Selected
          </Button>

          <Link href="/dashboard/booking/create">
            <Button>
              <Plus/>
              Add Booking
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-muted/50 ">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th key={header.id} className="py-3 px-4 text-left font-medium text-muted-foreground">
                          {header.isPlaceholder
                            ? null 
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        className="border-b transition-colors hover:bg-muted/50 w-full data-[state=selected]:bg-muted "
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="py-3 px-4">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={columns.length} className="h-24 text-center">
                        No results.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}