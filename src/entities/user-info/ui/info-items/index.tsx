import styles from './InfoItems.module.css';
import { useMeQuery } from '@/app/api';
import { Item } from '@/entities/user-info/ui/item';
import { Card } from '@/shared/ui/card';
import { formatDate } from '@/shared/utils/formatDate.ts';

export const InfoItems = () => {
  const { data } = useMeQuery();

  return (
    <Card>
      <div className={styles.items}>
        <Item title={'Имя и фамилия'} content={`${data?.data?.last_name || ''} ${data?.data?.first_name || ''}`} />
        <Item title={'Телефон'} content={data?.data?.phone_number} />
        <Item title={'E-Mail'} content={data?.data?.email} />
        <Item title={'Компания'} content={'-'} />
        <Item title={'Дата завершения подписки'} content={formatDate(data?.data?.expiration_date)} />
      </div>
    </Card>
  );
};
