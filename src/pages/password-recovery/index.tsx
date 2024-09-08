import { ELinks } from '@/app/router/types';
import styles from '@/features/login-form/LoginForm.module.css';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PasswordRecovery = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [login, setLogin] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => navigate(ELinks.PASSWORD_RESET), 3000);
  };

  return (
    <form onSubmit={onSubmit} className={styles.form} id="Авторизация">
      <h4>Восстановление пароля</h4>
      <div className={styles.inputWrapper}>
        <label htmlFor="login">Email</label>
        <input
          required
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          id="login"
          type="email"
          placeholder="Введите email, привязанный к аккаунту"
        />
      </div>

      <button disabled={isLoading} type={'submit'}>
        {isLoading ? 'Загрузка' : 'Получить код восстановления'}
      </button>

      <div className={styles.updatePassword} style={{ justifyContent: 'center' }}>
        <Link to={ELinks.SIGN_IN}>Назад</Link>
      </div>
    </form>
  );
};

export default PasswordRecovery;
