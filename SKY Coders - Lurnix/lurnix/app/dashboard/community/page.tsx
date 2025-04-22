"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  FiArrowUp,
  FiArrowDown,
  FiMessageSquare,
  FiShare2,
  FiBookmark,
  FiTrendingUp,
  FiStar,
  FiClock,
  FiPlus,
} from "react-icons/fi"
import DashboardLayout from "@/components/dashboard-layout"

export default function CommunityPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("trending")

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [router])

  // Sample community posts data
  const posts = [
    {
      id: 1,
      title: "How to solve quadratic equations efficiently?",
      content: "I've been struggling with quadratic equations. Any tips or tricks to solve them faster?",
      author: {
        name: "MathLover42",
        avatar: "ML",
      },
      upvotes: 128,
      comments: 24,
      category: "Algebra",
      timeAgo: "2 hours ago",
      isHot: true,
    },
    {
      id: 2,
      title: "Visualizing 3D geometry concepts - what tools do you use?",
      content:
        "I'm looking for good tools to help visualize 3D geometry concepts for my students. Any recommendations?",
      author: {
        name: "TeacherJane",
        avatar: "TJ",
      },
      upvotes: 95,
      comments: 31,
      category: "Geometry",
      timeAgo: "5 hours ago",
      isHot: true,
    },
    {
      id: 3,
      title: "Just passed my calculus exam with an A+!",
      content:
        "After months of studying with this platform, I finally aced my calculus exam! The quiz feature really helped.",
      author: {
        name: "StudyHard99",
        avatar: "SH",
      },
      upvotes: 210,
      comments: 42,
      category: "Success Stories",
      timeAgo: "1 day ago",
      isHot: true,
    },
    {
      id: 4,
      title: "Resources for learning probability and statistics?",
      content: "Can anyone recommend good resources for learning probability and statistics from scratch?",
      author: {
        name: "DataNewbie",
        avatar: "DN",
      },
      upvotes: 67,
      comments: 15,
      category: "Statistics",
      timeAgo: "2 days ago",
    },
    {
      id: 5,
      title: "The AR feature is amazing for teaching geometry!",
      content:
        "I've been using the AR feature with my students and it's been a game-changer for teaching 3D geometry concepts.",
      author: {
        name: "FutureTech",
        avatar: "FT",
      },
      upvotes: 156,
      comments: 28,
      category: "AR Learning",
      timeAgo: "3 days ago",
      isHot: true,
    },
    {
      id: 6,
      title: "Weekly challenge: Solve this trigonometry problem",
      content: "Here's this week's challenge: Find all solutions to sin(2x) = cos(x) in the interval [0, 2π].",
      author: {
        name: "MathChallenger",
        avatar: "MC",
      },
      upvotes: 89,
      comments: 37,
      category: "Challenges",
      timeAgo: "4 days ago",
    },
    {
      id: 7,
      title: "How to explain logarithms to high school students?",
      content: "I'm having trouble explaining logarithms to my students. Any creative approaches?",
      author: {
        name: "MathTeacher101",
        avatar: "MT",
      },
      upvotes: 72,
      comments: 19,
      category: "Teaching",
      timeAgo: "5 days ago",
    },
  ]

  // Categories for the sidebar
  const categories = [
    { name: "Algebra", count: 128 },
    { name: "Geometry", count: 95 },
    { name: "Calculus", count: 87 },
    { name: "Statistics", count: 64 },
    { name: "Trigonometry", count: 52 },
    { name: "AR Learning", count: 43 },
    { name: "Success Stories", count: 38 },
    { name: "Challenges", count: 31 },
    { name: "Teaching", count: 29 },
  ]

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Main Content */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Community</h1>
                <Button className="flex items-center gap-2">
                  <FiPlus className="h-4 w-4" />
                  New Post
                </Button>
              </div>

              <div className="mb-6">
                <Input placeholder="Search discussions..." className="w-full" />
              </div>

              <Tabs defaultValue="trending" className="w-full mb-6" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="trending" className="flex items-center gap-2">
                    <FiTrendingUp className="h-4 w-4" />
                    <span>Trending</span>
                  </TabsTrigger>
                  <TabsTrigger value="newest" className="flex items-center gap-2">
                    <FiClock className="h-4 w-4" />
                    <span>Newest</span>
                  </TabsTrigger>
                  <TabsTrigger value="top" className="flex items-center gap-2">
                    <FiStar className="h-4 w-4" />
                    <span>Top</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-4">
                {posts
                  .filter((post) => {
                    if (activeTab === "trending") return true
                    if (activeTab === "newest") return post.timeAgo.includes("hours") || post.timeAgo.includes("day")
                    if (activeTab === "top") return post.upvotes > 100
                    return true
                  })
                  .map((post) => (
                    <Card key={post.id} className="overflow-hidden">
                      <div className="flex">
                        {/* Voting sidebar */}
                        <div className="bg-muted p-4 flex flex-col items-center justify-start gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <FiArrowUp className="h-5 w-5" />
                          </Button>
                          <span className="font-medium">{post.upvotes}</span>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <FiArrowDown className="h-5 w-5" />
                          </Button>
                        </div>

                        {/* Post content */}
                        <div className="flex-1">
                          <CardHeader className="pb-2">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline">{post.category}</Badge>
                              {post.isHot && (
                                <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100">
                                  Hot
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-xl">{post.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-muted-foreground line-clamp-2">{post.content}</p>
                          </CardContent>
                          <CardFooter className="flex justify-between pt-0">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback>{post.author.avatar}</AvatarFallback>
                              </Avatar>
                              <span>{post.author.name}</span>
                              <span>•</span>
                              <span>{post.timeAgo}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Button variant="ghost" size="sm" className="flex items-center gap-1 h-8">
                                <FiMessageSquare className="h-4 w-4" />
                                <span>{post.comments}</span>
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <FiBookmark className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <FiShare2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardFooter>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full md:w-80 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    A place to discuss mathematics, share resources, ask questions, and connect with fellow learners.
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium">15.2k</p>
                      <p className="text-muted-foreground">Members</p>
                    </div>
                    <div>
                      <p className="font-medium">324</p>
                      <p className="text-muted-foreground">Online</p>
                    </div>
                    <div>
                      <p className="font-medium">Feb 2023</p>
                      <p className="text-muted-foreground">Created</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Join Community</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardContent className="px-2">
                  <div className="space-y-1">
                    {categories.map((category, index) => (
                      <div key={index}>
                        <Button variant="ghost" className="w-full justify-between">
                          <span>{category.name}</span>
                          <Badge variant="secondary">{category.count}</Badge>
                        </Button>
                        {index < categories.length - 1 && <Separator />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Community Rules</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2 text-sm pl-5 list-decimal">
                    <li>Be respectful and helpful to other members</li>
                    <li>No spam or self-promotion</li>
                    <li>Use appropriate categories for your posts</li>
                    <li>Include relevant details in your questions</li>
                    <li>Search before posting duplicate questions</li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

