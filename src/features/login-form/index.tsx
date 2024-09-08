import styles from './LoginForm.module.css';
import { FormEvent, useState } from 'react';

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
        <label htmlFor="login">Номер телефона или логин</label>
        <input
          required
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          id="login"
          type="text"
          placeholder="Введите телефон или логин"
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

      <button disabled={isLoading} type={'submit'}>
        {isLoading ? 'Загрузка' : 'Войти'}
      </button>
    </form>
  );
};

export default LoginForm;
