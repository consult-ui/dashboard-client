import styles from './Card.module.css';

interface IProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: IProps) => {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
};
