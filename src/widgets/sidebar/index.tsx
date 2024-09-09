import styles from './Sidebar.module.css';
import { ELinks } from '@/app/router/types';
import AdviceAnalysis from '@/entities/advice-analysis ';
import ChatsList from '@/entities/chats-list';
import Logo from '@/shared/assets/icons/logo.svg?react';
import Sidebared from '@/shared/assets/icons/sidebar.svg?react';
import Telegram from '@/shared/assets/icons/telegram.svg?react';
import WhatsApp from '@/shared/assets/icons/whatsapp.svg?react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className={styles.nav}>
      <header>
        <Link to={ELinks.HOME}>
          <Logo />
        </Link>
        <button>
          <Sidebared />
        </button>
      </header>

      <div className={styles.body}>
        <AdviceAnalysis />
        <div className={styles.chatsTitle}>
          <p>Искусственные помощники</p>
          <div className={styles.line} />
        </div>
        <ChatsList />
      </div>

      <footer>
        <div className={styles.text}>
          <span>Онлайн-поддержка 24/7</span>
          <div />
        </div>
        <div className={styles.line} />
        <div className={styles.buttons}>
          <a rel="noreferrer" target="_blank" href="https://t.me/kdubasov">
            <Telegram />
            Telegram
          </a>
          <a rel="noreferrer" target="_blank" href="https://wa.me/+79040574145">
            <WhatsApp />
            WhatsApp
          </a>
        </div>
      </footer>
    </nav>
  );
};

export default Sidebar;
