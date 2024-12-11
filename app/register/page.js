'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion } from "framer-motion"
import axios from 'axios'
import VerifyEmail from '../components/VerifyEmail'
import { Toaster, toast } from 'sonner'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError('Username is required')
      return false
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Invalid email address')
      return false
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!validateForm()) return

    setIsLoading(true)
    try {
      const response = await axios.post(
        'https://bgstudiobackend-1.onrender.com/api/auth/register',
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword:formData.confirmPassword
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.status === 201) {
        setSuccess(true)
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        })
        toast.success('Registration Successful:')

      } else {
        setError('An error occurred. Please try again.')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) return <VerifyEmail email={formData.email}/>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-white p-4">
      <Card className="w-full max-w-4xl shadow-xl">
        <div className="md:flex">
          <motion.div className="md:w-1/2 bg-black text-white p-8 flex flex-col justify-center rounded-l-lg"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CardHeader className="space-y-1">
            <div className=" mb-4 ">
              <img src={"logo2.jpg"} className="w-full max-w-[200px] rounded-full mx-auto"/>
            </div>
              <CardTitle className="text-3xl font-bold text-center">BG Admin Dashboard</CardTitle>
            </CardHeader>
          </motion.div>
          <motion.div className="md:w-1/2 p-8"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
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
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert variant="success">
                  <AlertDescription>Registration successful! Please log in.</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Register'}
              </Button>
              <p className="text-sm text-gray-500 text-center">
                Already have an account?{' '}
                <Link href="/" className="text-indigo-600 hover:underline">
                  Login
                </Link>
              </p>
            </form>
          </motion.div>
        </div>
      </Card>
    </div>
  )
}
