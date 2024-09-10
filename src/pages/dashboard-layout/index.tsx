import styles from './DashboardLayout.module.css';
import DashboardNavbar from '@/widgets/dashboard-navbar';
import Sidebar from '@/widgets/sidebar';

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.content}>
        <DashboardNavbar />
        <div className={styles.main}>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
