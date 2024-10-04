import styles from './Chat.module.css';
import { useMessagesListQuery } from '@/app/api';
import { ActiveMessage, ActiveMessageInitial, MessageListItem } from '@/app/api/types/chat.ts';
import ChatMessagesList from '@/entities/chat-messages-list';
import ChatInput from '@/features/chat-input';
import PopularQuestions from '@/features/popular-questions';
import ErrorAlert from '@/shared/ui/error-alert';
import SuspenseLoader from '@/shared/ui/suspense-loader';
import AddChatList from '@/widgets/add-chat-list';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Chat = () => {
  const { chatId } = useParams();

  const [activeMessage, setActiveMessage] = useState<ActiveMessage>(ActiveMessageInitial);
  const [messages, setMessages] = useState<MessageListItem[]>([]);
  const { data: oldMessages, isLoading } = useMessagesListQuery(
    { chat_id: Number(chatId as string) },
    // скипаем если id нет или рефечим при маунте (смене чатов)
    { skip: !chatId, refetchOnMountOrArgChange: true },
  );

  // чистим сообщения которые храним локально при смене чата (они там подгрузятся с бека)
  useEffect(() => setMessages([]), [chatId]);

  if (!chatId) {
    return <ErrorAlert text={'Чат не найден, пожалуйста, попробуйте другой запрос или обратитесь в поддержку'} />;
  }

  if (isLoading) return <SuspenseLoader />;

  return (
    <div className={styles.wrapper} data-testid="chat-widget">
      {messages?.length || oldMessages?.data?.length || activeMessage.text ? (
        <ChatMessagesList
          chatId={chatId}
          messages={messages}
          activeMessage={activeMessage}
          oldMessages={oldMessages?.data}
        />
      ) : (
        <div className={styles.empty}>
          <h3>Добро пожаловать в диалог</h3>
          <p>
            Если вам недостаточно изначально добавленных чатов, вы можете добавить их, выбрав нужный шаблон чата из
            списка ниже. Если вы не нашли подходящий чат в этом списке, обратитесь в поддержку, и модераторы добавят
            его.
          </p>
          <AddChatList />
        </div>
      )}
      <PopularQuestions />
      <ChatInput chatId={chatId} setActiveMessage={setActiveMessage} setMessages={setMessages} />
    </div>
  );
};

export default Chat;
