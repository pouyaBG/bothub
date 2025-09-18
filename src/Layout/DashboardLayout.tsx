import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import TopBar from "../components/layout/TopBar";
import Sidebar from "../components/layout/SideBar";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSideBarToggle = () => {
    if (window.innerWidth < 1024) {
      // On mobile, always open fully (not collapsed)
      setIsSidebarOpen(prev => !prev);
      setIsSidebarCollapsed(false);
    } else {
      setIsSidebarOpen(prev => !prev);
    }
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
    <div className="bg-gray-900 text-white rtl min-h-screen" dir="rtl">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        onNavigate={() => setIsSidebarOpen(false)}
      />

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-5 lg:hidden"
          onClick={handleSideBarToggle}
        />
      )}

      {/* Main content */}
      <div
        className={`transition-all duration-300 ${
          // Mobile: no margin (centered)
          'mr-0'
        } ${
          // Desktop: margin based on sidebar state
          isSidebarCollapsed
            ? 'lg:mr-18'
            : isSidebarOpen
              ? 'lg:mr-72'
              : 'lg:mr-18'
        }`}
      >
        <TopBar
          onToggleSidebar={handleSideBarToggle}
          onToggleCollapse={handleSideBarCollapse}
          isCollapsed={isSidebarCollapsed}
          isSidebarOpen={isSidebarOpen}
        />

        <main className="pt-16 min-h-screen">
          <div className="p-4 lg:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
