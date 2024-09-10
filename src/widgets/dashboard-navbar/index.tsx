import styles from './DashboardNavbar.module.css';

// import ThemeSwitcher from '@/features/theme-switcher';

const DashboardNavbar = () => {
  return (
    <nav className={styles.wrapper}>
      <div className={styles.info}>
        <small>Компания</small>
        <h6>
          {/*<ThemeSwitcher />*/}
          FIT SERVICE <span>(7716791437)</span>
        </h6>
      </div>

      {/*TODO: add lk dropdown*/}
    </nav>
  );
};

export default DashboardNavbar;
