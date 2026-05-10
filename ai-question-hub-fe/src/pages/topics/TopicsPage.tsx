import * as React from "react"
import {
  Search,
  BookOpen,
  HelpCircle,
  Briefcase,
  MoreVertical,
  ExternalLink,
  ChevronRight,
  Edit,
  FileText,
  Plus,
  ListFilter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

// Dummy data structure for topics
const topicsData = [
  {
    id: "1",
    title: "JavaScript Cơ bản & Nâng cao",
    tag: "JAVASCRIPT",
    tagColor: "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/50",
    questionsCount: 128,
    projectsCount: 8,
    completionRate: 80,
    creator: {
      name: "Admin",
      avatar: "AD",
      avatarColor: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300"
    },
    status: "using",
    colorScheme: "from-blue-600 to-indigo-600",
    projects: [
      { id: "p1", name: "Frontend Dev Assessment 2024", questionsUsed: 45, icon: Briefcase },
      { id: "p2", name: "JS Fundamentals Training", questionsUsed: 60, icon: BookOpen },
      { id: "p3", name: "React Bootcamp Entrance", questionsUsed: 20, icon: FileText },
      { id: "p4", name: "Fullstack Mid-level Quiz", questionsUsed: 15, icon: Briefcase },
    ]
  },
  {
    id: "2",
    title: "React Hooks Thực chiến",
    tag: "REACT HOOKS",
    tagColor: "bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-900/50",
    questionsCount: 85,
    projectsCount: 5,
    completionRate: 92,
    creator: {
      name: "TechCore",
      avatar: "TC",
      avatarColor: "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300"
    },
    status: "using",
    colorScheme: "from-purple-600 to-pink-600"
  },
  {
    id: "3",
    title: "HTML & Semantics",
    tag: "HTML",
    tagColor: "bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-900/50",
    subTag: "Chưa dùng",
    questionsCount: 45,
    projectsCount: 0,
    completionRate: 30,
    creator: {
      name: "UI Team",
      avatar: "UI",
      avatarColor: "bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-300"
    },
    status: "unused",
    colorScheme: "from-orange-500 to-red-500"
  },
  {
    id: "4",
    title: "Database Design Patterns",
    tag: "DATABASE",
    tagColor: "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50",
    subTag: "Mới",
    questionsCount: 24,
    projectsCount: 1,
    completionRate: 15,
    creator: {
      name: "DB Admin",
      avatar: "DB",
      avatarColor: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-300"
    },
    status: "using",
    colorScheme: "from-emerald-600 to-teal-600"
  },
  {
    id: "5",
    title: "Node.js Microservices",
    tag: "BACKEND",
    tagColor: "bg-slate-50 text-slate-600 border-slate-100 dark:bg-slate-950/30 dark:text-slate-400 dark:border-slate-900/50",
    questionsCount: 96,
    projectsCount: 3,
    completionRate: 65,
    creator: {
      name: "Backend Lead",
      avatar: "BL",
      avatarColor: "bg-slate-200 text-slate-700"
    },
    status: "using",
    colorScheme: "from-slate-600 to-slate-800"
  },
  {
    id: "6",
    title: "UI/UX Design Principles",
    tag: "DESIGN",
    tagColor: "bg-pink-50 text-pink-600 border-pink-100 dark:bg-pink-950/30 dark:text-pink-400 dark:border-pink-900/50",
    questionsCount: 34,
    projectsCount: 0,
    completionRate: 45,
    creator: {
      name: "Design Team",
      avatar: "DT",
      avatarColor: "bg-pink-100 text-pink-600"
    },
    status: "unused",
    colorScheme: "from-pink-500 to-rose-500"
  }
]

export default function TopicsPage() {
  const [selectedTopic, setSelectedTopic] = React.useState<typeof topicsData[0] | null>(null)
  const [sheetOpen, setSheetOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")

  const openTopicDetails = (topic: typeof topicsData[0]) => {
    setSelectedTopic(topic)
    setSheetOpen(true)
  }

  return (
    <div className="p-6 flex flex-col gap-6 min-h-full pb-12 relative">
      {/* Page Header Ribbon */}
      <Card className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border-none shadow-sm ring-1 ring-slate-200/60 dark:ring-slate-800/60 rounded-2xl overflow-hidden">
        <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left Text / Breadcrumb */}
          <div className="flex flex-col">
            <h1 className="text-display-lg text-ink dark:text-white tracking-tight">Danh sách chủ đề</h1>
            <p className="text-body text-ink-muted opacity-80 mt-0.5">Tổng hợp tất cả chủ đề trong hệ thống</p>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-ink-muted opacity-70" />
              <Input
                placeholder="Tìm kiếm chủ đề..."
                className="h-10 pl-9 bg-white/80 dark:bg-slate-950 border-slate-200 dark:border-slate-800/60 rounded-lg text-body shadow-none focus-visible:ring-[#2e5d97]/40"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Button variant="outline" className="h-10 bg-white/80 dark:bg-slate-950 border-slate-200 dark:border-slate-800 px-4 font-medium text-body-medium flex items-center gap-2 text-ink-secondary hover:text-ink hover:bg-white transition-colors rounded-lg shadow-none">
              <ListFilter className="size-4 opacity-80" />
              <span>Lọc</span>
            </Button>

            <Button className="h-10 bg-[#2e5d97] hover:bg-[#264f82] text-white shadow-md shadow-[#2e5d97]/20 flex items-center gap-1.5 px-5 rounded-lg font-medium">
              <Plus className="size-4" />
              <span>Thêm chủ đề</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview Mini-Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="overflow-hidden bg-white/80 dark:bg-slate-900/60 border-none shadow-sm ring-1 ring-slate-200/60 dark:ring-slate-800/60 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                <BookOpen className="size-5" />
              </div>
              <span className="text-body-medium text-ink-secondary dark:text-slate-300">Tổng số chủ đề</span>
            </div>
            <div className="mt-3">
              <span className="text-stat text-ink dark:text-white">48</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-white/80 dark:bg-slate-900/60 border-none shadow-sm ring-1 ring-slate-200/60 dark:ring-slate-800/60 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
                <HelpCircle className="size-5" />
              </div>
              <span className="text-body-medium text-ink-secondary dark:text-slate-300">Tổng câu hỏi</span>
            </div>
            <div className="mt-3">
              <span className="text-stat text-ink dark:text-white">1,248</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-white/80 dark:bg-slate-900/60 border-none shadow-sm ring-1 ring-slate-200/60 dark:ring-slate-800/60 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
                <Briefcase className="size-5" />
              </div>
              <span className="text-body-medium text-ink-secondary dark:text-slate-300">Dự án sử dụng</span>
            </div>
            <div className="mt-3">
              <span className="text-stat text-ink dark:text-white">24</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-white/80 dark:bg-slate-900/60 border-none shadow-sm ring-1 ring-slate-200/60 dark:ring-slate-800/60 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                <BookOpen className="size-5" />
              </div>
              <span className="text-body-medium text-ink-secondary dark:text-slate-300">Tổng số chủ đề</span>
            </div>
            <div className="mt-3">
              <span className="text-stat text-ink dark:text-white">48</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content with Tabs */}
      <Tabs defaultValue="all" className="w-full space-y-5 ">
        <TabsList className="bg-white/60 !h-[40px] dark:bg-slate-900/50 p-1 border border-slate-200/50 dark:border-slate-800/50 rounded-lg h-auto gap-1 backdrop-blur-sm">
          <TabsTrigger value="all" className="rounded-sm h-[25px] px-5 py-1.5 text-body-medium data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm cursor-pointer">Tất cả</TabsTrigger>
          <TabsTrigger value="using" className="rounded-sm h-[25px] px-5 py-1.5 text-body-medium data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm cursor-pointer">Đang dùng</TabsTrigger>
          <TabsTrigger value="unused" className="rounded-sm h-[25px] px-5 py-1.5 text-body-medium data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm cursor-pointer">Chưa dùng</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {topicsData.map((topic) => (
              <TopicCard key={topic.id} topic={topic} onOpen={() => openTopicDetails(topic)} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="using" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {topicsData.filter(t => t.status === "using").map((topic) => (
              <TopicCard key={topic.id} topic={topic} onOpen={() => openTopicDetails(topic)} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="unused" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {topicsData.filter(t => t.status === "unused").map((topic) => (
              <TopicCard key={topic.id} topic={topic} onOpen={() => openTopicDetails(topic)} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Load More Button / Pagination Summary */}
      <div className="flex flex-col items-center justify-center py-1 gap-3">
        <span className="text-caption text-ink-muted font-medium">Hiển thị 6 / 48 chủ đề</span>
        <Button variant="outline" className="bg-white dark:bg-slate-900/60 text-body-medium rounded-full px-8 py-5 border-slate-200 dark:border-slate-800 shadow-sm hover:bg-slate-50 transition-all">
          Tải thêm
        </Button>
      </div>

      {/* Detail Side Drawer/Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="sm:max-w-md md:max-w-lg p-0 flex flex-col h-full border-l border-slate-200/60 dark:border-slate-800/60 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-lg">
          {selectedTopic && (
            <>
              <div className="h-full flex flex-col relative">
                {/* Fixed Header Section */}
                <div className="p-6 pt-8 flex flex-col gap-2 shrink-0">
                  <div className="flex items-center gap-2">
                    <Badge className={`${selectedTopic.tagColor} border shadow-none px-2.5 py-0.5 text-caption-strong uppercase`}>
                      {selectedTopic.tag}
                    </Badge>
                  </div>
                  <h2 className="text-display-md text-ink dark:text-white leading-snug">
                    {selectedTopic.title}
                  </h2>
                </div>

                {/* Fixed Stats Section */}
                <div className="px-6 pb-6 shrink-0">
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="p-3 bg-white dark:bg-slate-900/80 shadow-sm border-slate-200/60 dark:border-slate-800/60">
                      <CardContent className="p-0 flex flex-col items-center text-center">
                        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 mb-2">
                          <HelpCircle className="size-5 text-[#2e5d97]" />
                        </div>
                        <span className="text-stat text-ink dark:text-white">{selectedTopic.questionsCount}</span>
                        <span className="text-caption text-ink-muted mt-0.5">Câu hỏi</span>
                      </CardContent>
                    </Card>
                    <Card className="p-3 bg-white dark:bg-slate-900/80 shadow-sm border-slate-200/60 dark:border-slate-800/60">
                      <CardContent className="p-0 flex flex-col items-center text-center">
                        <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 mb-2">
                          <Briefcase className="size-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <span className="text-stat text-ink dark:text-white">{selectedTopic.projectsCount || 0}</span>
                        <span className="text-caption text-ink-muted mt-0.5">Dự án</span>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Scrollable Body (fills available space) */}
                <ScrollArea className="flex-1 min-h-0 px-6">
                  <div className="space-y-6 pb-8">
                    {/* Progress Detailed section */}
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-caption-strong">
                        <span className="text-ink-secondary dark:text-slate-300">Mức độ hoàn thiện bộ câu hỏi</span>
                        <span className="text-[#2e5d97] dark:text-blue-400">{selectedTopic.completionRate}%</span>
                      </div>
                      <Progress value={selectedTopic.completionRate} className="h-2 bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        {/* Use built-in progress component from shadcn or apply gradient class if customized */}
                      </Progress>
                      <div className="flex justify-end">
                        <span className="text-caption text-ink-muted italic">Cần thêm 25 câu hỏi khó</span>
                      </div>
                    </div>

                    {/* Projects using this topic */}
                    <div className="space-y-3 mt-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-body-strong text-ink dark:text-white flex items-center gap-2">
                          Dự án đang sử dụng
                          <Badge variant="secondary" className="rounded-full h-5 min-w-5 px-1 justify-center bg-slate-200 dark:bg-slate-800 text-caption-strong">{selectedTopic.projectsCount || 0}</Badge>
                        </h3>
                      </div>

                      <div className="space-y-2">
                        {(selectedTopic.projects || []).map((proj, idx) => {
                          const ProjIcon = proj.icon || Briefcase;
                          return (
                            <div key={idx} className="group flex items-center gap-3 p-3 bg-white dark:bg-slate-900/80 rounded-xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 transition-all">
                              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 dark:group-hover:bg-blue-900/30 transition-colors">
                                <ProjIcon className="size-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-body-strong text-ink dark:text-slate-200 truncate">{proj.name}</div>
                                <div className="text-caption text-ink-muted">Sử dụng {proj.questionsUsed} câu hỏi</div>
                              </div>
                              <ChevronRight className="size-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                            </div>
                          )
                        })}

                        {(!selectedTopic.projects || selectedTopic.projects.length === 0) && (
                          <div className="text-center py-6 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl">
                            <span className="text-body text-ink-muted">Chưa có dự án nào sử dụng chủ đề này</span>
                          </div>
                        )}
                      </div>

                      {selectedTopic.projects && selectedTopic.projects.length > 0 && (
                        <Button variant="link" className="w-full text-[#2e5d97] dark:text-blue-400 text-body-medium hover:no-underline h-auto py-1">
                          Xem tất cả {selectedTopic.projectsCount} dự án
                        </Button>
                      )}
                    </div>
                  </div>
                </ScrollArea>

                {/* Fixed Footer Section at bottom of the container */}
                <div className="shrink-0 p-4 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-t border-slate-200/60 dark:border-slate-800/60 grid grid-cols-2 gap-3 z-10 mt-auto">
                  <Button variant="outline" className="h-11 text-body-strong text-ink-secondary bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg">
                    <Edit className="mr-2 size-4" /> Chỉnh sửa
                  </Button>
                  <Button className="h-11 text-body-strong bg-[#2e5d97] hover:bg-[#2e5d97]/90 text-white shadow-md rounded-lg">
                    Xem câu hỏi <ChevronRight className="ml-1 size-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

// Subcomponent: Topic Card
function TopicCard({ topic, onOpen }: { topic: typeof topicsData[0], onOpen: () => void }) {
  return (
    <Card className="group overflow-hidden flex flex-col bg-white dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 rounded-xl">
      <CardHeader className="p-0 pb-0 space-y-2 flex-none">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline" className={`${topic.tagColor} shadow-none uppercase text-caption-strong px-2.5 py-1`}>
              {topic.tag}
            </Badge>
            {topic.subTag && (
              <Badge variant="secondary" className="bg-slate-100 !text-ink-muted dark:bg-slate-800 dark:text-slate-400 text-caption-strong uppercase">
                {topic.subTag}
              </Badge>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8 rounded-full -mr-2 text-slate-400 hover:text-slate-700 dark:hover:text-white">
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem className="text-body-medium flex items-center gap-2 cursor-pointer">
                <Edit className="size-3.5" /> Sửa
              </DropdownMenuItem>
              <DropdownMenuItem className="text-body-medium flex items-center gap-2 cursor-pointer">
                <ExternalLink className="size-3.5" /> Xem chi tiết
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <CardTitle className="!text-display-sm text-ink dark:text-white line-clamp-2 group-hover:text-[#2e5d97] dark:group-hover:text-blue-400 transition-colors min-h-[2rem]">
          {topic.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 pt-0 flex-1 flex flex-col gap-4">
        <div className="flex items-center gap-4 text-ink-secondary dark:text-slate-400 text-body-medium">
          <div className="flex items-center gap-1.5">
            <HelpCircle className="size-4 text-ink-muted" />
            <span>{topic.questionsCount}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Briefcase className="size-4 text-ink-muted" />
            <span>{topic.projectsCount}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-caption-strong text-ink-muted">
            <span>Mức độ hoàn thiện</span>
            <span className="text-[#2e5d97] dark:text-blue-400">{topic.completionRate}%</span>
          </div>
          <div className="relative w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`absolute h-full top-0 left-0 rounded-full bg-gradient-to-r ${topic.colorScheme} opacity-85 transition-all duration-500 ease-out`}
              style={{ width: `${topic.completionRate}%` }}
            />
          </div>
        </div>
      </CardContent>

      <Separator className="bg-slate-200 dark:bg-slate-800 mt-2" />

      <CardFooter className="mt-2 px-1 py-2 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/20">
        <div className="flex items-center gap-2 text-caption font-medium text-ink-secondary dark:text-slate-400">
          <Avatar className={`size-6 ${topic.creator.avatarColor} text-[9px] font-bold ring-1 ring-white dark:ring-slate-900`}>
            <AvatarFallback>{topic.creator.avatar}</AvatarFallback>
          </Avatar>
          <span>{topic.creator.name}</span>
        </div>
        <Button
          variant="link"
          className="text-caption-strong text-[#2e5d97] dark:text-blue-400 p-0 h-auto gap-1 hover:no-underline group-hover:translate-x-1 transition-transform duration-300 cursor-pointer"
          onClick={onOpen}
        >
          Xem chi tiết <ChevronRight className="size-3.5" />
        </Button>
      </CardFooter>
    </Card>
  )
}
