"use client"
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BookingEditPage() {
  const [booking, setBooking] = useState({
    id: '',
    clientName: '',
    service: '',
    dateTime: '',
    status: '',
    phoneNumber: '',
    email: '',
  });
  const [savedBooking, setSavedBooking] = useState(null);

  useEffect(() => {
    // Simulating fetching existing booking data
    // In a real application, you would fetch this from your backend
    const existingBooking = {
      id: 1,
      clientName: "Alice Johnson",
      service: "Haircut",
      dateTime: "2023-06-15T10:00",
      status: "Pending",
      phoneNumber: "+1(555)123-4567",
      email: "alice@example.com",
    };
    setBooking(existingBooking);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (value) => {
    setBooking(prev => ({ ...prev, service: value }));
  };

  const handleStatusChange = (value) => {
    setBooking(prev => ({ ...prev, status: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated booking:', booking);
    // Here you would typically send the updated data to your backend
    setSavedBooking(booking);
  };

  return (
    <div>
      <div  className="space-y-4 w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Booking</h1>
        <div>
          <Label htmlFor="clientName">Client Name</Label>
          <Input
            id="clientName"
            name="clientName"
            value={booking.clientName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="service">Service</Label>
          <Select onValueChange={handleServiceChange} value={booking.service}>
            <SelectTrigger>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Haircut">Haircut</SelectItem>
              <SelectItem value="Coloring">Coloring</SelectItem>
              <SelectItem value="Styling">Styling</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="dateTime">Date and Time</Label>
          <Input
            id="dateTime"
            name="dateTime"
            type="datetime-local"
            value={booking.dateTime}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <Select onValueChange={handleStatusChange} value={booking.status}>
            <SelectTrigger>
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Confirmed">Confirmed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={booking.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={booking.email}
            onChange={handleChange}
            required
          />
        </div>

        <Button onSubmit={handleSubmit} className="w-full">Save Changes</Button>
      </div>

      {savedBooking && (
        <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded max-w-md mx-auto">
          <h2 className="text-lg font-semibold mb-2">Booking Updated Successfully:</h2>
          <pre className="whitespace-pre-wrap">{JSON.stringify(savedBooking, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

