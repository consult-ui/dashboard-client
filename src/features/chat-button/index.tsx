import styles from './ChatButton.module.css';
import { ChatItem } from '@/app/api/types/chat';
import { ELinks } from '@/app/router/types';
import ChatUpdateDropdown from '@/entities/chat-update-dropdown';
import Dots from '@/shared/assets/icons/dots.svg?react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

type Props = {
  chat: ChatItem;
};

const ChatButton = ({ chat }: Props) => {
  const params = useParams();
  const [isShow, setIsShow] = useState(false);

  const color = chat?.color || 'var(--primary)';
  const stylesLink = () => {
    if (!params?.chatId || +params?.chatId !== chat.id) return undefined;
    return { borderColor: color, cursor: 'default' };
  };

  return (
    <div className={styles.responsiveWrapper}>
      <Link
        style={stylesLink()}
        className={styles.button}
        key={chat.id}
        to={ELinks.DASHBOARD + ELinks.CHAT + `/${chat.id}`}
      >
        <div className={styles.content}>
          <div style={{ background: color }} />
          <span>{chat.name}</span>
        </div>

        <button
          disabled={isShow}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsShow((prev) => !prev);
          }}
        >
          <Dots />
        </button>
      </Link>
      <ChatUpdateDropdown isOpen={isShow} onClose={() => setIsShow(false)} chat={chat} />{' '}
    </div>
  );
};

export default ChatButton;
