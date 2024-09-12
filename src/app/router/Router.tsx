import { ELinks } from '@/app/router/types';
import DashboardLayout from '@/pages/dashboard-layout';
import ProfileLayout from '@/pages/profile-layout';
import SignLayout from '@/pages/sign-layout';
import SuspenseLoader from '@/shared/ui/suspense-loader';
import { lazy, Suspense } from 'react';
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
            <Suspense fallback={<SuspenseLoader />}>
              <Dashboard />
            </Suspense>
          </DashboardLayout>
        }
      />
      <Route
        path={ELinks.DASHBOARD + ELinks.USER}
        element={
          <DashboardLayout>
            <ProfileLayout title={'Личные данные'}>
              <Suspense fallback={<SuspenseLoader />}>
                <User />
              </Suspense>
            </ProfileLayout>
          </DashboardLayout>
        }
      />
      <Route
        path={ELinks.DASHBOARD + ELinks.COMPANY}
        element={
          <DashboardLayout>
            <ProfileLayout title={'Моя компания'}>
              <Suspense fallback={<SuspenseLoader />}>
                <Company />
              </Suspense>
            </ProfileLayout>
          </DashboardLayout>
        }
      />
      <Route
        path={ELinks.SIGN_IN}
        element={
          <SignLayout>
            <Suspense fallback={<SuspenseLoader />}>
              <SignIn />
            </Suspense>
          </SignLayout>
        }
      />
      <Route
        path={ELinks.PASSWORD_RECOVERY}
        element={
          <SignLayout>
            <Suspense fallback={<SuspenseLoader />}>
              <PasswordRecovery />
            </Suspense>
          </SignLayout>
        }
      />
      <Route
        path={ELinks.PASSWORD_RESET}
        element={
          <SignLayout>
            <Suspense fallback={<SuspenseLoader />}>
              <PasswordReset />
            </Suspense>
          </SignLayout>
        }
      />
    </Routes>
  );
};

export default Router;
