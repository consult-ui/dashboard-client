import { ELinks } from '@/app/router/types';
import Button from '@/shared/ui/button';
import { Link } from 'react-router-dom';

const ExpirationEnd = () => {
  return (
    <div style={{ width: '100%', maxWidth: 700, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <h4>Ваша подписка закончилась, напишите в поддержку</h4>
      <p style={{ color: 'var(--gray-light)' }}>
        Подписка на платформу закончилась, пожалуйста, обратитесь к нашей поодержке, чтобы возобновить доступ к нашему
        сервису. С уважением, команда Consult Ai.
        <br /> <br />
        Вы также можете написать/позвонить своему личному помощнику, если у вас есть его контакты. После оплаты подписки
        доступ будет возобновлен в течение 2-3 минут.
      </p>

      <div style={{ display: 'flex', gap: 12, margin: '30px 0 80px' }}>
        <Button>Написать в Telegram</Button>
        <Button>Написать в WhatsApp</Button>
        <Button>Позвонить</Button>
      </div>

      <h4>После оплаты подписки вы можете</h4>
      <Link to={ELinks.SIGN_IN}>
        <Button style={{ margin: '6px 0 18px' }} size="lg" variant="outlined" color="primary">
          Перейти к авторизации
        </Button>
      </Link>
      <p style={{ color: 'var(--gray-light)' }}>
        и зайти в свой аккаунт. Все ваши данные будут сохранены и вы сможете продолжить пользоваться нашей платформой.
      </p>
    </div>
  );
};

export default ExpirationEnd;
