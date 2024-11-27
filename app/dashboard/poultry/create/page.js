"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
// import { toast } from "@/components/ui/use-toast"

export default function ProductForm() {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    price: "",
    stock: "",
    sales: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleCategoryChange = (value) => {
    setFormData(prevData => ({
      ...prevData,
      category: value
    }))
  }

  const validateForm = () => {
    let newErrors = {}
    if (formData.productName.length < 2) {
      newErrors.productName = "Product name must be at least 2 characters."
    }
    if (!formData.category) {
      newErrors.category = "Please select a category."
    }
    if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number."
    }
    if (!Number.isInteger(Number(formData.stock)) || Number(formData.stock) < 0) {
      newErrors.stock = "Stock must be a non-negative integer."
    }
    if (!Number.isInteger(Number(formData.sales)) || Number(formData.sales) < 0) {
      newErrors.sales = "Sales must be a non-negative integer."
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsSubmitting(false)
      // toast({
      //   title: "Product submitted",
      //   description: "The product has been successfully added.",
      // })
      console.log(formData)
      // Reset form after successful submission
      setFormData({
        productName: "",
        category: "",
        price: "",
        stock: "",
        sales: "",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <label htmlFor="productName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Product Name
        </label>
        <Input
          id="productName"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          placeholder="Enter product name"
        />
        {errors.productName && <p className="text-sm text-red-500">{errors.productName}</p>}
        <p className="text-sm text-muted-foreground">The name of the product as it will appear to customers.</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="category" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Category
        </label>
        <Select onValueChange={handleCategoryChange} value={formData.category}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="clothing">Clothing</SelectItem>
            <SelectItem value="books">Books</SelectItem>
            <SelectItem value="home">Home & Garden</SelectItem>
            <SelectItem value="toys">Toys & Games</SelectItem>
          </SelectContent>
        </Select>
        {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
        <p className="text-sm text-muted-foreground">Choose the category that best fits your product.</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="price" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Price
        </label>
        <Input
          id="price"
          name="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          placeholder="0.00"
        />
        {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
        <p className="text-sm text-muted-foreground">Enter the price in dollars. Use decimal points for cents.</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="stock" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Stock
        </label>
        <Input
          id="stock"
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          placeholder="0"
        />
        {errors.stock && <p className="text-sm text-red-500">{errors.stock}</p>}
        <p className="text-sm text-muted-foreground">The current number of items available for sale.</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="sales" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Sales
        </label>
        <Input
          id="sales"
          name="sales"
          type="number"
          value={formData.sales}
          onChange={handleChange}
          placeholder="0"
        />
        {errors.sales && <p className="text-sm text-red-500">{errors.sales}</p>}
        <p className="text-sm text-muted-foreground">The total number of units sold so far.</p>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  )
}

