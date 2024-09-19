import styles from './LoginForm.module.css';
import { useSignInMutation } from '@/app/api';
import { ELinks } from '@/app/router/types';
import { TOAST_ERROR } from '@/shared/constants/toasts.ts';
import Cookies from 'js-cookie';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [signIn, { isLoading }] = useSignInMutation();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    signIn({ login, password })
      .unwrap()
      .then((res) => {
        if (res.success) {
          Cookies.set('access_token', res.data.access_token);
          Cookies.set('refresh_token', res.data.refresh_token);
          navigate(ELinks.DASHBOARD);
        } else {
          throw new Error(res?.msg);
        }
      })
      .catch((err) => {
        TOAST_ERROR(err?.data?.msg || 'Ошибка входа в аккаунт, обратитесь в поддержку!');
      });
  };

  return (
    <form onSubmit={onSubmit} className={styles.form} id="Авторизация" data-testid="sign-in-form">
      <h4>Авторизация</h4>
      <div className={styles.inputWrapper}>
        <label htmlFor="login">Номер телефона или email</label>
        <input
          data-testid="sign-in-login"
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
          data-testid="sign-in-password"
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

      <button disabled={isLoading} type={'submit'} data-testid="sign-in-submit">
        {isLoading ? 'Загрузка' : 'Войти'}
      </button>
    </form>
  );
};

export default LoginForm;
