import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'

const hairProducts = [
  {
    id: 1,
    name: "Shampoo",
    category: "Hair Care",
    stock: 25,
    price: "$15",
    imageUrl: "/images/shampoo.png",
  },
  {
    id: 2,
    name: "Conditioner",
    category: "Hair Care",
    stock: 10,
    price: "$12",
    imageUrl: "/images/conditioner.png",
  },
  {
    id: 3,
    name: "Hair Spray",
    category: "Styling",
    stock: 5,
    price: "$10",
    imageUrl: "/images/hairspray.png",
  },
  {
    id: 4,
    name: "Hair Gel",
    category: "Styling",
    stock: 18,
    price: "$8",
    imageUrl: "/images/hairgel.png",
  },
]

export default function HairProductTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hair Products Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left">Image</th>
                <th className="px-4 py-2 border-b text-left">Product Name</th>
                <th className="px-4 py-2 border-b text-left">Category</th>
                <th className="px-4 py-2 border-b text-left">Stock</th>
                <th className="px-4 py-2 border-b text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {hairProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={50}
                      height={50}
                      className="object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border-b">{product.name}</td>
                  <td className="px-4 py-2 border-b">{product.category}</td>
                  <td className="px-4 py-2 border-b">{product.stock}</td>
                  <td className="px-4 py-2 border-b">{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
