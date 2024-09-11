import styles from './UserInfo.module.css';
import { InfoItems } from '@/entities/user-info/ui/info-items';
import { UserInfoForm } from '@/features/user-info-form';
import LockIcon from '@/shared/assets/icons/lock.svg?react';
import EditIcon from '@/shared/assets/icons/pencil.svg?react';
import Button from '@/shared/ui/button';
import { useState } from 'react';

export const UserInfo = () => {
  const [replace, setReplace] = useState(false);
  const toggleReplace = () => setReplace(!replace);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <span className={styles.subtitle}>Основная информация</span>
        <div className={styles.actions}>
          {replace ? (
            <>
              <Button onClick={toggleReplace} color={'error'}>
                Отменить
              </Button>
              <Button color={'primary'}>Сохранить</Button>
            </>
          ) : (
            <>
              <Button color="dark">
                <div className={styles.btnContainer}>
                  <LockIcon />
                  Изменить пароль
                </div>
              </Button>
              <Button color="dark" onClick={toggleReplace}>
                <div className={styles.btnContainer}>
                  <EditIcon />
                  Редактировать
                </div>
              </Button>
            </>
          )}
        </div>
      </header>
      {replace ? <UserInfoForm /> : <InfoItems />}
    </div>
  );
};
