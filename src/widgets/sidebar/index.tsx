import styles from './Sidebar.module.css';
import { ELinks } from '@/app/router/types';
import AddChat from '@/entities/add-chat';
import AdviceAnalysis from '@/entities/advice-analysis ';
import ChatsList from '@/entities/chats-list';
import LiveSupport from '@/features/live-support';
import Logo from '@/shared/assets/icons/logo.svg?react';
import NavIcon from '@/shared/assets/icons/nav.svg?react';
import { useClickAway } from '@/shared/hooks/useClickAway.ts';
import { useSidebarShow } from '@/widgets/sidebar/hooks/useSidebarShow.ts';
import { Dispatch, SetStateAction, useRef } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const { isShow, setIsShow } = useSidebarShow();
  const ref = useRef<null | HTMLElement>(null);

  useClickAway(ref, isShow, setIsShow as Dispatch<SetStateAction<boolean>>);

  return (
    <nav ref={ref} className={`${styles.nav} ${isShow ? styles.active : ''}`} data-testid="sidebar">
      <header className={styles.header}>
        <Link to={ELinks.DASHBOARD}>
          <Logo />
        </Link>
        <button onClick={() => setIsShow(false)}>
          <NavIcon />
        </button>
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
