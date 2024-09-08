import styles from './LoginForm.module.css';
import { FormEvent, useState } from 'react';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPhone, setIsPhone] = useState(true);
  const [value, setValue] = useState('');
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
        <label htmlFor="login">{isPhone ? 'Номер телефона' : 'Логин'}</label>
        <div>
          <input
            required
            value={value}
            onChange={(e) => setValue(e.target.value)}
            id="login"
            type={isPhone ? 'tel' : 'text'}
            placeholder={isPhone ? 'Введите телефон' : 'Введите логин'}
          />
          <div className={styles.btnSwitcher}>
            <button type="button" disabled={isPhone} onClick={() => setIsPhone(true)}>
              Телефон
            </button>
            <button type="button" disabled={!isPhone} onClick={() => setIsPhone(false)}>
              Логин
            </button>
          </div>
        </div>
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="password">Пароль</label>
        <div>
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
      </div>

      <button disabled={isLoading} type={'submit'}>
        {isLoading ? 'Загрузка' : 'Войти'}
      </button>
    </form>
  );
};

export default LoginForm;
