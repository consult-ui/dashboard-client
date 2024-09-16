import { InfoItems } from '../info-items';
import styles from './MainInfoCompany.module.css';
import { useShowOrgModal } from '@/entities/company/company-initial-form/hooks/useShowOrgModal.ts';
import Button from '@/shared/ui/button';

export const MainInfoCompany = () => {
  const { isEmptyOrg, setShow } = useShowOrgModal();

  return (
    <div className={styles.mainInfoCompany}>
      <header className={styles.header}>
        <span className={styles.subtitle}>Основная информация о компании</span>
        {isEmptyOrg && <Button onClick={() => setShow(true)}>Добавить данные организации</Button>}
      </header>
      <InfoItems />
    </div>
  );
};
