import React from 'react';
import { Route, Routes } from 'react-router';
import { routes } from './routes';
import ErrorBoundary from '../utils/error_handling/ErrorBoundary';

// Маршрутизатор приложения
// Для каждого маршрута указывается путь и компонент для рендера
// Каждый компонент обёрнут в предохранитель для обработки ошибок рендера, возникающих в компоненте
function AppRouter() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={(
            <ErrorBoundary>
              {route.component}
            </ErrorBoundary>
                          )}
        />
      ))}
    </Routes>
  );
}

export default AppRouter;
