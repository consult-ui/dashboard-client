import styles from './ChatMessagesList.module.css';
import { ActiveMessage, MessageFull, MessageListItem } from '@/app/api/types/chat.ts';
import Message from '@/features/message';
import { useEffect, useRef } from 'react';

type Props = {
  messages: MessageListItem[];
  oldMessages: MessageFull[];
  activeMessage: ActiveMessage;
};

const ChatMessagesList = ({ messages, activeMessage, oldMessages }: Props) => {
  const ref = useRef<null | HTMLDivElement>(null);

  // TODO: добавить автодоскролл при наборе сообщения ассистентом
  useEffect(() => {
    const scrollToBottom = () => {
      if (!ref.current) return;
      ref.current.scrollTop = ref.current.scrollHeight;
    };
    setTimeout(scrollToBottom, 1);
  }, []);

  return (
    <div className={styles.wrapper} ref={ref}>
      {oldMessages.map((elem) => (
        <Message key={elem.id} data={elem} />
      ))}
      {messages.map((elem) => (
        <Message key={elem.id} data={elem} />
      ))}
      {(activeMessage.text || activeMessage.is_request_load) && <Message data={activeMessage} />}
    </div>
  );
};

export default ChatMessagesList;
