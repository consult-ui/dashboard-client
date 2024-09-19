import styles from './ModalConfirm.module.css';
import Button from '@/shared/ui/button';
import { PropsConfirm } from '@/shared/ui/modal-confirm/types';
import { ModalGeneral } from '@/shared/ui/modal-general';

const ModalConfirm = (props: PropsConfirm) => {
  const { onConfirm, onClose, isLoading, zIndex, open, title, styles: stylesProps } = props;

  return (
    <ModalGeneral
      className={styles.wrapper}
      styles={stylesProps}
      zIndex={zIndex}
      open={open}
      onClose={onClose}
      title={title || 'Подтвердите действие'}
    >
      <footer>
        <Button size="md" variant={'outlined'} color="error" onClick={onClose}>
          Отмена
        </Button>
        <Button size="md" onClick={onConfirm} isLoading={isLoading} data-testid="confirm-modal-btn">
          Подтвердить
        </Button>
      </footer>
    </ModalGeneral>
  );
};

export default ModalConfirm;
