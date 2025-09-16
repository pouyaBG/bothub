import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import TopBar from "../components/layout/TopBar";
import Sidebar from "../components/layout/SideBar";

interface User {
  name: string;
  email: string;
  avatar?: string;
}

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [user, _setUser] = useState<User>({
    name: 'احمد محمدی',
    email: 'ahmad@example.com'
  });

  const handleSideBarToggle = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const handleSideBarCollapse = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial state

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-800 to-gray-900 rtl min-h-screen" dir="rtl">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} isCollapsed={isSidebarCollapsed} />

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={handleSideBarToggle}
        />
      )}

      {/* Main content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarCollapsed
            ? 'lg:ml-16'
            : isSidebarOpen
              ? 'lg:ml-64'
              : 'lg:ml-16'
        }`}
      >
        <TopBar
          user={user}
          onToggleSidebar={handleSideBarToggle}
          onToggleCollapse={handleSideBarCollapse}
          isCollapsed={isSidebarCollapsed}
          isSidebarOpen={isSidebarOpen}
        />

        <main className="pt-16 min-h-screen">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
