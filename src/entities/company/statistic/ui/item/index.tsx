import styles from './Item.module.css';
import { Card } from '@/shared/ui/card';

export const Item = ({ title, content }: { title: string; content: string | number }) => {
  return (
    <Card className={styles.item}>
      <span>{title}</span>
      <h2>{content}</h2>
    </Card>
  );
};
