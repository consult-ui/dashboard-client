import styles from './Message.module.css';
import { ActiveMessage, ActiveUserMessage, MessageFull, MessageListItem } from '@/app/api/types/chat.ts';
import RobotIcon from '@/shared/assets/icons/logo-msg.svg?react';
import UserIcon from '@/shared/assets/icons/user-msg.svg?react';
import { formatDate } from '@/shared/utils/formatDate.ts';
import { useEffect, useState } from 'react';
import { remark } from 'remark';
import html from 'remark-html';

type Props = {
  data: ActiveMessage | MessageListItem;
};

const Message = ({ data }: Props) => {
  if (data.role === 'active_user_message') {
    const { text, created_at } = data as ActiveUserMessage;

    return (
      <div className={`${styles.wrapper} ${styles.user}`}>
        <span className={styles.time}>{formatDate(created_at, true)}</span>
        <div className={styles.message}>
          <UserIcon />
          <div>{text}</div>
        </div>
      </div>
    );
  }

  async function parseMarkdown(markdownText: string) {
    const file = await remark().use(html).process(markdownText);
    return String(file);
  }

  if (data.role === 'active_message') {
    const [text, setText] = useState<string | TrustedHTML>('');
    const { text: value, is_request_load } = data as ActiveMessage;

    useEffect(() => {
      parseMarkdown(value).then((res) => setText(res));
    }, [data]);

    return (
      <div className={`${styles.wrapper} ${styles.robot}`}>
        <div className={styles.message}>
          <RobotIcon />
          {is_request_load ? (
            <div>Дайте мне пару секунд на размышление...</div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: text }} />
          )}
        </div>
        <span className={styles.time}>Только что</span>
      </div>
    );
  }

  const [text, setText] = useState<string | TrustedHTML>('');
  const { role, created_at, content } = data as MessageFull;
  const isAssistant = role === 'assistant';

  useEffect(() => {
    // TODO: тут как-то по-другому скорее всего надо обрабатывать (content?.[0]?.text?.value)
    parseMarkdown(content?.[0]?.text?.value).then((res) => setText(res));
  }, []);

  return (
    <div className={`${styles.wrapper} ${styles[isAssistant ? 'robot' : 'user']}`}>
      {!isAssistant && <span className={styles.time}>{formatDate(created_at * 1000, true)}</span>}
      <div className={styles.message}>
        {isAssistant ? <RobotIcon /> : <UserIcon />}
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </div>
      {isAssistant && <span className={styles.time}>{formatDate(created_at * 1000, true)}</span>}
    </div>
  );
};

export default Message;
