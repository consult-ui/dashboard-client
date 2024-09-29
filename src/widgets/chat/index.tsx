import styles from './Chat.module.css';
import { ActiveMessage, ActiveMessageInitial, MessageListItem } from '@/app/api/types/chat.ts';
import ChatMessagesList from '@/entities/chat-messages-list';
import ChatInput from '@/features/chat-input';
import PopularQuestions from '@/features/popular-questions';
import SuspenseLoader from '@/shared/ui/suspense-loader';
import AddChatList from '@/widgets/add-chat-list';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const Chat = () => {
  const { chatId } = useParams();
  const [activeMessage, setActiveMessage] = useState<ActiveMessage>(ActiveMessageInitial);
  const [messages, setMessages] = useState<MessageListItem[]>([]);

  if (!chatId) {
    return <SuspenseLoader />;
  }

  return (
    <div className={styles.wrapper} data-testid="chat-widget">
      {messages?.length || activeMessage.text ? (
        <ChatMessagesList messages={messages} activeMessage={activeMessage} />
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
