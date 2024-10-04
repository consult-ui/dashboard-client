import styles from './DashboardLayout.module.css';
import { useMeQuery } from '@/app/api';
import { ELinks } from '@/app/router/types';
import { useShowOrgModal } from '@/entities/company/company-initial-form';
import AlertNoOrg from '@/features/alert-no-org';
import SuspenseLoader from '@/shared/ui/suspense-loader';
import DashboardNavbar from '@/widgets/dashboard-navbar';
import Sidebar from '@/widgets/sidebar';
import Cookies from 'js-cookie';
import { lazy, Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CompanyInitialForm = lazy(() => import('@/entities/company/company-initial-form'));
const ExpireToasts = lazy(() => import('@/features/expire-toasts'));

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  const { data, isLoading, error } = useMeQuery();
  const { isEmptyOrg } = useShowOrgModal();
  const navigate = useNavigate();

  useEffect(() => {
    const isExpirationEnded = (error as { status: number })?.status === 403;
    if (!isLoading && !data && !isExpirationEnded) {
      navigate(ELinks.SIGN_IN);
    }
    if (isExpirationEnded) {
      navigate(ELinks.EXPIRATION_END);
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
    }
  }, [data, isLoading, error]);

  useEffect(() => {
    if (data?.data?.organization_id) {
      Cookies.set('x-org-id', String(data.data.organization_id));
    } else {
      Cookies.remove('x-org-id');
    }
  }, [data]);

  if (!data?.data?.id) return <SuspenseLoader text="Загрузка пользователя" />;

  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <Suspense fallback={undefined}>
        {data?.data && <ExpireToasts user={data?.data} />}
        <CompanyInitialForm />
      </Suspense>
      <div className={`${styles.content} ${isEmptyOrg ? styles.withAlert : ''}`}>
        <DashboardNavbar />
        {isEmptyOrg && <AlertNoOrg />}
        <div className={styles.main}>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
