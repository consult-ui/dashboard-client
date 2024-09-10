import styles from './Card.module.css';
import classNames from 'classnames';

interface IProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: IProps) => {
  return <div className={classNames(styles.card, className)}>{children}</div>;
};
