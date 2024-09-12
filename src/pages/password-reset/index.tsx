import { useChangePasswordMutation } from '@/app/api';
import { ELinks } from '@/app/router/types';
import styles from '@/features/login-form/LoginForm.module.css';
import { TOAST_ERROR, TOAST_SUCCESS, TOAST_WARNING } from '@/shared/constants/toasts.ts';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PasswordReset = () => {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [change, { isLoading }] = useChangePasswordMutation();
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const email = new URLSearchParams(window.location.search).get('email');
    if (!email) {
      TOAST_WARNING('Email не был найден в поисковой строке, попробуйте еще раз');
      return;
    }

    if (password !== passwordAgain) {
      TOAST_WARNING('Пароли не совпадают! Проверьте валидность данных');
      return;
    }

    change({ new_password: password, reset_code: code, email })
      .unwrap()
      .then((res) => {
        if (res.success) {
          TOAST_SUCCESS('Пароль успешно изменен');
          navigate(ELinks.SIGN_IN);
        } else {
          throw new Error(res?.msg);
        }
      })
      .catch((err) => TOAST_ERROR(err?.message || 'Ошибка изменения пароля!'));
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
          type="text"
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
