"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Upload } from "lucide-react";
import api from "@/app/axios/axiosConfig";

export default function ProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    sales: "0",
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      category: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (formData.name.length < 2) {
      newErrors.name = "Product name must be at least 2 characters.";
    }
    if (!formData.category) {
      newErrors.category = "Please select a category.";
    }
    if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number.";
    }
    if (!Number.isInteger(Number(formData.quantity)) || Number(formData.quantity) < 0) {
      newErrors.quantity = "Quantity must be a non-negative integer.";
    }
    if (!formData.image) {
      newErrors.image = "Please upload an image.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (value !== null) {
            formDataToSend.append(key, value);
          }
        });

        const response = await api.post(
          "https://bgstudiobackend-1.onrender.com/api/poultry",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Product submitted successfully");
        console.log(response.data);
        setFormData({
          name: "",
          category: "",
          price: "",
          quantity: "",
          sales: "0",
          image: null,
        });
        setPreviewUrl(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        console.error("Error submitting product:", error);
        toast.error("Failed to submit product. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
        <CardDescription>
          Enter the details of the new product you want to add to your inventory.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name field */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            <p className="text-sm text-muted-foreground">
              The name of the product as it will appear to customers.
            </p>
          </div>
          {/* Category field */}
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>
            <Select onValueChange={handleCategoryChange} value={formData.category}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="books">Books</SelectItem>
                <SelectItem value="home">Home & Garden</SelectItem>
                <SelectItem value="toys">Toys & Games</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
          </div>
          {/* Remaining form fields */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Price */}
            <div className="space-y-2">
              <label htmlFor="price" className="text-sm font-medium">
                Price
              </label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
              />
              {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
            </div>
            {/* Quantity */}
            <div className="space-y-2">
              <label htmlFor="quantity" className="text-sm font-medium">
                Quantity
              </label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="0"
              />
              {errors.quantity && <p className="text-sm text-red-500">{errors.quantity}</p>}
            </div>
          </div>
          {/* Image upload */}
          <div className="space-y-2">
            <label htmlFor="image" className="text-sm font-medium">
              Product Image
            </label>
            <div className="flex items-center space-x-4">
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                ref={fileInputRef}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
              </Button>
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Product preview"
                  className="h-20 w-20 object-cover rounded-md"
                />
              )}
            </div>
            {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
          </div>
          {/* Submit button */}
          <CardFooter className="px-0">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
