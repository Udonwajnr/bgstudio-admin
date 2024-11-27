"use client"

import { useState } from "react"
import { BarChart3, ChevronDown, Cog, FileText, LayoutDashboard, Loader2, Menu, Package, ShoppingCart, X } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function ContainerLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const SidebarContent = () => (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Admin Panel</h1>
      </div>
      <nav className="mt-4">
        <Link href="/dashboard" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
          <LayoutDashboard className="mr-3 h-5 w-5" />
          Dashboard
        </Link>
        <Link href="/dashboard/hair" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
          <Package className="mr-3 h-5 w-5" />
          Hair Products
        </Link>
        <Link href="/dashboard/poultry" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
          <Package className="mr-3 h-5 w-5" />
          Poultry Products
        </Link>
        <Link href="/dashboard/orders" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
          <ShoppingCart className="mr-3 h-5 w-5" />
          Orders
        </Link>
        <Link href="/dashboard/booking" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
          <FileText className="mr-3 h-5 w-5" />
          Bookings
        </Link>
        {/* <Link href="#" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
          <Cog className="mr-3 h-5 w-5" />
          Settings
        </Link> */}
      </nav>
    </>
  )

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar for larger screens */}
      <aside className="hidden md:flex md:w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-col">
        <SidebarContent />
      </aside>

      {/* Sidebar for mobile screens */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
           <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle sidebar</span>
                </Button>
              </SheetTrigger>
           </Sheet>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white ml-2">Dashboard Overview</h2>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center">
                <img
                  src="/placeholder.svg?height=32&width=32"
                  alt="User avatar"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="hidden sm:inline-block">John Doe</span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4">
          {children}
        </main>
      </div>
    </div>
  )
}