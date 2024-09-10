import { Card } from '../card';
import styles from './MainInfoCompany.module.css';
import Button from '@/shared/ui/button';
import { useState } from 'react';

export const MainInfoCompany = () => {
  const [replace, setReplace] = useState(false);
  const toggleReplace = () => setReplace(!replace);

  return (
    <div className={styles.mainInfoCompany}>
      <header className={styles.header}>
        <span className={styles.subtitle}>Основная информация о компании</span>
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
      {/*TODO: Вынести в переиспользуемый*/}
      {!replace && <Card />}
      {/*{replace && <Form />}*/}
    </div>
  );
};
