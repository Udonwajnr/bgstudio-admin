'use client';

import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/axios/axiosConfig";
import { toast } from "sonner";

export default function DeleteConfirmation({ params }) {
  const { id } = params; // Get the ID from route params
  const router = useRouter();

  const [item, setItem] = useState(null); // Booking details for display
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  // Validate the ID by fetching its details
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await api.get(`https://bgstudiobackend-1.onrender.com/api/salon/${id}`);
        if (response.status === 200) {
          setItem(response.data); // Set the item for display
        //  console.log(response)
        }
      } catch (err) {
        // console.error("Error fetching booking:", err);
        setNotFound(true); // Set 404 state if not found
      }
    };
    fetchBooking();
  }, [id]);

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.delete(`https://bgstudiobackend-1.onrender.com/api/salon/${id}`);

      if (response.status === 200) {
        toast.success("Booking deleted successfully");
        router.push("/dashboard/booking"); // Redirect to bookings page
      } else {
        const errorData = await response.json();
        // throw new Error(errorData.message || "Failed to delete item");
      }
    } catch (err) {
      // console.error("Error deleting item:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-gray-900">404</h1>
          <p className="text-gray-700">The booking you are trying to delete does not exist.</p>
          <Button type="button" variant="primary" onClick={() => router.push("/dashboard/bookings")}>
            Go to Bookings
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">Confirm Deletion</h1>
        <p className="mb-6 text-gray-700">
          Are you sure you want to delete this {item?.clientName} Booking ? This action cannot be undone.
        </p>
        {error && <p className="mb-4 text-sm text-red-500">Error: {error}</p>}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
