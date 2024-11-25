'use client'
import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Egg } from 'lucide-react'

export default function ProductDetail() {
  const product = {
    id: "EGG001",
    name: "Organic Free-Range Eggs",
    category: "Organic",
    price: 5.99,
    stock: 500,
    sales: 1200,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
          <Badge variant="secondary">{product.category}</Badge>
        </CardHeader>
        
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center space-x-4">
              <Egg className="h-10 w-10 text-yellow-500" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-gray-500">Product ID</p>
                <p className="text-lg font-semibold">{product.id}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Price</p>
                <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Stock</p>
                <p className="text-2xl font-bold">{product.stock}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Sales</p>
              <p className="text-2xl font-bold">{product.sales}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

