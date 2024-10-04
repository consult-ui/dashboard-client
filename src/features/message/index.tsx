import styles from './Message.module.css';
import { ActiveMessage, ActiveUserMessage, MessageFull, MessageListItem } from '@/app/api/types/chat.ts';
import File from '@/features/message/File.tsx';
import RobotIcon from '@/shared/assets/icons/logo-msg.svg?react';
import UserIcon from '@/shared/assets/icons/user-msg.svg?react';
import { formatDate } from '@/shared/utils/formatDate.ts';
import { useCallback, useEffect, useState } from 'react';
import { remark } from 'remark';
import html from 'remark-html';

type Props = {
  data: ActiveMessage | MessageListItem;
  chatId: string | null;
};
type PropsActive = {
  data: ActiveMessage;
  parseMarkdown: (value: string) => Promise<string>;
};
type PropsOld = {
  data: MessageFull;
  parseMarkdown: (value: string) => Promise<string>;
  chatId: string | null;
};

const Message = ({ data, chatId }: Props) => {
  const parseMarkdown = useCallback(async (markdownText: string) => {
    const file = await remark().use(html).process(markdownText);
    return String(file);
  }, []);

  if (data.role === 'active_user_message') {
    const { text, created_at } = data as ActiveUserMessage;
    const files = (data as ActiveUserMessage)?.files_count;

    return (
      <div className={`${styles.wrapper} ${styles.user}`}>
        <span className={styles.time}>{formatDate(created_at, true)}</span>
        <div className={styles.message}>
          <UserIcon />
          <div>
            <div>{text}</div>
            {!!files && (
              <button disabled className={styles.file}>
                Файлы: {files}шт.
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (data.role === 'active_message') {
    return <ActMessage data={data as ActiveMessage} parseMarkdown={parseMarkdown} />;
  }

  return <OldMessage data={data as MessageFull} parseMarkdown={parseMarkdown} chatId={chatId} />;
};

const ActMessage = ({ data, parseMarkdown }: PropsActive) => {
  const [text, setText] = useState<string | TrustedHTML>('');
  const { text: value, is_request_load } = data;

  useEffect(() => {
    parseMarkdown(value).then((res) => setText(res));
  }, [data]);

  return (
    <div className={`${styles.wrapper} ${styles.robot}`}>
      <div className={styles.message}>
        <RobotIcon />
        <div>
          {is_request_load ? (
            <div>Дайте мне пару секунд на размышление...</div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: text }} />
          )}
        </div>
      </div>
      <span className={styles.time}>Только что</span>
    </div>
  );
};

const OldMessage = ({ data, parseMarkdown, chatId }: PropsOld) => {
  const [text, setText] = useState<string | TrustedHTML>('');
  const { role, created_at, content, attachments } = data;
  const isAssistant = role === 'assistant';

  useEffect(() => {
    parseMarkdown(content?.find((elem) => elem.type === 'text')?.text?.value as string).then((res) => setText(res));
  }, [content]);

  return (
    <div className={`${styles.wrapper} ${styles[isAssistant ? 'robot' : 'user']}`}>
      {!isAssistant && <span className={styles.time}>{formatDate(created_at * 1000, true)}</span>}
      <div className={styles.message}>
        {isAssistant ? <RobotIcon /> : <UserIcon />}
        <div>
          <div dangerouslySetInnerHTML={{ __html: text }} />
          {!!attachments?.length && <File files={attachments} chatId={chatId} isAssistant={isAssistant} />}
        </div>
      </div>
      {isAssistant && <span className={styles.time}>{formatDate(created_at * 1000, true)}</span>}
    </div>
  );
};

export default Message;
