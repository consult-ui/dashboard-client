import { ELinks } from '@/app/router/types';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('@/pages/home/index'));
const SignIn = lazy(() => import('@/pages/sign-in/index'));

const Router = () => {
  return (
    <Routes>
      <Route path={ELinks.HOME} element={<Home />} />
      <Route path={ELinks.SIGN_IN} element={<SignIn />} />
    </Routes>
  );
};

export default Router;
