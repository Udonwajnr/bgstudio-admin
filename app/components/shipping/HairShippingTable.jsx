'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon, Search, MoreHorizontal, Edit, Check, Truck, X, Eye } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import api from '@/app/axios/axiosConfig'
import {toast} from "sonner"

export default function HairShippingTable({ data }) {
  
  const [shippingData, setShippingData] = useState(data);
  const [filters, setFilters] = useState({
    customerName: '',
    status: '',
    startDate: null,
    endDate: null,
  })

  const filteredData = shippingData.filter((item) => {
    return (
      item.customerName.toLowerCase().includes(filters.customerName.toLowerCase()) &&
      (filters.status === '' || item.status === filters.status) &&
      (!filters.startDate || new Date(item.shippingDate) >= filters.startDate) &&
      (!filters.endDate || new Date(item.shippingDate) <= filters.endDate)
    )
  })

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleStatusChange = async (id, newStatus) => {
    try {
      // Send API request to update the status
      await api.patch(`https://bgstudiobackend-1.onrender.com/api/hair-shipping/shipping/${id}/status`, {
        status: newStatus,
      });

      // Update the local state immediately
      setShippingData((prevData) =>
        prevData.map((item) =>
          item._id === id ? { ...item, status: newStatus } : item
        )
      );

      toast.success("Shipping status updated");
    } catch (error) {
      console.error("Error updating shipping status:", error);
      toast.error("Failed to update shipping status");
    }
  };

  // const handleCancelled = async (id) => {
  //   try {
  //     // Send API request to update the status
  //     await api.patch(`https://bgstudiobackend-1.onrender.com/api/salon/${id}/status`, {
  //       status: "Cancelled",
  //     });
  // 
  //     // Update the local state only after the API request succeeds
  //     setBookings(
  //       bookings.map((booking) =>
  //         booking._id === id ? { ...booking, status: "Cancelled" } : booking
  //       )
  //     )
  //     toast.success("Booking status updated")
  //     
  //     ;
  //   } catch (error) {
  //     console.error("Error updating booking status:", error);
  //   }
  // };

  // const handleEdit = (id) => {
  //   // Implement edit functionality
  //   console.log(`Edit item with id: ${id}`)
  // }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardContent className="py-4">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Filter by Customer Name"
                value={filters.customerName}
                onChange={(e) => handleFilterChange('customerName', e.target.value)}
                className="pl-8"
              />
            </div>
            <Select
              value={filters.status}
              onValueChange={(value) => handleFilterChange('status', value)}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem value="">All Statuses</SelectItem> */}
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
                <SelectItem value="Out for Delivery">Out for Delivery</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full sm:w-[200px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.startDate ? format(filters.startDate, 'PPP') : <span>Start Date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.startDate}
                  onSelect={(date) => handleFilterChange('startDate', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full sm:w-[200px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.endDate ? format(filters.endDate, 'PPP') : <span>End Date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.endDate}
                  onSelect={(date) => handleFilterChange('endDate', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="mt-6 rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Customer Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Shipping Date</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead className="text-right">Tracking Number</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shippingData.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">{item.customerName}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      item.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      item.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      item.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell>{format(new Date(item.shippingDate), 'PP')}</TableCell>
                  <TableCell>{format(new Date(item.deliveryDate), 'PP')}</TableCell>
                  <TableCell className="text-right">{item.trackingNumber}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {/* <DropdownMenuItem onClick={() => handleEdit(item._id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem> */}
                        <DropdownMenuItem>
                          <Link href={`/dashboard/shipping/hair-shipping/${item._id}`} className="flex gap-x-2 items-center">
                            <Eye className="mr-2 h-4 w-4 " />
                            View
                          </Link> 
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleStatusChange(item._id, 'Delivered')}
                         disabled={item.status === "Delivered"}  
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Mark as Delivered
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(item._id, 'Shipped')}
                         disabled={item.status === "Shipped"}
                        >
                          <Truck className="mr-2 h-4 w-4" />
                          Mark as Shipped
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(item._id, 'Cancelled')}
                         disabled={item.status === "Cancelled"}  
                        >
                          <X className="mr-2 h-4 w-4" />
                          Mark as Cancelled
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

