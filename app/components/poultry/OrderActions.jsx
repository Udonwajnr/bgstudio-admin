"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"

export function OrderActions({ orderId }) {
  const [isLoading, setIsLoading] = useState(false)

  const handlePrintOrder = async () => {
    setIsLoading(true)
    // Simulating an API call or print process
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    alert({
      title: "Order printed",
      description: `Order ${orderId} has been sent to the printer.`,
    })
  }

  return (
    <div className="space-x-2">
      <Button variant="outline" onClick={handlePrintOrder} disabled={isLoading}>
        {isLoading ? "Printing..." : "Print Order"}
      </Button>
      <Button variant="default">Edit Order</Button>
    </div>
  )
}

