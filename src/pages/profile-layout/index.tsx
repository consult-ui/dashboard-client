import styles from './ProfileLayout.module.css';
import { ELinks } from '@/app/router/types';
import Arrow from '@/shared/assets/icons/arrow.svg?react';
import Button from '@/shared/ui/button';
import { Link } from 'react-router-dom';

interface IProps {
  title: string;
  children: React.ReactNode;
}
const ProfileLayout = ({ children, title }: IProps) => {
  return (
    <div className={styles.wrapper}>
      <Link className={styles.home} to={ELinks.HOME}>
        <Button variant="outlined">
          <Arrow />
          Вернуться на главную
        </Button>
      </Link>

      <h1>{title}</h1>
      <div className={styles.main}>{children}</div>
    </div>
  );
};
export default ProfileLayout;
