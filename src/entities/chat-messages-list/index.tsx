import styles from './ChatMessagesList.module.css';
import { MESSAGES_LIST } from '@/entities/chat-messages-list/data';
import Message from '@/features/message';

const ChatMessagesList = () => {
  return (
    <div className={styles.wrapper}>
      {MESSAGES_LIST.map((elem) => (
        <Message key={elem.id} data={elem} />
      ))}
    </div>
  );
};

export default ChatMessagesList;
