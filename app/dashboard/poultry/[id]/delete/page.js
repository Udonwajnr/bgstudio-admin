'use client';
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import api from "@/app/axios/axiosConfig"; // Assuming Axios is configured
import { useRouter, useParams } from "next/navigation";
import {toast} from "sonner"

export default function DeleteConfirmation() {
  const router = useRouter();
  const { id } = useParams(); // Get the ID from the URL
  const [item, setItem] = useState(null); // Holds item details
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch item to check if it exists
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await api.get(`https://bgstudiobackend-1.onrender.com/api/poultry/${id}`);
        setItem(response.data); // Set item details if found
      } catch (err) {
        setError("Item not found.");
      }
    };

    fetchItem();
  }, [id]);

  const handleDelete = async () => {
    if (!item) {
      setError("Cannot delete an item that does not exist.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Make the DELETE request
      await api.delete(`https://bgstudiobackend-1.onrender.com/api/poultry/${id}`);

      // Show success message or navigate
      toast.success("Product Deleted Successfully")

      router.push("/dashboard/poultry"); // Navigate back to the list page
    } catch (err) {
      console.error(err);
      setError("Failed to delete the item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">Confirm Deletion</h1>
        {error ? (
          <p className="mb-6 text-red-600">{error}</p>
        ) : (
          <>
            <p className="mb-6 text-gray-700">
              Are you sure you want to delete this {item?.productName}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => window.history.back()}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
