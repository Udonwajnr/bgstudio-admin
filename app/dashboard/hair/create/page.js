'use client'
'use client';

import { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner"; // Optional for user feedback
import api from '@/app/axios/axiosConfig';
import { useRouter } from 'next/navigation';
export default function HairProductForm() {
  const [category, setCategory] = useState('wig');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    wigStyle: '',
    hairLength: [''],
    hairColor: '',
    density: '',
    capSize: '',
    capType: '',
    productType: '',
    targetHairTypes: '',
    hairConcerns: '',
    size: '',
    scent: '',
    brand: '',
    careInstructions: '',
    tags: '',
    discountPrice: '',
    photos: [],
    video: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreview, setVideoPreview] = useState(null);

  const API_ENDPOINT = 'https://bgstudiobackend-1.onrender.com/api/hair';
  const router = useRouter();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleHairLengthChange = (index, value) => {
    const updatedLengths = [...formData.hairLength];
    updatedLengths[index] = value;
    setFormData((prev) => ({
      ...prev,
      hairLength: updatedLengths,
    }));
  };

  const addInputField = () => {
    setFormData((prev) => ({
      ...prev,
      hairLength: [...prev.hairLength, ''],
    }));
  };

  const removeInputField = (index) => {
    const updatedLengths = formData.hairLength.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      hairLength: updatedLengths,
    }));
  };

  const handleFileChange = (e, type) => {
    const files = e.target.files;
    if (type === 'photos') {
      setFormData((prev) => ({
        ...prev,
        photos: files ? Array.from(files) : [],
      }));
      setImagePreviews(files ? Array.from(files).map((file) => URL.createObjectURL(file)) : []);
    } else if (type === 'video') {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        video: file,
      }));
      setVideoPreview(file ? URL.createObjectURL(file) : null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'photos' && Array.isArray(value)) {
          value.forEach((file) => payload.append('photos', file));
        } else if (key === 'video' && value) {
          payload.append('video', value);
        } else if (key === 'hairLength' && Array.isArray(value)) {
          value.forEach((length) => payload.append('hairLength', length));
        } else {
          payload.append(key, value);
        }
      });
      payload.append('category', category);

      const response = await api.post(API_ENDPOINT, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Product submitted successfully!');
      router.push('/dashboard/hair');

      setFormData({
        name: '',
        description: '',
        price: '',
        quantity: '',
        wigStyle: '',
        hairLength: [''],
        hairColor: '',
        density: '',
        capSize: '',
        capType: '',
        productType: '',
        targetHairTypes: '',
        hairConcerns: '',
        size: '',
        scent: '',
        brand: '',
        careInstructions: '',
        tags: '',
        discountPrice: '',
        photos: [],
        video: null,
      });
      setImagePreviews([]);
      setVideoPreview(null);
    } catch (error) {
      console.error('Error submitting form:', error.response || error.message);
      toast.error('Failed to submit the product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  
  
  return (
    <div className="flex-1 p-8 pt-6">
      <form
        className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-8 relative"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {category === 'wig' ? 'Wig' : 'Hair Product'} Details
        </h2>

        {/* Category Selector */}
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            onValueChange={(value) => setCategory(value)}
            defaultValue={category}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wig">Wig</SelectItem>
              <SelectItem value="hairProduct">Hair Product</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Common Fields */}
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter name" onChange={handleChange} />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter description"
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            placeholder="0.00"
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="quantity">Quantity In Stock</Label>
          <Input id="quantity" type="number" onChange={handleChange} />
        </div>

        {/* Category-Specific Fields */}
        {category === 'wig' && (
          <>
            <div>
              <Label htmlFor="wigStyle">Wig Style</Label>
              {/* <Select
                onValueChange={(value) => handleSelectChange('wigStyle', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="curly">Curly</SelectItem>
                  <SelectItem value="straight">Straight</SelectItem>
                  <SelectItem value="wavy">Wavy</SelectItem>
                </SelectContent>
              </Select> */}

              <Input
                id="wigStyle"
                placeholder="e.g., Curly"
                onChange={handleChange}
              />
              
            </div>
            <div>
                <Label htmlFor="hairLength">Hair Length</Label>
                {formData.hairLength.map((length, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <Input
                      id={`hairLength-${index}`}
                      placeholder="e.g., 14 inches"
                      value={length}
                      onChange={(e) => handleHairLengthChange(index, e.target.value)}
                    />
                    {index === formData.hairLength.length - 1 && (
                      <button type="button" onClick={addInputField} className="px-2 py-1 bg-green-500 text-white rounded">+</button>
                    )}
                    {formData.hairLength.length > 1 && (
                      <button type="button" onClick={() => removeInputField(index)} className="px-2 py-1 bg-red-500 text-white rounded">-</button>
                    )}
                  </div>
                ))}
             </div>
            <div>
              <Label htmlFor="hairColor">Hair Color</Label>
              <Input id="hairColor" placeholder="e.g., Black, Blonde, Brown" />
            </div>

            <div>
              <Label htmlFor="density">Density</Label>
              <Input
                id="density"
                placeholder="Enter density (e.g., 150%)"
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="capSize">Cap Size</Label>
              {/* <Select
                onValueChange={(value) => handleSelectChange('capSize', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select cap size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select> */}

              <Input
                id="capSize"
                placeholder="Medium size"
                onChange={handleChange}
              />

            </div>

            <div>
              <Label htmlFor="capType">Cap Type</Label>
              {/* <Select
                onValueChange={(value) => handleSelectChange('capType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select cap type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lace">Lace</SelectItem>
                  <SelectItem value="full-lace">Full Lace</SelectItem>
                  <SelectItem value="front-lace">Front Lace</SelectItem>
                </SelectContent>
              </Select> */}

              <Input
                id="capType"
                placeholder="Medium size"
                onChange={handleChange}
              />
            </div>

          </>
        )}

        {category === 'hairProduct' && (
          <>
            <div>
              <Label htmlFor="productType">Product Type</Label>
              {/* <Select
                onValueChange={(value) =>
                  handleSelectChange('productType', value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select product type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shampoo">Shampoo</SelectItem>
                  <SelectItem value="conditioner">Conditioner</SelectItem>
                  <SelectItem value="oil">Oil</SelectItem>
                </SelectContent>
              </Select> */}

              <Input
            id="productType"
            placeholder="Shampoo"
            onChange={handleChange}
          />
            </div>
          </>
        )}

          <div>
          <Label htmlFor="discountPrice">Discount Price</Label>
          <Input
            id="discountPrice"
            type="number"
            placeholder="0.00"
            onChange={handleChange}
          />
          </div>


          <div>
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              placeholder="Enter tags separated by commas"
              onChange={handleChange}
            />
          </div>


          <div>
            <Label htmlFor="careInstructions">Care Instructions</Label>
            <Textarea
              id="careInstructions"
              placeholder="Enter care instructions"
              onChange={handleChange}
            />
          </div>


      {/* Photo Upload */}
      
        {/* Submit Button */}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
}
