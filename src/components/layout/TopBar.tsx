import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, User, Gear, SignOut, CaretDown, CaretLeft, CaretRight } from 'phosphor-react';
import Breadcrumb from './Breadcrumb';

interface UserType {
  name: string;
  email: string;
  avatar?: string;
}

interface TopBarProps {
  user?: UserType;
  onToggleSidebar: () => void;
  onToggleCollapse: () => void;
  isCollapsed: boolean;
  isSidebarOpen: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ user, onToggleSidebar, onToggleCollapse, isCollapsed, isSidebarOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const currentUser = user || {
    name: 'کاربر نمونه',
    email: 'user@example.com'
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    navigate('/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getSidebarWidth = () => {
    if (!isSidebarOpen) return 0;
    return isCollapsed ? 64 : 256; // w-16 = 64px, w-64 = 256px
  };

  return (
    <header
      className={`fixed top-0 left-0 bg-slate-900/95 backdrop-blur-sm shadow-lg border-b border-slate-700/50 z-20 h-16 transition-all duration-300`}
      style={{
        right: `${getSidebarWidth()}px`,
      }}
    >
      <div className="flex items-center h-full">
        {/* Left side - Mobile Toggle and Breadcrumb with proper spacing */}
        <div className="flex items-center flex-1 px-6">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-md hover:bg-slate-700/50 transition-colors ml-4 lg:hidden"
          >
            <List size={20} className="text-gray-300" />
          </button>
          <div className="flex items-center space-x-4 space-x-reverse">
            <Breadcrumb />
            {/* Collapse button for desktop - right of breadcrumb */}
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex p-1.5 rounded-md hover:bg-slate-700/50 transition-colors"
              title={isCollapsed ? 'گسترش سایدبار' : 'جمع کردن سایدبار'}
            >
              {isCollapsed ? (
                <CaretLeft size={18} className="text-gray-400" />
              ) : (
                <CaretRight size={18} className="text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Right side - User Profile */}
        <div className="flex items-center px-6">
          {/* User Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-3 space-x-reverse p-2 rounded-md hover:bg-slate-700/50 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                {currentUser.name.charAt(0)}
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-white">
                  {currentUser.name}
                </div>
                <div className="text-xs text-gray-400">
                  {currentUser.email}
                </div>
              </div>
              <CaretDown
                size={16}
                className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg border border-slate-600 py-1 z-50">
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-slate-700"
                >
                  <User size={16} className="ml-2" />
                  پروفایل کاربری
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-slate-700"
                >
                  <Gear size={16} className="ml-2" />
                  تنظیمات حساب
                </a>
                <hr className="my-1 border-slate-600" />
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 transition-colors"
                >
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
