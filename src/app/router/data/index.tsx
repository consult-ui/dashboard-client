import { ELinks, Route } from '@/app/router/types';
import DashboardLayout from '@/pages/dashboard-layout';
import ProfileLayout from '@/pages/profile-layout';
import SignLayout from '@/pages/sign-layout';
import SuspenseLoader from '@/shared/ui/suspense-loader';
import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const Home = lazy(() => import('@/pages/home'));
const NotFound = lazy(() => import('@/pages/not-found'));
const SignIn = lazy(() => import('@/pages/sign-in'));
const PasswordRecovery = lazy(() => import('@/pages/password-recovery'));
const PasswordReset = lazy(() => import('@/pages/password-reset'));
const Dashboard = lazy(() => import('@/pages/dashboard'));
const DashboardChat = lazy(() => import('@/pages/dashboard-chat'));
const Company = lazy(() => import('@/pages/profile-company'));
const User = lazy(() => import('@/pages/profile-user'));
const ExpirationEnd = lazy(() => import('@/pages/expiration-end'));

export const ROUTER_DATA: Route[] = [
  {
    id: 'not-found',
    link: '*',
    element: <NotFound />,
  },
  {
    id: 'home',
    link: ELinks.HOME,
    element: <Home />,
  },
  {
    id: 'sign-in',
    link: ELinks.SIGN_IN,
    element: (
      <SignLayout>
        <SignIn />
      </SignLayout>
    ),
  },
  {
    id: 'password-recovery',
    link: ELinks.PASSWORD_RECOVERY,
    element: (
      <SignLayout>
        <PasswordRecovery />
      </SignLayout>
    ),
  },
  {
    id: 'password-reset',
    link: ELinks.PASSWORD_RESET,
    element: (
      <SignLayout>
        <PasswordReset />
      </SignLayout>
    ),
  },
  {
    id: 'expiration-end',
    link: ELinks.EXPIRATION_END,
    element: (
      <SignLayout>
        <ExpirationEnd />
      </SignLayout>
    ),
  },
  {
    id: 'dashboard',
    link: ELinks.DASHBOARD,
    element: (
      <DashboardLayout>
        <Suspense fallback={<SuspenseLoader />}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      {
        id: 'dashboard-home',
        link: '',
        element: <Dashboard />,
      },
      {
        id: 'dashboard-home-not-found',
        link: '*',
        element: <NotFound />,
      },
      {
        id: 'dashboard-chat',
        link: ELinks.CHAT + '/:chatId',
        element: <DashboardChat />,
      },
      {
        id: 'dashboard-user',
        link: ELinks.USER,
        element: (
          <ProfileLayout title={'Личные данные'}>
            <User />
          </ProfileLayout>
        ),
      },
      {
        id: 'dashboard-company',
        link: ELinks.COMPANY,
        element: (
          <ProfileLayout title={'Личные данные'}>
            <Company />
          </ProfileLayout>
        ),
      },
    ],
  },
];
