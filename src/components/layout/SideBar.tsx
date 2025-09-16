import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  House,
  Robot,
  Users,
  Gear,
  ChartBar,
  List,
  Plus,
  CaretDown
} from 'phosphor-react';

interface MenuItem {
  title: string;
  path: string;
  icon: React.ComponentType<any>;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    title: 'داشبورد',
    path: '/',
    icon: House
  },
  {
    title: 'بات‌ها',
    path: '/bots',
    icon: Robot,
    children: [
      { title: 'لیست بات‌ها', path: '/bots/list', icon: List },
      { title: 'افزودن بات جدید', path: '/bots/add', icon: Plus }
    ]
  },
  {
    title: 'کاربران',
    path: '/users',
    icon: Users,
    children: [
      { title: 'لیست کاربران', path: '/users/list', icon: List },
      { title: 'افزودن کاربر', path: '/users/add', icon: Plus }
    ]
  },
  {
    title: 'تنظیمات',
    path: '/settings',
    icon: Gear
  },
  {
    title: 'گزارشات',
    path: '/reports',
    icon: ChartBar
  }
];

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, isCollapsed }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const location = useLocation();

  const toggleExpand = (path: string) => {
    setExpandedItems(prev =>
      prev.includes(path)
        ? prev.filter(item => item !== path)
        : [...prev, path]
    );
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isParentActive = (item: MenuItem) => {
    if (item.children) {
      return item.children.some(child => location.pathname === child.path);
    }
    return false;
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.path);
    const active = isActive(item.path);
    const parentActive = isParentActive(item);
    const IconComponent = item.icon;

    return (
      <div key={item.path} className="mb-1 relative group">
        <div
          className={`flex items-center justify-between px-3 py-2.5 rounded-md cursor-pointer transition-all duration-200 ${
            active || parentActive
              ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-sm'
              : 'text-gray-300 hover:bg-slate-700/50 hover:text-white'
          } ${level > 0 ? 'mr-4 text-sm' : ''}`}
          onClick={() => {
            if (hasChildren) {
              toggleExpand(item.path);
            }
          }}
        >
          <Link
            to={item.path}
            className={`flex items-center flex-1 ${hasChildren ? 'pointer-events-none' : ''}`}
            onClick={(e) => hasChildren && e.preventDefault()}
          >
            <IconComponent size={18} className="ml-3" />
            {isOpen && !isCollapsed && (
              <span className="font-medium text-sm">{item.title}</span>
            )}
          </Link>

          {hasChildren && isOpen && !isCollapsed && (
            <CaretDown
              size={16}
              className={`transform transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          )}
        </div>

        {/* Tooltip for collapsed state */}
        {isCollapsed && level === 0 && (
          <div className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50">
            <div className="bg-slate-800 text-white text-sm px-3 py-2 rounded-md shadow-lg border border-slate-600 whitespace-nowrap">
              {item.title}
              <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2">
                <div className="w-2 h-2 bg-slate-800 border-r border-b border-slate-600 transform rotate-45"></div>
              </div>
            </div>
          </div>
        )}

        {/* Children */}
        {hasChildren && isExpanded && isOpen && !isCollapsed && (
          <div className="mt-1 mr-2 space-y-1">
            {item.children?.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`fixed right-0 top-0 h-full bg-slate-900/95 backdrop-blur-sm shadow-2xl transition-all duration-300 z-30 ${
        isCollapsed ? 'w-16' : isOpen ? 'w-64' : 'w-16'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700/50">
          <div className={`transition-opacity ${isOpen && !isCollapsed ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              داشبورد بات‌ها
            </h2>
          </div>
        </div>

        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          {menuItems.map(item => renderMenuItem(item))}
        </nav>

        {/* Version info */}
        <div className="p-3 border-t border-slate-700/50 mt-auto">
          <div className={`transition-opacity ${isOpen && !isCollapsed ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-xs text-gray-400 text-center">
              نسخه 1.0.0
            </p>
            <p className="text-xs text-gray-500 text-center mt-1">
              © 2025 داشبورد بات‌ها
            </p>
          </div>
          {(isCollapsed || !isOpen) && (
            <div className="flex justify-center">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;