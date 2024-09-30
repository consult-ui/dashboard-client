import styles from './Chat.module.css';
import { useMessagesListQuery } from '@/app/api';
import { ActiveMessage, ActiveMessageInitial, MessageFull, MessageListItem } from '@/app/api/types/chat.ts';
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

  if (!chatId) {
    return <ErrorAlert text={'Чат не найден, пожалуйста, попробуйте другой запрос или обратитесь в поддержку'} />;
  }

  const [activeMessage, setActiveMessage] = useState<ActiveMessage>(ActiveMessageInitial);
  const [messages, setMessages] = useState<MessageListItem[]>([]);
  const [oldMessages, setOldMessages] = useState<MessageFull[]>([]);
  const { data: messagesHistory, isLoading } = useMessagesListQuery(
    { chat_id: Number(chatId as string) },
    { skip: !chatId },
  );

  useEffect(() => {
    setOldMessages(messagesHistory?.data || []);
  }, [messagesHistory]);

  if (isLoading) return <SuspenseLoader />;

  return (
    <div className={styles.wrapper} data-testid="chat-widget">
      {messages?.length || oldMessages.length || activeMessage.text ? (
        <ChatMessagesList messages={messages} activeMessage={activeMessage} oldMessages={oldMessages} />
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
