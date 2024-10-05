import styles from './Sidebar.module.css';
import { ELinks } from '@/app/router/types';
import AddChat from '@/entities/add-chat';
import AdviceAnalysis from '@/entities/advice-analysis ';
import ChatsList from '@/entities/chats-list';
import LiveSupport from '@/features/live-support';
import Logo from '@/shared/assets/icons/logo.svg?react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className={styles.nav} data-testid="sidebar">
      <header className={styles.header}>
        <Link to={ELinks.DASHBOARD}>
          <Logo />
        </Link>
      </header>

      <div className={styles.body}>
        <AdviceAnalysis />
        <div className={styles.chatsTitle}>
          <p>Виртуальные помощники</p>
          <div className={styles.line} />
        </div>
        <ChatsList />
        <AddChat />
      </div>

      <LiveSupport />
    </nav>
  );
};

export default Sidebar;
