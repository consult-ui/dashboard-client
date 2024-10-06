import styles from './ChatButton.module.css';
import { ChatItem } from '@/app/api/types/chat';
import { ELinks } from '@/app/router/types';
import { useAppSelector } from '@/app/store/store.ts';
import ChatUpdateDropdown from '@/entities/chat-update-dropdown';
import Dots from '@/shared/assets/icons/dots.svg?react';
import { TOAST_INFO } from '@/shared/constants/toasts.ts';
import { MouseEvent, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

type Props = {
  chat: ChatItem;
  isMobStyles?: boolean;
};

const ChatButton = ({ chat, isMobStyles }: Props) => {
  const params = useParams();
  const [isShow, setIsShow] = useState(false);
  const isPrintMessage = useAppSelector((state) => state.layout.isPrintMessage);

  const color = chat?.color || 'var(--primary)';
  const stylesLink = () => {
    if (!params?.chatId || +params?.chatId !== chat.id) return undefined;
    return { borderColor: color, cursor: 'default' };
  };

  const onStopLink = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    TOAST_INFO('Для смены чата, дождитесь завершения ответа');
  };

  return (
    <div className={styles.responsiveWrapper}>
      <Link
        onClick={isPrintMessage ? onStopLink : undefined}
        style={stylesLink()}
        className={`${styles.button} ${isMobStyles ? styles.mob : ''}`}
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
