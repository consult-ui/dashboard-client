import styles from './ModalConfirm.module.css';
import { customStyles } from './styles';
import { Props } from './types';
import CloseIcon from '@/shared/assets/icons/close.svg?react';
import Button from '@/shared/ui/button';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export const ModalConfirm = (props: Props) => {
  const { open, styles: stylesProps, zIndex, onClose, className, desc } = props;
  const [container] = useState<HTMLDivElement>(document.createElement('div'));
  const ref = useRef<HTMLDivElement | null>(null);

  const closeOnEscapePressed = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const closeOpenMenus = (e: Event) => {
    if (!e?.target) return;
    if (ref?.current && open && !ref.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeOpenMenus);
    return () => {
      document.removeEventListener('mousedown', closeOpenMenus);
    };
  }, [ref, open]);

  useEffect(() => {
    const containerPortal = document.getElementById('modal-portal');
    if (!containerPortal || !open || !container) return;
    containerPortal.appendChild(container);
    return () => {
      containerPortal.removeChild(container);
    };
  }, [open, container]);

  useEffect(() => {
    if (!open) return;
    window.addEventListener('keydown', closeOnEscapePressed);
    return () => {
      window.removeEventListener('keydown', closeOnEscapePressed);
    };
  }, [open]);

  return createPortal(
    <div
      style={{
        ...customStyles.overlay,
        zIndex: zIndex ?? customStyles.overlay.zIndex,
      }}
    >
      <div style={{ ...customStyles.content, ...stylesProps }} className={className} ref={ref}>
        <header className={styles.header}>
          <h3>Подтвердите действие</h3>
          <Button onClick={onClose} className={styles.btnClose} color={'dark'}>
            <CloseIcon />
          </Button>
        </header>
        <div className={styles.content}>
          {desc && <p>{desc}</p>}
          <div className={styles.actions}>
            <Button color={'primary'}>Подтвердить</Button>
            <Button color={'error'} onClick={onClose}>
              Отмена
            </Button>
          </div>
        </div>
      </div>
    </div>,
    container,
  );
};