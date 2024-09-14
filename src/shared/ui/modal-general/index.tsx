import styles from './ModalGeneral.module.css';
import { customStyles } from './styles';
import { Props } from './types';
import CloseIcon from '@/shared/assets/icons/close.svg?react';
import Button from '@/shared/ui/button';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export const ModalGeneral = (props: Props) => {
  const { open, onClose, title, styles: stylesProps, zIndex, visibleCloseButton = true, className, children } = props;
  const [container] = useState<HTMLDivElement>(document.createElement('div'));
  const ref = useRef<HTMLDivElement | null>(null);

  const closeOnEscapePressed = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const closeOpenMenus = (e: Event) => {
    if (!e.target) return;
    if (ref?.current && open && !ref?.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeOpenMenus);
    return () => {
      document.removeEventListener('mousedown', closeOpenMenus);
    };
  }, [open, onClose]);

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
    <div style={{ ...customStyles.overlay, zIndex: zIndex ?? customStyles.overlay.zIndex }}>
      <div ref={ref} style={{ ...customStyles.content, ...stylesProps }} className={styles.wrapper}>
        <header className={styles.header}>
          <h3>{title}</h3>
          {visibleCloseButton && (
            <Button onClick={onClose} className={styles.btnClose} color={'dark'}>
              <CloseIcon />
            </Button>
          )}
        </header>
        <div className={className}>{children}</div>
      </div>
    </div>,
    container,
  );
};
