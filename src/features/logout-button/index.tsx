import LogoutIcon from '@/shared/assets/icons/logout.svg?react';
import Button from '@/shared/ui/button';
import ModalConfirm from '@/shared/ui/modal-confirm';
import { useState } from 'react';

const LogoutButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onLogout = () => {};

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outlined"
        color={'error'}
        size={'sm'}
        style={{
          width: '100%',
          padding: '0.5rem',
          fontSize: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
        }}
      >
        <LogoutIcon />
        <span>Выйти из аккаунта</span>
      </Button>

      <ModalConfirm
        title="Вы точно хотите выйти из аккаунта?"
        onConfirm={onLogout}
        onClose={() => setIsOpen(false)}
        open={isOpen}
      />
    </>
  );
};

export default LogoutButton;
