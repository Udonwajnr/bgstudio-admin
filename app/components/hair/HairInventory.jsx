"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const HairInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch data from the API
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(
          "https://bgstudiobackend-1.onrender.com/api/hair"
        );
        setInventory(response.data.products || []);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, []);

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Sort, filter, and paginate inventory
  const sortedInventory = [...inventory].sort((a, b) => {
    if (sortColumn) {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  const filteredInventory = sortedInventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedInventory = filteredInventory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);

  // Reset current page if filteredInventory changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredInventory]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <Input
          placeholder="Search inventory..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm mr-4"
        />
        <Link href="/dashboard/hair/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add New Product
          </Button>
        </Link>

        
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("name")}>
                  Product Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("category")}>
                  Category
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("price")}>
                  Price
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("quantity")}>
                  Quantity
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedInventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <img
                    src={item?.photos?.[0] || "/default-placeholder.jpg"}
                    alt={item?.name || "Product Image"}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                </TableCell>
                <TableCell>{item.name.length > 15 ? item.name.slice(0, 15) + "..." : item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  <Link href={`/dashboard/hair/${item._id}/edit`}>
                    <Button variant="ghost" size="sm" className="mr-2">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={`/dashboard/hair/${item._id}/delete`}>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" color="red"/>
                    </Button>
                  </Link>

                  <Link href={`/dashboard/hair/${item._id}`}>
                    <Button>
                      <Eye className="mr-2 h-4 w-4" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <div className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default HairInventory;
