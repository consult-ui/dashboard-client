import { Item } from '../item';
import styles from './Card.module.css';
import { useMeQuery, useMyOrganizationQuery } from '@/app/api';

export const Card = () => {
  const { data: me } = useMeQuery();
  const { data } = useMyOrganizationQuery(
    { organization_id: me?.data?.organization_id as number },
    { skip: !me?.data?.organization_id },
  );

  return (
    <div className={styles.wrapper}>
      <Item title={'Средний чек'} content={data?.data?.average_receipt} />
      <Item title={'Кол-во работников'} content={data?.data?.number_employees} />
      <Item title={'Ежеквартальный расход'} content={data?.data?.quarterly_expenses} />
      <Item title={'Ежеквартальный доход'} content={data?.data?.quarterly_income} />
    </div>
  );
};
