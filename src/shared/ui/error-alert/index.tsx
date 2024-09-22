import styles from './ErrorAlert.module.css';
import Button from '@/shared/ui/button';
import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  text?: string;
  style?: CSSProperties;
  className?: string;
  hideReload?: boolean;
};

const ErrorAlert = ({ text, style, className, hideReload }: Props) => {
  return (
    <div style={style} className={`${styles.wrapper} ${className || ''}`}>
      <p>
        {text || 'Упс... При выполнении запроса возникла ошибка. Обратитесь в поддержку или перезагрузите страницу.'}
      </p>
      <footer>
        {!hideReload && (
          <Button color="dark" onClick={() => window.location.reload()}>
            Перезагрузить страницу
          </Button>
        )}
        <Link to={import.meta.env.VITE_TECH_HELP_LINK}>
          <Button color="dark">Написать в поддержку</Button>
        </Link>
      </footer>
    </div>
  );
};

export default ErrorAlert;
