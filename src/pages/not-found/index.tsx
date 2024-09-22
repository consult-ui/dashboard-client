import styles from './NotFound.module.css';
import { ELinks } from '@/app/router/types';
import Button from '@/shared/ui/button';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <h1>404</h1>
      <article>
        <p>Ой, что-то сломалось... Страница не найдена или вовсе не существует</p>
        <Link to={ELinks.DASHBOARD}>
          <Button color="dark">Вернуться на главную</Button>
        </Link>
      </article>
    </div>
  );
};

export default NotFound;
