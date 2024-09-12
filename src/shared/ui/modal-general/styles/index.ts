import { type CSSProperties } from 'react';

export const customStyles: { overlay: CSSProperties; content: CSSProperties } = {
  overlay: {
    position: 'absolute',
    right: '0',
    top: '0',
    bottom: '0',
    left: '0',
    backgroundColor: '#212121BF',
    backdropFilter: 'blur(3px)',
    zIndex: '9',
  },
  content: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    width: 'max-content',
    maxWidth: '95vw',
    minWidth: '320px',
    minHeight: '120px',
    maxHeight: '95vh',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
    backgroundColor: 'var(--gray-dark)',
    borderRadius: '20px',
    border: '1px solid var(--border-color)',
    overflowY: 'auto',
  },
};
