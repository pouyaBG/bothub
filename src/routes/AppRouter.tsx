import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

const Login = lazy(() => import("../pages/Login/Login"));
const DashboardLayout = lazy(() => import("../Layout/DashboardLayout"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));

const Loader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="flex items-center space-x-2 space-x-reverse">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <span className="text-gray-600">در حال بارگذاری...</span>
    </div>
  </div>
);

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        }
      />

      {/* inside panel */}
      <Route element={<ProtectedRoutes />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <DashboardLayout />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<Loader />}>
                <Dashboard />
              </Suspense>
            }
          />

          {/* Placeholder routes for menu items */}
          <Route
            path="bots"
            element={<div className="bg-white rounded-lg shadow-sm p-6"><h1 className="text-2xl font-bold">صفحه بات‌ها</h1></div>}
          />
          <Route
            path="bots/list"
            element={<div className="bg-white rounded-lg shadow-sm p-6"><h1 className="text-2xl font-bold">لیست بات‌ها</h1></div>}
          />
          <Route
            path="bots/add"
            element={<div className="bg-white rounded-lg shadow-sm p-6"><h1 className="text-2xl font-bold">افزودن بات جدید</h1></div>}
          />
          <Route
            path="users"
            element={<div className="bg-white rounded-lg shadow-sm p-6"><h1 className="text-2xl font-bold">صفحه کاربران</h1></div>}
          />
          <Route
            path="users/list"
            element={<div className="bg-white rounded-lg shadow-sm p-6"><h1 className="text-2xl font-bold">لیست کاربران</h1></div>}
          />
          <Route
            path="users/add"
            element={<div className="bg-white rounded-lg shadow-sm p-6"><h1 className="text-2xl font-bold">افزودن کاربر</h1></div>}
          />
          <Route
            path="settings"
            element={<div className="bg-white rounded-lg shadow-sm p-6"><h1 className="text-2xl font-bold">تنظیمات</h1></div>}
          />
          <Route
            path="reports"
            element={<div className="bg-white rounded-lg shadow-sm p-6"><h1 className="text-2xl font-bold">گزارشات</h1></div>}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
