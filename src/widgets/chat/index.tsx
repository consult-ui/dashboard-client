import styles from './Chat.module.css';
import ChatMessagesList from '@/entities/chat-messages-list';
import ChatInput from '@/features/chat-input';
import PopularQuestions from '@/features/popular-questions';
import AddChatList from '@/widgets/add-chat-list';

const Chat = () => {
  // TODO: for testing
  const isEmpty = true;

  return (
    <div className={styles.wrapper} data-testid="chat-widget">
      {isEmpty ? (
        <div className={styles.empty}>
          <h3>Добро пожаловать в диалог</h3>
          <p>
            Если вам недостаточно изначально добавленных чатов, вы можете добавить их, выбрав нужный шаблон чата из
            списка ниже. Если вы не нашли подходящий чат в этом списке, обратитесь в поддержку, и модераторы добавят
            его.
          </p>
          <AddChatList />
        </div>
      ) : (
        <ChatMessagesList />
      )}
      <PopularQuestions />
      <ChatInput />
    </div>
  );
};

export default Chat;
