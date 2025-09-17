import React, { useState } from "react";
import { Hash, Plus, Users, CheckCircle, XCircle, Eye } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";

const ChannelsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const channels = [
    {
      id: 1,
      name: "کانال اصلی",
      username: "@main_channel",
      type: "کانال",
      members: "15.2k",
      mandatory: true,
      status: "فعال",
    },
    {
      id: 2,
      name: "گروه پشتیبانی",
      username: "@support_group",
      type: "گروه",
      members: "2.5k",
      mandatory: false,
      status: "فعال",
    },
    {
      id: 3,
      name: "کانال اطلاعیه‌ها",
      username: "@news_channel",
      type: "کانال",
      members: "8.7k",
      mandatory: true,
      status: "غیرفعال",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">لیست چنل‌ها</h1>
            <p className="text-gray-600 mt-1">مدیریت چنل‌ها و گروه‌های جوین اجباری</p>
          </div>
          <Button
            variant="primary"
            size="lg"
            icon={<Plus size={20} />}
            onClick={() => navigate("/channels/add")}
          >
            افزودن چنل/گروه
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <Input
            placeholder="جستجو در چنل‌ها و گروه‌ها..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            inputSize="lg"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {channels.map((channel) => (
            <div key={channel.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Hash size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{channel.name}</h3>
                    <p className="text-sm text-gray-500">{channel.username}</p>
                  </div>
                </div>
                {channel.status === "فعال" ? (
                  <CheckCircle size={20} className="text-green-500" />
                ) : (
                  <XCircle size={20} className="text-red-500" />
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600">نوع</p>
                  <p className="font-medium text-gray-900">{channel.type}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600">اعضا</p>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Users size={16} className="text-gray-500" />
                    <span className="font-medium text-gray-900">{channel.members}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">جوین اجباری:</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    channel.mandatory
                      ? "bg-orange-100 text-orange-800"
                      : "bg-gray-100 text-gray-800"
                  }`}>
                  {channel.mandatory ? "فعال" : "غیرفعال"}
                </span>
              </div>

              <div className="flex space-x-2 space-x-reverse">
                <Button variant="primary" size="sm" icon={<Eye size={16} />}>
                  مشاهده
                </Button>
                <Button variant="secondary" size="sm">
                  ویرایش
                </Button>
                <Button
                  variant={channel.mandatory ? "danger" : "success"}
                  size="sm">
                  {channel.mandatory ? "حذف از جوین اجباری" : "افزودن به جوین اجباری"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">نکات مهم</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• کاربران باید در چنل‌های جوین اجباری عضو باشند تا بتوانند از ربات استفاده کنند</li>
            <li>• تغییر وضعیت جوین اجباری بلافاصله اعمال می‌شود</li>
            <li>• حداکثر 5 چنل/گروه می‌توانند جوین اجباری باشند</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChannelsList;