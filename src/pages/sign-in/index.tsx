import styles from './SignIn.module.css';
import LoginForm from '@/features/login-form';

const SignIn = () => {
  return (
    <div className={styles.wrapper}>
      <section>
        <LoginForm />
      </section>
    </div>
  );
};

export default SignIn;
