import styles from './LoginForm.module.css';
import { ELinks } from '@/app/router/types';
import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  return (
    <form onSubmit={onSubmit} className={styles.form} id="Авторизация">
      <h4>Авторизация</h4>
      <div className={styles.inputWrapper}>
        <label htmlFor="login">Номер телефона или email</label>
        <input
          required
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          id="login"
          type="text"
          placeholder="Введите телефон или email"
        />
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="password">Пароль</label>
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

      <div className={styles.updatePassword}>
        <Link to={ELinks.PASSWORD_RECOVERY}>Забыли пароль?</Link>
      </div>

      <button disabled={isLoading} type={'submit'}>
        {isLoading ? 'Загрузка' : 'Войти'}
      </button>
    </form>
  );
};

export default LoginForm;
