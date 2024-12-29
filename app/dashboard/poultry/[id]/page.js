'use client';

import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Egg } from 'lucide-react';
import axios from 'axios';
import { useRouter,useParams } from 'next/navigation';

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {id} = useParams()
  // Fetch product details from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://bgstudiobackend-1.onrender.com/api/poultry/${id}`);
        // Assuming the response contains an array, use the first item as an example
        setProduct(response.data);
        console.log(response)
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center py-8">No product found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold capitalize">{product.productName}</CardTitle>
          <Badge variant="secondary">{product.category}</Badge>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center space-x-4">
              <Egg className="h-10 w-10 text-yellow-500" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-gray-500">Product ID</p>
                <p className="text-lg font-semibold">{product._id}</p>
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
  );
}
