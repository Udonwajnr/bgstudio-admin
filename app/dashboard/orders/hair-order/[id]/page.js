'use client'

import { useEffect, useState } from 'react'
import { notFound, useRouter, useParams } from 'next/navigation'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { OrderActions } from '@/app/components/poultry/OrderActions'
import api from '@/app/axios/axiosConfig'

export default function OrderDetailPage() {
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { id } = useParams()
  const router = useRouter()

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`https://bgstudiobackend-1.onrender.com/api/hair-order/${id}`) 
        const data = response.data
        setOrder(data)
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchOrder()
    }
  }, [id])

  console.log(order)
  if (loading) {
    return <div className="container mx-auto py-10">Loading...</div>
  }

  if (error || !order) {
    notFound()
    return null // This will ensure the page renders nothing if the order is not found
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
