import styles from './Card.module.css';
import { Item } from '@/entities/company/Statistic/ui/Item/Item.tsx';

export const Card = () => {
  return (
    <div className={styles.Card}>
      <div className={styles.cards}>
        {new Array(5).fill('text').map((item, index) => (
          <Item key={index} title={item} content={item} />
        ))}
      </div>
    </div>
  );
};
