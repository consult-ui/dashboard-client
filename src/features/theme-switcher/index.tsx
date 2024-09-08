import styles from './ThemeSwitcher.module.css';
import { switchTheme } from '@/app/store/slices/layoutSlice.ts';
import { useAppDispatch } from '@/app/store/store.ts';

const ThemeSwitcher = () => {
  const dispatch = useAppDispatch();

  return (
    <button className={styles.button} onClick={() => dispatch(switchTheme())}>
      Switch theme
    </button>
  );
};

export default ThemeSwitcher;
