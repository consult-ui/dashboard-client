import styles from './Input.module.css';
import Question from '@/shared/assets/icons/question.svg?react';
import Tooltip from '@/shared/ui/tooltip';

interface IPropsLabel extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
  tooltip?: string;
  isLoading?: boolean;
  sizes?: 'sm' | 'md';
}
interface IProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: never;
  tooltip?: never;
  isLoading?: boolean;
  sizes?: 'sm' | 'md';
}

export const Input = (props: IProps | IPropsLabel) => {
  const { label, isLoading, sizes = 'md', disabled, tooltip, style, ...rest } = props;

  if (label) {
    return (
      <div className={styles.container}>
        <header>
          <label>{label}</label>
          {tooltip && (
            <Tooltip content={tooltip}>
              <Question />
            </Tooltip>
          )}
        </header>
        <input
          disabled={isLoading || disabled}
          className={`${styles.input} ${rest.className} ${styles[sizes]}`}
          style={style}
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
