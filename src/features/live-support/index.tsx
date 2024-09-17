import styles from './LiveSupport.module.css';
import { useMeQuery } from '@/app/api';
import Telegram from '@/shared/assets/icons/telegram.svg?react';
import WhatsApp from '@/shared/assets/icons/whatsapp.svg?react';

const LiveSupport = () => {
  const { data } = useMeQuery();

  return (
    <footer className={styles.wrapper}>
      <div className={styles.text}>
        <span>Онлайн-поддержка 24/7</span>
        <div />
      </div>

      <div className={styles.line} />

      <div className={styles.buttons}>
        <a rel="noreferrer" target="_blank" href={data?.data?.telegram_url} title="Круглосуточная поддержка в Telegram">
          <button disabled={!data?.data?.telegram_url}>
            <Telegram />
            Telegram
          </button>
        </a>

        <a rel="noreferrer" target="_blank" href={data?.data?.whatsapp_url} title="Круглосуточная поддержка в WhatsApp">
          <button disabled={!data?.data?.whatsapp_url}>
            <WhatsApp />
            WhatsApp
          </button>
        </a>
      </div>
    </footer>
  );
};

export default LiveSupport;
