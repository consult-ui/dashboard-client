import styles from './MainInfoForm.module.css';
import { Card } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';

export const MainInfoForm = () => {
  return (
    <Card>
      <form className={styles.mainInfoForm}>
        <div className={styles.container}>
          <Input placeholder={'Введите Наименование'} label={'Наименование'} />
          <Input placeholder={'Введите ИНН'} label={'ИНН'} />
        </div>
        <Input placeholder={'Введите Ключевые слова'} label={'Ключевые слова'} />
        <Input
          disabled
          placeholder={'Введите Описание'}
          style={{ borderRadius: '1rem', height: '116px', maxHeight: '116px' }}
          label={'Описание'}
        />
      </form>
    </Card>
  );
};
