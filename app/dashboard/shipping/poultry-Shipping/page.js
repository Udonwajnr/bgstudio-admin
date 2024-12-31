'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import  ShippingTable  from '@/app/components/shipping/ShippingTable'

const API_URL = 'https://bgstudiobackend-1.onrender.com/api/poultry-shipping'
const HAIR_API_URL="https://bgstudiobackend-1.onrender.com/api/hair-shipping/shipping"

export default function PoultryShippingDashboard() {
  const [poultryShippingData, setPoultryShippingData] = useState([])
  const [hairShippingData,setHairShippingData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadShippingData()
    loadHairShippingData()
  }, [])

  const loadShippingData = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(API_URL)
      setPoultryShippingData(response.data)
      console.log(response)
    } catch (err) {
      setError('Failed to load shipping data')
    } finally {
      setIsLoading(false)
    }
  }

  const loadHairShippingData = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(HAIR_API_URL)
      setHairShippingData(response.data)
      console.log(response)
    } catch (err) {
      setError('Failed to load shipping data')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddShipping = async (newShipping) => {
    try {
      await axios.post(API_URL, newShipping)
      await loadShippingData() // Reload data after adding new shipping
    } catch (err) {
      setError('Failed to add new shipping')
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Poultry Shipping Dashboard</h1>      
          <ShippingTable data={poultryShippingData} />
    </div>
  )
}

