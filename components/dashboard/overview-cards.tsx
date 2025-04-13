"use client"

import { useState, useEffect } from "react"
import { Book, DollarSign, Globe, Users, Smartphone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import CountUp from "react-countup"
import { useDashboard } from "@/context/dashboard-context"
import { motion } from "framer-motion"

export default function OverviewCards() {
  const { data, isLoading } = useDashboard()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      setLoaded(true)
    }
  }, [isLoading])

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-green-500"
    if (change < 0) return "text-red-500"
    return "text-gray-500"
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      <motion.div custom={0} variants={cardVariants} initial="hidden" animate={loaded ? "visible" : "hidden"}>
        <Card className="neumorphic-card overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Website Visits</p>
                <h3 className="text-2xl font-bold mt-2 text-gray-800 dark:text-white">
                  {loaded ? (
                    <CountUp end={data.totalVisits} duration={2} separator="," />
                  ) : (
                    <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  )}
                </h3>
                {loaded && (
                  <p className={cn("text-sm mt-1 flex items-center", getChangeColor(data.visitsChange))}>
                    {data.visitsChange > 0 ? "+" : ""}
                    {data.visitsChange}%
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">from last month</span>
                  </p>
                )}
              </div>
              <div className="neumorphic-icon-container">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            {loaded && (
              <div className="mt-4 h-10">
                <div className="sparkline-container">
                  {/* Simplified sparkline visualization */}
                  <div className="flex items-end h-8 space-x-1">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-blue-500 rounded-sm w-2"
                        style={{
                          height: `${Math.random() * 100}%`,
                          opacity: 0.7 + i / 30,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div custom={1} variants={cardVariants} initial="hidden" animate={loaded ? "visible" : "hidden"}>
        <Card className="neumorphic-card overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Books Sold</p>
                <h3 className="text-2xl font-bold mt-2 text-gray-800 dark:text-white">
                  {loaded ? (
                    <CountUp end={data.booksSold} duration={2} separator="," />
                  ) : (
                    <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  )}
                </h3>
                {loaded && (
                  <p className={cn("text-sm mt-1 flex items-center", getChangeColor(data.booksSoldChange))}>
                    {data.booksSoldChange > 0 ? "+" : ""}
                    {data.booksSoldChange}%
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">from last month</span>
                  </p>
                )}
              </div>
              <div className="neumorphic-icon-container">
                <Book className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div custom={2} variants={cardVariants} initial="hidden" animate={loaded ? "visible" : "hidden"}>
        <Card className="neumorphic-card overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Real-Time Traffic</p>
                <h3 className="text-2xl font-bold mt-2 text-gray-800 dark:text-white flex items-center">
                  {loaded ? (
                    <>
                      <CountUp end={data.liveVisitors} duration={2} />
                      <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                    </>
                  ) : (
                    <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  )}
                </h3>
                {loaded && <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">Active visitors now</p>}
              </div>
              <div className="neumorphic-icon-container">
                <Globe className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div custom={3} variants={cardVariants} initial="hidden" animate={loaded ? "visible" : "hidden"}>
        <Card className="neumorphic-card overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Revenue Generated</p>
                <h3 className="text-2xl font-bold mt-2 text-gray-800 dark:text-white">
                  {loaded ? (
                    <>
                      $<CountUp end={data.revenue} duration={2} separator="," />
                    </>
                  ) : (
                    <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  )}
                </h3>
                {loaded && (
                  <p className={cn("text-sm mt-1 flex items-center", getChangeColor(data.revenueChange))}>
                    {data.revenueChange > 0 ? "+" : ""}
                    {data.revenueChange}%
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">from last month</span>
                  </p>
                )}
              </div>
              <div className="neumorphic-icon-container">
                <DollarSign className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div custom={4} variants={cardVariants} initial="hidden" animate={loaded ? "visible" : "hidden"}>
        <Card className="neumorphic-card overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Mobile App Installs</p>
                <h3 className="text-2xl font-bold mt-2 text-gray-800 dark:text-white">
                  {loaded ? (
                    <CountUp end={data.appInstalls} duration={2} separator="," />
                  ) : (
                    <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  )}
                </h3>
                {loaded && (
                  <p className={cn("text-sm mt-1 flex items-center", getChangeColor(data.appInstallsChange))}>
                    {data.appInstallsChange > 0 ? "+" : ""}
                    {data.appInstallsChange}%
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">from last month</span>
                  </p>
                )}
              </div>
              <div className="neumorphic-icon-container">
                <Smartphone className="h-6 w-6 text-indigo-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
