import styles from './Alert.module.css';
import { ELinks } from '@/app/router/types';
import { useShowOrgModal } from '@/entities/company/company-initial-form';
import ErrorIcon from '@/shared/assets/icons/error-warning.svg?react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Alert = () => {
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const { isEmptyOrg } = useShowOrgModal();
  return (
    isEmptyOrg && (
      <div
        onMouseMove={() => setShowMessage(true)}
        onMouseOut={() => setShowMessage(false)}
        className={`${styles.alert} ${showMessage && styles.active}`}
      >
        <ErrorIcon />
        <span>
          Данные организации не найдены, <b>функционал платформы ограничен</b>, перейдите в{' '}
          <Link to={ELinks.DASHBOARD + ELinks.COMPANY}>личный кабинет</Link> для добавления данных
        </span>
      </div>
    )
  );
};
