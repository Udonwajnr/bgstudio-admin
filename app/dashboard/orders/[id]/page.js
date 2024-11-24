'use client'

import { notFound } from 'next/navigation'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { OrderActions } from '@/app/components/poultry/OrderActions'

// This would typically come from a database
const getOrderById = (id) => {
  // Simulating database fetch
  const order = {
    id: "ORD001",
    customer: "Alice Johnson",
    date: "2023-06-01",
    total: 125.99,
    status: "Delivered",
    items: [
      { name: "Organic Eggs (Dozen)", quantity: 2, price: 5.99 },
      { name: "Free-Range Chicken Eggs (18-pack)", quantity: 1, price: 8.99 },
    ]
  }
  return id === order.id ? order : null
}

export default function OrderDetailPage({ params }) {
  const order = getOrderById(params.id)

  if (!order) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Order Details</CardTitle>
            <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>
              {order.status}
            </Badge>
          </div>
          <CardDescription>Order ID: {order.id}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Customer</h3>
              <p className="mt-1 text-sm text-gray-900">{order.customer}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Date</h3>
              <p className="mt-1 text-sm text-gray-900">{order.date}</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Order Items</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="text-lg font-semibold">Total: ${order.total.toFixed(2)}</div>
          <OrderActions orderId={order.id} />
        </CardFooter>
      </Card>
    </div>
  )
}

