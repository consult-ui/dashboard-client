import styles from './UserInfoForm.module.css';
import { Card } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';

export const UserInfoForm = () => {
  return (
    <Card>
      <form className={styles.wrapper}>
        <div className={styles.container}>
          <Input placeholder={'Введите Имя'} label={'Имя'} />
          <Input placeholder={'Введите Логин'} label={'Логин'} />
        </div>
        <div className={styles.container}>
          <Input placeholder={'Введите Телефон'} label={'Телефон'} />
          <Input placeholder={'Введите E-Mail'} label={'E-Mail'} />
        </div>
        <Input placeholder={'Введите Компании'} label={'Компании'} />
      </form>
    </Card>
  );
};