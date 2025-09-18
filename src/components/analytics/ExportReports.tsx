import React, { useState } from 'react';
import { FileText, FileCsv, Calendar } from 'phosphor-react';
import Button from '../ui/button';

interface ExportReportsProps {
  onExportPDF: () => void;
  onExportCSV: () => void;
  onScheduleReport: (config: {
    frequency: 'weekly' | 'monthly';
    email: string;
    reportType: 'summary' | 'detailed';
  }) => void;
}

const ExportReports: React.FC<ExportReportsProps> = ({
  onExportPDF,
  onExportCSV,
  onScheduleReport,
}) => {
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [scheduleConfig, setScheduleConfig] = useState({
    frequency: 'weekly' as 'weekly' | 'monthly',
    email: '',
    reportType: 'summary' as 'summary' | 'detailed',
  });

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onScheduleReport(scheduleConfig);
    setShowScheduleForm(false);
    setScheduleConfig({ frequency: 'weekly', email: '', reportType: 'summary' });
  };

  return (
    <div className="bg-gray-800 rounded-2xl shadow-sm border border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">خروجی گزارشات</h3>

      {/* Export Buttons */}
      <div className="space-y-3 mb-6">
        <Button
          variant="primary"
          onClick={onExportPDF}
          icon={<FileText size={16} />}
          fullWidth
        >
          دانلود گزارش PDF
        </Button>
        <Button
          variant="secondary"
          onClick={onExportCSV}
          icon={<FileCsv size={16} />}
          fullWidth
        >
          خروجی داده‌ها (CSV)
        </Button>
      </div>

      {/* Scheduled Reports */}
      <div className="border-t border-gray-600 pt-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-white">گزارش‌های برنامه‌ریزی شده</h4>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowScheduleForm(!showScheduleForm)}
            icon={<Calendar size={14} />}
          >
            تنظیم
          </Button>
        </div>

        {showScheduleForm && (
          <form onSubmit={handleScheduleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                تناوب
              </label>
              <select
                value={scheduleConfig.frequency}
                onChange={(e) =>
                  setScheduleConfig({
                    ...scheduleConfig,
                    frequency: e.target.value as 'weekly' | 'monthly',
                  })
                }
                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="weekly">هفتگی</option>
                <option value="monthly">ماهانه</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                ایمیل
              </label>
              <input
                type="email"
                value={scheduleConfig.email}
                onChange={(e) =>
                  setScheduleConfig({ ...scheduleConfig, email: e.target.value })
                }
                placeholder="example@email.com"
                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                نوع گزارش
              </label>
              <select
                value={scheduleConfig.reportType}
                onChange={(e) =>
                  setScheduleConfig({
                    ...scheduleConfig,
                    reportType: e.target.value as 'summary' | 'detailed',
                  })
                }
                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="summary">خلاصه</option>
                <option value="detailed">تفصیلی</option>
              </select>
            </div>

            <div className="flex space-x-2 space-x-reverse">
              <Button type="submit" variant="primary" size="sm" fullWidth>
                ذخیره
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowScheduleForm(false)}
                fullWidth
              >
                لغو
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ExportReports;