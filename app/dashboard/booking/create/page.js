"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

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
  const [loading, setLoading] = useState(false); // Loading state
  const [successMessage, setSuccessMessage] = useState(null); // Success message
  const [errorMessage, setErrorMessage] = useState(null); // Error message
  const router = useRouter()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (value) => {
    setBooking((prev) => ({ ...prev, service: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await axios.post('https://bgstudiobackend-1.onrender.com/api/salon/book', booking, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((data)=>{
        setSuccessMessage('Booking created successfully!');
        toast.success("Booking created successfully!")
        setBooking({
          id: Date.now(),
          clientName: '',
          service: '',
          dateTime: '',
          status: 'Pending',
          phoneNumber: '',
          email: '',
        });
        router.push("/dashboard/booking") 
      })
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'An error occurred while creating the booking.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Booking</h1>
      {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
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
              <SelectItem value="Plating Hair">Plating Hair</SelectItem>
              <SelectItem value="Fixing Nails">Fixing Nails</SelectItem>
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

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Creating Booking...' : 'Create Booking'}
        </Button>
      </form>
    </div>
  );
}
