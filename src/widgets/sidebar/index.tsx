import styles from './Sidebar.module.css';
import { ELinks } from '@/app/router/types';
import AddChat from '@/entities/add-chat';
import AdviceAnalysis from '@/entities/advice-analysis ';
import ChatsList from '@/entities/chats-list';
import { useShowOrgModal } from '@/entities/company-initial-form/hooks/useShowOrgModal.ts';
import Logo from '@/shared/assets/icons/logo.svg?react';
import Sidebared from '@/shared/assets/icons/sidebar.svg?react';
import Telegram from '@/shared/assets/icons/telegram.svg?react';
import WhatsApp from '@/shared/assets/icons/whatsapp.svg?react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const { isEmptyOrg } = useShowOrgModal();

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
        {isEmptyOrg && (
          <div className={styles.alert}>
            Данные организации не найдены, <b>функционал платформы ограничен</b>, перейдите в личный кабинет для
            добавления данных
          </div>
        )}
        <AdviceAnalysis />
        <div className={styles.chatsTitle}>
          <p>Искусственные помощники</p>
          <div className={styles.line} />
        </div>
        <ChatsList />
        <AddChat />
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
