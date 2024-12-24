'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { CheckCircle, XCircle } from 'lucide-react'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter,useParams } from 'next/navigation'
// This would typically come from your API or database
export default function getProduct() {
  // Fetch product data here
  // For now, we'll return a mock product
  return {
    id,
    category: 'wig',
    name: 'Luxurious Lace Front Wig',
    description: 'A beautiful, natural-looking lace front wig made with 100% human hair.',
    price: 299.99,
    quantity: 50,
    stock: 45,
    brand: 'GlamourLocks',
    careInstructions: 'Gently wash with sulfate-free shampoo. Air dry or use low heat.',
    tags: ['human hair', 'lace front', 'long'],
    discountPrice: 249.99,
    deliveryTime: '3-5 business days',
    returnPolicy: '30-day return policy for unworn items',
    photos: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    video: 'https://example.com/wig-video.mp4',
    hairType: 'human',
    wigStyle: 'wavy',
    hairLength: '18 inches',
    hairColor: 'Natural Black',
    density: '150%',
    capSize: 'medium',
    capType: 'laceFront',
    adjustableStraps: true,
    combsIncluded: true,
    heatResistance: true,
    prePlucked: true,
    babyHairs: true,
    bleachedKnots: true,
    customizable: false,
  }
}

export default function ProductPage() {
  const router = useRouter()
  const { id } = router.query
  const [product, setProduct] = useState(null)

  useEffect(() => {
    if (id) {
      const fetchedProduct = getProduct(id)
      setProduct(fetchedProduct)
    }
  }, [id])

  if (!product) {
    return <div>Loading...</div>
  }

  const isWig = product.category === 'wig'

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="aspect-square relative mb-4">
            <Image
              src={product.photos[0] || '/placeholder.svg'}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {product.photos.slice(1, 4).map((photo, index) => (
              <div key={index} className="aspect-square relative">
                <Image
                  src={photo}
                  alt={`${product.name} - view ${index + 2}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <Badge>{product.category}</Badge>
            <Badge variant="outline">{product.brand}</Badge>
          </div>
          <p className="text-xl font-semibold mb-2">
            ${product.discountPrice || product.price}
            {product.discountPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">
                ${product.price}
              </span>
            )}
          </p>
          <p className="mb-4">{product.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Details</h2>
              <ul className="space-y-1">
                {isWig && (
                  <>
                    <li>Hair Type: {product.hairType}</li>
                    <li>Style: {product.wigStyle}</li>
                    <li>Length: {product.hairLength}</li>
                    <li>Color: {product.hairColor}</li>
                    <li>Density: {product.density}</li>
                    <li>Cap Size: {product.capSize}</li>
                    <li>Cap Type: {product.capType}</li>
                  </>
                )}
                {!isWig && product.productType && (
                  <li>Product Type: {product.productType}</li>
                )}
                {!isWig && product.size && (
                  <li>Size: {product.size}</li>
                )}
                {!isWig && product.scent && (
                  <li>Scent: {product.scent}</li>
                )}
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Features</h2>
              <ul className="space-y-1">
                {isWig && (
                  <>
                    <li>
                      <BooleanFeature 
                        value={product.adjustableStraps}
                        label="Adjustable Straps"
                      />
                    </li>
                    <li>
                      <BooleanFeature 
                        value={product.combsIncluded}
                        label="Combs Included"
                      />
                    </li>
                    <li>
                      <BooleanFeature 
                        value={product.heatResistance}
                        label="Heat Resistant"
                      />
                    </li>
                    <li>
                      <BooleanFeature 
                        value={product.prePlucked}
                        label="Pre-plucked"
                      />
                    </li>
                    <li>
                      <BooleanFeature 
                        value={product.babyHairs}
                        label="Baby Hairs"
                      />
                    </li>
                    <li>
                      <BooleanFeature 
                        value={product.bleachedKnots}
                        label="Bleached Knots"
                      />
                    </li>
                    <li>
                      <BooleanFeature 
                        value={product.customizable}
                        label="Customizable"
                      />
                    </li>
                  </>
                )}
                {!isWig && product.targetHairType && (
                  <li>Target Hair Types: {product.targetHairType.join(', ')}</li>
                )}
                {!isWig && product.hairConcerns && (
                  <li>Addresses: {product.hairConcerns.join(', ')}</li>
                )}
              </ul>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Care Instructions</h2>
            <p>{product.careInstructions}</p>
          </div>
          <div className="flex gap-4 mb-6">
            <Button>Add to Cart</Button>
            <Button variant="outline">Add to Wishlist</Button>
          </div>
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-2">Shipping & Returns</h2>
              <p>Delivery Time: {product.deliveryTime}</p>
              <p>Return Policy: {product.returnPolicy}</p>
            </CardContent>
          </Card>
        </div>
      </div>
      {product.video && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Product Video</h2>
          <video controls className="w-full max-w-3xl mx-auto rounded-lg">
            <source src={product.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

function BooleanFeature({ value, label }) {
  return (
    <div className="flex items-center">
      {value ? (
        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
      ) : (
        <XCircle className="w-4 h-4 text-red-500 mr-2" />
      )}
      {label}
    </div>
  )
}

