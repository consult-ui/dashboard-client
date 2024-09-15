import styles from './InfoItems.module.css';
import { useMeQuery, useMyOrganizationQuery } from '@/app/api';
import { Card } from '@/shared/ui/card';

export const InfoItems = () => {
  const { data: me } = useMeQuery();
  const { data } = useMyOrganizationQuery(
    { organization_id: me?.data?.organization_id as number },
    { skip: !me?.data?.organization_id },
  );

  return (
    <Card>
      <div className={styles.item}>
        <span>Наименование</span>
        <h2>
          {data?.data?.name || 'Загрузка...'} <span>({data?.data?.tax_number || '-'})</span>
        </h2>
      </div>
      <div className={styles.item}>
        <span>Руководитель</span>
        <p>{data?.data?.head_name || '-'}</p>
      </div>
      <div className={styles.item}>
        <span>Вид деятельности</span>
        <p>{data?.data?.activity_type || '-'}</p>
      </div>
    </Card>
  );
};
