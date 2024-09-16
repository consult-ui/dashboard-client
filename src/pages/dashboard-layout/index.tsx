import styles from './DashboardLayout.module.css';
import { useMeQuery } from '@/app/api';
import { ELinks } from '@/app/router/types';
import DashboardNavbar from '@/widgets/dashboard-navbar';
import Sidebar from '@/widgets/sidebar';
import { lazy, Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CompanyInitialForm = lazy(() => import('@/entities/company/company-initial-form'));

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  const { data, isLoading } = useMeQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !data) {
      navigate(ELinks.SIGN_IN);
    }
  }, [data, isLoading]);

  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <Suspense fallback={undefined}>
        <CompanyInitialForm />
      </Suspense>
      <div className={styles.content}>
        <DashboardNavbar />
        <div className={styles.main}>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
