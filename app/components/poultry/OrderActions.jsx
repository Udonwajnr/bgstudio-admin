"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {useRouter} from "next/navigation"
import Link from 'next/link'
import { buttonVariants } from "@/components/ui/button"

export function OrderActions({ orderId }) {
  const router = useRouter()
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
      <Button variant="outline" onClick={handlePrintOrder}
      disabled={true}
      // disabled={isLoading}
      >
        {isLoading ? "Printing..." : "Print Order"}
      </Button>
      <Link href={`/dashboard/orders/hair-order/${orderId}/edit`} className={buttonVariants({ variant: "default" })}>
        Edit Order
      </Link>
    </div>
  )
}

