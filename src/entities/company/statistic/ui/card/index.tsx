import { Item } from '../item';
import styles from './Card.module.css';

const data = ['Количество клиентов в месяц', 'Клиентов за месяцев', 'Средний чек', 'Выручка в месяц', 'Оборот в месяц'];

export const Card = () => {
  return (
    <div className={styles.card}>
      <div className={styles.items}>
        {data.map((item) => (
          <Item key={item} title={item} content={Math.random().toFixed(5)} />
        ))}
      </div>
    </div>
  );
};
