"use client"

import React, { useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon, ChevronDown, ChevronUp, Download, Search } from 'lucide-react'
import HairOrder from '@/app/components/hair/HairOrders'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import api from '@/app/axios/axiosConfig'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const orders = [
  {
    id: "ORD001",
    customer: "Alice Johnson",
    date: "2023-06-01",
    total: 125.99,
    status: "Delivered",
    items: [
      { name: "Organic Eggs (Dozen)", quantity: 2, price: 5.99 },
      { name: "Free-Range Chicken Eggs (18-pack)", quantity: 1, price: 8.99 },
    ]
  },
  {
    id: "ORD002",
    customer: "Bob Smith",
    date: "2023-06-02",
    total: 87.50,
    status: "Processing",
    items: [
      { name: "Quail Eggs (24-pack)", quantity: 1, price: 12.99 },
      { name: "Duck Eggs (6-pack)", quantity: 2, price: 7.99 },
    ]
  },
  {
    id: "ORD003",
    customer: "Carol White",
    date: "2023-06-03",
    total: 45.97,
    status: "Shipped",
    items: [
      { name: "Organic Eggs (Dozen)", quantity: 3, price: 5.99 },
      { name: "Egg Cartons (Pack of 10)", quantity: 1, price: 3.99 },
    ]
  },
]

export default function OrderPage() {
  const [date, setDate] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(orders[0])

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Order Management</h1>
      <Tabs defaultValue='Hair' className="space-y-4">
        <TabsList>
            <TabsTrigger value="Hair">Hair</TabsTrigger>
          <TabsTrigger value="Poultry">Poultry</TabsTrigger>
          </TabsList>
            <TabsContent value="Hair" className="space-y-4">
              <HairOrder/>
            </TabsContent>
            
            <TabsContent value="Poultry" className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex space-x-2">
                  <Input 
                    placeholder="Search orders..." 
                    className="w-[300px]"
                  />
                  <Button variant="secondary">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-[200px] justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Select>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
                <Card className="w-full lg:w-2/3">
                  <CardHeader>
                    <CardTitle>Poultry Order List</CardTitle>
                    <CardDescription>Manage and view all customer orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedOrder(order)}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>${order.total.toFixed(2)}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold
                                ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                                  order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-blue-100 text-blue-800'}`}>
                                {order.status}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">Previous</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </CardFooter>
                </Card>

                <Card className="w-full lg:w-1/3">
                  <CardHeader>
                    <CardTitle>Order Details</CardTitle>
                    <CardDescription>Detailed view of the selected order</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold">Order ID: {selectedOrder.id}</h3>
                        <p className="text-sm text-muted-foreground">Customer: {selectedOrder.customer}</p>
                        <p className="text-sm text-muted-foreground">Date: {selectedOrder.date}</p>
                        <p className="text-sm text-muted-foreground">Status: {selectedOrder.status}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Items:</h4>
                        <ul className="space-y-2">
                          {selectedOrder.items.map((item, index) => (
                            <li key={index} className="flex justify-between text-sm">
                              <span>{item.name} (x{item.quantity})</span>
                              <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>${selectedOrder.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Update Order Status</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

      </Tabs>

    </div>
  )
}