import styles from './ChatMessagesList.module.css';
import { ActiveMessage, MessageFull, MessageListItem } from '@/app/api/types/chat.ts';
import Message from '@/features/message';
import Arrow from '@/shared/assets/icons/arrow-top.svg?react';
import Button from '@/shared/ui/button';
import { useEffect, useRef, useState } from 'react';

type Props = {
  messages: MessageListItem[];
  oldMessages: MessageFull[] | undefined;
  activeMessage: ActiveMessage;
  chatId: string | null;
};

const ChatMessagesList = ({ messages, activeMessage, oldMessages, chatId }: Props) => {
  const ref = useRef<null | HTMLDivElement>(null);
  // находится ли пользователь внизу контейнера
  const [isAtBottom, setIsAtBottom] = useState<boolean>(true);

  const getShadowPosition = () => {
    if (!ref?.current) return;
    const value = ref?.current?.getBoundingClientRect();
    return {
      width: value.width,
      bottom: window.innerHeight - value.top - value.height,
    };
  };

  // Обработчик изменения прокрутки
  const handleScroll = () => {
    if (!ref.current) {
      setIsAtBottom(false);
      return;
    }
    const { scrollTop, scrollHeight, clientHeight } = ref.current;
    setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 75);
  };

  const scrollToBottom = () => {
    if (!ref.current) return;
    ref.current.scrollTop = 999999;
  };

  useEffect(() => {
    // Прокручиваем вниз (при изменении контента) только если пользователь был внизу
    if (isAtBottom && ref.current) {
      ref.current.scrollTop = 999999;
    }
  }, [messages, activeMessage, isAtBottom]);

  useEffect(() => {
    setTimeout(scrollToBottom, 250);
  }, [chatId]);

  return (
    <div className={styles.wrapper} ref={ref} onScroll={handleScroll}>
      {oldMessages?.map((elem) => <Message key={elem.id} data={elem} chatId={chatId} />)}
      {messages.map((elem) => (
        <Message key={elem.id} data={elem} chatId={chatId} />
      ))}
      {(activeMessage.text || activeMessage.is_request_load) && <Message chatId={chatId} data={activeMessage} />}
      {!!ref?.current && (
        <div
          className={styles.shadow}
          style={{
            opacity: +!isAtBottom,
            width: `calc(${getShadowPosition()?.width}px - var(--scroll-width-md))`,
            bottom: getShadowPosition()?.bottom,
          }}
        >
          <Button variant="outlined" onClick={scrollToBottom}>
            <Arrow />
            Прокрутить вниз
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChatMessagesList;
