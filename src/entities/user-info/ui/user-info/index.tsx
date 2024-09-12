import styles from './UserInfo.module.css';
import { InfoItems } from '@/entities/user-info/ui/info-items';

export const UserInfo = () => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <span className={styles.subtitle}>Основная информация</span>
      </header>
      <InfoItems />
    </div>
  );
};
