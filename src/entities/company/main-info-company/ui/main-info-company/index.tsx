import { InfoItems } from '../info-items';
import styles from './MainInfoCompany.module.css';

export const MainInfoCompany = () => {
  return (
    <div className={styles.mainInfoCompany}>
      <header className={styles.header}>
        <span className={styles.subtitle}>Основная информация о компании</span>
      </header>
      <InfoItems />
    </div>
  );
};
