import * as React from "react"
import { Icon } from "@/components/ui/icon"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

// ─── Types ────────────────────────────────────────────────────────────────────
interface Project {
  id: string
  name: string
  status: "Active" | "Archived"
}

interface RecentTopic {
  id: string
  name: string
  time: string
  icon: string
  iconColor: string
  iconBg: string
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const PROJECTS: Project[] = [
  { id: "p1", name: "Website Testing", status: "Active" },
  { id: "p2", name: "Mobile App", status: "Active" },
  { id: "p3", name: "Backend API", status: "Archived" },
  { id: "p4", name: "Database Design", status: "Active" },
]

const RECENT_TOPICS: RecentTopic[] = [
  {
    id: "r1",
    name: "PostgreSQL Tuning",
    time: "2 giờ trước",
    icon: "database",
    iconColor: "text-secondary",
    iconBg: "bg-[rgba(138,174,224,0.12)]",
  },
  {
    id: "r2",
    name: "React Hooks",
    time: "Hôm qua",
    icon: "code",
    iconColor: "text-[#2e5d97]",
    iconBg: "bg-[rgba(177,201,239,0.12)]",
  },
  {
    id: "r3",
    name: "RESTful Guidelines",
    time: "2 ngày trước",
    icon: "public",
    iconColor: "text-[#2e5d97]",
    iconBg: "bg-[rgba(98,142,203,0.12)]",
  },
]

const MAX_NAME_LENGTH = 255

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CreateTopicPage() {
  const [topicName, setTopicName] = React.useState("JavaScript")
  const [projectSearch, setProjectSearch] = React.useState("")
  const [selectedProjects, setSelectedProjects] = React.useState<string[]>(["p1", "p2"])
  const [showDuplicateAlert, setShowDuplicateAlert] = React.useState(true)

  // Simulated duplicate check — in real app this would be an API call
  const isDuplicate = showDuplicateAlert && topicName.trim().toLowerCase() === "javascript"

  const filteredProjects = PROJECTS.filter((p) =>
    p.name.toLowerCase().includes(projectSearch.toLowerCase())
  )

  const toggleProject = (id: string) => {
    setSelectedProjects((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const selectedCount = selectedProjects.length

  return (
    <div className="flex flex-col min-h-full">
      {/* ── Content Area ── */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[1200px] mx-auto pb-24">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-[32px] font-bold leading-tight tracking-tight text-on-surface">
              Tạo chủ đề mới
            </h1>
            <p className="text-[16px] text-ink-muted mt-1">
              Chủ đề sẽ được thêm vào danh sách hệ thống và có thể dùng trong nhiều dự án.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-12 gap-4">
            {/* ── LEFT COLUMN (7 cols) ── */}
            <div className="col-span-12 lg:col-span-7 flex flex-col gap-4">
              {/* Card 1: Basic Info Form */}
              <BentoCard>
                <CardSectionHeader
                  icon={<FileEditIcon />}
                  title="Thông tin cơ bản"
                />

                <div className="flex flex-col gap-6">
                  {/* Duplicate Warning Alert */}
                  {isDuplicate && (
                    <div className="bg-red-50/60 border border-red-200/60 rounded-xl p-3 flex items-start gap-3 animate-in slide-in-from-top-2 duration-200">
                      <Icon name="warning" className="text-red-600 mt-0.5 size-5 shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-red-700">
                          Chủ đề 'JavaScript' đã tồn tại trong hệ thống.
                        </p>
                        <p className="text-xs text-red-600/80 mt-0.5">
                          Vui lòng kiểm tra lại để tránh trùng lặp.
                        </p>
                      </div>
                      <button
                        onClick={() => setShowDuplicateAlert(false)}
                        className="text-red-400 hover:text-red-600 transition-colors p-0.5 rounded"
                      >
                        <Icon name="close" className="size-4" />
                      </button>
                    </div>
                  )}

                  {/* Topic Name Field */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <Label htmlFor="topic-name" className="text-sm font-semibold text-on-surface">
                        Tên chủ đề <span className="text-red-500">*</span>
                      </Label>
                      <span className="text-xs font-mono text-ink-muted">
                        {topicName.length}/{MAX_NAME_LENGTH}
                      </span>
                    </div>
                    <Input
                      id="topic-name"
                      value={topicName}
                      onChange={(e) => {
                        if (e.target.value.length <= MAX_NAME_LENGTH) {
                          setTopicName(e.target.value)
                        }
                      }}
                      placeholder="Nhập tên chủ đề (vd: React Hooks, RESTful API)"
                      className={`
                        h-11 rounded-lg bg-white/70 backdrop-blur-sm
                        border-[rgba(148,163,184,0.3)] text-on-surface placeholder:text-ink-muted
                        focus-visible:ring-2 focus-visible:ring-[#2e5d97]/25 focus-visible:border-[#2e5d97]
                        transition-all
                        ${isDuplicate ? "border-red-300 focus-visible:ring-red-200 focus-visible:border-red-400" : ""}
                      `}
                    />
                    <p className="text-xs text-ink-muted">
                      Tên chủ đề nên ngắn gọn và mang tính bao quát.
                    </p>
                  </div>

                  {/* Attach to Project */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-on-surface">
                      Gắn vào dự án{" "}
                      <span className="text-ink-muted font-normal">(Tùy chọn)</span>
                    </Label>

                    <div className="border border-[rgba(148,163,184,0.25)] rounded-xl bg-white/30 overflow-hidden">
                      {/* Search */}
                      <div className="px-3 py-2.5 border-b border-[rgba(148,163,184,0.2)] flex items-center gap-2 bg-white/50">
                        <Icon name="search" className="size-4 text-ink-muted shrink-0" />
                        <Input
                          value={projectSearch}
                          onChange={(e) => setProjectSearch(e.target.value)}
                          placeholder="Tìm dự án..."
                          className="border-none bg-transparent p-0 h-auto focus-visible:ring-0 text-sm text-on-surface placeholder:text-ink-muted shadow-none"
                        />
                      </div>

                      {/* Project List */}
                      <ScrollArea className="max-h-[220px]">
                        <ul>
                          {filteredProjects.map((project, idx) => (
                            <React.Fragment key={project.id}>
                              <li
                                className="flex items-center gap-3 px-4 py-3 hover:bg-[rgba(98,142,203,0.07)] transition-colors cursor-pointer"
                                onClick={() => toggleProject(project.id)}
                              >
                                <Checkbox
                                  id={`proj-${project.id}`}
                                  checked={selectedProjects.includes(project.id)}
                                  onCheckedChange={() => toggleProject(project.id)}
                                  className="data-[state=checked]:bg-[#2e5d97] data-[state=checked]:border-[#2e5d97]"
                                />
                                <label
                                  htmlFor={`proj-${project.id}`}
                                  className="flex-1 text-sm font-medium text-on-surface cursor-pointer select-none"
                                >
                                  {project.name}
                                </label>
                                <Badge
                                  variant="secondary"
                                  className={
                                    project.status === "Active"
                                      ? "text-xs font-semibold bg-[rgba(177,201,239,0.2)] text-[#2e5d97] border-none"
                                      : "text-xs font-semibold bg-slate-100 text-slate-500 border-none"
                                  }
                                >
                                  {project.status === "Active" ? "Active" : "Archived"}
                                </Badge>
                              </li>
                              {idx < filteredProjects.length - 1 && (
                                <Separator className="bg-[rgba(148,163,184,0.15)]" />
                              )}
                            </React.Fragment>
                          ))}

                          {filteredProjects.length === 0 && (
                            <li className="py-8 text-center text-sm text-ink-muted">
                              Không tìm thấy dự án phù hợp
                            </li>
                          )}
                        </ul>
                      </ScrollArea>
                    </div>
                  </div>
                </div>
              </BentoCard>

              {/* Card 2: Preview */}
              <BentoCard>
                <CardSectionHeader
                  icon={<Icon name="visibility" className="size-6 text-[#3b608d]" />}
                  title="Xem trước"
                />

                <div className="bg-slate-50/60 rounded-xl p-4 border border-[rgba(148,163,184,0.2)] flex items-start gap-4">
                  {/* Topic Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#395886] to-[#243558] flex items-center justify-center shrink-0 shadow-sm">
                    <svg
                      className="size-6 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                    </svg>
                  </div>

                  {/* Topic Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h4 className="text-[18px] font-semibold text-on-surface leading-snug">
                        {topicName || "Tên chủ đề"}
                        {topicName && " Cơ bản"}
                      </h4>
                      <Badge className="text-xs font-semibold bg-[rgba(98,142,203,0.12)] text-[#2e5d97] border border-[rgba(46,93,151,0.2)] shadow-none">
                        Mới
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-muted mb-2">
                      <div className="flex items-center gap-1">
                        <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                          <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        0 câu hỏi
                      </div>
                      <div className="w-1 h-1 rounded-full bg-slate-300" />
                      <div className="flex items-center gap-1">
                        <Icon name="folder_open" className="size-3.5" />
                        {selectedCount} dự án
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-ink-muted">
                      <div className="w-4 h-4 rounded-full bg-[#2e5d97] flex items-center justify-center text-white text-[8px] font-bold">
                        NT
                      </div>
                      <span>Tạo bởi Nguyễn Thắng · Hôm nay</span>
                    </div>
                  </div>
                </div>
              </BentoCard>
            </div>

            {/* ── RIGHT COLUMN (5 cols) ── */}
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
              {/* Card 3: Naming Guide */}
              <BentoCard>
                <CardSectionHeader
                  icon={<Icon name="lightbulb" className="size-6 text-amber-500" fill />}
                  title="Hướng dẫn đặt tên"
                />

                <ul className="space-y-4">
                  {[
                    {
                      num: 1,
                      title: "Ngắn gọn & Cụ thể",
                      desc: (
                        <>
                          Tránh các tên chung chung như "Code" hay "Lỗi". Ví dụ tốt:{" "}
                          <code className="font-mono text-xs bg-slate-100 py-0.5 px-1.5 rounded text-[#2e5d97]">
                            JavaScript ES6+
                          </code>
                        </>
                      ),
                    },
                    {
                      num: 2,
                      title: "Tính duy nhất",
                      desc: "Kiểm tra xem chủ đề tương tự đã tồn tại chưa trước khi tạo mới để tránh trùng lặp dữ liệu.",
                    },
                    {
                      num: 3,
                      title: "Gắn kèm dự án",
                      desc: "Nên liên kết chủ đề với ít nhất 1 dự án để dễ dàng quản lý phân quyền và bộ lọc sau này.",
                    },
                  ].map((item) => (
                    <li key={item.num} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[rgba(98,142,203,0.12)] text-[#2e5d97] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {item.num}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-on-surface">{item.title}</p>
                        <p className="text-sm text-ink-muted mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </BentoCard>

              {/* Card 4: Recent Topics */}
              <BentoCard>
                <CardSectionHeader
                  icon={<Icon name="history" className="size-6 text-ink-muted" />}
                  title="Chủ đề gần đây"
                />

                <ul className="space-y-1">
                  {RECENT_TOPICS.map((topic) => {
                    return (
                      <li key={topic.id}>
                        <button className="group w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50/70 transition-colors border border-transparent hover:border-[rgba(148,163,184,0.25)] text-left">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-lg ${topic.iconBg} ${topic.iconColor} flex items-center justify-center`}
                            >
                              <Icon name={topic.icon} className="size-4" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-on-surface group-hover:text-[#2e5d97] transition-colors">
                                {topic.name}
                              </p>
                              <p className="text-xs text-ink-muted">{topic.time}</p>
                            </div>
                          </div>
                          <Icon name="arrow_forward" className="size-4 text-ink-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </li>
                    )
                  })}
                </ul>

                <Separator className="my-3 bg-[rgba(148,163,184,0.2)]" />

                <Button
                  variant="ghost"
                  className="w-full text-[#2e5d97] hover:text-[#2e5d97] hover:bg-[rgba(98,142,203,0.07)] text-sm font-medium h-10 rounded-lg border border-[rgba(148,163,184,0.2)]"
                  asChild
                >
                  <a href="#">
                    Xem tất cả chủ đề
                    <Icon name="open_in_new" className="size-3.5 ml-1.5" />
                  </a>
                </Button>
              </BentoCard>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Action Bar (Sticky) ── */}
      <div className="sticky bottom-0 w-full bg-white/90 backdrop-blur-xl border-t border-[rgba(148,163,184,0.25)] px-6 py-4 flex items-center justify-end gap-4 shadow-[0_-4px_24px_-8px_rgba(0,0,0,0.08)] z-40">
        <Button
          variant="ghost"
          className="px-6 font-semibold text-ink-secondary hover:bg-slate-100 rounded-full h-10 border border-transparent hover:border-slate-200 transition-all"
        >
          Hủy
        </Button>
        <Button
          disabled={!topicName.trim() || isDuplicate}
          className="px-8 h-10 font-semibold bg-[#628ECB] hover:bg-[#4976b1] text-white rounded-full shadow-md shadow-[rgba(98,142,203,0.30)] hover:shadow-[rgba(98,142,203,0.40)] hover:-translate-y-px active:translate-y-px active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0"
        >
          Tạo chủ đề
          <Icon name="check_circle" className="size-4" />
        </Button>
      </div>
    </div>
  )
}

// ─── Small Helper Components ──────────────────────────────────────────────────

function BentoCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="bg-white/70 backdrop-blur-[12px] saturate-150 border border-white/35 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.07)] rounded-2xl hover:shadow-[0_12px_32px_-8px_rgba(15,23,42,0.12)] hover:-translate-y-0.5 transition-all duration-200">
      <CardContent className="p-0 flex flex-col gap-5">
        {children}
      </CardContent>
    </Card>
  )
}

function CardSectionHeader({
  icon,
  title,
}: {
  icon: React.ReactNode
  title: string
}) {
  return (
    <div className="flex items-center gap-3 border-b border-[rgba(148,163,184,0.2)] pb-4">
      {icon}
      <CardTitle className="text-[22px] font-semibold text-on-surface leading-none">
        {title}
      </CardTitle>
    </div>
  )
}

function FileEditIcon() {
  return (
    <svg
      className="size-6 text-[#2e5d97]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}
