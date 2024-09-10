import { Card } from '../card';
import styles from './Statistic.module.css';
import EditIcon from '@/shared/assets/icons/pencil.svg?react';
import Button from '@/shared/ui/button';
import { useState } from 'react';

export const Statistic = () => {
  const [replace, setReplace] = useState(false);
  const toggleReplace = () => setReplace(!replace);
  return (
    <div className={styles.statistic}>
      <header className={styles.header}>
        <span className={styles.subtitle}>Статистика компании</span>
        <div className={styles.actions}>
          {!replace && (
            <Button color="dark" onClick={toggleReplace}>
              <div className={styles.editContainer}>
                <EditIcon />
                Редактировать
              </div>
            </Button>
          )}
          {replace && (
            <>
              <Button onClick={toggleReplace} color={'error'}>
                Отменить
              </Button>
              <Button color={'primary'}>Сохранить</Button>
            </>
          )}
        </div>
      </header>
      {!replace && <Card />}
    </div>
  );
};
