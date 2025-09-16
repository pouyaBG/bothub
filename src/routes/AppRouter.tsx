import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import GradientLoader from "../components/common/GradientLoader";

const Login = lazy(() => import("../pages/Login/Login"));
const DashboardLayout = lazy(() => import("../Layout/DashboardLayout"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Profile = lazy(() => import("../pages/Profile/Profile"));

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Suspense fallback={<GradientLoader />}>
            <Login />
          </Suspense>
        }
      />

      {/* inside panel */}
      <Route element={<ProtectedRoutes />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<GradientLoader />}>
              <DashboardLayout />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<GradientLoader />}>
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
          <Route
            path="profile"
            element={
              <Suspense fallback={<GradientLoader />}>
                <Profile />
              </Suspense>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
