'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'

const API_URL = 'https://bgstudiobackend-1.onrender.com/api/hair-shipping'

export default function DeleteShippingPage() {
  const [shippingData, setShippingData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  useEffect(() => {
    loadShippingData()
  }, [])

  const loadShippingData = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(API_URL)
      setShippingData(response.data)
    } catch (err) {
      setError('Failed to load shipping data')
      toast({
        title: "Error",
        description: "Failed to load shipping data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this shipping entry?')) {
      try {
        await axios.delete(`${API_URL}/${id}`)
        setShippingData(shippingData.filter(item => item._id !== id))
        toast({
          title: "Success",
          description: "Shipping entry deleted successfully",
        })
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to delete shipping entry",
          variant: "destructive",
        })
      }
    }
  }

  const filteredData = shippingData.filter(item =>
    item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Delete Shipping Entries</h1>
      <Button onClick={() => router.push('/shipping-dashboard')} className="mb-4">
        Back to Dashboard
      </Button>
      <Input
        type="text"
        placeholder="Search by customer name or tracking number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Shipping Date</TableHead>
            <TableHead>Tracking Number</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.customerName}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{new Date(item.shippingDate).toLocaleDateString()}</TableCell>
              <TableCell>{item.trackingNumber}</TableCell>
              <TableCell>
                <Button onClick={() => handleDelete(item._id)} variant="destructive">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}