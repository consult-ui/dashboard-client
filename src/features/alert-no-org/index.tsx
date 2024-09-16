import styles from './AlertNoOrg.module.css';
import { ELinks } from '@/app/router/types';
import ErrorIcon from '@/shared/assets/icons/error-warning.svg?react';
import { Link } from 'react-router-dom';

const AlertNoOrg = () => {
  return (
    <div className={styles.alert}>
      <ErrorIcon />
      <span>
        Данные компании не найдены, функционал платформы ограничен,{' '}
        <Link to={ELinks.DASHBOARD + ELinks.COMPANY}>заполнить в личном кабинете</Link>
      </span>
    </div>
  );
};

export default AlertNoOrg;
