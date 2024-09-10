import styles from './Button.module.css';
import { EButtonSize, EButtonType, IButtonProps } from '@/shared/ui/Button/types.ts';
import classNames from 'classnames';

export { EButtonType, EButtonSize } from './types.ts';
export type { IButtonProps } from './types.ts';
export const Button = (props: IButtonProps) => {
  const { children, variant = EButtonType.CONTAINED, size = EButtonSize.MEDIUM, ...otherProps } = props;
  return (
    <button className={classNames(styles.Button, styles[variant], styles[size], otherProps.className)} {...otherProps}>
      {children}
    </button>
  );
};
