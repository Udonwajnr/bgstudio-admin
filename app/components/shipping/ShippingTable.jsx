'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'

export default function ShippingTable({ data }) {
  const [filters, setFilters] = useState({
    customerName: '',
    status: '',
    startDate: null,
    endDate: null,
  })

  const filteredData = data.filter((item) => {
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

  return (
    <div>
      <div className="mb-4 flex space-x-2">
        <Input
          placeholder="Filter by Customer Name"
          value={filters.customerName}
          onChange={(e) => handleFilterChange('customerName', e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Out for Delivery">Out for Delivery</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              {filters.startDate ? format(filters.startDate, 'PPP') : 'Pick start date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
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
            <Button variant="outline">
              {filters.endDate ? format(filters.endDate, 'PPP') : 'Pick end date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={filters.endDate}
              onSelect={(date) => handleFilterChange('endDate', date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Shipping Date</TableHead>
            <TableHead>Delivery Date</TableHead>
            <TableHead>Tracking Number</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.customerName}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{new Date(item.shippingDate).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(item.deliveryDate).toLocaleDateString()}</TableCell>
              <TableCell>{item.trackingNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

