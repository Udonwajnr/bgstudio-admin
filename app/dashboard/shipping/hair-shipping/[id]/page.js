'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { format } from 'date-fns'
import { Loader2, Package, User, MapPin, Truck, Calendar, Mail, Phone } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {useParams} from "next/navigation"

export default function ShippingDetailPage() {
  const [shippingDetails, setShippingDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const {id} = useParams()
  useEffect(() => {
    const fetchShippingDetails = async () => {
      try {
        const response = await axios.get(`https://bgstudiobackend-1.onrender.com/api/hair-shipping/shipping/${id}`)
        setShippingDetails(response.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch shipping details. Please try again later.')
        setLoading(false)
      }
    }

    fetchShippingDetails()
  }, [])
  console.log(shippingDetails)
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Shipping Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-500">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!shippingDetails) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>No Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p>No shipping details found.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shipping Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2" />
              Order Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><span className="font-medium">Order ID:</span> {shippingDetails.orderId}</p>
              <p><span className="font-medium">Status:</span> <Badge variant="outline">{shippingDetails.status}</Badge></p>
              <p><span className="font-medium">Tracking Number:</span> {shippingDetails.trackingNumber || 'N/A'}</p>
              <p className="flex items-center">
                <Calendar className="mr-2" />
                <span className="font-medium">Delivery Date:</span> {shippingDetails.deliveryDate ? format(new Date(shippingDetails.deliveryDate), 'MMMM d, yyyy') : 'Not scheduled'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {shippingDetails.customerName}</p>
              <p className="flex items-center">
                <Mail className="mr-2" />
                <span className="font-medium">Email:</span> {shippingDetails.email}
              </p>
              <p className="flex items-center">
                <Phone className="mr-2" />
                <span className="font-medium">Phone:</span> {shippingDetails.phone}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2" />
              Shipping Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p>{shippingDetails.address.street}</p>
              <p>{shippingDetails.address.city}, {shippingDetails.address.state} {shippingDetails.address.zipCode}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
