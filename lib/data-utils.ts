export function generateRandomData(min = 0, max = 100): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function generateBookSalesData() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  return months.map((month) => ({
    month,
    physical: generateRandomData(500, 2000),
    ebook: generateRandomData(300, 1500),
    audiobook: generateRandomData(100, 800),
  }))
}

export function generateRegionalData() {
  return [
    { region: "North America", sales: generateRandomData(2000, 5000) },
    { region: "Europe", sales: generateRandomData(1500, 4000) },
    { region: "Asia", sales: generateRandomData(1000, 3000) },
    { region: "Australia", sales: generateRandomData(500, 1500) },
    { region: "South America", sales: generateRandomData(300, 1000) },
    { region: "Africa", sales: generateRandomData(100, 500) },
  ]
}

export function generateArticlesData() {
  // Real article titles from the provided URLs
  const articleTitles = [
    "Evil Web",
    "The Status of Heart in Human Personality",
    "Different States of Heart",
    "Transformation of the Heart",
    "Some Aspects of Diseases",
    "Hypocrisy: The Most Serious Spiritual Disease",
    "Taught as a Component of Evil Web",
    "Moderation: An Analysis",
    "Justice: An Islamic Perspective",
  ]

  return articleTitles.map((title) => ({
    title,
    views: generateRandomData(1000, 10000),
    shares: generateRandomData(50, 500),
    comments: generateRandomData(10, 100),
  }))
}

export function generateCommentsData() {
  const comments = [
    {
      user: "Emily Johnson",
      text: "I absolutely loved your latest book! The character development was outstanding.",
      time: "2 hours ago",
      likes: generateRandomData(5, 50),
    },
    {
      user: "Michael Smith",
      text: "Your writing style is so immersive. I couldn't put the book down!",
      time: "5 hours ago",
      likes: generateRandomData(5, 50),
    },
    {
      user: "Sarah Williams",
      text: "The plot twist in chapter 15 completely caught me off guard. Brilliant!",
      time: "1 day ago",
      likes: generateRandomData(5, 50),
    },
  ]

  return comments
}

export function generateSocialSharesData() {
  return [
    {
      platform: "Facebook",
      shares: generateRandomData(500, 2000),
    },
    {
      platform: "Twitter",
      shares: generateRandomData(300, 1500),
    },
    {
      platform: "Instagram",
      shares: generateRandomData(200, 1000),
    },
    {
      platform: "LinkedIn",
      shares: generateRandomData(100, 500),
    },
  ]
}

export function generateTopSellingBooks() {
  return [
    {
      id: 1,
      title: "The Heart's Journey",
      cover: "/placeholder.svg?height=300&width=200&text=The+Heart's+Journey",
      sales: 4328,
      rating: 4.7,
      description: "A profound exploration of spiritual transformation and the journey of the heart.",
    },
    {
      id: 2,
      title: "Understanding Evil",
      cover: "/placeholder.svg?height=300&width=200&text=Understanding+Evil",
      sales: 3721,
      rating: 4.5,
      description: "An in-depth analysis of the concept of evil from an Islamic perspective.",
    },
    {
      id: 3,
      title: "The Path to Moderation",
      cover: "/placeholder.svg?height=300&width=200&text=The+Path+to+Moderation",
      sales: 2945,
      rating: 4.8,
      description: "Exploring the balanced approach to life and spirituality.",
    },
    {
      id: 4,
      title: "Justice and Mercy",
      cover: "/placeholder.svg?height=300&width=200&text=Justice+and+Mercy",
      sales: 1872,
      rating: 4.3,
      description: "A comprehensive guide to understanding justice in Islamic teachings.",
    },
  ]
}

// Create a context to share data across components
export const initialDashboardData = {
  totalVisits: 325478,
  booksSold: 78542,
  liveVisitors: 247,
  revenue: 85690,
  appInstalls: 32145,
  visitsChange: 12,
  booksSoldChange: 18,
  revenueChange: 15,
  appInstallsChange: 24,
  trafficData: Array.from({ length: 12 }).map((_, i) => ({
    month: `Month ${i + 1}`,
    visits: 15000 + i * 2500 + generateRandomData(-1000, 1000),
    uniqueVisitors: 10000 + i * 1500 + generateRandomData(-800, 800),
  })),
  bookSalesData: generateBookSalesData(),
  regionalData: generateRegionalData(),
  articlesData: generateArticlesData(),
  commentsData: generateCommentsData(),
  socialSharesData: generateSocialSharesData(),
  topSellingBooks: generateTopSellingBooks(),
}
