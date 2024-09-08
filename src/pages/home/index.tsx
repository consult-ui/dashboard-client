import styles from './HomePage.module.css';
import ThemeSwitcher from '@/features/theme-switcher';

const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      <ThemeSwitcher />
    </div>
  );
};

export default HomePage;
