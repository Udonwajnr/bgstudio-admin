'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CheckCircle, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter, useParams } from 'next/navigation';
import api from '@/app/axios/axiosConfig';

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
  );
}

export default function ProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      api.get(`https://bgstudiobackend-1.onrender.com/api/hair/${id}`)
        .then((response) => {
          setProduct(response.data);
          setLoading(false);
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            setError(true);
          }
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-red-500">404</h1>
        <p className="text-lg text-gray-500">Product not found.</p>
        <Button onClick={() => router.push('/')}>Go Back to Home</Button>
      </div>
    );
  }

  const isWig = product.category === 'wig';

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === product.photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? product.photos.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="aspect-square relative mb-4">
            <img
              src={product.photos[currentImageIndex] || '/placeholder.svg'}
              alt={`${product.name} - view ${currentImageIndex + 1}`}
              fill
              className="object-cover rounded-lg"
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2"
              onClick={prevImage}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={nextImage}
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {product.photos.map((photo, index) => (
              <Button
                key={index}
                variant="outline"
                className={`p-0 aspect-square relative ${index === currentImageIndex ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img
                  src={photo}
                  alt={`${product.name} - thumbnail ${index + 1}`}
                  fill
                  className="object-cover rounded-sm"
                />
              </Button>
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
                  </>
                )}
              </ul>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Care Instructions</h2>
            <p>{product.careInstructions}</p>
          </div>
          <div className="flex gap-4 mb-6">
            {/* <Button>Add to Cart</Button>
            <Button variant="outline">Add to Wishlist</Button> */}
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
  );
}

