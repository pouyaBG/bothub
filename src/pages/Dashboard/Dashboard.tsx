import {
  ChatCircle,
  Clock,
  Target,
  TrendUp,
  UserPlus,
  Users,
} from "phosphor-react";
import React from "react";

// Analytics Components
import BarChart from "../../components/analytics/BarChart";
import ChartCard from "../../components/analytics/ChartCard";
import ConversionTracking from "../../components/analytics/ConversionTracking";
import ExportReports from "../../components/analytics/ExportReports";
import FunnelChart from "../../components/analytics/FunnelChart";
import KPICard from "../../components/analytics/KPICard";
import LineChart from "../../components/analytics/LineChart";
import MetricCard from "../../components/analytics/MetricCard";
import PieChart from "../../components/analytics/PieChart";
import PopularCommands from "../../components/analytics/PopularCommands";

const Dashboard: React.FC = () => {

  // KPI Data
  const kpiData = [
    {
      title: "کاربران جدید امروز",
      value: "247",
      change: "+23%",
      changeText: "نسبت به دیروز",
      icon: UserPlus,
      color: "blue" as const,
      trend: "up" as const,
    },
    {
      title: "کل کاربران فعال",
      value: "12,847",
      change: "+8.2%",
      changeText: "نسبت به ماه گذشته",
      icon: Users,
      color: "green" as const,
      trend: "up" as const,
    },
    {
      title: "کل پیام‌ها",
      value: "89,632",
      change: "+15.3%",
      changeText: "نسبت به هفته گذشته",
      icon: ChatCircle,
      color: "purple" as const,
      trend: "up" as const,
    },
    {
      title: "نرخ تعامل",
      value: "73.2%",
      change: "-2.1%",
      changeText: "نسبت به ماه گذشته",
      icon: TrendUp,
      color: "yellow" as const,
      trend: "down" as const,
    },
  ];

  // Chart Data
  const newUsersData = [
    { name: '۱ بهمن', newUsers: 45 },
    { name: '۲ بهمن', newUsers: 89 },
    { name: '۳ بهمن', newUsers: 67 },
    { name: '۴ بهمن', newUsers: 123 },
    { name: '۵ بهمن', newUsers: 78 },
    { name: '۶ بهمن', newUsers: 156 },
    { name: '۷ بهمن', newUsers: 134 },
  ];

  const activeUsersData = [
    { name: '۱ بهمن', daily: 1250, monthly: 8500 },
    { name: '۲ بهمن', daily: 1340, monthly: 8650 },
    { name: '۳ بهمن', daily: 1180, monthly: 8420 },
    { name: '۴ بهمن', daily: 1420, monthly: 8780 },
    { name: '۵ بهمن', daily: 1350, monthly: 8690 },
    { name: '۶ بهمن', daily: 1580, monthly: 8920 },
    { name: '۷ بهمن', daily: 1620, monthly: 9100 },
  ];

  const messageVolumeData = [
    { name: '۶ صبح', value: 320 },
    { name: '۹ صبح', value: 450 },
    { name: '۱۲ ظهر', value: 680 },
    { name: '۳ عصر', value: 890 },
    { name: '۶ عصر', value: 1200 },
    { name: '۹ شب', value: 950 },
    { name: '۱۲ شب', value: 420 },
  ];

  const userDistributionData = [
    { name: '۱-۵ پیام', value: 2400, color: '#60A5FA' },
    { name: '۶-۲۰ پیام', value: 4200, color: '#34D399' },
    { name: '۲۱-۵۰ پیام', value: 1800, color: '#FBBF24' },
    { name: '۵۱+ پیام', value: 600, color: '#F87171' },
  ];

  const funnelStages = [
    { label: 'شروع گفتگو', value: 10000, percentage: 100, color: '#3B82F6' },
    { label: 'ارسال پیام دوم', value: 8000, percentage: 80, color: '#10B981' },
    { label: 'استفاده از قابلیت کلیدی', value: 5000, percentage: 50, color: '#F59E0B' },
    { label: 'بازگشت در هفته بعد', value: 2000, percentage: 20, color: '#EF4444' },
  ];

  const responseTypeData = [
    { name: 'پاسخ متنی', value: 4500, color: '#8B5CF6' },
    { name: 'دکمه‌ها', value: 3200, color: '#06B6D4' },
    { name: 'عکس/فایل', value: 1800, color: '#84CC16' },
    { name: 'اتصال به پشتیبانی', value: 500, color: '#F97316' },
  ];

  const popularCommands = [
    { name: 'شروع', count: 2340, percentage: 100 },
    { name: 'راهنما', count: 1890, percentage: 81 },
    { name: 'پشتیبانی', count: 1456, percentage: 62 },
    { name: 'محصولات', count: 1230, percentage: 53 },
    { name: 'تماس', count: 890, percentage: 38 },
  ];

  const responseTimeData = [
    { name: '۱ بهمن', avgTime: 2.1 },
    { name: '۲ بهمن', avgTime: 1.9 },
    { name: '۳ بهمن', avgTime: 2.3 },
    { name: '۴ بهمن', avgTime: 2.0 },
    { name: '۵ بهمن', avgTime: 1.8 },
    { name: '۶ بهمن', avgTime: 2.2 },
    { name: '۷ بهمن', avgTime: 2.3 },
  ];

  const conversionGoals = [
    {
      name: 'هدف کاربران جدید (ماهانه)',
      current: 2847,
      target: 3000,
      percentage: 94.9,
      color: '#3B82F6',
    },
    {
      name: 'هدف نرخ تعامل',
      current: 73.2,
      target: 75,
      percentage: 97.6,
      color: '#10B981',
    },
    {
      name: 'هدف نرخ تبدیل',
      current: 45,
      target: 60,
      percentage: 75,
      color: '#F59E0B',
    },
  ];

  // Event Handlers
  const handleExportPDF = () => {
    console.log('Exporting PDF report...');
    // TODO: Implement PDF export
  };

  const handleExportCSV = () => {
    console.log('Exporting CSV data...');
    // TODO: Implement CSV export
  };

  const handleScheduleReport = (config: {
    frequency: 'weekly' | 'monthly';
    email: string;
    reportType: 'summary' | 'detailed';
  }) => {
    console.log('Scheduling report:', config);
    // TODO: Implement report scheduling
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">تحلیل و گزارشات</h1>
          <p className="text-gray-300 mt-1">آمار عملکرد و تحلیل رفتار کاربران</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="روند کاربران جدید">
          <LineChart
            data={newUsersData}
            lines={[{ dataKey: 'newUsers', stroke: '#3b82f6', name: 'کاربران جدید' }]}
          />
        </ChartCard>

        <ChartCard title="کاربران فعال (روزانه/ماهانه)">
          <LineChart
            data={activeUsersData}
            lines={[
              { dataKey: 'daily', stroke: '#10b981', name: 'روزانه' },
              { dataKey: 'monthly', stroke: '#8b5cf6', name: 'ماهانه' },
            ]}
          />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="حجم پیام‌ها در طول روز">
          <BarChart data={messageVolumeData} color="#3b82f6" />
        </ChartCard>

        <ChartCard title="توزیع کاربران بر اساس تعداد پیام">
          <PieChart data={userDistributionData} />
        </ChartCard>
      </div>

      {/* User Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="قیف ریزش کاربران">
          <FunnelChart stages={funnelStages} />
        </ChartCard>

        <ChartCard title="محبوب‌ترین دستورات">
          <PopularCommands commands={popularCommands} />
        </ChartCard>
      </div>

      {/* Engagement Analytics */}
      <div className="bg-gray-800 rounded-2xl shadow-sm border border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-6">تحلیل تعامل و پیام‌ها</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">توزیع پاسخ‌های ربات</h3>
            <PieChart data={responseTypeData} />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">میانگین زمان پاسخگویی</h3>
            <LineChart
              data={responseTimeData}
              lines={[{ dataKey: 'avgTime', stroke: '#f59e0b', name: 'زمان پاسخ (ثانیه)' }]}
              height={250}
            />
          </div>
        </div>

        {/* Engagement Metrics */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            title="متوسط زمان پاسخ"
            value="2.3 ثانیه"
            icon={Clock}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <MetricCard
            title="نرخ رضایت کاربران"
            value="87.5%"
            icon={Target}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <MetricCard
            title="متوسط پیام‌ها در جلسه"
            value="4.7"
            icon={ChatCircle}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
        </div>
      </div>

      {/* Conversion Tracking */}
      <ConversionTracking goals={conversionGoals} />

      {/* Export Reports - Bottom Section */}
      <ExportReports
        onExportPDF={handleExportPDF}
        onExportCSV={handleExportCSV}
        onScheduleReport={handleScheduleReport}
      />
    </div>
  );
};

export default Dashboard;