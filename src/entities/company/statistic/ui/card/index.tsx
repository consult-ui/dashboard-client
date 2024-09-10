import { Item } from '../item';
import styles from './Card.module.css';

export const Card = () => {
  return (
    <div className={styles.card}>
      <div className={styles.items}>
        {new Array(5).fill('text').map((item, index) => (
          <Item key={index} title={item} content={item} />
        ))}
      </div>
    </div>
  );
};
