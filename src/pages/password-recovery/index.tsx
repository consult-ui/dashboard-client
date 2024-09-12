import { useResetPasswordMutation } from '@/app/api';
import { ELinks } from '@/app/router/types';
import styles from '@/features/login-form/LoginForm.module.css';
import { TOAST_ERROR, TOAST_SUCCESS } from '@/shared/constants/toasts.ts';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [reset, { isLoading }] = useResetPasswordMutation();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    reset({ email })
      .unwrap()
      .then((res) => {
        if (res.success) {
          TOAST_SUCCESS('Код восстановления был отправлен на ваш email, введите его на этой странице');
          navigate(ELinks.PASSWORD_RESET + '?email=' + email);
        } else {
          throw new Error(res?.msg);
        }
      })
      .catch((err) => TOAST_ERROR(err?.message || 'Ошибка отправки кода восстановления!'));
  };

  return (
    <form onSubmit={onSubmit} className={styles.form} id="Авторизация">
      <h4>Восстановление пароля</h4>
      <div className={styles.inputWrapper}>
        <label htmlFor="email">Email</label>
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
