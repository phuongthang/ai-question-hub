import * as React from "react"
import { AuthLayout } from "./layouts/AuthLayout"
import { Login } from "./components/Login"
import { Register } from "./components/Register"
import { Dashboard } from "./components/Dashboard"
import { DashboardLayout } from "./layouts/DashboardLayout"

function App() {
  const [currentView, setCurrentView] = React.useState<"login" | "register" | "dashboard">("login")
  const [activeMenu, setActiveMenu] = React.useState("dashboard")

  if (currentView === "dashboard") {
    return (
      <DashboardLayout
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        onLogout={() => {
          setCurrentView("login")
          setActiveMenu("dashboard")
        }}
      >
        {activeMenu === "dashboard" ? (
          <Dashboard />
        ) : (
          <div className="p-6">
            <div className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-md p-8 rounded-xl border border-white/30 dark:border-slate-800/30 shadow-sm text-center">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                Trang {activeMenu} đang được phát triển
              </h2>
              <p className="text-xs text-slate-500">
                Giao diện và các chức năng của mục này sẽ sớm được hoàn thiện.
              </p>
            </div>
          </div>
        )}
      </DashboardLayout>
    )
  }

  return (
    <AuthLayout>
      {currentView === "login" ? (
        <Login
          onNavigateToRegister={() => setCurrentView("register")}
          onLoginSuccess={() => setCurrentView("dashboard")}
        />
      ) : (
        <Register onNavigateToLogin={() => setCurrentView("login")} />
      )}
    </AuthLayout>
  )
}

export default App
