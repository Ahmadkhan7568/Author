"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { initialDashboardData } from "@/lib/data-utils"

type DashboardContextType = {
  data: typeof initialDashboardData
  updateData: (newData: Partial<typeof initialDashboardData>) => void
  resetData: () => void
  isLoading: boolean
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState(() => {
    // Check if we have saved data in localStorage
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("dashboardData")
      if (savedData) {
        try {
          return JSON.parse(savedData)
        } catch (error) {
          console.error("Failed to parse saved dashboard data:", error)
        }
      }
    }
    return initialDashboardData
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const updateData = (newData: Partial<typeof initialDashboardData>) => {
    setData((prevData) => {
      const updatedData = {
        ...prevData,
        ...newData,
      }

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("dashboardData", JSON.stringify(updatedData))
      }

      return updatedData
    })
  }

  const resetData = () => {
    setData(initialDashboardData)
    if (typeof window !== "undefined") {
      localStorage.setItem("dashboardData", JSON.stringify(initialDashboardData))
    }
  }

  return (
    <DashboardContext.Provider value={{ data, updateData, resetData, isLoading }}>{children}</DashboardContext.Provider>
  )
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider")
  }
  return context
}
