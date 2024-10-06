import styles from './DashboardNavbar.module.css';
import { ELinks } from '@/app/router/types';
import ChatsList from '@/entities/chats-list';
import { useGetInfoOrganization } from '@/entities/company/hooks/useGetInfoOrganization.tsx';
import Logo from '@/shared/assets/icons/logo.svg?react';
import NavIcon from '@/shared/assets/icons/nav.svg?react';
import ProfileDropdown from '@/widgets/profile-dropdown';
import { useSidebarShow } from '@/widgets/sidebar/hooks/useSidebarShow.ts';
import { Link, useLocation } from 'react-router-dom';

const DashboardNavbar = () => {
  const { data } = useGetInfoOrganization();
  const { setIsShow } = useSidebarShow();
  const { pathname } = useLocation();

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

      {pathname.startsWith(ELinks.DASHBOARD + ELinks.CHAT) ? (
        <div className={styles.activeChatWrapper}>
          <ChatsList isActiveChatOnly />
        </div>
      ) : (
        <Link to={ELinks.HOME} className={styles.logoWrapper}>
          <Logo />
        </Link>
      )}

      <ProfileDropdown />
    </nav>
  );
};

export default DashboardNavbar;
