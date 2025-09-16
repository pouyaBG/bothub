import { Calendar, CurrencyDollar, TrendDown, TrendUp } from "phosphor-react";
import React, { useState } from "react";
import Input from "../../components/ui/input";
const Payments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const transactions = [
    {
      id: 1,
      amount: "150,000",
      type: "واریز",
      user: "احمد محمدی",
      date: "1403/12/15",
      status: "موفق",
    },
    {
      id: 2,
      amount: "75,000",
      type: "برداشت",
      user: "فاطمه رضایی",
      date: "1403/12/14",
      status: "موفق",
    },
    {
      id: 3,
      amount: "200,000",
      type: "واریز",
      user: "علی کریمی",
      date: "1403/12/13",
      status: "در انتظار",
    },
  ];

  const stats = [
    {
      title: "کل درآمد",
      value: "2,500,000",
      change: "+12.5%",
      icon: CurrencyDollar,
      color: "green",
    },
    {
      title: "تراکنش‌های امروز",
      value: "45",
      change: "+8.2%",
      icon: TrendUp,
      color: "blue",
    },
    {
      title: "درآمد ماهانه",
      value: "850,000",
      change: "-2.1%",
      icon: Calendar,
      color: "purple",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900">مدیریت پرداخت‌ها</h1>
          <p className="text-gray-600 mt-1">مدیریت تراکنش‌ها و درآمدها</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {stat.value}
                    </p>
                    <p
                      className={`text-sm mt-1 ${
                        stat.change.startsWith("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}>
                      {stat.change}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      stat.color === "green"
                        ? "bg-green-100 text-green-600"
                        : stat.color === "blue"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-purple-100 text-purple-600"
                    }`}>
                    <stat.icon size={24} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <Input
              placeholder="جستجو در تراکنش‌ها..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              inputSize="lg"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">
                    شناسه
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">
                    مبلغ
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">
                    نوع
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">
                    کاربر
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">
                    تاریخ
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">
                    وضعیت
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-gray-700">
                      #{transaction.id}
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-900">
                      {transaction.amount} تومان
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        {transaction.type === "واریز" ? (
                          <TrendUp size={16} className="text-green-500" />
                        ) : (
                          <TrendDown size={16} className="text-red-500" />
                        )}
                        <span
                          className={
                            transaction.type === "واریز"
                              ? "text-green-600"
                              : "text-red-600"
                          }>
                          {transaction.type}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      {transaction.user}
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      {transaction.date}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          transaction.status === "موفق"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
