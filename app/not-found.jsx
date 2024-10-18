import React from 'react'
import Link from 'next/link'
import { Home, Search, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Custom404Page() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-6xl font-extrabold text-gray-900 dark:text-gray-100">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Page Not Found</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">Oops! The page you're looking for doesn't exist.</p>
        </div>

        <div className="flex justify-center">
          <div className="w-32 h-32 relative">
            <div className="absolute inset-0 bg-blue-500 rounded-full opacity-50 animate-ping"></div>
            <div className="absolute inset-0 bg-blue-500 rounded-full opacity-75 animate-pulse"></div>
            <div className="absolute inset-4 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
              <span className="text-4xl">🤔</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Button asChild className="w-full">
              <Link href="/dashboard">
                <Home className="mr-2 h-4 w-4" /> Go to Dashboard
              </Link>
            </Button>

          </div>
        </div>
      </div>
    </div>
  )
}