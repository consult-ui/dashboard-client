import styles from './ThemeSwitcher.module.css';
import { switchTheme } from '@/app/store/slices/layoutSlice.ts';
import { useAppDispatch, useAppSelector } from '@/app/store/store.ts';
import { useEffect } from 'react';

const ThemeSwitcher = () => {
  const theme = useAppSelector((state) => state.layout.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <button className={styles.button} onClick={() => dispatch(switchTheme())}>
      Switch theme
    </button>
  );
};

export default ThemeSwitcher;
