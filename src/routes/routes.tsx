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

export const AppRouters = () => {
  const navigationRoutes = [
    { path: '/content-base', element: <ContentBaseView /> },
    { path: '/media-plans', element: <MediaPlansView /> },
    { path: '/live-broadcast', element: <LiveBroadcastView /> },
    { path: '/emergency-information', element: <EmergencyInformationView /> },
    { path: '/interactive-map', element: <InteractiveMapView /> },
    { path: '/monitoring', element: <MonitoringView /> },
    { path: '/users', element: <UsersView /> },
    { path: '/reports', element: <ReportsView /> },
    { path: '/ad-moderation', element: <AdModerationView /> },
    { path: '/settings', element: <SettingsView /> },
    { path: '*', element: <NoMatchPageView /> },
  ];

  return (
    <Routes>
      {navigationRoutes.map((item) => {
        return <Route key={item.path} path={item.path} element={item.element} />;
      })}
    </Routes>
  );
};
