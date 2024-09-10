import { Card } from '../card';
import styles from './Statistic.module.css';
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
              Редактировать
            </Button>
          )}
          {replace && (
            <>
              <button onClick={toggleReplace}>Отменить</button>
              <button>Сохранить</button>
            </>
          )}
        </div>
      </header>
      {!replace && <Card />}
    </div>
  );
};
