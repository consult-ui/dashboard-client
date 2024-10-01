import styles from './ChatMessagesList.module.css';
import { ActiveMessage, MessageFull, MessageListItem } from '@/app/api/types/chat.ts';
import Message from '@/features/message';
import { useEffect, useRef, useState } from 'react';

type Props = {
  messages: MessageListItem[];
  oldMessages: MessageFull[] | undefined;
  activeMessage: ActiveMessage;
};

const ChatMessagesList = ({ messages, activeMessage, oldMessages }: Props) => {
  const ref = useRef<null | HTMLDivElement>(null);
  // находится ли пользователь внизу контейнера
  const [isAtBottom, setIsAtBottom] = useState<boolean>(true);

  // Обработчик изменения прокрутки
  const handleScroll = () => {
    if (!ref.current) {
      setIsAtBottom(false);
      return;
    }
    const { scrollTop, scrollHeight, clientHeight } = ref.current;
    setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 65);
  };

  useEffect(() => {
    // Прокручиваем вниз (при изменении контента) только если пользователь был внизу
    if (isAtBottom && ref.current) {
      ref.current.scrollTop = 999999;
    }
  }, [messages, activeMessage, isAtBottom]);

  useEffect(() => {
    const scrollToBottom = () => {
      if (!ref.current) return;
      ref.current.scrollTop = 999999;
    };
    setTimeout(scrollToBottom, 50);
  }, []);

  return (
    <div className={styles.wrapper} ref={ref} onScroll={handleScroll}>
      {oldMessages?.map((elem) => <Message key={elem.id} data={elem} />)}
      {messages.map((elem) => (
        <Message key={elem.id} data={elem} />
      ))}
      {(activeMessage.text || activeMessage.is_request_load) && <Message data={activeMessage} />}
    </div>
  );
};

export default ChatMessagesList;
