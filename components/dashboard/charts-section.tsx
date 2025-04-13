"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { useDashboard } from "@/context/dashboard-context"

export default function ChartsSection() {
  const { data, isLoading } = useDashboard()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      setLoaded(true)
    }
  }, [isLoading])

  const COLORS = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c"]

  return (
    <>
      <Card
        className={cn(
          "neumorphic-card col-span-1 lg:col-span-2 transition-all duration-500",
          loaded ? "opacity-100 transform-none" : "opacity-0 translate-y-4",
        )}
      >
        <CardHeader className="pb-2">
          <CardTitle>Website Traffic Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            {loaded ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.trafficData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "10px",
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                      border: "none",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="visits"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 8, strokeWidth: 0 }}
                    animationDuration={1500}
                  />
                  <Line
                    type="monotone"
                    dataKey="uniqueVisitors"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 8, strokeWidth: 0 }}
                    animationDuration={1500}
                    animationBegin={300}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card
        className={cn(
          "neumorphic-card transition-all duration-500",
          loaded ? "opacity-100 transform-none" : "opacity-0 translate-y-4",
        )}
        style={{ transitionDelay: "100ms" }}
      >
        <CardHeader className="pb-2">
          <CardTitle>Book Sales by Region</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            {loaded ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.regionalData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "10px",
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                      border: "none",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" radius={[4, 4, 0, 0]} animationDuration={1500}>
                    {data.regionalData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`url(#colorGradient${index})`} />
                    ))}
                    {/* Gradient definitions */}
                    <defs>
                      {data.regionalData.map((entry, index) => (
                        <linearGradient
                          key={`gradient-${index}`}
                          id={`colorGradient${index}`}
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop offset="0%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0.8} />
                          <stop offset="100%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0.4} />
                        </linearGradient>
                      ))}
                    </defs>
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
