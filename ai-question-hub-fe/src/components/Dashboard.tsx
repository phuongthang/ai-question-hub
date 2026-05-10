import * as React from "react"
import { Icon } from "@/components/ui/icon"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select } from "@/components/ui/select"

export function Dashboard() {
  const [quickProject, setQuickProject] = React.useState("Toán học kỳ 1")
  const [quickTopic, setQuickTopic] = React.useState("Đại số tuyến tính")
  const [quickQuantity, setQuickQuantity] = React.useState(10)

  // Simulated handle quick generate
  const handleQuickGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Đang sinh ${quickQuantity} câu hỏi cho dự án "${quickProject}" - chủ đề "${quickTopic}"...`)
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* 1. Hero Welcome Card (8x3) with reduced border-radius (rounded-xl) */}
        <div className="md:col-span-8 md:row-span-3 bg-gradient-to-br from-[#395886] to-[#243558] rounded-xl p-6 relative overflow-hidden flex flex-col justify-center min-h-[190px] shadow-md border border-[#395886]/20">
          <div className="relative z-10 text-white flex flex-col justify-between h-full">
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight mb-2">
                Chào mừng trở lại, Nguyễn Thắng! 👋
              </h1>
              <p className="text-sm text-slate-200/90 max-w-lg mb-5 font-medium leading-relaxed">
                Bạn có 12 câu hỏi AI mới được tạo trong dự án "Kiểm tra Toán học kỳ 1". Hệ thống đang sẵn sàng cho yêu cầu tiếp theo.
              </p>
            </div>
            <button className="h-10 px-5 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/35 text-white rounded-full font-semibold flex items-center gap-2 w-max transition-all duration-200 text-sm shadow-sm cursor-pointer">
              Sinh câu hỏi ngay
              <Icon name="auto_awesome" className="size-3.5 text-amber-300" />
            </button>
          </div>
          {/* Glowing Ambient Background Circles */}
          <div className="absolute -right-10 -top-10 w-48 h-48 bg-blue-400/15 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        {/* 2. Stats Tile 1 (4x1) with reduced border-radius (rounded-xl) */}
        <div className="md:col-span-4 md:row-span-1 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md p-5 rounded-xl flex items-center justify-between border border-white/30 dark:border-slate-800/30 hover:translate-y-[-1px] transition-transform duration-200 shadow-sm">
          <div>
            <p className="text-xs font-bold text-slate-500 mb-1 tracking-wider uppercase">Tổng số dự án</p>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">24</h2>
          </div>
          <div className="size-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-[#2e5d97] shadow-inner">
            <Icon name="folder_open" className="size-5" />
          </div>
        </div>

        {/* 3. Stats Tile 2 (4x2) with reduced border-radius (rounded-xl) */}
        <div className="md:col-span-4 md:row-span-2 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md p-5 rounded-xl flex flex-col justify-between border border-white/30 dark:border-slate-800/30 hover:translate-y-[-1px] transition-transform duration-200 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 mb-1 tracking-wider uppercase">Tổng số câu hỏi</p>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight mb-1.5">1,248</h2>
              <Badge variant="success" className="gap-1 px-2 py-0.5 text-xs">
                <Icon name="trending_up" className="size-3" />
                +12% tuần này
              </Badge>
            </div>
            <div className="size-10 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-500 shadow-inner">
              <Icon name="list_alt" className="size-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
              <span>Mục tiêu tháng</span>
              <span className="text-slate-800 dark:text-white">72%</span>
            </div>
            <Progress value={72} className="h-1.5" />
          </div>
        </div>

        {/* 4. Recent Projects (8x3) with reduced border-radius (rounded-xl) */}
        <div className="md:col-span-8 md:row-span-3 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md p-5 rounded-xl flex flex-col border border-white/30 dark:border-slate-800/30 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-base text-slate-800 dark:text-white tracking-tight">Dự án gần đây</h3>
            <a className="text-sm font-semibold text-[#2e5d97] hover:underline cursor-pointer" href="#all-projects">Xem tất cả</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            {/* Project Card 1 with reduced border-radius (rounded-lg) */}
            <div className="bg-white/40 dark:bg-slate-900/30 rounded-lg border border-slate-200/30 p-4 flex flex-col hover:bg-white/80 dark:hover:bg-slate-800/80 hover:shadow-sm transition-all duration-200">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="size-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-[#2e5d97] font-bold text-xs">
                  T1
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-800 dark:text-white">Toán học kỳ 1</h4>
                  <p className="text-xs text-slate-400">Code: PRJ-001</p>
                </div>
              </div>
              <p className="text-sm text-slate-500 mb-4 flex-1 line-clamp-2">
                Ngân hàng câu hỏi trắc nghiệm và tự luận cho học sinh khối 10.
              </p>
              <div className="flex justify-between items-center mt-auto">
                <Badge variant="success" className="text-xs py-0 px-2">Đang hoạt động</Badge>
                <span className="text-xs font-medium text-slate-400">2 ngày trước</span>
              </div>
            </div>

            {/* Project Card 2 with reduced border-radius (rounded-lg) */}
            <div className="bg-white/40 dark:bg-slate-900/30 rounded-lg border border-slate-200/30 p-4 flex flex-col hover:bg-white/80 dark:hover:bg-slate-800/80 hover:shadow-sm transition-all duration-200">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="size-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 font-bold text-xs">
                  VL
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-800 dark:text-white">Vật lý đại cương</h4>
                  <p className="text-xs text-slate-400">Code: PRJ-002</p>
                </div>
              </div>
              <p className="text-sm text-slate-500 mb-4 flex-1 line-clamp-2">
                Bộ 500 câu hỏi ôn tập chương động lực học chất điểm.
              </p>
              <div className="flex justify-between items-center mt-auto">
                <Badge variant="draft" className="text-xs py-0 px-2">Bản nháp</Badge>
                <span className="text-xs font-medium text-slate-400">5 ngày trước</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Quick Generate (4x3) with reduced border-radius (rounded-xl) */}
        <form onSubmit={handleQuickGenerate} className="md:col-span-4 md:row-span-3 bg-slate-900 text-white rounded-xl p-5 flex flex-col justify-between shadow-md border border-slate-800">
          <h3 className="font-bold text-base mb-3 flex items-center gap-2 text-blue-400 tracking-tight">
            <Icon name="bolt" className="size-4 text-amber-400" fill />
            Sinh nhanh
          </h3>
          <div className="flex flex-col gap-3 flex-1 mb-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Dự án</label>
              <Select
                value={quickProject}
                onChange={(e) => setQuickProject(e.target.value)}
                className="h-9 text-sm text-white border-slate-700 bg-slate-800/50"
              >
                <option value="Toán học kỳ 1" className="text-slate-900">Toán học kỳ 1</option>
                <option value="Vật lý đại cương" className="text-slate-900">Vật lý đại cương</option>
              </Select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Chủ đề</label>
              <Select
                value={quickTopic}
                onChange={(e) => setQuickTopic(e.target.value)}
                className="h-9 text-sm text-white border-slate-700 bg-slate-800/50"
              >
                <option value="Đại số tuyến tính" className="text-slate-900">Đại số tuyến tính</option>
                <option value="Giải tích" className="text-slate-900">Giải tích</option>
              </Select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Số lượng</label>
              <input
                type="number"
                min={1}
                max={50}
                value={quickQuantity}
                onChange={(e) => setQuickQuantity(Number(e.target.value))}
                className="w-full h-9 px-3 rounded-lg border border-white/20 bg-white/10 focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm font-medium transition-all"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full h-9 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all duration-200 text-sm shadow-sm hover:translate-y-[-0.5px] cursor-pointer"
          >
            Sinh câu hỏi
            <Icon name="auto_awesome" className="size-3.5" />
          </button>
        </form>

        {/* 6. Activity Feed (4x4) with reduced border-radius (rounded-xl) */}
        <div className="md:col-span-4 md:row-span-4 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md p-5 rounded-xl flex flex-col border border-white/30 dark:border-slate-800/30 shadow-sm min-h-[280px]">
          <h3 className="font-bold text-base text-slate-800 dark:text-white tracking-tight mb-4">Hoạt động gần đây</h3>
          <div className="flex flex-col gap-3.5 overflow-y-auto pr-1">
            {/* Log Item 1 */}
            <div className="flex gap-3 items-start pb-3 border-b border-slate-100 dark:border-slate-800/30 last:border-0">
              <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 shrink-0"></div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-slate-800 dark:text-white leading-snug">Sinh 15 câu hỏi mới</p>
                <p className="text-xs text-slate-400 mt-0.5">Dự án: Toán học kỳ 1</p>
                <span className="text-[10px] font-medium text-slate-400 block mt-0.5">10 phút trước</span>
              </div>
            </div>

            {/* Log Item 2 */}
            <div className="flex gap-3 items-start pb-3 border-b border-slate-100 dark:border-slate-800/30 last:border-0">
              <div className="w-2 h-2 mt-1.5 rounded-full bg-amber-500 shrink-0"></div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-slate-800 dark:text-white leading-snug">Chỉnh sửa nội dung câu hỏi</p>
                <p className="text-xs text-slate-400 mt-0.5">Mã: Q-1029</p>
                <span className="text-[10px] font-medium text-slate-400 block mt-0.5">1 giờ trước</span>
              </div>
            </div>

            {/* Log Item 3 */}
            <div className="flex gap-3 items-start pb-3 border-b border-slate-100 dark:border-slate-800/30 last:border-0">
              <div className="w-2 h-2 mt-1.5 rounded-full bg-emerald-500 shrink-0"></div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-slate-800 dark:text-white leading-snug">Duyệt lô câu hỏi Vật lý</p>
                <p className="text-xs text-slate-400 mt-0.5">Người duyệt: Admin</p>
                <span className="text-[10px] font-medium text-slate-400 block mt-0.5">3 giờ trước</span>
              </div>
            </div>

            {/* Log Item 4 */}
            <div className="flex gap-3 items-start last:border-0">
              <div className="w-2 h-2 mt-1.5 rounded-full bg-indigo-500 shrink-0"></div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-slate-800 dark:text-white leading-snug">Tạo dự án mới</p>
                <p className="text-xs text-slate-400 mt-0.5">Hóa học hữu cơ</p>
                <span className="text-[10px] font-medium text-slate-400 block mt-0.5">Hôm qua</span>
              </div>
            </div>
          </div>
        </div>

        {/* 7. Question Stats / Source Distribution (4x2) with reduced border-radius (rounded-xl) */}
        <div className="md:col-span-4 md:row-span-2 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md p-5 rounded-xl flex flex-col justify-center border border-white/30 dark:border-slate-800/30 shadow-sm">
          <h3 className="font-bold text-xs text-slate-500 mb-3 tracking-wider uppercase">Phân bổ nguồn gốc</h3>
          <div className="flex items-center gap-5">
            {/* Simulated Donut Chart */}
            <div className="relative size-20 rounded-full shadow-inner shrink-0" style={{ background: "conic-gradient(#2e5d97 0% 65%, #8AAEE0 65% 90%, #e2e2e7 90% 100%)" }}>
              <div className="absolute inset-1.5 bg-white/95 dark:bg-slate-900 rounded-full flex flex-col items-center justify-center shadow-md">
                <span className="font-bold text-base text-slate-800 dark:text-white">1.2K</span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-medium text-slate-500">
                  <span className="size-2 rounded-full bg-[#2e5d97]"></span> AI Sinh
                </span>
                <span className="font-bold text-slate-800 dark:text-white">65%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-medium text-slate-500">
                  <span className="size-2 rounded-full bg-[#8AAEE0]"></span> Thủ công
                </span>
                <span className="font-bold text-slate-800 dark:text-white">25%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-medium text-slate-500">
                  <span className="size-2 rounded-full bg-[#e2e2e7] dark:bg-slate-700"></span> Chờ duyệt
                </span>
                <span className="font-bold text-slate-800 dark:text-white">10%</span>
              </div>
            </div>
          </div>
        </div>

        {/* 8. AI Models (4x2) with reduced border-radius (rounded-xl) */}
        <div className="md:col-span-4 md:row-span-2 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md p-5 rounded-xl flex flex-col border border-white/30 dark:border-slate-800/30 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-xs text-slate-500 tracking-wider uppercase">Mô hình AI</h3>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/50 dark:bg-slate-900/40 border border-slate-200/30">
              <div className="flex items-center gap-2">
                <Icon name="smart_toy" className="size-4 text-[#2e5d97]" />
                <span className="font-mono text-xs font-semibold text-slate-800 dark:text-white">GPT-4o</span>
              </div>
              <Badge variant="success" className="text-xs py-0 px-2">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/50 dark:bg-slate-900/40 border border-slate-200/30">
              <div className="flex items-center gap-2">
                <Icon name="memory" className="size-4 text-violet-500" />
                <span className="font-mono text-xs font-semibold text-slate-800 dark:text-white">Claude 3.5 Sonnet</span>
              </div>
              <Badge variant="draft" className="text-xs py-0 px-2">Standby</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
