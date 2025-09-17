import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import GradientLoader from "../components/common/GradientLoader";
import ProtectedRoutes from "./ProtectedRoutes";

const Login = lazy(() => import("../pages/Login/Login"));
const DashboardLayout = lazy(() => import("../Layout/DashboardLayout"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const UserManagement = lazy(
  () => import("../pages/UserManagement/UserManagement")
);
const Messaging = lazy(() => import("../pages/Messaging/Messaging"));
const Payments = lazy(() => import("../pages/Payments/Payments"));
const BotSettings = lazy(() => import("../pages/BotSettings/BotSettings"));

const Plugins = lazy(() => import("../pages/Plugins/Plugins"));
const Channels = lazy(() => import("../pages/Channels/Channels"));
const ActivityLogs = lazy(() => import("../pages/ActivityLogs/ActivityLogs"));
const Notifications = lazy(
  () => import("../pages/Notifications/Notifications")
);
const BotsList = lazy(() => import("../pages/Bots/BotsList"));
const PluginsList = lazy(() => import("../pages/Plugins/PluginsList"));
const ChannelsList = lazy(() => import("../pages/Channels/ChannelsList"));
const UsersList = lazy(() => import("../pages/UserManagement/UsersList"));

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
          }>
          <Route
            index
            element={
              <Suspense fallback={<GradientLoader />}>
                <Dashboard />
              </Suspense>
            }
          />

          {/* User Management Routes */}
          <Route
            path="user-management"
            element={
              <Suspense fallback={<GradientLoader />}>
                <UserManagement />
              </Suspense>
            }
          />
          <Route
            path="user-management/list"
            element={
              <Suspense fallback={<GradientLoader />}>
                <UsersList />
              </Suspense>
            }
          />
          <Route
            path="user-management/add"
            element={
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold">افزودن کاربر</h1>
              </div>
            }
          />
          <Route
            path="user-management/permissions"
            element={
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold">دسترسی‌ها و ادمین‌ها</h1>
              </div>
            }
          />

          {/* Messaging Routes */}
          <Route
            path="messaging"
            element={
              <Suspense fallback={<GradientLoader />}>
                <Messaging />
              </Suspense>
            }
          />
          <Route
            path="messaging/new"
            element={
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold">ارسال پیام جدید</h1>
              </div>
            }
          />
          <Route
            path="messaging/history"
            element={
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold">تاریخچه پیام‌ها</h1>
              </div>
            }
          />

          {/* Payments Routes */}
          <Route
            path="payments"
            element={
              <Suspense fallback={<GradientLoader />}>
                <Payments />
              </Suspense>
            }
          />
          <Route
            path="payments/transactions"
            element={
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold">تراکنش‌ها</h1>
              </div>
            }
          />
          <Route
            path="payments/settings"
            element={
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold">تنظیمات پرداخت</h1>
              </div>
            }
          />

          {/* Bot Settings Routes */}
          <Route
            path="bot-settings"
            element={
              <Suspense fallback={<GradientLoader />}>
                <BotSettings />
              </Suspense>
            }
          />
          <Route
            path="bot-settings/general"
            element={
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold">تنظیمات عمومی</h1>
              </div>
            }
          />
          <Route
            path="bot-settings/security"
            element={
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold">امنیت</h1>
              </div>
            }
          />

          {/* Plugins Routes */}
          <Route
            path="plugins"
            element={
              <Suspense fallback={<GradientLoader />}>
                <Plugins />
              </Suspense>
            }
          />
          <Route
            path="plugins/list"
            element={
              <Suspense fallback={<GradientLoader />}>
                <PluginsList />
              </Suspense>
            }
          />
          <Route
            path="plugins/add"
            element={
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold">افزودن پلاگین</h1>
              </div>
            }
          />

          {/* Bots Routes */}
          <Route
            path="bots"
            element={
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold">مدیریت بات‌ها</h1>
              </div>
            }
          />
          <Route
            path="bots/list"
            element={
              <Suspense fallback={<GradientLoader />}>
                <BotsList />
              </Suspense>
            }
          />
          <Route
            path="bots/add"
            element={
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold">افزودن بات جدید</h1>
              </div>
            }
          />

          {/* Channels Routes */}
          <Route
            path="channels"
            element={
              <Suspense fallback={<GradientLoader />}>
                <Channels />
              </Suspense>
            }
          />
          <Route
            path="channels/list"
            element={
              <Suspense fallback={<GradientLoader />}>
                <ChannelsList />
              </Suspense>
            }
          />
          <Route
            path="channels/add"
            element={
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold">افزودن چنل/گروه جدید</h1>
              </div>
            }
          />
          <Route
            path="channels/mandatory-join"
            element={
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold">جوین اجباری</h1>
              </div>
            }
          />

          {/* Reports Route */}
          <Route
            path="reports"
            element={
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold">گزارشات</h1>
              </div>
            }
          />

          {/* Activity Logs Route */}
          <Route
            path="activity-logs"
            element={
              <Suspense fallback={<GradientLoader />}>
                <ActivityLogs />
              </Suspense>
            }
          />

          {/* Notifications Route */}
          <Route
            path="notifications"
            element={
              <Suspense fallback={<GradientLoader />}>
                <Notifications />
              </Suspense>
            }
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
