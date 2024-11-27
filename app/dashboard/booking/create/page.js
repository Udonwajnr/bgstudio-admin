"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BookingForm() {
  const [booking, setBooking] = useState({
    id: Date.now(),
    clientName: '',
    service: '',
    dateTime: '',
    status: 'Pending',
    phoneNumber: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (value) => {
    setBooking(prev => ({ ...prev, service: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking data:', booking);
    // Here you would typically send the data to your backend or perform other actions
  };

  return (
    <div  className="space-y-4 w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Booking</h1>
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

      <Button onSubmit={handleSubmit} className="w-full">Create Booking</Button>
    </div>
  );
}

