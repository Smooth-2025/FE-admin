import AppLayout from '@app/AppLayout';
import { lazy, type ReactNode, Suspense } from 'react';
import { createBrowserRouter, Navigate, type RouteObject, RouterProvider } from 'react-router-dom';

const LoginPage = lazy(() => import('@login'));
const PotholePage = lazy(() => import('@/pages/pothole'));
const ReportPage = lazy(() => import('@/pages/report'));
const NotFoundPage = lazy(() => import('@notfound'));

// 권한 여부에 따른 가드 설정
function RequireAuth({ children }: { children: ReactNode }) {
  const isAuth = Boolean(localStorage.getItem('token')); // 권한 부분은 로직에 맞게 수정
  return isAuth ? <>{children}</> : <Navigate to="/login" replace />;
}

const routes: RouteObject[] = [
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <Navigate to="report" replace /> },
      { path: 'report', element: <ReportPage /> },
      { path: 'pothole', element: <PotholePage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
];

const router = createBrowserRouter(routes);

export default function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
