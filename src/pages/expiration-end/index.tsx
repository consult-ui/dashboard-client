import styles from './ExpirationEnd.module.css';
import { ELinks } from '@/app/router/types';
import Button from '@/shared/ui/button';
import { Link } from 'react-router-dom';

const ExpirationEnd = () => {
  return (
    <div className={styles.wrapper}>
      <h4>Ваша подписка закончилась, напишите в поддержку</h4>
      <p>
        Подписка на платформу закончилась, пожалуйста, обратитесь к нашей поодержке, чтобы возобновить доступ к нашему
        сервису. С уважением, команда Consult Ai.
        <br /> <br />
        Вы также можете написать/позвонить своему личному помощнику, если у вас есть его контакты. После оплаты подписки
        доступ будет возобновлен в течение 2-3 минут.
      </p>

      <div className={styles.buttons}>
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
      <p>
        и зайти в свой аккаунт. Все ваши данные будут сохранены и вы сможете продолжить пользоваться нашей платформой.
      </p>
    </div>
  );
};

export default ExpirationEnd;
