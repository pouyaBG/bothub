// Mock analytics service - replace with actual API calls

interface TimeRange {
  startDate: Date;
  endDate: Date;
}

interface KPIData {
  title: string;
  value: string;
  change: string;
  changeText: string;
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'yellow';
  trend: 'up' | 'down';
}

interface ChartDataPoint {
  name: string;
  [key: string]: any;
}

interface UserDistribution {
  name: string;
  value: number;
  color: string;
}

interface FunnelStage {
  label: string;
  value: number;
  percentage: number;
  color: string;
}

interface PopularCommand {
  name: string;
  count: number;
  percentage: number;
}

interface ResponseType {
  name: string;
  value: number;
  color: string;
}

interface Goal {
  name: string;
  current: number;
  target: number;
  percentage: number;
  color: string;
}

class AnalyticsService {
  async getKPIs(_timeRange: TimeRange): Promise<KPIData[]> {
    // Mock data - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            title: "کاربران جدید امروز",
            value: "247",
            change: "+23%",
            changeText: "نسبت به دیروز",
            icon: "UserPlus",
            color: "blue",
            trend: "up",
          },
          {
            title: "کل کاربران فعال",
            value: "12,847",
            change: "+8.2%",
            changeText: "نسبت به ماه گذشته",
            icon: "Users",
            color: "green",
            trend: "up",
          },
          {
            title: "کل پیام‌ها",
            value: "89,632",
            change: "+15.3%",
            changeText: "نسبت به هفته گذشته",
            icon: "ChatCircle",
            color: "purple",
            trend: "up",
          },
          {
            title: "نرخ تعامل",
            value: "73.2%",
            change: "-2.1%",
            changeText: "نسبت به ماه گذشته",
            icon: "TrendUp",
            color: "yellow",
            trend: "down",
          },
        ]);
      }, 500);
    });
  }

  async getNewUsersTrend(_timeRange: TimeRange): Promise<ChartDataPoint[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { name: '۱ بهمن', newUsers: 45 },
          { name: '۲ بهمن', newUsers: 89 },
          { name: '۳ بهمن', newUsers: 67 },
          { name: '۴ بهمن', newUsers: 123 },
          { name: '۵ بهمن', newUsers: 78 },
          { name: '۶ بهمن', newUsers: 156 },
          { name: '۷ بهمن', newUsers: 134 },
        ]);
      }, 300);
    });
  }

  async getActiveUsers(_timeRange: TimeRange): Promise<ChartDataPoint[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { name: '۱ بهمن', daily: 1250, monthly: 8500 },
          { name: '۲ بهمن', daily: 1340, monthly: 8650 },
          { name: '۳ بهمن', daily: 1180, monthly: 8420 },
          { name: '۴ بهمن', daily: 1420, monthly: 8780 },
          { name: '۵ بهمن', daily: 1350, monthly: 8690 },
          { name: '۶ بهمن', daily: 1580, monthly: 8920 },
          { name: '۷ بهمن', daily: 1620, monthly: 9100 },
        ]);
      }, 300);
    });
  }

  async getMessageVolume(_timeRange: TimeRange): Promise<ChartDataPoint[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { name: '۶ صبح', value: 320 },
          { name: '۹ صبح', value: 450 },
          { name: '۱۲ ظهر', value: 680 },
          { name: '۳ عصر', value: 890 },
          { name: '۶ عصر', value: 1200 },
          { name: '۹ شب', value: 950 },
          { name: '۱۲ شب', value: 420 },
        ]);
      }, 300);
    });
  }

  async getUserDistribution(_timeRange: TimeRange): Promise<UserDistribution[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { name: '۱-۵ پیام', value: 2400, color: '#60A5FA' },
          { name: '۶-۲۰ پیام', value: 4200, color: '#34D399' },
          { name: '۲۱-۵۰ پیام', value: 1800, color: '#FBBF24' },
          { name: '۵۱+ پیام', value: 600, color: '#F87171' },
        ]);
      }, 300);
    });
  }

  async getFunnelData(_timeRange: TimeRange): Promise<FunnelStage[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { label: 'شروع گفتگو', value: 10000, percentage: 100, color: '#3B82F6' },
          { label: 'ارسال پیام دوم', value: 8000, percentage: 80, color: '#10B981' },
          { label: 'استفاده از قابلیت کلیدی', value: 5000, percentage: 50, color: '#F59E0B' },
          { label: 'بازگشت در هفته بعد', value: 2000, percentage: 20, color: '#EF4444' },
        ]);
      }, 300);
    });
  }

  async getPopularCommands(_timeRange: TimeRange): Promise<PopularCommand[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { name: 'شروع', count: 2340, percentage: 100 },
          { name: 'راهنما', count: 1890, percentage: 81 },
          { name: 'پشتیبانی', count: 1456, percentage: 62 },
          { name: 'محصولات', count: 1230, percentage: 53 },
          { name: 'تماس', count: 890, percentage: 38 },
        ]);
      }, 300);
    });
  }

  async getResponseTypes(_timeRange: TimeRange): Promise<ResponseType[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { name: 'پاسخ متنی', value: 4500, color: '#8B5CF6' },
          { name: 'دکمه‌ها', value: 3200, color: '#06B6D4' },
          { name: 'عکس/فایل', value: 1800, color: '#84CC16' },
          { name: 'اتصال به پشتیبانی', value: 500, color: '#F97316' },
        ]);
      }, 300);
    });
  }

  async getGoals(): Promise<Goal[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
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
        ]);
      }, 500);
    });
  }
}

export const analyticsService = new AnalyticsService();