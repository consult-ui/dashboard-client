import { Card } from '../card';
import styles from './MainInfoCompany.module.css';
import { useState } from 'react';

export const MainInfoCompany = () => {
  const [replace, setReplace] = useState(false);
  const toggleReplace = () => setReplace(!replace);
  return (
    <div className={styles.mainInfoCompany}>
      <header className={styles.header}>
        <span className={styles.subtitle}>Основная информация о компании</span>
        <div className={styles.actions}>
          {/*TODO: Изменить кнопки на переиспользуемые*/}
          {!replace && <button onClick={toggleReplace}>Редактировать</button>}
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
