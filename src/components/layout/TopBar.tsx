import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  List,
  User,
  Gear,
  SignOut,
  CaretDown,
  Sidebar,
  SidebarSimple,
} from "phosphor-react";
import Breadcrumb from "./Breadcrumb";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useAuth } from "../../context/AuthContext";


interface TopBarProps {
  onToggleSidebar: () => void;
  onToggleCollapse: () => void;
  isCollapsed: boolean;
  isSidebarOpen: boolean;
}

const TopBar: React.FC<TopBarProps> = ({
  onToggleSidebar,
  onToggleCollapse,
  isCollapsed,
  isSidebarOpen,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user: authUser, logout } = useAuth();

  const currentUser = {
    name: authUser?.name || authUser?.full_name || "کاربر نمونه",
    email: authUser?.email || "user@example.com",
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  return (
    <header
      className={`fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm shadow-lg border-b border-slate-700/50 z-20 h-16 transition-all duration-300 ${
        // Desktop: adjust based on sidebar state
        isCollapsed
          ? 'lg:right-[72px]'
          : isSidebarOpen
            ? 'lg:right-[288px]'
            : 'lg:right-[72px]'
      }`}>
      <div className="flex items-center justify-between h-full">
        {/* Left side - Mobile Toggle, Breadcrumb and Collapse button */}
        <div className="flex mr-2">
          {/* Collapse button for desktop - positioned on right */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onToggleCollapse}
                className="hidden lg:flex p-2 rounded-md hover:bg-slate-700/50 transition-colors">
                {isCollapsed ? (
                  <Sidebar size={18} className="text-gray-400" />
                ) : (
                  <SidebarSimple size={18} className="text-gray-400" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isCollapsed ? "گسترش سایدبار" : "جمع کردن سایدبار"}</p>
            </TooltipContent>
          </Tooltip>
          <div className="flex items-center">
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-md hover:bg-slate-700/50 transition-colors ml-4 lg:hidden">
              <List size={20} className="text-gray-300" />
            </button>
            <div className="hidden lg:block">
              <Breadcrumb />
            </div>
          </div>
        </div>

        {/* Right side - User Profile */}
        <div className="flex items-center px-6">
          {/* User Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-3 space-x-reverse p-2 rounded-md hover:bg-slate-700/50 transition-colors">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                {currentUser.name.charAt(0)}
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-white">
                  {currentUser.name}
                </div>
                <div className="text-xs text-gray-400">{currentUser.email}</div>
              </div>
              <CaretDown
                size={16}
                className={`text-gray-400 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg border border-slate-600 py-1 z-50">
                <Link
                  to="/profile"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-slate-700 transition-colors">
                  <User size={16} className="ml-2" />
                  پروفایل کاربری
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-slate-700 transition-colors">
                  <Gear size={16} className="ml-2" />
                  تنظیمات
                </Link>
                <hr className="my-1 border-slate-600" />
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 transition-colors">
                  <SignOut size={16} className="ml-2" />
                  خروج از حساب
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
