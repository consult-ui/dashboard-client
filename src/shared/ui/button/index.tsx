import styles from './Button.module.css';

type Button = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

interface Props extends Button {
  isLoading?: boolean;
  children: React.ReactNode;
  color?: 'primary' | 'dark' | 'light' | 'error';
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'sm' | 'md' | 'lg';
}

const Button = (props: Props) => {
  const { isLoading, children, className, variant, size, disabled, color, ...rest } = props;

  return (
    <button
      className={`${styles.wrapper} ${styles[variant || 'contained']} ${styles[size || 'md']} ${styles[color || 'primary']} ${className}`}
      disabled={isLoading || disabled}
      {...rest}
    >
      {isLoading ? 'Загрузка...' : children}
    </button>
  );
};

export default Button;
