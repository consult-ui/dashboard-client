import styles from './NotFound.module.css';
import { ELinks } from '@/app/router/types';
import Button from '@/shared/ui/button';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <h1>404</h1>
      <p>Упс! Такой страницы не существует</p>
      <Link to={ELinks.DASHBOARD}>
        <Button size="lg">Вернуться на главную</Button>
      </Link>
    </div>
  );
};

export default NotFound;
