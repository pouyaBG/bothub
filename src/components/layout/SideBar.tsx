import {
  Bell,
  CaretDown,
  ChartBar,
  ChatCircle,
  ClockCounterClockwise,
  CreditCard,
  Gear,
  Hash,
  House,
  LockKey,
  PuzzlePiece,
  Robot,
  Shield,
  SquaresFour,
  UserCircle,
} from "phosphor-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface MenuItem {
  title: string;
  path: string;
  icon: React.ComponentType<any>;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    title: "داشبورد",
    path: "/",
    icon: House,
  },
  {
    title: "مدیریت کاربران",
    path: "/user-management",
    icon: UserCircle,
    children: [
      {
        title: "لیست کاربران",
        path: "/user-management/list",
        icon: UserCircle,
      },
      {
        title: "دسترسی‌ها و ادمین‌ها",
        path: "/user-management/permissions",
        icon: Shield,
      },
    ],
  },
  {
    title: "پیام‌رسانی",
    path: "/messaging",
    icon: ChatCircle,
    children: [
      { title: "ارسال پیام", path: "/messaging/new", icon: ChatCircle },
      {
        title: "تاریخچه پیام‌ها",
        path: "/messaging/history",
        icon: ClockCounterClockwise,
      },
    ],
  },
  {
    title: "مدیریت پرداخت‌ها",
    path: "/payments",
    icon: CreditCard,
    children: [
      { title: "تراکنش‌ها", path: "/payments/transactions", icon: CreditCard },
      { title: "تنظیمات پرداخت", path: "/payments/settings", icon: Gear },
    ],
  },
  {
    title: "تنظیمات ربات",
    path: "/bot-settings",
    icon: Shield,
    children: [
      { title: "تنظیمات عمومی", path: "/bot-settings/general", icon: Gear },
      { title: "امنیت", path: "/bot-settings/security", icon: LockKey },
    ],
  },
  {
    title: "پلاگین‌ها",
    path: "/plugins",
    icon: PuzzlePiece,
    children: [
      { title: "لیست پلاگین‌ها", path: "/plugins/list", icon: PuzzlePiece },
    ],
  },
  {
    title: "مدیریت بات‌ها",
    path: "/bots",
    icon: Robot,
    children: [{ title: "لیست بات‌ها", path: "/bots/list", icon: Robot }],
  },
  {
    title: "مدیریت چنل‌ها",
    path: "/channels",
    icon: Hash,
    children: [
      { title: "لیست چنل‌ها", path: "/channels/list", icon: Hash },
      { title: "جوین اجباری", path: "/channels/mandatory-join", icon: Shield },
    ],
  },
  {
    title: "تنظیمات پنل",
    path: "/panel-settings",
    icon: SquaresFour,
  },
  {
    title: "گزارشات",
    path: "/reports",
    icon: ChartBar,
  },
  {
    title: "لاگ فعالیت‌ها",
    path: "/activity-logs",
    icon: ClockCounterClockwise,
  },
  {
    title: "اعلان‌ها",
    path: "/notifications",
    icon: Bell,
  },
];

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onNavigate?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  isCollapsed,
  onNavigate,
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const location = useLocation();

  // Auto-expand parent menus when on child pages
  React.useEffect(() => {
    const currentPath = location.pathname;
    const itemsToExpand: string[] = [];

    menuItems.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some(
          (child) => child.path === currentPath
        );
        if (hasActiveChild) {
          itemsToExpand.push(item.path);
        }
      }
    });

    setExpandedItems((prev) => {
      const newExpanded = [...prev];
      itemsToExpand.forEach((path) => {
        if (!newExpanded.includes(path)) {
          newExpanded.push(path);
        }
      });
      return newExpanded;
    });
  }, [location.pathname]);

  const toggleExpand = (path: string) => {
    setExpandedItems((prev) =>
      prev.includes(path)
        ? prev.filter((item) => item !== path)
        : [...prev, path]
    );
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isParentActive = (item: MenuItem) => {
    if (item.children) {
      return item.children.some((child) => location.pathname === child.path);
    }
    // Check if current path starts with item path (for parent items)
    return (
      location.pathname.startsWith(item.path) && location.pathname !== item.path
    );
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.path);
    const active = isActive(item.path);
    const parentActive = isParentActive(item);
    const IconComponent = item.icon;

    const menuContent = hasChildren ? (
      <div
        className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
          active || parentActive
            ? "bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-white shadow-md border border-blue-500/30 backdrop-blur-sm"
            : "text-gray-300 hover:bg-slate-700/60 hover:text-white hover:shadow-sm"
        } ${level > 0 ? "mr-5 text-sm bg-slate-800/50" : "shadow-sm"}`}
        onClick={() => toggleExpand(item.path)}>
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center w-full" : "flex-1"
          }`}>
          <IconComponent
            size={20}
            className={`flex-shrink-0 ${isCollapsed ? "" : "ml-2"}`}
          />
          {isOpen && !isCollapsed && (
            <span className="font-semibold text-sm tracking-wide">
              {item.title}
            </span>
          )}
        </div>

        {isOpen && !isCollapsed && (
          <CaretDown
            size={16}
            className={`transform transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        )}
      </div>
    ) : (
      <Link
        to={item.path}
        className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all duration-200  ${
          active || parentActive
            ? "bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-white shadow-md border border-blue-500/30 backdrop-blur-sm"
            : "text-gray-300 hover:bg-slate-700/60 hover:text-white hover:shadow-sm"
        } ${level > 0 ? "mr-5 text-sm bg-slate-800/50" : "shadow-sm"}`}
        onClick={() => {
          // Close sidebar on mobile when navigating
          if (window.innerWidth < 1024 && onNavigate) {
            onNavigate();
          }
        }}>
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center w-full" : "flex-1"
          }`}>
          <IconComponent
            size={20}
            className={`flex-shrink-0 ${isCollapsed ? "" : "ml-2"}`}
          />
          {isOpen && !isCollapsed && (
            <span className="font-semibold text-sm tracking-wide">
              {item.title}
            </span>
          )}
        </div>
      </Link>
    );

    return (
      <div key={item.path} className="mb-1 relative">
        {isCollapsed && level === 0 ? (
          <Tooltip>
            <TooltipTrigger asChild>{menuContent}</TooltipTrigger>
            <TooltipContent side="left">
              <p>{item.title}</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          menuContent
        )}

        {/* Children */}
        {hasChildren && isExpanded && isOpen && !isCollapsed && (
          <div className="mt-1 mr-2 space-y-1">
            {item.children?.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`fixed right-0 bg-gradient-to-b from-slate-900 to-slate-800 backdrop-blur-sm shadow-2xl border-l border-slate-700/30 transition-all duration-300 ${
        // Mobile: completely hide when closed, show when open
        isOpen ? "translate-x-0 w-72" : "translate-x-full w-72"
      } top-16 h-[calc(100vh-4rem)] z-10 lg:top-0 lg:h-full lg:z-30 lg:translate-x-0 ${
        // Desktop: normal collapse behavior
        isCollapsed ? "lg:w-18" : "lg:w-72"
      }`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-18 bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-600/40 shadow-lg">
          <div
            className={`transition-opacity ${
              isOpen && !isCollapsed ? "opacity-100" : "opacity-0"
            }`}>
            <h2 className="font-extrabold text-xl bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent tracking-wide">
              داشبورد بات‌ها
            </h2>
            <div className="text-center mt-1">
              <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2 flex-1 overflow-y-auto overflow-x-hidden">
          {menuItems.map((item) => renderMenuItem(item))}
        </nav>

        {/* Version info */}
        <div className="p-4 border-t border-slate-600/40 mt-auto bg-gradient-to-r from-slate-800/50 to-slate-900/50">
          <div
            className={`transition-opacity ${
              isOpen && !isCollapsed ? "opacity-100" : "opacity-0"
            }`}>
            <div className="text-center">
              <p className="text-xs text-gray-400 font-medium">نسخه 1.0.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
