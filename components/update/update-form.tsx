"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BarChart3, BookOpen, FileText, Share2, Clock, Save, RotateCcw, ArrowLeft, Eye, Smartphone } from "lucide-react"
import { useDashboard } from "@/context/dashboard-context"
import { useRouter } from "next/navigation"

export default function UpdateForm() {
  const router = useRouter()
  const { data, updateData, resetData } = useDashboard()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    totalVisits: data.totalVisits,
    booksSold: data.booksSold,
    liveVisitors: data.liveVisitors,
    revenue: data.revenue,
    appInstalls: data.appInstalls,
    visitsChange: data.visitsChange,
    booksSoldChange: data.booksSoldChange,
    revenueChange: data.revenueChange,
    appInstallsChange: data.appInstallsChange,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Update the dashboard data
    updateData({
      ...formData,
      // Ensure we're not losing other data
      trafficData: data.trafficData,
      bookSalesData: data.bookSalesData,
      regionalData: data.regionalData,
      articlesData: data.articlesData,
      commentsData: data.commentsData,
      socialSharesData: data.socialSharesData,
      topSellingBooks: data.topSellingBooks,
    })

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    }, 1500)
  }

  const handleReset = () => {
    resetData()
    setFormData({
      totalVisits: data.totalVisits,
      booksSold: data.booksSold,
      liveVisitors: data.liveVisitors,
      revenue: data.revenue,
      appInstalls: data.appInstalls,
      visitsChange: data.visitsChange,
      booksSoldChange: data.booksSoldChange,
      revenueChange: data.revenueChange,
      appInstallsChange: data.appInstallsChange,
    })
  }

  const handlePreview = () => {
    // Temporarily update data for preview
    updateData(formData)

    // Navigate to dashboard
    router.push("/")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="neumorphic-card">
        <CardContent className="p-6">
          <Tabs defaultValue="website" className="w-full">
            <TabsList className="neumorphic-tabs mb-6 w-full justify-start overflow-x-auto">
              <TabsTrigger value="website" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span>Website Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="books" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Book Sales</span>
              </TabsTrigger>
              <TabsTrigger value="mobile" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                <span>Mobile App</span>
              </TabsTrigger>
              <TabsTrigger value="articles" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Articles</span>
              </TabsTrigger>
              <TabsTrigger value="other" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Other Data</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="website" className="space-y-6 animate-fade-in">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="overview" className="neumorphic-accordion">
                  <AccordionTrigger className="text-lg font-medium">Overview Metrics</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="totalVisits">Total Website Visits</Label>
                          <Input
                            id="totalVisits"
                            name="totalVisits"
                            type="number"
                            value={formData.totalVisits}
                            onChange={handleInputChange}
                            className="neumorphic-input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="visitsChange">Percentage Change</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="visitsChange"
                              name="visitsChange"
                              type="number"
                              value={formData.visitsChange}
                              onChange={handleInputChange}
                              className="neumorphic-input"
                            />
                            <span>%</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="liveVisitors">Real-Time Visitors</Label>
                          <Input
                            id="liveVisitors"
                            name="liveVisitors"
                            type="number"
                            value={formData.liveVisitors}
                            onChange={handleInputChange}
                            className="neumorphic-input"
                          />
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="books" className="space-y-6 animate-fade-in">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="sales" className="neumorphic-accordion">
                  <AccordionTrigger className="text-lg font-medium">Book Sales Data</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="booksSold">Total Books Sold</Label>
                          <Input
                            id="booksSold"
                            name="booksSold"
                            type="number"
                            value={formData.booksSold}
                            onChange={handleInputChange}
                            className="neumorphic-input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="booksSoldChange">Percentage Change</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="booksSoldChange"
                              name="booksSoldChange"
                              type="number"
                              value={formData.booksSoldChange}
                              onChange={handleInputChange}
                              className="neumorphic-input"
                            />
                            <span>%</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="revenue">Revenue Generated</Label>
                          <div className="flex items-center gap-2">
                            <span>$</span>
                            <Input
                              id="revenue"
                              name="revenue"
                              type="number"
                              value={formData.revenue}
                              onChange={handleInputChange}
                              className="neumorphic-input"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="revenueChange">Revenue Change</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="revenueChange"
                              name="revenueChange"
                              type="number"
                              value={formData.revenueChange}
                              onChange={handleInputChange}
                              className="neumorphic-input"
                            />
                            <span>%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="mobile" className="space-y-6 animate-fade-in">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="app" className="neumorphic-accordion">
                  <AccordionTrigger className="text-lg font-medium">Mobile App Data</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="appInstalls">Total App Installs</Label>
                          <Input
                            id="appInstalls"
                            name="appInstalls"
                            type="number"
                            value={formData.appInstalls}
                            onChange={handleInputChange}
                            className="neumorphic-input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="appInstallsChange">Percentage Change</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="appInstallsChange"
                              name="appInstallsChange"
                              type="number"
                              value={formData.appInstallsChange}
                              onChange={handleInputChange}
                              className="neumorphic-input"
                            />
                            <span>%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="articles" className="space-y-6 animate-fade-in">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="articles-list" className="neumorphic-accordion">
                  <AccordionTrigger className="text-lg font-medium">Articles Traffic</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 p-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 neumorphic-card-inner rounded-lg"
                        >
                          <div className="md:col-span-2 space-y-2">
                            <Label htmlFor={`article-${i + 1}-title`}>Article Title</Label>
                            <Input
                              id={`article-${i + 1}-title`}
                              placeholder="Enter article title"
                              className="neumorphic-input"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`article-${i + 1}-views`}>Views</Label>
                            <Input
                              id={`article-${i + 1}-views`}
                              type="number"
                              placeholder="Number of views"
                              className="neumorphic-input"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`article-${i + 1}-shares`}>Shares</Label>
                            <Input
                              id={`article-${i + 1}-shares`}
                              type="number"
                              placeholder="Number of shares"
                              className="neumorphic-input"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="other" className="space-y-6 animate-fade-in">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="social" className="neumorphic-accordion">
                  <AccordionTrigger className="text-lg font-medium">
                    <div className="flex items-center gap-2">
                      <Share2 className="h-4 w-4" />
                      <span>Social Media Shares</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
                      {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((platform, i) => (
                        <div key={i} className="space-y-2">
                          <Label htmlFor={`social-${platform.toLowerCase()}`}>{platform} Shares</Label>
                          <Input
                            id={`social-${platform.toLowerCase()}`}
                            type="number"
                            placeholder={`Number of ${platform} shares`}
                            className="neumorphic-input"
                          />
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </Tabs>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <Button
              type="button"
              variant="outline"
              className="neumorphic-button w-full sm:w-auto flex items-center gap-2"
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Button
                type="button"
                variant="outline"
                className="neumorphic-button w-full sm:w-auto flex items-center gap-2"
                onClick={handlePreview}
              >
                <Eye className="h-4 w-4" />
                Preview Changes
              </Button>

              <Button
                type="button"
                variant="outline"
                className="neumorphic-button w-full sm:w-auto flex items-center gap-2"
                onClick={handleReset}
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>

              <Button
                type="submit"
                className="neumorphic-button-primary w-full sm:w-auto flex items-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {showSuccess && (
            <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg flex items-center justify-center animate-fade-in">
              Changes saved successfully!
            </div>
          )}
        </CardContent>
      </Card>
    </form>
  )
}
