import { ELinks } from '@/app/router/types';
import styles from '@/features/login-form/LoginForm.module.css';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PasswordReset = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => navigate(ELinks.SIGN_IN), 3000);
  };

  return (
    <form onSubmit={onSubmit} className={styles.form} id="Авторизация">
      <h4>Восстановление пароля</h4>
      <div className={styles.inputWrapper}>
        <label htmlFor="login">Код восстановления</label>
        <input
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
          id="login"
          type="number"
          placeholder="Введите код"
        />
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="password">Новый пароль</label>
        <input
          autoComplete="on"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
          placeholder="Введите пароль"
        />
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="password">Повторите пароль</label>
        <input
          autoComplete="on"
          required
          value={passwordAgain}
          onChange={(e) => setPasswordAgain(e.target.value)}
          id="password"
          type="password"
          placeholder="Введите пароль"
        />
      </div>

      <button disabled={isLoading} type={'submit'}>
        {isLoading ? 'Загрузка' : 'Подтвердить'}
      </button>

      <div className={styles.updatePassword} style={{ justifyContent: 'center' }}>
        <Link to={ELinks.PASSWORD_RECOVERY}>Назад</Link>
      </div>
    </form>
  );
};

export default PasswordReset;
