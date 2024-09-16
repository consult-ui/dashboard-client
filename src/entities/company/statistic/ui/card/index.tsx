import { Item } from '../item';
import styles from './Card.module.css';
import { useGetInfoOrganization } from '@/entities/company/hooks/useGetInfoOrganization.tsx';

export const Card = () => {
  const { data } = useGetInfoOrganization();

  return (
    <div className={styles.wrapper}>
      <Item title={'Средний чек'} content={data?.data?.average_receipt} />
      <Item title={'Кол-во работников'} content={data?.data?.number_employees} />
      <Item title={'Ежеквартальный расход'} content={data?.data?.quarterly_expenses} />
      <Item title={'Ежеквартальный доход'} content={data?.data?.quarterly_income} />
    </div>
  );
};
