import { Card } from '../card';
import styles from './Statistic.module.css';

export const Statistic = () => {
  return (
    <div className={styles.statistic}>
      <span className={styles.subtitle}>Статистика компании</span>

      <Card />
    </div>
  );
};
