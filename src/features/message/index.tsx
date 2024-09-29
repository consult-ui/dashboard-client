import styles from './Message.module.css';
import { ActiveMessage, ActiveUserMessage, MessageFull, MessageListItem } from '@/app/api/types/chat.ts';
import RobotIcon from '@/shared/assets/icons/logo-msg.svg?react';
import UserIcon from '@/shared/assets/icons/user-msg.svg?react';
import { formatDate } from '@/shared/utils/formatDate.ts';

type Props = {
  data: ActiveMessage | MessageListItem;
};

// TODO: добавить к

const Message = ({ data }: Props) => {
  if (data.role === 'active_message') {
    const { text, is_request_load } = data as ActiveMessage;

    return (
      <div className={`${styles.wrapper} ${styles.robot}`}>
        <div className={styles.message}>
          <RobotIcon />
          <p>{is_request_load ? 'Дайте мне пару секунд на размышление...' : text}</p>
        </div>
        <span className={styles.time}>Только что</span>
      </div>
    );
  }

  if (data.role === 'active_user_message') {
    const { text, created_at } = data as ActiveUserMessage;

    return (
      <div className={`${styles.wrapper} ${styles.user}`}>
        <span className={styles.time}>{formatDate(created_at, true)}</span>
        <div className={styles.message}>
          <UserIcon />
          <p>{text}</p>
        </div>
      </div>
    );
  }

  const { role, created_at, content } = data as MessageFull;
  const isAssistant = role === 'assistant';

  return (
    <div className={`${styles.wrapper} ${styles[isAssistant ? 'robot' : 'user']}`}>
      {!isAssistant && <span className={styles.time}>{formatDate(created_at * 1000, true)}</span>}
      <div className={styles.message}>
        {isAssistant ? <RobotIcon /> : <UserIcon />}
        {/*TODO: тут как-то по-другому скорее всего надо обрабатывать*/}
        <p>{content?.[0]?.text?.value || 'Text not found'}</p>
      </div>
      {isAssistant && <span className={styles.time}>{formatDate(created_at * 1000, true)}</span>}
    </div>
  );
};

export default Message;
