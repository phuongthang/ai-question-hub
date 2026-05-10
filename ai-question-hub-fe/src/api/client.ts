import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";

// Đọc API URL từ biến môi trường của Vite
const BASE_URL = import.meta.env.VITE_API_URL as string;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Tự động đính kèm token xác thực vào Header
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Định nghĩa cấu trúc lỗi chuẩn từ Server gửi về (nếu có)
export interface ApiErrorResponse {
  message?: string;
  code?: string;
  errors?: Record<string, string[]>;
}

// Response Interceptor: Tự động trích xuất dữ liệu và xử lý lỗi hệ thống/auth
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Trả về trực tiếp phần data bên trong response để gọi API ngắn gọn hơn
    return response.data;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    const status = error.response?.status;
    const data = error.response?.data;

    // Xử lý lỗi xác thực toàn cục (ví dụ: Token hết hạn, 401 Unauthorized)
    if (status === 401) {
      console.warn("Phiên đăng nhập đã hết hạn hoặc không hợp lệ. Đang đăng xuất...");
      localStorage.removeItem("token");
      // Bạn có thể phát ra sự kiện chuyển hướng hoặc reload trang để đưa người dùng về login
      // window.location.href = "/login";
    }

    // Thiết lập cấu trúc lỗi đồng nhất để dễ xử lý ở catch/react-query
    const errorMessage = data?.message || error.message || "Đã có lỗi xảy ra, vui lòng thử lại sau.";

    // Tạo đối tượng lỗi mới chứa đầy đủ thông tin hữu ích
    const customError = {
      message: errorMessage,
      status: status,
      code: data?.code || error.code,
      details: data?.errors || null,
      originalError: error,
    };

    return Promise.reject(customError);
  }
);

// Định nghĩa các hàm helper ngắn gọn cho việc gọi API dùng chung
export const api = {
  get: <T>(url: string, config = {}): Promise<T> => apiClient.get(url, config),
  post: <T>(url: string, data = {}, config = {}): Promise<T> => apiClient.post(url, data, config),
  put: <T>(url: string, data = {}, config = {}): Promise<T> => apiClient.put(url, data, config),
  patch: <T>(url: string, data = {}, config = {}): Promise<T> => apiClient.patch(url, data, config),
  delete: <T>(url: string, config = {}): Promise<T> => apiClient.delete(url, config),
};
