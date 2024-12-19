'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from 'lucide-react'

// Mock function to simulate checking user role
const checkUserRole = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random() > 0.5 ? 'user' : 'approved_user')
    }, 3000) // Simulate a 3-second delay
  })
}

export default function WaitingForRole() {
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkRole = async () => {
      setLoading(true)
      const newRole = await checkUserRole()
      setRole(newRole)
      setLoading(false)
    }

    const interval = setInterval(checkRole, 10000) // Check every 10 seconds

    checkRole() // Initial check

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <Card className="w-[350px] mx-auto mt-20">
        <CardHeader>
          <CardTitle>Checking Access</CardTitle>
          <CardDescription>Please wait while we verify your access...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  if (role === 'approved_user') {
    return (
      <Card className="w-[350px] mx-auto mt-20">
        <CardHeader>
          <CardTitle>Access Granted</CardTitle>
          <CardDescription>Your role has been updated.</CardDescription>
        </CardHeader>
        <CardContent>
          You now have access to the system.
        </CardContent>
        <CardFooter>
          <Button className="w-full">Enter System</Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-[350px] mx-auto mt-20">
      <CardHeader>
        <CardTitle>Waiting for Approval</CardTitle>
        <CardDescription>Your account is pending approval from a super user.</CardDescription>
      </CardHeader>
      <CardContent>
        Please wait while we process your access request. This may take some time.
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={() => window.location.reload()}>
          Check Again
        </Button>
      </CardFooter>
    </Card>
  )
}

