"use client"
import { Button } from "@/components/ui/button"
import React, { useState, useEffect } from "react"
import api from "@/app/axios/axiosConfig"
import { useRouter, useParams } from "next/navigation"
import { toast } from "sonner"
export default function DeleteHairProduct() {
  const router = useRouter()
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isSubmitting,setIsSubmitting] = useState(false)
  // Fetch the product details to check if it exists
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`https://bgstudiobackend-1.onrender.com/api/hair/${id}`)
        setItem(response.data.name) // Assuming the product has a "name" property
        setLoading(false)
      } catch (err) {
        setError(true)
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const handleDelete = async () => {
    setIsSubmitting(true)
    try {
      await api.delete(`https://bgstudiobackend-1.onrender.com/api/hair/${id}`)
      console.log("Item deleted")
      toast.success(`${item} deleted Successfully`)
      router.push("/dashboard/hair") // Redirect after successful deletion
    } catch (err) {
      console.error("Error deleting item:", err)
      alert("There was a problem please try again")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-600">404 - Not Found</h1>
          <p className="mt-2 text-gray-700">
            The hair product you are looking for does not exist.
          </p>
          <Button
            type="button"
            variant="secondary"
            className="mt-4"
            onClick={() => router.push("/dashboard/hair")}
          >
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">Confirm Deletion</h1>
        <p className="mb-6 text-gray-700">
          Are you sure you want to delete this <strong>{item}</strong>? This action cannot be undone.
        </p>

             {/* <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button> */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push("/dashboard/hair")}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Deleting' : 'Delete'}
          </Button>
        </div>
      </div>
    </div>
  )
}
