"use client"
import React, { useState, useRef } from 'react'
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export default function CreateWig() {
  const [wigData, setWigData] = useState({
    name: '',
    type: '',
    length: '',
    color: '',
    customColor: '',
    highlights: '',
    texture: '',
    capSize: '',
    capCircumference: '',
    capType: '',
    density: 130,
    partingType: '',
    laceColor: '',
    heatResistant: false,
    bangs: '',
    accessories: [],
    price: '',
    stockStatus: '',
    description: '',
    careInstructions: '',
    brand: '',
    sku: '',
    customerReviews: '',
    discount: '',
    rating: 5,
    images: []
  })

  const fileInputRef = useRef(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setWigData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name) => (value) => {
    setWigData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name) => (checked) => {
    setWigData(prev => ({ ...prev, [name]: checked }))
  }

  const handleAccessoriesChange = (accessory) => (checked) => {
    setWigData(prev => ({
      ...prev,
      accessories: checked 
        ? [...prev.accessories, accessory]
        : prev.accessories.filter(a => a !== accessory)
    }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    setWigData(prev => ({ ...prev, images: [...prev.images, ...files] }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(wigData)
    // Here you would typically send the data to your backend
  }

  return (
    <form onSubmit={handleSubmit} className="w-full p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create New Wig</CardTitle>
          <CardDescription>Enter the details for the new wig product.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-2">
            <Label htmlFor="name">Wig Name</Label>
            <Input id="name" name="name" value={wigData.name} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Wig Type</Label>
            <Select name="type" onValueChange={handleSelectChange('type')}>
              <SelectTrigger>
                <SelectValue placeholder="Select wig type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="human">Human Hair</SelectItem>
                <SelectItem value="synthetic">Synthetic Hair</SelectItem>
                <SelectItem value="mixed">Mixed Blend</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Length */}
          <div className="space-y-2">
            <Label htmlFor="length">Wig Length</Label>
            <Select name="length" onValueChange={handleSelectChange('length')}>
              <SelectTrigger>
                <SelectValue placeholder="Select wig length" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">Short (8")</SelectItem>
                <SelectItem value="medium">Medium (12")</SelectItem>
                <SelectItem value="long">Long (18")</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Color */}
          <div className="space-y-2">
            <Label htmlFor="color">Hair Color</Label>
            <Select name="color" onValueChange={handleSelectChange('color')}>
              <SelectTrigger>
                <SelectValue placeholder="Select hair color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="black">Black</SelectItem>
                <SelectItem value="brown">Brown</SelectItem>
                <SelectItem value="blonde">Blonde</SelectItem>
                <SelectItem value="red">Red</SelectItem>
                <SelectItem value="gray">Gray</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {wigData.color === 'custom' && (
            <div className="space-y-2">
              <Label htmlFor="customColor">Custom Color</Label>
              <Input id="customColor" name="customColor" value={wigData.customColor} onChange={handleInputChange} />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="highlights">Highlights/Balayage</Label>
            <Input id="highlights" name="highlights" value={wigData.highlights} onChange={handleInputChange} />
          </div>

          {/* Texture */}
          <div className="space-y-2">
            <Label htmlFor="texture">Texture</Label>
            <Select name="texture" onValueChange={handleSelectChange('texture')}>
              <SelectTrigger>
                <SelectValue placeholder="Select texture" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="straight">Straight</SelectItem>
                <SelectItem value="wavy">Wavy</SelectItem>
                <SelectItem value="curly">Curly</SelectItem>
                <SelectItem value="kinky">Kinky/Coily</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Cap Details */}
          <div className="space-y-2">
            <Label htmlFor="capSize">Cap Size</Label>
            <Select name="capSize" onValueChange={handleSelectChange('capSize')}>
              <SelectTrigger>
                <SelectValue placeholder="Select cap size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="capCircumference">Cap Circumference (inches)</Label>
            <Input type="number" id="capCircumference" name="capCircumference" value={wigData.capCircumference} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="capType">Cap Type</Label>
            <Select name="capType" onValueChange={handleSelectChange('capType')}>
              <SelectTrigger>
                <SelectValue placeholder="Select cap type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="laceFront">Lace Front</SelectItem>
                <SelectItem value="fullLace">Full Lace</SelectItem>
                <SelectItem value="monofilament">Monofilament</SelectItem>
                <SelectItem value="wefted">Wefted/Standard Cap</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Density */}
          <div className="space-y-2">
            <Label htmlFor="density">Density (%)</Label>
            <Slider
              id="density"
              min={100}
              max={200}
              step={10}
              value={[wigData.density]}
              onValueChange={(value) => setWigData(prev => ({ ...prev, density: value[0] }))}
            />
            <div className="text-sm text-muted-foreground">{wigData.density}%</div>
          </div>

          {/* Parting */}
          <div className="space-y-2">
            <Label htmlFor="partingType">Parting Type</Label>
            <Select name="partingType" onValueChange={handleSelectChange('partingType')}>
              <SelectTrigger>
                <SelectValue placeholder="Select parting type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="middle">Middle Part</SelectItem>
                <SelectItem value="side">Side Part</SelectItem>
                <SelectItem value="free">Free Part</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Lace Color */}
          <div className="space-y-2">
            <Label htmlFor="laceColor">Lace Color</Label>
            <Select name="laceColor" onValueChange={handleSelectChange('laceColor')}>
              <SelectTrigger>
                <SelectValue placeholder="Select lace color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="transparent">Transparent</SelectItem>
                <SelectItem value="lightBrown">Light Brown</SelectItem>
                <SelectItem value="mediumBrown">Medium Brown</SelectItem>
                <SelectItem value="darkBrown">Dark Brown</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Heat Resistance */}
          <div className="flex items-center space-x-2">
            <Switch
              id="heatResistant"
              checked={wigData.heatResistant}
              onCheckedChange={handleCheckboxChange('heatResistant')}
            />
            <Label htmlFor="heatResistant">Heat Resistant</Label>
          </div>

          {/* Fringe/Bangs */}
          <div className="space-y-2">
            <Label htmlFor="bangs">Bangs/Fringe</Label>
            <Select name="bangs" onValueChange={handleSelectChange('bangs')}>
              <SelectTrigger>
                <SelectValue placeholder="Select bangs option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="withBangs">With Bangs</SelectItem>
                <SelectItem value="withoutBangs">Without Bangs</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Accessories */}
          <div className="space-y-2">
            <Label>Accessories</Label>
            <div className="flex space-x-4">
              {['Combs', 'Clips', 'Adjustable Straps'].map((accessory) => (
                <div key={accessory} className="flex items-center space-x-2">
                  <Checkbox
                    id={accessory}
                    checked={wigData.accessories.includes(accessory)}
                    onCheckedChange={handleAccessoriesChange(accessory)}
                  />
                  <label htmlFor={accessory}>{accessory}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Price and Stock */}
          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input type="number" id="price" name="price" value={wigData.price} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stockStatus">Stock Status</Label>
            <Select name="stockStatus" onValueChange={handleSelectChange('stockStatus')}>
              <SelectTrigger>
                <SelectValue placeholder="Select stock status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inStock">In Stock</SelectItem>
                <SelectItem value="outOfStock">Out of Stock</SelectItem>
                <SelectItem value="preOrder">Pre-order</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description and Care Instructions */}
          <div className="space-y-2 col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" value={wigData.description} onChange={handleInputChange} />
          </div>
          <div className="space-y-2 col-span-2">
            <Label htmlFor="careInstructions">Care Instructions</Label>
            <Textarea id="careInstructions" name="careInstructions" value={wigData.careInstructions} onChange={handleInputChange} />
          </div>

          {/* Brand and SKU */}
          <div className="space-y-2">
            <Label htmlFor="brand">Brand Name</Label>
            <Input id="brand" name="brand" value={wigData.brand} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sku">SKU</Label>
            <Input id="sku" name="sku" value={wigData.sku} onChange={handleInputChange} />
          </div>

          {/* Optional Fields */}
          <div className="space-y-2 col-span-2">
            <Label htmlFor="customerReviews">Customer Reviews</Label>
            <Textarea id="customerReviews" name="customerReviews" value={wigData.customerReviews} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="discount">Discount (%)</Label>
            <Input type="number" id="discount" name="discount" value={wigData.discount} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <Select name="rating" onValueChange={handleSelectChange('rating')}>
              <SelectTrigger>
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <SelectItem key={rating} value={rating.toString()}>{rating} Star{rating !== 1 ? 's' : ''}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Image Upload */}
          <div className="space-y-2 col-span-2">
            <Label htmlFor="images">Product Images</Label>
            <div className="flex items-center space-x-2">
              <Input
                type="file"
                id="images"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                ref={fileInputRef}
              />
              <Button type="button" onClick={() =>   fileInputRef.current.click()}>
                Upload Images
              </Button>
              <span className="text-sm text-muted-foreground">
                {wigData.images.length} image(s) selected
              </span>
            </div>
            {wigData.images.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {wigData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Uploaded image ${index + 1}`}
                      className="w-full h-24 object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Create Wig</Button>
        </CardFooter>
      </Card>
    </form>
  )
}