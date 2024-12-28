"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function EditOrderForm() {
  const [order, setOrder] = useState({
    id: "ORD001",
    customer: "Alice Johnson",
    date: "2023-06-01",
    total: 125.99,
    status: "Delivered",
    items: [
      { name: "Organic Eggs (Dozen)", quantity: 2, price: 5.99 },
      { name: "Free-Range Chicken Eggs (18-pack)", quantity: 1, price: 8.99 },
    ]
  })

  const handleInputChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value })
  }

  const handleStatusChange = (value) => {
    setOrder({ ...order, status: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the order data to a server
    console.log("Submitting order:", order)
    alert("Order submitted successfully!")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="id">Order ID</Label>
              <Input id="id" name="id" value={order.id} onChange={handleInputChange} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer">Customer</Label>
              <Input id="customer" name="customer" value={order.customer} onChange={handleInputChange} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" name="date" type="date" value={order.date} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="total">Total</Label>
              <Input id="total" name="total" type="number" value={order.total} onChange={handleInputChange} step="0.01" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select onValueChange={handleStatusChange} defaultValue={order.status}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Order Items</Label>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Submit Order</Button>
        </CardFooter>
      </Card>
    </form>
  )
}

