import styles from './MainInfoForm.module.css';
import { Card } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';

export const MainInfoForm = () => {
  return (
    <Card>
      <form className={styles.wrapper}>
        <div className={styles.container}>
          <Input placeholder={'Введите Наименование'} label={'Наименование'} />
          <Input placeholder={'Введите ИНН'} label={'ИНН'} />
        </div>
        <Input placeholder={'Введите Ключевые слова'} label={'Ключевые слова'} />
        <div className={styles.inputWrapper}>
          <label htmlFor="description">Описание</label>
          <textarea placeholder={'Введите Описание'} rows={4} />
        </div>
      </form>
    </Card>
  );
};
