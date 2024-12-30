'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'

export function ShippingForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    orderId: '',
    customerName: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
    phone: '',
    email: '',
    deliveryDate: null,
    status: 'Pending',
    trackingNumber: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    // Reset form after submission
    setFormData({
      orderId: '',
      customerName: '',
      address: { street: '', city: '', state: '', zipCode: '' },
      phone: '',
      email: '',
      deliveryDate: null,
      status: 'Pending',
      trackingNumber: '',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <Input
        name="orderId"
        value={formData.orderId}
        onChange={handleChange}
        placeholder="Order ID"
        required
      />
      <Input
        name="customerName"
        value={formData.customerName}
        onChange={handleChange}
        placeholder="Customer Name"
        required
      />
      <Input
        name="address.street"
        value={formData.address.street}
        onChange={handleChange}
        placeholder="Street"
        required
      />
      <Input
        name="address.city"
        value={formData.address.city}
        onChange={handleChange}
        placeholder="City"
        required
      />
      <Input
        name="address.state"
        value={formData.address.state}
        onChange={handleChange}
        placeholder="State"
        required
      />
      <Input
        name="address.zipCode"
        value={formData.address.zipCode}
        onChange={handleChange}
        placeholder="Zip Code"
        required
      />
      <Input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        required
      />
      <Input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        type="email"
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            {formData.deliveryDate ? format(formData.deliveryDate, 'PPP') : 'Pick delivery date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={formData.deliveryDate}
            onSelect={(date) => setFormData((prev) => ({ ...prev, deliveryDate: date }))}
            initialFocus
            required
          />
        </PopoverContent>
      </Popover>
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      >
        <option value="Pending">Pending</option>
        <option value="Shipped">Shipped</option>
        <option value="Out for Delivery">Out for Delivery</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>
      <Input
        name="trackingNumber"
        value={formData.trackingNumber}
        onChange={handleChange}
        placeholder="Tracking Number"
      />
      <Button type="submit">Add Shipping</Button>
    </form>
  )
}

