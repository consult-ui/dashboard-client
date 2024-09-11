import styles from './Chat.module.css';
import ChatMessagesList from '@/entities/chat-messages-list';
import ChatInput from '@/features/chat-input';
import PopularQuestions from '@/features/popular-questions';

const Chat = () => {
  return (
    <div className={styles.wrapper}>
      <ChatMessagesList />
      <PopularQuestions />
      <ChatInput />
    </div>
  );
};

export default Chat;
