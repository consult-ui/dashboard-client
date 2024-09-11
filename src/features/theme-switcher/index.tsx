import styles from './ThemeSwitcher.module.css';
import { switchTheme } from '@/app/store/slices/layoutSlice.ts';
import { useAppDispatch, useAppSelector } from '@/app/store/store.ts';
import Moon from '@/shared/assets/icons/moon.svg?react';
import Sun from '@/shared/assets/icons/sun.svg?react';
import Button from '@/shared/ui/button';

const ThemeSwitcher = () => {
  const theme = useAppSelector((state) => state.layout.theme);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.wrapper}>
      <Button
        size="sm"
        color={theme === 'dark' ? undefined : 'dark'}
        onClick={() => dispatch(switchTheme())}
        disabled={theme === 'dark'}
      >
        <Moon />
      </Button>
      <Button
        size="sm"
        color={theme === 'light' ? undefined : 'dark'}
        onClick={() => dispatch(switchTheme())}
        disabled={theme === 'light'}
      >
        <Sun />
      </Button>
    </div>
  );
};

export default ThemeSwitcher;
