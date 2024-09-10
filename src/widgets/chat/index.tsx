import styles from './Chat.module.css';
import ChatInput from '@/features/chat-input';

const Chat = () => {
  return (
    <div className={styles.wrapper}>
      <div></div>
      <ChatInput />
    </div>
  );
};

export default Chat;
