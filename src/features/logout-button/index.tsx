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
        variant="text"
        style={{ width: '100%', padding: 0, fontSize: 16, border: 'none', color: 'var(--error)' }}
      >
        Выйти из аккаунта
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
