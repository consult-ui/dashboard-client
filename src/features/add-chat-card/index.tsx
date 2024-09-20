import styles from './AddChatCard.module.css';
import Add from '@/shared/assets/icons/add.svg?react';
import Button from '@/shared/ui/button';

type Props = {
  data: {
    id: number;
    name: string;
    text: string;
  };
};

const AddChatCard = ({ data }: Props) => {
  const { name, text } = data;

  return (
    <div className={styles.card}>
      <header>
        <div>
          <small>Робот</small>
          <h6>{name}</h6>
        </div>
        <Button size="sm">
          <Add />
          Добавить
        </Button>
      </header>
      <p>{text}</p>
    </div>
  );
};

export default AddChatCard;
