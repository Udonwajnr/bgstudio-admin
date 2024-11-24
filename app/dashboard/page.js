"use client"
import React, { useState } from 'react'
import { BarChart3, Package, ShoppingCart, AlertTriangle, TrendingUp, Clock, Plus } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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

const salesData = [
  { name: 'Jan', hair: 4000, poultry: 2400 },
  { name: 'Feb', hair: 3000, poultry: 1398 },
  { name: 'Mar', hair: 2000, poultry: 9800 },
  { name: 'Apr', hair: 2780, poultry: 3908 },
  { name: 'May', hair: 1890, poultry: 4800 },
  { name: 'Jun', hair: 2390, poultry: 3800 },
  { name: 'July', hair: 2390, poultry: 3800 },
  { name: 'Aug', hair: 2390, poultry: 3800 },
  { name: 'Sep', hair: 2390, poultry: 3800 },
  { name: 'Oct', hair: 2390, poultry: 3800 },
  { name: 'Nov', hair: 2390, poultry: 3800 },
  { name: 'Dec', hair: 2390, poultry: 3800 },
]

const recentActivity = [
  { id: 1, action: "New order placed", product: "Shampoo", time: "5 minutes ago" },
  { id: 2, action: "Stock updated", product: "Chicken Wings", time: "10 minutes ago" },
  { id: 3, action: "Order shipped", product: "Hair Gel", time: "1 hour ago" },
]

const lowStockProducts = [
  { id: 1, name: "Conditioner", category: "Hair", stock: 5 },
  { id: 2, name: "Eggs", category: "Poultry", stock: 20 },
  { id: 3, name: "Hair Spray", category: "Hair", stock: 8 },
]

export default function Dashboard() {
  const [timeFilter, setTimeFilter] = useState('today')

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>Download Report</Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {/* <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger> */}
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
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
                <p className="text-xs text-muted-foreground">+20.1% from last {timeFilter}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">123</div>
                <p className="text-xs text-muted-foreground">-5% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  Hair: $30,000 | Poultry: $15,231.89
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
                  <p className="text-sm font-medium">1. Shampoo (Hair)</p>
                  <p className="text-sm font-medium">2. Chicken Breast (Poultry)</p>
                  <p className="text-sm font-medium">3. Hair Gel (Hair)</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="hair" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="poultry" stroke="#82ca9d" />
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
                  {recentActivity.map((activity) => (
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
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Products</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">#12345</TableCell>
                      <TableCell>John Smith</TableCell>
                      <TableCell>Hair Gel, Shampoo</TableCell>
                      <TableCell>$45.99</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Completed
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">#12346</TableCell>
                      <TableCell>Jane Doe</TableCell>
                      <TableCell>Chicken Breast, Eggs</TableCell>
                      <TableCell>$32.50</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                          Pending
                        </span>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Low Stock Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {lowStockProducts.map((product) => (
                    <div key={product.id} className="flex items-center">
                      <AlertTriangle className="mr-2 h-4 w-4 text-muted-foreground" />
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {product.category} - Stock: {product.stock}
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
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Critical Alert</AlertTitle>
                  <AlertDescription>
                    Chicken Breast is out of stock. Please reorder immediately.
                  </AlertDescription>
                </Alert>
                <Alert variant="default" className="mt-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>
                    Shampoo stock is running low. Consider restocking soon.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add New Hair Product
                </Button>
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add New Poultry Product
                </Button>
                <Link href='/dashboard/orders'>
                  <Button className="w-full" variant="outline">
                    View All Orders
                  </Button> 
                </Link>
                <Button className="w-full" variant="outline">
                  Generate Sales Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}