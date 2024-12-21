"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BookingEditPage({ params }) {
  const { id } = params; // Get the ID from route params
  const router = useRouter();

  const [booking, setBooking] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [savedBooking, setSavedBooking] = useState(null);

  useEffect(() => {
    // Fetch booking details by ID
    const fetchBooking = async () => {
      try {
        const response = await fetch(`https://bgstudiobackend-1.onrender.com/api/salon/${id}`);
        if (!response.ok) {
          throw new Error("Booking not found");
        }
        const data = await response.json();
        setBooking(data);
      } catch (error) {
        console.error("Error fetching booking:", error);
        setNotFound(true);
      }
    };

    fetchBooking();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (value) => {
    setBooking((prev) => ({ ...prev, service: value }));
  };

  const handleStatusChange = (value) => {
    setBooking((prev) => ({ ...prev, status: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://bgstudiobackend-1.onrender.com/api/salon/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });

      if (response.ok) {
        const updatedBooking = await response.json();
        setSavedBooking(updatedBooking);
        alert("Booking updated successfully!");
      } else {
        alert("Failed to update booking");
      }
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  if (notFound) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-4xl font-bold">404 - Booking Not Found</h1>
        <p className="mt-4">The booking you are trying to edit does not exist.</p>
        <Button onClick={() => router.push("/dashboard/booking")} className="mt-6">
          Go Back
        </Button>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-4 w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
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
            value={new Date(booking.dateTime).toISOString().slice(0, 16)}
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
              <SelectItem value="Completed">Completed</SelectItem>
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

        <Button onClick={handleSubmit} className="w-full">
          Save Changes
        </Button>
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
