import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import { AuthLayout } from "./layouts/AuthLayout";
import { RegisterContainer } from "./pages/register/RegisterContainer";
import { Dashboard } from "./components/Dashboard";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { LoginContainer } from "./pages/login/LoginContainer";

import TopicsContainer from "./pages/topics/TopicsContainer";
import CreateTopicContainer from "./pages/topics/CreateTopicContainer";
import TopicDetailPage from "./pages/topics/TopicDetailPage";
import { EditTopicContainer } from "./pages/topics/EditTopicContainer";

// Trang placeholder cho các mục đang phát triển
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="p-6">
    <div className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-md p-8 rounded-xl border border-white/30 dark:border-slate-800/30 shadow-sm text-center">
      <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
        Trang {title} đang được phát triển
      </h2>
      <p className="text-xs text-slate-500">
        Giao diện và các chức năng của mục này sẽ sớm được hoàn thiện.
      </p>
    </div>
  </div>
);

const router = createBrowserRouter([
  // Public Routes (Sử dụng AuthLayout làm layout chung)
  {
    element: (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    ),
    children: [
      { path: "/login", element: <LoginContainer /> },
      { path: "/register", element: <RegisterContainer /> },
    ],
  },
  // Protected Routes (Sử dụng DashboardLayout làm Layout chính)
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "projects", element: <PlaceholderPage title="Dự án" /> },
      { path: "questions", element: <PlaceholderPage title="Câu hỏi" /> },
      { path: "generate", element: <PlaceholderPage title="Tạo câu hỏi" /> },
      { path: "topics", element: <TopicsContainer /> },
      { path: "topics/create", element: <CreateTopicContainer /> },
      { path: "topics/:id", element: <TopicDetailPage /> },
      { path: "topics/:id/edit", element: <EditTopicContainer /> },
      { path: "models", element: <PlaceholderPage title="Mô hình AI" /> },
      { path: "users", element: <PlaceholderPage title="Người dùng" /> },
      { path: "settings", element: <PlaceholderPage title="Cài đặt" /> },
    ],
  },
  // Fallback Route
  { path: "*", element: <Navigate to="/dashboard" replace /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
