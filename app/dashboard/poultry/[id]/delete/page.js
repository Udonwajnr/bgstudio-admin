'use client'
import { Button } from "@/components/ui/button"
import React,{useState} from "react"
import api from "@/app/axios/axiosConfig"
import {useRouter,useParams} from "next/navigation"

export default function DeleteConfirmation() {
  const [item,setItem] = useState('Chicken')
    const handleDelete = () => {
    // Implement your delete logic here
    console.log("Item deleted")
  }

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">Confirm Deletion</h1>
        <p className="mb-6 text-gray-700">
          Are you sure you want to delete this {item}? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

