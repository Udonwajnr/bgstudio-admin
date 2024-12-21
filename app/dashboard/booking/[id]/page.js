'use client'
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon, ClockIcon, PhoneIcon, MailIcon, UserIcon, ScissorsIcon, CheckCircleIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link'
import api from '@/app/axios/axiosConfig'
import { useRouter,useParams } from 'next/navigation'

export default function BookingDetailPage() {
  const [bookingData, setBookingData] = useState(null)
  const [loading, setLoading] = useState(true)
  const {id} = useParams()

  console.log(id)
  const statusColor = {
    Pending: "bg-yellow-100 text-yellow-800",
    Complete: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  }

  useEffect(() => {
    // Fetch the booking data from the API
    const fetchBookingData = async () => {
      try {
        const response = await api.get(`https://bgstudiobackend-1.onrender.com/api/salon/${id}`)
        // const data = await response.json()
        setBookingData(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching booking data:', error)
        setLoading(false)
      }
    }

    fetchBookingData()
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!bookingData) {
    return <div>Booking not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card className="border-t-4 border-primary shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold text-gray-900">Booking Details</CardTitle>
              <Badge className={statusColor[bookingData.status]}>{bookingData.status}</Badge>
            </div>
            <CardDescription>Booking ID: #{id}</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{bookingData.clientName}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <ScissorsIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{bookingData.service}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{format(new Date(bookingData?.dateTime), 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <ClockIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{format(new Date(bookingData?.dateTime), 'h:mm a')}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{bookingData?.phoneNumber}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MailIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{bookingData?.email || 'Not provided'}</span>
                </div>
                {/* <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">Duration: {bookingData?.duration} minutes</span>
                </div> */}
                {/* <div className="flex items-center space-x-3">
                  <span className="text-2xl font-semibold text-primary">${bookingData?.price}</span>
                </div> */}
              </div>
            </div>
          </CardContent>
          {/* <CardFooter className="bg-gray-50 rounded-b-lg">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt={bookingData?.stylist} />
                <AvatarFallback>{bookingData?.stylist?.split(' ')?.map(n => n[0])?.join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-gray-900">{bookingData?.stylist}</p>
                <p className="text-sm text-gray-500">Your Stylist</p>
              </div>
            </div>
          </CardFooter> */}
        </Card>
        <div className="mt-6 flex justify-end space-x-4">
            <Link href={`/dashboard/booking/${id}/edit`}>
                <Button variant="outline">Edit Booking</Button>
            </Link>
        </div>
      </div>
    </div>
  )
}
