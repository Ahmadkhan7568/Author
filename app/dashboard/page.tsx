"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import DashboardHeader from "@/components/dashboard/header"
import OverviewCards from "@/components/dashboard/overview-cards"
import ChartsSection from "@/components/dashboard/charts-section"
import DetailedAnalytics from "@/components/dashboard/detailed-analytics"
import UserPermissions from "@/components/dashboard/user-permissions"
import BookSpotlight from "@/components/dashboard/book-spotlight"
import ActivityFeed from "@/components/dashboard/activity-feed"
import { motion } from "framer-motion"
import { useDashboard } from "@/context/dashboard-context"

export default function Dashboard() {
  const { isAuthenticated, isLoading } = useAuth()
  const { data } = useDashboard()
  const router = useRouter()
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // If not authenticated and not loading, redirect to login
    if (!isAuthenticated && !isLoading) {
      router.push("/")
    }

    // Show content with a delay for animation
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        setShowContent(true)
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <DashboardHeader />
      {showContent && (
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-4 py-8"
        >
          {/* Overview Cards at the top */}
          <motion.div variants={itemVariants}>
            <OverviewCards />
          </motion.div>

          {/* Charts Section */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <ChartsSection />
          </motion.div>

          {/* Book Spotlight moved up */}
          <motion.div variants={itemVariants} className="mt-8">
            <BookSpotlight />
          </motion.div>

          {/* Detailed Analytics and User Permissions */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-2">
              <DetailedAnalytics />
            </div>
            <div className="space-y-6">
              <UserPermissions />
              <ActivityFeed />
            </div>
          </motion.div>
        </motion.main>
      )}
    </div>
  )
}
