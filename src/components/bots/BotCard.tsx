import React from "react";
import {
  CheckCircle,
  XCircle,
  Power,
  Trash,
  WarningCircle,
  TelegramLogo,
  Globe,
  WhatsappLogo,
  InstagramLogo,
  Robot,
} from "phosphor-react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/button";

export interface Bot {
  id: number;
  name: string;
  username: string;
  platform: string;
  status: string;
  users: string;
  messages24h: string;
  lastActivity: string;
  lastEdit: string;
  avatar: string;
}

interface BotCardProps {
  bot: Bot;
  onDelete: (botId: number, botName: string) => void;
  onToggleStatus?: (botId: number) => void;
}

const BotCard: React.FC<BotCardProps> = ({ bot, onDelete, onToggleStatus }) => {
  const navigate = useNavigate();

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "telegram":
        return <TelegramLogo size={16} className="text-blue-500" />;
      case "website":
        return <Globe size={16} className="text-gray-300" />;
      case "whatsapp":
        return <WhatsappLogo size={16} className="text-green-500" />;
      case "instagram":
        return <InstagramLogo size={16} className="text-pink-500" />;
      default:
        return <Robot size={16} className="text-gray-500" />;
    }
  };

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case "telegram":
        return "تلگرام";
      case "website":
        return "وب‌سایت";
      case "whatsapp":
        return "واتساپ";
      case "instagram":
        return "اینستاگرام";
      default:
        return "نامشخص";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle size={20} className="text-green-500" />;
      case "inactive":
        return <XCircle size={20} className="text-red-500" />;
      case "setup_required":
        return <WarningCircle size={20} className="text-amber-500" />;
      default:
        return <XCircle size={20} className="text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "فعال";
      case "inactive":
        return "غیرفعال";
      case "setup_required":
        return "نیاز به راه‌اندازی";
      default:
        return "نامشخص";
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "active":
        return {
          backgroundColor: "#F0FDF4",
          color: "#166534",
        };
      case "inactive":
        return {
          backgroundColor: "#FEF2F2",
          color: "#991B1B",
        };
      case "setup_required":
        return {
          backgroundColor: "#FFFBEB",
          color: "#92400E",
        };
      default:
        return {
          backgroundColor: "#F3F4F6",
          color: "#374151",
        };
    }
  };

  const handleDeleteClick = () => {
    onDelete(bot.id, bot.name);
  };

  const handleToggleClick = () => {
    if (onToggleStatus) {
      onToggleStatus(bot.id);
    }
  };

  return (
    <div className="bg-gray-800 border border-slate-600 rounded-xl p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-white text-lg">{bot.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            {getPlatformIcon(bot.platform)}
            <span className="text-sm text-white">
              {getPlatformName(bot.platform)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusIcon(bot.status)}
        </div>
      </div>

      <div className="mb-4">
        <div
          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
          style={getStatusStyles(bot.status)}>
          {getStatusText(bot.status)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-500 rounded-lg p-3">
          <p className="text-sm text-white">کل کاربران</p>
          <p className="font-semibold text-gray-200 text-lg">{bot.users}</p>
        </div>
        <div className="bg-gray-500 rounded-lg p-3">
          <p className="text-sm text-white">پیام‌های ۲۴ ساعت</p>
          <p className="font-semibold text-gray-200 text-lg">
            {bot.messages24h}
          </p>
        </div>
      </div>

      <div className="mb-4 text-sm">
        <p className="text-gray-300">
          آخرین ویرایش:{" "}
          <span className="font-medium text-gray-400">{bot.lastEdit}</span>
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          variant="primary"
          size="sm"
          className="flex-1"
          onClick={() => navigate(`/bots/${bot.id}`)}>
          مدیریت
        </Button>
        <Button
          variant="secondary"
          size="sm"
          icon={<Power size={16} />}
          onClick={handleToggleClick}>
          {bot.status === "active" ? "غیرفعال" : "فعال"}
        </Button>
        <Button
          variant="danger"
          size="sm"
          icon={<Trash size={16} />}
          onClick={handleDeleteClick}>
          حذف
        </Button>
      </div>
    </div>
  );
};

export default BotCard;
