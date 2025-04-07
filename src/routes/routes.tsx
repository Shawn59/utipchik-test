import { Route, Routes } from 'react-router';
import {
  ContentBaseView,
  MediaPlansView,
  LiveBroadcastView,
  NoMatchPageView,
  InteractiveMapView,
  EmergencyInformationView,
  MonitoringView,
  UsersView,
  ReportsView,
  AdModerationView,
  SettingsView,
} from '@views';

export const navigationRoutes = [
  { pageName: 'База контента', path: '/content-base', element: <ContentBaseView /> },
  { pageName: 'Медиапланы', path: '/media-plans', element: <MediaPlansView /> },
  { pageName: 'Online - Вещание', path: '/live-broadcast', element: <LiveBroadcastView /> },
  { pageName: 'Информирование', path: '/emergency-information', element: <EmergencyInformationView /> },
  { pageName: 'Интерактивная карта', path: '/interactive-map', element: <InteractiveMapView /> },
  { pageName: 'Мониторинг', path: '/monitoring', element: <MonitoringView /> },
  { pageName: 'Пользователи', path: '/users', element: <UsersView /> },
  { pageName: 'Отчет', path: '/reports', element: <ReportsView /> },
  { pageName: 'Модерация рекламы', path: '/ad-moderation', element: <AdModerationView /> },
  { pageName: 'Настройки', path: '/settings', element: <SettingsView /> },
  { pageName: '404', path: '*', element: <NoMatchPageView /> },
];

export const AppRouters = () => {
  return (
    <Routes>
      {navigationRoutes.map((item) => {
        return <Route key={item.path} path={item.path} element={item.element} />;
      })}
    </Routes>
  );
};
