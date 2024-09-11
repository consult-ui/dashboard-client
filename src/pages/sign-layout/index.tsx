import styles from './SignLayout.module.css';
import { ELinks } from '@/app/router/types';
import Logo from '@/shared/assets/icons/logo.svg?react';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

const SignLayout = ({ children }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get('access_token') && Cookies.get('refresh_token')) {
      navigate(ELinks.DASHBOARD);
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <section>
        <Logo />
        {children}
        <small>Новые возможности для бизнеса в одном решении</small>
      </section>
      <section className={styles.bg} />
    </div>
  );
};

export default SignLayout;
