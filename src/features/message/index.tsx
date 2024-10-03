import styles from './Message.module.css';
import { useLazyDownloadFileQuery } from '@/app/api';
import { ActiveMessage, ActiveUserMessage, MessageFull, MessageListItem } from '@/app/api/types/chat.ts';
import RobotIcon from '@/shared/assets/icons/logo-msg.svg?react';
import UserIcon from '@/shared/assets/icons/user-msg.svg?react';
import { TOAST_ERROR } from '@/shared/constants/toasts.ts';
import { formatDate } from '@/shared/utils/formatDate.ts';
import { useEffect, useState } from 'react';
import { remark } from 'remark';
import html from 'remark-html';

type Props = {
  data: ActiveMessage | MessageListItem;
  chatId: string | null;
};

const Message = ({ data, chatId }: Props) => {
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
  }

  const [text, setText] = useState<string | TrustedHTML>('');
  const { role, created_at, content, attachments } = data as MessageFull;
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
        <div>
          <div dangerouslySetInnerHTML={{ __html: text }} />
          {!!attachments?.length && <File files={attachments} chatId={chatId} />}
        </div>
      </div>
      {isAssistant && <span className={styles.time}>{formatDate(created_at * 1000, true)}</span>}
    </div>
  );
};

export default Message;

const File = ({ files, chatId }: { files: { file_id: string }[]; chatId: string | null }) => {
  const [download] = useLazyDownloadFileQuery();
  const [isLoadingId, setIsLoadingId] = useState<null | string>(null);

  const onClick = (file_id: string) => {
    if (!chatId) {
      TOAST_ERROR('Ошибка нахождения ID файла, перезагрузите страницу и попробуйте заново!');
      return;
    }
    setIsLoadingId(file_id);
    download({ file_id, chat_id: +chatId })
      .unwrap()
      .then((res) => {
        if (res?.success) {
          // TODO: доделать после того как починят бек
        } else {
          throw new Error(res?.msg);
        }
      })
      .catch((err) => {
        TOAST_ERROR(`Ошибка скачивания файла (${err?.data?.msg || 'Не найден'}), обратитесь в поддержку!`);
      })
      .finally(() => setIsLoadingId(null));
  };

  return (
    <>
      {files.map(({ file_id }, idx) => (
        <button
          key={file_id}
          disabled={isLoadingId === file_id}
          className={styles.file}
          onClick={() => onClick(file_id)}
        >
          {isLoadingId === file_id ? 'Загрузка...' : `Скачать файл: ${idx + 1}`}
        </button>
      ))}
    </>
  );
};
