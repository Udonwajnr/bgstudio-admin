"use client"
import React, { useState } from 'react'
import { 
  Package, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  ArrowUpDown,
  AlertTriangle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"

// Mock data for demonstration
const initialInventory = [
  { id: 1, name: "Curly Lace Front Wig", category: "Wigs", price: 250, quantity: 20, sku: "WIG001" },
  { id: 2, name: "16-inch Clip-in Extensions", category: "Extensions", price: 150, quantity: 5, sku: "EXT001" },
  { id: 3, name: "Silk Hair Wrap", category: "Accessories", price: 30, quantity: 50, sku: "ACC001" },
  { id: 4, name: "Straight Human Hair Bundle", category: "Hair Bundles", price: 200, quantity: 0, sku: "BUN001" },
  { id: 5, name: "Leave-in Conditioner", category: "Hair Care", price: 25, quantity: 100, sku: "CARE001" },
]

export default function HairInventory() {
  const [inventory, setInventory] = useState(initialInventory)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState("")
  const [sortDirection, setSortDirection] = useState("asc")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newProduct, setNewProduct] = useState({ name: "", category: "", price: "", quantity: "", sku: "" })

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedInventory = [...inventory].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const filteredInventory = sortedInventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddProduct = () => {
    const newId = Math.max(...inventory.map(item => item.id)) + 1
    setInventory([...inventory, { id: newId, ...newProduct }])
    setNewProduct({ name: "", category: "", price: "", quantity: "", sku: "" })
    setShowAddDialog(false)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Hair Inventory Management</h1>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Input
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm mr-4"
          />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Enter the details of the new hair product here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input 
                  id="name" 
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select onValueChange={(value) => setNewProduct({...newProduct, category: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Wigs">Wigs</SelectItem>
                    <SelectItem value="Extensions">Extensions</SelectItem>
                    <SelectItem value="Accessories">Accessories</SelectItem>
                    <SelectItem value="Hair Bundles">Hair Bundles</SelectItem>
                    <SelectItem value="Hair Care">Hair Care</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input 
                  id="price" 
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantity
                </Label>
                <Input 
                  id="quantity" 
                  type="number"
                  value={newProduct.quantity}
                  onChange={(e) => setNewProduct({...newProduct, quantity: e.target.value})}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="sku" className="text-right">
                  SKU
                </Label>
                <Input 
                  id="sku" 
                  value={newProduct.sku}
                  onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
                  className="col-span-3" 
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddProduct}>Save Product</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">
                <Button variant="ghost" onClick={() => handleSort('name')}>
                  Product Name 
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('category')}>
                  Category
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('price')}>
                  Price
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('quantity')}>
                  Quantity
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-md ${
                    item.quantity === 0 ? 'bg-red-50 text-red-700 ring-red-600/10' :
                    item.quantity < 10 ? 'bg-yellow-50 text-yellow-700 ring-yellow-600/10' :
                    'bg-green-50 text-green-700 ring-green-600/10'
                  } px-2 py-1 text-xs font-medium ring-1 ring-inset`}>
                    {item.quantity}
                    {item.quantity === 0 && <AlertTriangle className="ml-1 h-3 w-3" />}
                  </span>
                </TableCell>
                <TableCell>{item.sku}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="mr-2">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}