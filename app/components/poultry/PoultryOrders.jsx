"use client";

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Download, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import api from '@/app/axios/axiosConfig';
import Link from 'next/link';
import { buttonVariants } from "@/components/ui/button"


export default function PoultryOrder() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [date, setDate] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Set items per page

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const response = await api.get('https://bgstudiobackend-1.onrender.com/api/poultry-order');
      setOrders(response.data);
      setFilteredOrders(response.data); // Initialize with all orders
      if (!selectedOrder && response.data.length > 0) {
        setSelectedOrder(response.data[0]);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  // Filter orders based on user inputs
  const applyFilters = () => {
    let filtered = orders;

    if (date) {
      const selectedDate = format(date, "yyyy-MM-dd");
      filtered = filtered.filter(order => format(new Date(order.date), "yyyy-MM-dd") === selectedDate);
    }

    if (statusFilter && statusFilter !== "All") {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
    setCurrentPage(1); // Reset to first page after applying filters
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [date, statusFilter, searchTerm]);

  // Paginate orders
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto py-10">
      <Tabs defaultValue="Hair" className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Search orders..."
              className="w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="secondary" onClick={applyFilters}>
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
            <Select onValueChange={(value) => setStatusFilter(value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
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
              <CardTitle>Hair Orders</CardTitle>
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
                  {paginatedOrders.map((order) => (
                    <TableRow
                      key={order.orderId}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <TableCell>{order.orderId}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{format(new Date(order.date), "PPP")}</TableCell>
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
                        <Link href={`/dashboard/orders/hair-order/${order._id}`}>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredOrders.length / itemsPerPage)))}
                disabled={currentPage === Math.ceil(filteredOrders.length / itemsPerPage)}
              >
                Next
              </Button>
            </CardFooter>
          </Card>

          <Card className="w-full lg:w-1/3">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
              <CardDescription>Detailed view of the selected order</CardDescription>
            </CardHeader>
            {selectedOrder ? (
              <>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Order ID: {selectedOrder.orderId}</h3>
                    <p className="text-sm text-muted-foreground">Customer: {selectedOrder.customer}</p>
                    <p className="text-sm text-muted-foreground">Date: {format(new Date(selectedOrder.date), "PPP")}</p>
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
                {/* <Button className="w-full">Update Order Status</Button> */}
                <Link 
                  href={`/dashboard/orders/hair-order/${selectedOrder._id}/edit`} 
                  className={`${buttonVariants({ variant: "default" })} w-full`}
                >
                  Update Order Status
                </Link>
              </CardFooter>
              </>

              
            ) : (
              <CardContent>
                <p>No order selected</p>
              </CardContent>
            )}
          </Card>
        </div>
      </Tabs>
    </div>
  );
}
