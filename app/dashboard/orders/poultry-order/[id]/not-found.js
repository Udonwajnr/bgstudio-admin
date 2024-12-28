import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container mx-auto py-10 text-center">
      <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
      <p className="mb-4">Sorry, we couldn't find the order you're looking for.</p>
      <Button asChild>
        <Link href="/dashboard">Back to Orders</Link>
      </Button>
    </div>
  )
}

