import Router from '@/app/router';
import store, { persistedStore } from '@/app/store/store.ts';
import '@/app/styles/index.css';
import ToastsContainer from '@/shared/ui/toasts-container/ToastContainer.tsx';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';

const Providers = () => {
  return (
    <Suspense fallback={'Загрузка...'}>
      <Provider store={store}>
        <PersistGate persistor={persistedStore}>
          <BrowserRouter>
            <Router />
            <ToastsContainer />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </Suspense>
  );
};

export default Providers;
