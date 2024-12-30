"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import api from "@/app/axios/axiosConfig"
import {toast} from "sonner"

export default function EditPoultryOrderForm() {
  const router = useRouter()
  const params = useParams()
  const [order, setOrder] = useState({
    id: "",
    customer: "",
    date: "",
    total: 0,
    status: "",
    items: []
  })

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`https://bgstudiobackend-1.onrender.com/api/poultry-order/${params.id}`)
        setOrder(response.data)
      } catch (error) {
        console.error("Error fetching order:", error)
        // Handle error (e.g., show error message, redirect)
      }
    }

    if (params.id) {
      fetchOrder()
    }
  }, [params.id])

  const handleStatusChange = (value) => {
    setOrder({ ...order, status: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.patch(`https://bgstudiobackend-1.onrender.com/api/poultry-order/${params.id}/status`, { status: order.status })
      toast.success("Order status updated successfully!")
      router.push('/dashboard/orders') // Redirect to orders page or refresh
    } catch (error) {
      console.error("Error updating order status:", error)
      alert("Failed to update order status. Please try again.")
    }
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
              <Input id="id" name="id" value={order.orderId} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer">Customer</Label>
              <Input id="customer" name="customer" value={order.customer} disabled />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" name="date"  type="datetime-local" value={ order.date? new Date(order?.date).toISOString().slice(0, 16):""} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="total">Total</Label>
              <Input id="total" name="total" type="number" value={order.total} disabled step="0.01" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select onValueChange={handleStatusChange} value={order.status}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
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
          <Button type="submit" className="w-full">Update Order Status</Button>
        </CardFooter>
      </Card>
    </form>
  )
}

