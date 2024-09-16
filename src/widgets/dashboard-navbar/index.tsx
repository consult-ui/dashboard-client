import styles from './DashboardNavbar.module.css';
import { useGetInfoOrganization } from '@/entities/company/hooks/useGetInfoOrganization.tsx';
import ProfileDropdown from '@/widgets/profile-dropdown';

const DashboardNavbar = () => {
  const { data } = useGetInfoOrganization();

  return (
    <nav className={styles.wrapper}>
      <div className={styles.info}>
        <small>Компания</small>
        {data?.data?.name ? (
          <h6>
            {data.data.name}
            <span>({data?.data?.tax_number || 'ИНН не найден'})</span>
          </h6>
        ) : (
          <h6>Данные не заполнены</h6>
        )}
      </div>

      <ProfileDropdown />
    </nav>
  );
};

export default DashboardNavbar;
