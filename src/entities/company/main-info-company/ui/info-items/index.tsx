import styles from './InfoItems.module.css';
import { useShowOrgModal } from '@/entities/company/company-initial-form/hooks/useShowOrgModal.ts';
import { useGetInfoOrganization } from '@/entities/company/hooks/useGetInfoOrganization.tsx';
import { Card } from '@/shared/ui/card';

export const InfoItems = () => {
  const { isEmptyOrg } = useShowOrgModal();
  const { data } = useGetInfoOrganization();

  return (
    <Card>
      <div className={styles.item}>
        <span>Наименование</span>
        <h2>
          {isEmptyOrg ? '-' : data?.data?.name || 'Загрузка...'}{' '}
          {!isEmptyOrg && <span>({data?.data?.tax_number || '-'})</span>}
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
