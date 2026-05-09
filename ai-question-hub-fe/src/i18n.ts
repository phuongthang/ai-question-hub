import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  vi: {
    translation: {
      common: {
        searchPlaceholder: "Tìm kiếm dự án, câu hỏi...",
        notifications: "Thông báo",
        workspace: "Không gian",
        admin: "Quản trị viên",
        underDevelopmentTitle: "Trang {{name}} đang được phát triển",
        underDevelopmentDesc: "Giao diện và các chức năng của mục này sẽ sớm được hoàn thiện.",
        success: "Thành công",
        loading: "Đang tải...",
        or: "hoặc",
      },
      auth: {
        loginTitle: "Đăng nhập",
        loginWelcome: "Chào mừng trở lại!",
        emailLabel: "Email hoặc tên đăng nhập",
        emailPlaceholder: "Nhập email của bạn",
        passwordLabel: "Mật khẩu",
        passwordPlaceholder: "Nhập mật khẩu",
        rememberMe: "Ghi nhớ đăng nhập",
        forgotPassword: "Quên mật khẩu?",
        loginButton: "Đăng nhập",
        noAccount: "Chưa có tài khoản?",
        registerNow: "Đăng ký ngay",
        registerTitle: "Đăng ký",
        registerWelcome: "Tạo tài khoản mới và bắt đầu ngay",
        fullNameLabel: "Họ và tên",
        fullNamePlaceholder: "Nhập họ và tên của bạn",
        confirmPasswordLabel: "Xác nhận mật khẩu",
        confirmPasswordPlaceholder: "Nhập lại mật khẩu",
        agreeToTerms: "Tôi đồng ý với các Điều khoản & Chính sách",
        haveAccount: "Đã có tài khoản?",
        loginNow: "Đăng nhập ngay",
        registerButton: "Đăng ký tài khoản",
        registerSuccess: "Đăng ký thành công!",
        loginSuccess: "Đăng nhập thành công!",
      },
      sidebar: {
        dashboard: "Tổng quan",
        projects: "Dự án",
        questions: "Câu hỏi của tôi",
        generate: "Tạo bằng AI",
        topics: "Chủ đề",
        models: "Mô hình AI",
        users: "Thành viên",
        settings: "Cài đặt",
        logout: "Đăng xuất",
      },
    },
  },
  en: {
    translation: {
      common: {
        searchPlaceholder: "Search projects, questions...",
        notifications: "Notifications",
        workspace: "Workspace",
        admin: "Administrator",
        underDevelopmentTitle: "Page {{name}} is under development",
        underDevelopmentDesc: "The interface and functionalities for this section will be completed soon.",
        success: "Success",
        loading: "Loading...",
        or: "or",
      },
      auth: {
        loginTitle: "Login",
        loginWelcome: "Welcome back!",
        emailLabel: "Email or username",
        emailPlaceholder: "Enter your email",
        passwordLabel: "Password",
        passwordPlaceholder: "Enter password",
        rememberMe: "Remember me",
        forgotPassword: "Forgot password?",
        loginButton: "Sign In",
        noAccount: "Don't have an account?",
        registerNow: "Register now",
        registerTitle: "Register",
        registerWelcome: "Create a new account and get started",
        fullNameLabel: "Full Name",
        fullNamePlaceholder: "Enter your full name",
        confirmPasswordLabel: "Confirm Password",
        confirmPasswordPlaceholder: "Re-enter password",
        agreeToTerms: "I agree to the Terms & Policies",
        haveAccount: "Already have an account?",
        loginNow: "Login now",
        registerButton: "Create Account",
        registerSuccess: "Registration successful!",
        loginSuccess: "Login successful!",
      },
      sidebar: {
        dashboard: "Dashboard",
        projects: "Projects",
        questions: "My Questions",
        generate: "AI Generate",
        topics: "Topics",
        models: "AI Models",
        users: "Users",
        settings: "Settings",
        logout: "Logout",
      },
    },
  },
};

i18n
  .use(LanguageDetector) // Tự động phát hiện ngôn ngữ của trình duyệt
  .use(initReactI18next) // Tích hợp với react-i18next
  .init({
    resources,
    fallbackLng: "vi", // Ngôn ngữ mặc định nếu không phát hiện được
    interpolation: {
      escapeValue: false, // React đã tự động chống XSS
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
export type { Question } from "./api/example";
