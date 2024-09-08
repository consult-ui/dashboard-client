import { LINK_HOME } from '@/app/router/constants';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('@/pages/HomePage'));

const Router = () => {
  return (
    <Routes>
      <Route path={LINK_HOME} element={<HomePage />} />
    </Routes>
  );
};

export default Router;
