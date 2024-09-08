import styles from './HomePage.module.css';
import { switchTheme } from '@/app/store/slices/layoutSlice.ts';
import { useAppDispatch, useAppSelector } from '@/app/store/store.ts';
import { TOAST_SUCCESS } from '@/shared/constants/toasts.ts';
import { useEffect } from 'react';

const HomePage = () => {
  const theme = useAppSelector((state) => state.layout.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className={styles.wrapper}>
      <h6>{theme}</h6>
      <button
        onClick={() => {
          dispatch(switchTheme());
          TOAST_SUCCESS('Theme updated');
        }}
      >
        Switch theme
      </button>
    </div>
  );
};

export default HomePage;
