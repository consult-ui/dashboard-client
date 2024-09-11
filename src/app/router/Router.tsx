import { ELinks } from '@/app/router/types';
import DashboardLayout from '@/pages/dashboard-layout';
import ProfileLayout from '@/pages/profile-layout';
import SignLayout from '@/pages/sign-layout';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('@/pages/home'));
const Dashboard = lazy(() => import('@/pages/dashboard'));
const Company = lazy(() => import('@/pages/profile-company'));
const User = lazy(() => import('@/pages/profile-user'));
const SignIn = lazy(() => import('@/pages/sign-in'));
const PasswordRecovery = lazy(() => import('@/pages/password-recovery'));
const PasswordReset = lazy(() => import('@/pages/password-reset'));

const Router = () => {
  return (
    <Routes>
      <Route path={ELinks.HOME} element={<Home />} />
      <Route
        path={ELinks.DASHBOARD}
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />
      <Route
        path={ELinks.DASHBOARD + ELinks.USER}
        element={
          <DashboardLayout>
            <ProfileLayout title={'Личные данные'}>
              <User />
            </ProfileLayout>
          </DashboardLayout>
        }
      />
      <Route
        path={ELinks.DASHBOARD + ELinks.COMPANY}
        element={
          <DashboardLayout>
            <ProfileLayout title={'Моя компания'}>
              <Company />
            </ProfileLayout>
          </DashboardLayout>
        }
      />
      <Route
        path={ELinks.SIGN_IN}
        element={
          <SignLayout>
            <SignIn />
          </SignLayout>
        }
      />
      <Route
        path={ELinks.PASSWORD_RECOVERY}
        element={
          <SignLayout>
            <PasswordRecovery />
          </SignLayout>
        }
      />
      <Route
        path={ELinks.PASSWORD_RESET}
        element={
          <SignLayout>
            <PasswordReset />
          </SignLayout>
        }
      />
    </Routes>
  );
};

export default Router;
