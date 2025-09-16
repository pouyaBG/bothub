import { DotsThree, MagnifyingGlass, Plus } from "phosphor-react";
import React, { useState } from "react";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const users = [
    { id: 1, name: "احمد محمدی", email: "ahmad@example.com", role: "ادمین", status: "فعال" },
    { id: 2, name: "فاطمه رضایی", email: "fateme@example.com", role: "کاربر", status: "فعال" },
    { id: 3, name: "علی کریمی", email: "ali@example.com", role: "مدیر", status: "غیرفعال" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">مدیریت کاربران</h1>
            <p className="text-gray-600 mt-1">مدیریت کاربران و دسترسی‌ها</p>
          </div>
          <Button variant="primary" size="lg" icon={<Plus size={20} />}>
            افزودن کاربر جدید
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <Input
            placeholder="جستجو در کاربران..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<MagnifyingGlass size={20} />}
            inputSize="lg"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-right py-3 px-4 font-semibold text-gray-700">کاربر</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">نقش</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">وضعیت</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{user.role}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === "فعال"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <Button variant="ghost" size="sm" icon={<DotsThree size={20} />} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;