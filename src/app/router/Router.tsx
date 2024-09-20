import { ROUTER_DATA } from '@/app/router/data/index.tsx';
import { Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <Routes>
      {ROUTER_DATA.map((route) => (
        <Route key={route.link} path={route.link} element={route.element}>
          {route?.children?.map((childrenRoute) => (
            <Route key={childrenRoute.link} path={childrenRoute.link} element={childrenRoute.element} />
          ))}
        </Route>
      ))}
    </Routes>
  );
};

export default Router;
