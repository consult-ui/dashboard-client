import styles from './Chat.module.css';
import ChatMessagesList from '@/entities/chat-messages-list';
import ChatInput from '@/features/chat-input';
import PopularQuestions from '@/features/popular-questions';
import { Alert } from '@/widgets/chat/alert';

const Chat = () => {
  return (
    <div className={styles.wrapper} data-testid="chat-widget">
      <Alert />
      <ChatMessagesList />
      <PopularQuestions />
      <ChatInput />
    </div>
  );
};

export default Chat;
