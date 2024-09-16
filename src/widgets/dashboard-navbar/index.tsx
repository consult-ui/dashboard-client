import styles from './DashboardNavbar.module.css';
import { useShowOrgModal } from '@/entities/company/company-initial-form';
import { useGetInfoOrganization } from '@/entities/company/hooks/useGetInfoOrganization.tsx';
import ProfileDropdown from '@/widgets/profile-dropdown';

const DashboardNavbar = () => {
  const { isEmptyOrg } = useShowOrgModal();
  const { data } = useGetInfoOrganization();
  return (
    <nav className={styles.wrapper}>
      <div className={styles.info}>
        <small>Компания</small>
        {isEmptyOrg && <h6>Неопределено</h6>}
        {!isEmptyOrg && (
          <h6>
            {data?.data?.name}
            <span>({data?.data?.tax_number})</span>
          </h6>
        )}
      </div>

      <ProfileDropdown />
    </nav>
  );
};

export default DashboardNavbar;
