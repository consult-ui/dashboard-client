import styles from './Button.module.css';

interface Props extends Button {
  isLoading?: boolean;
  children: React.ReactNode;
  color?: 'primary' | 'dark' | 'light';
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'sm' | 'md' | 'lg';
}

type Button = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const Button = (props: Props) => {
  const { isLoading, children, className, variant, size, disabled, color, ...rest } = props;

  return (
    <button
      className={`${styles.wrapper} ${styles[variant || 'contained']} ${styles[size || 'md']} ${styles[color || 'primary']} ${className}`}
      disabled={isLoading || disabled}
      {...rest}
    >
      {isLoading ? 'Загрузка' : children}
    </button>
  );
};

export default Button;
