"use client"
import React, { useState } from 'react'
import { BarChart3, ShoppingCart, TrendingUp, Clock, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import HairProductTable from '@/app/components/HairProductTable'
import Link from 'next/link'

const salesDataHair = [
  { name: 'Jan', shampoo: 3000, conditioner: 1500, hairspray: 1000 },
  { name: 'Feb', shampoo: 2500, conditioner: 1200, hairspray: 800 },
  { name: 'Mar', shampoo: 3200, conditioner: 1400, hairspray: 900 },
  { name: 'Apr', shampoo: 2900, conditioner: 1600, hairspray: 1100 },
  { name: 'May', shampoo: 3400, conditioner: 1700, hairspray: 1300 },
  { name: 'Jun', shampoo: 3100, conditioner: 1900, hairspray: 1500 },
]

const recentActivityHair = [
  { id: 1, action: "New order placed", product: "Shampoo", time: "5 minutes ago" },
  { id: 2, action: "Stock updated", product: "Hair Gel", time: "10 minutes ago" },
  { id: 3, action: "Order shipped", product: "Conditioner", time: "1 hour ago" },
]

const lowStockHairProducts = [
  { id: 1, name: "Shampoo", stock: 10 },
  { id: 2, name: "Hair Spray", stock: 5 },
  { id: 3, name: "Conditioner", stock: 3 },
]

export default function HairProductDashboard() {
  const [timeFilter, setTimeFilter] = useState('today')

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Hair Product Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>Download Hair Product Report</Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Hair Product Orders</CardTitle>
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
                <div className="text-2xl font-bold">987</div>
                <p className="text-xs text-muted-foreground">+18% from last {timeFilter}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">-3% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,345.89</div>
                <p className="text-xs text-muted-foreground">
                  Shampoo: $6,000 | Conditioner: $3,245 | Hair Spray: $3,100
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
                  <p className="text-sm font-medium">1. Shampoo</p>
                  <p className="text-sm font-medium">2. Conditioner</p>
                  <p className="text-sm font-medium">3. Hair Spray</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Hair Product Sales Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={salesDataHair}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="shampoo" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="conditioner" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="hairspray" stroke="#ffc658" />
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
                  {recentActivityHair.map((activity) => (
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
                <CardTitle>Low Stock Hair Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {lowStockHairProducts.map((product) => (
                    <div key={product.id} className="flex items-center">
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{product.name}</p>
                        <p className="text-sm text-muted-foreground">Stock: {product.stock}</p>
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
                  <Link href="/" className="flex">
                    <Plus className="mr-2 h-4 w-4" /> Add New Hair Product
                  </Link>
                </Button>
                <Button className="w-full" >
                  <Link href="/dashboard/hair/inventory" className="flex">
                    <Plus className="mr-2 h-4 w-4" /> View Hair Product Inventory
                  </Link>
                </Button>
                <Button className="w-full" variant="outline">
                  Generate Sales Report
                </Button>
              </CardContent>
            </Card>
          </div>
          <HairProductTable/>
        </TabsContent>
      </Tabs>
    </div>
  )
}
