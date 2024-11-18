'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function HairProductForm() {
  const [category, setCategory] = useState('wig')

  return (
    <div className='flex-1 p-8 pt-6'>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {category === 'wig' ? 'Wig' : 'Hair Product'} Details
        </h2>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select onValueChange={setCategory} defaultValue={category}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wig">Wig</SelectItem>
              <SelectItem value="hairProduct">Hair Product</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="name">Name of the {category === 'wig' ? 'Wig' : 'Product'}</Label>
          <Input id="name" placeholder={category === 'wig' ? "Silky Straight Bob Wig" : "Argan Oil Hair Serum"} />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Detailed description..." />
        </div>

        <div>
          <Label htmlFor="price">Price</Label>
          <Input id="price" type="number" placeholder="0.00" />
        </div>

        <div>
          <Label htmlFor="quantity">Quantity/Stock Availability</Label>
          <Input id="quantity" type="number" />
        </div>

        {category === 'wig' ? (
          <>
            <div>
              <Label>Hair Type</Label>
              <RadioGroup defaultValue="human">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="human" id="human" />
                  <Label htmlFor="human">Human Hair</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="synthetic" id="synthetic" />
                  <Label htmlFor="synthetic">Synthetic Hair</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="blended" id="blended" />
                  <Label htmlFor="blended">Blended Hair</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="wigStyle">Wig Style</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="curly">Curly</SelectItem>
                  <SelectItem value="straight">Straight</SelectItem>
                  <SelectItem value="wavy">Wavy</SelectItem>
                  <SelectItem value="braided">Braided</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="hairLength">Hair Length</Label>
              <Input id="hairLength" placeholder="e.g., 14 inches" />
            </div>

            <div>
              <Label htmlFor="hairColor">Hair Color</Label>
              <Input id="hairColor" placeholder="e.g., Black, Blonde, Brown" />
            </div>

            <div>
              <Label htmlFor="density">Density</Label>
              <Input id="density" placeholder="e.g., 150%" />
            </div>

            <div>
              <Label htmlFor="capSize">Cap Size</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a cap size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="capType">Cap Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a cap type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="laceFront">Lace Front</SelectItem>
                  <SelectItem value="fullLace">Full Lace</SelectItem>
                  <SelectItem value="uPart">U-Part</SelectItem>
                  <SelectItem value="360Lace">360 Lace</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="adjustableStraps" />
              <Label htmlFor="adjustableStraps">Adjustable Straps</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="combsIncluded" />
              <Label htmlFor="combsIncluded">Combs Included</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="heatResistance" />
              <Label htmlFor="heatResistance">Heat Resistance</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="prePlucked" />
              <Label htmlFor="prePlucked">Pre-Plucked Hairline</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="babyHairs" />
              <Label htmlFor="babyHairs">Baby Hairs</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="bleachedKnots" />
              <Label htmlFor="bleachedKnots">Bleached Knots</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="customizable" />
              <Label htmlFor="customizable">Customizable</Label>
            </div>
          </>
        ) : (
          <>
            <div>
              <Label htmlFor="productType">Product Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a product type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shampoo">Shampoo</SelectItem>
                  <SelectItem value="conditioner">Conditioner</SelectItem>
                  <SelectItem value="oil">Oil</SelectItem>
                  <SelectItem value="serum">Serum</SelectItem>
                  <SelectItem value="mask">Mask</SelectItem>
                  <SelectItem value="gel">Gel</SelectItem>
                  <SelectItem value="spray">Spray</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Target Hair Type</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="dry" />
                  <Label htmlFor="dry">Dry</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="oily" />
                  <Label htmlFor="oily">Oily</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="normal" />
                  <Label htmlFor="normal">Normal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="curly" />
                  <Label htmlFor="curly">Curly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="straight" />
                  <Label htmlFor="straight">Straight</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="allTypes" />
                  <Label htmlFor="allTypes">All Types</Label>
                </div>
              </div>
            </div>

            <div>
              <Label>Hair Concerns Addressed</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="frizz" />
                  <Label htmlFor="frizz">Frizz</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="breakage" />
                  <Label htmlFor="breakage">Breakage</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="dandruff" />
                  <Label htmlFor="dandruff">Dandruff</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="hairLoss" />
                  <Label htmlFor="hairLoss">Hair Loss</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="splitEnds" />
                  <Label htmlFor="splitEnds">Split Ends</Label>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="size">Size/Volume</Label>
              <Input id="size" placeholder="e.g., 200ml, 8oz" />
            </div>

            <div>
              <Label htmlFor="scent">Scent/Fragrance</Label>
              <Input id="scent" placeholder="e.g., Lavender, Coconut" />
            </div>
          </>
        )}

        <div className="border-t border-gray-200 pt-4 mt-4">
          <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
        </div>
        <div>
          <Label htmlFor="photos">Product Photos</Label>
          <Input id="photos" type="file" multiple />
        </div>

        <div>
          <Label htmlFor="video">Video Upload (Optional)</Label>
          <Input id="video" type="file" accept="video/*" />
        </div>

        <div>
          <Label htmlFor="brand">Brand Name</Label>
          <Input id="brand" />
        </div>

        <div>
          <Label htmlFor="careInstructions">Care Instructions</Label>
          <Textarea id="careInstructions" placeholder="e.g., Wash in lukewarm water with mild shampoo" />
        </div>

        <div>
          <Label htmlFor="tags">Tags or Keywords</Label>
          <Input id="tags" placeholder="e.g., Straight, Blonde, Short Wig" />
        </div>

        <div>
          <Label htmlFor="discountPrice">Discount Price (Optional)</Label>
          <Input id="discountPrice" type="number" />
        </div>

        <div>
          <Label htmlFor="deliveryTime">Estimated Delivery Time</Label>
          <Input id="deliveryTime" placeholder="e.g., 3-5 business days" />
        </div>

        <div>
          <Label htmlFor="returnPolicy">Return/Exchange Policy</Label>
          <Textarea id="returnPolicy" placeholder="e.g., 7-day return policy" />
        </div>

        <Button type="submit" className="w-full">Submit</Button>
      </div>
    </div>
  )
}