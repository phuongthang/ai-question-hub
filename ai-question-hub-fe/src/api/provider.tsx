import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Khởi tạo QueryClient duy nhất cho toàn bộ ứng dụng
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Tránh tự động gọi lại API khi người dùng click/quay lại tab ứng dụng
      refetchOnWindowFocus: false,
      
      // Số lần tự động thử lại khi API gặp lỗi (mặc định thử lại tối đa 1 lần)
      retry: 0,
      
      // Thời gian dữ liệu được coi là "mới" (staleTime: 5 phút).
      // Trong thời gian này, React Query sẽ dùng cache thay vì gọi lại API.
      staleTime: 5 * 60 * 1000,
      
      // Thời gian lưu trữ dữ liệu cache trong bộ nhớ (gcTime: 10 phút)
      gcTime: 10 * 60 * 1000,
    },
    mutations: {
      // Mặc định không thử lại đối với các hành động ghi đè dữ liệu (POST/PUT/DELETE)
      retry: 0,
    },
  },
});

interface QueryProviderProps {
  children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Devtools giúp theo dõi các query, cache, mutation trong môi trường development */}
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
    </QueryClientProvider>
  );
}
