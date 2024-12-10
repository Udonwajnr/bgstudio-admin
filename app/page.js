'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from 'next/link'
import { motion } from "framer-motion"
import axios from 'axios'

export default function Home() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validateForm = () => {
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Invalid email address')
      return false
    }
    if (!formData.password) {
      setError('Password is required')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) return

    setIsLoading(true)
    try {
      const response = await axios.post(
        'https://bgstudiobackend-1.onrender.com/api/auth/login',
        {
          email: formData.email,
          password: formData.password,
        }
      )
      console.log('Login successful:', response.data)

      // Example: Navigate to the dashboard or perform actions on successful login
      alert('Login successful!')
    } catch (err) {
      console.error(err)
      setError(
        err.response?.data?.message || 'Invalid email or password. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-secondary/20">
      <Card className="w-full max-w-4xl shadow-xl overflow-hidden">
        <div className="md:flex">
          <motion.div
            className="md:w-1/2 bg-indigo-600 p-8 text-white flex flex-col justify-center items-center"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-24 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                className="w-full h-full"
              >
                <circle cx="50" cy="50" r="45" fill="white" />
                <path
                  d="M30 50 L45 65 L70 40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                />
              </svg>
            </div>
            <CardTitle className="text-3xl font-bold text-center mb-4">Admin Dashboard</CardTitle>
            <p className="text-center text-lg">Manage your business with ease and efficiency.</p>
          </motion.div>
          <motion.div
            className="md:w-1/2 p-8"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Login to Your Account</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
                <div className="flex justify-between w-full text-sm">
                  <Link href="/register" className="text-primary hover:underline">
                    Create an account
                  </Link>
                  <Link href="/forgot-password" className="text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </CardFooter>
            </form>
          </motion.div>
        </div>
      </Card>
    </div>
  )
}
