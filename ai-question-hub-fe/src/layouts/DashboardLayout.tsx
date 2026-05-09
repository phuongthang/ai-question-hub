import * as React from "react"
import {
  BrainCircuit,
  LayoutDashboard,
  Folder,
  HelpCircle,
  Sparkles,
  ListTodo,
  Cpu,
  Users,
  Settings,
  LogOut,
  Home,
  ChevronRight,
  Search,
  Bell,
  PanelLeftClose,
  PanelLeft
} from "lucide-react"
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useTranslation } from "react-i18next"
import { ThemeToggle, LanguageToggle } from "../components/Toggles"
import { useAuthStore } from "../stores/authStore"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export function DashboardLayout({
  children
}: DashboardLayoutProps) {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const [isHovered, setIsHovered] = React.useState(false)

  const hoverTimeoutRef = React.useRef<any>(null)

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true)
    }, 450)
  }

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    setIsHovered(false)
  }

  React.useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  const menuItems = [
    { id: "dashboard", label: t("sidebar.dashboard"), icon: LayoutDashboard },
    { id: "projects", label: t("sidebar.projects"), icon: Folder },
    { id: "questions", label: t("sidebar.questions"), icon: HelpCircle },
    { id: "generate", label: t("sidebar.generate"), icon: Sparkles },
    { id: "topics", label: t("sidebar.topics"), icon: ListTodo },
    { id: "models", label: t("sidebar.models"), icon: Cpu },
    { id: "users", label: t("sidebar.users"), icon: Users },
  ]

  const activeMenu = location.pathname.split("/")[1] || "dashboard"

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const showFullText = !isCollapsed || isHovered

  const sidebarWidthClass = isCollapsed
    ? isHovered
      ? "w-64 shadow-2xl z-50"
      : "w-20"
    : "w-64"

  const mainMarginClass = isCollapsed ? "md:ml-20" : "md:ml-64"

  const userAvatar = user?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuBeh_DdUfOkeyLYccPWRR2dgrQpb7d12vuoIti1h8RwhuHJig5rnJUX-S5rQf9bAj3oVmqHjLK8dfIdW_5GKDaLaMikR06lazODXrbELXk-iGjWMv9qB9cjmfplgGAj1rCNv_x7L7ctB-Gm4h2vCZjWfrEjpOOYxjHBt8LWCtIj7OHuCe-hYJC-GUz3yA0WpdgL4K8bl7aRmILjG01T-pV785Xj9Y9iaLVKSQOvnN1fV8ZdMWfo1Vh3oRp94KE7WJPnTdPNjs4mxtw"
  const userName = user?.name || "Nguyễn Thắng"
  const userFallback = userName.substring(0, 2).toUpperCase()
  const userRole = user?.role || "common.admin"

  return (
    <div className="min-h-screen text-slate-900 flex font-sans antialiased bg-background w-full">
      {/* Decorative Blur Blobs for background depth */}
      <div className="fixed top-20 left-10 w-[500px] h-[500px] blob-indigo rounded-full blur-[100px] opacity-30 pointer-events-none z-0"></div>
      <div className="fixed bottom-10 right-10 w-[400px] h-[400px] blob-teal rounded-full blur-[80px] opacity-20 pointer-events-none z-0"></div>

      {/* Side Navigation Bar with hover handlers */}
      <nav
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`fixed left-0 top-0 h-full ${sidebarWidthClass} bg-white/85 dark:bg-slate-950/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-800/50 shadow-md flex flex-col py-6 transition-all duration-300 ease-in-out z-40 hidden md:flex`}
      >
        {/* Logo and Workspace Title */}
        <div className={`w-full mb-6 flex items-center transition-all duration-300 overflow-hidden ${showFullText ? "px-4 gap-3" : "px-5 gap-0"}`}>
          <div className="w-10 h-10 rounded-lg logo-gradient flex items-center justify-center shadow-md shrink-0">
            <BrainCircuit className="text-white size-6" />
          </div>
          <div className={`flex flex-col transition-all duration-300 ease-in-out overflow-hidden ${showFullText ? "opacity-100 max-w-[150px] ml-1" : "opacity-0 max-w-0 ml-0"}`}>
            <span className="font-semibold text-base text-[#2e5d97] dark:text-blue-400 tracking-tight leading-none whitespace-nowrap">{t("common.workspace")}</span>
            <span className="text-xs text-slate-500 font-medium mt-1 whitespace-nowrap">AI Question Pro</span>
          </div>
        </div>

        {/* Menu Links */}
        <div className="flex-1 overflow-y-auto px-3 flex flex-col gap-1 transition-all duration-300">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeMenu === item.id
            return (
              <Link
                key={item.id}
                to={`/${item.id}`}
                className={`flex items-center w-full h-10 rounded-lg font-medium text-sm transition-all duration-300 cursor-pointer overflow-hidden ${
                  showFullText ? "px-4 gap-3" : "px-[18px] gap-0"
                } ${
                  isActive
                    ? "bg-[#2e5d97] text-white shadow-[0_2px_8px_rgba(46,93,151,0.2)]"
                    : "text-slate-600 dark:text-slate-400 hover:bg-[#2e5d97]/10 dark:hover:bg-slate-800/60 hover:translate-x-0.5"
                }`}
                title={!showFullText ? item.label : undefined}
              >
                <Icon className={`size-5 shrink-0 ${isActive ? "text-white" : "text-slate-500"}`} />
                <span className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${showFullText ? "opacity-100 max-w-[120px]" : "opacity-0 max-w-0"}`}>
                  {item.label}
                </span>
              </Link>
            )
          })}

          {/* Settings at the bottom of list */}
          <Link
            to="/settings"
            className={`flex items-center w-full h-10 rounded-lg font-medium text-sm transition-all duration-300 cursor-pointer overflow-hidden mt-auto ${
              showFullText ? "px-4 gap-3" : "px-[18px] gap-0"
            } ${
              activeMenu === "settings"
                ? "bg-[#2e5d97] text-white"
                : "text-slate-600 dark:text-slate-400 hover:bg-[#2e5d97]/10 dark:hover:bg-slate-800/60 hover:translate-x-0.5"
            }`}
            title={!showFullText ? t("sidebar.settings") : undefined}
          >
            <Settings className="size-5 shrink-0 text-slate-500" />
            <span className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${showFullText ? "opacity-100 max-w-[120px]" : "opacity-0 max-w-0"}`}>
              {t("sidebar.settings")}
            </span>
          </Link>
        </div>

        {/* Admin profile and Logout */}
        <div className="px-4 mt-6 pt-4 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-col transition-all duration-300">
          <div className={`flex items-center w-full transition-all duration-300 mb-4 overflow-hidden ${showFullText ? "px-2 gap-3" : "px-[6px] gap-0"}`}>
            <Avatar className="size-9 ring-2 ring-[#2e5d97]/10 shrink-0" title={!showFullText ? `${userName} (${t(userRole)})` : undefined}>
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback>{userFallback}</AvatarFallback>
            </Avatar>
            <div className={`flex flex-col transition-all duration-300 ease-in-out overflow-hidden ${showFullText ? "opacity-100 max-w-[120px]" : "opacity-0 max-w-0"}`}>
              <span className="font-semibold text-sm leading-none text-slate-900 dark:text-white whitespace-nowrap">{userName}</span>
              <span className="text-[11px] text-slate-500 mt-1 whitespace-nowrap">{t(userRole)}</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className={`flex items-center text-red-500 hover:bg-red-500/10 rounded-lg transition-all duration-300 font-semibold text-sm cursor-pointer overflow-hidden w-full h-10 px-4 ${
              showFullText ? "gap-3" : "gap-0"
            }`}
            title={!showFullText ? t("sidebar.logout") : undefined}
          >
            <LogOut className="size-4 shrink-0" />
            <span className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${showFullText ? "opacity-100 max-w-[120px]" : "opacity-0 max-w-0"}`}>
              {t("sidebar.logout")}
            </span>
          </button>
        </div>
      </nav>

      {/* Main Content Area with transition and dynamic margins */}
      <main className={`flex-1 ${mainMarginClass} flex flex-col min-h-screen relative z-10 transition-all duration-300 ease-in-out`}>
        {/* Top Header Navigation */}
        <header className="h-16 flex items-center justify-between px-6 bg-white/40 dark:bg-slate-950/30 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 sticky top-0 z-30">
          {/* Breadcrumbs with Collapse Button */}
          <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 -ml-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              title={isCollapsed ? "Mở rộng thanh bên" : "Thu hẹp thanh bên"}
            >
              {isCollapsed ? <PanelLeft className="size-5 text-[#2e5d97]" /> : <PanelLeftClose className="size-5 text-[#2e5d97]" />}
            </button>
            <Home className="size-4 cursor-pointer hover:text-[#2e5d97] transition-colors" />
            <ChevronRight className="size-4 text-slate-400" />
            <span className="text-slate-800 dark:text-white font-semibold capitalize">{activeMenu}</span>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-md mx-6 hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("common.searchPlaceholder")}
                className="w-full h-10 pl-10 pr-4 rounded-full bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 focus:outline-none focus:border-[#2e5d97] focus:ring-1 focus:ring-[#2e5d97] text-sm text-slate-800 dark:text-white placeholder:text-slate-400 transition-all"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <ThemeToggle />
            <button className="relative p-2 rounded-full hover:bg-white/60 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-400 transition-all" title={t("common.notifications") || "Notifications"}>
              <Bell className="size-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            <Avatar className="size-8 md:hidden">
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback>{userFallback}</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Content Children */}
        <div className="flex-1">
          {children || <Outlet />}
        </div>
      </main>
    </div>
  )
}
