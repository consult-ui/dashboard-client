import { ELinks } from '@/app/router/types';
import SignLayout from '@/pages/sign-layout';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('@/pages/home/index'));
const SignIn = lazy(() => import('@/pages/sign-in/index'));
const PasswordRecovery = lazy(() => import('@/pages/password-recovery/index'));
const PasswordReset = lazy(() => import('@/pages/password-reset/index'));

const Router = () => {
  return (
    <Routes>
      <Route path={ELinks.HOME} element={<Home />} />
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
      <Route
        path={ELinks.COMPANY}
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
