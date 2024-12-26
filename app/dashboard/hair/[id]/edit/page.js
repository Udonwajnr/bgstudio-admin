"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner"; // Optional for user feedback
import api from "@/app/axios/axiosConfig";
import { useRouter, useParams } from "next/navigation";

export default function EditHairProductForm() {
  const [category, setCategory] = useState("wig");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    wigStyle: "",
    hairLength: "",
    hairColor: "",
    density: "",
    capSize: "",
    capType: "",
    productType: "",
    targetHairTypes: "",
    hairConcerns: "",
    size: "",
    scent: "",
    brand: "",
    careInstructions: "",
    tags: "",
    discountPrice: "",
    photos: [],
    video: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreview, setVideoPreview] = useState(null);

  const router = useRouter();
  
  const {id} = useParams()

  const API_ENDPOINT = `https://bgstudiobackend-1.onrender.com/api/hair/${id}`; // Replace with your API endpoint

  useEffect(() => {
    // const getData =async()=>{
    //     await api.get(`https://bgstudiobackend-1.onrender.com/api/hair/${id}`)
    //     .then((data)=>console.log(data))
    //     .catch(err=>console.log(err))
    // }
    // getData()
    const fetchProduct = async () => {
      try {
        const response = await api.get(API_ENDPOINT);
        const data = response.data;

        console.log(data)

        setFormData({
          name: data.name,
          description: data.description,
          price: data.price,
          quantity: data.quantity,
          wigStyle: data.wigStyle || "",
          hairLength: data.hairLength || "",
          hairColor: data.hairColor || "",
          density: data.density || "",
          capSize: data.capSize || "",
          capType: data.capType || "",
          productType: data.productType || "",
          targetHairTypes: data.targetHairTypes || "",
          hairConcerns: data.hairConcerns || "",
          size: data.size || "",
          scent: data.scent || "",
          brand: data.brand || "",
          careInstructions: data.careInstructions || "",
          tags: data.tags || "",
          discountPrice: data.discountPrice || "",
          photos:data.photos || [],
          video:data.video || null,
        });
        setCategory(data.category);
      } catch (error) {
        console.error("Error fetching product details:", error.response || error.message);
        toast.error("Failed to fetch product details.");
      }
    };

     fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFileChange = (e, type) => {
    const files = e.target.files;
    if (type === "photos") {
      setFormData((prev) => ({
        ...prev,
        photos: files ? Array.from(files) : [],
      }));
      setImagePreviews(
        files ? Array.from(files).map((file) => URL.createObjectURL(file)) : []
      );
    } else if (type === "video") {
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
      // Prepare FormData for file uploads
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "photos" && Array.isArray(value)) {
          value.forEach((file) => payload.append("photos", file));
        } else if (key === "video" && value) {
          payload.append("video", value);
        } else {
          payload.append(key, value);
        }
      });
      payload.append("category", category);

      // Send API request
      const response = await api.put(API_ENDPOINT, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Product updated successfully!");
      console.log("API Response:", response.data);
      router.push("/dashboard/hair");
    } catch (error) {
      console.error("Error updating product:", error.response || error.message);
      toast.error("Failed to update the product. Please try again.");
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
          Edit {category === "wig" ? "Wig" : "Hair Product"} Details
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
          <Input
            id="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            placeholder="0.00"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="quantity">Quantity In Stock</Label>
          <Input
            id="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>

        {/* Add other fields and handle category-specific inputs similarly */}

         {/* Photo Upload */}
         <div>
          <Label>Upload Photos</Label>
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'photos')}
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.photos.map((src, index) => (
              <div key={index} className="relative">
                <img
                  src={typeof src === 'string' ? src : URL.createObjectURL(src)}
                  alt={`Preview ${index + 1}`}
                  className="w-20 h-20 object-cover rounded"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full text-xs"
                  onClick={() => {
                    const updatedPhotos = formData.photos.filter((_, i) => i !== index);
                    setFormData((prev) => ({ ...prev, photos: updatedPhotos }));
                  }}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Video Upload */}
        <div>
          <Label>Upload Video</Label>
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => handleFileChange(e, 'video')}
          />
          {videoPreview || formData.video ? (
            <div className="mt-2 relative">
              <video
                src={
                  typeof formData.video === 'string'
                    ? formData.video
                    : videoPreview || URL.createObjectURL(formData.video)
                }
                controls
                className="w-full max-w-md rounded"
              />
              <button
                type="button"
                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full text-xs"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, video: null }));
                  setVideoPreview(null);
                }}
              >
                &times;
              </button>
            </div>
          ) : null}
        </div>

      
        {/* Submit Button */}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
}
