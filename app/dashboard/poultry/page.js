"use client"

import React, { useState } from 'react'
import { BarChart3,Download,ShoppingCart, TrendingUp, Clock, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle,CardDescription,CardFooter} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import EggProductTable from '@/app/components/EggProductTable'
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { format } from 'date-fns'
import { Calendar } from "@/components/ui/calendar"
import PoultryInventory from '@/app/components/poultry/PoultryInventory'
import { 
  Package, 
  Search, 
  Edit, 
  CalendarIcon,
  Trash2, 
  ArrowUpDown,
  AlertTriangle,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
const salesDataEggs = [
  { name: 'Jan', organic: 3000, freeRange: 1500, cageFree: 1000 },
  { name: 'Feb', organic: 2500, freeRange: 1200, cageFree: 800 },
  { name: 'Mar', organic: 3200, freeRange: 1400, cageFree: 900 },
  { name: 'Apr', organic: 2900, freeRange: 1600, cageFree: 1100 },
  { name: 'May', organic: 3400, freeRange: 1700, cageFree: 1300 },
  { name: 'Jun', organic: 3100, freeRange: 1900, cageFree: 1500 },
]

const recentActivityEggs = [
  { id: 1, action: "New order placed", product: "Organic Eggs", time: "5 minutes ago" },
  { id: 2, action: "Stock updated", product: "Free Range Eggs", time: "10 minutes ago" },
  { id: 3, action: "Order shipped", product: "Cage Free Eggs", time: "1 hour ago" },
]

const lowStockEggProducts = [
  { id: 1, name: "Organic Eggs", stock: 10 },
  { id: 2, name: "Free Range Eggs", stock: 5 },
  { id: 3, name: "Cage Free Eggs", stock: 3 },
]

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


export default function EggSalesDashboard() {
  const [timeFilter, setTimeFilter] = useState('today')
  const [date, setDate] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(orders[0])

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 overflow-hidden">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Poultry Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>Download Poultry Sales Report</Button>
        </div>
      </div>
      <Tabs defaultValue="Overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="Overview">Overview</TabsTrigger>
          <TabsTrigger value="Inventory">Inventory</TabsTrigger>
          <TabsTrigger value="Orders">Orders</TabsTrigger>
        </TabsList>
        
        <TabsContent value="Overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Egg Orders</CardTitle>
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+22% from last {timeFilter}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">56</div>
                <p className="text-xs text-muted-foreground">-5% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$9,876.54</div>
                <p className="text-xs text-muted-foreground">
                  Organic: $5,000 | Free Range: $3,000 | Cage Free: $1,876
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Best Selling Products</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="text-sm font-medium">1. Organic Eggs</p>
                  <p className="text-sm font-medium">2. Free Range Eggs</p>
                  <p className="text-sm font-medium">3. Cage Free Eggs</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Egg Sales Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={salesDataEggs}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="organic" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="freeRange" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="cageFree" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {recentActivityEggs.map((activity) => (
                    <div key={activity.id} className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.product} - {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
     
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Low Stock Egg Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {lowStockEggProducts.map((product) => (
                    <div key={product.id} className="flex items-center">
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{product.name}</p>
                        <p className="text-sm text-muted-foreground">Stock: {product.stock} dozen</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Button className="w-full">
                  <Link href="/dashboard/eggs/create" className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" /> Add New Egg Product
                  </Link>
                </Button>
                <Button className="w-full" >
                  <Link href="/dashboard/eggs/inventory" className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" /> View Egg Inventory
                  </Link>
                </Button>
                <Button className="w-full" variant="outline">
                  Generate Egg Sales Report
                </Button>
              </CardContent>
            </Card>
          </div>
          <EggProductTable />
        </TabsContent>

        <TabsContent value='Inventory' className='space-y-4'>
                  <PoultryInventory/>
        </TabsContent>

        <TabsContent value="Orders" className="space-y-4">
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