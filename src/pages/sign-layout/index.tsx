import styles from './SignLayout.module.css';
import Logo from '@/shared/assets/icons/logo.svg?react';

type Props = {
  children: React.ReactNode;
};

const SignLayout = ({ children }: Props) => {
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
