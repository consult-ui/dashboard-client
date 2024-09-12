import { useSignOutMutation } from '@/app/api';
import { ELinks } from '@/app/router/types';
import LogoutIcon from '@/shared/assets/icons/logout.svg?react';
import { TOAST_ERROR } from '@/shared/constants/toasts.ts';
import Button from '@/shared/ui/button';
import ModalConfirm from '@/shared/ui/modal-confirm';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logout, { isLoading }] = useSignOutMutation();
  const navigate = useNavigate();

  const onLogout = () => {
    logout()
      .unwrap()
      .then((res) => {
        if (res.success) {
          Cookies.remove('access_token');
          Cookies.remove('refresh_token');
          navigate(ELinks.SIGN_IN);
        } else {
          throw new Error(res.msg);
        }
      })
      .catch((err) => TOAST_ERROR(err?.data?.msg || 'Ошибка выхода из аккаунта, обратитесь в поддержку!'));
  };

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
        isLoading={isLoading}
      />
    </>
  );
};

export default LogoutButton;
