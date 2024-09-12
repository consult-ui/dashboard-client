import { InfoItems } from '../info-items';
import styles from './MainInfoCompany.module.css';
import { MainInfoForm } from '@/features/company/main-info-form';
import EditIcon from '@/shared/assets/icons/pencil.svg?react';
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
          {replace ? (
            <>
              <Button onClick={toggleReplace} variant={'outlined'} color={'error'}>
                Отменить
              </Button>
              <Button color={'primary'}>Сохранить</Button>
            </>
          ) : (
            <Button color="dark" onClick={toggleReplace}>
              <div className={styles.editContainer}>
                <EditIcon />
                Редактировать
              </div>
            </Button>
          )}
        </div>
      </header>
      {replace ? <MainInfoForm /> : <InfoItems />}
    </div>
  );
};
