import styles from './DashboardNavbar.module.css';
import ChatsList from '@/entities/chats-list';
import { useGetInfoOrganization } from '@/entities/company/hooks/useGetInfoOrganization.tsx';
import NavIcon from '@/shared/assets/icons/nav.svg?react';
import ProfileDropdown from '@/widgets/profile-dropdown';
import { useSidebarShow } from '@/widgets/sidebar/hooks/useSidebarShow.ts';

const DashboardNavbar = () => {
  const { data } = useGetInfoOrganization();
  const { setIsShow } = useSidebarShow();

  return (
    <nav className={styles.wrapper} data-testid="dashboard-navbar">
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

      <button className={styles.navButton} onClick={() => setIsShow(true)}>
        <NavIcon />
      </button>

      <div className={styles.activeChatWrapper}>
        <ChatsList isActiveChatOnly />
      </div>

      <ProfileDropdown />
    </nav>
  );
};

export default DashboardNavbar;
