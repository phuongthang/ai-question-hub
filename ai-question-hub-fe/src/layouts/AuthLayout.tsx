import * as React from "react"
import { ThemeToggle, LanguageToggle } from "../components/Toggles"

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="bg-page-gradient min-h-screen w-full flex items-center justify-center relative overflow-hidden font-sans text-foreground select-none">
      {/* Toggles ở góc trên bên phải */}
      <div className="absolute top-6 right-6 flex items-center gap-3 z-20">
        <LanguageToggle />
        <ThemeToggle />
      </div>

      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] blob-indigo -translate-y-1/4 translate-x-1/4 rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] blob-teal translate-y-1/4 -translate-x-1/4 rounded-full pointer-events-none" />
      
      {/* Centered Content Container */}
      <div className="w-full max-w-[440px] px-6 py-8 relative z-10">
        {children}
      </div>
    </div>
  )
}
