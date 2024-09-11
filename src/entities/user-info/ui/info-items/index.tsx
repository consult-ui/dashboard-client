import styles from './InfoItems.module.css';
import { Item } from '@/entities/user-info/ui/item';
import { Card } from '@/shared/ui/card';

const titles = ['Имя', 'Логин', 'Телефон', 'E-Mail', 'Компании'];
const data = ['Михаил', 'mihail2003', '+79524484331', 'asd1asd84@mail.ru', '3233, 5446, 12332'];

export const InfoItems = () => {
  return (
    <Card>
      <div className={styles.items}>
        {titles.map((title, index) => (
          <Item key={title} title={title} content={data[index]} />
        ))}
      </div>
    </Card>
  );
};