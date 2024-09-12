import styles from './Item.module.css';
import { Card } from '@/shared/ui/card';

interface IProps {
  title: string;
  content: string | number | undefined;
}

export const Item = ({ title, content }: IProps) => {
  return (
    <Card className={styles.item}>
      <span>{title}</span>
      <h2>{content || '-'}</h2>
    </Card>
  );
};
