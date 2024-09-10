import styles from './Input.module.css';

interface IProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  isLoading?: boolean;
  sizes?: 'sm' | 'md';
}

export const Input = (props: IProps) => {
  const { label, isLoading, sizes = 'md', disabled, ...rest } = props;

  if (label) {
    return (
      <div className={styles.container}>
        <span>{label}</span>
        <input
          disabled={isLoading || disabled}
          className={`${styles.input} ${rest.className} ${styles[sizes]}`}
          {...rest}
        />
      </div>
    );
  }

  return (
    <input
      disabled={isLoading || disabled}
      className={`${styles.input} ${rest.className} ${styles[sizes]}`}
      {...rest}
    />
  );
};
