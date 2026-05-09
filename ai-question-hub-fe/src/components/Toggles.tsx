import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { Sun, Moon, Globe } from "lucide-react";

/**
 * Nút chuyển đổi giao diện Sáng / Tối (Theme Toggle)
 * Được thiết kế theo phong cách Glassmorphism với hiệu ứng xoay icon mượt mà
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="p-2 rounded-full bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 text-slate-600 dark:text-slate-300 hover:text-[#2e5d97] dark:hover:text-blue-400 hover:bg-white/90 dark:hover:bg-slate-900/90 hover:scale-105 active:scale-95 shadow-sm transition-all duration-300 cursor-pointer flex items-center justify-center shrink-0"
      title={theme === "light" ? "Chuyển sang Chế độ tối" : "Chuyển sang Chế độ sáng"}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Icon Mặt Trời */}
        <Sun className={`size-5 absolute transition-all duration-500 ease-out transform ${
          theme === "dark" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
        }`} />
        {/* Icon Mặt Trăng */}
        <Moon className={`size-5 absolute transition-all duration-500 ease-out transform ${
          theme === "light" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
        }`} />
      </div>
    </button>
  );
}

/**
 * Nút chuyển đổi ngôn ngữ Việt / Anh (Language Toggle)
 * Sử dụng icon Quả địa cầu kết hợp chữ hiển thị viết tắt cực kỳ sang trọng
 */
export function LanguageToggle() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "vi";

  const toggleLanguage = () => {
    const nextLang = currentLang.startsWith("vi") ? "en" : "vi";
    i18n.changeLanguage(nextLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      type="button"
      className="h-9 px-3 rounded-full bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 text-slate-600 dark:text-slate-300 hover:text-[#2e5d97] dark:hover:text-blue-400 hover:bg-white/90 dark:hover:bg-slate-900/90 hover:scale-[1.03] active:scale-[0.97] shadow-sm transition-all duration-300 cursor-pointer flex items-center gap-1.5 shrink-0 select-none font-sans"
      title={currentLang.startsWith("vi") ? "Switch to English" : "Chuyển sang Tiếng Việt"}
    >
      <Globe className="size-4 animate-spin-slow shrink-0" />
      <span className="text-xs font-bold tracking-wider uppercase">
        {currentLang.startsWith("vi") ? "VI" : "EN"}
      </span>
    </button>
  );
}
export { useTheme };
