'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import  ShippingTable  from '@/app/components/shipping/ShippingTable'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import HairShippingTable from '@/app/components/shipping/HairShippingTable'
import PoultryShippingTable from '@/app/components/shipping/PoultryShippingTable'
const API_URL = 'https://bgstudiobackend-1.onrender.com/api/poultry-shipping'
const HAIR_API_URL="https://bgstudiobackend-1.onrender.com/api/hair-shipping/shipping"

export default function ShippingDashboard() {
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

  const handleAddShipping = async (newShipping) => {
    try {
      await axios.post(API_URL, newShipping)
      await loadShippingData() // Reload data after adding new shipping
    } catch (err) {
      setError('Failed to add new shipping')
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

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shipping Dashboard</h1>
        <Tabs defaultValue='Hair' className="space-y-4">
          <TabsList>
              <TabsTrigger value="Hair">Hair Shipping</TabsTrigger>
            <TabsTrigger value="Poultry">Poultry Shipping</TabsTrigger>
            </TabsList>
              <TabsContent value="Hair" className="space-y-4">
             <Card>
                <HairShippingTable data={hairShippingData} />   
              </Card>
              </TabsContent>
              
              <TabsContent value="Poultry" className="space-y-4">
              <Card>
                <PoultryShippingTable data={poultryShippingData} />
              </Card>
              </TabsContent>
        </Tabs>
    </div>
  )
}

