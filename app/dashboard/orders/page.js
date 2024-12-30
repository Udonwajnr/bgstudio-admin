"use client"

import React, { useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon, ChevronDown, ChevronUp, Download, Search } from 'lucide-react'
import HairOrder from '@/app/components/hair/HairOrders'
import PoultryOrder from '@/app/components/poultry/PoultryOrders'
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

// const orders = [
//   {
//     id: "ORD001",
//     customer: "Alice Johnson",
//     date: "2023-06-01",
//     total: 125.99,
//     status: "Delivered",
//     items: [
//       { name: "Organic Eggs (Dozen)", quantity: 2, price: 5.99 },
//       { name: "Free-Range Chicken Eggs (18-pack)", quantity: 1, price: 8.99 },
//     ]
//   },
//   {
//     id: "ORD002",
//     customer: "Bob Smith",
//     date: "2023-06-02",
//     total: 87.50,
//     status: "Processing",
//     items: [
//       { name: "Quail Eggs (24-pack)", quantity: 1, price: 12.99 },
//       { name: "Duck Eggs (6-pack)", quantity: 2, price: 7.99 },
//     ]
//   },
//   {
//     id: "ORD003",
//     customer: "Carol White",
//     date: "2023-06-03",
//     total: 45.97,
//     status: "Shipped",
//     items: [
//       { name: "Organic Eggs (Dozen)", quantity: 3, price: 5.99 },
//       { name: "Egg Cartons (Pack of 10)", quantity: 1, price: 3.99 },
//     ]
//   },
// ]

export default function OrderPage() {
  // const [date, setDate] = useState(null)
  // const [selectedOrder, setSelectedOrder] = useState(orders[0])

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
              <PoultryOrder/>
            </TabsContent>

      </Tabs>

    </div>
  )
}