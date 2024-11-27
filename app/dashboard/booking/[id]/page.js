import React from 'react'
import { format } from 'date-fns'
import { CalendarIcon, ClockIcon, PhoneIcon, MailIcon, UserIcon, ScissorsIcon, CheckCircleIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link'
// In a real application, you would fetch this data from your backend
const bookingData = {
  id: 1,
  clientName: "Alice Johnson",
  service: "Haircut",
  dateTime: "2023-06-15T10:00",
  status: "Complete",
  phoneNumber: "+1(555)123-4567",
  email: "alice@example.com",
  stylist: "Emma Smith",
  duration: 60,
  price: 50,
}

export default function BookingDetailPage() {
  const statusColor = {
    Pending: "bg-yellow-100 text-yellow-800",
    Complete: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
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
            <CardDescription>Booking ID: #{bookingData.id}</CardDescription>
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
                  <span className="text-gray-700">{format(new Date(bookingData.dateTime), 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <ClockIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{format(new Date(bookingData.dateTime), 'h:mm a')}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{bookingData.phoneNumber}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MailIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{bookingData.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">Duration: {bookingData.duration} minutes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-semibold text-primary">${bookingData.price}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 rounded-b-lg">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt={bookingData.stylist} />
                <AvatarFallback>{bookingData.stylist.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-gray-900">{bookingData.stylist}</p>
                <p className="text-sm text-gray-500">Your Stylist</p>
              </div>
            </div>
          </CardFooter>
        </Card>
        <div className="mt-6 flex justify-end space-x-4">
            <Link href={"/dashboard/booking/test/edit"}>
                <Button variant="outline">Edit Booking</Button>
            </Link>
          {/* <Button>Reschedule</Button> */}
        </div>
      </div>
    </div>
  )
}

