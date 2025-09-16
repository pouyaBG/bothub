import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  title: string;
  path: string;
}

const routeConfig: Record<string, string> = {
  '/': 'داشبورد',
  '/bots': 'بات‌ها',
  '/bots/list': 'لیست بات‌ها',
  '/bots/add': 'افزودن بات جدید',
  '/users': 'کاربران',
  '/users/list': 'لیست کاربران',
  '/users/add': 'افزودن کاربر',
  '/settings': 'تنظیمات',
  '/reports': 'گزارشات'
};

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbItems: BreadcrumbItem[] = [
    { title: 'داشبورد', path: '/' }
  ];

  let currentPath = '';
  pathnames.forEach((segment) => {
    currentPath += `/${segment}`;
    const title = routeConfig[currentPath];
    if (title) {
      breadcrumbItems.push({ title, path: currentPath });
    }
  });

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-400">
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={item.path}>
          {index === breadcrumbItems.length - 1 ? (
            <span className="text-white font-medium">{item.title}</span>
          ) : (
            <Link
              to={item.path}
              className="hover:text-blue-400 transition-colors"
            >
              {item.title}
            </Link>
          )}
          {index < breadcrumbItems.length - 1 && (
            <span className="text-gray-500 mx-2">◀</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;