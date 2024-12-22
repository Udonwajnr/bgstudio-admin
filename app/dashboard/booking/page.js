"use client"

import { useState, useEffect } from "react"
import { CalendarDays, Clock, Pencil, Trash2, CheckCircle, Scissors, Brush, Fingerprint, ChevronDown, Search,ShoppingCart } from 'lucide-react'
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
import { Phone, Mail, Paperclip, Plus } from 'lucide-react'
import Link from "next/link"
import api from "@/app/axios/axiosConfig"
import { toast } from "sonner"

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
  const [bookings, setBookings] = useState([])
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get('https://bgstudiobackend-1.onrender.com/api/salon')
        .then((response)=>{
          setBookings(response.data)          
        })
      } catch (error) {
        console.error('Error fetching bookings:', error)
      }
    }

    fetchBookings()
  }, [])

  
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
        variant={
          row.getValue("status") === "Completed"
            ? "default"
            : row.getValue("status") === "Cancelled"
            ? "destructive"
            : "secondary"
        }
        className={
          row.getValue("status") === "Completed"
            ? "bg-green-100 text-green-800"
            : row.getValue("status") === "Cancelled"
            ? "bg-red-100 text-red-800"
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
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                <Link href={`/dashboard/booking/${booking._id}`}>
                  View Booking
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleComplete(booking._id)}
                disabled={booking.status === "Completed"}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark as Completed
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleCancelled(booking._id)}
                disabled={booking.status === "Cancelled"}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark as Cancelled
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                <Link href={`/dashboard/booking/${booking._id}/edit`}>
                  Update Booking
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleDelete(booking._id)}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <Link href={`/dashboard/booking/${booking._id}/delete`}>
                   Delete Booking
                </Link>
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

  const handleComplete = async (id) => {
    try {
      // Send API request to update the status
      await api.patch(`https://bgstudiobackend-1.onrender.com/api/salon/${id}/status`, {
        status: "Completed",
      });
  
      toast.success("Booking status updated")
      // Update the local state only after the API request succeeds
      setBookings(
        bookings.map((booking) =>
          booking._id === id ? { ...booking, status: "Completed" } : booking
        )
      );
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  const handleCancelled = async (id) => {
    try {
      // Send API request to update the status
      await api.patch(`https://bgstudiobackend-1.onrender.com/api/salon/${id}/status`, {
        status: "Cancelled",
      });
  
      // Update the local state only after the API request succeeds
      setBookings(
        bookings.map((booking) =>
          booking._id === id ? { ...booking, status: "Cancelled" } : booking
        )
      )
      toast.success("Booking status updated")
      
      ;
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  const handleDelete = (id) => {
    setBookings(bookings.filter((booking) => booking._id !== id))
  }

  const handleUpdate = (id) => {
    console.log(`Update booking ${id}`)
  }

  const handleDeleteSelected = async () => {
    // Map rowSelection keys (indices) to booking _id values
    const selectedIds = Object.keys(rowSelection).map((index) => bookings[Number(index)]._id);
  
    if (selectedIds.length === 0) {
      return; // No IDs selected 
    }

    console.log(selectedIds)
  
    try {
      // API call to delete selected bookings
      const response = await api.post('https://bgstudiobackend-1.onrender.com/api/salon/delete-multiple-bookings', {
        ids: selectedIds,
      });
  
      if (response.status === 200) {
        // Update state by filtering out deleted bookings
        setBookings(bookings.filter((booking) => !selectedIds.includes(booking._id)));
        setRowSelection({});
        toast.success(response.data.message)
      } else {
        console.error('Error deleting bookings:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting bookings:', error);
    }
  };
  
  return (
    <div className="relative">
      <Card className="shadow-lg">
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
        <CardContent >
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
    </div>
  )
}

