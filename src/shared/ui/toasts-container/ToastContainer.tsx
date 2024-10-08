import { useAppSelector } from '@/app/store/store.ts';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

const ToastsContainer = () => {
  const theme = useAppSelector((store) => store.layout.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={true}
      newestOnTop={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme}
      closeButton
    />
  );
};

export default ToastsContainer;
