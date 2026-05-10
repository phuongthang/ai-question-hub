import * as React from "react"
import { Icon } from "@/components/ui/icon"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function TopicDetailPage() {
  return (
    <div className="p-6 flex flex-col gap-6 min-h-full pb-12">
      {/* Hero Topic Tile */}
      <div className="bg-gradient-to-br from-[#395886] to-[#243558] rounded-xl p-8 shadow-md flex flex-col md:flex-row md:items-end justify-between gap-6 relative overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-teal-200/20 rounded-full blur-2xl translate-y-1/2 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-semibold text-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Active
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white font-normal text-xs">
              ID: TOPIC-JS-01
            </span>
          </div>
          <h1 className="text-[32px] font-bold text-white mb-2 leading-tight tracking-tight">JavaScript</h1>
          <div className="flex items-center gap-4 text-blue-200 text-sm font-medium">
            <div className="flex items-center gap-1.5">
              <Icon name="person" className="size-[18px]" />
              <span>Nguyễn Thắng</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-blue-200/50"></div>
            <div className="flex items-center gap-1.5">
              <Icon name="calendar_today" className="size-[18px]" />
              <span>12/04/2026</span>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 flex flex-col md:items-end gap-4">
          <div className="flex flex-wrap gap-4">
            <div className="bg-slate-900/20 backdrop-blur-md border border-white/10 rounded-lg p-3 min-w-[120px]">
              <p className="text-xs text-blue-200 mb-1">Câu hỏi</p>
              <p className="text-[28px] font-bold text-white leading-none">128</p>
            </div>
            <div className="bg-slate-900/20 backdrop-blur-md border border-white/10 rounded-lg p-3 min-w-[120px]">
              <p className="text-xs text-blue-200 mb-1">Dự án dùng</p>
              <p className="text-[28px] font-bold text-white leading-none">8</p>
            </div>
            <div className="bg-slate-900/20 backdrop-blur-md border border-white/10 rounded-lg p-3 min-w-[120px]">
              <p className="text-xs text-blue-200 mb-1">Tỷ lệ AI tạo</p>
              <div className="flex items-baseline gap-2">
                <p className="text-[28px] font-bold text-white leading-none">65%</p>
                <Icon name="psychology" className="text-teal-300 size-4" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20 text-white font-semibold transition-colors flex items-center gap-1.5 border hover:text-white shadow-none h-10">
              <Icon name="edit" className="size-4" />
              Chỉnh sửa
            </Button>
            <Button variant="outline" size="icon" className="bg-red-500/10 hover:bg-red-500/20 border-red-500/30 text-red-400 hover:text-red-400 transition-colors border shadow-none h-10 w-10">
              <Icon name="delete" className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-4">
        {/* Left Panel (Col 3) */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
          {/* Thông tin Card */}
          <Card className="rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 h-fit">
            <CardHeader className="p-5 pb-0 flex flex-row items-center gap-2">
              <Icon name="info" className="text-[#2e5d97] size-5" />
              <CardTitle className="text-lg font-semibold text-ink dark:text-white mt-0">Thông tin</CardTitle>
            </CardHeader>
            <CardContent className="p-5 flex flex-col gap-3">
              <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
                <p className="text-xs text-ink-muted mb-1">Tên chủ đề</p>
                <p className="text-sm font-semibold text-ink dark:text-white">JavaScript Cơ Bản & Nâng Cao</p>
              </div>
              <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
                <p className="text-xs text-ink-muted mb-1">Phân loại</p>
                <Badge className="bg-[#2e5d97]/10 text-[#2e5d97] hover:bg-[#2e5d97]/20 shadow-none font-mono font-medium rounded">Programming</Badge>
              </div>
              <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
                <p className="text-xs text-ink-muted mb-1">Ngày tạo</p>
                <p className="text-sm text-ink dark:text-slate-200">10/04/2026</p>
              </div>
              <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
                <p className="text-xs text-ink-muted mb-1">Cập nhật lần cuối</p>
                <p className="text-sm text-ink dark:text-slate-200">14/04/2026 15:30</p>
              </div>
              <div className="pt-2">
                <p className="text-xs text-ink-muted mb-2">Người quản lý</p>
                <div className="flex items-center gap-3">
                  <Avatar className="size-8 ring-1 ring-slate-200 dark:ring-slate-800">
                    <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmXr4Ds891YOhBeZ7dZcUtoEJofi7WxBbQ6LWSJCK3ydAfwxwlXzn_7SHrp7TqNkN64Oz4fKU0sIhIfSvXs7k_N3U228xsm4iqxUJ1U06oeaXtpcbssQWd_5Y2MPi2ITKXzskAqedopN3dy4WX3rLG9xOHrevBilaNuiyT8mElncLM_aG9zUZxJVPyjWQ72A_6DWQv5ZD-ZiIdcUXCLKLm8EnOL27xx9D9UKPi_kIBlXpDs58nAfPTU9LZEXPFh4mAsfPR3XCRzLpw" alt="Nguyễn Thắng" />
                    <AvatarFallback>NT</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-ink dark:text-white">Nguyễn Thắng</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dự án sử dụng Card */}
          <Card className="rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col gap-0 flex-1">
            <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="folder_special" className="text-[#2e5d97] size-5" />
                <CardTitle className="text-lg font-semibold text-ink dark:text-white mt-0">Dự án sử dụng</CardTitle>
              </div>
              <Badge variant="secondary" className="text-xs font-semibold text-ink-muted px-2 py-0.5 rounded shadow-none">4</Badge>
            </CardHeader>
            
            <CardContent className="p-5 pt-0 flex flex-col gap-2 h-full">
              <div className="flex flex-col gap-2">
              {/* Project Item */}
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700 group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/20 flex items-center justify-center border border-blue-200 dark:border-blue-800/50">
                    <span className="font-mono text-[#2e5d97] dark:text-blue-400 font-bold text-sm">Wb</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink dark:text-slate-200 group-hover:text-[#2e5d97] dark:group-hover:text-blue-400 transition-colors">Web Frontend</p>
                    <p className="font-mono text-[11px] text-ink-muted">PRJ-001</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">45 Qs</span>
              </div>
              
              {/* Project Item */}
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700 group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-100/50 to-orange-100/30 dark:from-amber-900/30 dark:to-orange-900/10 flex items-center justify-center border border-amber-200 dark:border-amber-800/30">
                    <span className="font-mono text-amber-600 font-bold text-sm">Nd</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink dark:text-slate-200 group-hover:text-[#2e5d97] dark:group-hover:text-blue-400 transition-colors">NodeJS Backend</p>
                    <p className="font-mono text-[11px] text-ink-muted">PRJ-004</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">32 Qs</span>
              </div>
              
              {/* Project Item */}
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700 group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-100/50 to-teal-100/30 dark:from-emerald-900/30 dark:to-teal-900/10 flex items-center justify-center border border-emerald-200 dark:border-emerald-800/30">
                    <span className="font-mono text-emerald-600 font-bold text-sm">Rn</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink dark:text-slate-200 group-hover:text-[#2e5d97] dark:group-hover:text-blue-400 transition-colors">React Native App</p>
                    <p className="font-mono text-[11px] text-ink-muted">PRJ-012</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">28 Qs</span>
              </div>
            </div>
            
            <Button variant="ghost" className="mt-auto text-[#2e5d97] dark:text-blue-400 hover:text-[#2e5d97]/80 hover:bg-[#2e5d97]/5 transition-colors flex items-center justify-center gap-1 w-full mt-2">
              Xem tất cả dự án
              <Icon name="arrow_forward" className="size-4" />
            </Button>
            </CardContent>
          </Card>
        </div>

        {/* Center Panel (Col 6) */}
        <div className="col-span-12 lg:col-span-6 flex flex-col">
          <Card className="rounded-xl shadow-sm flex flex-col h-full border-none bg-transparent dark:bg-transparent">
            {/* Header & Actions */}
            <div className="flex flex-col gap-4 mb-4 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="format_list_bulleted" className="text-[#2e5d97] size-6" />
                  <h2 className="text-[22px] font-semibold text-ink dark:text-white leading-none">Danh sách câu hỏi</h2>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" className="h-9 border-[#2e5d97] text-[#2e5d97] hover:bg-[#2e5d97]/10 flex items-center gap-1.5 shadow-none dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400/10">
                    <Icon name="add" className="size-[18px]" />
                    Thêm
                  </Button>
                  <Button className="h-9 bg-[#2e5d97] hover:bg-[#264f82] text-white shadow-md flex items-center gap-1.5 transition-all">
                    <Icon name="auto_awesome" className="size-[18px]" />
                    Sinh thêm ✦
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="relative w-full sm:w-64">
                  <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-ink-muted" />
                  <Input 
                    placeholder="Tìm câu hỏi..." 
                    className="pl-9 h-9 bg-white/50 dark:bg-slate-900/50 shadow-none focus-visible:ring-[#2e5d97]/40" 
                  />
                </div>
                <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1 rounded-lg border border-slate-200 dark:border-slate-700 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none px-4 py-1.5 rounded-md bg-white dark:bg-slate-700 shadow-sm text-sm font-medium text-ink dark:text-white transition-all">Tất cả</button>
                  <button className="flex-1 sm:flex-none px-4 py-1.5 rounded-md text-slate-500 hover:text-ink dark:text-slate-400 dark:hover:text-white text-sm font-medium transition-all flex items-center justify-center gap-1.5">
                    <Icon name="psychology" className="size-3.5" />
                    AI tạo
                  </button>
                  <button className="flex-1 sm:flex-none px-4 py-1.5 rounded-md text-slate-500 hover:text-ink dark:text-slate-400 dark:hover:text-white text-sm font-medium transition-all">Thủ công</button>
                </div>
              </div>
            </div>

            {/* Questions List */}
            <div className="flex flex-col gap-4 overflow-y-auto pr-1" style={{ maxHeight: "600px" }}>
              {/* Question Card 1 */}
              <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-lg p-4 hover:border-[#2e5d97]/40 transition-all group">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs text-[#2e5d97] bg-[#2e5d97]/10 px-2 py-0.5 rounded font-semibold">Q-042</span>
                    <span className="px-2 py-0.5 rounded bg-teal-100/50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 font-semibold text-xs flex items-center gap-1 border border-teal-200/50 dark:border-teal-800/50">
                      <Icon name="psychology" className="size-3.5" />
                      AI Generated
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs border border-slate-200 dark:border-slate-700">
                      GPT-4o
                    </span>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 text-slate-400 hover:text-[#2e5d97] rounded transition-colors"><Icon name="edit" className="size-[18px]" /></button>
                    <button className="p-1 text-slate-400 hover:text-red-500 rounded transition-colors"><Icon name="delete" className="size-[18px]" /></button>
                  </div>
                </div>
                <p className="text-sm font-semibold text-ink dark:text-slate-200 mb-4 leading-relaxed">Kết quả của biểu thức `typeof null` trong JavaScript là gì?</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
                    <span className="w-6 h-6 flex items-center justify-center rounded bg-white dark:bg-slate-700 shadow-sm font-mono text-xs font-semibold shrink-0">A</span>
                    <span className="text-sm text-slate-600 dark:text-slate-300">"null"</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/40 relative">
                    <span className="w-6 h-6 flex items-center justify-center rounded bg-emerald-500 text-white shadow-sm font-mono text-xs font-semibold shrink-0">B</span>
                    <span className="text-sm font-semibold text-ink dark:text-slate-200">"object"</span>
                    <Icon name="check_circle" className="absolute right-3 text-emerald-500 size-5" />
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
                    <span className="w-6 h-6 flex items-center justify-center rounded bg-white dark:bg-slate-700 shadow-sm font-mono text-xs font-semibold shrink-0">C</span>
                    <span className="text-sm text-slate-600 dark:text-slate-300">"undefined"</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
                    <span className="w-6 h-6 flex items-center justify-center rounded bg-white dark:bg-slate-700 shadow-sm font-mono text-xs font-semibold shrink-0">D</span>
                    <span className="text-sm text-slate-600 dark:text-slate-300">Lỗi cú pháp (Syntax Error)</span>
                  </div>
                </div>
              </div>

              {/* Question Card 2 */}
              <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-lg p-4 hover:border-[#2e5d97]/40 transition-all group">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs text-[#2e5d97] bg-[#2e5d97]/10 px-2 py-0.5 rounded font-semibold">Q-043</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold text-xs flex items-center gap-1 border border-slate-200 dark:border-slate-700">
                      <Icon name="person" className="size-3.5" />
                      Manual
                    </span>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 text-slate-400 hover:text-[#2e5d97] rounded transition-colors"><Icon name="edit" className="size-[18px]" /></button>
                    <button className="p-1 text-slate-400 hover:text-red-500 rounded transition-colors"><Icon name="delete" className="size-[18px]" /></button>
                  </div>
                </div>
                <p className="text-sm font-semibold text-ink dark:text-slate-200 mb-4 leading-relaxed">Đâu là cách khai báo biến có phạm vi block (block-scoped) trong ES6?</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
                    <span className="w-6 h-6 flex items-center justify-center rounded bg-white dark:bg-slate-700 shadow-sm font-mono text-xs font-semibold shrink-0">A</span>
                    <span className="text-sm font-mono text-slate-600 dark:text-slate-300">var</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/40 relative">
                    <span className="w-6 h-6 flex items-center justify-center rounded bg-emerald-500 text-white shadow-sm font-mono text-xs font-semibold shrink-0">B</span>
                    <span className="text-sm font-mono font-bold text-ink dark:text-slate-200">let</span>
                    <Icon name="check_circle" className="absolute right-3 text-emerald-500 size-[18px]" />
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
                    <span className="w-6 h-6 flex items-center justify-center rounded bg-white dark:bg-slate-700 shadow-sm font-mono text-xs font-semibold shrink-0">C</span>
                    <span className="text-sm font-mono text-slate-600 dark:text-slate-300">const</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
                    <span className="w-6 h-6 flex items-center justify-center rounded bg-white dark:bg-slate-700 shadow-sm font-mono text-xs font-semibold shrink-0">D</span>
                    <span className="text-sm text-slate-600 dark:text-slate-300">Cả B và C</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Panel (Col 3) */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
          {/* Thống kê Card */}
          <Card className="rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
            <CardHeader className="p-5 pb-3 flex flex-row items-center gap-2">
              <Icon name="pie_chart" className="text-[#2e5d97] size-5" />
              <CardTitle className="text-lg font-semibold text-ink dark:text-white mt-0">Thống kê</CardTitle>
            </CardHeader>
            
            <CardContent className="p-5 pt-0">
              <div className="flex flex-col items-center gap-6">
              <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Simulated Donut Chart using Tailwind borders */}
                <div className="absolute inset-0 rounded-full border-[12px] border-slate-100 dark:border-slate-800"></div>
                <div className="absolute inset-0 rounded-full border-[12px] border-transparent border-t-[#2e5d97] border-r-[#2e5d97] rotate-45"></div>
                <div className="absolute inset-0 rounded-full border-[12px] border-transparent border-b-teal-400 border-l-teal-400 -rotate-12"></div>
                
                <div className="text-center z-10 flex flex-col items-center justify-center">
                  <span className="text-[28px] font-bold text-ink dark:text-white leading-none">128</span>
                  <span className="text-xs text-ink-muted mt-1">Tổng số</span>
                </div>
              </div>
              
              <div className="w-full flex flex-col gap-3">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#2e5d97]"></div>
                    <span className="font-medium text-ink dark:text-slate-200">AI tạo</span>
                  </div>
                  <span className="font-mono font-bold text-ink dark:text-white">83 (65%)</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-teal-400"></div>
                    <span className="font-medium text-ink dark:text-slate-200">Thủ công</span>
                  </div>
                  <span className="font-mono font-bold text-ink dark:text-white">35 (27%)</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                    <span className="font-medium text-ink dark:text-slate-200">Chờ duyệt</span>
                  </div>
                  <span className="font-mono font-bold text-ink dark:text-white">10 (8%)</span>
                </div>
              </div>
              </div>
            </CardContent>
          </Card>

          {/* Hoạt động gần đây Card */}
          <Card className="rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 flex-1 flex flex-col">
            <CardHeader className="p-5 pb-3 flex flex-row items-center gap-2">
              <Icon name="history" className="text-[#2e5d97] size-5" />
              <CardTitle className="text-lg font-semibold text-ink dark:text-white mt-0">Hoạt động gần đây</CardTitle>
            </CardHeader>
            
            <CardContent className="p-5 pt-0 relative border-l border-slate-200 dark:border-slate-700 ml-7 pl-4 flex flex-col gap-5 mt-2 h-full">
              {/* Timeline Item */}
              <div className="relative">
                <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#2e5d97] ring-4 ring-white dark:ring-slate-900"></div>
                <p className="text-sm font-semibold text-ink dark:text-slate-200">Sinh 20 câu hỏi bằng AI</p>
                <p className="text-xs text-ink-muted mt-0.5">Nguyễn Thắng • 2 giờ trước</p>
                <div className="mt-2 bg-[#2e5d97]/10 border border-[#2e5d97]/20 rounded px-2 py-1 inline-block">
                  <span className="text-xs font-semibold text-[#2e5d97] dark:text-blue-400 flex items-center gap-1">
                    <Icon name="psychology" className="size-3" /> GPT-4o
                  </span>
                </div>
              </div>
              
              {/* Timeline Item */}
              <div className="relative">
                <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-slate-900"></div>
                <p className="text-sm font-semibold text-ink dark:text-slate-200">Gắn vào dự án "Web Frontend"</p>
                <p className="text-xs text-ink-muted mt-0.5">Trần Nam • Hôm qua, 14:30</p>
              </div>
              
              {/* Timeline Item */}
              <div className="relative">
                <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600 ring-4 ring-white dark:ring-slate-900"></div>
                <p className="text-sm font-semibold text-ink dark:text-slate-200">Cập nhật nội dung câu Q-012</p>
                <p className="text-xs text-ink-muted mt-0.5">Lê Hoa • 12/04/2026</p>
              </div>
              
              {/* Timeline Item */}
              <div className="relative">
                <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600 ring-4 ring-white dark:ring-slate-900"></div>
                <p className="text-sm font-semibold text-ink dark:text-slate-200">Tạo chủ đề</p>
                <p className="text-xs text-ink-muted mt-0.5">Nguyễn Thắng • 10/04/2026</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
