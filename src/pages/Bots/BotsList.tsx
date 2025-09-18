import {
  CheckCircle,
  Globe,
  InstagramLogo,
  Plus,
  Robot,
  TelegramLogo,
  WarningCircle,
  WhatsappLogo,
  XCircle,
} from "phosphor-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BotCard, { type Bot } from "../../components/bots/BotCard";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import Button from "../../components/ui/button";
import Dropdown from "../../components/ui/dropdown";
import Input from "../../components/ui/input";

const BotsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    botId: number | null;
    botName: string;
  }>({
    isOpen: false,
    botId: null,
    botName: "",
  });
  const navigate = useNavigate();

  const bots: Bot[] = [
    {
      id: 1,
      name: "فیلترشکن بات",
      username: "@vpn_bot",
      platform: "telegram",
      status: "active",
      users: "1.2k",
      messages24h: "234",
      lastActivity: "2 دقیقه پیش",
      lastEdit: "۱۴۰۳/۰۵/۲۳",
      avatar: "https://via.placeholder.com/48/4F46E5/ffffff?text=V",
    },
    {
      id: 2,
      name: "پشتیبانی بات",
      username: "@support_bot",
      platform: "telegram",
      status: "active",
      users: "856",
      messages24h: "89",
      lastActivity: "5 دقیقه پیش",
      lastEdit: "۱۴۰۳/۰۵/۲۰",
      avatar: "https://via.placeholder.com/48/10B981/ffffff?text=S",
    },
    {
      id: 3,
      name: "گیم بات",
      username: "@game_bot",
      platform: "telegram",
      status: "inactive",
      users: "342",
      messages24h: "0",
      lastActivity: "2 ساعت پیش",
      lastEdit: "۱۴۰۳/۰۵/۱۸",
      avatar: "https://via.placeholder.com/48/F59E0B/ffffff?text=G",
    },
    {
      id: 4,
      name: "وب‌سایت چت",
      username: "website-chat",
      platform: "website",
      status: "setup_required",
      users: "0",
      messages24h: "0",
      lastActivity: "هرگز",
      lastEdit: "۱۴۰۳/۰۵/۲۳",
      avatar: "https://via.placeholder.com/48/8B5CF6/ffffff?text=W",
    },
    {
      id: 5,
      name: "واتساپ پشتیبانی",
      username: "whatsapp-support",
      platform: "whatsapp",
      status: "active",
      users: "124",
      messages24h: "67",
      lastActivity: "۱۵ دقیقه پیش",
      lastEdit: "۱۴۰۳/۰۵/۲۱",
      avatar: "https://via.placeholder.com/48/059669/ffffff?text=W",
    },
  ];

  const handleDeleteBot = (botId: number, botName: string) => {
    setDeleteModal({ isOpen: true, botId, botName });
  };

  const handleToggleStatus = (botId: number) => {
    // Here you would actually toggle the bot status
    console.log(`Toggling status for bot with ID: ${botId}`);
    // You can add your API call here
  };

  const confirmDelete = () => {
    if (deleteModal.botId) {
      // Here you would actually delete the bot
      console.log(`Deleting bot with ID: ${deleteModal.botId}`);
      // Close modal and reset state
      setDeleteModal({ isOpen: false, botId: null, botName: "" });
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, botId: null, botName: "" });
  };

  const platformOptions = [
    {
      value: "all",
      label: "همه پلتفرم‌ها",
      icon: <Robot size={16} className="text-gray-500" />,
    },
    {
      value: "telegram",
      label: "تلگرام",
      icon: <TelegramLogo size={16} className="text-blue-500" />,
    },
    {
      value: "website",
      label: "وب‌سایت",
      icon: <Globe size={16} className="text-gray-600" />,
    },
    {
      value: "whatsapp",
      label: "واتساپ",
      icon: <WhatsappLogo size={16} className="text-green-500" />,
    },
    {
      value: "instagram",
      label: "اینستاگرام",
      icon: <InstagramLogo size={16} className="text-pink-500" />,
    },
  ];

  const statusOptions = [
    { value: "all", label: "همه وضعیت‌ها" },
    {
      value: "active",
      label: "فعال",
      icon: <CheckCircle size={16} className="text-green-500" />,
    },
    {
      value: "inactive",
      label: "غیرفعال",
      icon: <XCircle size={16} className="text-red-500" />,
    },
    {
      value: "setup_required",
      label: "نیاز به راه‌اندازی",
      icon: <WarningCircle size={16} className="text-amber-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">لیست بات‌ها</h1>
          <p className="text-gray-300 mt-1">مدیریت و نظارت بر بات‌های شما</p>
        </div>
        <Button
          variant="primary"
          size="lg"
          icon={<Plus size={20} />}
          onClick={() => navigate("/bots/add")}>
          افزودن بات جدید
        </Button>
      </div>

      <div className="my-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="جستجو در بات‌ها..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              inputSize="lg"
              className="text-black"
            />
          </div>
          <div className="flex gap-3">
            <Dropdown
              options={platformOptions}
              value={platformFilter}
              onChange={setPlatformFilter}
              placeholder="انتخاب پلتفرم"
              className="min-w-[160px]"
            />
            <Dropdown
              options={statusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="انتخاب وضعیت"
              className="min-w-[160px]"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {bots
          .filter((bot) => {
            const matchesSearch =
              bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              bot.username.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesPlatform =
              platformFilter === "all" || bot.platform === platformFilter;
            const matchesStatus =
              statusFilter === "all" || bot.status === statusFilter;
            return matchesSearch && matchesPlatform && matchesStatus;
          })
          .map((bot) => (
            <BotCard
              key={bot.id}
              bot={bot}
              onDelete={handleDeleteBot}
              onToggleStatus={handleToggleStatus}
            />
          ))}
      </div>

      {bots.filter((bot) => {
        const matchesSearch =
          bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bot.username.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPlatform =
          platformFilter === "all" || bot.platform === platformFilter;
        const matchesStatus =
          statusFilter === "all" || bot.status === statusFilter;
        return matchesSearch && matchesPlatform && matchesStatus;
      }).length === 0 && (
        <div className="text-center py-12">
          <Robot size={48} className="text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-400 mb-2">
            هیچ ربات یافت نشد
          </h3>
          <p className="text-gray-500">
            با فیلترهای انتخابی شما ربات موجود نیست
          </p>
        </div>
      )}

      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        title="حذف ربات"
        message={`آیا مطمئن هستید که می‌خواهید ربات "${deleteModal.botName}" را حذف کنید؟ این عمل قابل بازگشت نیست.`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        confirmText="حذف"
        cancelText="لغو"
        type="warning"
      />
    </div>
  );
};

export default BotsList;
