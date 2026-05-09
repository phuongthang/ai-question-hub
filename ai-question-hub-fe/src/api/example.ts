import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./client";

// ==========================================
// 1. Định nghĩa các Interfaces cho TypeScript
// ==========================================
export interface Question {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
}

export interface CreateQuestionInput {
  title: string;
  content: string;
  category: string;
}

// ==========================================
// 2. Custom Hooks cho các GET Requests (Queries)
// ==========================================

/**
 * Hook lấy danh sách câu hỏi
 * Thường dùng trong các trang Dashboard, List
 */
export function useGetQuestions(category?: string) {
  return useQuery<Question[]>({
    queryKey: ["questions", { category }],
    queryFn: () => {
      // Gọi qua Axios instance đã có interceptor tự động đính kèm token
      const url = category ? `/questions?category=${category}` : "/questions";
      return api.get<Question[]>(url);
    },
    // Bạn có thể override cấu hình mặc định ở đây nếu muốn
    staleTime: 1 * 60 * 1000, // Chỉ coi là dữ liệu mới trong 1 phút
  });
}

/**
 * Hook lấy chi tiết một câu hỏi theo ID
 */
export function useGetQuestionDetail(questionId: string) {
  return useQuery<Question>({
    queryKey: ["questions", "detail", questionId],
    queryFn: () => api.get<Question>(`/questions/${questionId}`),
    enabled: !!questionId, // Chỉ chạy query khi có questionId hợp lệ
  });
}

// ==========================================
// 3. Custom Hooks cho POST/PUT/DELETE (Mutations)
// ==========================================

/**
 * Hook tạo câu hỏi mới
 */
export function useCreateQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newQuestion: CreateQuestionInput) => {
      return api.post<Question>("/questions", newQuestion);
    },
    onSuccess: (data) => {
      console.log("Tạo câu hỏi thành công:", data);
      
      // Invalid cache của query danh sách câu hỏi để React Query tự động gọi lại API lấy danh sách mới nhất
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
    onError: (error: any) => {
      console.error("Lỗi khi tạo câu hỏi:", error.message);
    },
  });
}

/**
 * Hook xóa câu hỏi
 */
export function useDeleteQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (questionId: string) => {
      return api.delete<void>(`/questions/${questionId}`);
    },
    onSuccess: (_, questionId) => {
      console.log(`Xóa câu hỏi ${questionId} thành công`);
      // Invalid cache để cập nhật giao diện ngay lập tức
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
}
